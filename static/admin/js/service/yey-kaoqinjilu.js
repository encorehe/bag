options = [];
function nofind(){
    var img=event.srcElement;
    img.src="../static/admin/images/error.png";
    img.setAttribute("data-errorImg","1");
    img.onerror=null;
}
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $attendances; //考勤记录
        common.powerFlag(powers);
        common.excelData();
        $('.J-daoru,.J-moban').remove();
        var items = [{
            title: '抓拍照片',
            name: 'attImage',
            width: 100,
            align: 'center',
            renderer:function(val,row){
                var state="";
                var timestamp = Date.parse(new Date());
                if(val == "" || val == null){
                    var imga = "att_"+row.id+".jpg";
                    state = "<span class='imgPhoto J-img'><img onerror='nofind();' src='http://image.bag61.com/" + imga + "?time="+timestamp+"' layer-src='http://image.bag61.com/" + imga + "?time="+timestamp+"'  width='36px' height='36px' /></span>";
                }else{
                     state = "<span class='imgPhoto J-img'><img onerror='nofind();' src='http://image.bag61.com/" + val + "?time="+timestamp+"' layer-src='http://image.bag61.com/" + val + "?time="+timestamp+"'  width='36px' height='36px' /></span>";
                }
                return state;
            }
        },{
            title: '姓名',
            name: 'teacherId',
            width: 100,
            align: 'center',
            renderer:function(val,row){
                var state="";
                if(val==0){
                    state=row.kidName;
                }
                else{
                    state=row.teacherName;
                }
                return state;
            }
        },{
            title: '打卡人类型',
            name: 'teacherId',
            width: 100,
            align: 'center',
            renderer:function(val,row){
                var state="";
                if(row.teacherId==0){
                    state='学生';
                }
                else{
                    state='老师';
                }

                return state;

            }
        },{
            title: '星期',
            name: 'day',
            width: 100,
            align: 'center',
            renderer:function(val,row){
                var state="";
                switch(val){
                    case 1:
                        state="星期一";
                        break;
                    case 2:
                        state="星期二";
                        break;
                    case 3:
                        state="星期三";
                        break;
                    case 4:
                        state="星期四";
                        break;
                    case 5:
                        state="星期五";
                        break;
                    case 6:
                        state="星期六";
                        break;
                    case 7:
                        state="星期日";
                        break;
                }
                return state;
            }
        },{
            title: '考勤状态',
            name: 'attendanceType',
            width: 100,
            align: 'center',
            renderer:function(val,row){
                var state="";
                if(val == null){
                    val=0;
                }
                switch(val){
                    case 0:
                        state="未打卡";
                        break;
                    case 1:
                        state="已打卡";
                        break;
                    case 2:
                        state="病假";
                        break;
                    case 3:
                        state="事假";
                        break;
                }

                return state;
            }
        },
            {
                title: '打卡时间',
                name: 'attTime',
                width: 100,
                align: 'center',
                renderer:function(val,row){
                    var state ="";
                    if(row.attendanceType==3 || row.attendanceType==2){
                        val = row.attDate
                    }
                    return val;
                }
            }
            ];

        var coders=common.getCode();
        var daochuFun = function () {

            $('.J-person').on('change',function () {
                var _html = template('duixiangTpl',{});
                $('.J-duixiang').html(_html);
                var th = $(this),thv = parseInt(th.val());
                var eleS = $('.layui-layer .J-duixiang .J-schools');
                if (thv == 2){
                    var eleC = $('.layui-layer .J-duixiang .J-class'),emptyS = 1,emptyC = 1;
                    common.getSchoolAndClassItem(eleS,emptyS,eleC,emptyC);
                }else{
                    var p = {"page":0,"count":0,'isUse':1},
                        em = 1;
                    common.getSchoolItem(eleS,p,em);
                }

            });
            $('.J-person').change();
        };
        if (coders != 1&&coders != 2&&coders != 3&&coders != 4){
            $('.J-daochu').remove();
        };
        if(coders==1||coders==2||coders==3){
            var schoolItem={
                title: '学校',
                name: 'schoolName',
                width: 90,
                align: 'center'
            };
            items.splice(0,0,schoolItem);
            //导出

            //导出数据
            $('.J-daochu').on('click',function(e){
                e.preventDefault();
                var th = $(this);
                th.addClass('disabled');
                var title ="选择导出",
                    area = ["600px","280px"],
                    content = template('tplDaochu',{}),
                    successBack = function(){
                        daochuFun();
                        var eleForm = $('.J-form-daochu');
                        common.validformSubmit(eleForm);

                    },
                    yesBack = function(){
                        var eleForm = $('.J-form-daochu');
                        var callback = function(){
                            var eleForm = $('.J-form-daochu');
                            var datas = eleForm.serialize();
                            var url = _con.excel.daochuUrl,
                                successBack = function(){
                                    if(ajaxData.success&&ajaxData.data != "" && ajaxData.data != null){
                                        // window.open(ajaxData.data);
                                        common.bsuExportCsv(ajaxData.data);
                                    }
                                },
                                completeBack = function(){};
                            common.ajaxFun(url,datas,null, successBack, completeBack);
                        };
                        common.validformIn(eleForm,callback);

                    },
                    cancelBack = function(){
                        th.removeClass('disabled');
                    };
                common.layerConfirm(title,area,content,successBack, yesBack,cancelBack);
            });
        }
        if( coders == 4){
            $('.J-daochu').on('click',function(e){
                e.preventDefault();
                var th = $(this);
                th.addClass('disabled');
                var title ="选择导出",
                    area = ["600px","300px"],
                    content = template('tplDaochu',{}),
                    successBack = function(){
                        daochuFun();
                        var eleForm = $('.J-form-daochu');
                        common.validformSubmit(eleForm);
                    },
                    yesBack = function(){
                        var eleForm = $('.J-form-daochu');
                        var callback = function(){
                            var eleForm = $('.J-form-daochu');
                            var datas = eleForm.serialize();
                            var url = _con.excel.daochuUrl,
                                successBack = function(){
                                    if(ajaxData.success&&ajaxData.data != "" && ajaxData.data != null){
                                        // window.open(ajaxData.data);
                                        common.bsuExportCsv(ajaxData.data);
                                    }
                                },
                                completeBack = function(){};
                            common.ajaxFun(url,datas,null, successBack, completeBack);
                        };
                        common.validformIn(eleForm,callback);

                    },
                    cancelBack = function(){
                        th.removeClass('disabled');
                    };
                common.layerConfirm(title,area,content,successBack, yesBack,cancelBack);
            });
        }


        var liClick=function(){
            var _obj=$('.J-qjItem'),objType=parseInt($('.J-person').val());objLi=_obj.find('a');
            if(objType==1){
                        _obj.append('<input type="hidden" name="teacherId" id="teacherId" value="" datatype="*" />');
                    }
                    else{
                        _obj.append('<input type="hidden" name="kidId" id="kidId" value="" datatype="*" />');
                    }
            objLi.on('click',function(){
                var ths=$(this);
                kidId="";
                if(ths.hasClass('active')){
                }
                else{
                    objLi.removeClass('active');
                    ths.addClass('active');
                    Id=ths.data('id');
                    if(objType==1){
                        _obj.find('input[name="teacherId"]').val(Id);
                    }else{
                         _obj.find('input[name="kidId"]').val(Id);
                    }

                }
            });
        };



        var getTeacher=function(){
            var eleWrapp=$('.J-qj');
            var doAdmin=function () {
                //获得学校
                var $html=template("tplQj",{person:1});
                eleWrapp.html($html);
                eleSc=$('.J-eleSchool');
                empty=1;
                p={'page':0,'count':0};
                var callback=function () {
                   var tplName="tplList",
                       ele=$('.J-qjItem'),p={"schoolId":eleSc.find('select').val()},
                       callback=function () {
                           //得到教职工
                           liClick();
                       };
                   common.getWorkers(tplName,ele,p,callback);
                };
                var p={'page':0,'count':0};
                common.getSchoolItem(eleSc,p,empty,callback);
            };
            var  doUser=function () {
                //获得学校
                var $html=template("tplQj",{person:1});
                eleWrapp.html($html);
                eleSc=$('.J-eleSchool');
                empty=1;
                p={'page':0,'count':0};
                var callback=function () {
                   var tplName="tplList",
                       ele=$('.J-qjItem'),p={},
                       callback=function () {
                           //得到教职工
                           liClick();
                       };
                   common.getWorkers(tplName,ele,p,callback);
                };
                $('.J-eleSchool').text($('.J-sc').text());
                callback();
            };
            common.codeFlag(doAdmin,doUser);
        };

        var getBabys=function(){
            var eleWrapp=$('.J-qj');
            var doAdmin = function(){
                var $html=template("tplQj",{person:2});
                eleWrapp.html($html);
                var eleS = $('.layui-layer .J-eleSchool'),
                    emptyS = 1,
                    eleC=$('.layui-layer .J-classItem'),
                    emptyC = 1,
                    fun = function(){
                       var tplName="tplList",
                       p = { "page":0,"count":0,"schoolId":schoolCurrent.id,"classId":eleC.find('select').val()},
                       ele = $('.layui-layer .J-qjItem'),
                       callback=function () {
                           //得到教职工
                           liClick();
                       };;
                       common.getBaby(tplName,p,ele,callback);
                    };
                common.getSchoolAndClassItem(eleS,emptyS,eleC,emptyC,fun);
             },
             doUser = function(){

                var $html=template("tplQj",{person:2});
                eleWrapp.html($html);
                var eleS = $('.layui-layer .J-eleSchool'),
                    emptyS = 1,
                    p = {"page":0,"count":0},
                    eleC=$('.layui-layer .J-classItem'),
                    emptyC = 1,
                    fun = function(){
                       var tplName="tplList",
                       p = { "page":0,"count":0,"schoolId":schoolCurrent.id,"classId":eleC.find('select').val()},
                       ele = $('.layui-layer .J-qjItem'),
                       callback=function () {
                           //得到教职工
                           liClick();
                       };
                       common.getBaby(tplName,p,ele,callback);
                    };
                //common.getSchoolAndClassItem(eleS,emptyS,eleC,emptyC,fun);
                eleS.text($('.J-sc').text());
               // common.getClass(eleC,p,fun);
               common.getClass(eleC,emptyC,p,fun);

             }
            common.codeFlag(doAdmin,doUser);
        };

        //增加
        var addBox= function() {
            common.layerDateYYMM($('.J-date'));
            getTeacher();
            $(".J-person").on('change',function () {
                var th=$(this),thv=th.val();
                switch (thv){
                    case "1":
                        getTeacher();
                        break;
                    case "2":
                        getBabys();
                        break;
                }
            });
        };

        //修改
        var edtiBox = function() {var commonFun=function () {
            var _objinStart=$('.J-inStart'),
                _objinEnd=$('.J-inEnd')
            _objoutStart=$('.J-outStart')
            _objoutEnd=$('.J-outEnd');
            _objinStart.on('focus',function(){
                WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss',maxDate:'#F{$dp.$D(\'punchInEnd\')||\'12:00:00\'}'});
            });
            _objinEnd.on('focus',function(){
                WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss',minDate:'#F{$dp.$D(\'punchInStart\')}',maxDate:'12:00:00'});
            });
            _objoutStart.on('focus',function(){
                WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss',minDate:'#F{$dp.$D(\'punchInEnd\')||\'12:00:00\'}',maxDate:'#F{$dp.$D(\'punchOutEnd\')||\'23:59:00\'}'});
            });
            _objoutEnd.on('focus',function(){
                WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss',minDate:'#F{$dp.$D(\'punchOutStart\')}',maxDate:'23:59:00'});
            });
        };
            var doAdmin=function () {
                commonFun();
                //获得学校和班级
                var _objSchool=$('.J-schoolAdd'),
                    _objClass=$('.J-classAdd'),
                    callbacks=function () {
                    },ids=[],
                    empty=0,
                    eleA=$('.J-type1a'),
                    eleB=$('.J-type1b'),
                    eleC=$('.J-type1c'),
                    eleD=$('.J-type1d');
                common.getSchoolAndClass(_objSchool, _objClass,callbacks,ids,empty);
                setTimeout(function () {
                    var _chtml=_objClass.html();
                    _objClass.empty();
                },100)

            };
            var doUser=function () {
                var _objSchool=$('.J-schoolAdd'), _objClass=$('.J-classAdd'),p={"schoolId":$.cookie('bag-schoolId')};
                _objSchool.text($.cookie('bag-school'));
                eleA=$('.J-type1a');
                eleB=$('.J-type1b');
                eleC=$('.J-type1c');
                eleD=$('.J-type1d');
                var callback=function () {
                    var _chtml=_objClass.html();
                    _objClass.empty();
                };
                var emptyC=1,p={ "page":0,"count":0};
                common.getClass(_objClass,emptyC,p,callback);
                commonFun();
            };
            common.codeFlag(doAdmin,doUser);
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
                "checkCol": false,
                "root": "list"
            },"resetFun":{
                "add":resetFunAdd,
                "edit":resetFunEdit
            }
        });

        bag._do(items,options);

    },
    _do:function (items,options) {
        var commonFun=function () {
           $('.J-select select[name="type"]').on('change',function(){
               var th=$(this),
                   thv = th.val();
               $('.J-searchForm input[name="keyWord"]').remove();
               $('.J-searchForm input[name="teacherName"]').remove();
               if (thv == 1){
                   $('<input type="text" placeholder="教师姓名" value="" id="teacherName" name="teacherName" class="input-text"/>').insertBefore(".J-searchForm .J-searchBtn");
               }
               if (thv == 0){
                   $('<input type="text" placeholder="宝贝姓名" value="" id="keyWord" name="keyWord" class="input-text"/>').insertBefore(".J-searchForm .J-searchBtn");
               }
               if (thv == ""){
                  $('<input type="text" placeholder="教师姓名" value="" id="teacherName" name="teacherName" class="input-text"/> <input type="text" placeholder="宝贝姓名" value="" id="keyWord" name="keyWord" class="input-text"/>').insertBefore(".J-searchForm .J-searchBtn");
               }
           })
            bag.searchRest();
            common.creatSearch();
            if(mmg==undefined || mmg == null){
                options[0].params = _dataParams;
                mainCont.getList(items,options);
            }else{
                common.creatSearch();
                mmg.load(_dataParams);
            }

            if(mmg){
                 bag.mmgSelects();
            }
        };
        var doAdmin=function (){
           var eleS=$('.J-school'),emptyS = 0,eleC = $('.J-class'),emptyC = 0;

            if(schoolCurrent == undefined){
                common.getSchoolAndClassItem(eleS,emptyS,eleC,emptyC,commonFun);
            }else{
                var cur={
                    "schoolId":schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId,
                    "schoolName":schoolCurrent.schoolName
                };
                //eleS,emptyS,eleC,emptyC,fun,schoolCur,classCur
                common.getSchoolAndClassItem(eleS, emptyS,eleC,emptyC,commonFun,cur);
            }
        },doYz=function () {
            var eleC = $('.J-class'), p={"page":0,"count":0},emptyC = 0;
            common.getClass(eleC,emptyC,p,commonFun);
        },doUser=function () {
            var eleC = $('.J-class'), p={"page":0,"count":0},emptyC = 1;
            common.getClass(eleC,emptyC,p,commonFun);
        };
        common.codeFlag(doAdmin,doYz,doUser);



    },
    mmgSelects:function(){
         mmg.on('cellSelected',function(e, item, rowIndex, colIndex) {
             datasCur = item;
            if (e.target.tagName=="IMG") {
                if($($(e.target)[0]).data('errorimg') !=undefined){
                    common.layerMsg('没有抓拍照片',0);
                    return false;
                }
                var content = template("chkTpl",item);
                successBack = function() {
                    $('.layui-layer-btn').remove();
                    var timestamp = Date.parse(new Date());
                    var sUrl = null;
                    if(datasCur.attImage==null){
                        sUrl = "http://image.bag61.com/att_"+datasCur.id+".jpg?time="+timestamp;
                    }else{
                        sUrl = "http://image.bag61.com/"+datasCur.attImage+"?time="+timestamp;
                    }
                    $('.J-imgs').find('#preview').attr('src',sUrl);
                    $('.J-imgs').find('#preview').attr('layer-src',sUrl);
                    layer.photos({
                        photos: '.J-imgs'
                    });
                };
                common.layerConfirm(chkTitle,["600px"], content, successBack)
            }
         });
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();