

export default {
  getUrlParams: function (parameter, staticURL, decode) {
    staticURL = (staticURL == undefined) ? window.location : staticURL;
    var currLocation = (staticURL.length) ? staticURL : window.location.search;

    if (currLocation.split("?").length < 2)
      return "";

    var parArr = currLocation.split("?")[1].split("&"),
      returnBool = true;

    for (var i = 0; i < parArr.length; i++) {
      var parr = parArr[i].split("=");
      if (parr[0] == parameter) {
        return (decode) ? decodeURIComponent(parr[1]) : parr[1];
        returnBool = true;
      } else {
        returnBool = false;
      }
    }

    if (!returnBool) return false;
  },
}