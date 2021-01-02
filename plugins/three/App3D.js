import { Scene, WebGLRenderer, CubeTextureLoader, PerspectiveCamera, Object3D, MeshBasicMaterial, Mesh, DirectionalLight, MeshStandardMaterial, AmbientLight, PointLight, GridHelper, AxesHelper, DirectionalLightHelper, PointLightHelper, Color, Clock } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import AppEvent from "./AppEvent"

export default function App3D(
  {
    container,
    controlEnabled = true,
    lightEnabled = true,
    gridEnabled = true,
    transparent = true
  }
) {
  var scene, camera, renderer
  var directLight, ambientLight, pointLight
  var grid, axes
  var directLightHelper, pointLightHelper
  var controls
  var lastCalledTime
  var eventListeners = []
  var clock = new Clock()

  var scope = this

  var sw = container.clientWidth
  var sh = container.clientHeight

  // initial setup
  scene = new Scene()

  camera = new PerspectiveCamera(75, sw / sh, 0.1, 10000);
  camera.position.set(0, 200, 500);
  scene.add(camera)

  // camera.lookAt(scene.position)

  renderer = new WebGLRenderer({ antialias: true, alpha: transparent });
  renderer.setPixelRatio(window ? window.devicePixelRatio : 1);
  renderer.setSize(sw, sh);

  container.appendChild(renderer.domElement);

  // lights
  if (lightEnabled) {
    directLight = new DirectionalLight("#fff")
    directLight.position.set(500, 1000, 500)
    scene.add(directLight)

    ambientLight = new AmbientLight("#fff", 0.4)
    scene.add(ambientLight)
  }

  // helpers
  if (gridEnabled) {
    directLightHelper = new DirectionalLightHelper(directLight, 10)
    scene.add(directLightHelper)

    grid = new GridHelper(2000, 200)
    grid.material.transparent = true
    grid.material.opacity = 0.8
    scene.add(grid)

    axes = new AxesHelper(1000)
    scene.add(axes)
  }

  if (controlEnabled) {
    controls = new OrbitControls(camera, container)
    controls.minDistance = 10;
    controls.maxDistance = 990;
  }

  // resize
  if (window) {
    // console.log("init resize!")
    onResize()
    window.addEventListener("resize", onResize)
  }

  function onResize(e) {
    // console.log("resize!")
    sw = container.clientWidth
    sh = container.clientHeight

    camera.aspect = sw / sh
    camera.updateProjectionMatrix();

    renderer.setSize(sw, sh)
  }

  // render
  animate()
  function animate() {
    requestAnimationFrame(animate);
    var deltaTime = clock.getDelta();
    var delta = (new Date() - lastCalledTime) / 1000;
    var fps = 1 / delta;
    lastCalledTime = new Date()

    if (controls && controls.enabled) controls.update();

    // console.log(mesh)
    // mesh.rotation.y += 0.01
    if (scope.onAnimate) scope.onAnimate({ deltaTime, fps })

    eventListeners.forEach((evt) => {
      if (evt.event == AppEvent.BEFORE_RENDER) evt.listener({ delta, fps })
    })

    renderer.render(scene, camera);

    eventListeners.forEach((evt) => {
      if (evt.event == AppEvent.AFTER_RENDER) evt.listener({ delta, fps })
    })
  }

  function addEvent(event, listener) {
    if (Object.values(AppEvent).indexOf(event) > -1) {
      eventListeners.push({ event: event, listener: listener })
    } else {
      console.warn(`Event [${event}] not found.`)
    }
  }

  function removeEvent(event, listener) {
    if (Object.values(AppEvent).indexOf(event) > -1) {
      eventListeners.forEach((dispatcher, index) => {
        if (dispatcher.listener == listener) {
          eventListeners.splice(index, 1)
        }
      })
    } else {
      console.warn(`Event [${event}] not found.`)
    }
  }

  function hideImmediately() {
    renderer.domElement.style.display = "none"
  }

  function showImmediately() {
    renderer.domElement.style.display = "block"
  }

  /**
   * @param  {number} duration
   */
  function hide(duration) {
    gsap.to(renderer.domElement, { duration: duration || 0.5, autoAlpha: 0, ease: "sine.in" })
  }
  /**
   * @param  {number} duration
   */
  function show(duration) {
    gsap.to(renderer.domElement, { duration: duration || 0.5, autoAlpha: 1, ease: "sine.out" })
  }

  function hideGrid() {
    if (grid) grid.visible = false
    if (axes) axes.visible = false
  }

  function showGrid() {
    if (grid) grid.visible = true
    if (axes) axes.visible = true
  }

  function toggleGrid() {
    if (grid) grid.visible = !grid.visible
    if (axes) axes.visible = !axes.visible
  }

  function enableControl() {
    if (controls) controls.enabled = true;
  }

  function disableControl() {
    if (controls) controls.enabled = false;
  }

  function dispose() {
    
  }

  // exports
  this.onAnimate = null
  this.scene = scene
  this.camera = camera
  this.renderer = renderer
  this.container = container
  this.controls = controls
  this.addEvent = addEvent
  this.removeEvent = removeEvent
  this.enableControl = enableControl
  this.disableControl = disableControl
  this.showGrid = showGrid
  this.hideGrid = hideGrid
  this.toggleGrid = toggleGrid
  this.hideImmediately = hideImmediately
  this.showImmediately = showImmediately
  this.show = show
  this.hide = hide
  this.dispose = dispose;
}