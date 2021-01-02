import * as THREE from "three"

/**
 * @type {ObjectManager}
 */
var scope
var list = new Map();

export default class ObjectManager {
  // static functions
  /**
   * @returns {ObjectManager}
   */
  static instance = () => scope;
  static all = () => scope.all();
  static get = (key) => scope.get(key);
  static find = (key) => scope.get(key);
  static add = (key, object, isPublic) => scope.add(key, object, isPublic);

  constructor() {
    scope = this
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
    return this.find(key);
  }

  /**
   * @param  {string} key
   * @param  {THREE.Object3D} object
   */
  add(key, object, isPublic = false) {
    if (list.has(key)) {
      if (this.get("key") != object) {
        console.warn(`The key "${key}" was existed, this object will be overwritten:`, this.get(key))
      }
    }
    list.set(key, object);
    if (isPublic && typeof window != "undefined") window[key] = object
  }

  dispose() {
    // dispose all objects in the manager?
  }
}
