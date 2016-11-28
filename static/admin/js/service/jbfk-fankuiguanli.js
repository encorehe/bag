options = [];
var bag={
	_init:function () {
		 var powers = temD[1].power, //权限
		  _con = $feedBacks; //意见反馈配置信息
		 common.powerFlag(powers);

        var items = [
            { title:'账号', name:'userName' ,width:90, align:'center'},
            { title:'意见内容', name:'content' ,width:230, align:'center',renderer:function(val){
            	if(val.length>100){
            		val=val.substr(0,100)+"..."
            	}
            	
            	return val;
            }},
            { title:'状态', name:'isuse' ,width:30, align:'center',renderer: function(val,row){
                if(val==null){
                    val=1;
                }
                if(val==1){
                    state="已阅";
                }
                else{
                    state="未阅";
                }
                return state;
            }},
            { title:'反馈时间', name:'insertDate' ,width:90, align:'center'},
            { title:'操作',name:"isuse",width:80, align:'center', renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns='';
                delBtnsEnd="<a class='iconfont J-redaded' href='javascript:void(0);' title='已阅'>&#xe625;</a>";
                btnsHtml=ckBtns;
				if(delFlag){
					if(val==0){
						btnsHtml+=delBtnsEnd;
					}
				}
                return "<span class='table-action'>"+btnsHtml+"</span>";
            }}
        ];

		var addBox= function() {



		};
		var edtiBox = function() {

		};
		var chkBox = function() {
			var _w= $(window.parent.document),
				eleS=_w.find('.J-school'),
				eleC= _w.find(".J-class");
			    eleS.text($('.J-schools select option:selected').text());
				eleC.text($('.J-classs select option:selected').text());
				_w.find('.layui-layer-btn').remove();
		};

		options.push({
			"tpl": {
				"edit": 'editTpl',
				"chk": 'chkTpl',
				"add": 'addTpl'
			},
			"url": {
				"list": _con.list.url,
				"del":_con.del.url
			},
			 "area": {
			// 	"del": _con.del.area,
			 	"chk": _con.chk.area
			 },
			"title": {
				"del": _con.del.title,
				"chk":_con.chk.title
			},
			// "callback": {
			// 	"chk": chkBox
			// },
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
		});
		$('.J-delAlls').on('click',function(e){ 
			e.preventDefault();
			alert(0);
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