options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $acctpointlogs; //交易
        common.powerFlag(powers);

       //列
	var items = [
			{ title:'账户', name:'userName' ,width:46, align:'center'},
			{ title:'积分', name:'points' ,width:120, align:'center',renderer: function(val,row){
				if(val>0){
				   state="<span class='f-blue'>"+val+"</span>";
				}else{
					state="<span class='f-red'>"+val+"</span>";
				}
				return state;
			}},
            { title:'类型', name:'points' ,width:100, align:'center',
            renderer:function(val){
                    var state = "";
                    if(val>0){
                        state="<span class='f-blue'>收入</span>";
                    }else{
                        state="<span class='f-red'>支出</span>";
                    }
                    return state;
            }},
			{ title:'积分名称', name:'pointName' ,width:100, align:'center'},
			{ title:'交易时间', name:'insertDate' ,width:30, align:'center'},
			{ title:'详情', name:'detail' ,width:60, align:'center'}
		];


        //增加
        var addBox= function() {
          
        };

        //修改
        var edtiBox = function() {
         
        };
        var chkBox = function() {
        };


        //删除
        var delRow=function(){
            var _Jtitle=$('.J-title'),
                _Jcontent=$('.J-content');
            _Jtitle.empty('');
            _Jcontent.empty();

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
        var commonFun=function () {
            bag.searchRest();
            common.creatSearch();
            if(mmg==undefined || mmg == null){
                mainCont.getList(items,options);
            }else{
                common.creatSearch();
                mmg.load(_dataParams);
            }

            $('select[name="classId"]').on('change',function () {
                common.creatSearch();
                mmg.load(_dataParams);
            });

        };
        commonFun();



    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();