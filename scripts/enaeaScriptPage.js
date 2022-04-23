// ==UserScript==
// @name         enaeaScriptPage
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  auto click undone
// @author       MatrixCancer
// @match        *://*study.enaea.edu.cn/circleIndexRedirect.do*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=enaea.edu.cn
// @grant        none
// ==/UserScript==

(function () {
  var main = function () {
    var i;

    var trList = document.getElementsByTagName("tr");

    if (trList.length == 0) alert("trList.length == 0");
    else console.log("====== START =====");

    for (i = 0; i < trList.length; ++i) {
      if (trList[i].className === "odd" || trList[i].className === "even") {
        /**
         * trList[i].childNodes
         * [0] 标题
         * [1] 时长
         * [2] 老师
         * [3] 最后学习时间
         * [4] 学习进度
         * [5] 操作
         */
        var titleStr = trList[i].childNodes[0].childNodes[1].innerText;
        var timeLengthStr = trList[i].childNodes[1].childNodes[0].innerText; // hh:mm:ss
        var studyProgressStr =
          trList[i].childNodes[4].childNodes[0].childNodes[0].innerText; // pp%
        var operationElement = trList[i].childNodes[5].childNodes[0];

        var studyProgress = parseInt(
          studyProgressStr.substring(0, studyProgressStr.length - 1)
        );

        if (studyProgress === 100) {
          console.log(titleStr + " already finished.");
          console.log("move to next.");
          continue;
        }

        var waitSeconds =
          parseInt(timeLengthStr.substring(0, 2)) * 60 * 60 +
          parseInt(timeLengthStr.substring(3, 5)) * 60 +
          parseInt(timeLengthStr.substring(6, 8));
        waitSeconds = Math.floor(waitSeconds * (1 - studyProgress / 100.1));

        console.log(titleStr + " not finished, need " + waitSeconds + "s.");

        operationElement.click();

        setTimeout(main, (waitSeconds + 8 * 60) * 1000);

        break;
      }
    }

    return;
  };

  window.onload = main;
})();
