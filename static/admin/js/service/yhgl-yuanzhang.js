options = [];
var bag={
	_init:function () {
		var powers = temD[1].power, //权限
			_con = $principals; //园长配置信息
		common.powerFlag(powers);

		var items = [{
				title: '头像',
				name: 'icon',
				width: 46,
				align: 'center',
				renderer: function(val, row) {
					var avatar = '';
					if (val == null || val == "") {
						if (row.gender == null || row.gender == 1) {
							avatar = "<span class='avatarMan'>男</span>";
						} else {
							avatar = "<span class='avatarWomen'>女</span>";
						}
					} else {
						var timestamp = Date.parse(new Date());
                        avatar = "<span class='imgPhoto'><img src='http://image.bag61.com/" + val + "?time="+timestamp+"'  width='36px' height='36px' /></span>"
                    
					}
					return avatar;
				}
			}, {
				title: '用户名',
				name: 'userName',
				width: 120,
				align: 'center'
			}, {
				title: '姓名/英文名',
				name: 'name',
				width: 100,
				align: 'center',
				renderer: function(val, row) {
					var name = "",
						enname = row.enName,
						cname = row.name;
					if (cname == '' || cname == null) {
						if (enname == '' || enname == null) {
							name = "未输入";
						}
					}
					if (cname == '' && enname == '') {
						name = "未输入";
					} else {
						if (enname == '' || enname == null) {
							name = cname;

						} else if (cname == '' || cname == null) {
							name = enname;
						} else {
							name = cname + '/' + enname;
						}

					}

					return name;

				}
			}, {
				title: '性别',
				name: 'gender',
				width: 30,
				align: 'center',
				renderer: function(val) {
					if (val == null) {
						val = 1;
					}
					if (val == 1) {
						sex = "男";
					} else {
						sex = "女";
					}
					return sex;
				}
			},{
				title: '状态',
				name: 'isUse',
				width: 30,
				align: 'center',
				renderer: function(val) {
					if (val == null) {
						val = 1;
					}
					if (val == 1) {
						state = "<span class='f-blue'>√</span>";
					} else {
						state = "<span class='f-red'>X</span>";
					}
					return state;
				}
			}, {
				title: '手机',
				name: 'telephone',
				width: 90,
				align: 'center'
			}, {
				title: '门禁卡',
				name: 'rfId',
				width: 100,
				align: 'center'
			}, /*{
				title: '短信发送模式',
				name: 'smsSendMode',
				width: 100,
				align: 'center',
				renderer: function(val) {
					if (val == null) {
						val = 1;
					}
					if (val == 0) {
						state = "不发";
					} else
					if (val == 1) {
						state = "及时发送";
					} else {
						state = "需要审核";
					}
					return state;
				}
			},*/
			{
				title: '加入时间',
				name: 'insertDate',
				width: 60,
				align: 'center'
			}, {
			title: '操作',
			width: 120,
			name:'code',
			align: 'center',
			renderer: function(val, row) {
				var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
					editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
					resetPwdBtns = "<a class='iconfont J-resetPwd' href='javascript:void(0);' title='重置密码'>&#xe600;</a>",
					delBtns = '';
				delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>";
				delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>";
				btnsHtml = ckBtns;
				var coders=common.getCode();
				if( coders != 1 &&  coders != 2 && coders != 3 && coders != 4){
					//登录进来的角色即不是管理员也不是代理、一级代理、园长
					return btnsHtml;
				}else{
					if(delFlag){
						if (row.isUse == 0) {
						btnsHtml += delBtnsStart;
						} else {
							btnsHtml += delBtnsEnd;
						}
					}
					
					if(editFlagS){
						btnsHtml+=editBtns+resetPwdBtns;
					}


					if(delFlag){
						btnsHtml+=delBtns;
					}

					return "<span class='table-action'>"+btnsHtml+"</span>";
				}
				
			}
		}];

		var coders=common.getCode();
		if(coders==1||coders==2||coders==3){
			var schoolItem={
				title: '学校',
				name: 'schoolName',
				width: 90,
				align: 'center'
			};
			items.splice(3,0,schoolItem);

			var huamaiItem={
				title: '华麦账户名',
				name: 'accountId',
				width: 90,
				align: 'center',
				renderer:function (val,row) {
					return "teacher"+val;
				}
			};
			items.splice(3,0,huamaiItem);

			common.excelData();
			//导出数据
			$('.J-daochu').on('click',function(e){
				e.preventDefault();
				var th = $(this);
				th.addClass('disabled');
				var title ="第一步：选择学校",
					area = ["500px","180px"],
					content = "<form class='J-form-daochu'><span class='J-school'></span></form>",
					successBack = function(){
						var eleS = $('.layui-layer .J-school'),
							p = {'page':0,'count':0},
							emptyS = 1;
						common.getSchoolItem(eleS,p,emptyS);
					},
					yesBack = function(){
						var eleForm = $('.J-form-daochu'),
							_schoolId = eleForm.find('input[name="schoolId"]').val();
						datas = {
							"schoolId":_schoolId,
							"page":0,
							"count":0
						};

						var url = _con.excel.daochuUrl,
							successBack = function(){
								if(ajaxData.success&&ajaxData.data != "" && ajaxData.data != null){
									// window.open(ajaxData.data);
									common.bsuExportCsv(ajaxData.data);
								}
							},
							completeBack = function(){};
						common.ajaxFun(url,datas,null, successBack, completeBack);

					},
					cancelBack = function(){
						th.removeClass('disabled');
					};
				common.layerConfirm(title,area,content,successBack, yesBack,cancelBack);
			});
			//导入数据
			$('.J-daoru,.J-moban').remove();

		}
		if(coders == 4){
			common.excelData();
			$('.J-daoru').remove();
			//导出数据
			$('.J-daochu').on('click',function(e){
				e.preventDefault();
				var th = $(this);
				th.addClass('disabled');
				datas = {
					"page":0,
					"count":0
				};

				var url = _con.excel.daochuUrl,
					successBack = function(){
						if(ajaxData.success&&ajaxData.data != "" && ajaxData.data != null){
							// window.open(ajaxData.data);
							common.bsuExportCsv(ajaxData.data);
						}
					},
					completeBack = function(){
						th.removeClass('disabled');
					};
				common.ajaxFun(url,datas,null, successBack, completeBack);
			});
			//导入数据
			$('.J-daoru,.J-moban').remove();
		}

		var addBox= function() {
			var eleS=$('.layui-layer .J-school');
			var doAdmin=function () {
                var p={"page":0,"count":0},emptyS=1;
				if(schoolCurrent==undefined){
                	common.getSchoolItem(eleS,p,emptyS);
				}else{
					var sId = schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId;
					var cur = {"schoolId":sId,'schoolName':schoolCurrent.schoolName},cab = function () {

					};
					common.getSchoolItem(eleS,p,emptyS,cab,cur);
				}
			};
			var doUser=function () {
                var eleS=$('.layui-layer .J-school');
                eleS.text($('.J-sc').text());
			};
			common.codeFlag(doAdmin,doUser);
		};
		var edtiBox = function() {
			var eleS=$('.J-school'),eleC=$('.J-class');
			var doAdmin=function () {
                var sCur={
                    "schoolId":datasCur.schoolId,
                    "schoolName":datasCur.schoolName
                };
                var p={"page":0,"count":0},emptyS=1,callback=function () {

                };
                common.getSchoolItem(eleS,p,emptyS,callback,sCur);
			};
			var doUser=function () {
				var $cid = datasCur.schoolId;
				eleS.text($('.J-sc').text());
				eleS.append('<input type="hidden" name="schoolId" value="'+$cid+'">');
			};
			common.codeFlag(doAdmin,doUser);
		};
		var chkBox = function() {
			var eleS=$('.J-school'),
				eleC= $(".J-class");
			eleS.text($('.J-schools select option:selected').text());
			eleC.text($('.J-classs select option:selected').text());
			$('.layui-layer-btn').remove();
		};

		options.push({
			"tpl": {
				"edit": 'editTpl',
				"chk": 'chkTpl',
				"add": 'addTpl'
			},
			"url": {
				"edit": _con.edit.url,
				"add": _con.add.url,
				"del": _con.del.url,
				"list": _con.list.url,
				"resetPwdUrl":_con.resetPwdUrl.url
			},
			"area": {
				"edit": _con.edit.area,
				"add": _con.add.area,
				"del": _con.del.area,
				"chk": _con.chk.area
			},
			"title": {
				"edit": _con.edit.title,
				"add": _con.add.title,
				"del": _con.del.title,
				"chk": _con.chk.title,
				"titleStart":_con.del.titleStart,
				"titleEnd":_con.del.titleEnd
			},
			"callback": {
				"add": addBox,
				"edit": edtiBox,
				"chk": chkBox
			},
			"mmg": {
				"indexCol": true,
				"checkCol": true,
				"root": "list"
			}
		});

		bag._do(items,options);

	},
	_do:function (items,options) {

        var commonFun=function () {
            bag.searchRest();
            common.creatSearch();
            if(mmg==undefined || mmg == null){
                options[0].params = _dataParams;
                mainCont.getList(items,options);
            }
            else{
                common.creatSearch();
                mmg.load(_dataParams);
            }

        };

		var doAdmin=function () {
            var eleS=$('.J-schools'),p={"page":0,"count":0},emptyS=0;
            if(schoolCurrent == undefined){
                common.getSchoolItem(eleS,p,emptyS,commonFun);
            }else{
                var cur={
                    "schoolId":schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId,
                    "schoolName":schoolCurrent.schoolName
                };
                common.getSchoolItem(eleS,p,emptyS,commonFun,cur);
            }

		},doUser=function () {
			$('.J-schools,.J-classs').hide();
            commonFun();
		};
		common.codeFlag(doAdmin,doUser);
	},
	searchRest:function () {
		$('#isUse').val('');
		$('#gender').val('');
		$('#keyWords').val('');
	}
};


//执行
bag._init();