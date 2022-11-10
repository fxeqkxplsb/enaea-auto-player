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

(async function () {
  // 睡眠函数
  async function sleep(msecs) {
    return new Promise(function (resolve, reject) {
      let uuid = Math.floor(Math.random() * 65536)
        .toString(16)
        .toUpperCase()
        .padStart(4, "0");
      console.log(`SLEEP#${uuid} START`);
      setTimeout(function () {
        resolve(uuid);
      }, msecs);
    }).then(function (uuid) {
      console.log(`SLEEP#${uuid} END`);
    });
  }

  // 巡逻函数
  function patrol() {
    // 视频元素
    let videoElementList = document.getElementsByTagName("video");
    console.log(`EXPECTED videoElementList`);
    if (videoElementList.length !== 1) {
      console.log(
        `PANIC videoElementList.length === ${videoElementList.length}`
      );
      return false;
    }
    var videoElement = videoElementList[0];
    console.log(`EXPECTED videoElement`);

    // 交互暂停键
    let interactiveButtonDivList = document.getElementsByClassName(
      "dialog-button-container"
    );
    console.log(`EXPECTED interactiveButtonDivList`);
    if (interactiveButtonDivList.length !== 1) {
      console.log(
        `UNDEFINED interactiveButtonDivList.length === ${interactiveButtonDivList.length}`
      );
    } else {
      let interactiveButtonDiv = interactiveButtonDivList[0];
      console.log(`EXPECTED interactiveButtonDiv`);
      let interactiveButtonList = interactiveButtonDiv.childNodes;
      if (interactiveButtonList.length !== 1) {
        console.log(
          `PANIC videosUlDivList.length === ${interactiveButtonList.length}`
        );
        return false;
      }
      let interactiveButton = interactiveButtonList[0];
      console.log(`EXPECTED interactiveButton ${interactiveButton.innerText}`);
      if (videoElement.paused) {
        interactiveButton.click();
        console.log(`ACTION interactiveButton.click()`);
      }
    }

    // 中央暂停键
    let centerButtonList = document.getElementsByClassName("xgplayer-start");
    console.log(`EXPECTED centerButtonList`);
    if (centerButtonList.length !== 1) {
      console.log(
        `UNDEFINED centerButtonList.length === ${centerButtonList.length}`
      );
    } else {
      let centerButton = centerButtonList[0];
      console.log(`EXPECTED centerButton`);
      if (videoElement.paused) {
        centerButton.click();
        console.log(`ACTION centerButton.click()`);
      }
    }

    // 边角暂停键
    let cornerButtonList = document.getElementsByClassName("xgplayer-play");
    console.log(`EXPECTED cornerButtonList`);
    if (cornerButtonList.length !== 1) {
      console.log(
        `UNDEFINED cornerButtonList.length === ${cornerButtonList.length}`
      );
    } else {
      let cornerButton = cornerButtonList[0];
      console.log(`EXPECTED cornerButton`);
      if (videoElement.paused) {
        cornerButton.click();
        console.log(`ACTION cornerButton.click()`);
      }
    }

    if (videoElement.currentTime + 1 > videoElement.duration) {
      // 视频列表
      let videosUlDivList = document.getElementsByClassName(
        "cvtb-main-content-kecheng-content"
      );
      console.log(`EXPECTED videosUlDivList`);
      if (videosUlDivList.length !== 1) {
        console.log(
          `PANIC videosUlDivList.length === ${videosUlDivList.length}`
        );
        return false;
      }
      let videosUlDiv = videosUlDivList[0];
      console.log(`EXPECTED videosUlDiv`);
      if (videosUlDiv.childNodes.length !== 1) {
        console.log(
          `PANIC videosUlDiv.childNodes.length === ${videosUlDiv.childNodes.length}`
        );
        return false;
      }
      let videosUl = videosUlDiv.childNodes[0];
      console.log(`EXPECTED videosUl`);
      if (!(videosUl.childNodes.length >= 1)) {
        console.log(
          `PANIC videosUl.childNodes.length === ${videosUl.childNodes.length}`
        );
        return false;
      }
      var videoLiList = videosUl.childNodes;
      console.log("EXPECTED videoLiList");

      // 检查函数
      function needToBePlayed(videoLi) {
        // 不稳定
        try {
          let videoLiInnerTexts = videoLi.innerText.split("\n");
          let videoLiPercentageText = videoLiInnerTexts[1];
          let videoLiPercentageNumber = parseInt(
            videoLiPercentageText.trim("%").slice(0, -1)
          );
          if (videoLiPercentageNumber < 100) return true;
          else return false;
        } catch {
          return false;
        }
      }

      // 遍历检查
      atLeastOneVideoNeedToBePlayed = false;
      for (let i = 0; i < videoLiList.length; i += 1) {
        let videoLi = videoLiList[i];
        if (needToBePlayed(videoLi)) {
          videoLi.click();
          console.log(`ACTION videoLiList[${i}].click()`);
          atLeastOneVideoNeedToBePlayed = true;
          break;
        }
      }
      if (!atLeastOneVideoNeedToBePlayed) {
        window.close();
      }
    } // if (videoElement.currentTime + 1 > videoElement.duration)

    // 返回
    return true;
  }

  for (let i = 0; i >= 0; i += 1) {
    await sleep(1000);
    patrol();
  }
})();
