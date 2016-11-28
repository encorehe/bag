options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $terminals; //终端广告

        common.powerFlag(powers);
        //列
        var items = [
            { title:'终端名', name:'name',width:46, align:'center'},
            { title:'类型', name:'type',width:46, align:'center',renderer:function (val,row) {
                switch (val){
                    case 1:
                        state="手机";
                        break;
                    case 2:
                        state="门禁";
                        break;
                    case 3:
                        state="手持";
                        break;
                }
                return state;
            }},
            { title:'IP', name:'ip' ,width:120, align:'center'},
            { title:'端口', name:'port' ,width:120, align:'center'},
            { title:'状态', name:'isUse' ,width:120, align:'center',renderer:function (val,row) {
                var state="";
                if( val== null){
                    val=1;
                }
                switch (val){
                    case 1:
                        state="√";
                        break;
                    case 0:
                        state="x";
                        break;
                }

                return state;
            }},
            { title:'操作', name:'isUse' ,width:60, align:'center',renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>",
                    delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>",

                    btnsHtml="";
                if(editFlagS){
                    btnsHtml+=editBtns;
                }
                if(delFlag){
                    if( val==null){
                        val=1;
                    }
                    switch (val){
                        case 1:
                            btnsHtml+=delBtnsEnd;
                            break;
                        case 0:
                            btnsHtml+=delBtnsStart;
                            break;

                    }
                }
                return "<span class='table-action'>"+btnsHtml+"</span>";
            }}
        ];
        var addBox=function(){
            var eleAdSpot=$('.J-ads');
            common.getAdSpot(eleAdSpot);
        };
        var edtiBox = function() {
            var eleAdSpot=$('.J-ads');
            common.getAdSpot(eleAdSpot);
        };
        var chkBox = function() {
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
                "checkCol": false,
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
            }
            else{
                mmg.load(_dataParams);
            }
        };

        commonFun();
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keywords').val('');
    }
};


//执行
bag._init();