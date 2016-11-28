options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $semesters; //日历
        common.powerFlag(powers);

        var items = [
            { title:'学期名', name:'semesterName' ,width:46, align:'center'},
            { title:'开学日', name:'startDate' ,width:120, align:'center'},
            { title:'放假日', name:'endDate' ,width:100, align:'center'},
            { title:'状态', name:'isUse' ,width:30, align:'center',renderer:function(val){
                if (val == null) {
                    val = 1;
                }
                if (val == 1) {
                    state = "√";
                } else {
                    state = "X";
                }
                return state;
            }},{
                title: '操作',
                width: 80,
                name:"isUse",
                align: 'center',
                renderer: function(val, row) {
                    var isUse=row.isUse,
                        bagCoder = $.cookie('bag-code');
                    var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                        editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                        delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停止'>&#xe625;</a>";
                    delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>";
                    btnsHtml = ckBtns;
                    if (editFlagS) {
                        if(isUse==1){
                            btnsHtml = "<span class='table-action'>" + ckBtns+editBtns+delBtnsEnd+"</span>";
                        }
                        else{
                            btnsHtml = "<span class='table-action'>" + ckBtns+editBtns+delBtnsStart+"</span>";
                        }

                    }
                    else{
                        btnsHtml = "<span class='table-action'>" + ckBtns+"</span>";
                    }

                    return "<span class='table-action'>"+btnsHtml+"</span>";
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
        var addBox= function() {
            var doAdmin=function () {
                var eleS=$('.layui-layer .J-schools'),
                    emptyS=1,fun=function(){
                    },p={'page':0,'count':0},callback=function(){};
                common.getSchoolItem(eleS,p,emptyS,callback);
            };
            var doUser=function () {
                $('.layui-layer .J-schools').text($.cookie('bag-school'));
            };
            common.codeFlag(doAdmin,doUser);
        };
        var edtiBox = function() {
            var doAdmin=function () {
                var eleS=$('.layui-layer .J-schools'),
                    emptyS=0,
                    p={'page':0,'count':0},
                    callback=function(){},
                    sCur = {
                    "schoolId": datasCur.schoolId,
                    "schoolName": datasCur.schoolName
                    };
                common.getSchoolItem(eleS,p,emptyS,callback,sCur);
            };
            var doUser=function () {
                $('.layui-layer .J-schools').text($.cookie('bag-school'));
            };
            common.codeFlag(doAdmin,doUser);
        };
        var chkBox = function() {
            var eleS=$('.J-school'),
                eleC= $(".J-class");
            eleS.text($('.J-schools select option:selected').text());
            eleC.text($('.J-classs select option:selected').text());
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
            $('.J-schools').remove();
            commonFun();
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