options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $smsLogs; //短信状态

        common.powerFlag(powers);
        //列
        var items = [
            { title:'手机号', name:'telephone',width:46, align:'center'},
            { title:'内容', name:'content' ,width:120, align:'center'},
            { title:'状态', name:'state' ,width:120, align:'center',renderer:function (val,row) {
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
            { title:'报错信息', name:'errMsg' ,width:120, align:'center'},
            { title:'发送人', name:'sender' ,width:120, align:'center'},
            { title:'发送时间', name:'sendDate' ,width:120, align:'center'}
        ];
        var resetFunAdd=function(){
            var fm=$('.J-addForm');
            var fields = fm.serializeArray();
            for(var i=0;i<fields.length;i++){
                if(fields[i].name=='classId'){
                    fields.splice(i,1);
                    i--;
                }
            }
            var vs="";
            if($($('.J-classType')).val()==0){
                vs=0;
            }
            else{
                vs=$('.J-classs select').val();
            }
            fields.push({
                'name':'classId',
                'value':vs
            });
            var beforBack = function() {},
                successBacks = function() {
                    if (ajaxData.success == true) {
                        common.iframeLayerMsg("添加成功!", 1, function() {
                            if(options[0].params != null){
                                mmg.load(options[0].params);
                            }
                            else{
                                mmg.load();
                            }

                        });
                    }
                },checkBack=function(){
                common.btnReset();
            };
            common.ajaxFunIframe(addUrl, fields,null,successBack,null,null,checkBack);

        };
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
                "checkCol": false,
                "root": "list"
            },
            "resetFun":{
                "add":resetFunAdd
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

        var doAdmin=function () {
            var eleS=$('.J-schools'),p={"page":0,"count":0},emptyS=0;
            common.getSchoolItem(eleS,p,emptyS,commonFun);
        },doUser=function () {
            $('.J-schools').hide();
            commonFun();
        };
        common.codeFlag(doAdmin,doUser);
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keywords').val('');
    }
};


//执行
bag._init();