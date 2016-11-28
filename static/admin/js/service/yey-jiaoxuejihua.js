options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $teachingPlans; //教学计划
        common.powerFlag(powers);

        var items = [{
            title: '标题',
            name: 'title',
            width: 100,
            align: 'center'
        },{
            title: '目标',
            name: 'semester',
            width: 100,
            align: 'center',
            hidden: true
        },{
            title: '内容',
            name: 'content',
            hidden:true,
            width: 100,
            align: 'center'
        },{
            title: '类型',
            name: 'planType',
            width: 100,
            align: 'center',
            renderer: function(val,row){
                var state='';
                switch (val){
                    case 1:
                        state="学期计划";
                        break;
                    case 2:
                        state="月计划";
                        break;
                    case 3:
                        state="周计划";
                        break;
                }
                return state;
            }
        },{
            title:'班级',
            name:'className',
            width:80
        },{
            title: '学期',
            name: 'semesterName',
            width: 100,
            align: 'center'
        },{
            title: '教学时间',
            name: 'planType',
            width: 160,
            align: 'center',
            renderer: function(val,row){
                var planType=parseInt(val),
                    str='';

                switch (planType){
                    case 1: //学期
                        startTime=row.startDate;
                        endTime=row.endDate;
                        str=startTime+'至'+endTime;
                        break;
                    case 2: //月份;
                        str=row.month+'月份';
                        break;
                    case 3: //学周
                        startTime=row.weekStartDate;
                        endTime=row.weekEndDate;
                        str=startTime+'至'+endTime;
                        break;
                }

                return str;

            }
        },{
            title: '状态',
            name: 'isUse',
            width: 100,
            align: 'center',
            renderer: function(val,row) {
                var state='';
                if(val==null){
                    val=0;
                }
                switch (val){
                    case 0:
                        state="送审";
                        break;
                    case 1:
                        state="送审通过发布";
                        break;
                    case 2:
                        state="驳回";
                        break;
                    case 3:
                        state="停用";
                        break;
                }
                return state;
            }
        },{
            title: '制定时间',
            name: 'insertDate',
            width: 130,
            align: 'center'
        },{
            title: '操作',
            name:'isUse',
            width: 80,
            align: 'center',
            renderer: function(val, row) {
                var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns = '';
                btnSongshen="<a class='iconfont J-songshen' href='javascript:void(0);' title='送审'>&#xe62c;</a>";
                btnSongshenfabu = "<a class='iconfont J-songshenfabu' href='javascript:void(0);' title='送审通过发布'>&#xe62e;</a>";
                btnBohui = "<a class='iconfont J-bohui' href='javascript:void(0);' title='驳回'>&#xe641;</a>";
                btnTingyong = "<a class='iconfont J-tin' href='javascript:void(0);' title='停用'>&#xe625;</a>";
                btnsHtml = ckBtns;
                var code = common.getCode();
                   switch(val){
                     case 0:
                            //送审状态 显示的按钮
                            if(code == 1 || code == 2 || code == 3 || code == 4){
                                btnsHtml+=editBtns+btnSongshenfabu+btnBohui+btnTingyong;
                            }
                            
                            break;
                     case 1:
                            //送审通过发布显示的按钮
                            btnsHtml+=btnTingyong;
                            break; 
                     case 2:
                            //驳回显示的按钮
                            btnsHtml+=editBtns+btnSongshen+btnTingyong;
                            break;
                      case 3:
                            //停用显示的按钮
                            btnsHtml = ckBtns;
                            break;                       
                   }
                return "<span class='table-action'>"+btnsHtml+"</span>";
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
            items.splice(4,0,schoolItem);
        }

        var getXueqis=function (callback) {
            //得到学期计划
            //alert("学期计划");
            emty();
            var eleXueqi=$('.layui-layer .J-xueqi');
            schoolId=$('.layui-layer').find('input[name="schoolId"]').val();
            _pa={"schoolId":schoolId};
            if(callback){
                common.getXueqi(eleXueqi,_pa,callback);
                $(eleXueqi).find('select').on('change',function () {
                    schoolId=$('.layui-layer').find('input[name="schoolId"]').val();
                    common.getXueqi(eleXueqi,_pa,callback);
                });
            }
            else{
                common.getXueqi(eleXueqi,_pa);
            }
        };

        var getMonth=function(timeString){
            //得到月份
            str = timeString.replace(/-/g,"/");
            var date = new Date(str);
            var month=date.getMonth()+ 1,year=date.getFullYear();
            var newD={
                'year':year,
                'month':month
            };
            return newD;
        };


        var creatMonth=function () {
            //得到月份
            emty();
            if(zhuangtaiTag != "bianji")
            if(xueqiDate==undefined || xueqiDate.length == 0){
                return false;
            }
            var callback=function () {
                if(zhuangtaiTag =="bianji"){
                     var eleMonth=$('.J-month'),
                    xqStart=getMonth(datasCur.startDate).month,
                    year =getMonth(datasCur.startDate).year,
                    xqEnd=getMonth(datasCur.endDate).month;
                    monthDate=[];
                }
                else{
                     var eleMonth=$('.J-month'),
                    xqStart=getMonth(xueqiDate[0].startDate).month,
                    year =getMonth(xueqiDate[0].startDate).year,
                    xqEnd=getMonth(xueqiDate[0].endDate).month;
                monthDate=[];
                }
               
                for(var i=xqStart;i<=xqEnd;i++){
                    monthDate.push({
                        'id':i,
                        'name':year+'年'+i+'月份'
                    })
                }
                var _html=template('tplMonth',{list:monthDate});
                eleMonth.html(_html);
            };
            getXueqis(callback);
        };

        var creatWeeks=function () {
            //得到周
            //alert("周计划");
            emty();
            var callback=function () {
                eleXuezhou=$('.J-day');
                if(datasCur&&zhuangtaiTag=="bianji"){
                    $('select[name="semesterId"]').val(datasCur.semesterId);
                    _pa={"semesterId":datasCur.semesterId}
                }
                else{
                    _pa={"semesterId":xueqiDate[0].id};
                }
                common.getXuezhous(eleXuezhou,_pa);
            };
            getXueqis(callback);
        };

        var emty=function () {
          $('.J-xueqi').empty();
          $('.J-month').empty();
          $('.J-day').empty();

        };

        var typeChange=function (typeVal) {
            typeVal=parseInt(typeVal);
            switch (typeVal){
                case 1:
                    getXueqis();
                    break; //学期计划
                case 2:    //月计划
                    creatMonth();
                    break;
                case 3:   //周计划
                    creatWeeks();
                    break;
            }

        };

        var commonFun=function () {
             //切换计划类型
             var eleType=$('.layui-layer select[name="planType"]');
             var typeVal=eleType.val();
            if(datasCur&&zhuangtaiTag=="bianji"){

                typeVal=datasCur.planType;
            }
           
           typeChange(typeVal);

            eleType.on("change",function () {
                 var th=$(this);
                 typeVal=th.val();
                 typeChange(typeVal);
             });

        };



        //增加
        var addBox= function() {
            common.creaUeditor('myEditor');
            var doAdmin=function () {
                //管理员或1、2级别代理
                /*var eleS = $('.layui-layer .J-school'),
                    emptyS = 1,emptyC = 1,
                    eleC = $('.layui-layer .J-class');
                common.getSchoolAndClassItem(eleS,emptyS,eleC,emptyC,commonFun);*/
                var emptyS = 1,emptyC=1;
                var eleS = $('.layui-layer .J-school'),
                    eleC = $('.layui-layer .J-class');
                if(schoolCurrent==undefined){
                    common.getSchoolAndClassItem(eleS, emptyS, eleC,emptyC,commonFun);
                }else{
                    //eleS,emptyS,eleC,emptyC,fun,schoolCur,classCur
                    var sId = schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId;
                    var schoolCur = {"schoolId":sId,'schoolName':schoolCurrent.schoolName};
                    common.getSchoolAndClassItem(eleS, emptyS, eleC,emptyC,commonFun,schoolCur);
                }

            };
            
            var doUser=function () {
                //普通用户
                var eleS = $('.layui-layer .J-school'),
                    eleC = $('.layui-layer .J-class');
                eleS.text($('.J-sc').text());
                var p={ "page":0,"count":0,"schoolId":$.cookie('bag-schoolId')},emptyC = 1;
                common.getClass(eleC,emptyC,p,commonFun);
            };
            
            common.codeFlag(doAdmin, doUser);
        };

        //修改
        var edtiBox = function() {
             common.creaUeditor('myEditor');
             ue.ready(function(){
             ue.setContent(datasCur.content);
         });

            var doAdmin=function () {
                //管理员或1、2级别代理
                var eleS = $('.layui-layer .J-school'),
                    emptyS = 1,emptyC = 1,
                    eleC = $('.layui-layer .J-class');
                    var schoolCur={
                        "schoolId":datasCur.schoolId,
                        "schoolName":datasCur.schoolName
                    },classCur={
                        "classId":datasCur.classId,
                        "className":datasCur.className
                    };
                common.getSchoolAndClassItem(eleS, emptyS, eleC,emptyC,commonFun,schoolCur,classCur);
            };

            var doUser=function () {
                //普通用户
               var  eleS = $('.layui-layer .J-school'),
                   emptyC = 1,
                   p ={ "page":0,"count":0,"schoolId":$.cookie('bag-schoolId')},
                   eleC = $('.layui-layer .J-class');
                eleS.text($('.J-sc').text());
                common.getClass(eleC,emptyC,p,commonFun);
            };
            common.codeFlag(doAdmin, doUser);

        };

        var chkBox = function() {          
                $('.J-content').html(datasCur.content);
                $('.J-print').on('click',function(){
                    $("#myElementId").print({
                        globalStyles: true,
                        mediaPrint: false,
                        stylesheet: null,
                        noPrintSelector: ".no-print",
                        iframe: true,
                        append: null,
                        prepend: null,
                        manuallyCopyFormValues: true,
                        deferred: $.Deferred()
                    });
                })
        };

        var resetFunAdd = function() {
            var eleForm=$('.J-addForm');

                    var callback=function () {
                        var _html5='<!DOCTYPE html>'+
                            '<html lang="en">'+
                            '<head>'+
                            '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"/>'+
                            '<meta charset="UTF-8">'+
                             '<style>' +
                               'img{ max-width:100% !important;}'+
                                'table,tr,td,div,p,h1,h2,h3,h4,h5,h6{ max-width:100% !important;}'+
                            '</style>'+
                            '</head>'+
                            '<body>'+
                            $('#myEditor').val()+
                            '</body>'+
                            '</html>';
                        var biref=_html5;
                            var addFields=eleForm.serializeArray();
                            for(var i=0;i<addFields.length;i++){
                                if(addFields[i].name=="editorValue"){
                                    addFields[i].name = "content";
                                }
                            }
                            var addFields = $.param(addFields);
                            before = function() {};
                            succes=function() {
                                  if (ajaxData.success == true) {
                                       common.iframeLayerMsg("添加成功!", 1, function() {
                                            sFlag=false;
                                            common.schoolCur();
                                        });

                                    }  

                            };
                            common.ajaxFunIframe(addUrl,addFields,before,succes);
                    };
                    common.validformIn(eleForm,callback);
        };

        var resetFunEdit = function() {
            var eleForm=$('.J-editForm');

                    var callback=function () {
                        var _html5=$('#myEditor').val();
                        var biref=_html5;
                            var addFields=eleForm.serializeArray();
                            for(var i=0;i<addFields.length;i++){
                                if(addFields[i].name=="editorValue"){
                                    addFields[i].name = "content";
                                }
                            }
                            var addFields = $.param(addFields);
                            before = function() {};
                            succes=function() {
                                  if (ajaxData.success == true) {
                                       common.iframeLayerMsg("修改成功!", 1, function() {
                                            sFlag=false;
                                           common.schoolCur();
                                        });

                                    }  

                            };
                            common.ajaxFunIframe(editUrl,addFields,before,succes);
                    };
                    common.validformIn(eleForm,callback);
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
                "checkCol": true,
                "root": "list"
            },"resetFun":{
                "add":resetFunAdd
                ,"edit":resetFunEdit
            }
        });

        bag._do(items,options);

    },
    _do:function (items,options) {
        var commonFun = function() {
            bag.searchRest();
            common.creatSearch();
            if (mmg == undefined || mmg == null) {
                mainCont.getList(items, options);
            } else {
                common.creatSearch();
                mmg.load(_dataParams);
            }

             if(mmg){
               bag.mmgSelects();
            }
        };
        var doAdmin = function() {
                var eleS = $('.action .J-schools'),
                    emptyS = 0,
                    eleC = $('.action .J-classs'),
                    emptyC=0;
                var fun = function() {
                    _dataParams.page = 1;
                    commonFun();
                };
                if(schoolCurrent == undefined){
                    common.getSchoolAndClassItem(eleS, emptyS, eleC,emptyC, fun);
                }else{
                    var cur={
                        "schoolId":schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId,
                        "schoolName":schoolCurrent.schoolName
                    };
                    //eleS,emptyS,eleC,emptyC,fun,schoolCur,classCur
                    common.getSchoolAndClassItem(eleS, emptyS,eleC,emptyC,fun,cur);
                }

            },
            doYz = function() {
                var eleC = $('.J-classs'),emptyC=0,
                    p = {'page':0,'count':0,"schoolId":$.cookie('bag-schooId')};
                common.getClass(eleC,emptyC,p,commonFun);
            },
            doUser = function() {
                var eleC = $('.J-classs'),emptyC=1,
                    p = {'page':0,'count':0,"schoolId":$.cookie('bag-schooId')};
                common.getClass(eleC,emptyC,p,commonFun);
            };
        common.codeFlag(doAdmin,doYz,doUser);
    },mmgSelects:function(){
         mmg.on('cellSelected',
            function(e, item, rowIndex, colIndex) {
                datasCur = item;
                var title,area,content,successBack;
                if ($(e.target).is('.J-addPer')) {
                    //弹出监护人界面
                     area = ['715px', '350px'];
                     title= item.schoolName+"-"+item.className+"-"+item.name+"的监护人信息";
                     content = template('tplJhr', datasCur);
                     successBack = function() {
                            //获取监护人列表
                            $('.layui-layer-btn').remove();
                            bag.getJhrList(datasCur.id);
                     };
                    common.layerConfirm(title, area, content, successBack);
                }
                if ($(e.target).is('.J-card')) {
                    //门禁卡信息
                        area = ['715px', '50%'];
                        title= item.schoolName+"-"+item.className+"-"+item.name+"的门禁卡信息";
                        content = template('tplCard',item);
                        successBack = function() {
                            //获取门禁卡列表
                            $('.layui-layer-btn').remove();
                            bag.getcardList(datasCur.id);
                        };

                    common.layerConfirm(title, area, content, successBack);
                }
                if ($(e.target).is('.J-songshen')) {
                    //送审
                    var _titleQr = "是否送审，如送审请及时通知您的上级进行审核操作?",
                        yesBack = function(){
                              var successBack = function() {
                                $('.checkAll').prop('checked', false);
                                var _titleYes = '送审成功!';
                                common.iframeLayerMsg(_titleYes, 1, function() {
                                    itemsc = [];
                                    mmg.load(_dataParams);
                                });
                            },
                            delDatas={};
                            delD =[];
                            delD.push(datasCur.id);
                            delDatas.id = delD; 
                            common.ajaxFunIframe($teachingPlans.del.url+"?isUse=0", delDatas,null,successBack);
                        }
                    common.layerMsgFlag(_titleQr,yesBack);
                }
                if ($(e.target).is('.J-songshenfabu')) {
                    //送审并发布
                    var _titleQr = "是否送审并发布?",
                        yesBack = function(){
                              var successBack = function() {
                                $('.checkAll').prop('checked', false);
                                var _titleYes = '送审并发布成功，发布后只能查看和停用!';
                                common.iframeLayerMsg(_titleYes, 1, function() {
                                    itemsc = [];
                                    mmg.load(_dataParams);
                                });
                            },
                            delDatas={};
                            delD =[];
                            delD.push(datasCur.id);
                            delDatas.id = delD; 
                            common.ajaxFunIframe($teachingPlans.del.url+"?isUse=1", delDatas,null,successBack);
                        }
                    common.layerMsgFlag(_titleQr,yesBack);
                }
                if ($(e.target).is('.J-bohui')) {
                    //驳回
                    var _titleQr = "是否驳回?",
                        yesBack = function(){
                              var successBack = function() {
                                $('.checkAll').prop('checked', false);
                                var _titleYes = '驳回成功!';
                                common.iframeLayerMsg(_titleYes, 1, function() {
                                    itemsc = [];
                                    mmg.load(_dataParams);
                                });
                            },
                            delDatas={};
                            delD =[];
                            delD.push(datasCur.id);
                            delDatas.id = delD; 
                            common.ajaxFunIframe($teachingPlans.del.url+"?isUse=2", delDatas,null,successBack);
                        }
                    common.layerMsgFlag(_titleQr,yesBack);
                }
                if ($(e.target).is('.J-tin')) {
                    //停用
                    var _titleQr = "是否停用，停用后只能查看并且不能编辑?",
                        yesBack = function(){
                              var successBack = function() {
                                $('.checkAll').prop('checked', false);
                                var _titleYes = '驳回成功!';
                                common.iframeLayerMsg(_titleYes, 1, function() {
                                    itemsc = [];
                                    mmg.load(_dataParams);
                                });
                            },
                            delDatas={};
                            delD =[];
                            delD.push(datasCur.id);
                            delDatas.id = delD; 
                            common.ajaxFunIframe($teachingPlans.del.url+"?isUse=3", delDatas,null,successBack);
                        }
                    common.layerMsgFlag(_titleQr,yesBack);
                }

            })
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();