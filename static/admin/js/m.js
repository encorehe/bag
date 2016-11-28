///<jscompress sourcefile="admin.js" />
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
	renderInfo: function() {
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
					user = $.cookie('bag-user');
					role = $.cookie('bag-role');
					coder = $.cookie('bag-code');
					$('.J-user').text(user);
					$('.J-topRole').text(role);
					if(coder != 'CG' && coder !='Dl'){
						schoolNames = $.cookie('bag-school');
                        if(schoolNames != "null" && schoolNames != undefined){
						    $('.J-sc').text(schoolNames);
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
                    var formPwd=$('.J-pwdForm');
                    common.validformSubmit(formPwd);
                },
                yesBack=function () {
                    var formPwd=$('.J-pwdForm');
                    var i=0;
                    formPwd.submit(function (e) {
                        e.preventDefault();
                        common.validformSubmit(formPwd);
                        if(sFlag&&sFlag==true&&i==0){
                            i++;
                            var fields = formPwd.serialize();
                            var beforBack = function() {},
                                successBacks = function() {
                                    if (ajaxData.success == true) {
                                        common.editSuccess();
                                    }
                                };
                            common.ajaxFunIframe(pwdUrl,fields, beforBack, successBacks);
                        }
                        else{
                            i--;
                        }

                    });
                    formPwd.submit();
                };
            common.layerConfirm(title,area,_html,successBack,yesBack);
        });
		//菜单滑动
		$('.J-sideClose').on('click', function(e) {
			e.preventDefault();
			var ths = $(this),
				objSide = $('.side-left'),
				objCont = $('.side-cont');
			if (objSide.hasClass('active')) {
				objSide.removeClass('active');
				ths.html('&#xe60b;');
				objSide.animate({
					width: "160px"
				});
				objCont.animate({
					left: "160px"
				});
			} else {
				objSide.addClass('active');
				ths.html('&#xe60c;');
				objSide.animate({
					width: "60px"
				});
				objCont.animate({
					left: "60px"
				});
			}
			$('.table-wrapper').empty();
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


window.onresize = function () {
  index.navH();
};

$(function () {
    window.onhashchange=function(){
        chash=$.hash('page');
        $('.J-menu a[data-enname="'+chash+'"]').click();
    };
})



///<jscompress sourcefile="main.js" />
/* -----------贝安港后台登录------------
 * main.js v1
 * http://www.encorehe.com/
 * Created & Modified by hejiachao
 * Date modified 2016-02.05
 *
 * Copyright 2013-2016 武汉缘诚科技 All rights reserved.
 * Licensed under MIT license.
 * http://opensource.org/licenses/MIT
 * eg:主体内容 列表及表格数据的获取展现，数据增、删、改、查
 */
_dataParams={};
var ths,
	it,
	listUrl,
	editUrl,
	addUrl,
	delUrl,
    qiyongUrl,
	addTpl,
	editTpl,
	chkTpl,
	addArea,
	editArea,
	chkArea,
	datasCur,
	chkTitle,
	addTitle,
	editTitle,
	delTitle,
	titleStart,
	titleEnd,
	mmg,
	indexCol,
	checkCol,
	cols,
	root,
	allData = [],
	itemsc = [],
	addCallback,
	editCallback,
	chkCallback,
	resetPwdUrl,
	resetFun = false,
	resetFunAdd,
	resetFunEdit,
	resetFunDel,
	tabArea,
	tabOption,
	tabCallback,
	currentUrl,
    zhuangtaiTag=undefined;
var mainCont = {
	getList: function(items, options, callback) {
		//获得基础
		it=items;
		ths = mainCont;
		var opt = options[0];
		listUrl = opt.url.list;
		editUrl = opt.url.edit;
		addUrl = opt.url.add;
		delUrl = opt.url.del;
        qiyongUrl = opt.url.del+"?isUse=1";
		addTpl = opt.tpl.add;
		editTpl = opt.tpl.edit;
		chkTpl = opt.tpl.chk;
		addArea = opt.area.add;
		editArea = opt.area.edit;
		chkArea = opt.area.chk;
		addTitle = opt.title.add;
		editTitle = opt.title.edit;
		chkTitle = opt.title.chk;
		delTitle = opt.title.del;
		titleStart=opt.title.titleStart;
		titleEnd=opt.title.titleEnd;
		indexCol = opt.mmg.indexCol;
		checkCol = opt.mmg.checkCol;
		root = opt.mmg.root;
		if(opt.params){
			//dataParams = opt.params;
		}

		if (opt.callback) {
			addCallback = opt.callback.add;
			editCallback = opt.callback.edit;
			chkCallback = opt.callback.chk;
		}
		if (opt.url.resetPwdUrl && opt.url.resetPwdUrl.length > 0) {
			resetPwdUrl = opt.url.resetPwdUrl;
		}
		if (opt.resetFun) {
			resetFun = true;
			resetFunAdd = opt.resetFun.add;
			resetFunEdit = opt.resetFun.edit;
			resetFunDel = opt.resetFun.del;
		}
		if(opt.tab){
			tabArea = opt.tab.area;
			tabOption = opt.tab.option;
			tabCallback = opt.tab.callback;
		}
		//AJAX示例
		currentUrl = listUrl;
		ths.mmGrids(currentUrl);
		if (callback) {
			callback();
		}
	},
	mmGrids: function(url) {
		mmg = $('#mmg').mmGrid({
			multiSelect: true,
			indexCol: indexCol,
			checkCol: checkCol,
			indexColWidth: 25,
			cols: it,
			root: root,
			width:'auto',
			height: 'auto',
			fullWidthRows: true,
			autoLoad:true,
			noDataText: "当前查询未获取到任何信息",
			url: url,
			items: it,
            cache:false,
			//sortName: 'name',
			sortStatus: 'asc',
			nowrap: false,
			method: 'post',
			 showBackboard: false,
			 params:_dataParams,
			plugins: [
				$('#paginator').mmPaginator({
					style: 'plain',
					totalCountName: 'totalCount',
					page:_dataParams.page,
					pageParamName: 'page',
					limitParamName: 'count',
					limitLabel: '每页{0}条',
					totalCountLabel: '共<span>{0}</span>条记录',
					limit: it,
					limitList: [20, 30, 40, 50]
				})
			]
		}).on('loadSuccess', function(e, data) {
			if(data){
				allData = data.list;
			}
			$(".mmg-bodyWrapper").mCustomScrollbar("destroy");
			common.iframeLayerMsg("数据加载完成",1,mainCont.scrollBar());

			$('.mmg-check').on('click',function(e){
				var t=$(this),tpp=t.parent().parent();
				tpp.click();
			});

			//搜索
            //
            $('.J-searchForm').submit(function (e) {
                e.preventDefault();
            });

			var sbtn=$('.J-searchBtn');
				sbtn.removeClass('disabled');
                sbtn.unbind('click').click(function (e) {
                    e.preventDefault();
                    sbtn.addClass('disabled');
                    common.creatSearch();
                    mmg.load(_dataParams);
			    });




		});
        ths.actionBar();

        		if(mmg){
	                var selectItem=$('.action .J-search select');
	                selectItem.on('change',function (e) {
	                    e.stopPropagation();
	                   var t=$(this),tname=t.data('name');
	                   if(tname=='schoolId' || tname =="classId")
	                   {
	                       return false;
	                   }else{
	                       common.creatSearch();
	                       mmg.load(_dataParams);
	                   }


	                });
                }

		mmg.on('cellSelected', function(e, item, rowIndex, colIndex) {
			var itsc = $(this).find('tbody tr').eq(rowIndex);
			itemsc.push(item);
			//查看
			if ($(e.target).is('.J-info')) {
				e.stopPropagation(); //阻止事件冒泡
				datasCur = item;
                datasCur.key=rowIndex;
                mmg.select(rowIndex);
				ths.chkDatas(datasCur);
			} else if ($(e.target).is('.J-del')) {
				e.stopPropagation(); //阻止事件冒泡
				datasCur = item;
				ths.delDataF(3,datasCur,delUrl);

			} else if ($(e.target).is('.J-edit')) {
				e.stopPropagation(); //阻止事件冒泡
				datasCur = item;
                datasCur.key=rowIndex;
                zhuangtaiTag="bianji";
                mmg.select(rowIndex);
				ths.editDatas(item);
			} else if ($(e.target).is('.J-resetPwd')) {
				e.stopPropagation(); //阻止事件冒泡
				datasCur = item;
                mmg.select(rowIndex);
				ths.resetPwd(datasCur);
			} else if ($(e.target).is('.J-tabs')) {
				e.stopPropagation(); //阻止事件冒泡
				datasCur = item;
							}
			else if($(e.target).is('.J-qiyong')){
				e.stopPropagation(); //启用
				datasCur = item;
                mmg.select(rowIndex);
				ths.delDataF(1, datasCur,qiyongUrl);
			}else if($(e.target).is('.J-tingyong')){
				e.stopPropagation(); //停用
				datasCur = item;
                mmg.select(rowIndex);
				ths.delDataF(0, datasCur,delUrl);
			}
		}).on('loadSuccess', function(e, data) {
			//这个事件需要在数据加载之前注册才能触发
			//console.log('loadSuccess!');
			//console.log(data);
			//console.log(mmg.rowsLength());
		}).on('rowInserted', function(e, item, index) {
			//console.log('rowInserted!');
			//console.log(item);
			//console.log(index);
			//console.log(mmg.rowsLength());
		}).on('rowUpdated', function(e, oldItem, newItem, index) {
			//console.log('rowUpdated!');
			//console.log(oldItem);
			//console.log(newItem);
			//console.log(index);
		}).on('rowRemoved', function(e, item, index) {
			//console.log(item);
			//console.log('rowRemoved!');
			//console.log(item);
			//console.log(index);
			//console.log(mmg.rowsLength());
		});
	},
	scrollBar:function () {
		var _w = $(window);
		var bdheight = _w.height(),
			headH = $('.header').height(),
			breadcrumbH = $('.breadcrumb').height(),
			iframePh = $('.action').height()+55;
		var huitab = $('.HuiTab').height() ? $('.HuiTab').height() : 0;
		var tableH = bdheight - headH - breadcrumbH - iframePh - huitab-$('.mmg-headWrapper').height();
		$('.mmg-bodyWrapper').css('max-height', tableH);
		$(".mmg-bodyWrapper").mCustomScrollbar({
			scrollButtons: {
				enable: true,
				scrollType: "continuous",
				scrollSpeed: 20,
				scrollAmount: 40
			},
			horizontalScroll: false,
			theme: "minimal"
		});
	},
	actionBar: function() {
		//全选
		$('.checkAll').on('click', function(e) {
			var th = $(this);
			if (th.prop('checked') == false) {
				itemsc = [];
			} else {
				itemsc = allData;
			}
		});
		//删除
		$('.J-delAll,.J-del').on('click', function(e) {
			e.preventDefault();
			ths.delDataF(3, itemsc,delUrl);
		});
		//批量停用
		$('.J-tingyongAll').on('click', function(e) {
			e.preventDefault();
			ths.delDataF(0, itemsc,delUrl);
		});
		//批量启用
		$('.J-qiyongAll').on('click', function(e) {
			e.preventDefault();
			ths.delDataF(1, itemsc,qiyongUrl);
		});
		// //添加事件
		$('.J-add').bind('click', function(e) {
			e.preventDefault();
            zhuangtaiTag="zengjia";
			ths.addData();
		});

	},
	chkDatas: function(datas) {
		var content = template(chkTpl, datas);
		successBack = function() {
			if (chkCallback) {
				chkCallback();
                $('.layui-layer-btn').remove();
			}
		};
		common.layerConfirm(chkTitle, chkArea, content, successBack)
	},
	delDataF: function(type,datas,url) {
		var delData = [],
			delDatas = {};
            if(datas.length != undefined && datas.length>0){
                var hashs=$.hash('page');
                for (var i = 0; i < datas.length; i++) {
                    if(hashs=="parents"){
                        delData.push(datas[i].accountId);
                    }
                    else{
                        delData.push(datas[i].id);
                    }
                }
                delDatas.id = delData;
            }else{
                for(var j=0;j<allData.length;j++){
                    if(allData[j].id==datas.id){
                        mmg.select(j);
                    }
                }
                var hashs=$.hash('page');
                if(hashs=="parents"){
                    delData.push(datas.accountId);
                }else{
                    delData.push(datas.id);
                }
                delDatas.id = delData;
               
            }

		//console.log(delDatas);
		var _titleEmpty = '',
			_titleQr = '',
			_titleYes = '';
		switch (type) {
			case 0:
				_titleEmpty = "您还未选中需要"+titleEnd+"的数据";
				_titleQr = "是否确定"+titleEnd+"!";
				_titleYes = titleEnd+"成功";
				break;
			case 1:
				_titleEmpty = "您还未选中需要"+titleStart+"的数据";
				_titleQr = "是否确定"+titleStart+"!";
				_titleYes = titleStart+"成功";
				break;
			case 3:
				_titleEmpty = "您还未选中需要删除的数据";
				_titleQr = "是否确定删除!";
				_titleYes = "删除成功";
				break;
		}
        if(itemsc.length==0){
            common.iframeLayerMsg(_titleEmpty, 2);
            return;
        }

        var yesBack = function() {
                var beforBacks = function() {},
                    successBack = function() {
                        $('.checkAll').prop('checked', false);
                        common.iframeLayerMsg(_titleYes, 1, function() {
                            itemsc = [];
                            mmg.load();
                        });
                    };
                common.ajaxFunIframe(url, delDatas, beforBacks, successBack);
            };
       var cancel=function () {
           mmg.deselect("all");
           itemsc = [];
       } ;
        common.layerMsgFlag(_titleQr,yesBack,cancel);

	},
	addData: function() {
		//添加
		var cont = template(addTpl, {}),
			success = function() {
				if (addCallback) {
					addCallback();
				}
				var eleForm=$('.J-addForm');
				common.validformSubmit(eleForm);
              //  common.validformIn(eleForm,callback);
			},
			yes = function() {
				if (resetFun == true && resetFunAdd != null) {
					resetFunAdd();
				} else {

					var eleForm=$('.J-addForm');

                    var callback=function () {
                        var addFields = eleForm.serialize(),
                            before = function() {},
                            succes=function() {
                                if (ajaxData.success == true) {
                                    common.iframeLayerMsg("添加成功!", 1, function() {
                                        sFlag=false;
                                        mmg.load(_dataParams);
                                    });
                                }
                            };
                            common.ajaxFunIframe(addUrl,addFields,before,succes);
                    };
                    common.validformIn(eleForm,callback);
				}
			};
			common.layerConfirm(addTitle,addArea,cont,success, yes);

	},
	editDatas: function(datas) {
		//编辑
		var content = template(editTpl,datas),
			successBack = function() {
				if (editCallback) {
					editCallback();
				}
				var formEidt=$('.J-editForm');
				common.validformSubmit(formEidt);
			},
			yesBack = function() {
				if (resetFun == true && resetFunEdit != null) {
					resetFunEdit();
				} else {

					var formEdit=$('.J-editForm');
					var i=0;
					formEdit.submit(function (e) {
						e.preventDefault();
						common.validformSubmit(formEdit);
						if(sFlag&&sFlag==true&&i==0){
							i++;
							var fields = formEdit.serialize();
							var beforBack = function() {},
								successBacks = function() {
									if (ajaxData.success == true) {
										common.iframeLayerMsg("修改成功!", 1, function() {
											sFlag=false;
											mmg.load();
										});
									}
								};
							common.ajaxFunIframe(editUrl,fields, beforBack, successBacks);
						}
						else{
							i--;
						}

					});
					formEdit.submit();

				}
			};
		editLayer=common.layerConfirm(editTitle, editArea,content,successBack, yesBack);

	},
	resetPwd: function(data) {
		var _titleQr = "是否要重置密码",
			resetId = data.id,
			resetUname = data.userName;
		fields = {
			"id": resetId,
			"userName": resetUname
		};
		yesBack = function() {
			beforBack = function() {};
			successBacks = function() {
				if (ajaxData.success == true) {
					common.iframeLayerMsg("密码重置成功!", 1, function() {
						mmg.load();
					});
				}
			};
			common.ajaxFunIframe(resetPwdUrl, fields, beforBack, successBacks);
		};
		common.layerMsgFlag(_titleQr, yesBack);
	}

};
