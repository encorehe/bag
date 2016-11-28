options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $recipes; //食谱
        common.powerFlag(powers);

        var items = [{
            title: '学周',
            name: 'id',
            width: 120,
            align: 'center',
            renderer: function(val, row) {
                return row.startDate + '至' + row.endDate;
            }
        }, {
            title: '周',
            name: 'day',
            width: 45,
            align: 'center',
            renderer: function(val, row) {
                var state = "";
                switch (val) {
                    case 1:
                        state = "一";
                        break;
                    case 2:
                        state = "二";
                        break;
                    case 3:
                        state = "三";
                        break;
                    case 4:
                        state = "四";
                        break;
                    case 5:
                        state = "五";
                        break;
                    case 6:
                        state = "六";
                        break;
                    case 7:
                        state = "日";
                        break;
                }
                return state;
            }
        },  { title:'状态', name:'isUse' ,width:120, align:'center',renderer:function (val,row) {
            var state="";
             if (val == null) {
                        val = 1;
                    }
                    if (val == 1) {
                        state = "<span class='f-blue'>√</span>";
                    } else {
                        state = "<span class='f-red'>X</span>";
                    }
                    return state;
        }},{
            title: '早餐',
            name: 'breakfast',
            width: 80,
            align: 'center'
        }, {
            title: '早点',
            name: 'morningSnack',
            width: 80,
            align: 'center'
        }, {
            title: '午餐',
            name: 'lunch',
            width: 80,
            align: 'center'
        }, {
            title: '午点',
            name: 'afternoonSnack',
            width: 80,
            align: 'center'
        }, {
            title: '晚餐',
            name: 'supper',
            width: 80,
            align: 'center'
        }, {
            title: '备注',
            name: 'remark',
            width: 80,
            align: 'center'
        },{
            title: '操作',
            name:'id',
            width:60,
            align:'center',
            renderer: function(val, row) {
                var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns = '',
                    delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>",
                    delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>";
                btnsHtml = "";
                if(delFlag){
                    if (row.isUse == 0) {
                        btnsHtml += delBtnsStart;
                    } else {
                        btnsHtml += delBtnsEnd;
                    }
                }
                if (editFlagS == true) {
                    btnsHtml += editBtns;
                }
                if (delFlag == true) {
                    btnsHtml += delBtns;
                }
                return "<span class='table-action'>" + btnsHtml + "</span>";
            }

        }];
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


        var commonFun=function () {
              //得到所有学校的学期
            var eleS=$('.layui-layer .J-school'),
                eleXq=$('.layui-layer .J-xueqi'),
                eleXz=$('.layui-layer .J-xuezhou');
            var  doAdmin=function () {
                //获得学校及学期列表
                var p={page:0,count:0},
                    em=1,
                    cab=function () {
                       // p={"schoolId":eleS.find('select').val()};
                        p = {"schoolId":schoolCurrent.id};
                        var callback=function () {
                            //得到学周
                            var semesterId=$('.layui-layer select[name="semesterId"]').val();
                            var p={"semesterId":semesterId};
                            if(zhuangtaiTag=="zengjia"){
                                common.getXuezhous(eleXz,p)
                            }
                            else{
                                var fun=function () {

                                },cur={
                                    "startDate":datasCur.startDate,
                                    "endDate":datasCur.endDate
                                };
                                common.getXuezhous(eleXz,p,fun,cur);
                            }
                        };
                        if(zhuangtaiTag=="zengjia"){
                            common.getXueqi(eleXq,p,callback)
                        }
                        else{
                            var mCur = {
                                "semesterId": datasCur.semesterId,
                                "semesterName": datasCur.semesterName
                            };
                            common.getXueqi(eleXq,p,callback,mCur)
                        }

                    };

                if(zhuangtaiTag=="zengjia"){
                    common.getSchoolItem(eleS,p,em,cab);
                }
                else{
                    var sCur = {
                        "schoolId": datasCur.schoolId,
                        "schoolName": datasCur.schoolName
                    };
                    common.getSchoolItem(eleS,p,em,cab,sCur);
                }

            },doUser=function(){
                eleS.text($('.J-sc').text());
                var p={};
                var callback=function () {
                    //得到学周
                    var semesterId=$('.layui-layer select[name="semesterId"]').val();
                    var p={"semesterId":semesterId};
                    if(zhuangtaiTag=="zengjia"){
                        common.getXuezhous(eleXz,p);
                    }
                    else{
                        var fun=function () {

                        },cur={
                            "startDate":datasCur.startDate,
                            "endDate":datasCur.endDate
                        };
                        common.getXuezhous(eleXz,p,fun,cur);
                    }

                };
                if(zhuangtaiTag=="zengjia"){
                    common.getXueqi(eleXq,p,callback)
                }
                else{
                    var mCur = {
                        "semesterId": datasCur.semesterId,
                        "semesterName": datasCur.semesterName
                    };
                    common.getXueqi(eleXq,p,callback,mCur)
                }

            };
            common.codeFlag(doAdmin, doUser);
        };

        var addBox= function() {
            commonFun();
        };
        var resetFunAdd = function() {
                Jdaty=$('input[name="days"]');
                JweekId = $('select[name="xuezhou"]');
                Jbreakfast =  $('input[name="breakfast"]');
                JmorningSnack = $('input[name="morningSnack"]');
                Jlunch = $('input[name="lunch"]');
                JafternoonSnack = $('input[name="afternoonSnack"]');
                Jsuper = $('input[name="supper"]');
            Jdatass = [];
            for (var i = 0; i < Jbreakfast.length; i++) {
                Jdatass.push({
                    'schoolId':$('.layui-layer input[name="schoolId"]').val(),
                    'day':$(Jdaty[i]).val(),
                    'weekId': parseInt($("#xuezhou").val()),
                    'breakfast': $(Jbreakfast[i]).val(),
                    'morningSnack': $(JmorningSnack[i]).val(),
                    'lunch': $(Jlunch[i]).val(),
                    'afternoonSnack': $(JafternoonSnack[i]).val(),
                    'supper': $(Jsuper[i]).val()
                });
            }
            shipuAdd = [{
                "name": 'shipuAddItem',
                "value": JSON.stringify(Jdatass)
            }];

            var beforBack = function() {
                    resetFun=true;
            },
                successBacks = function() {
                    if (ajaxData.success == true) {
                        common.iframeLayerMsg("添加成功!", 1, function() {

                            mmg.load();
                        });
                    }
                },
                completeBack = function() {
                    resetFun=true;
                },
                errorBack = function() {
                    resetFun=true;
                };
            common.ajaxFunIframe(addUrl, shipuAdd, beforBack, successBacks);

        };
        var edtiBox = function() {
            commonFun();
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
                "root": "list",
                "limitList":[7,14,21,28]
            },"resetFun":{
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