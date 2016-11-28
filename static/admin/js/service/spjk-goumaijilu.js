options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $monitorRecharges; //监控购买记录信息
        common.powerFlag(powers);

        var items = [
            { title:'用户', name:'userName',width:46, align:'center'},
            { title:'华迈账号', name:'huaMaiAccount',width:46, align:'center'},
            { title:'宝贝', name:'kidName',width:46, align:'center'},
            { title:'费用', name:'money',width:46, align:'center'},
            { title:'时长(单位：月)', name:'moons',width:46, align:'center'},
            { title:'状态', name:'isUse' ,width:120, align:'center',renderer:function(val,row){
                if (val == null) {
                    val = 0;
                }

                switch (val){
                    case 0:
                        state="<span class='f-red'>待支付</span>";
                        break;
                    case 1:
                        state="<span class='f-blue'>已支付</span>";
                        break;
                    case 2:
                        state="<span class='f-gray'>已处理</span>";
                        break;

                }
                return state;
            }},
            { title:'创建时间', name:'insertDate' ,width:60, align:'center'},
            { title:'操作(更改状态)', name:'isUse' ,width:60, align:'center',renderer: function(val,row){
                var zhifuBtns="<a class='iconfont J-yichuli' href='javascript:void(0);' title='已支付'>&#xe64d;</a>",
                    chuliBtns="<a class='iconfont J-yizhifu' href='javascript:void(0);' title='已处理'>&#xe626;</a>",
                    btnsHtml = "";
                if (delFlag == true) {
                        switch (val){
                            case 1:
                                btnsHtml = chuliBtns;
                                break;
                            case 2:
                                btnsHtml = zhifuBtns;
                                break;
                        }
                }
                return "<span class='table-action'>" + btnsHtml+"</span>";
            }}
        ];

        var coders=common.getCode();
        if(coders==1||coders==2||coders==3){
            var schoolItem={
                title: '学校',
                name: 'schoolName',
                width: 90,
                align: 'center'
            };
            items.splice(0,0,schoolItem);
        }



        //
        // var commonFun=function () {
        //     var ele = $('.layui-layer .J-school'),p={'page':0,'count':0},em=0,cab=function(){},isChecked=true;
        //     if(zhuangtaiTag=="bianji"){
        //         var current ={
        //             "schoolId":datasCur.schoolId,
        //             "schoolName":datasCur.schoolName
        //         };
        //         common.getSchoolItem(ele,p,em,cab,current,isChecked);
        //     }else{
        //         var current = {};
        //         common.getSchoolItem(ele,p,em,cab,current,isChecked);
        //     }
        //
        // };

        var addBox= function() {
           // commonFun();
        };
        var edtiBox = function() {
           // commonFun();
        };
        var chkBox = function() {
        /*    var eleS=$('.J-school'),
                eleC= $(".J-class");
            eleS.text($('.J-schools select option:selected').text());
            eleC.text($('.J-classs select option:selected').text());
            $('.layui-layer-btn').remove();*/
        };

        options.push({
            "tpl": {
                "edit": 'editTpl',
                "chk": 'chkTpl',
                "add": 'addTpl'
            },
            "url": {
                "list": _con.list.url
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
            }
            else{
                common.creatSearch();
                mmg.load(_dataParams);
            }

            if(mmg){
                bag.mmgSelects();
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


    },mmgSelects:function(){
        //表格选中行
        mmg.on('cellSelected',
            function(e, item, rowIndex, colIndex) {
                datasCur = item;
                if ($(e.target).is('.J-yizhifu')) {
                    var _titleQr = "是否需要改变成已支付状态?";
                    var urls = $monitorRecharges.del.url+"?isUse=2";
                    var id = [];
                    id.push(datasCur.id);
                    fields = {"id":id};
                    yesBack = function() {
                        successBacks = function() {
                            if (ajaxData.success == true) {
                                layer.closeAll();
                                common.iframeLayerMsg("视频购买状态修改成功!", 1, function() {
                                    mmg.load(_dataParams);
                                });
                            }
                        };
                        common.ajaxFunIframe(urls,fields,null, successBacks);
                    };
                    common.layerMsgFlag(_titleQr, yesBack);
                }
                if ($(e.target).is('.J-yichuli')) {
                    var _titleQr = "是否需要改变成已支付状态?";
                    var urls = $monitorRecharges.del.url+"?isUse=1";
                    var id = [];
                    id.push(datasCur.id);
                    fields = {"id":id};
                    yesBack = function() {
                        successBacks = function() {
                            if (ajaxData.success == true) {
                                layer.closeAll();
                                common.iframeLayerMsg("视频购买状态修改成功!", 1, function() {
                                    mmg.load(_dataParams);
                                });
                            }
                        };
                        common.ajaxFunIframe(urls,fields,null, successBacks);
                    };
                    common.layerMsgFlag(_titleQr, yesBack);
                }
            })
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#gender').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();