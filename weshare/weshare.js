import Vue from "vue"
import wx from 'weixin-js-sdk';

const ShareImpl = function (option) {
  //option是分享的配置内容*/
  //   const url = window.location.href.split("#")[0];
  //   window.console.log(url, JSON.stringify(option));
  var infoUrl = process.env.NODE_ENV == 'production' ? 'http://www.shetuan365.cn/app/mycloud' : '/app/mycloud';


  //   var wxurl = window.location.href; //地址
  //   var wxDomain = window.location.host; //域名
  var wxDomain = '365.shetuan365.cn'
  var wxurl = ''

  Vue.prototype.$Get(infoUrl, {

    jsonParams: '{method:"getCompanyInfoByUrl",params:{domain:"mycloud.com",servername:"' + wxDomain + '",url:"' + wxurl + '"},token:""}'
  }).then((response) => {
    wx.config({
      debug: false,
      appId: response.data.weixiid,
      timestamp: new Date().getTime(),
      nonceStr: response.data.accessticket,
      signature: response.data.signatureinfo,
      jsApiList: [
        'updateAppMessageShareData',
        'updateTimelineShareData',
      ]
    });
  }).catch(error => {
    window.console.log(error);
  });
  wx.ready(function () {
    wx.updateAppMessageShareData({
      title: option.shareTitle,
      desc: option.shareDesc,
      link: option.shareUrl,
      imgUrl: option.shareImg
    });
    wx.updateTimelineShareData({
      title: option.shareTitle,
      desc: option.shareDesc,
      link: option.shareUrl,
      imgUrl: option.shareImg,
    });
  })
  /*}*/
}

export default ShareImpl


// weshare() {
//       let url = window.location.href;
    
//       ShareImpl({
//         shareTitle: this.pageDetail.society.title,
//         shareDesc: this.pageDetail.society.viewcontent,
//         shareUrl: url,
//         shareImg: location.origin + "/portal/kyOfficial/logo.png"
//       });
//     },