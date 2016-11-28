options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $smsChannels; //短信渠道

        common.powerFlag(powers);
        //列
        var items = [
            { title:'渠道名称', name:'channelName',width:100, align:'center'},
            { title:'渠道官网', name:'managerUrl',width:100, align:'center'},
            { title:'帐号', name:'userName' ,width:120, align:'center'},
            { title:'余额', name:'balance' ,width:80, align:'center'},
            { title:'价格', name:'price' ,width:80, align:'center'},
            { title:'状态', name:'isUse' ,width:60, align:'center',renderer:function(val){
                 if (val == null) {
                            val = 1;
                        }
                        if (val == 1) {
                            state = "<span class='f-blue'>√</span>";
                        } else {
                            state = "<span class='f-red'>X</span>";
                        }
                        return state;
            }},
            { title:'加入时间', name:'insertDate' ,width:120, align:'center'},
            { title:'操作', name:'insertDate' ,width:60, align:'center',renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>",
                    delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>",
                    delBtns="<a class='iconfont J-del' href='javascript:void(0);' title='删除'>&#xe625;</a>";
                btnsHtml="";
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
                return "<span class='table-action'>"+btnsHtml+"</span>";
            }}
        ];
        var edtiBox = function() {

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
                "edit": editCallback,
                "chk": chkCallback
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