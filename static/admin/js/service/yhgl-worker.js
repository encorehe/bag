options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $teachers; //宝贝配置信息
        common.powerFlag(powers);

        var items = [{
            title: '头像',
            name: 'icon',
            width: 46,
            align: 'center',
            renderer: function(val, row) {
                var avatar = '';
                if (val == null || val == "") {
                    if (row.gender == null || row.gender == 1) {
                        avatar = "<span class='avatarMan'>男</span>";
                    } else {
                        avatar = "<span class='avatarWomen'>女</span>";
                    }
                } else {
                    var timestamp = Date.parse(new Date());
                        avatar = "<span class='imgPhoto'><img src='http://image.bag61.com/" + val + "?time="+timestamp+"'  width='36px' height='36px' /></span>"

                }
                return avatar;
            }
        }, {
            title: '用户名',
            name: 'telephone',
            width: 120,
            align: 'center'
        }, {
            title: '姓名/英文名',
            name: 'name',
            width: 100,
            align: 'center',
            renderer: function(val, row) {
                var name = "",
                    enname = row.enName,
                    cname = row.name;
                if (cname == '' || cname == null) {
                    if (enname == '' || enname == null) {
                        name = "未输入";
                    }
                }
                if (cname == '' && enname == '') {
                    name = "未输入";
                } else {
                    if (enname == '' || enname == null) {
                        name = cname;

                    } else if (cname == '' || cname == null) {
                        name = enname;
                    } else {
                        name = cname + '/' + enname;
                    }

                }

                return name;

            }
        }, {
            title: '性别',
            name: 'gender',
            width: 30,
            align: 'center',
            renderer: function(val) {
                if (val == null) {
                    val = 1;
                }
                if (val == 1) {
                    sex = "男";
                } else {
                    sex = "女";
                }
                return sex;
            }
        }, {
            title: '角色名',
            name: 'roleName',
            width: 60,
            align: 'center'
        }, {
            title: '状态',
            name: 'isUse',
            width: 30,
            align: 'center',
            renderer: function(val) {
                if (val == null) {
                    val = 1;
                }
                if (val == 1) {
                    state = "<span class='f-blue'>√</span>";
                } else {
                    state = "<span class='f-red'>X</span>";
                }
                return state;
            }
        }, {
            title: '手机',
            name: 'telephone',
            width: 90,
            align: 'center'
        }, {
            title: '门禁卡',
            name: 'rfId',
            width: 100,
            align: 'center'
        }, /*{
            title: '短信发送模式',
            name: 'smsSendMode',
            width: 100,
            align: 'center',
            renderer: function(val) {
                if (val == null) {
                    val = 1;
                }
                if (val == 0) {
                    state = "不收";
                } else
                if (val == 1) {
                    state = "及时发送";
                } else {
                    state = "需要审核";
                }
                return state;
            }
        }, */{
            title: '加入时间',
            name: 'insertDate',
            width: 60,
            align: 'center'
        }, {
            title: '操作',
            width: 120,
            name:'code',
            align: 'center',
            renderer: function(val, row) {
                var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    resetPwdBtns = "<a class='iconfont J-resetPwd' href='javascript:void(0);' title='重置密码'>&#xe600;</a>",
                    delBtns = '';
                delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>";
                delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>",
                fenbanBtn="<a class='iconfont J-classAdd' data-id='1' href='javascript:void(0);' title='分班'>&#xe63d;</a>";
                btnsHtml = ckBtns;



                    if(editFlagS){
                        if (row.isUse == 0) {
                            btnsHtml += delBtnsStart;
                        } else {
                            btnsHtml += delBtnsEnd;
                        }
                        btnsHtml+=editBtns+resetPwdBtns+fenbanBtn;
                    }

                    if(delFlag){
                        btnsHtml+=delBtns;
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
            var huamaiItem={
                title: '华麦账户名',
                name: 'accountId',
                width: 90,
                align: 'center',
                renderer:function (val,row) {
                    return "teacher"+val;
                }
            };
            items.splice(3,0,huamaiItem);

            common.excelData();
            //导出数据
            $('.J-daochu').on('click',function(e){
                e.preventDefault();
                var th = $(this);
                th.addClass('disabled');
                var title ="第一步：选择学校",
                    area = ["500px","180px"],
                    content = "<form class='J-form-daochu'><span class='J-school'></span></form>",
                    successBack = function(){
                        var eleS = $('.layui-layer .J-school'),
                            p = {'page':0,'count':0},
                            emptyS = 1;
                        common.getSchoolItem(eleS,p,emptyS);
                    },
                    yesBack = function(){
                        var eleForm = $('.J-form-daochu'),
                            _schoolId = eleForm.find('input[name="schoolId"]').val();
                        datas = {
                            "schoolId":_schoolId,
                            "page":0,
                            "count":0
                        };

                        var url = _con.excel.daochuUrl,
                            successBack = function(){
                                if(ajaxData.success&&ajaxData.data != "" && ajaxData.data != null){
                                    // window.open(ajaxData.data);
                                    common.bsuExportCsv(ajaxData.data);
                                }
                            },
                            completeBack = function(){};
                        common.ajaxFun(url,datas,null, successBack, completeBack);

                    },
                    cancelBack = function(){
                        th.removeClass('disabled');
                    };
                common.layerConfirm(title,area,content,successBack, yesBack,cancelBack);
            });
            //导入数据
            $('.J-daoru').on('click',function(e){
                    e.preventDefault();
                    var th = $(this);
                    th.addClass('disabled');
                    var title ="第一步：选择导入信息",
                        area = ["500px","380px"],
                        content = template('tplDaoru',{}),
                        successBack = function(){
                            var eleS = $('.layui-layer .J-school'),
                                emptyS = 1,
                                p ={'page':0,'count':0};
                            common.getSchoolItem(eleS,p,emptyS);

                        },
                        yesBack = function(){

                            var eleForm = $('#index_form');
                            var sId = eleForm.find('input[name="schoolId"]').val(),
                                type = eleForm.find('input[name="type"]').val(),
                                isRepeat = eleForm.find('select[name="isRepeat"]').val();
                            var data = { "schoolId": sId, "type":type,"isRepeat":isRepeat };
                            funSubmit(data);
                        },
                        cancelBack = function(){
                            th.removeClass('disabled');
                        };
                    common.layerConfirm(title,area,content,successBack, yesBack,cancelBack);
                });


        }

        $('.J-moban').on('click',function(){
            common.bsuExportCsv('word/teacherMoban.xls');
        });


        var funSubmit = function(data){
            var index = layer.load(1, {
                shade: [0.1, '#fff'] //0.1透明度的背景
            });
            $('.J-daoru').removeClass('disabled');

            $("#index_form").ajaxSubmit({
                type: "post",
                url: _con.excel.daoruUrl,
                success: function (data) {
                    var data = JSON.parse(data);
                    if(data.success == false){
                       if (data.data.excelRepeat != undefined){
                           var msg = "excel里面存在重复数据，导入失败!";
                           jAlert(msg, '贝安港提示',function() {
                               layer.closeAll('loading');
                               return false;
                           })
                       }else{
                           var teacherNum = data.data.teacher.length,teacherText =(data.data.teacher).join(',') ;
                           var cardNum = data.data.rfId.length,cardText =(data.data.rfId).join(',') ;
                           var msg = "文件导入失败,存在重复数据!<br>(&nbsp;"+teacherNum+"个教职工:"+teacherText+"&nbsp;"+cardNum+"张门禁卡:"+cardText+")";
                           jAlert(msg, '贝安港提示',function() {
                               layer.closeAll('loading');
                           })
                       }

                    }else{
                        common.iframeLayerMsg("文件导入成功!!", 1, function() {
                            layer.closeAll();
                            mmg.load(_dataParams);
                        });
                    }

                },
                error: function (msg) {
                    jAlert("文件上传失败，请联系管理员!", '贝安港提示',function() {
                        layer.closeAll('loading');
                    })
                }
            });
            return false;
        };

        if(coders == 4){
            common.excelData();
          //  $('.J-daoru').remove();
            //导出数据
            $('.J-daochu').on('click',function(e){
                e.preventDefault();
                var th = $(this);
                th.addClass('disabled');
                datas = {
                    "page":0,
                    "count":0
                };

                var url = _con.excel.daochuUrl,
                    successBack = function(){
                        if(ajaxData.success&&ajaxData.data != "" && ajaxData.data != null){
                            // window.open(ajaxData.data);
                            common.bsuExportCsv(ajaxData.data);
                        }
                    },
                    completeBack = function(){
                        th.removeClass('disabled');
                    };
                common.ajaxFun(url,datas,null, successBack, completeBack);
            });
            //导入数据
            $('.J-daoru').on('click',function(e){
                e.preventDefault();
                var th = $(this);
                th.addClass('disabled');
                var title ="第一步：选择导入信息",
                    area = ["500px","380px"],
                    content = template('tplDaoru',{}),
                    successBack = function(){
                        var eleS = $('.layui-layer .J-school'),
                            emptyS = 1,
                            p ={'page':0,'count':0};
                        common.getSchoolItem(eleS,p,emptyS);

                    },
                    yesBack = function(){

                        var eleForm = $('#index_form');
                        var sId = eleForm.find('input[name="schoolId"]').val(),
                            type = eleForm.find('input[name="type"]').val(),
                            isRepeat = eleForm.find('select[name="isRepeat"]').val();
                        var data = { "schoolId": sId, "type":type,"isRepeat":isRepeat };
                        funSubmit(data);
                    },
                    cancelBack = function(){
                        th.removeClass('disabled');
                    };
                common.layerConfirm(title,area,content,successBack, yesBack,cancelBack);
            });
        }

        var addBox= function() {
            var doAdmin=function () {
                var eleS=$('.J-school'),
                    eleR=$('.J-gangwei'),
                    emptyS=1,
                    p={"page":0,"count":0},
                    fun=function(){

                };
                if(schoolCurrent==undefined){
                    common.getSchoolAndRoleItem(eleS,p,emptyS,eleR,fun);
                }else{
                    var sId = schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId;
                    var schoolCur = {"schoolId":sId,'schoolName':schoolCurrent.schoolName};
                    common.getSchoolAndRoleItem(eleS,p,emptyS,eleR,fun,schoolCur);
                    //eleS,p,emptyS,eleR,fun,schoolCur,Rolecur
                }

            };
            var doUser=function () {
                var ele=$('.layui-layer .J-gangwei'),p={},
                    eleS=$('.layui-layer .J-school');
                eleS.text($('.J-sc').text());
                common.getRoles(ele,p);
            };
            common.codeFlag(doAdmin,doUser);
        };
        var edtiBox = function() {
            var eleS=$('.J-school'),
                eleC=$('.J-class'),
                eleR=$('.J-gangwei');
            var doAdmin=function () {
                var ele=$('.layui-layer .J-gangwei'),
                    p={
                        "schoolId":datasCur.schoolId
                    },
                    f=function () {

                    },
                    cur={
                        "roleId":datasCur.roleId,
                        "roleName":datasCur.roleName
                    };
                eleS=$('.layui-layer .J-school');
                eleS.text(datasCur.schoolName);
                common.getRoles(ele,p,f,cur);
            };
            var doUser=function () {
                var ele=$('.layui-layer .J-gangwei'),
                    p={},
                    f=function () {

                    },
                    cur={
                        "roleId":datasCur.roleId,
                        "roleName":datasCur.roleName
                    };
                eleS=$('.layui-layer .J-school');
                eleS.text($('.J-sc').text());
                common.getRoles(ele,p,f,cur);
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
                "resetPwdUrl":_con.resetPwdUrl.url
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
                options[0].params = _dataParams;
                mainCont.getList(items,options);
            }else{
                common.creatSearch();
                mmg.load(_dataParams);
            }
            //表格行选中
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
            $('.J-schools').remove();
            commonFun();
        };
        common.codeFlag(doAdmin,doUser);
    },
    mmgSelects:function () {
        //表格选中行
        mmg.on('cellSelected',function(e,item,rowIndex,colIndex){
            datasCur=item;
            if ($(e.target).is('.J-classAdd')) {
                e.stopPropagation(); //分班
                datasCur = item;
                mmg.select(rowIndex);
                var teacherId=datasCur.id;

                //班级老师信息
                area = ['715px', '50%'];
                title= item.schoolName+"-"+"-"+item.name+"的信息";
                content = template('tplCard',item);
                successBack = function() {
                    //获取班级老师
                    $('.layui-layer-btn').remove();
                    bag.getTeacherClass(teacherId);
                };

                common.layerConfirm(title, area, content, successBack);
            }
        })

    },
    getTeacherClass:function (ids) {
        //班级老师
        var id = $('#mmgJhr'),
            pageId = $('#paginatorJhr'),
            it = [{
                title: '教师姓名',
                name: 'teachersName',
                width: 120,
                align: 'center'
            },
                {
                    title: '代课班级',
                    name: 'className',
                    width: 46,
                    align: 'center'
                },
                {
                    title: '操作',
                    width: 100,
                    align: 'center',
                    renderer: function(val, row) {
                        var editBtns = "<a style='display:none;' class='iconfont J-editCard' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                            delBtns = "<a class='iconfont J-delCard' href='javascript:void(0);' title='删除'>&#xe617;</a>";
                        var btnsHtml = editBtns + delBtns;
                        return "<span class='table-action'>" + btnsHtml + "</span>";
                    }
                }];
        var options = {
            "indexCol": true,
            "checkCol": true,
            "it": it,
            /*"params": {
             teacherId: ids
             },*/
            "url": $teacherClasses.list.url+"?teacherId="+ids
        };

        var callback = function(e, item, rowIndex, colIndex) {
            if ($(e.target).is('.J-editCard')) {
                //监护人编辑;
                var schoolId=datasCur.schoolId;
                var url=$classes.list.url,datas={
                    "schoolId":schoolId
                };
                var callback=function () {
                    var jhr=ajaxDatas.list;
                    var editLayer = layer.open({
                        type: 1,
                        closeBtn: 2,
                        content: template('tplCardForm', {teacherId:datasCur.id,id:item.id}),
                        btn: ["确定"],
                        area: ["700px", "350px"],
                        success: function() {
                            var fun=function(){
                                var mjk = $('.J-Form');
                                common.validformSubmit(mjk);
                            };
                            var emptyC=1;
                            var p={"schoolId":schoolId};
                            var ele=$('.layui-layer .J-class');
                            common.getClass(ele,emptyC,p,fun);
                        },
                        yes: function() {
                            var jhrAdd = $('.J-Form');
                            var callback = function() {
                                var fields = jhrAdd.serialize();
                                var beforBack = function() {},
                                    successBacks = function() {
                                        if (ajaxData.success == true) {
                                            layer.close(editLayer);
                                            var message = "修改成功",
                                                title = "贝安港提示",
                                                callback = function() {
                                                    tempMmg.load();
                                                };
                                            jAlert(message, title, callback);
                                        }
                                    };
                                common.ajaxFunIframe($teacherClasses.edit.url, fields, beforBack, successBacks);
                            };
                            common.validformIn(jhrAdd, callback);
                        }
                    })
                };
                common.ajaxSubmitV(url,datas,callback);

            }
            if ($(e.target).is('.J-delCard')) {
                //删除监护人
                userData = {
                    "id": item.id,
                    "accountId":item.accountId,
                    "classId":item.classId,
                    "roleId":item.roleId
                };
                //监护人删除
                jConfirm('是否解除此老师与班级的关系?', '贝安港提示',
                    function() {
                        var beforBack = function() {},
                            successBacks = function() {
                                if (ajaxData.success == true) {
                                    var message = "删除成功",
                                        title = "贝安港提示",
                                        callback = function() {
                                            tempMmg.load();
                                        };
                                    jAlert(message, title, callback);
                                }
                            };
                        common.ajaxFunIframe($teacherClasses.del.url, userData, beforBack, successBacks);
                    });
            }
        };
        var loadCallback = function(e, data) {};

        bag.creatMmg(id,options,pageId,callback,loadCallback);

        //教职工分班
        $('.J-cardBtn').unbind('click').on('click',function (e) {
            e.preventDefault();
            var schoolId=datasCur.schoolId;
            var url=$classes.list.url,datas={
                "schoolId":schoolId
            };
            var addLayers = layer.open({
                type: 1,
                title:"分配班级",
                closeBtn: 2,
                content: template('tplCardForm', {teacherId:datasCur.id}),
                btn: ["下一步"],
                area: ["420px", "250px"],
                success: function() {
                    var fun=function(){
                        var mjk = $('.J-Form');
                        common.validformSubmit(mjk);
                    };
                    var p={"schoolId":schoolId,"page":0,"count":0,'isUse':1},emptyC=1;
                    var ele=$('.layui-layer .J-class');
                    common.getClass(ele,emptyC,p,fun);

                },
                yes: function() {
                    var mjk = $('.J-Form');
                    var callback=function () {
                        var fields = mjk.serialize()+"&accountId="+datasCur.accountId;
                        var beforBack = function() {},
                            successBacks = function() {
                                if (ajaxData.success == true) {
                                    var message = "添加成功",
                                        title = "贝安港提示",
                                        callback = function() {
                                            layer.close(addLayers);
                                            tempMmg.load();
                                        };
                                    jAlert(message, title, callback);
                                }
                            };
                        common.ajaxFunIframe($teacherClasses.add.url,fields, beforBack, successBacks);
                    };
                    common.validformIn(mjk, callback);
                }
            })


        });


    },
    creatMmg: function(id, options, pageId, callback, loadCallback) {
        tempMmg = $(id).mmGrid({
            multiSelect: true,
            indexCol: options.indexCol,
            checkCol: options.checkCol,
            indexColWidth: 25,
            cols: options.it,
            root: "list",
            width: 'auto',
            height: 'auto',
            fullWidthRows: true,
            autoLoad: true,
            noDataText: "当前查询未获取到任何信息",
            url: options.url,
            items: options.it,
            cache: false,
            //sortName: 'name',
            sortStatus: 'asc',
            nowrap: false,
            method: 'post',
            showBackboard: false,
            params: options.params,
            plugins: [$(pageId).mmPaginator({
                style: 'plain',
                totalCountName: 'totalCount',
                page: 1,
                pageParamName: 'page',
                limitParamName: 'count',
                limitLabel: '每页{0}条',
                totalCountLabel: '共<span>{0}</span>条记录',
                limit: options.it,
                limitList: [20, 30, 40, 50]
            })]
        });
        tempMmg.on('cellSelected',
            function(e, item, rowIndex, colIndex) {
                if (callback) {
                    callback(e, item, rowIndex, colIndex);
                }
            }).on('loadSuccess',
            function(e, data) {
                if (loadCallback) {
                    loadCallback(e, data);
                }
            });
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
        $('#gender').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();