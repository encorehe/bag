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
    yiyueUrl,
    hushiUrl,
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
	limitList = [],
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
        yiyueUrl = opt.url.del+"?isuse=1";
        hushiUrl = opt.url.del+"?isuse=2";
		addTpl = opt.tpl.add;
		editTpl = opt.tpl.edit;
		chkTpl = opt.tpl.chk;
		if(opt.area){
			addArea = opt.area.add;
			editArea = opt.area.edit;
			chkArea = opt.area.chk;
		}

		if(opt.title){
			addTitle = opt.title.add;
			editTitle = opt.title.edit;
			chkTitle = opt.title.chk;
			delTitle = opt.title.del;
			titleStart=opt.title.titleStart;
			titleEnd=opt.title.titleEnd;
		}
		
		
		indexCol = opt.mmg.indexCol;
		checkCol = opt.mmg.checkCol;
		root = opt.mmg.root;
		limitList = opt.mmg.limitList;
		if(limitList == undefined){
			limitList = [20, 30, 40, 50];
		}
		if(opt.params){
			_dataParams = opt.params;
			isParam = true;
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
		/*	width:'auto',*/
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
					limitList:limitList
				})
			]
		}).on('loadSuccess', function(e, data) {
			if(data){
				allData = data.list;
			}
			if($('.mmg-head').find('tr').length>1){
				$('.mmg-head').addClass('mmg-head-border');
			}
			$(".mmg-bodyWrapper").mCustomScrollbar("destroy");
			var fun = function(){
				mainCont.scrollBar();
				$('.article').css('visibility','visible');
			};


			$(window).on('resize',function(){
				mainCont.scrollBar();
			});

			setTimeout(function(){
				fun();
				//common.iframeLayerMsg("数据加载完成",1);
			},10);



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
	                   var t=$(this),tname=t.data('name'),sval=t.val();
						if(tname==undefined){
							tname = t.attr("name");
						}
	                   if(tname=='schoolId' || tname =="classId")
	                   {
	                       return false;
	                   }else{

						   common.creatSearch();
							setTimeout(function(){
								isParam = false;
								mmg.load(_dataParams);
							},200);

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
                zhuangtaiTag="chk";
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
			}else if($(e.target).is('.J-redaded')){
				e.stopPropagation(); //停用
				datasCur = item;
                mmg.select(rowIndex);
				ths.delDataF(4, datasCur,yiyueUrl);
			}else if($(e.target).is('.J-hushi')){
				e.stopPropagation(); //停用
				datasCur = item;
                mmg.select(rowIndex);
				ths.delDataF(5, datasCur,hushiUrl);
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
		var tableH = bdheight - headH - breadcrumbH - iframePh - huitab-$('.mmg-headWrapper').height()-5;
		$('.mmg-bodyWrapper').css('max-height', tableH);/*
		$(".mmg-bodyWrapper").mCustomScrollbar({
			scrollButtons: {
				enable: true,
				scrollType: "continuous",
				scrollSpeed: 20,
				scrollAmount: 40
			},
			horizontalScroll: true,
			theme: "minimal"
		});*/
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
		$('.J-delAll').on('click', function(e) {
			e.preventDefault();
			itemsc=mmg.selectedRows();
			ths.delDataF(3, itemsc,delUrl);
		});
		//批量停用
		$('.J-tingyongAll').on('click', function(e) {
			e.preventDefault();
			itemsc=mmg.selectedRows();
			ths.delDataF(0, itemsc,delUrl);
		});
		//批量启用
		$('.J-qiyongAll').on('click', function(e) {
			e.preventDefault();
			itemsc=mmg.selectedRows();
			ths.delDataF(1, itemsc,qiyongUrl);
		});
		// //添加事件
		$('.J-add').bind('click', function(e) {
			e.preventDefault();
            zhuangtaiTag="zengjia";
			ths.addData();
		});
		//批量已阅
		$('.J-redaded').on('click', function(e) {
			e.preventDefault();
			itemsc=mmg.selectedRows();
			ths.delDataF(4, itemsc,yiyueUrl);
		});
		$('.J-huishiAll').on('click', function(e) {
			e.preventDefault();
			itemsc=mmg.selectedRows();
			ths.delDataF(5, itemsc,hushiUrl);
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
			case 4:
				_titleEmpty = "您还未选中需要已阅的数据";
				_titleQr = "是否确定已阅!";
				_titleYes = "已阅成功";	
				break;
			case 5:
				_titleEmpty = "您还未选中需要忽视的数据";
				_titleQr = "是否确定忽视!";
				_titleYes = "忽视成功";	
				break;	
		}
        if(itemsc.length==0){
            common.iframeLayerMsg(_titleEmpty, 2);
            return;
        }

        var hash = $.hash('page');
        if(hash == "quyukongzhi"){
        	//停用
        	if(type==0){
        		delDatas.isUse = 0;
        	}
        }

        if(hash == "laoshishuos"){
        	if(type==0){
        		_titleQr +="<p>停用后相关图片无法恢复</p>";
        	}
        }

        var yesBack = function() {
                var beforBacks = function() {},
                    successBack = function() {
                        $('.checkAll').prop('checked', false);
                        common.iframeLayerMsg(_titleYes, 1, function() {
                            itemsc = [];
                            mmg.load(_dataParams);
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
									layer.closeAll();
                                    common.iframeLayerMsg(ajaxData.msg+"!", 1, function() {
                                        sFlag=false;
                                        common.schoolCur();
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
		var cont = template(editTpl, datas),
			success = function() {
				if (editCallback) {
					editCallback();
				}
				var eleForm=$('.J-editForm');
				common.validformSubmit(eleForm);
			},
			yes = function() {
				if (resetFun == true && resetFunEdit != null) {
					resetFunEdit();
				} else {

					var eleForm=$('.J-editForm');

                    var callback=function () {
                        var editFields = eleForm.serialize(),
                            succes=function() {
                                if (ajaxData.success == true) {
									layer.closeAll();
                                    common.iframeLayerMsg(ajaxData.msg+"!", 1, function() {
                                        sFlag=false;
                                        common.schoolCur();
                                    });
                                }
                            };
                            common.ajaxFunIframe(editUrl,editFields,null,succes);
                    };
                    common.validformIn(eleForm,callback);
				}
			};
			common.layerConfirm(editTitle,editArea,cont,success, yes);
	},
	resetPwd: function(data) {
		var _titleQr = "是否要重置密码",
			resetId = data.accountId,
			resetUname = data.userName;
		fields = {
			"accountId": resetId,
			"userName": resetUname
		};
		yesBack = function() {
			beforBack = function() {};
			successBacks = function() {
				if (ajaxData.success == true) {
					layer.closeAll();
					common.iframeLayerMsg("密码重置成功!", 1, function() {
						mmg.load(_dataParams);
					});
				}
			};
			common.ajaxFunIframe(resetPwdUrl,fields, beforBack, successBacks);
		};
		common.layerMsgFlag(_titleQr, yesBack);
	}

};