options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $weeks; //学周
        common.powerFlag(powers);

        //列
        var items = [
            //{ title:'学校', name:'schoolName' ,width:46, align:'center'},
            //{ title:'学期名', name:'semesterName' ,width:46, align:'center'},
            { title:"上学(√:上学,X:休息)",width:120,align:'left',cols:[
                { title:'周一', name:'isMonSchool' ,width:46, align:'center',renderer:function(val){
                    if (val == null) {
                        val = 1;
                    }
                    if (val == 1) {
                        state = "√";
                    } else {
                        state = "X";
                    }
                    return state;
                }},
                { title:'周二', name:'isTueSchool' ,width:46, align:'center',renderer:function(val){
                    if (val == null) {
                        val = 1;
                    }
                    if (val == 1) {
                        state = "√";
                    } else {
                        state = "X";
                    }
                    return state;
                }},
                { title:'周三', name:'isWedSchool' ,width:46, align:'center',renderer:function(val){
                    if (val == null) {
                        val = 1;
                    }
                    if (val == 1) {
                        state = "√";
                    } else {
                        state = "X";
                    }
                    return state;
                }},
                { title:'周四', name:'isThuSchool' ,width:46, align:'center',renderer:function(val){
                    if (val == null) {
                        val = 1;
                    }
                    if (val == 1) {
                        state = "√";
                    } else {
                        state = "X";
                    }
                    return state;
                }},
                { title:'周五', name:'isFriSchool' ,width:46, align:'center',renderer:function(val){
                    if (val == null) {
                        val = 1;
                    }
                    if (val == 1) {
                        state = "√";
                    } else {
                        state = "X";
                    }
                    return state;
                }},
                { title:'周六', name:'isSatSchool' ,width:46, align:'center',renderer:function(val){
                    if (val == null) {
                        val = 1;
                    }
                    if (val == 1) {
                        state = "√";
                    } else {
                        state = "X";
                    }
                    return state;
                }},
                { title:'周日', name:'isSunSchool' ,width:46, align:'center',renderer:function(val){
                    if (val == null) {
                        val = 1;
                    }
                    if (val == 1) {
                        state = "√";
                    } else {
                        state = "X";
                    }
                    return state;
                }}
            ]},
            { title:'开始', name:'startDate' ,width:120, align:'center'},
            { title:'结束', name:'endDate' ,width:100, align:'center'},
            {
                title: '操作',
                width: 80,
                name:"isUse",
                align: 'center',
                renderer: function(val, row) {
                    var isUse=row.isUse,
                        bagCoder = $.cookie('bag-code');
                    var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                        editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>";
                        btnsHtml = ckBtns;
                    if (editFlagS) {
                        if(isUse==1){
                            btnsHtml += editBtns;
                        }
                        else{
                            btnsHtml += editBtns;
                        }

                    }

                    return "<span class='table-action'>" +btnsHtml+ "</span>";
                }
            }
        ];
        var coders=common.getCode();
        if(coders==1||coders==2||coders==3){
            var schoolItem={
                title: '学校',
                name: 'schoolName',
                width: 90,
                align: 'center'
            };
            items.splice(3,0,schoolItem);
        }




        var editBox = function() {
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
                "list": _con.list.url,
                "resetPwdUrl":_con.list.url
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
                "edit":editBox,
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
        };
        var doAdmin=function () {
            var eleS=$('.J-schools'),p={"page":0,"count":0},emptyS=0;
            var cab=function () {
                var eleXueqi=$('.J-xueqi'),param={"schoolId":$('input[name="schoolId"]').val()},
                    callback=function () {
                        commonFun();
                };
                common.getXueqi(eleXueqi,param,callback);
            };
            if(schoolCurrent == undefined){
                common.getSchoolItem(eleS,p,emptyS,cab);
            }else{
                var cur={
                    "schoolId":schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId,
                    "schoolName":schoolCurrent.schoolName
                };
                common.getSchoolItem(eleS,p,emptyS,cab,cur);
            }

        },doUser=function () {
            $('.J-schools').remove();
            var eleXueqi=$('.J-xueqi'),param={},
                callback=function () {
                    commonFun();
                };
            common.getXueqi(eleXueqi,param,callback);
        };
        common.codeFlag(doAdmin,doUser);
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
        $('#gender').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();