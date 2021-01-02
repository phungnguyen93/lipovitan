import * as React from 'react';
import * as Pixi from 'pixi.js';

// interface IMainProps {}
// interface IMainState {}
export class PixiComponent extends React.Component {
  constructor(props) {
    super(props);
    this.pixi_cnt = null;
  }
updatePixiCnt= (element) => {
    // the element is the DOM object that we will use as container to add pixi stage(canvas)
    this.pixi_cnt = element;
 };
  
render() {
    return <div ref={this.updatePixiCnt} />;
  }
}


// import * as PIXI from 'pixi.js'

// export default function BasicApp2D(container) {
//   // var container = $("#pMaster");
//   // var container = $(".cvContainer");
//   // .appear('<div id="canvasPixiHolder"></div>');
//   var canvasId = "canvasPixi";


//   var Events = {
//     ON_LOAD_PROGRESS: "onLoadProgress",
//     ON_LOAD_COMPLETE: "onLoadComplete",
//     ON_LOAD_ERROR: "onLoadError",
//     TICK: "tick",

//   }

//   var fontName = 'SamsungSharpSans-Medium-UTF8';




//   var app
//     , renderer
//     ;

//   var holder;

//   var textHolder
//     , overlayFill;

//   // var ratio = window.devicePixelRatio || 1,
//   //     scaleRatio = 1 / window.devicePixelRatio || 1;


//   var ratio = 1,
//     scaleRatio = 1;

//   var _width = 512
//     , _height = 512
//     , _widthMulRatio = _width * ratio
//     , _heightMulRatio = _height * ratio
//     ;

//   var blackColor = "#000000"
//     , whiteColor = "#ffffff"
//     ;


//   function PercentText() {
//     var _this = this;
//     PIXI.Container.call(_this);

//     var size = 120
//     // , fontFamily = "Arial Black";

//     var style = new PIXI.TextStyle({
//       fill: whiteColor,
//       fontSize: size,
//       fontFamily: fontName,
//     });
//     var textWhite = new PIXI.Text('', style);
//     textWhite.y = -textWhite.height / 2;

//     var styleBlack = new PIXI.TextStyle({
//       fill: blackColor,
//       fontSize: size,
//       fontFamily: fontName,
//     });
//     var textBlack = new PIXI.Text('1233', styleBlack);
//     textBlack.y = textWhite.y;

//     _this.changeText = function (_text) {
//       textWhite.text = textBlack.text = _text;

//       _this.alignCenter();
//     }

//     _this.alignCenter = function () {
//       textWhite.x = textBlack.x = -textWhite.width / 2;
//     }

//     _this.addChild(textWhite);
//     _this.addChild(textBlack);


//     Object.defineProperties(this, {
//       // scene: { get: function () { return scene } },
//       textWhite: { get: function () { return textWhite; } },
//       textBlack: { get: function () { return textBlack; } },

//     });


//   }


//   function OverlayFill() {
//     var _this = this;
//     PIXI.Container.call(_this);

//     // _this.y = 0;

//     var __width = _widthMulRatio * .8;

//     // outline.drawRoundedRect(0, 0, _widthMulRatio * .8, _heightMulRatio, 60);

//     var rectVisible = new PIXI.Graphics();
//     rectVisible.beginFill(0xffffff);
//     rectVisible.drawRect(0, -1, __width, 1);
//     rectVisible.endFill();
//     _this.addChild(rectVisible);

//     var rectMask = new PIXI.Graphics();
//     rectMask.beginFill(0xffffff);
//     rectMask.drawRect(0, -1, __width, 1);
//     rectMask.endFill();
//     _this.addChild(rectMask);

//     rectMask.x = rectVisible.x = (_widthMulRatio - (__width)) / 2;

//     _this.changeScaleY = function (scl) {
//       _this.scale.y = (_heightMulRatio * scl);

//     }

//     Object.defineProperties(this, {
//       rectMask: { get: function () { return rectMask; } },
//     });

//   }


//   function init() {

//     GLoader.loadScripts([
//       path_resource + "js/plugins/pixijs/5.1.6/pixi.min.js",
//       path_resource + "js/plugins/TJS/TPixi.js",
//       path_resource + "js/plugins/digitop/gpixi.js",
//     ], {
//       onComplete: function (result) {
//         var list = [
//           path_resource + "images/textures/pack.json",
//         ];
//         TPixi.loadImages(list, function (l, r) {

//           PercentText.prototype = Object.assign(Object.create(PIXI.Container.prototype), {})
//           OverlayFill.prototype = Object.assign(Object.create(PIXI.Container.prototype), {})

//           WebFont.load(
//             {
//               // this event is triggered when the fonts have been rendered, see https://github.com/typekit/webfontloader
//               active: function () {
//                 // let browser take a breath. Some fonts may require more room for taking deep breath
//                 setTimeout(function () {
//                   createStage();

//                   // var evt = $.Event(Events.ON_LOAD_COMPLETE);
//                   // $(CanvasController).trigger(evt);
//                 }, 500);
//               },

//               // when font is loaded do some magic, so font can be correctly rendered immediately after PIXI is initialized
//               fontloading: doMagic,

