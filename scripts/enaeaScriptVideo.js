// ==UserScript==
// @name         enaeaScriptVideo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  auto click undone
// @author       You
// @match        *://*study.enaea.edu.cn/viewerforccvideo.do*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=enaea.edu.cn
// @grant        none
// ==/UserScript==

(function () {
  var main = function () {
    var i;

    var replayButton = document.getElementById("replaybtn");
    if (replayButton) {
      replayButton.click();
    }

    var ccH5InfoList = document.getElementsByClassName("ccH5Info");
    if (ccH5InfoList.length && ccH5InfoList[0].innerText.length) setTimeout(location.reload, 1000);

    var buttonList = document.getElementsByTagName("button");

    if (buttonList.length) {
      for (i = 0; i < buttonList.length; ++i) {
        buttonList[i].click();
      }
    }
    var studyProgressList = document.getElementsByClassName(
      "cvtb-MCK-CsCt-studyProgress"
    );
    var titleList = document.getElementsByClassName(
      "cvtb-MCK-CsCt-title cvtb-text-ellipsis"
    );

    if (studyProgressList.length) {
      for (i = 0; i < studyProgressList.length; ++i) {
        if (studyProgressList[i].innerText !== "100%") {
          titleList[i].click();
          break;
        } else if (i == studyProgressList.length - 1) {
          window.close();
        }
      }
    }

    return;
  };

  setInterval(main, 2 * 60 * 1000);
})();
