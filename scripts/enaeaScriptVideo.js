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
        .padStart(4, '0');
      console.log(`SLEEP#${uuid} START`);
      setTimeout(function () {
        resolve(uuid);
      }, msecs);
    }).then(function (uuid) {
      console.log(`SLEEP#${uuid} END`);
    });
  }

  // 视频元素
  let videoElementList = document.getElementsByTagName('video');
  if (videoElementList.length !== 1) {
    console.log(`PANIC videoElementList.length === ${videoElementList.length}`);
    return false;
  }
  var videoElement = videoElementList[0];
  console.log(`EXPECTED videoElement`);

  // 中央暂停键
  let centerButtonList = document.getElementsByClassName('xgplayer-start');
  if (centerButtonList.length !== 1) {
    console.log(
      `UNDEFINED centerButtonList.length === ${centerButtonList.length}`,
    );
  } else {
    let centerButton = centerButtonList[0];
    console.log(`EXPECTED centerButton`);
    if (videoElement.paused) centerButton.click();
  }

  // 边角暂停键
  let cornerButtonList = document.getElementsByClassName('xgplayer-play');
  if (cornerButtonList.length !== 1) {
    console.log(
      `UNDEFINED cornerButtonList.length === ${cornerButtonList.length}`,
    );
  } else {
    let cornerButton = cornerButtonList[0];
    console.log(`EXPECTED cornerButton`);
    if (videoElement.paused) cornerButton.click();
  }

  // 视频列表
  let videosUlDivList = document.getElementsByClassName(
    'cvtb-main-content-kecheng-content',
  );
  if (videosUlDivList.length !== 1) {
    console.log(`PANIC videosUlDivList.length === ${videosUlDivList.length}`);
    return false;
  }
  let videosUlDiv = videosUlDivList[0];
  if (videosUlDiv.childNodes.length !== 1) {
    console.log(
      `PANIC videosUlDiv.childNodes.length === ${videosUlDiv.childNodes.length}`,
    );
    return false;
  }
  let videosUl = videosUlDiv.childNodes[0];
  if (!(videosUl.childNodes.length >= 1)) {
    console.log(
      `PANIC videosUl.childNodes.length === ${videosUl.childNodes.length}`,
    );
    return false;
  }
  console.log('EXPECTED videosUl');
  videoLiList = videosUl.childNodes;
  console.log('EXPECTED videoLiList');

  // 遍历检查
  for (let i = 0; i < videoLiList.length; i += 1) {
    let videoLi = videoLiList[i];
    if (videoLi.childNodes.length !== 1) {
      console.log(
        `PANIC videoLi.childNodes.length === ${videoLi.childNodes.length}`,
      );
      return false;
    }
    console.log(`EXPECTED videoLi = videosUl[${i}]`);
  }

  // await sleep(1000);
  // await sleep(1000);
  // await sleep(1000);
})();