//               // multiple fonts can be passed here
//               google:
//               {
//                 families: [fontName]
//               }
//             });

//           // this one is important
//           function doMagic() {
//             // create <p> tag with our font and render some text secretly. We don't need to see it after all...

//             var el = document.createElement('p');
//             el.style.fontFamily = fontName;
//             el.style.fontSize = "0px";
//             el.style.visibility = "hidden";
//             el.innerHTML = '.';

//             // document.body.appendChild(el);
//           };

//         })


//       }
//     });

//   }
//   // init();
//   createStage();

//   function createStage() {

//     app = new PIXI.Application({
//       width: _width, height: _height,
//       backgroundColor: 0x000000,
//       resolution: ratio,
//       antialias: true,
//       autoDensity: true,
//       transparent: true,
//     });
//     container.appendChild(app.view);

//     renderer = app.renderer;

//     app.viewid = canvasId;

//     app.view.setAttribute("id", canvasId);

//     // if (typeof pUnbox != "undefined") {

//     //   app.view.style.top = "0px"
//     //   app.view.style.left = "0px"
//     //   app.view.style.width = "100%"
//     //   app.view.style.transform = "none"
//     //   app.view.style.position = "absolute"

//     //   // $(app.view).css("left", "0px");

//     //   $(app.view).css("position", "relative");
//     //   $(app.view).css("top", "0px");
//     //   $(app.view).css("left", "0px");
//     //   $(app.view).css("width", 200 + "px");
//     //   $(app.view).css("height", 200 + "px");
//     //   $(app.view).css("display", "none");
//     //   $(app.view).css("z-index", 1);
//     // }


//     holder = new PIXI.Container();
//     holder.scale = { x: scaleRatio, y: scaleRatio };

//     app.stage.addChild(holder);

//     createPrecentElement();

//     // Listen for animate update
//     app.ticker.add(animate);
//   }


//   function createPrecentElement() {
//     var holderPercent = new PIXI.Container();
//     holder.addChild(holderPercent);


//     textHolder = new PercentText();
//     textHolder.x = _widthMulRatio / 2;
//     textHolder.y = _heightMulRatio * .4;
//     holderPercent.addChild(textHolder);

//     overlayFill = new OverlayFill();
//     overlayFill.y = _heightMulRatio + 1;
//     // overlayFill.scale.y = 10;
//     holderPercent.addChild(overlayFill);

//     textHolder.textBlack.mask = overlayFill.rectMask;

//     GPixi.moveToTop(textHolder);

//     var _maskHolder = new PIXI.Graphics();
//     _maskHolder.beginFill(0xccc99c);
//     _maskHolder.drawRoundedRect(0, 0, _widthMulRatio * .8, _heightMulRatio, 60);
//     _maskHolder.x = (_widthMulRatio - (_maskHolder.width)) / 2;
//     _maskHolder.endFill();

//     holderPercent.mask = _maskHolder;
//     holder.addChild(_maskHolder);

//     var outline = new PIXI.Graphics();
//     outline.lineStyle(6, 0xffffff, 1);
//     outline.drawRoundedRect(0, 0, _widthMulRatio * .8, _heightMulRatio - 12, 60);
//     outline.x = (_widthMulRatio - (outline.width)) / 2;
//     outline.y = 6;
//     outline.endFill();

//     holder.addChild(outline);
//   }

//   function changePercentText(percent) {

//     textHolder.changeText((Math.round(percent * 100)) + "%");
//     overlayFill.changeScaleY(percent);
//   }


//   function onRender() {

//   }


//   function resize() {

//   }



//   function removeAllChild() {
//     console.log("removeAllChild")

//     TPixi.removeAllChild(holder);
//     // TPixi.hideAllChild(holder);

//     // console.log(app.stage)
//   }

//   // var evt = $.Event(Events.TICK);

//   // var s = 0;
//   function animate(delta) {

//     // evt.delta = delta;
//     // $(CanvasController).trigger(evt);

//     app.render(app.stage);

//     // s += delta;
//     // changePercentText(s / 1000)
//     // textHolder.changeText(Math.round(s));
//     // overlayFill.changeScaleY(s / 1000);
//   }


//   // other methods
//   function hideImmediately() {
//     renderer.domElement.style.display = "none"
//   }

//   function showImmediately() {
//     renderer.domElement.style.display = "block"
//   }

//   /**
//    * @param  {number} duration
//    */
//   function hide(duration) {
//     gsap.to(renderer.domElement, { duration: duration || 0.5, autoAlpha: 0, ease: "sine.in" })
//   }
//   /**
//    * @param  {number} duration
//    */
//   function show(duration) {
//     gsap.to(renderer.domElement, { duration: duration || 0.5, autoAlpha: 1, ease: "sine.out" })
//   }


//   this.init = init;
//   this.resize = resize;
//   this.removeAllChild = removeAllChild;
//   this.canvasId = canvasId;

//   this.changePercentText = changePercentText;

//   this.hide = hide;
//   this.show = show;
//   this.hideImmediately = hideImmediately
//   this.showImmediately = showImmediately

//   this.app = app
//   this.holder = holder
//   // this.canvas = app.view
//   this.Events = Events

// }
