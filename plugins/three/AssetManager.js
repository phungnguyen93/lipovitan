import { Object3D, LoadingManager, TextureLoader, AudioLoader, CubeTextureLoader, FileLoader } from "three"
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

var scope
var list = new Map();
var cubeImagesRLTBFB = [
  'right.jpg', // px
  'left.jpg', // nx
  'top.jpg', // py
  'bottom.jpg', // ny
  'front.jpg', // pz
  'back.jpg', // nz
];
var cubeImagesXYZ = [
  'px.jpg',
  'nx.jpg',
  'py.jpg',
  'ny.jpg',
  'pz.jpg',
  'nz.jpg',
];

var manager
var listToLoad = [];
var loaders = [];
var loaded = 0;
var total = 0;
var _onComplete;

// var Events = {
//   ON_LOAD_PROGRESS: "onLoadProgress",
//   ON_LOAD_COMPLETE: "onLoadComplete",
//   ON_LOAD_ERROR: "onLoadError",
// }

export default class AssetManager {

  enabled = true;
  onLoadProgress = null;
  onLoadComplete = null;

  // static functions
  /**
   * @returns {AssetManager}
   */
  static instance = () => scope;
  static get = (key) => AssetManager.instance().get(key)
  static find = (key) => AssetManager.get(key);

  dracoLoader;

  constructor() {
    scope = this
    manager = new LoadingManager();
    manager.onError = scope.onLoadError;
    // manager.onStart = onLoadStart;
    // manager.onLoad = onLoadComplete;
    // manager.onProgress = onLoadProgress;
    this.dracoLoader = new DRACOLoader()
  }

  // functions


  /**
   * @returns {Map}
   */
  all() {
    return list;
  }

  /**
   * @param  {string} key
   * @returns {THREE.Object3D}
   */
  find(key) {
    return list.get(key);
  }

  /**
   * @param  {string} key
   * @returns {THREE.Object3D}
   */
  get(key) {
    return this.find(key)
  }

  /**
   * @param  {string} key
   * @param  {THREE.Object3D} object
   */
  addObject(key, object) {
    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });
    list.set(key, object);
  }

  /**
   * @param  {string} key
   * @param  {string} url
   */
  addUrl(key, url) {
    var itemToLoad = { url: url, key: key };
    listToLoad.push(itemToLoad);
  }

  /**
   * @param  {function} onComplete
   */
  start(onComplete) {
    _onComplete = onComplete;
    loaded = 0;
    total = listToLoad.length;

    if (total == 0) {
      if (_onComplete) _onComplete();
      return;
    }

    for (var i = 0; i < total; i++) {
      var url = listToLoad[i].url;
      var key = listToLoad[i].key;
      scope.load(key, url, scope.onLoaded);
    }
  }

  onLoaded(key, object) {
    // console.log(key, object);
    list.set(key, object);

    loaded++;
    total = listToLoad.length;
    // console.log(loaded, total);
    if (loaded == total) {
      if (_onComplete) _onComplete();

      // var evt = $.Event(Events.ON_LOAD_PROGRESS);
      // evt.progress = 1;
      // $(AssetsManager).trigger(evt);
      if (scope.onLoadProgress) scope.onLoadProgress(1);

      // var evt = $.Event(Events.ON_LOAD_COMPLETE);
      // $(AssetsManager).trigger(evt);
      if (scope.onLoadComplete) scope.onLoadComplete();
    } else {
      var progress = loaded / total;
      if (scope.onLoadProgress) scope.onLoadProgress(progress);

      // var evt = $.Event(Events.ON_LOAD_PROGRESS);
      // evt.progress = progress;
      // $(AssetsManager).trigger(evt);
    }
  }

  /**
   * @param  {string} key
   * @param  {string} url
   * @param  {function} onLoad
   */
  load(key, url, onLoad) {
    var loader;

    if (key.indexOf('cube_map') != -1) {
      loader = new CubeTextureLoader(manager);
      loader.setPath(url);
      if (key.indexOf("_xyz") != -1) {
        loader.load(cubeImagesXYZ, onItemLoaded);
      } else {
        loader.load(cubeImagesRLTBFB, onItemLoaded);
      }
    } else {
      var fileExt = scope.getExtension(url);
      switch (fileExt) {
        case 'fbx':
          loader = new FBXLoader(manager);
          break;

        case 'glb':
          loader = new GLTFLoader(manager);
          break;

        case 'gltf':
          loader = new GLTFLoader(manager);
          loader.setDRACOLoader(this.dracoLoader)
          loader.dracoLoader.setDecoderPath("/draco/gltf/")
          break;

        case 'obj':
          loader = new OBJLoader(manager);
          break;

        case 'mp3':
          loader = new AudioLoader(manager);
          break;

        case 'jpg':
          loader = new TextureLoader(manager);
          break;

        case 'png':
          loader = new TextureLoader(manager);
          break;

        default:
          loader = new FileLoader(manager);
          break;
      }
      loader.load(url, onItemLoaded, undefined, onItemError);
    }

    loaders.push(loader);

    function onItemError(e) {
      console.log(e);
      // console.log("[Assets] Error " + e.target.status + ": " + e.target.statusText);
    }

    function onItemLoaded(object) {
      // console.log(object);
      var obj3d;
      // console.log(object.scene);
      if (typeof object.scene != 'undefined') {
        // console.log (object);
        var holder = new Object3D();
        holder.add(object.scene);
        object.scene.scale.setScalar(100);
        obj3d = holder;
        if (typeof object.animations != 'undefined') {
          obj3d.animations = object.animations;
        }
        if (typeof object.assets != 'undefined') {
          obj3d.assets = object.assets;
        }
        if (typeof object.parser != 'undefined') {
          obj3d.parser = object.parser;
        }
      } else {
        obj3d = object;
      }
      if (onLoad) onLoad(key, obj3d);
    }

    return loader;
  }

  activate() {
    enabled = true;
  }

  deactivate() {
    enabled = false;
  }

  getExtension(url) {
    // console.log(url)
    var ext = url.substring(url.lastIndexOf('.') + 1, url.length) || url;
    return ext.toLowerCase();
  }

  onLoadError(url) {
    console.log('There was an error loading ' + url);

    // var evt = $.Event(Events.ON_LOAD_ERROR);
    // evt.url = url;
    // $(AssetsManager).trigger(evt);
  }

  dispose() {
    loaders.forEach(function (loader) {
      loader = null;
    });
  }


}
