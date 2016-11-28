options = [];
var thType=null;
var userDatas=[];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $notices; //通知公告
        common.powerFlag(powers);

        //列
        var items = [{
            title: '标题',
            name: 'title',
            width: 150,
            align: 'center'
        }, {
            title: '内容',
            name: 'content',
            width: 300,
            align: 'center',
            renderer:function (val,row) {
                return '<div class="text-overflow">'+val+'</div>';
            }
        }, {
            title: '类型',
            name: 'type',
            width: 60,
            align: 'center',
            renderer: function(val) {
                var state = "";
                switch (val) {
                    case 1:
                        state = "校园公告";
                        break;
                    case 2:
                        state = "班级公告";
                        break;
                    case 3:
                        state = "员职工公告";
                        break;
                    case 4:
                        state = "个人通知";
                        break;
                }
                return state;
            }
        }, {
            title: '状态',
            name: 'isUse',
            width: 50,
            align: 'center',
            renderer: function(val,row) {
                var state = "";
                switch (val) {
                    case 0:
                        state = "待审";
                        break;
                    case 1:
                        state = "通过";
                        break;
                    case 2:
                        state = "已发送";
                        break;
                    case 3:
                        state = "拒绝";
                        break;
                    case 4:
                        state = "停用";
                        break;
                }
                return state;
            }
        }, {
            title: '创建时间',
            name: 'insertDate',
            width: 50,
            align: 'center'
        }, {
            title: '操作',
            width: 80,
            name:"isUse",
            align: 'center',
            renderer: function(val, row) {
                var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtnsStart = "<a class='iconfont J-tongguo' href='javascript:void(0);' title='通过'>&#xe640;</a>",
                    tingyongBtnsEnd = "<a class='iconfont J-tingyong1' href='javascript:void(0);' title='停用'>&#xe625;</a>",
                    delBtnsEnd = "<a class='iconfont J-jujue' href='javascript:void(0);' title='拒绝'>&#xe644;</a>";
                btnsHtml =ckBtns;
                var code = common.getCode();
                if(val == 2&&(code == 1|| code ==2 || code ==3 || code ==4)){
                    btnsHtml +=tingyongBtnsEnd;
                }
                if (editFlagS) {
                    if (val ==0 || val == 1){
                        if (code != 1&& code !=2 &&code !=3 && code !=4){
                            btnsHtml+=editBtns;
                        }else{
                            btnsHtml+=editBtns+delBtnsEnd+delBtnsStart;
                        }
                    }

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
            items.splice(3,0,schoolItem);
        }else{
            // $('.J-select').eq(0).html('<option value="" selected>通知类型</option><option value="2">班级公告</option>');

        }

        //校园公告
        var tgSchool=function(){
            var doAdmin=function(){
                var eleS=$('.layui-layer .J-content'),p={ page:0,count:0,'isUse':1},emptyS=1;
                if(datasCur&&zhuangtaiTag=="bianji"){
                    var callback=function(){},
                        schoolCur={
                            "schoolName":datasCur.schoolName,
                            "schoolId":datasCur.schoolId
                        }

                    common.getSchoolItem(eleS,p,emptyS,callback,schoolCur);
                }
                else{
                    common.getSchoolItem(eleS,p,emptyS);
                }

            },doUser=function(){
                var eleS=$('.layui-layer .J-content');
                eleS.text('全校');
            };
            common.codeFlag(doAdmin, doUser);
        };
        //班级公告
        var tgClass=function(){
            var doAdmin=function(){
                var eleS=$('.layui-layer .J-content'),emptyS=1,emptyC=0;
                eleS.html('<span class="J-school"></span><span class="J-class"></span>');
                eleS=$('.layui-layer .J-school');
                eleC=$('.layui-layer .J-class');
                var fun=function(){
                };
                if(datasCur&&zhuangtaiTag=="bianji"){
                    var schoolCur={
                        "schoolId":datasCur.schoolId,
                        "schoolName":datasCur.schoolName
                    },classCur={
                        "classId":datasCur.classId,
                        "className":datasCur.className
                    };
                    emptyC=1;
                    common.getSchoolAndClassItem(eleS,emptyS,eleC,emptyC,fun,schoolCur,classCur);
                }
                else{
                    common.getSchoolAndClassItem(eleS,emptyS,eleC,emptyC,fun);
                }

            },doUser=function(){
                var eleC=$('.layui-layer .J-content'),emptyC=0,p={'page':0,'count':0,'isUse':1};
                if(datasCur&&zhuangtaiTag=="bianji"){
                    var cur = {
                        "classId":datasCur.classid,
                        "className":datasCur.className
                    };
                    common.getClass(eleC,emptyC,p,null,cur);
                }
                else{
                    common.getClass(eleC,emptyC,p);
                }

            };
            common.codeFlag(doAdmin, doUser);
        };
        var renderChosenTpl = function () {
          //渲染对象选择框
            var _html = template('chosenTpl',{});
            var eleCont=$('.layui-layer .J-content');
            var chosedTr = $('.layui-layer .J-yixuan');
            var chosedTrItem = chosedTr.find('.J-duixiangs');
            eleCont.html(_html);
            chosedTrItem.empty();
            chosedTr.show();
        };
        var unCheckAll = function () {
            if ($('.J-all-people').length>0){
                $('.J-all-people').prop('checked',false);
            }
        };
        var checkAll = function (datas) {
            if($('.J-all-people').length>0){
                var $checkAllEle = $('.J-all-people');
                if (userDatas.length==datas.length){
                    $checkAllEle.prop('checked',true);
                }
            }


        };
        var choserDo = function (datas) {
            if (zhuangtaiTag == "bianji"){
                var uid = (datasCur.receiversid).split(',');
                for (var j=0;j<datas.length;j++){
                    for (var i=0;i<uid.length;i++){
                        var uids = parseInt(uid[i]);
                        if (thType == 3){
                            var  uidss = parseInt(datas[j].accountId);
                        }
                        if (thType == 4){
                            var  uidss = parseInt(datas[j].id);
                        }
                        if(uidss==uids){
                            datas[j].isCur = true;
                            userDatas.push(datas[j]);
                        }

                    }

                }
                checkAll(datas);
            }else{
                if (userDatas.length>0){
                    var oldDatas = userDatas;
                    for (var j=0;j<datas.length;j++){
                        for (var i=0;i<oldDatas.length;i++){
                            if(thType == 3){
                                if (datas[j].accountId == oldDatas[i].accountId){
                                    datas[j].isCur = true;
                                    userDatas.push(datas[j]);
                                }
                            }
                            if(thType == 4){
                                if (datas[j].id == oldDatas[i].id){
                                    datas[j].isCur = true;
                                    userDatas[i].isCur = true;
                                }
                            }

                        }
                    }
                }
            }

            renderBChosenr(datas);
            renderChosend(userDatas);
          //选择对象事件
            var $li=$('.layui-layer .J-content .J-duixiang li');
            $li.on('click',function () {
               var th = $(this),thItem = datas[th.index()];
                th.css('display','none');
                if(thType == 3){
                    userDatas.push(thItem);
                }
                if(thType == 4){
                    if (userDatas.length>0){
                        for (var i=0;i<userDatas.length;i++){
                           if (thItem.id == userDatas[i].id){
                               return false
                           }else{
                               userDatas.push(thItem);
                               break;
                           }
                        }
                    }else{
                        userDatas.push(thItem);
                    }
                }
                checkAll(datas);
                //渲染已选中的模板
                renderChosend(userDatas);
            });

        };
        var renderBChosenr = function (data) {
            var tplName = 'choserListTpl',
                eleCont = $('.layui-layer .J-content .J-duixiang');
            eleCont.html(template(tplName,{list:data}));
            var $checkAllEle = $('.J-all-people');
            $checkAllEle.on('change',function () {
                userDatas = [];
                var thv = $(this).prop('checked');
                if (thv){
                    $('.J-duixiang li').each(function () {
                        $(this).click();
                    });

                }else{
                    $('.J-duixiang li').each(function () {
                        $(this).css('display',"block");
                    });
                    userDatas = [];
                }
                renderChosend(userDatas);
            })
        };
        var renderChosend = function (data) {
            //渲染已选中的数据
            var $html = template('choserListOldTpl',{list:data}),
                chosedTr = $('.layui-layer .J-yixuan'),
                chosedTrItem = chosedTr.find('.J-duixiangs'),
                $inputChosenId=$('.layui-layer .J-content input[name="receiversid"]'),
                $inputChosenName= $('.layui-layer .J-content input[name="receiversName"]');
            chosedTrItem.html($html);
            if (userDatas.length>10){
                $('<p class="J-all-no"><input type="checkbox" class="J-all-checkNo" />全部取消</p>').insertBefore(chosedTrItem.find('.J-users'));
                $('.J-all-checkNo').on('change',function () {
                    var thv = $(this).prop('checked');
                    if (thv){
                        userDatas = [];
                        renderChosend(userDatas);
                        unCheckAll();
                        $('.J-duixiang li').each(function () {
                            $(this).show();
                        })
                    }
                })
            }else{
                if ($('.J-all-no').length>0){
                    $('.J-all-no').remove();
                }
            }

            var $$li = $('.layui-layer .J-yixuan .J-duixiangs li');
            $$li.on('click',function () {
                if (thType == 3){
                    var th = $(this),thv = parseInt(th.data('accountid'));
                    var $li = $('.layui-layer .J-content .J-duixiang li[data-accountid="'+thv+'"]');
                }

                if (thType == 4){
                    var th = $(this),thv = parseInt(th.data('id'));
                    var $li = $('.layui-layer .J-content .J-duixiang li[data-id="'+thv+'"]');
                }

                $li.css('display','block');
                for (var i=0;i<userDatas.length;i++){
                    if(thType == 3){
                        if (userDatas[i].accountId==thv){
                            userDatas.splice(i,1);
                            i--;
                        }
                    }

                    if(thType == 4){
                        if (userDatas[i].id==thv){
                            userDatas.splice(i,1);
                            i--;
                        }
                    }

                }
                unCheckAll();
                renderChosend(userDatas);
            });

            var $chosenId = [],$chosenName = [];
            for (var i=0;i<data.length;i++){
                if(thType == 3){
                    $chosenId.push(data[i].accountId);
                    $chosenName.push(data[i].name);
                }
                if(thType == 4){
                    $chosenId.push(data[i].id);
                    $chosenName.push(data[i].name);
                }

            }
            $inputChosenId.val($chosenId.join(','));
            $inputChosenName.val($chosenName.join(','));
        };
        //员职工公告
        var tgWorker=function(){
            //渲染通告/公告对象选择栏
            renderChosenTpl();
            var eleCont=$('.layui-layer .J-content');
            var doAdmin=function(){
                var ele = eleCont.find('.J-schools'),
                    p = {'page':0,'count':0,'isUse':1},
                    em = 1,
                    cab = function () {
                    //choserListTpl
                        var tplName = 'choserListTpl',
                            ele = eleCont.find('.J-duixiang'),
                            param = {'page':0,'count':0,'isUse':1},
                            callback = function (datas) {
                                choserDo(datas);
                            };
                        if (zhuangtaiTag=="bianji"){
                            param.schoolId = datasCur.schoolId;
                        }else{
                            param.schoolId = schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId;
                        }
                        common.getWorkers(tplName,ele,param,callback);
                    };
                if (zhuangtaiTag=="bianji"){
                    var cur ={
                        "schoolId":datasCur.schoolId,
                        "schoolName":datasCur.schoolName
                    };
                    common.getSchoolItem(ele,p,em,cab,cur);
                }else{
                    common.getSchoolItem(ele,p,em,cab);
                }

            },doUser=function(){
                var tplName = 'choserListTpl',
                    ele = eleCont.find('.J-duixiang'),
                    param = {'page':0,'count':0,'isUse':1},
                    callback = function (datas) {
                        choserDo(datas);
                    };
                common.getWorkers(tplName,ele,param,callback);
            };
            common.codeFlag(doAdmin, doUser);

        };
        //个人通知
        var tgPerson=function(){
            //渲染通告/公告对象选择栏
            renderChosenTpl();
            var eleCont=$('.layui-layer .J-content');
            var doAdmin=function(){
                var eleS = eleCont.find('.J-schools'),
                    emptyS = 1,
                    eleC = eleCont.find('.J-class'),
                    emptyC = 0,
                    p = {'page':0,'count':0,'isUse':1},
                    em = 1,
                    cab = function () {
                        var tplName = 'choserListTpl',
                            ele = eleCont.find('.J-duixiang'),
                            param = {'page':0,'count':0,'isUse':1},
                            callback = function (datas) {
                                choserDo(datas);
                            };
                       param.schoolId = schoolCurrent.id;
                       var $classId = parseInt(eleC.find('input[name="classId"]').val());
                       if ( $classId != 0 ){
                           param.classId = $classId;
                       }
                        common.getBaby(tplName,param,ele,callback);
                    };
                if (zhuangtaiTag=="bianji"){
                    var cur ={
                        "schoolId":datasCur.schoolId,
                        "schoolName":datasCur.schoolName
                    };
                    common.getSchoolItem(ele,p,em,cab,cur);
                }else{
                    //eleS,emptyS,eleC,emptyC,fun,schoolCur,classCur,schoolFun
                    var schoolFun = function () {
                        $('.J-duixiangs').empty();
                        userDatas = [];
                        unCheckAll();
                    };
                    common.getSchoolAndClassItem(eleS,emptyS,eleC,emptyC,cab,null,null,schoolFun);
                }

            },doUser=function(){
                //ele,emptyC,p,f,cur
                var eleC = eleCont.find('.J-class'),
                    emptyC = 0,
                    p = {"page":0,"count":0,"isUse":1},
                    f = function () {
                        var tplName = 'choserListTpl',
                            ele = eleCont.find('.J-duixiang'),
                            param = {'page':0,'count':0,'isUse':1},
                            callback = function (datas) {
                                choserDo(datas);
                            };
                        var $classId = parseInt(eleC.find('input[name="classId"]').val());
                        if ( $classId != 0 ){
                            param.classId = $classId;
                        }
                        common.getBaby(tplName,param,ele,callback);
                    };
                common.getClass(eleC,emptyC,p,f);
            };
            common.codeFlag(doAdmin, doUser);

        };
        var emptyChange = function () {
            var eleCont=$('.layui-layer .J-content');
            eleCont.empty();
            $('.J-yixuan').hide();
            $('.J-duixiangs').empty();
            userDatas = [];
        };
        var commonFun=function () {
            var coders=common.getCode();
            var eleType=$('.layui-layer select[name="type"]'),
                eleCont=$('.layui-layer .J-content');
            if (coders != 1&&coders != 2&&coders != 3&&coders != 4){
                eleType.empty();
                eleType.append("<option value='2'>班级公告</option>");
            }
            eleType.on('change',function () {
                emptyChange();
                var th=$(this),thv=parseInt(th.val());
                switch(thv){
                    case 1: //校園公告
                        thType=1;
                        tgSchool();
                        break;
                    case 2: //班級公告
                        thType=2;
                        userDatas = [];
                        tgClass();
                        break;
                    case 3: //院職工公告
                        thType=3;
                        userDatas = [];
                        tgWorker();
                        break;
                    case 4://個人通知
                        thType=4;
                        userDatas = [];
                        tgPerson();
                        break;
                }

            });
            eleType.change();
            common.layerDateYYMMHHSS($('input[name="sendDate"]'),1);
            $("textarea[name='content']").on('keyup', function() {
                var len = common.getStrLength(this.value);
                var strNum = Math.ceil(len/70);
                console.log(strNum);
                if (strNum == 0){
                    strNum = 1;
                }
                var data = {
                    "strLength":len,
                    "strNum":strNum
                };
                var _html = template('shuruTpl',data);
                $('.J-kery').html(_html);
            })
            if(zhuangtaiTag =="bianji"){
                if(datasCur&&datasCur.type != undefined){
                    eleType.val(parseInt(datasCur.type));
                }
            }

        };



        //增加
        var addBox= function() {
            userDatas = [];
            commonFun();
        };

        //修改
        var edtiBox = function() {
            userDatas = [];
            commonFun();
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
            if(mmg){
                bag.mmgSelects();
            }

        };
        commonFun();
    },
    mmgSelects: function() {
        //表格选中行
        mmg.on('cellSelected',
            function(e, item, rowIndex, colIndex) {
                datasCur = item;
                if ($(e.target).is('.J-jujue')) {
                    //拒绝
                    var _titleQr = "是否拒绝?",
                        yesBack = function(){
                            var successBack = function() {
                                    $('.checkAll').prop('checked', false);
                                    var _titleYes = '拒绝成功!';
                                    common.iframeLayerMsg(_titleYes, 1, function() {
                                        itemsc = [];
                                        mmg.load(_dataParams);
                                    });
                                },
                                delDatas={};
                            delDatas = {"id":datasCur.id,"isUse":3};
                            common.ajaxFunIframe($notices.del.url, delDatas,null,successBack);
                        }
                    common.layerMsgFlag(_titleQr,yesBack);
                }
                if ($(e.target).is('.J-tongguo')) {
                    //通过
                    var _titleQr = "是否通过?",
                        yesBack = function(){
                            var successBack = function() {
                                    $('.checkAll').prop('checked', false);
                                    var _titleYes = '通过成功!';
                                    common.iframeLayerMsg(_titleYes, 1, function() {
                                        itemsc = [];
                                        mmg.load(_dataParams);
                                    });
                                },
                                delDatas={};
                            delDatas={};
                            delDatas = {"id":datasCur.id};
                            var aurl="";
                            if( datasCur.sendDate == null ){
                                aurl = $notices.del.url+"?isUse=2";
                            }else{
                                aurl = $notices.del.url+"?isUse=1";
                            }
                            common.ajaxFunIframe(aurl,delDatas,null,successBack);
                        }
                    common.layerMsgFlag(_titleQr,yesBack);
                }
                if ($(e.target).is('.J-tingyong1')) {
                    //拒绝
                    var _titleQr = "是否停用?",
                        yesBack = function(){
                            var successBack = function() {
                                    $('.checkAll').prop('checked', false);
                                    var _titleYes = '停用成功!';
                                    common.iframeLayerMsg(_titleYes, 1, function() {
                                        itemsc = [];
                                        mmg.load(_dataParams);
                                    });
                                },
                                delDatas={};
                            delDatas = {"id":datasCur.id,"isUse":4};
                            common.ajaxFunIframe($notices.del.url, delDatas,null,successBack);
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