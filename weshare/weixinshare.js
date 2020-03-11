
;(function(global){
	var wxmysignature;//签名
	var wxappid;//微信id
	var wxurl=window.location.href;//地址
	var wxDomain=window.location.host;//域名
	var wxtitle="";//分享标题
	var wxdesc="";//分享描述
	var wximg="https://static.qiyekexie.com/common/images/logo_f.png";//分享图片

	var wxinit = function(signature){
		if (signature!='')
		{
			wxmysignature=signature;
		}
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: wxappid, // 必填，公众号的唯一标识
		    timestamp: 1420810476, // 必填，生成签名的时间戳
		    nonceStr: 'wuxishetuanguanlipintai', // 必填，生成签名的随机串
		    signature: wxmysignature,// 必填，签名，见附录1
		    jsApiList: ['checkJsApi',
		                'onMenuShareTimeline',
		                'onMenuShareAppMessage',
		                'onMenuShareQQ',
		                'onMenuShareWeibo',
		                'hideMenuItems',
		                'showMenuItems',
		                'hideAllNonBaseMenuItem',
		                'showAllNonBaseMenuItem',
		                'translateVoice',
		                'startRecord',
		                'stopRecord',
		                'onRecordEnd',
		                'playVoice',
		                'pauseVoice',
		                'stopVoice',
		                'uploadVoice',
		                'downloadVoice',
		                'chooseImage',
		                'previewImage',
		                'uploadImage',
		                'downloadImage',
		                'getNetworkType',
		                'openLocation',
		                'getLocation',
		                'hideOptionMenu',
		                'showOptionMenu',
		                'closeWindow',
		                'scanQRCode',
		                'chooseWXPay',
		                'openProductSpecificView',
		                'addCard',
		                'chooseCard',
		                'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		
	};
	
	function weixinShare(t,d,pic){
		wxtitle=t;
		wxdesc=d;
		if (pic!=null && pic!='' && typeof(pic)!="undefined")
		{
			wximg=pic;
		}
		$.ajax({
			type: 'get',
			url: '/app/mycloud',
			dataType: 'json',
			data:{jsonParams:'{method:"getCompanyInfoByUrl",params:{domain:"mycloud.com",servername:"'+wxDomain+'",url:"'+wxurl+'"},token:""}'},
			success: function(backdata) {
				wxmysignature=backdata.result.signatureinfo;
				wxappid=backdata.result.weixiid;
				if (wxtitle==null || wxtitle=="")
				{
					wxtitle=backdata.result.companyname+"分享";
					wxdesc=backdata.result.companyname+"分享";
				}

				wxinit(wxmysignature);
			}
		});
	};

	wx.ready(function(res){
		
		wx.onMenuShareTimeline({//分享到朋友圈
		    title: wxtitle, // 分享标题
		    desc: wxdesc,
		    link: wxurl, // 分享链接
		    imgUrl: wximg, // 分享图标
		    success: function () {
		        // 用户确认分享后执行的回调函数
		        alert("分享成功");
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		        alert("您已取消分享");
		    }
		});
		
		wx.checkJsApi({
		    jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
		    success: function(res) {
		        // 以键值对的形式返回，可用的api值true，不可用为false
		        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
		        //alert("分享装载成功");
		    }
		});
		wx.onMenuShareAppMessage({//分享给朋友
		    title: wxtitle, // 分享标题
		    desc: wxdesc, // 分享描述
		    link: wxurl, // 分享链接
		    imgUrl: wximg, // 分享图标
		    type: 'link', // 分享类型,music、video或link，不填默认为link
		    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		        alert("分享成功");
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    	alert("分享失败");
		    }
		});
		wx.onMenuShareQQ({//分享到QQ
		    title: wxtitle, // 分享标题
		    desc: wxdesc, // 分享描述
		    link: wxurl, // 分享链接
		    imgUrl: wximg, // 分享图标
		    success: function () { 
		       // 用户确认分享后执行的回调函数
		    	alert("分享成功");
		    },
		    cancel: function () { 
		       // 用户取消分享后执行的回调函数
		    	alert("分享失败");
		    }
		});
		wx.onMenuShareWeibo({//分享到腾讯微博
		    title: wxtitle, // 分享标题
		    desc: wxdesc, // 分享描述
		    link: wxurl, // 分享链接
		    imgUrl: wximg, // 分享图标
		    success: function () { 
		       // 用户确认分享后执行的回调函数
		    	alert("分享成功");
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    	alert("分享失败");
		    }
		});
	});
	wx.error(function(res){
//		alert("error===="+res);
	});

	global.weixinShare = weixinShare;
})(window);
