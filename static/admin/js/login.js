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

var getCookie=function () {
	//得到保存的用户名和密码
	var uname=$.cookie('bag-userName');
	var upwd=$.cookie('bag-upwd');
	if(uname != undefined && upwd != undefined){
		$('#userName').val(uname);
		$('#password').val(upwd);
		$('#password').attr('type','password');
		$('input[type="checkbox"]').attr('checked',true);
	}
};

var setCookie=function () {
	var eleChk=	$('input[type="checkbox"]');
	eleChk.on('click',function () {
		if(this.checked){
			var uname=$('#userName').val(),
				upwd=$('#password').val();
			if(uname != '' && upwd != ''){
				$.cookie('bag-userName',uname, {
					expires: 30
				});
				$.cookie('bag-upwd',upwd, {
					expires: 30
				});
				var title = "保存成功"
					,icon = 1;
				common.layerMsg(title,icon);
			}
		}
		else{
			var title = "取消保存成功!"
					,icon = 1;
				common.layerMsg(title,icon);
		}
	});
};

$(function() {
	common.unComplate();
	$('.input-text').eq(0).focus();
	getCookie();
	setCookie();
	var objForm = $(".J-login"),sbtn=$('.J-submit');
	//阻止点击默认事件
	objForm.submit(function(e) {
		e.preventDefault();
	});
	sbtn.on('click',function(e){
		if($(this).hasClass('loadingBtn')){
			e.preventDefault();
		}
	});
	//validfrom
	var info='<div class="info-wrapper"><div class="info">'+
            '<span class="Validform_checktip J-tips"></span>'+
            '<span class="dec"><s class="dec1">◆</s><s class="dec2">◆</s></span>'+
        '</div></div>';
	objForm.Validform({
		tiptype: function(msg, o, cssctl) {
			//msg：提示信息;
			//o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
			//cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;

			if (!o.obj.is("form")) { //验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
				 $(o.obj).find('.info-wrapper').remove();
                    $(o.obj).before(info);
                    var objtip=o.obj.parent().find(".Validform_checktip");
                    cssctl(objtip,o.type);
                    objtip.text(msg);


                    var infoObj=o.obj.parent().find(".info");
                    if(o.type==2){
                        infoObj.fadeOut(200);
                    }else{
                        if(infoObj.is(":visible")){return;}
                        var left=o.obj.offset().left,
                            top=o.obj.offset().top;

                        infoObj.css({
                            right:0,
                            top:-45
                        }).show().animate({
                            top:-31
                        },200);

                    }

			}
		},
		callback: function() {
			loginAjax();
		}
	});
	//执行提交事件
	var loginAjax = function() {
		var url = _configbase.login,
			fields = $(".J-login").serializeArray();
		var beforBack=function(){
			btnLogin();
		},successBack=function(){
			if( ajaxData.success == false ){
				common.loginError();
				btnNoLogin();
				return false;
			}
			successLogin(ajaxData);
		};
		common.ajaxFun(url, fields, beforBack, successBack, btnNoLogin);


	};

	var btnLogin=function(){
		sbtn.val('登录中');
		sbtn.addClass('loadingBtn');
		sbtn.addClass('disabled');
		indexLoad = layer.load();
	};
	var btnNoLogin=function(){
		sbtn.val('登录');
		sbtn.removeClass('loadingBtn');
		sbtn.removeClass('disabled');
		layer.closeAll();
	};


	//提交成功跳转
	var successLogin = function(data) {
		if (data.success == false) {
			var titles="用户名或密码错误!",icons= 2,bac=function(){
				btnNoLogin();
			};
			common.layerMsg(titles,icons,bac);
		} else {
            id = data.data.id;//acountId
			name = data.data.name;
			user = data.data.userName;
			role = data.data.roleName;
			roleId = data.data.roleId;
			coder = data.data.code;
			cameraType = data.data.cameraType;
			if(coder != "CG" && coder != "Dl"){
				schoolName=data.data.schoolName;
				schoolId=data.data.schoolId;
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
			location.replace("home.html");
		}
	};
});