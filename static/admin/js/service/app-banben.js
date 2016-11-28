options = [];
var bag={
	_init:function () {
		var powers = temD[1].power, //权限
			_con = $appVersions; //app版本配置信息
		common.powerFlag(powers);

        var items = [
            { title:'版本', name:'version' ,width:90, align:'center'},
            { title:'终端应用名称', name:'appName' ,width:90, align:'center'},
            { title:'下载地址', name:'downUrl' ,width:230, align:'center',renderer:function (val,row) {
                return '<a href="'+val+'" target="_blank">'+val+'</a>'
            }},
            { title:'系统', name:'system' ,width:100, align:'center',renderer:function (val,row) {
                var state="";
                switch (val){
                    case 0:
                        state="ios";
                        break;
                    case 1:
                        state="android";
                        break;
                    case 2:
                        state="win";
                        break;
                }
                return state;
            }},
			{ title:'所属', name:'appType' ,width:100, align:'center',renderer:function (val,row) {
				var state="";
				if(val == null || val == ""){
					val = 1;
				}
				switch (val){
					case 1:
						state="贝安港";
						break;
					case 2:
						state="智慧曙光";
						break;
				}
				return state;
			}},
            { title:'状态', name:'isUse' ,width:30, align:'center',renderer: function(val){
                if(val==null){
                    val=1;
                }
                if(val==1){
                    state="√";
                }
                else{
                    state="X";
                }
                return state;
            }},
            { title:'说明', name:'remark' ,width:120, align:'center'},
            { title:'创建时间', name:'insertDate' ,width:90, align:'center'},
            { title:'操作',width:80, align:'center', renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns='';
                delBtnsEnd="<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>";
                delBtnsStart="<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>";
                btnsHtml=ckBtns;
				if(delFlag==true){
					if (row.isUse == 0) {
						btnsHtml += delBtnsStart;
					} else {
						btnsHtml += delBtnsEnd;
					}
				}
                if(editFlagS){
                    btnsHtml+=editBtns;
                }
                if(delFlag){
                    btnsHtml+=delBtns;
                }

                return "<span class='table-action'>"+btnsHtml+"</span>";
            }}
        ];

        
        	var fun=function(){
	        		var callback = function(){
					//收集不为空的appName
					var appSource = ajaxDatas.list,apps=[];
					for(var i=0;i<appSource.length;i++){
						if(appSource[i].appName != null){
							if(zhuangtaiTag == "bianji"){
								if(datasCur.appName == appSource[i].appName){
									appSource[i].appNameCur = 1;
								}
							}
							apps.push(appSource[i]);
						}
					}
					if(apps.length>0){
						var _html = template('tplAppName',{list:apps});
					}
					else{
						var _html = template('tplAppName',null);
					}
					
					$('.J-appName').html(_html);
				};
				common.ajaxSubmitV($ageProducts.list.url,{"page":0,"count":0},callback);
        	};

        commonFun = function(){

        	$('select[name="system"]').on('change',function(){
        		var thv = $(this).val();
        		if(thv==3){
        			fun();
        		}else{
        			$('.J-appName').empty();
        		}
        	});
        	if(zhuangtaiTag == "bianji"&&datasCur.system == 3){
        		fun();
        	}
        	
        };

		var addBox= function() {
			commonFun();
		};
		var edtiBox = function() {
			commonFun();
		};
		var chkBox = function() {
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
				"list": _con.list.url
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
        bag.searchRest();
      	common.creatSearch();
        if(mmg==undefined || mmg == null){
            mainCont.getList(items,options);
        }else{
            mmg.load(_dataParams);
        }
        //表格行选中
		if(mmg){
			bag.mmgSelects();
		}

	},
	mmgSelects:function () {
		//表格选中行
		mmg.on('cellSelected',function(e,item,rowIndex,colIndex){
			datasCur=item;
		})
	},
	ajaxSubmitV:function (url,datas,callback) {
			//提交数据
			$.ajax({
				type: "post",
				url:url,
				data: datas,
				dataType: "json",
				success: function(data){
					ajaxDatas=data;
					if(callback){
						callback();
					}
				}
			});
	},
	searchRest:function () {
		$('#isUse').val('');
		$('#system').val('');
		$('#keyWords').val('');
	}
};


//执行
bag._init();