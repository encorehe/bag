options = [];
var bag={
	_init:function () {
		var powers = temD[1].power, //权限
			_con = $posDateRefreshRecord; //app版本配置信息
		common.powerFlag(powers);

        var items = [
            { title:'学校', name:'schoolName' ,width:90, align:'center'},
            { title:'唯一标识', name:'imei' ,width:230, align:'center'},
			{ title:'系统版本', name:'appVersion' ,width:230, align:'center'},
			{ title:'应用版本', name:'systemVersion' ,width:230, align:'center'},
            { title:'登陆时间', name:'insertDate' ,width:100, align:'center'}
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
				/*"edit": 'editTpl',
				"chk": 'chkTpl',*/
				"add": 'addTpl'
			},
			"url": {/*
				"edit": _con.edit.url,
				"add": _con.add.url,
				"del": _con.del.url,*/
				"list": _con.list.url
			},
			"area": {
				/*"edit": _con.edit.area,
				"add": _con.add.area,
				"del": _con.del.area,
				"chk": _con.chk.area*/
			},
			"title": {
				/*"edit": _con.edit.title,
				"add": _con.add.title,
				"del": _con.del.title,
				"chk": _con.chk.title,
				"titleStart":_con.del.titleStart,
				"titleEnd":_con.del.titleEnd*/
			},
			"callback": {
				"add": addBox,
				"edit": edtiBox,
				"chk": chkBox
			},
			"mmg": {
				"indexCol": true,
				"checkCol": false,
				"root": "list"
			}
		});

		bag._do(items,options);

	},
    _do:function (items,options) {
    	var commonFun = function(){
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
    	};
        

		var doAdmin=function () {
            var eleS=$('.J-schools'),p={"page":0,"count":0},emptyS=0;
            common.getSchoolItem(eleS,p,emptyS,commonFun);
        },doUser=function () {
            $('.J-schools').remove();
            commonFun();
        };
        common.codeFlag(doAdmin,doUser);

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