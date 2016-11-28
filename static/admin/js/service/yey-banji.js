options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $classes; //班级配置信息

        common.powerFlag(powers);

        //列
        var items = [
                { title:'班集体照', name:'images' ,width:100, align:'center',renderer:function(val,row){
                    if( val != null ){
                       var timestamp = Date.parse(new Date());
                        avatar = "<span class='imgPhoto'><img src='http://image.bag61.com/" + val + "?time="+timestamp+"'  width='36px' height='36px' /></span>"
                    }
                    else{
                        avatar = "未上传";
                    }
                    return avatar;
                } },
                { title:'年级', name:'grade' ,width:120, align:'center'},
                { title:'班级名', name:'className' ,width:120, align:'center'},
                { title:'教职工人数',name:'teacherCount',width:50,align:'center'},
                { title:'宝贝数',name:'kidCount',width:50,align:'center'},
                { title:'描叙', name:'brief' ,width:120, align:'center'},
                { title:'是否固定名称', name:'isFixName' ,width:100, align:'center',renderer: function(val){
                    if(val==null){
                        val=1;
                    }
                     if(val==1){
                        state="<span class='f-blue'>√</span>";
                    }
                    else{
                        state="<span class='f-red'>X</span>";
                    }
                    return state;
                }},
                { title:'创建时间', name:'insertDate' ,width:100, align:'center',hidden: true },
                { title:'状态', name:'isUse' ,width:30, align:'center',renderer: function(val){
                    if(val==null){
                        val=1;
                    }
                    if(val==1){
                        state="<span class='f-blue'>√</span>";
                    }
                    else{
                        state="<span class='f-red'>X</span>";
                    }
                    return state;
                }},
            { title:'操作',width:80, align:'center', renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns='';
                delBtnsEnd="<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>";
                delBtnsStart="<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>",
                jsBtn = "<a class='iconfont J-workers' data-id='1' href='javascript:void(0);' title='教职工'>&#xe615;</a>";
                btnsHtml=ckBtns;
                var code = common.getCode();
                if (code == 1 || code == 2 || code == 3 || code == 4 ){
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
                }else{
                    $('.btnsArea').remove();
                }
                
                return "<span class='table-action'>"+btnsHtml+jsBtn+"</span>";
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
            items.splice(1,0,schoolItem);
        }
        var addBox= function() {
            common.upPhoto($('#fileName'));
            var doAdmin=function () {
                var ele=$('.J-schools');
                var em=1,p={page:0,count:0};
                if(schoolCurrent==undefined){
                    common.getSchoolItem(ele,p,em)
                }else{
                    var sId = schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId;
                    var cur = {"schoolId":sId,'schoolName':schoolCurrent.schoolName},cab = function () {
                    };
                    common.getSchoolItem(ele,p,em,cab,cur);
                }
            };
            var doUser=function () {
                $('.J-schools').text($('.J-sc').text());
            };
            common.codeFlag(doAdmin, doUser);
        };
        var edtiBox = function() {
            common.upPhoto($('#fileName'));
            var timestamp = Date.parse(new Date()),str="";
            var ad=datasCur.images;
                str="<li><a href='javascript:void(0);'><img width='60px' layer-src='http://image.bag61.com/"+ad+"?time="+timestamp+"'  src='http://image.bag61.com/"+ad+"?time="+timestamp+"'/></a></li>";
            $('.J-img').html(str);
             layer.photos({
                 photos: '.J-img'
             });
            var eleS=$('.J-schools');
            var doAdmin=function () {
                var emptyS=1,
                    p={page:0,count:0},
                    schoolCur={
                        "schoolName":datasCur.schoolName,
                        "schoolId":datasCur.schoolId
                    },
                    callback=function(){};
                 common.getSchoolItem(eleS,p,emptyS,callback,schoolCur);
            };
            var doUser=function () {
                eleS.text($.cookie("bag-school"));
            };
            common.codeFlag(doAdmin,doUser);


        };
        var chkBox = function() {
              var timestamp = Date.parse(new Date()),str="";
                var ad=datasCur.images;
                    str="<li><a href='javascript:void(0);'><img width='60px' layer-src='http://image.bag61.com/"+ad+"?time="+timestamp+"'  src='http://image.bag61.com/"+ad+"?time="+timestamp+"'/></a></li>";
                $('.J-img').html(str);
                 layer.photos({
                     photos: '.J-img'
                 });
        };

        var renderInfo=function () {
            var ele=$('#proId').find("option:selected");
            var oldPrice=ele.data('price'),brief=ele.data('brief');
            $('.J-oldPrice').text(oldPrice);
            $('.J-editor').html(brief);
        };



        var resetFunAdd=function(){
            var fm=$('.J-addForm');
            var callback = function(){
                var fields = fm.serializeArray();
                var successBacks = function() {
                    if (ajaxData.success == true) {
                        var kidId=ajaxData.data.id;
                        $.ajax({
                            url: $classImg.url,
                            data:{"fileName":"class_"+kidId},
                            type: 'post',
                            cache: false,
                            dataType: 'json',
                            success: function (data) {
                                if (data.success == true) {
                                    if($("#fileName").prop('files')[0] != undefined){
                                        Q.AddParams('x:id',kidId);
                                        // Q.AddParams('key',"kid_"+kidId);
                                        Q.addEvent("putFinished", function(fsize, res, taking) {
                                            common.iframeLayerMsg("添加成功!", 1, function() {
                                                common.schoolCur();
                                            });
                                        });
                                        Q.addEvent("putFailure", function(err) {
                                            alert(err);
                                        });
                                        Q.SetToken(data.qiniuTokenStr);

                                        Q.Upload($("#fileName").prop('files')[0],"class_"+kidId);
                                    }else{
                                        common.iframeLayerMsg("添加成功!", 1, function() {
                                            common.schoolCur();
                                        });
                                    }
                                }
                            }
                        });

                    }
                };
                common.ajaxFunIframe(addUrl, fields,null, successBacks);
            };
            common.validformIn(fm,callback);
        };

        var resetFunEdit=function(){
                var fm=$('.J-editForm');
                var callback = function(){
                    var fields = fm.serializeArray();
                    var successBacks = function() {
                            if (ajaxData.success == true) {
                                var kidId=datasCur.id;
                                if($("#fileName").prop('files')[0] != undefined){
                                    $.ajax({
                                        url: $classImg.url,
                                        data:{"fileName":"class_"+kidId},
                                        type: 'post',
                                        cache: false,
                                        dataType: 'json',
                                        success: function (data) {
                                            if (data.success == true) {
                                                Q.AddParams('x:id',kidId);
                                                // Q.AddParams('key',"kid_"+kidId);
                                                Q.addEvent("putFinished", function(fsize, res, taking) {
                                                    common.iframeLayerMsg("修改成功!", 1, function() {
                                                        common.schoolCur();
                                                    });
                                                });
                                                Q.addEvent("putFailure", function(err) {
                                                    alert(err);
                                                });
                                                Q.SetToken(data.qiniuTokenStr);

                                                Q.Upload($("#fileName").prop('files')[0],"class_"+kidId);
                                            }
                                        }
                                    });
                                }else{
                                    common.iframeLayerMsg("修改成功!", 1, function() {
                                        common.schoolCur();
                                    });
                                }


                            }
                        };
                    common.ajaxFunIframe(editUrl, fields,null, successBacks);
                };
            common.validformIn(fm,callback);
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
                "add":resetFunAdd,
                "edit":resetFunEdit
            }
        });

        bag._do(items,options);

    },
    mmgSelects: function() {
        //表格选中行
        mmg.on('cellSelected',
            function(e, item, rowIndex, colIndex) {
                datasCur = item;
                var title,area,content,successBack;
                if ($(e.target).is('.J-workers')) {
                    //弹出教职工
                    area = ['915px', '350px'];
                    title= item.schoolName+"-"+item.className+"-"+"教职工信息";
                    content = template('tplJzg',{});
                    successBack = function() {
                        //获取教职工列表
                        bag.getJzgList(datasCur.id);
                    };
                    common.layerConfirm(title, area, content, successBack);
                }
            })
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
    },getJzgList: function(ids) {
        $('.layui-layer-btn').remove();
        //1、弹出教职工界面
        var id = $('#mmgJhr'),
            pageId = $('#paginatorJhr'),
            it =[{
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
                        avatar = "<span class='imgPhoto'><img src='" + val + "'  width='36px' height='36px' /></span>"
                    }
                    return avatar;
                }
            }, {
                title: '用户名',
                name: 'teachersName',
                width: 120,
                align: 'center'
            }, {
                title: '岗位',
                name: 'roleName',
                width: 120,
                align: 'center'
            },{
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
            },{
                title: '手机',
                name: 'telephone',
                width: 90,
                align: 'center'
            }];
        var options = {
            "indexCol": true,
            "checkCol": false,
            "it": it,
            // "params": {
            //     "classId":ids
            // },
            "url": $teacherClasses.list.url+"?classId="+ids
        };
        var callback = function(e, item, rowIndex, colIndex) {

        };
        var loadCallback = function(e, data) {

        };
        bag.creatMmg(id, options, pageId, callback, loadCallback);
    },
    _do:function (items,options) {

        var commonFun=function () {
            bag.searchRest();
            common.creatSearch();
            if(mmg==undefined || mmg == null){
                mainCont.getList(items,options);
            }
            else{
                mmg.load(_dataParams);
            }

            if(mmg){
                bag.mmgSelects();
            }
        };

        var doAdmin=function () {
            var ele=$('.J-schools');
            var em=0,p={page:0,count:0};
            if(schoolCurrent == undefined){
                common.getSchoolItem(ele,p,em,commonFun);
            }else{
                var cur={
                    "schoolId":schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId,
                    "schoolName":schoolCurrent.schoolName
                };
                common.getSchoolItem(ele,p,em,commonFun,cur);
            }

        };
        var doUser=function () {
            commonFun();
        };
        common.codeFlag(doAdmin, doUser);
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keywords').val('');
    },
    loadParam:function () {
        var code=common.getCode();
        if(code=="CG" || code=="DL" || code=="EJDL"){
            parama={
                'isUse':$('#isUse').val(),
                'schoolId':$('.J-school select').val(),
                'keywords':$('#keywords').val(),
                'page':1
            };
            for(var i in parama){
                if(parama[i]=="" || parama[i]==null || parama[i]==undefined ){
                    delete parama[i];
                }
            };
            _dataParams=parama;
        }
        else{
            parama={
                'isUse':$('#isUse').val(),
                'keyWords':$('#keyWords').val()
            };for(var i in parama){
                if(parama[i]=="" || parama[i]==null || parama[i]==undefined ){
                    delete parama[i];
                }
            }

            _dataParams=parama;
        }

        return parama;

    }
};


//执行
bag._init();