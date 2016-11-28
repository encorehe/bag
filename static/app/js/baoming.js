var toast = function(message){
	layer.open({
		content: message,
		time: 2
	});
};
var weixinFlag = false,schoolIds="";
var browser = {
	versions: function () {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {     //移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
var $t=null;
var bagWeb = {
	"init":function () {
		$t=bagWeb;
		$t.baomingBtn();
		if (browser.versions.mobile || browser.versions.ios || browser.versions.android || browser.versions.iPhone || browser.versions.iPad || browser.versions.webApp) {//判断是否是移动设备打开。browser代码在下面
			ua = navigator.userAgent.toLowerCase();//获取判断用的对象
			//ua = "mozilla/5.0 (iphone; cpu iphone os 9_3_3 like mac os x) applewebkit/601.1.46 (khtml, like gecko) mobile/13g34 bagios";
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				//在微信中打开
				var type="";
				weixinFlag = true;
				if(ua.match(/iphone/i)){
					type="ios";	
				}else{
					type="android"
				}
				$t.bowserClicent(type);
			} else if (ua.match(/bagios/i)) {
				//在贝安港客户端打开 ios客户端中打开
				weixinFlag = false;
				$t.bagByIos();
			}else if (ua.match(/bagandroid/i)) {
				//在贝安港客户端打开 安卓客户端中打开
				weixinFlag = false;
				$t.bagByAnzhuo();
			} else if (ua.match(/QQ/i) == "qq") {
				//在QQ打开
				weixinFlag = false;
				var type="";
				//alert(ua);
				if(ua.match(/iphone/i)){
					type="ios";	
				}else{
					type="android"
				}
				$t.bowserClicent(type);
			} else if (browser.versions.ios) {
				//是否在IOS浏览器打
				weixinFlag = false;
				$t.bowserClicent('ios');
			}else if (browser.versions.android){
				//是否在安卓浏览器打开
				weixinFlag = false;
				$t.bowserClicent('android');
			}

		}else{
			//是否在安卓浏览器打开
			$t.bowserClicent('android');
		}
	},"activeFun":function(type){
		$('.J-baoming-box').css('display','block');
		$('.J-btn').on('click',function(e){
			e.preventDefault();
			var ele = $("[datamtype]"),
				callback = function(){
				  var schoolIdss = "";
					if( type=="android" ){
						schoolIdss=window.bag.clickOnAndroid();
					}else{
						schoolIdss=schoolIds;
					}
					var kidName = $('input[name="kidName"]').val(),
						birthDay = $('input[name="birthDay"]').val(),
						kidGender = $('input[name="kidGender"]:checked').val(),
						contactsName = $('input[name="contactsName"]').val(),
						contactsIdentity = $('input[name="contactsIdentity"]').val(),
						contactsPhone = $('input[name="contactsPhone"]').val();
					/*if(schoolIdss="" || schoolIdss == undefined || schoolIdss == false){
						schoolIdss = 20;
					}*/
					/*debugger;
					toast(schoolIdss);*/
					var formData = {
						"kidName":kidName,
						"birthDay":birthDay,
						"kidGender":parseInt(kidGender),
						"contactsName":contactsName,
						"contactsIdentity":contactsIdentity,
						"contactsPhone":contactsPhone,
						"schoolId":parseInt(schoolIdss)
					};
/*
					//toast("schoolId"+schoolIdss);

					toast(kidGender);
					debugger;*/

					$.ajax({
						type: 'post',
						url: $signUpManage.add.url,
						data:formData,
						dataType: "json",
						beforeSend:function () {
							layer.open({type: 2});
						},
						success:function(data){

							if(data.success){
								setTimeout(function(){
									toast('报名成功!');
									$('#formBaoming')[0].reset()
								},500);
							}else{
								setTimeout(function(){
									toast('报名失败!');
								},500);
							}

						},complete:function(){
							layer.closeAll();
						}
					});
				};
			$t.formValidator(ele,callback);
		});
	},
	"formValidator":function(dom,callback){
		var checkType=function(ele,val,typeVail){
			if(typeVail=="*"){
				if(val==""){
					var message = $(ele).attr('empty');
					if(message=="" || message == null){
						message = "必填项!";
					}
					toast(message);
					return false;
				}else{
					return true;
				}
			}

				if(typeVail=="date"){
					if(val==""){
						toast('日期不能为空');
						return false;
					}else{
						var reg = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
						if(reg.exec(val)==null){
							toast('日期格式不正确!');
							ele.focus();
							return false;
						}
					}
				}

				if(typeVail=="m"){
					if(val==""){
						toast('手机号不能为空!');
						return false;
					}else{
						var reg = /^0{0,1}(13[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
						if(reg.exec(val)==null){
							toast('手机号格式不正确!');
							return false;
						}
					}
				}


		};
		//验证表单
		var valiItem = dom,flagTotal=valiItem.length;
		var flagIndex=0;
		$.each(valiItem, function(index, item){
			flagIndex = index;
			var ele = $(item),typeVail = ele.attr('datamtype'),val=ele.val();
			flagItem = checkType(ele,val,typeVail);
			if( flagItem == false){
				return false;
			}
			/*setTimeout(function () {*/
				//console.log('flagIndex:'+flagIndex+"flagTotal"+flagTotal);

				if(flagTotal==flagIndex+1){
					//验证完成
					if(flagItem == undefined || flagItem == true ){
						if(callback){
							//toast('flagTotal:'+flagTotal+",flagIndex:"+flagIndex+"flagItem:"+flagItem);
							callback();
						}
					}
				}
			/*},10)*/
		});

	},
	getHash:function(){
			//取得查询的hash，并去除开头的#号
			var hashStrings = (window.location.hash.length > 0 ? window.location.hash.substring(1) : ""),
			//保持数据的对象
				hashArgs = {},
			//取得每项hash对
				items = hashStrings.length > 0 ? hashStrings.split("&") : [],
				item = null,
				name = null,
				value = null,
				i = 0,
				len = items.length;
			//逐个将每一项添加到hashArgs中
			for (i = 0; i < len; i++) {
				item = items[i].split("=");
				name = decodeURIComponent(item[0]);
				value = decodeURIComponent(item[1]);
				if (name.length > 0) {
					hashArgs[name] = value;
				}

			}

			return hashArgs;
 
	},
	"bagByIos":function(){
		//ios
		$t.activeFun("ios");

	},"bagByAnzhuo":function(){
		//androdi
		$t.activeFun("android");
	},"bowserClicent":function(type){
		//$t.activeFun("ios");
		var sId = $t.getHash();
		tempSchoolId=sId.schoolId;
		tempScheme = sId.scheme;
		var appUrl="";
		 switch(type){
		 case 'ios':
		 appUrl = tempScheme+"://?schoolId="+tempSchoolId;
		 break;
		 case 'android':
		 appUrl = tempScheme+"://schoolAd?schoolId="+tempSchoolId;
		 break;
		 }
		 $t.btnDo(appUrl);

	},btnDo:function(url){
		// 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
        // 否则打开a标签的href链接
       $('.J-btn').on('click',function(){
       		layer.open({type: 2});
       		if(weixinFlag){
       			$t.showPopWx();
       		}else{
       				window.location = url;
				var sId = $t.getHash();
				tempScheme = sId.appType;
					//toast("../appDownload.html#scheme="+tempScheme);
       				setTimeout(function(){ window.location="../appDownload.html#appType="+tempScheme },50000);
				}
       		})
	},baomingBtn:function(){
		$(window).scroll(function(){
			var poi=$('.J-baoming').offset().top-$(window).scrollTop(),
				$btn=$('.J-baomingF');
			if(poi<494){
				$btn.css('display','none');
			}else{
				$btn.css('display','block');
			}
		});
	},showPopWx:function(){
		$('#weixin-tip').css('display','block');
		$('.J-close').on('click',function(){
			$t.hidePopWx();
		})
	},hidePopWx:function(){
		$('#weixin-tip').css('display','no');
	}
};

//初始化
$(function(){
	configAdmin.test();
	bagWeb.init();	
});


function reviceSchoolId(id) {
	//toast(id);
	schoolIds = id;
}

