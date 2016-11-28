options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $cameras; //视屏配置信息
        common.powerFlag(powers);

        var items = [
            { title:'摄像头名称', name:'name',width:46, align:'center'},
            { title:'状态', name:'isUse' ,width:120, align:'center',renderer:function(val,row){
                if (val == null) {
                    val = 1;
                }
                if (val == 1) {
                    state="<span class='f-blue'>√</span>";
                } else {
                    state="<span class='f-red'>X</span>";
                }
                return state;
            }},
            { title:'摄像头服务商', name:'cameraType' ,width:120, align:'center',renderer:function (val) {
               if(val==1){
                   str = "华麦";
               }else{
                   str = "海康";
               }
               return str;
            }},
            { title:'摄像图所在地', name:'classId' ,width:30, align:'center',renderer:function(val,row){
                var state="";
                if(val==0){
                    state="公共区域"
                }
                else{
                    state=row.className;
                }
                return state;
            }},
            { title:'创建时间', name:'insertDate' ,width:60, align:'center'},
            { title:'操作', name:'code' ,width:60, align:'center',renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns='';
                delBtnsEnd="<a class='iconfont J-tingyong1' href='javascript:void(0);' title='停用'>&#xe625;</a>";
                delBtnsStart="<a class='iconfont J-qiyong1' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>",
                delBtns = "<a class='iconfont J-dels' href='javascript:void(0);' title='彻底删除'>&#xe617;</a>"
                btnsHtml=ckBtns;
                if(delFlag){
                    if(row.isUse==0){
                        btnsHtml+=delBtnsStart;
                    }
                    else{
                        btnsHtml+=delBtnsEnd;
                    }
                }
                if(editFlagS){
                    btnsHtml+=editBtns;
                }
                if(delFlag){
                    btnsHtml+=delBtns;
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
            items.splice(3,0,schoolItem);
        }



        var radioChang=function () {

            $('input[name="type"]').on('change',function () {

                var eleS=$('.layui-layer .J-school'),eleC=$('.layui-layer .J-class');
                eleS.empty();
                eleC.empty();
               var th=$(this),thv=parseInt($("input[name='type']:checked").val()),thp=th.parentsUntil("table").find('.J-area');
               if(thv==0){
                  //公共区域
                   commmArea();
               }else{
                  //班级
                  commonClass();
               }
            });
            $("input[name=type]:eq(0)").attr("checked",'checked');
            if(zhuangtaiTag=="bianji"){
                var types = datasCur.classId;
                if(types == null || types == ""){
                    $("input[name=type][value=0]").attr("checked",true);
                    commmArea();
                }else{
                    $("input[name=type][value=1]").attr("checked",true);
                    commonClass();
                }
            }else{
                $("input[name=type][value=0]").attr("checked",true);
                commmArea();
            }
        };

        var renderHuamai=function () {
            $('.layui-layer-content .J-shipin .J-row-hidden,.layui-layer-content .J-shipin .J-row-hidden2').remove();
            var tpl = template('tplHuaimai',datasCur);
            $('.layui-layer-content .J-shipin').append(tpl);
        };

        var renderHaikang = function () {
            $('.layui-layer-content .J-shipin .J-row-hidden,.layui-layer-content .J-shipin .J-row-hidden2').remove();
            var tpl = template('tplHaikang',datasCur);
            $('.layui-layer-content .J-shipin').append(tpl);
        };

        var commmArea=function () {

            $('.J-title').text('园所');
            $('.J-title').append('<input type="hidden" name="classId" value="0">');
            var eleS=$('.layui-layer .J-school');
            var doAdmin=function () {

                var p={page:0,count:0},em=1;
                if(zhuangtaiTag=="zengjia"){
                    isChangSchool = false;
                    var cab = function () {
                        if(schoolCurrent.cameraType==0){
                            var title = "此学校没有视频，如需要，请先更改园所信息";
                            jAlert(title, '贝安港提示',function() {
                                $('.layui-layer-btn').hide();
                                return false;
                            });

                        }
                        $('.layui-layer-btn').show();
                      if(schoolCurrent.cameraType==2){
                          renderHaikang();
                      }
                        if(schoolCurrent.cameraType==1){
                            renderHuamai();
                        }
                    };
                    if (schoolCurrent){
                        var cur={
                            "schoolId":schoolCurrent.schoolId?schoolCurrent.schoolId:schoolCurrent.id,
                            "schoolName":schoolCurrent.schoolName
                        };
                        common.getSchoolItem(eleS,p,em,cab,cur);
                    }else{
                        common.getSchoolItem(eleS,p,em,cab);
                    }

                }
                else{
                    if(datasCur.cameraType == 1){
                        //huamai
                        renderHuamai();
                    }else{
                        renderHaikang();
                    }
                    isChangSchool = true;
                    var cab=function () {
                        $('.J-shipin .J-choose').addClass('disabled');
                        if(datasCur.cameraType == null){
                            renderHuamai();
                        }else{
                            renderHaikang();
                        }
                    },cur={
                        "schoolId":datasCur.schoolId,
                        "schoolName":datasCur.schoolName
                    };
                    common.getSchoolItem(eleS,p,em,cab,cur);
                }

            },doUser=function () {
                eleS.text($('.J-sc').text());
                if(zhuangtaiTag=="bianji"){
                    if(datasCur.cameraType == 1){
                        //huamai
                        renderHuamai();
                    }else{
                        renderHaikang();
                    }
                }else{
                    var _ctype = parseInt($.cookie('bag-cameraType'))
                    if(_ctype == 1){
                        renderHuamai();
                    }else{
                        renderHaikang();
                    }
                }

            };
            common.codeFlag(doAdmin,doUser);
        };

        var commonClass=function () {
            $('.J-title').text('园所-班级');
            var eleS=$('.layui-layer .J-school'),
                eleC=$('.layui-layer .J-class');
            var doAdmin=function () {
                var em=1,emtpyC=1;
                if(zhuangtaiTag=="zengjia"){
                    var fun = function () {
                        if(schoolCurrent.cameraType==0){
                            var title = "此学校没有视频，如需要，请先更改园所信息";
                            jAlert(title, '贝安港提示',function() {
                                $('.layui-layer-btn').hide();
                                return false;
                            });

                        }
                        $('.layui-layer-btn').show();
                        if(schoolCurrent.cameraType==2){
                            renderHaikang();
                        }
                        if(schoolCurrent.cameraType==1){
                            renderHuamai();
                        }

                        if(classCurrent==undefined){
                            var title = "此学校没有班级不能添加班级视频";
                            jAlert(title, '贝安港提示',function() {
                                $('.layui-layer-btn').hide();
                                return false;
                            });
                        }




                    };
                    if (schoolCurrent){
                        var cur={
                            "schoolId":schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId,
                            "schoolName":schoolCurrent.schoolName
                        };
                        common.getSchoolAndClassItem(eleS,em,eleC,emtpyC,fun,cur);
                    }else{
                        common.getSchoolAndClassItem(eleS,em,eleC,emtpyC,fun);
                    }

                }
                else{
                         if(datasCur.cameraType == 1){
                             //huamai
                             renderHuamai();
                         }else{
                             renderHaikang();
                         }
                         var fun=function(){
                                 $('.J-shipin .J-choose').addClass('disabled');
                             },
                                schoolCur={
                                    "schoolId":datasCur.schoolId,
                                    "schoolName":datasCur.schoolName
                                },classCur={
                                    "classId":datasCur.classId,
                                    "className":datasCur.className
                                };
                        if(datasCur.classId == 0){
                            common.getSchoolAndClassItem(eleS,em,eleC,emtpyC,fun,schoolCur);
                        }else{
                            common.getSchoolAndClassItem(eleS,em,eleC,emtpyC,fun,schoolCur,classCur);
                        }

                   
                }
            },doUser=function () {
                eleS.text($('.J-sc').text());
                var p={"page":0,"count":0},emptyC=1;
                if(zhuangtaiTag=="zengjia"){
                    var _ctype = parseInt($.cookie('bag-cameraType'))
                    if(_ctype == 1){
                        renderHuamai();
                    }else{
                        renderHaikang();
                    }
                    common.getClass(eleC,emptyC,p);
                }
                else{
                    if(datasCur.cameraType == 1){
                        //huamai
                        renderHuamai();
                    }else{
                        renderHaikang();
                    }
                    var fun=function(){},classCur={
                            "classId":datasCur.classId,
                            "className":datasCur.className
                        };
                    common.getClass(eleC,emptyC,p,fun,classCur);
                }

            };
            common.codeFlag(doAdmin,doUser);
        };


        var commonFun=function () {
            radioChang();
        };

        var addBox= function() {
            commonFun();
        };
        var edtiBox = function() {
            commonFun();
        };
        var chkBox = function() {
            $('.layui-layer-btn').remove();
            commonFun();
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
    },
     mmgSelects: function() {
        //表格选中行
        mmg.on('cellSelected',function(e, item, rowIndex, colIndex){
             datasCur = item;
               if ($(e.target).is('.J-dels')) {
                var delData = [];
               delData.push(datasCur.id);
                   var deviceSN = datasCur.deviceSN;
                var delDatas={"id":delData,"schoolId":datasCur.schoolId,"deviceSN":deviceSN};
                    var _titleQr = "是否要彻底删除?",
                        yesBack = function(){
                             var successBack = function() {
                                        $('.checkAll').prop('checked', false);
                                        var _titleYes= "删除成功!"
                                        common.iframeLayerMsg(_titleYes, 1, function() {
                                            itemsc = [];
                                            mmg.load(_dataParams);
                                        });
                                    };
                                common.ajaxFunIframe($cameras.del.url, delDatas,null, successBack);
                        };
                    common.layerMsgFlag(_titleQr, yesBack);
               }
        });
         mmg.on('cellSelected',function(e, item, rowIndex, colIndex){
             datasCur = item;
             if ($(e.target).is('.J-tingyong1')) {
                 var delData = [];
                 delData.push(datasCur.id);
                 var delDatas={"id":delData,"schoolId":datasCur.schoolId,"isUse":0};
                 var _titleQr = "是否要停用此设备?",
                     yesBack = function(){
                         var successBack = function() {
                             $('.checkAll').prop('checked', false);
                             var _titleYes= "停用成功!";
                             common.iframeLayerMsg(_titleYes, 1, function() {
                                 itemsc = [];
                                 mmg.load(_dataParams);
                             });
                         };
                         common.ajaxFunIframe($cameras.del.url, delDatas,null, successBack);
                     };
                 common.layerMsgFlag(_titleQr, yesBack);
             }
         });
         mmg.on('cellSelected',function(e, item, rowIndex, colIndex){
             datasCur = item;
             if ($(e.target).is('.J-qiyong1')) {
                 var delData = [];
                 delData.push(datasCur.id);
                 var deviceSN = datasCur.deviceSN;
                 var delDatas={"id":delData,"schoolId":datasCur.schoolId,"isUse":1};
                 var _titleQr = "是否要启用此设备?",
                     yesBack = function(){
                         var successBack = function() {
                             $('.checkAll').prop('checked', false);
                             var _titleYes= "启用设备成功!";
                             common.iframeLayerMsg(_titleYes, 1, function() {
                                 itemsc = [];
                                 mmg.load(_dataParams);
                             });
                         };
                         common.ajaxFunIframe($cameras.del.url, delDatas,null, successBack);
                     };
                 common.layerMsgFlag(_titleQr, yesBack);
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