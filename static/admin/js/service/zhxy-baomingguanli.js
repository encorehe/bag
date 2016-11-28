options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $signUpManage; //报名管理

        common.powerFlag(powers);
        //列
        var items = [
            {
                title: '申请人信息',
                align: 'center',
                cols: [
                    { title:'姓名', name:'contactsName',width:46, align:'center'},
                    { title:'身份', name:'contactsIdentity' ,width:120, align:'center'},
                    { title:'手机号', name:'contactsPhone' ,width:120, align:'center'},
                    { title:'申请学校', name:'schoolName' ,width:120, align:'center'},
                    { title:'申请时间', name:'insertDate' ,width:120, align:'center'}
                ]
            },
            {
                title: '宝贝信息',
                align: 'center',
                cols: [
                    { title:'姓名', name:'kidName' ,width:120, align:'center'},
                    { title:'出生日期', name:'birthDay' ,width:120, align:'center'},
                    { title:'性别', name:'kidGender' ,width:120, align:'center',renderer: function(val) {
                        if (val == null) {
                            val = 0;
                        }
                        if (val == 1) {
                            sex = "男";
                        } else {
                            sex = "女";
                        }
                        return sex;
                    }}
                ]
            },
            { title:'状态', name:'isUse' ,width:90, align:'center',renderer:function (val,row) {
                var state="";
                if( val== null){
                    val=0;
                }
                switch (val){
                    case 1:
                        state="已处理";
                        break;
                    case 0:
                        state="未处理";
                        break;
                }

                return state;
            }},{ title:'操作', name:'isUse' ,width:120, align:'center',renderer: function(val, row) {
                var delBtnsStart = "<a class='iconfont J-chuli' data-id='1' href='javascript:void(0);' title='处理'>&#xe630;</a>";
                var btnsHtml = "";
                if( val== null){
                    val=0;
                }
                if(val ==0){
                    btnsHtml+=delBtnsStart;
                }
                return "<span class='table-action'>" + btnsHtml +"</span>";
            }}
        ];
        var resetFunAdd=function(){

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
                common.creatSearch();
                mmg.load(_dataParams);
            }
            if(mmg){
                bag.mmgSelects();
            }
        };

        commonFun();
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keywords').val('');
    },mmgSelects:function () {
        mmg.on('cellSelected',
            function(e, item, rowIndex, colIndex) {
                datasCur = item;
                var title,area,content,successBack;
                if ($(e.target).is('.J-chuli')) {
                    //弹出是否已处理界面
                    var uid = [];
                    var _titleQr = "是否标记为已处理?",
                        resetId = datasCur.id;
                    uid.push(resetId);
                    fields = {
                        "id": uid,
                        'isUse':1
                    };
                    yesBack = function() {
                        beforBack = function() {};
                        successBacks = function() {
                            if (ajaxData.success == true) {
                                layer.closeAll();
                                common.iframeLayerMsg("处理成功!", 1, function() {
                                    mmg.load(_dataParams);
                                });
                            }
                        };
                        common.ajaxFunIframe($signUpManage.del.url,fields, beforBack, successBacks);
                    };
                    common.layerMsgFlag(_titleQr, yesBack);
                }
            })
    }
};


//执行
bag._init();