/* -----------贝安港后台登录------------
 * comon.js v1
 * http://www.encorehe.com/
 * Created & Modified by hejiachao
 * Date modified 2016-02.05
 *
 * Copyright 2013-2016 武汉缘诚科技 All rights reserved.
 * Licensed under MIT license.
 * http://opensource.org/licenses/MIT
 *
 */
//开启各种模式
configAdmin.init('test');
var isEm = 0,schoolCurrent = undefined;
var sFlag=false;
var isClass = true;
var upImages=[];
var upExcelsFile={};
var upVideos=[];
var ind = "",
    ue="",
    map,
    cityName,
    layerContent;
var cFlag=false,
    choolCurrent,
    classCurrent,
    schoolFlag=false,
    isChangSchool = false,
    schoolLayer;
var common = {
    editSuccess:function () {
        layer.msg('密码修改成功,请使用新密码重新登录!', {
            icon: 1,
            time: 900
        }, function () {
            location.replace("index.html");
        });
    },
    loginTimeoutTitle: function (title) {
        layer.closeAll();
        layer.msg(title, {
            icon: 5,
            time: 900
        }, function () {
            location.replace("index.html");
        });
    },
    loginTimeout: function () {
        layer.closeAll();
        layer.msg('登录超时,请重新登录!', {
            icon: 5,
            time: 900
        }, function () {
            location.replace("index.html");
        });
    },getNowFormatDate:function(){
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
            return currentdate;
    },
    loginTimeoutIframe: function () {
        layer.closeAll();
        layer.msg('登录超时,请重新登录!', {
            icon: 5,
            time: 900
        }, function () {
           location.replace("../index.html");
        });
    },
    loginError: function () {
        layer.closeAll();
        layer.msg('用户名或密码错误,请重新登录!', {
            icon: 5,
            time: 900
        });
    },

    layerMsg: function (title, icon, callback,yesBack) {
        // //common.layerMsg(title, icon, callback);
       mokuai = true;
       if( title == "无此模块权限"){
            mokuai = false;
       }
        layer.msg(title);
        layer.msg(title, {icon: icon,time:1000},function(){
            if(callback){
                callback();
            }
        });
       /*var layerBox=layer.open({
           type:0,
            title:"贝安港提示",
            icon:icon,
            content:title,
            scrollbar:false,
            shadeClose:false,
            closeBtn:2,
            success:function(layero, index){
                if (callback) {
                    callback();
                }


            },yes:function(){
                if(yesBack){
                    yesBack();
                }
                layer.closeAll();
            }
        });*/

    },
    iframeLayerMsg: function (title, icon, callback) {
        //common.iframeLayerMsg(title, icon, callback);
        layer.msg(title, {
            icon: icon,
            time: 900
        }, function () {
            if (callback) {
                callback();
            }
        });
    },
    layerTabs: function (area, option,tabCallback) {
        //common.layerTabs()
       layerTab=layer.tab({
            area: area,
            tab: option,
            change:function(e){}
        });
       setTimeout(function(){
        tabCallback();
       },100);
    },
    layerMsgFlag: function (title, yesBack, cancelBack) {
        var layerBox=layer.open({
            title:"贝安港提示",
            icon:3,
            content:title,
            scrollbar:false,
            shadeClose:false,
            closeBtn:2,
            area:["180px"],
            btn: ['确定', '取消'],
            yes: function (index) {
                layer.close(index);
                if (yesBack) {
                    yesBack();
                }
            },
            cancel: function (index) {
                common.removeCurrent();
                layer.close(index);
                if (cancelBack) {
                    cancelBack();
                }
            }
        });

    },
    layerBox:function (title,area,content,successBack) {
        //common.layerBox(title,aera,content,successBack);
         layerBox=layer.open({
             type:1,
             title:title,
             content:content,
             scrollbar:false,
             shadeClose:false,
             area:area,
             closeBtn:2,
             success:function(layero, index){
                 if(successBack){
                     successBack();
                 }
                 //console.log(layero, index);
             }
         });
    },
    layerConfirm: function (title, area, content, successBack, yesBack,cancelBack) {
        //layerConfirm(title, area, content, successBack, yesBack);
        //弹出层
        indexaa=layer.open({
            title: title,
            scrollbar:false,
            shadeClose:false,
            closeBtn:2,
            area:area,
            shade: 0.5,
            btn: ['確定'],
            content: content,
            success: function (layero,index) {
                layerContent = $(layero);
                common.unComplate();
                if (successBack) {
                    successBack();
                }
            },
            yes: function (layero,index) {
                if (yesBack) {
                    yesBack();
                }
            },cancel:function () {
                common.removeCurrent();
                if(cancelBack){
                    cancelBack();
                }
            },end:function () {
                isEm = 0;
                if(isChangSchool){
                    isChangSchool = false;
                }
                  if(typeof(ue) !="string"){
                    ue.ready(function() {
                        ue.destroy();
                    })
                }
            }
        });

    }, layerPage: function (title, area, content, successBack,cancelBack) {
        //layerConfirm(title, area, content, successBack, yesBack);
        //弹出层
        indexaa=layer.open({
            type:1,
            title: title,
            scrollbar:false,
            shadeClose:false,
            closeBtn:2,
            area:area,
            shade: 0.5,
            content: content,
            success: function (layero,index) {
                layerContent = $(layero);
                common.unComplate();
                if (successBack) {
                    successBack();
                }
            },cancel:function () {
                common.removeCurrent();
                if(cancelBack){
                    cancelBack();
                }
            },end:function () {
                if(typeof(ue) !="string"){
                    ue.ready(function() {
                        ue.destroy();
                    })
                }
            }
        });

    },
    btnReset:function(){
        if(layerContent){
            layerContent.find('.layui-layer-btn0').removeClass('disabled');
            layerContent.find('.layui-layer-btn0').text('确定');
        }

    },
    btnCreat:function(){
        if(layerContent){
            layerContent.find('.layui-layer-btn0').addClass('disabled');
            layerContent.find('.layui-layer-btn0').text('加载中...');
        }

    },
    removeCurrent:function () {
        zhuangtaiTag = undefined;
        if( mmg != undefined){
            mmg.deselect("all");
            if(datasCur&&datasCur.length>0){
                var datas=mmg.rows(),currentId=datasCur[0].id;
                for(var i=0;i<datas.length;i++){
                    if(currentId==datas[i].id){
                        mmg.deselect(i);
                    }
                }
            }

        }
    },
    ajaxFun: function (url, data, beforBack, successBack, completeBack, errorBack) {
        //common.ajaxFun(url, data, beforBack, successBack, completeBack, errorBack);
        $.ajax({
            url: url,
            data: data,
            type: 'post',
            cache: false,
            dataType: 'json',
            beforeSend: function () {
                common.btnCreat();
                var index = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的背景
                });
                if (beforBack) {
                    beforBack();
                }
            },
            success: function (data) {
                if(data.success == false){
                    if(data.msg == "noSession"){
                         common.loginTimeout();
                         return false;
                    }
                    jAlert(data.msg, '贝安港提示',function() {
                        if(completeBack){
                            completeBack();
                        }
                        layer.closeAll('loading');
                    });
                    return false;
                }
                ajaxData = data;
                if (successBack) {
                    successBack(ajaxData)
                }
            },
            complete: function () {
                layer.closeAll('loading');
                common.btnReset();
                if (completeBack) {
                    completeBack();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var statusNum = XMLHttpRequest.status;
                layer.msg('服务器发生了' + textStatus + ',状态码是:' + statusNum, {
                    icon: 2,
                    time: 1000
                }, function (index) {
                    if (errorBack) {
                        errorBack();
                    }
                });
            }
        });

    },
    ajaxFunIframe: function (url, data, beforBack, successBack, completeBack, errorBack,checkBack) {
        //common.ajaxFunIframe(url, data, beforBack, successBack, completeBack, errorBack,checkBack);
        $.ajax({
            url: url,
            data: data,
            type: 'post',
            cache: false,
            dataType: 'json',
            beforeSend: function () {
                var indexLoading = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的背景
                });
                if (beforBack) {
                    beforBack();
                }
            },
            success: function (data) {
                if (data.success == false) {
                    if(data.msg == "noSession"){
                         common.loginTimeout();
                         return false;
                    }
                    jAlert(data.msg, '贝安港提示',function() {
                         common.showBtns();
                        if(checkBack){
                            checkBack();
                        }
                        layer.closeAll('loading');
                    });
                } else {
                    ajaxData = data;
                   layer.closeAll("loading");
                    if (successBack) {
                        successBack()
                    }
                }
            },
            complete: function () {

                common.btnReset();
                if (completeBack) {
                    completeBack();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var statusNum = XMLHttpRequest.status;
               layer.msg('服务器发生了' + textStatus + ',状态码是:' + statusNum, {
                    icon: 2,
                    time: 600
                }, function (index) {
                    if (errorBack) {
                        errorBack();
                    }
                    layer.closeAll();
                });
            }
        })

    },
    isEmptyObject: function( obj ) {
        for ( var name in obj ) {
            return false;
        }
        return true;
    },
    powerFlag: function (data,no) {
        // //公用权限判断
        var powerArray = new Array(); //定义一数组
        powerArray = data.split(","); //字符分割
        powerArray.splice(0, 1);
        addFlag = false;
        editFlagS = false;
        delFlag = false;
        btnsArea="";
        if (powerArray[0] == 1) {

            addFlag = true;
            if( ! no){
                btnsArea+=template($('#addBtn').attr('id'),[]);
            }

        }
        //增加对code的权限判断
        if (powerArray[1] == 1) {
            editFlagS = true;
        }



        if (powerArray[2] == 1) {
            delFlag = true;
            if( ! no){
                btnsArea+=template($('#delAllBtn').attr('id'),[]);
            }
        }
        $('.btnsArea').html(btnsArea);
    },
    creatSearch:function () {
        //获得搜索条件
        var actForm=$('.action');

        var inputItem=actForm.find('input[type="text"]'),
            inputHiden=actForm.find('input[type="hiddden"]'),
            selectItem=actForm.find('select'),
            radioItem=actForm.find('input[type="radio"]'),
            hideItem=actForm.find('input[type="hidden"]');
        var inpuItemAray=[],selectItemAray=[];
        //便利所有的input:text
        var dataInp={},sArray=[];
        dataInp.push=function(o){
            //如果o是object
            if(typeof(o)=='object') for(var p in o) this[p]=o[p];
        };
        if(inputItem&&inputItem.length>0){
            for(var i=0;i<inputItem.length;i++){
                var inputItemName=$(inputItem[i]).attr('name'),
                    inputItemValue=$(inputItem[i]).val();
                if( inputItemValue != ""){
                    var k={};
                    key=inputItemName;
                    k[key]=inputItemValue;
                    sArray.push(k);
                    dataInp.push(k);
                }

            }
        }
        if(inputHiden&&inputHiden.length>0){
            for(var i=0;i<inputHiden.length;i++){
                var inputItemName=$(inputHiden[i]).attr('name'),
                    inputItemValue=$(inputHiden[i]).val();
                //console.log(inputItemName);
                if( inputItemValue != ""){
                    var k={};
                    key=inputItemName;
                    k[key]=inputItemValue;
                    sArray.push(k);
                    dataInp.push(k);
                }

            }
        }
        //便利所有的select
        if(selectItem&&selectItem.length>0){
            for(var i=0;i<selectItem.length;i++){
                var selectItemName=$(selectItem[i]).attr('name'),
                    selectItemValue=$.trim($(selectItem[i]).val());
                if( selectItemName&&selectItemValue != ""&& selectItemValue != " "){
                    if(selectItemName == "classId"&&selectItemValue==0){
                        return false;
                    }
                    else{
                        var k={};
                        key=selectItemName;
                        k[key]=selectItemValue;
                        sArray.push(k);
                        dataInp.push(k);
                    }
                }
                /*else{
                    var key = selectItemName;
                    if(_dataParams[key] != "" && _dataParams[key] != undefined){
                        delete _dataParams[key];
                    }

                }*/

            }
        }

        //便利所有的hidden
        if(hideItem&&hideItem.length>0){
            for(var i=0;i<hideItem.length;i++){
                var hideItemName=$(hideItem[i]).attr('name'),
                   hideItemValue=$(hideItem[i]).val();
                var items={ hideItemName:hideItemValue};
                if( hideItemValue != ""){
                    var k={};
                    key=hideItemName;
                    k[key]=hideItemValue;
                    sArray.push(k);
                    dataInp.push(k);
                }

            }
        }

        if(dataInp.undefined){
            delete dataInp.undefined;
        }
        delete dataInp.push;
        if(dataInp){
            if(dataInp.classId=="0"){
                delete dataInp.classId;
            }
            if(dataInp.schoolId==" "){
                delete dataInp.schoolId;
            }
        }
        _dataParams=dataInp;
        _dataParams.page = 1;
        //console.log(_dataParams);
        if(sArray.length>0){
            ssFlag = true;
        }else{
            ssFlag = false;
        }
    },
    ajaxSubmitV:function (url,datas,callback) {
        //common.ajaxSubmitV(url,datas,callback)
        //提交数据
        $.ajax({
            type: "post",
            url:url,
            data: datas,
            dataType: "json",
            success: function(data){
                if(data.success == false){
                    if(data.msg == "noSession"){
                         common.loginTimeout();
                         return false;
                    }
                    jAlert(data.msg, '贝安港提示',function() {
                        if(checkBack){
                            checkBack();
                        }
                        layer.closeAll('loading');
                    })
                }
                ajaxDatas=data;
                if(callback){
                    callback(data);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                var statusNum = XMLHttpRequest.status;
               layer.msg('服务器发生了' + textStatus + ',状态码是:' + statusNum, {
                    icon: 2,
                    time: 600
                }, function (index) {
                    if (errorBack) {
                        errorBack();
                    }
                    layer.closeAll();
                });
            }
        });
    },
    selectCitys: function (obj,prov,city,dist,nodata,require,callback) {
        // selectCitys(obj,prov,city,dist,nodata,require,callback);
        //省市区
        obj.citySelect({
            "url": _configbase.cityList,
            prov: prov,
            city: city,
            dist: dist,
            nodata: nodata,
            require:require,
            callback:callback

        });
    },
    compareTime: function (beginTime, endTime) {
        if (beginTime != null && endTime != null) {
            var beginTimes = beginTime.substring(0, 10).split('-');
            var endTimes = endTime.substring(0, 10).split('-');
            beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
            endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
            var timeFlag = (Date.parse(beginTime) - Date.parse(endTime));
            //console.log(timeFlag);
            if (timeFlag < 0) {
                return 0;
            } else if (timeFlag > 0) {
                return 3;
            } else if (timeFlag == 0) {
                return 1;
            } else {
                return 'exception'
            }
        }
    },
    layerDateHHSS: function (obj) {
        obj.on('focus', function () {
            WdatePicker({
                skin: 'whyGreen',
                dateFmt: 'HH:mm:ss'
            });
        });
    },
    layerDateYYMMHHSS: function (obj,minDate) {
        if(minDate){
            obj.on('focus', function () {
                WdatePicker({
                    skin: 'whyGreen',
                    dateFmt: 'yyyy-MM-dd HH:mm:00',
                    minDate:'%y-%M-{%d+1}'
                });
            });
        }else{
            obj.on('focus', function () {
                WdatePicker({
                    skin: 'whyGreen',
                    dateFmt: 'yyyy-MM-dd'
                });
            });
        }

    },
    layerDateYYMM: function (obj,minDate) {
        if(minDate){
             obj.on('focus', function () {
            WdatePicker({
                skin: 'whyGreen',
                dateFmt: 'yyyy-MM-dd',
                minDate:'%y-%M-{%d+1}'
            });
            });
        }else{
             obj.on('focus', function () {
            WdatePicker({
                skin: 'whyGreen',
                dateFmt: 'yyyy-MM-dd'
            });
        });
        }

    },
    layerDateMinMax: function (obj, min, max) {
        //layerDateMinMax(obj,min,max);
        obj.on('focus', function () {
            //console.log('<br>mins:' + min + "<br>maxs:" + max);
            WdatePicker({
                skin: 'whyGreen',
                dateFmt: 'yyyy-MM-dd',
                minDate: min,
                maxDate: max
            });
        });
    },
    layerDates: function (obj) {
        obj.on('focus', function () {
            WdatePicker({
                skin: 'whyGreen',
                dateFmt: 'yyyy-MM-dd HH:mm:ss'
            });
        });
    },
    layerDateStarting: function (obj) {
        obj.on('focus', function () {
            WdatePicker({
                skin: 'whyGreen',
                dateFmt: 'yyyy-MM-dd HH:mm:ss',
                minDate: '%y-%M-{%d}'
            });
            //parent.laydate({
            //	format: 'YYYY-MM-DD hh:mm:ss',
            //	istime: true,
            //	min: parent.laydate.now(), //设定最小日期为当前日期
            //	max: '2099-06-16 23:59:59', //最大日期
            //	festival: true,
            //	istoday: true
            //});
        });
    },
    getSchoolAndClassItem:function (eleS,emptyS,eleC,emptyC,fun,schoolCur,classCur,schoolFun) {
        //学校和班级
        //common.getSchoolAndClassItem(eleS,emptyS,eleC,emptyC,fun,schoolCur,classCur,schoolFun);
        var callback=function () {
            if (schoolFun){
                schoolFun();
            }
            var eleSv=eleS.find('input[name="schoolId"]').val();
                p={"schoolId":eleSv,"page":0,"count":0,'isUse':1};
                    common.getClass(eleC,emptyC,p,fun,classCur);
        };
        var p={page:0,count:0,'isUse':1};
        common.getSchoolItem(eleS,p,emptyS,callback,schoolCur);
    },
    getCarams:function(obj,p,callback){
        //common.getCarams(obj,p,callback);
        //摄像头
         $.getJSON($cameras.list.url,p,function (results) {
            var lists = results.list;
            if (lists) {
                var _html = template('tplCamera', {list: lists});
                obj.html(_html);
                if (callback) {
                    callback();
                }

                if(lists.length == 0){
                    common.hideBtns();
                }else{
                    common.showBtns();
                }
            }
        });
    },
    getSchoolAndRoleItem:function (eleS,p,emptyS,eleR,fun,schoolCur,Rolecur) {
      //  common.getSchoolAndRoleItem(eleS,p,emptyS,eleR,fun,schoolCur,Rolecur);
        //学校和岗位
        //common.getSchoolAndClassItem(eleS,emptyS,eleC,fun);
        var callback=function () {
            var eleSv=eleS.find('input[name="schoolId"]').val(),
                p={"schoolId":eleSv};
            common.getRoles(eleR,p,fun,Rolecur);
        };
        var p={page:0,count:0};
        common.getSchoolItem(eleS,p,emptyS,callback,schoolCur);
    },
    getSmsChannels:function (obj,callback) {
        obj=$(obj);
        //获得短信渠道
        $.getJSON($smsChannels.list.url, function (results) {
            var lists = results.list;
            if (lists && lists.length > 0) {
                ajaxDuanxin = lists;
                var _html = template('tplDuanxin', {list: lists});
                obj.html(_html);
                if (callback) {
                    callback();
                }
            }
        });
    },
    getDailis: function (obj,callback) {
        //获得代理列表
        $.getJSON($agents.list.url, function (results) {
            var dailis = results.list;
            if (dailis) {
                var _html = template('tplDaili', {list: dailis});
                obj.html(_html);
                if (callback) {
                    callback();
                }
            }
        });
    },
    getGoods: function (url, callback) {
        //得到商品
        $.getJSON(url, function (results) {
            goods = results.list;
            if (callback) {
                callback();
            }
        });
    },
    getXueqi: function (eleXueqi,param,callback,cur) {
        //得到学期
        //common.getXueqi(eleXueqi,param,callback)
        var url=$semesters.list.url;
        if(param.schoolId==""){
            var _html=template('tplXueqi',{});
            $(eleXueqi).html(_html);
            if(callback){
                callback();
            }

        }else{
            $.getJSON(url,param,function (results) {
                common.wuquanxians(results);
                xueqiList = results.list;
                xueqiDate=xueqiList;
                if(xueqiDate.length==0){
                    $('.layui-layer-btn0').addClass('disabled');
                }
                else{
                    $('.layui-layer-btn0').removeClass('disabled');
                }
                if(cur){
                    var _html=template('tplXueqi',{list:xueqiList,cur:cur});
                }else{
                    var _html=template('tplXueqi',{list:xueqiList});
                }

                $(eleXueqi).html(_html);
                var eleSe=$(eleXueqi).find('select');
                eleSe.on('change',function () {
                    if(callback){
                        callback();
                    }
                });
                eleSe.change();
            });
        }

    },
    getXuezhous:function (eleXuezhou,param,callback,cur) {
        //得到学周
        //common.getXuezhous(eleXuezhou,param,callback);
        var url=$weeks.list.url;
        param.page = 0;
        param.count = 0;
        $.getJSON(url,param,function (results) {
            xueZhouList = results.list;
            if(xueZhouList.length==0){
                $('.layui-layer-btn0').addClass('disabled');
            }
            else{
                $('.layui-layer-btn0').removeClass('disabled');
            }
            if(cur){

                var _html=template('tplXuezhou',{list:xueZhouList,cur:cur});
            }
            else{
                var _html=template('tplXuezhou',{list:xueZhouList});
            }

                $(eleXuezhou).html(_html);
                if(callback){
                    callback();
                }
        });
    },
    wuquanxians:function(results){
        if(results.success == false){
            if(results.ecode == "E000002" ){
                var title = results.msg+"请先联系你的上级添加此模块权限";
                jAlert(title, '贝安港提示',function() {
                        location.replace('index.html');
                    });
            }

        }
    },
    getJihua: function (_schoolUrl, _objSchool, _classUrl, _objClass, _xueqiUrl, _objXueqi, callback) {
        var renderSchool = function (data) {
            _objSchool.html(template('tplSchool', {
                list: data
            }));
            var ckiScId = $.cookie('bag-schoolId');
            if (datasCur) {
                _objSchool.find('select').val(datasCur.schoolId);
                _classId = datasCur.classId;
                _semesterId = datasCur.semesterId;
            }
            ;
            if (ckiScId != undefined && ckiScId != null && ckiScId != '') {
                _objSchool.find('select').val(ckiScId);
                $(parent.document).find('.J-schoolRow').hide();
            }
            _objs = $(_objSchool).find('select');
            var v = _objs.val();
            xqData = {
                "schoolId": v
            };
            getClass(xqData);
            getXueqi(xqData);
            $(_objs).on('change', function () {
                var v = $(this).val();
                xqData = {
                    "schoolId": v
                };
                getClass(xqData);
                getXueqi(xqData);
            });
        };
        var renderClass = function (data) {
            classFlag = true;
            _objClass.html(template('tplClass', {
                list: data
            }));
            if (datasCur) {
                _objClass.find('select').val(datasCur.classId);
            }
        };
        var renderXueqi = function (data) {
            xueqiFlag = true;
            xueqiDate = data;
            _objXueqi.html(template('tplXueqi', {
                list: data
            }));
            if (datasCur) {
                _objClass.find('select').val(datasCur.semesterId);
            }
        };
        var beforBack = function () {
        };

        var getSchool = function () {
            backScool = function () {
                renderSchool(ajaxData.list)
            };
            common.ajaxFunIframe(_schoolUrl, null, beforBack, backScool);
        };
        var getClass = function (data) {
            ajaxData.list = [];
            backScool = function () {
                if (ajaxData.list && ajaxData.list.length > 0) {
                    renderClass(ajaxData.list);
                } else {
                    classFlag = false;
                }

            };
            common.ajaxFunIframe(_classUrl, data, beforBack, backScool);
        };
        var getXueqi = function (data) {
            ajaxData.list = [];
            backScool = function () {
                if (ajaxData.list && ajaxData.list.length > 0) {
                    renderXueqi(ajaxData.list);
                } else {
                    xueqiFlag = false;
                }
            };
            common.ajaxFunIframe(_xueqiUrl, data, beforBack, backScool);
        };

        getSchool();
    },
    showBtns:function () {
        if ($('.layui-layer-btn')&&$('.layui-layer-btn').length>0) {
            $('.layui-layer-btn .layui-layer-btn0').removeClass('disabled');
            $('.layui-layer-btn .layui-layer-btn0').text('确定');
        }
    },
    hideBtns:function () {
        if ($('.layui-layer-btn')&&$('.layui-layer-btn').length>0) {
            $('.layui-layer-btn .layui-layer-btn0').addClass('disabled');
             $('.layui-layer-btn .layui-layer-btn0').text('加载中...');
        }
    },
    getSchoolAndClass: function (_objSchool, _objClass,callbacks,ids,empty,cab) {
        //getSchoolAndClass(_objSchool, _objClass);
        //学校和班级
        //cFlag=true;
        var _schoolUrl = $schools.list.url,
            _classUrl = $classes.list.url;
        var beforBack = function () {
        };
        var _getSchool = function () {
            common.ajaxFunIframe(_schoolUrl, null, beforBack, function () {
                _schoolData = ajaxData.list;
                var data = {
                    empty: empty, //empty 0表示不可以位空
                    list: _schoolData
                };
                var _scHtml = template('tplSchool',data);
                _objSchool.html(_scHtml);
                if (ids != null) {
                    _objSchool.find('select').val(ids.sid);
                }
                _getClass();
                _objSchool.find('select').on('change', function () {
                    _getClass();
                });
            });
        };
        var _getClass = function () {
            var v = parseInt(_objSchool.find('select').val());
           if(v==NaN){
               common.showBtns();
           }
            else{
               common.hideBtns();
           }
            common.ajaxFunIframe(_classUrl, {'schoolId': v}, beforBack, function () {
                _classData = ajaxData.list;
                if (_classData && _classData.length > 0) {
                    var _scHtml = template('tplClass', {list: _classData});
                    _objClass.html(_scHtml);
                    if (ids != null) {
                        _objClass.find('select').val(ids.cId);
                    }
                    common.showBtns();
                }
                else {
                    common.hideBtns();
                    _objClass.html('<span class="select-box" style="border:1px solid red;"><select class="select" name="classId" id="classId"><option value="">需新添加班级</option></select></span>');
                }

                if (callbacks) {
                    callbacks();
                }

            });
        };
        _getSchool();
    },
    getWorkers:function (tplName,ele,param,callback) {
        //common.getWorkers(tplName,ele,param,callback)
        //教职工
            _workerUrl = $teachers.list.url;
        //学校
        $.getJSON(_workerUrl,param,function (results) {
            dataWorkers = results.list;
            if(dataWorkers&&dataWorkers.length>0){
                var _html=template(tplName,{list:dataWorkers});
                $(ele).html(_html);
                common.showBtns();
                if(callback){
                    callback(dataWorkers);
                }
            }
            else{
                ele.html('此园暂无教职工，需创建');
                common.hideBtns();
            }

        });
    },
    getPersons:function (tplName,ele,param,callback,cur) {
        //common.getWorkers(tplName,ele,param,callback,cur)
        //教职工
            _personUrl = $user.list.url;
            param.page = 0;
            param.count = 0;
            if(isClass){
                param.isClass = 2;
            }

        //学校
        $.getJSON(_personUrl,param,function (results) {
            dataWorkers = results.list;
            if(dataWorkers&&dataWorkers.length>0){
                if(cur){

                    for(var i=0;i<cur.length;i++){
                        for(var j=0;j<dataWorkers.length;j++){
                            if(parseInt(cur[i])==dataWorkers[j].id){
                                dataWorkers[j].cur=true;
                            }
                        }
                    }
                }
                var _html=template(tplName,{list:dataWorkers});
                $(ele).html(_html);
                if(callback){
                    callback();
                }
            }
            else{
                ele.html('此园暂无家长,需添加');
            }

        });
    },
    getAds:function (ele,p,cab,cur) {
        var _addUrl = $adverts.list.url;
        $.getJSON(_addUrl,p,function (results){
        })
    },
    ajaxError:function (msg) {
      var _html=template('errMsg',msg);
        $('.table-wrapper').append(_html);
    },
    getSchoolItem:function (ele,p,em,cab,cur,isChecked) {

        isEm = em;
        //得到学校 common.getSchoolItem(ele,p,em,cab,cur,isChecked)
        var _schoolUrl = $schools.list.url,j=0;
        $.getJSON(_schoolUrl,p,function (results){
            //得到所有的学校
            dataSchool = results.list;
            if(zhuangtaiTag=="zengjia" || zhuangtaiTag=="bianji"){

                var tempData = [];
                for(var i=0;i<dataSchool.length;i++){
                    if(dataSchool[i].isUse == 1){
                        tempData.push(dataSchool[i]);
                    }
                }

                dataSchool = tempData;
            }

            if( !(dataSchool&&dataSchool.length>0)){
                //ele.html('还未建园');
                var msg={"msg":"还未建园"};
                common.ajaxError(msg);

            }
            else{
                if(dataSchool.length>20){
                    //select 大于10
                    selectLayer(dataSchool);
                }
                else{
                    selectObj(dataSchool);
                }
            }
        });
        if(isChecked){
                    checkeds = 'no';
                }else{
                    checkeds = 'yes';
                }

        var selectLayer=function (dataSchool) {
           //select弹层
            var _html;

            if(cur){
                //有默認值
                schoolCurrent=cur;
                var sId = schoolCurrent.schoolId;
                if(sId == undefined){
                    sId = schoolCurrent.id;
                }
                schoolCurrent.schoolId=sId;
                _html=template('tplSchool',{list:dataSchool,style:2,empty:em,schoolCurrent:schoolCurrent,checkeds:checkeds});
            }
            else{
                  if(em==1){
                    schoolCurrent=dataSchool[0];
                      var sId = schoolCurrent.schoolId;
                      if(sId == undefined){
                          sId = schoolCurrent.id;
                      }
                      schoolCurrent.schoolId=sId;
                     _html=template('tplSchool',{list:dataSchool,style:2,empty:em,schoolCurrent:schoolCurrent,checkeds:checkeds});
                  }
                  else{
                    _html=template('tplSchool',{list:dataSchool,style:2,empty:em,checkeds:checkeds});
                  }


            }
            ele.html(_html);

            if(cab){  cab(); }
            ele.find('.J-choose').on('click',function () {
                if(isChangSchool){
                    return false;
                }
                var th=$(this);
                schoolLayer=layer.open({
                    content:th.next('.J-all-school').html(),
                    closeBtn:2,
                    type:1,
                    area:["500px","300px"],
                    title:"选择园所",
                    success:function () {
                        var dataId=th.parent().find('input[name="schoolId"]').val();
                        $('.J-school-a a').removeClass('acitve');
                        $('.J-school-a a[data-id="'+dataId+'"]').addClass('active');
                        $('.J-school-a a').on('click',function (e) {
                            e.preventDefault();
                            $('.J-school-a a').removeClass('active');
                            $(this).addClass('active');
                        });
                    },
                    btn:["确定"],
                    yes:function () {
                        var eleC=$('.J-school-a a.active');
                        var eleCIndex = null;
                        if(isEm==0){
                            eleCIndex = $('.J-school-a a.active').index()-1;
                            if(eleCIndex==-1){
                                thname = "所有幼儿园";
                                thv = "-1";
                                schoolCurrent = undefined;
                            }else{
                                var thname=dataSchool[eleCIndex].schoolName,
                                    thv=dataSchool[eleCIndex].id;
                                schoolCurrent=dataSchool[eleCIndex];
                            }
                        }else{
                            eleCIndex = $('.J-school-a a.active').index();
                            var thname=dataSchool[eleCIndex].schoolName,
                                thv=dataSchool[eleCIndex].id;
                            schoolCurrent=dataSchool[eleCIndex];
                        }




                        th.find('.J-sname').text(thname);
                        th.find('.J-sname').attr('data-id',thv);
                        if(thv != ""){
                            th.parent().find(".info-wrapper").remove();
                        }
                        th.parent().find('input[name="schoolId"]').val(thv);
                        if(cab){
                            cab();

                        }
                        layer.close(schoolLayer);
                    }
                });
            });
        };
        var selectObj=function () {
           //原生select
            var _html,j=0;
            if(cur){
                //有默認值
                schoolCurrent=cur;
                _html=template('tplSchool',{list:dataSchool,style:1,empty:em,schoolCurrent:schoolCurrent,checkeds:checkeds});
                ele.html(_html);
                ele.find('input[name="schoolId"]').val(cur.schoolId);
                ele.find('select').val(cur.schoolId);
            }
            else{
                    _html=template('tplSchool',{list:dataSchool,style:1,empty:em,checkeds:checkeds});
                    ele.html(_html);
                    if(em == 1){
                        ele.find('input[name="schoolId"]').val(dataSchool[0].id);
                        schoolCurrent = dataSchool[0];
                    }

            }

            if(cab){
                cab();
            }




            var eleSele=ele.find('select');
            if(isChangSchool){
                eleSele.prop('disabled',true);
            }
            var i=0;
            eleSele.on('change',function () {
                var th=$(this);
                    thInd=th.find("option:selected").index();
                  if(isEm == 0 && thInd != 0){
                      thInd = thInd-1;
                  }
                thname=dataSchool[thInd].schoolName;
                    thv=dataSchool[thInd].id;
                schoolCurrent=dataSchool[thInd];
                if(thv != ""&& thv != " "){
                    th.parent().parent().find(".info-wrapper").remove();
                }
                th.parent().parent().find('input[name="schoolId"]').val(th.val());
                if( i != 1 || typeof(zhuangtaiTag) != "undefined" ){
                    if(cab){cab();}
                }


            });
        };

    },
    getSchoolAndRole: function (_objSchool, _objrole, callback) {
        //学校和角色(岗位)
        var _schoolUrl = $schools.list.url, _roleUrl = $roles.list.url,obj=$(_objSchool).next();
        var beforBack = function () {
        };
        var _getSchool = function () {
            common.ajaxFunIframe(_schoolUrl, null, beforBack, function () {
                _schoolData = ajaxData.list;
                if (_schoolData && _schoolData.length > 0)
                    var _scHtml = template('tplSchool', {list: _schoolData});
                _objSchool.html(_scHtml);
                var par=$(_objSchool).find('select').val();
                var para={"schoolId":par};
                _getClass(obj,para);
                _getRole();
                _objSchool.find('select').on('change', function () {

                    _getRole();
                })
            });
        };
        var _getRole = function () {
            par=$(_objSchool).find('select').val();
            var para={"schoolId":par};
            _getClass(obj,para);
            var _wbtn = $('.layui-layer-btn'), v = _objSchool.find('select').val();
            common.ajaxFunIframe(_roleUrl, {'schoolId': v,"page":0,"count":0,"isUse":1}, beforBack, function () {
                _roleData = ajaxData.list;
                var codes=common.getCode();
                    for(var i=0;i<_roleData.length;i++){
                        if(_roleData[i].code=='YZ'){
                            _roleData.splice(i,1);
                        }
                    }


                var _roleHtml = template('tplRole', {list: _roleData});
                _objrole.html(_roleHtml);
                if (callback) {
                    callback();
                }
                if (_roleData && _roleData.length > 0) {
                   common.showBtns();
                }
                else {
                    common.hideBtns();
                }
            });
        };

        var _getClass=function (obj,para) {
            common.getClassParams(obj,para)
        };

        _getSchool();
    },
    getRoles: function (ele,p,f,cur) {
        //获得岗位
        p.page = 0;
        p.count = 0;
        p.isUse = 1;
        //common.getRoles(ele,p,f,cur)
        if((p.schoolId&&p.schoolId.length==0) || p.schoolId == undefined || p.schoolId ==""){
            var _html = template('tplRole', {res:0});
            $(ele).html(_html);
            if(f){
                f();
            }

            common.hideBtns();

        }
        var schoolId=ele.parent().find('input[name="schoolId"]').val();
        if(schoolId==""){
            return false;
        }


            $.getJSON($roles.list.url,p,function (results) {
                var res = results.list;
                if (res && res.length > 0) {
                    var _html = template('tplRole', {list: res,res:1,cur:cur});
                    $(ele).html(_html);
                    _dataParams.page=1;
                    $('input[name="roleId"]').val(res[0].id);
                    var classItem= $(ele).find('select');
                    classItem.on('change',function () {
                        $('input[name="roleId"]').val($(this).val());
                        if(f){
                            f();
                        }
                    });
                    classItem.change();
                    if(cur){
                        classItem.val(cur.roleId);
                        $('input[name="roleId"]').val(cur.roleId);
                    }
                    common.showBtns();
                }
                else {
                    var _html = template('tplRole',{ list:null,res:0,cur:cur});
                    $(ele).html(_html);
                    _dataParams.page=1;
                    $('input[name="roleId"]').val('');
                    if(f){
                        f();
                    }
                }

            })


    },
    getClass: function (ele,emptyC,p,f,cur) {
        //getClass(ele,emptyC,p,f,cur);
        var dataCur;
        if(cur){
            dataCur=cur;
        }
        if(p.schoolId == "" || p.schoolId == " " || p.schoolId == -1){

            res={};
            var _html = template('tplClass', {list: res,res:0,empty:emptyC});
            $(ele).html(_html);
            _dataParams.schoolId == "";
            _dataParams.classId == "";
            if(f){
                f();
            }
            return false;
        }

        $.getJSON($classes.list.url,p,function (results) {
            if(results.success==false){
                if(results.ecode=="E000002"){
                    common.wuquanxian();
                }
                return false;
            }
            else{
                var res = results.list;
                if (res && res.length > 0) {
                    if(zhuangtaiTag=="zengjia"){
                        var tempData = [];
                        for(var i=0;i<res.length;i++){
                            if(res[i].isUse == 1){
                                tempData.push(res[i]);
                            }
                        }
                        res = tempData;
                    }
                    var _html = template('tplClass', {list:res,res:1,empty:emptyC});
                    $(ele).html(_html);
                    if(res.length==0){
                        classCurrent = undefined;
                        if(f){f()}
                    }
                    var classItem= $(ele).find('select');
                    var flagss = 0;
                    classItem.unbind('change').on('change',function () {
                        var th=$(this).find('option:selected'),
                            thInd=th.index();
                        classCurrent = res[thInd];
                        //console.log(classCurrent);
                        ele.find('input[name="classId"]').val($(this).val());
                        flagss++;
                        if(f){f()}
                    });

                    if(dataCur&&flagss==1){
                        classItem.val(dataCur.classId);
                        ele.find('input[name="classId"]').val(dataCur.classId);
                        if(f){f()}
                    }
                    else{
                        classItem.change();
                    }
                }else{
                    var _html = template('tplClass',{res:0});
                    $(ele).html(_html);
                    $('input[name="classId"]').val('');
                    if(f){ f()}
                }
            }
        })
    },
    wuquanxian:function () {
        //无权限
        $('.table-wrapper').append('<div class="">暂无此模块权限</div>');
    },
    creatClass:function (ele,p,f,cur) {
        $.getJSON($classes.list.url,p,function (results) {
            if(results.success==false){
                if(results.ecode=="E000002"){
                    common.wuquanxian();
                }
                return false;
            }


        });
    },
    getBaby:function (tplName,p,ele,f,cur) {
        //getBaby(tplName,p,ele,f);
      //通过班级 得到宝贝
        $.getJSON($kid.list.url,p,function (results) {
            var res = results.list;
            dataWorkers = results.list;
            if (res && res.length > 0) {
                var _html = template(tplName, {list: res});
                $(ele).html(_html);
                if(f){
                    f(dataWorkers);
                }
                common.showBtns();
            }
            else {
                ele.html('此班暂无宝贝');
            }
        })
    },
    getClassParams: function (_objClass,params,callback,cur) {
        var beforBack = function () {
        };
        var _classUrl = $classes.list.url;
        var _getClass = function () {
            common.ajaxFunIframe(_classUrl,params, beforBack, function () {
                _classData = ajaxData.list;
                if (_classData && _classData.length > 0) {
                    if(cur){
                       var _scHtml = template('tplClass', {list: _classData,cur:cur});
                    }
                    else{
                        var _scHtml = template('tplClass', {list: _classData});
                    }

                    _objClass.html(_scHtml);
                    common.showBtns();
                    if(callback){
                        callback();
                    }
                }
                else {
                    common.hideBtns();
                    _objClass.html('<select class="select" name="classId"><option>暂无班级，需要添加班级</option></select>');
                }
            });
        };
        _getClass();
    },
    getXuezhou: function (ele, callback) {
        //得到学周
        var _url = $weeks.list.url;
        $.getJSON(_url, function (data) {
            xuezhouData = data.list, tem = "";
            if (xuezhouData && xuezhouData.length > 0) {
                tem = template('tplXuezhou', {
                    list: xuezhouData
                });
                ele.html(tem);
                if (callback) {
                    callback();
                }
            }
        });
    },
    getDateDiff: function (startDate, endDate) {
        //计算两个日期之间的天数
        var startTime = new Date(startDate);
        var endTime = new Date(endDate);
        var days = (startTime - endTime) / (1000 * 60 * 60 * 24);
        return days;
    },
    getDateList: function (data) {
        //计算2个日期之间的所有日期
        var startDate = (data.startDate).split("-");
        var endDate = (data.endDate).split("-");
        var db = new Date();
        db.setFullYear(startDate[0], startDate[1] - 1, startDate[2]);
        var de = new Date();
        de.setFullYear(endDate[0], endDate[1] - 1, endDate[2]);
        var dataList = [];
        for (var i = 0, temp = db; temp < de; i++) {
            dataList[i] = common.getDateString(temp);
            temp.setTime(temp.getTime() + 24 * 60 * 60 * 1000);
        }
        dataList[i] = common.getDateString(de);
        datass = [];
        for (var j = 0; j < dataList.length; j++) {
            var weeks = common.getWeeks(dataList[j]),
                days = new Date(dataList[j]).getDay();
            var state = "";
            switch (days) {
                case 1:
                    state = data.isMonSchool;
                    break;
                case 2:
                    state = data.isThuSchool;
                    break;
                case 3:
                    state = data.isWedSchool;
                    break;
                case 4:
                    state = data.isFriSchool;
                    break;
                case 5:
                    state = data.isTueSchool;
                    break;
                case 6:
                    state = data.isSatSchool;
                    break;
                case 0:
                    state = data.isSunSchool;
                    break;

            }
            datass.push({
                'id': j,
                'date': dataList[j],
                'week': weeks,
                'day': days,
                'weekId': data.id,
                'state': state
            });
        }
        //console.log(datass);
        return datass;
    },
    getDateString: function (d) {
        //返回1900-01-01格式的字符串
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    },
    getWeeks: function (date) { //此处也可以写成 17/07/2014 一样识别    也可以写成 07-17-2014  但需要正则转换
        var day = new Date(Date.parse(date)); //需要正则转换的则 此处为 ： var day = new Date(Date.parse(date.replace(/-/g, '/')));
        var today = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
        var week = today[day.getDay()];
        return week;
    },
    linkageSelect: function (option) {
        var opt = option, datasLink;
        optLength = opt.length;
        k = 0;
        var getDatas = function (key, v) {
            var _url = v.url,
                _tpl = v.tpl,
                _ele = v.ele;
            $.getJSON(_url, function (datas) {
                k = key + 1;
                if (datas.success == true) {
                    datasLink = datas.list;
                    if (datasLink.length > 0) {
                        _html = template(_tpl, {list: datasLink});
                        _ele.html(_html);
                        v = _ele.find('select').val();
                        _ele.find('select').on('change', function (e) {
                            renderWeeks(_ele.find('select'), k);
                        })
                        if (k > 0) {
                            renderWeeks(_ele.find('select'), k);
                        }
                    }

                }
            })
        };
        var renderTpl = function (tpl, data) {
            return template(tpl, {list: data});
        }

        var renderWeeks = function (obj, k) {
            ind = k;
            var v = parseInt(obj.val());
            var _url = opt[k].url + '?' + opt[k].param + "=" + v;
            $.getJSON(_url, function (datas) {
                datasLink = datas.list;
                if (datasLink.length > 0) {
                    _html = template(opt[k].tpl, {list: datasLink});
                    $(opt[k].ele).html(_html);
                    if (opt.length - 1 == k) {
                        $(opt[k].ele).find('select').on('change', function () {
                            var _index = $(this).get(0).selectedIndex;
                            renderDays(datasLink[_index], k);
                        })
                        renderDays(datasLink[0], k);
                    }
                    else {
                        var v = $(opt[k].ele).find('select').val();
                        var s = k + 1, _url = opt[s].url + '?' + opt[s].param + '=' + v;
                        $.getJSON(_url, function (datas) {
                            datasLink = datas.list;
                            if (datasLink.length > 0) {
                                _html = template(opt[s].tpl, {list: datasLink});
                                $(opt[s].ele).html(_html);
                                $(opt[s].ele).find('select').on('change', function () {
                                    var _index = $(this).get(0).selectedIndex;
                                    renderDays(datasLink[_index], s);
                                })
                                renderDays(datasLink[0], s);
                            }
                        })

                    }
                }
                else {
                    $(parent.window.document).find('.J-dates').empty();
                }
            })
        }

        var renderDays = function (data, k) {
            var datas = common.getDateList(data);
            _html = template('tplShipu', {list: datas});
            $('.J-dates').html(_html);
        };

        getDatas(0, opt[0]);

    },
    getTeachers: function (tplName,obj,param,callback) {
        //tplName:tplTeachers;
        //得到教职工
        var teachers=false;
        if(param){
            $.getJSON($teachers.list.url,param,function (results) {
                var res = results.list;
                if(res&&res.length>0){
                    var _html = template(tplName, {list: res});
                    if(teachers == true){
                        teachers=false;
                    }
                    $(obj).html(_html);
                }
                else{
                    $(obj).html("此园暂无教职工");
                }
                if (callback) {
                    callback();
                }

            })
        }
    },
    getAdSpot:function (obj,p,callback,cur) {
      //得到广告位
        $.getJSON($adSpots.list.url,p,function (results) {
            var res = results.list;
            if (res && res.length > 0) {
                 if(cur){
                    var _html = template('tplAdSpot', {list: res,cur:cur});
                 }else{
                    var _html = template('tplAdSpot', {list: res});
                 }

                $(obj).html(_html);
                if (callback) {
                    $(obj).find('select').on('change',function(){
                        callback();
                    })
                    if(cur){
                        $(obj).find('select').val(cur.id);
                        $(obj).find('select').trigger('change');
                    }else{
                        $(obj).find('select').change();
                    }


                }
            }
            else {
                common.loginTimeoutIframe();
            }
        })
    },
    creatZimu: function (ele, _objCode) {
        var editString = function () {
            var v = $.trim($(ele).val());
            Nums = parent.makePy(v);
            _objCode.val(Nums);
        };
        $(ele).keyup($.debounce(480, editString));
    },
    ipAddress:function (callback) {
        $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
            if (remote_ip_info.ret == '1') {
                ipAddress={
                    "country":remote_ip_info.country,
                    "province":remote_ip_info.province,
                    "city":remote_ip_info.city,
                    "district":remote_ip_info.district

                };
                if(callback){
                    callback();
                }
            }

        });
    },
    codeFlag: function (doAdmin,doYz,doUser) {
        //判断登陆CODE
        //codeFlag(doAdmin,doUser);
        var coder = $.cookie('bag-code');
        switch (coder) {
            case 'CG':
                codNum = 1;
                break;
            case 'YJDL':
                codNum = 2;
                break;
            case 'EJDL':
                codNum = 3;
                break;
            case 'YZ':
                codNum = 4;
                break;
            case 'JHR':
                codNum = 5;
                break;
            case 'QY':
                codNum = 6;
                break;
            case 'JZG':
                codNum = 6;
                break;
            case 'SJ':
                codNum = 6;
                break;
            case 'JS':
                codNum = 6;
                break;
            case 'LS':
                codNum = 6;
                break;
        }


        if(doUser != undefined){
            if (codNum == 1 || codNum == 2 || codNum == 3) {
                doAdmin();
            } else if(codNum == 4){
                doYz();
            } else {
                doUser();
            }
        }else{
            if (codNum == 1 || codNum == 2 || codNum == 3) {
                doAdmin();
            } else{
                doYz();
            }
        }

    }, getCode: function () {
        var coder = $.cookie('bag-code');
        if(coder==undefined){
            common.loginTimeout();
        }
        switch (coder) {
            case 'CG':
                codNum = 1;
                break;
            case 'YJDL':
                codNum = 2;
                break;
            case 'EJDL':
                codNum = 3;
                break;
            case 'YZ':
                codNum = 4;
                break;
            case 'JHR':
                codNum = 5;
                break;
            case 'QY':
                codNum = 6;
                break;
            case 'JZG':
                codNum = 7;
                break;
            case 'SJ':
                codNum = 8;
                break;
            case 'JS':
                codNum = 9;
                break;
            case 'LS':
                codNum = 10;
                break;
            case 'JGZ':
                codNum = 11;
                break;
            default:
                codNum = 11;
        }
        return codNum;
    },
    creaUeditor:function (callback) {
       ue = UE.getEditor('myEditor');
    },
    baiduMapInit:function (longitude,latitude) {
        //百度地图 init;
       // $('.content').hide();
        map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(116.331398,39.897445),11);
        map.enableScrollWheelZoom(true);
        map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));    // 右下比例尺
        map.setDefaultCursor("Crosshair");//鼠标样式
        map.enableScrollWheelZoom(true);
        //
        map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT}));  //右上角，仅包含平移和缩放按钮

        // 用经纬度设置地图中心点

        if(latitude != undefined&&longitude !=undefined){
            common.theLocation();
        }
        else{
            common.ipAddress();
           var size = new BMap.Size(10, 20);
           map.addControl(new BMap.CityListControl({
                                        anchor:BMap,
                                        offset: size
                                        // //切换城市之间事件
                                        // onChangeBefore: function(){
                                        //    alert('before');
                                        // },
                                        // //切换城市之后事件
                                        // onChangeAfter:function(){
                                        //   alert('after');
                                        // }
                                    }));
        }


        // 添加带有定位的导航控件
  var navigationControl = new BMap.NavigationControl({
    // 靠左上角位置
    anchor: BMAP_ANCHOR_TOP_LEFT,
    // LARGE类型
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    // 启用显示定位
    enableGeolocation: true
  });
  map.addControl(navigationControl);
  // 添加定位控件
  var geolocationControl = new BMap.GeolocationControl();
  geolocationControl.addEventListener("locationSuccess", function(e){
    // 定位成功事件
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    alert("当前定位地址为：" + address);
  });
  geolocationControl.addEventListener("locationError",function(e){
    // 定位失败事件
    alert(e.message);
  });
  map.addControl(geolocationControl);


    },ipAddress:function(){
        function myFun(result){
            cityName = result.name;
            map.setCenter(cityName);
        }
        var myCity = new BMap.LocalCity();
        myCity.get(myFun);

    },
    theLocation:function (longitude,latitude) {
        if(document.getElementById("longitude").value != "" && document.getElementById("latitude").value != ""){
            map.clearOverlays();
            var new_point = new BMap.Point(document.getElementById("longitude").value,document.getElementById("latitude").value);
            var marker = new BMap.Marker(new_point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中
            map.panTo(new_point);

        }
    },
    biaoZhu:function(longitude,latitude){
        common.baiduMapInit(longitude,latitude);
        map.addEventListener("click", showInfo);
        function showInfo(e){
            map.clearOverlays();
            marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));  // 创建标注
            map.addOverlay(marker);
            //获取经纬度
            $('#longitude').val(e.point.lng);
            $('#latitude').val(e.point.lat);
        }
    },
    getYymmd:function () {
        var myDate = new Date(),
            year=myDate.getFullYear(),   //获取完整的年份(4位,1970-????)
            month=myDate.getMonth()+1,       //获取当前月份(0-11,0代表1月)
            day=myDate.getDate();        //获取当前日(1-31)
        var ymd=year+"-"+month+"-"+day;
        return ymd;
    },
    validformSubmit:function (obj,back) {
        if(back){
            var fun=back;
        }
        var info='<div class="info-wrapper"><div class="info">'+
            '<span class="Validform_checktip J-tips"></span>'+
            '<span class="dec"><s class="dec1">◆</s><s class="dec2">◆</s></span>'+
        '</div></div>';
        $(obj).Validform({
            tiptype:function(msg,o,cssctl){
                //msg：提示信息;
                //o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
                //cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;
                if(!o.obj.is("form")){//验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
                    $(o.obj).find('.info-wrapper').remove();
                    $(o.obj).before(info);
                    var objtip=o.obj.parent().find(".Validform_checktip");
                    cssctl(objtip,o.type);
                    objtip.text(msg);


                    infoObj=o.obj.parent().find(".info");
                    if(o.type==2){
                        $('.info-wrapper').remove();
                        infoObj.remove();
                    }else{
                        if(infoObj.is(":visible")){return;}
                        var left=o.obj.offset().left,
                            top=o.obj.offset().top;

                        infoObj.css({
                            right:0,
                            top:-45
                        }).show().animate({
                            top:-31
                        },200);


                        setTimeout(function(){
                            $('.info-wrapper').remove();
                           infoObj.remove();
                        },1000);

                    }

                }
            },
            callback:function () {
               sFlag=true;
               //console.log(sFlag);
            }
        });

      //  return validForms;



    },validformIn:function (eleForm,callback) {
        //common.validformIn(eleForm,callback);
        eleForm.on('submit',function (e) {
            e.preventDefault();
            common.validformSubmit(eleForm);

            if(sFlag&&sFlag==true){
                sFlag=false;
                 $('.layui-layer .layui-layer-btn0').addClass('disabled');
                 $('.layui-layer .layui-layer-btn0').text('加载中...');
                if(callback){
                    callback();
                }
            }else{
                $('.layui-layer .layui-layer-btn0').removeClass('disabled');
                $('.layui-layer .layui-layer-btn0').text('确定');
            }

        });
        eleForm.submit();
    },imgPreview:function(file){
        //图片预览
       if( file != ""&& file != undefined){
           var docObj=file;
           var imgObjPreview=$(file).parent().find('#preview');
       }else{
           var docObj=document.getElementById("fileName");
           var imgObjPreview=document.getElementById("preview");
       }

        if( docObj == undefined){
            return false;
        }



        if(docObj.files &&docObj.files[0])
        {
            //火狐下，直接设img属性
            //imgObjPreview.src = docObj.files[0].getAsDataURL();

            //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
            //imgObjPreview.src = ;
            $(imgObjPreview).attr('src',window.URL.createObjectURL(docObj.files[0]));
           if( upImages.length>0){
              for(var i=0;i<upImages.length;i++){
                if(upImages[i].name==docObj.files[0].name&&upImages[i].size==docObj.files[0].size){
                    upImages.splice(i,1);
                    i--;
                }
              }
           }
            upImages.push(docObj.files[0]);
        }
        else
        {
            //IE下，使用滤镜
            docObj.select();
            var imgSrc = document.selection.createRange().text;
            var localImagId = document.getElementById("localImag");
            //必须设置初始大小
            localImagId.style.width = "150px";
            localImagId.style.height = "180px";
            //图片异常的捕捉，防止用户修改后缀来伪造图片
            try{
                localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
            }
            catch(e)
            {
                alert("您上传的图片格式不正确，请重新选择!");
                $(docObj).val('');
                return false;
            }
                imgObjPreview.style.display = 'none';
                document.selection.empty();
        }
        return true;
    },
    upPhoto:function(ele,callback){
            ele.on('change',function(){
                common.imgPreviewList();
                setTimeout(function(){
                    if(callback){
                        callback();
                    }
                },100);
            })
    },
    imgPreviewList:function(file){
        //头像上传
         $file = document.getElementById("fileName"),img="";
        if($file.files&&$file.files.length>0){
                for(var i=0;i<$file.files.length;i++){
                    if($file.files[i].type != "image/png" && $file.files[i].type != "image/jpeg" && $file.files[i].type != "image/Gif"){
                        alert('请传的图片格式不正确，请重新选择!');
                        $($file).val('');
                        return false;
                    }else{
                        img+='<li><a href="javascript:void(0);"><img src="'+window.URL.createObjectURL($file.files[i])+'" /><i style="display:none">x</i></a></li>';
                    }
                                    };
                $('.upImg ul').html(img);
        }
    },upVideo:function(ele,callback){
            ele.on('change',function(){
                common.videoPreviewList();
                setTimeout(function(){
                    if(callback){
                        callback();
                    }
                },100);
            })
    },videoPreviewList:function(file){
        //视频上传
         $file = document.getElementById("fileName"),img="";
        if($file.files&&$file.files.length>0){
                for(var i=0;i<$file.files.length;i++){
                    if($file.files[i].type != "video/mp4"){
                        alert('上传的视频格式不正确，请重新选择!');
                        $($file).val('');
                        return false;
                    }else{
                    	var maxs = 1048576*2;
                    	if($file.files[i].size>maxs){
							alert('上传的视频大小不超过2M，请重新选择');
							$($file).val('');
							return false;
                    	}
                        upVideos.push($file.files[i]);
                        img+='<li><a href="javascript:void(0);">'+$file.files[i].name+'<i style="display:none">x</i></a></li>';
                    }
                                    }
                $('.upImg ul').html(img);
        }
    },excelData:function(){
        //导入、导出excel
        $('.btnsArea').append(template('dataTpl',{}));
    },bsuExportCsv:function(url){
        //如果页面中没有用于下载iframe，增加iframe到页面中
        if($('#downloadcsv').length<=0)
            $('body').append("<iframe id=\"downloadcsv\" style=\"display:none\"></iframe>");
            $('#downloadcsv').attr('src',url);
    },upExcel:function(ele,callback){
        ele.on('change',function(){
                common.upExcelDo();
                setTimeout(function(){
                    if(callback){
                        callback();
                    }
                },100);
            })
    },
    upExcelDo:function(){
        $file = document.getElementById("fileName");
        if($file.files[0].type != "application/vnd.ms-excel"){
                        alert('上传的excel文件格式不正确，请重新选择!');
                        $($file).val('');
                        return false;
                    }else{
                        var maxs = 1048576*2;
                        if($file.files[0].size>maxs){
                            alert('上传的excel文件大小不超过2M，请重新选择');
                            $($file).val('');
                            return false;
                        }
                        upExcelsFile=$file.files[0];

                    }
    },unComplate:function(){
        $('.J-pwd').on('focus',function(){
            $(this).prop('type','password');
        })
    },getNowFormatDate:function(){
        //获取当前时间 yyyy-MM-dd HH:MM:SS
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    },comparaTime:function(beginTime,endTime){
        // yyyy-MM-dd HH:MM:SS 时间对比
        var beginTimes = beginTime.substring(0, 10).split('-');
        var endTimes = endTime.substring(0, 10).split('-');

        beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
        endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);

      /*  alert(beginTime + "aaa" + endTime);
        alert(Date.parse(endTime));
        alert(Date.parse(beginTime));*/
        var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
        if (a < 0) {
           return false;
        } else if (a > 0) {
           return true;
        } else if (a == 0) {
            return 3
        } else {
            return 'exception'
        }
    }, getStrLength:function(str){
        var len = str.length;
        var reLen = 0;
        for (var i = 0; i < len; i++) {
            if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) {
                // 全角
                reLen += 2;
            } else {
                reLen++;
            }
        }
        return reLen;
    },schoolCurFlag:function(){
        if (schoolCurrent != undefined){
            _dataParams.schoolId = schoolCurrent.schoolId?schoolCurrent.schoolId:schoolCurrent.id
            var _schoolId = schoolCurrent.schoolId?schoolCurrent.schoolId:schoolCurrent.id,
                _schoolName = schoolCurrent.schoolName;
            var callback = function () {
                mmg.load(_dataParams);
            };
            var eleSs = $('.J-search .J-schools'),
                eleCs = $('.J-search .J-classs');
            if (eleSs.length>0&&eleCs.length>0){
                var schoolCur ={
                    "schoolId":_schoolId,
                    "schoolName":_schoolName
                };
                if (classCurrent != undefined){
                    classCur = {
                        "classId":classCurrent.classId?classCurrent.classId:classCurrent.id
                    };
                    common.getSchoolAndClassItem(eleSs,0,eleCs,0,callback,schoolCur,classCur);
                }else{
                    common.getSchoolAndClassItem(eleSs,0,eleCs,0,callback,schoolCur);
                }

            }
            debugger;
            if (eleSs.length>0&&eleCs.length==0){
                debugger;
                var schoolCur ={
                    "schoolId":_schoolId,
                    "schoolName":_schoolName
                };
                var p = {"page":0,"count":0,"isUse":1};
                common.getSchoolItem(eleSs,p,0,callback,schoolCur);
            }
        }
    },schoolCur:function (){
        if(_dataParams != null && _dataParams != undefined){
            common.schoolCurFlag();
        }
    }
};