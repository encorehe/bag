/* -----------贝安港后台登录------------
 * login.js v1
 * http://www.encorehe.com/
 * Created & Modified by hejiachao
 * Date modified 2016-02.05
 *
 * Copyright 2013-2016 武汉缘诚科技 All rights reserved.
 * Licensed under MIT license.
 * http://opensource.org/licenses/MIT
 *
 */
var thats,
	datas = [],
	datasMenu = [],
	temD = [];
var back = function() {
	location.replace("index.html");
};
var index = {
	init: function() {
		thats = index;
		thats.renderInfo();
	},
	otherCard:function () {
		var doOtherSf = function (data) {
			var oldUserId = parseInt($.cookie('bag-roleId'));
			for (var i=0;i<data.length;i++){
				if (data[i].id == oldUserId){
					data[i].issCur = true;
				}
			}
			//console.log(data);
            $('.J-otherSf').on('click',function () {
            	var title = "点击选择其他身份",
					area = ["250px","150px"],
					content = template("sfTpl",{list:data}),
					successBack = function () {
						$('.J-shenfen li').on('click',function () {
							var th = $(this),thv = th.hasClass('active'),thItem =data[th.index()];
							newData = thItem;
							if (thv){
								return false;
							}else{
								var url = _configbase.selectRole,
									datas = {"roleId":parseInt(thItem.id)},
                                    successBack = function () {
                                        id = newData.id;//acountId
                                        name = newData.name;
                                        user = $.cookie('bag-user');
                                        role = newData.roleName;
                                        roleId = newData.roleId?newData.roleId:newData.id;
                                        coder = newData.code;
                                        cameraType = newData.cameraType;
                                        if(coder != "CG" && coder != "Dl"){
                                            schoolName=newData.schoolName;
                                            schoolId=newData.schoolId;
                                            $.cookie('bag-school',schoolName, {
                                                expires: 30
                                            });
                                            $.cookie('bag-schoolId',schoolId, {
                                                expires: 30
                                            });
                                        }
                                        $.cookie('bag-user-name',name, {
                                            expires: 30
                                        });
                                        $.cookie('bag-user',user, {
                                            expires: 30
                                        });
                                        $.cookie('bag-user-id',id, {
                                            expires: 30
                                        });
                                        $.cookie('bag-role',role, {
                                            expires: 30
                                        });
                                        $.cookie('bag-code',coder, {
                                            expires: 30
                                        });
                                        $.cookie('bag-roleId',roleId, {
                                            expires: 30
                                        });
                                        $.cookie('bag-cameraType',cameraType, {
                                            expires: 30
                                        });
                                        location.reload();
                                    };
                                common.ajaxFun(url,datas,null,successBack);
							}
                        })
                    };
				common.layerBox(title,area,content,successBack)
            })
        };
		//其他身份
		var url = _configbase.accountsRolesList,
			data = {},
			successBack = function (data) {
				if (data.list.length==1){
					$('.J-otherSf').remove();
				}else{
					doOtherSf(data.list);
				}
            };
		common.ajaxFun(url, data,null, successBack);
    },
	renderInfo:function(){
		thats.otherCard();
		//写入基础信息
		var url = _configbase.menu,
			beforBack = function() {},
			successBack = function() {
				if (ajaxData.success == false) {
					if (ajaxData.ecode == 'E000001') {
						common.loginTimeout();
					}
				} else {
					//填充信息
					datasMenu = ajaxData.list;
					if(datasMenu.length == 0){
						common.loginTimeoutTitle("暂无权限，请联系您的上级进行权限添加");
					}
					name = $.cookie('bag-user-name');
					user = $.cookie('bag-user');
					role = $.cookie('bag-role');
					coder = $.cookie('bag-code');
					if(role == "一级代理" || role == "二级代理"){
						role = name;
					}
					$('.J-user').text(user);
					$('.J-topRole').text(role);
					if(coder != 'CG' && coder !='Dl'){
						schoolNames = $.cookie('bag-school');
						if(schoolNames != "null" && schoolNames != undefined){
							$('.J-sc').html(schoolNames);
						}
					}
					//加载菜单
					thats.renderMenu();
				}
			},
			completeBack = function() {
				thats.indexAction();
			},
			errorBack = function() {
				common.loginTimeout();
			};
		common.ajaxFun(url, datas, beforBack, successBack, completeBack, errorBack);
	},
	indexAction: function() {
		//用户名展开
		var objmenu, objItem = $('.item');
		objItem.on('mouseover', function(e) {
			e.preventDefault();
			var th = $(this);
			objmenu = th.parent();
			$(objmenu).addClass('active');
		});

		objItem.parent().on("mouseleave", function() {
			objItem.parent().removeClass('active');
		});

		//退出
		$('.J-loginout,.J-checkout').on('click', function(e) {
			e.preventDefault();
			var title = $(this).data('title'),
				url = _configbase.loginOUt,
				beforBack = function() {

				},
				successBack = function() {
					if (ajaxData.success == true) {
						common.layerMsg(title, 1, back);
					}
				},
				completeBack = function() {

				},
				errorBack = function() {

				};
			common.ajaxFun(url, datas, beforBack, successBack, completeBack, errorBack);
		});
		//修改密码
		$('.J-renPwd').on('click', function(e) {
			e.preventDefault();
			var userId = {"id":$.cookie('bag-user-id')};
			var title = $(this).data('title'),
				pwdUrl = _configbase.accountsEdit,
				_html=template('tplRenPwd',userId),
				area=["500px","240px"],
				successBack=function () {
					formPwd=$('.J-pwdForm');
					common.validformSubmit(formPwd);
				},
				yesBack=function () {
					var callback= function(){
						var fields = formPwd.serialize();
							var beforBack = function() {},
								successBacks = function() {
									if (ajaxData.success == true) {
										common.editSuccess();
									}
								};
							var checkBack = function(){
								common.btnReset();
							};
							common.ajaxFunIframe(pwdUrl,fields, beforBack, successBacks, null, null,checkBack);
					};
					common.validformIn(formPwd,callback);
				};
			common.layerConfirm(title,area,_html,successBack,yesBack);
		});
		//菜单滑动
		$('.J-sideClose').on('click', function(e) {
			e.preventDefault();
			var ths = $(this),
				objSide = $('.side-left'),
				objCont = $('.side-cont');
			if (objSide.hasClass('activeClose')) {
				objSide.removeClass('activeClose');
				ths.html('&#xe60b;');
				objSide.animate({
					width: "160px"
				});
				objCont.animate({
					"margin-left": "160px"
				});
			} else {
				objSide.addClass('activeClose');
				ths.html('&#xe60c;');
				objSide.animate({
					width: "60px"
				});
				objCont.animate({
					"margin-left": "60px"
				},function(){
					if(mmg){
						debugger;	
					}
				});

			}
			//$('.table-wrapper').empty();
		});
	},
	renderMenu: function(hash) {
		//加载侧导航
		var menuHtml = template('sideMenu', {
			list: datasMenu
		});
		$('.J-menu').append(menuHtml);
		thats.menuAction();
		thats.navH();
		$(".menu-box").mCustomScrollbar({
			scrollButtons:{
				enable:true,
				scrollType:"continuous",
				scrollSpeed:20,
				scrollAmount:40
			},
			horizontalScroll:false,
			theme:"minimal"
		});
	},
	menuReset:function () {
		temD=[];
		$('.J-menu dl').removeClass('active');
		$('.J-menu a').removeClass('actived');
	},
	menuAction: function() {
		//导航的一些事件
		$('.J-dt').on('click',function () {
			var th=$(this);
			if(th.hasClass('actived')){
				return false;
			}
			else{
				thats.menuReset();
				eleDl=th.parent().parent();
				th.addClass('actived');
				eleDl.addClass('active');
				var url=th.data('href'),eName=th.data('enname');
				temD.push(datasMenu[eleDl.index()]);
				if(url != '' && url != null){
					thats.renderCont(eName,url);
				}
				else{
					$(th.parent().next()).find('a').eq(0).click();
				}
			}

		});

		$('.J-dd').on('click',function (e) {
			e.preventDefault();
			//添加
			var th=$(this);
			if(th.hasClass('actived')){
				return false;
			}
			else{
				thats.menuReset();
				var eleDl= th.parent().parent(),eleDd=th;
				eleDl.addClass('active');
				th.addClass('actived');
				temD.push(datasMenu[eleDl.index()]);
				temD.push(datasMenu[eleDl.index()].subNav[eleDd.index()]);
				var url=th.data('href'),eName=th.data('enname');
				thats.renderCont(eName,url);
			}
		});

		var chash=$.hash('page');
		if(chash==null){
			$('.J-menu dl').eq(0).find('dt a').click();
		}



	},
	renderCont: function(hash,url) {
		$.hash('page', hash);
		var html = template('readCrumb', {
			list: temD
		});
		//console.log(temD);
		$('.J-breadcrumb').html(html);
		$.ajax({
			url: url,
			dataType: "text",
			type: "POST",
			data: {},
			beforeSend: function () {
				resetFun=false;
				var index = layer.load(1, {
					shade: [0.1, '#fff'] //0.1透明度的背景
				});
			},
			success: function(data){
				template.config('cache',false);
				mmg=null;
				$("#article-main").empty();
				setTimeout(function () {
					layer.closeAll();
					shoolCurrent = undefined;
					$("#article-main").html(data);
				},50);

			}
		});

		thats.navH();
	},
	navClick:function(enname){
		$('.J-menu').find('a[data-enname="' + enname + '"]').click();
	},
	navH:function(){
		$('.menu-box').height($('.side-left').height() - $('.bar').height());
	},
	hashChange:function () {
		thats.renderCont();
	}
};



$(window).on('load', function() {
	index.init();
	setTimeout(function () {
		if($('#article-main').html()==''){
			chash=$.hash('page');
			$('.J-menu a[data-enname="'+chash+'"]').click();
		}
	},400);
});


$(function () {
	window.onhashchange=function(){
		chash=$.hash('page');
		$('.J-menu a[data-enname="'+chash+'"]').click();
	};
});


