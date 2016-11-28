options = [];
var bag = {
    _init: function() {
        var powers = temD[0].power,
        //权限
            _con = $kid; //宝贝配置信息
        common.powerFlag(powers);
        common.excelData();
        var items = [{
            title: '宝贝基本信息',
            align: 'center',
            cols: [{
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

                   // http://image.bag61.com/{{ val.filePath }}
                }
            },
                {
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
                },
                {
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
                }]
        },
            {
                title: '入园信息',
                align: 'center',
                cols: [{
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
                },
                    {
                        title: '班级',
                        name: 'className',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '贝贝号',
                        name: 'kidNO',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '门禁卡数量',
                        name: 'rfIdCount',
                        width: 40,
                        align: 'center'
                    },
                    {
                        title: '线路-站点',
                        name: 'busDetail',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        name: 'insertDate',
                        width: 90,
                        align: 'center'
                    },
                    {
                        title: '在线视频',
                        name: 'hasOnlineVideo',
                        width: 100,
                        align: 'center',
                        hidden: true
                    }]
            },
            {
                title: '操作',
                width: 100,
                align: 'center',
                renderer: function(val, row) {
                    var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                        editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                        delBtns = '',
                        delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>",
                        delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>",
                        linkBtn = "<a class='iconfont J-addPer' data-id='1' href='javascript:void(0);' title='监护人信息'>&#xe639;</a>",
                    cardBtn = "<a class='iconfont J-card' data-id='1' href='javascript:void(0);' title='门禁卡信息'>&#xe61d;</a>";
                    btnsHtml = ckBtns;
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
                    return "<span class='table-action'>" + btnsHtml + linkBtn + cardBtn + "</span>";
                }
            }];
        var coders = common.getCode();
        if (coders == 1 || coders == 2 || coders == 3) {
            var schoolItem = {
                title: '学校',
                name: 'schoolName',
                width: 90,
                align: 'center'
            };
            items[0].cols.push(schoolItem);

                //导出数据
                $('.J-daochu').on('click',function(e){
                    e.preventDefault();
                    var th = $(this);
                    th.addClass('disabled');
                    var title ="第一步：选择学校",
                        area = ["500px","180px"],
                        content = template('tplDaochu',{}),
                        successBack = function(){
                            var eleS = $('.layui-layer .J-school'),
                                emptyS = 1,
                                emptyC = 0,
                                eleC = $('.layui-layer .J-class');
                            common.getSchoolAndClassItem(eleS, emptyS,eleC,emptyC);
                        },
                        yesBack = function(){
                            var eleForm = $('.J-form-daochu'),
                                _schoolId = eleForm.find('input[name="schoolId"]').val(),
                                _classId = eleForm.find('input[name="classId"]').val();
                            datas = {
                                "schoolId":_schoolId,
                                "classId":_classId,
                                "page":0,
                                "count":0
                            };

                            var url = _con.excel.daochuUrl,
                                successBack = function(){
                                    if(ajaxData.success&&ajaxData.data != "" && ajaxData.data != null){
                                       // window.open(ajaxData.data);
                                        common.iframeLayerMsg("数据导出成功!", 1, function() {
                                            layer.closeAll();
                                            $('.J-daochu').removeClass('disabled');
                                            common.bsuExportCsv(ajaxData.data);
                                        });
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
            common.bsuExportCsv('word/kidMoban.xls');
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
                        if(data.data == undefined){
                            var msg = data.msg;
                            jAlert(msg, '贝安港提示',function() {
                                layer.closeAll('loading');
                                return false;
                            })
                        }
                        if (data.data.excelRepeat != undefined){
                            var msg = "excel里面存在重复数据，导入失败!";
                            jAlert(msg, '贝安港提示',function() {
                                layer.closeAll('loading');
                                return false;
                            })
                        }else{
                            var cardNum = data.data.rfId.length,cardText =(data.data.rfId).join(',') ;
                            var kidNum = data.data.kid.length,kidText = (data.data.kid).join(',');
                            if(cardNum<50&&kidNum<10){
                                var msg = "文件导入失败,存在重复数据!<br>(&nbsp;"+cardNum+"个门禁卡号:"+cardText+"&nbsp;)<br>("+kidNum+"个宝贝:"+kidText+")";
                            }else{
                                var kidData = data.data.kid,
                                    kidLength;
                                if(kidData.lenth>20){
                                    kidLength = 20;
                                }else{
                                    kidLength = kidData.length;
                                }



                                var strKid=""
                                for(var i=0;i<kidLength;i++){
                                    strKid+=kidData[i]+"、"
                                }
                                if(kidData.length>20){
                                    var msg = "文件导入失败,存在重复数据!<br>(&nbsp;"+cardNum+"个门禁卡号:"+cardText+")<br>("+kidNum+"个宝贝："+strKid+"...)";
                                }else{
                                    var msg = "文件导入失败,存在重复数据!<br>(&nbsp;"+cardNum+"个门禁卡号:"+cardText+")<br>("+kidNum+"个宝贝："+kidText+")";
                                }

                            }
                        }



                        jAlert(msg, '贝安港提示',function() {
                            layer.closeAll('loading');
                        })
                    }else{
                        common.iframeLayerMsg("文件导入成功!!", 1, function() {
                            layer.closeAll();
                            $('.J-daoru').removeClass('disabled');
                            mmg.load(_dataParams);
                        });
                    }

                },
                error: function (msg) {
                    jAlert("文件上传失败，请联系管理员!", '贝安港提示',function() {
                        layer.closeAll();
                        $('.J-daoru').removeClass('disabled');
                    })
                }
            });
            return false;
        };

        if(coders == 4){
            //导出数据
           /* $('.J-daochu').on('click',function(e){
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
            });*/
            $('.J-daochu').on('click',function(e){
                    e.preventDefault();
                    var th = $(this);
                    th.addClass('disabled');
                    var title ="第一步：选择学校",
                        area = ["500px","180px"],
                        content = template('tplDaochu',{}),
                        successBack = function(){
                            var eleS = $('.layui-layer .J-school'),
                                emptyS = 1,
                                emptyC = 0,
                                eleC = $('.layui-layer .J-class');
                            common.getSchoolAndClassItem(eleS, emptyS,eleC,emptyC);
                        },
                        yesBack = function(){
                            var eleForm = $('.J-form-daochu'),
                                _schoolId = eleForm.find('input[name="schoolId"]').val(),
                                _classId = eleForm.find('input[name="classId"]').val();
                            datas = {
                                "schoolId":_schoolId,
                                "classId":_classId,
                                "page":0,
                                "count":0
                            };

                            var url = _con.excel.daochuUrl,
                                successBack = function(){
                                    if(ajaxData.success&&ajaxData.data != "" && ajaxData.data != null){
                                       // window.open(ajaxData.data);
                                        common.iframeLayerMsg("数据导出成功!", 1, function() {
                                            layer.closeAll();
                                            $('.J-daochu').removeClass('disabled');
                                            common.bsuExportCsv(ajaxData.data);
                                        });
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

        var resetFunAdd=function(){
            var fm=$('.J-addForm');
               addFields = fm.serializeArray();
            var callback=function(){
                var successBacks = function() {
                    if (ajaxData.success == true) {
                         if($("#fileName").prop('files')[0]==undefined){
                             common.iframeLayerMsg("宝贝添加成功!", 1, function() {
                                 common.schoolCur();
                                        });
                         }
                            else{
                            var kidId=ajaxData.data.id;
                            loadingAd = layer.load(1, {
                                shade: [0.1, '#fff'] //0.1透明度的背景
                            });
                            $.ajax({
                                url: $kidIcon.url,
                                data:{"fileName":"kid_"+kidId},
                                type: 'post',
                                cache: false,
                                dataType: 'json',
                                success: function (data) {
                                    if (data.success == true) {
                                        Q.AddParams('x:id',kidId);
                                       // Q.AddParams('key',"kid_"+kidId);
                                        Q.addEvent("putFinished", function(fsize, res, taking) {
                                                        addFields.push({"name":"id","value":kidId});
                                                        var $file = document.getElementById("fileName");
                                                        var $fileType=$file.files[i].type,types="";
                                                        switch($fileType){
                                                            case 'image/png':
                                                                types=".png";
                                                                break;
                                                            case 'image/jpeg':
                                                                types=".jpeg";
                                                                break;
                                                             case 'image/Gif':
                                                                types=".gif";
                                                                break;       
                                                        }
                                                        addFields.push({"name":"icon","value":"kid_"+kidId+types});
                                                        var successBacks=function(){

                                                                common.iframeLayerMsg("宝贝添加成功!", 1, function() {
                                                                    common.schoolCur();
                                                                        });
                                                             };

                                            var checkBack = function(){
                                                common.btnReset();
                                            };
                                            common.ajaxFunIframe(editUrl,addFields,null,successBacks,null,null,checkBack);
                                        });
                                        Q.addEvent("putFailure", function(err) {
                                            alert(err);
                                        });
                                        Q.SetToken(data.qiniuTokenStr);

                                        Q.Upload($("#fileName").prop('files')[0],"kid_"+kidId);
                                    }
                                }
                            });
                         }

                    }
                },checkBack = function(){
                    common.btnReset();
                };
                common.ajaxFunIframe(addUrl,addFields,null,successBacks,null,null,checkBack);
            };
            common.validformIn(fm,callback);

        };

        var resetFunEdit=function(){
            var fm=$('.J-editForm');
             editFields = fm.serializeArray();
            var callback = function(){
                var successBacks = function() {
                    if (ajaxData.success == true) {
                        var kidId=datasCur.id;
                        $.ajax({
                            url: $kidIcon.url,
                            data:{"fileName":"kid_"+kidId},
                            type: 'post',
                            cache: false,
                            dataType: 'json',
                            success: function (data) {
                                if (ajaxData.success == true) {
                                    if($("#fileName").prop('files')[0]==undefined){
                                        common.iframeLayerMsg("宝贝信息修改成功!", 1, function() {
                                            common.schoolCur();
                                        });
                                    }
                                    else{
                                         loadingAd = layer.load(1, {
                                            shade: [0.1, '#fff'] //0.1透明度的背景
                                        });
                                        var kidId=datasCur.id;
                                        $.ajax({
                                            url: $kidIcon.url,
                                            data:{"fileName":"kid_"+kidId},
                                            type: 'post',
                                            cache: false,
                                            dataType: 'json',
                                            success: function (data) {
                                                if (data.success == true) {
                                                    Q.AddParams('x:id',kidId);
                                                    // Q.AddParams('key',"kid_"+kidId);
                                                    Q.addEvent("putFinished", function(fsize, res, taking) {
                                                        var $file = document.getElementById("fileName");
                                                        var $fileType=$file.files[0].type,types="";
                                                        switch($fileType){
                                                            case 'image/png':
                                                                types=".png";
                                                                break;
                                                            case 'image/jpeg':
                                                                types=".jpeg";
                                                                break;
                                                             case 'image/Gif':
                                                                types=".gif";
                                                                break;       
                                                        }
                                                        editFields.push({"name":"icon","value":"kid_"+kidId});
                                                        var before = function(){},
                                                             success=function(){
                                                                layer.closeAll();
                                                                common.iframeLayerMsg("宝贝信息修改成功!", 1, function() {
                                                                    common.schoolCur();

                                                                        });
                                                             },
                                                        checkBack = function(){
                                                            common.btnReset();
                                                        };
                                                        common.ajaxFunIframe(editUrl,editFields,null,success,null,null,checkBack);
                                                    });
                                                    Q.addEvent("putFailure", function(err) {
                                                        alert(err);
                                                    });
                                                    Q.SetToken(data.qiniuTokenStr);

                                                    Q.Upload($("#fileName").prop('files')[0],"kid_"+kidId);
                                                }
                                            }
                                        });
                                    }

                                }
                            }
                        });

                    }
                },checkBack=function(){
                    common.btnReset();
                };
                common.ajaxFunIframe(editUrl, editFields,null,successBacks,null,null,checkBack);

            };
            common.validformIn(fm,callback);

        };





        var addBox = function() {
            var eleS = $('.layui-layer .J-school'),
                eleC = $(".layui-layer .J-class"),
                eleDate = $(".J-date");
            var commonFun = function() {
                $('.J-date').val(common.getYymmd());
                $('#fileName').on('change',function(){
                    //头像预览
                   common.imgPreview();
                 });
                common.layerDateYYMM(eleDate);
                $('input[name="hasOnlineVideo"]').on('change',
                    function() {
                        var th = $(this);
                        var v = th.val();
                        if (v == 1) {
                            $('.emptys').show();
                            $('.J-date').val(common.getYymmd());
                        } else {
                            $('.emptys').hide();
                            th.parent().parent().find('.J-date').val('');
                        }
                    });


            };
            var doAdmin = function() {
                commonFun();
                var emptyS = 1,emptyC=1;
                if(schoolCurrent==undefined){
                    common.getSchoolAndClassItem(eleS, emptyS, eleC,emptyC,commonFun);
                    //eleS,emptyS,eleC,emptyC,fun,schoolCur,classCur,schoolFun
                }else{
                    //eleS,emptyS,eleC,emptyC,fun,schoolCur,classCur
                    var sId = schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId;
                    var schoolCur = {"schoolId":sId,'schoolName':schoolCurrent.schoolName};
                    common.getSchoolAndClassItem(eleS, emptyS, eleC,emptyC,commonFun,schoolCur);
                }


            };
            var doUser = function() {
                var p={'page':0,'count':0},emptyC=1;
                var userDo = function() {
                    $('.J-school').text($('.J-sc').text());
                    commonFun();
                };
                common.getClass(eleC,emptyC,p,userDo);
            };
            common.codeFlag(doAdmin, doUser);
        };
        var edtiBox = function() {
            var eleS = $('.J-school'),
                eleC = $(".J-class"),
                eleDate = $(".J-date");
            var commonFun = function() {
                if( datasCur.icon != undefined && datasCur.icon != "" && datasCur.icon != null ){
                         var timestamp = Date.parse(new Date());
                         var rel = "http://image.bag61.com/"+datasCur.icon+"?t="+timestamp;
                         $('#preview').attr('src',rel);
                }
                $('.J-date').val(common.getYymmd());
                common.layerDateYYMM(eleDate);
                $('#fileName').on('change',function(){
                    //头像预览
                    common.imgPreview();
                 });
                $('input[name="hasOnlineVideo"]').on('change',
                    function() {
                        var th = $(this);
                        var v = th.val();
                        if (v == 1) {
                            $('.emptys').show();
                            $('.J-date').val(common.getYymmd());
                        } else {
                            $('.emptys').hide();
                            th.parent().parent().find('.J-date').val('');
                        }
                    });
            };
            var doAdmin = function() {
                commonFun();
                var emptyS = 1,emptyC=1;
                var sCur = {
                    "schoolId": datasCur.schoolId,
                    "schoolName": datasCur.schoolName
                };
                var cCur = {
                    "classId": datasCur.classId,
                    "className": datasCur.className
                };
                var fun = function() {
                };
                common.getSchoolAndClassItem(eleS, emptyS, eleC,emptyC, fun, sCur, cCur);
            };
            var doUser = function() {
                $('.J-school').text($('.J-sc').text());
                var p={'page':0,'count':0},emptyC=1;
                var userDo = function() {

                };
                //
                var cur = {
                    "classId":datasCur.classId,
                    "className":datasCur.className
                };
                //eleC.find('select option[value="'+datasCur.classId+'"]').attr("selected",true);
                // eleC.find('select').val(datasCur.classId)
                commonFun();
                common.getClass(eleC,emptyC,p,userDo,cur);
            };
            common.codeFlag(doAdmin, doUser);
        };
        var chkBox = function() {
            var eleS = $('.J-school'),
                eleC = $(".J-class");
            eleS.text($('.J-schools select option:selected').text());
            eleC.text($('.J-classs select option:selected').text());
            $('.layui-layer-btn').remove();
             if( datasCur.icon != undefined && datasCur.icon != "" && datasCur.icon != null ){
                         var timestamp = Date.parse(new Date());
                         var rel = "http://image.bag61.com/"+datasCur.icon+"?t="+timestamp;
                         $('#preview').attr('src',rel);
                }
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
                "titleStart": _con.del.titleStart,
                "titleEnd": _con.del.titleEnd
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
            }, "resetFun":{
                "add":resetFunAdd,
                "edit":resetFunEdit
            }
        });
        bag._do(items, options);
    },
    _do: function(items, options) {
        var commonFun = function() {
            bag.searchRest();
            $('select[name="isUse"]').val(1);
            common.creatSearch();
            if (mmg == undefined || mmg == null) {
                options[0].params = _dataParams;
                mainCont.getList(items, options);
            }
            else {
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
                    emptyC = 0,
                    eleC = $('.action .J-classs');
                var fun = function() {
                    commonFun();
                };
                if(schoolCurrent == undefined){
                    common.getSchoolAndClassItem(eleS, emptyS,eleC,emptyC,fun);
                }else{
                    //(b == false) ? a="true" : a="false";
                    var cur={
                        "schoolId":schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId,
                        "schoolName":schoolCurrent.schoolName
                    };
                    //eleS,emptyS,eleC,emptyC,fun,schoolCur,classCur
                    common.getSchoolAndClassItem(eleS, emptyS,eleC,emptyC,fun,cur);
                }

            },
            doYz = function() {
                var eleC = $('.J-classs'),
                    emptyC = 0,
                    p = {'page':0,'count':0,"schoolId":$.cookie('bag-schoolId')};
                common.getClass(eleC,emptyC,p,commonFun);
            },
            doUser = function() {
                var eleC = $('.J-classs'),
                    emptyC = 1,
                    p = {'page':0,'count':0,"schoolId":$.cookie('bag-schoolId')};
                common.getClass(eleC,emptyC,p,commonFun);
            };
        common.codeFlag(doAdmin,doYz,doUser);
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
    mmgSelects: function() {
        //表格选中行
        mmg.on('cellSelected',
            function(e, item, rowIndex, colIndex) {
                datasCur = item;
                var title,area,content,successBack;
                if ($(e.target).is('.J-addPer')) {
                    //弹出监护人界面
                     area = ['755px', '355px'];
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
                        area = ['715px', '350px'];
                        title= item.schoolName+"-"+item.className+"-"+item.name+"的门禁卡信息";
                        content = template('tplCard',item);
                        successBack = function() {
                            //获取门禁卡列表
                            $('.layui-layer-btn').remove();
                            bag.getcardList(datasCur.id);
                        };

                    common.layerConfirm(title, area, content, successBack);
                }
            })
    },
    getJhrList: function(ids) {
        //1、弹出监护人界面
        var id = $('#mmgJhr'),
            pageId = $('#paginatorJhr'),
            it = [{
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
            },
                {
                    title: '关系',
                    name: 'relationshipId',
                    width: 46,
                    align: 'center',
                    renderer: function(val, row) {
                        var state = "";
                        switch (val) {
                            case 1:
                                state = "父亲";
                                break;
                            case 2:
                                state = "母亲";
                                break;
                            case 3:
                                state = "祖父";
                                break;
                            case 4:
                                state = "祖母";
                                break;
                            case 5:
                                state = "外祖父";
                                break;
                            case 6:
                                state = "外祖母";
                                break;
                            case 7:
                                state = "伯父";
                                break;
                            case 8:
                                state = "伯母";
                                break;
                            case 9:
                                state = "叔父";
                                break;
                            case 10:
                                state = "叔母";
                                break;
                            case 11:
                                state = "舅舅";
                                break;
                            case 12:
                                state = "舅妈";
                                break;
                            case 13:
                                state = "姨父";
                                break;
                            case 14:
                                state = "姨妈";
                                break;
                        }
                        return state;
                    }
                },
                 {
                    title: '华麦账户名',
                    name: 'accountId',
                    width: 100,
                    align: 'center',
                    renderer: function(val, row) {
          				var str = "account"+val;
                        return str;
                    }
                },
                {
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
                },
                {
                    title: '性别',
                    name: 'gender',
                    width: 100,
                    align: 'center',
                    renderer: function(val, row) {
                        var state = "";
                        switch (val) {
                            case 1:
                                state = "男";
                                break;
                            case 0:
                                state = "女";
                                break;
                        }
                        return state;
                    }
                },
                {
                    title: '操作',
                    width: 100,
                    name:'isFirstGuardian',
                    align: 'center',
                    renderer: function(val, row) {
                        var editBtns = "<a class='iconfont J-editJhr' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                            delBtns = "<a class='iconfont J-delJhr' href='javascript:void(0);' title='解除此监护人与宝贝的关系'>&#xe625;</a>",
                            editDateBtnss = "<a class='iconfont J-sz' href='javascript:void(0);' title='设置为第一监护人'>&#xe601;</a>"
                            editDateBtns = "<a class='iconfont J-editDate' href='javascript:void(0);' title='修改视频到期日'>&#xe652;</a>";
                        var btnsHtml = editBtns + delBtns;
                        if (coders == 1 || coders == 2 || coders == 3) {
                            if (val != 1){
                                btnsHtml+=editDateBtnss;
                            }
                            btnsHtml+=editDateBtns;
                        }
                        return "<span class='table-action'>" + btnsHtml + "</span>";
                    }
                }];
        var coders = common.getCode();
        if (coders == 1 || coders == 2 || coders == 3) {
            var schoolItem = {
                title: '视频到期日',
                name: 'videoExpirationDate',
                width: 90,
                align: 'center'
            };
            it.unshift(schoolItem);
        }
        var options = {
            "indexCol": true,
            "checkCol": false,
            "it": it,
            /*"params": {
                kidId: ids
            },*/
            "url": $user.list.url+"?kidId="+ids
        };
        var callback = function(e, item, rowIndex, colIndex) {
            if ($(e.target).is('.J-editJhr')) {
                //监护人编辑;
                var kidData = item;
                kidData.kidId = datasCur.id;
                kidData.classId = datasCur.classId;
                var editLayer = layer.open({
                    type: 1,
                    closeBtn: 2,
                    content: template('tplJhrForm', kidData),
                    btn: ["确定"],
                    area: ["700px", "350px"],
                    success: function() {
                        var jhrAdd = $('.J-jhrForm');
                        common.validformSubmit(jhrAdd);
                        document.onkeydown = function(e){
                            var ev = document.all ? window.event : e;
                            if(ev.keyCode==13) {
                                $('.layui-layer-btn0').click();
                                return false;
                             }
                        };

                        $('input[name="gender"]').on('change',function(){
                            var v = parseInt($(this).val());
                            var _html = template("tplSex",{"gender":v});
                            $('select[name="relationshipId"]').html(_html);
                        });

                    },
                    yes: function() {
                        var jhrAdd = $('.J-jhrForm');
                        var callback = function() {
                            var fields = jhrAdd.serialize();
                            var successBacks = function() {
                                    if (ajaxData.success == true) {
                                        layer.close(editLayer);
                                        var message = "此监护人信息修改成功!",
                                            title = "贝安港提示",
                                            callback = function() {
                                                tempMmg.load();
                                            };
                                        jAlert(message, title, callback);
                                    }
                                },checkBack=function(){
                                common.btnReset();
                            };
                            common.ajaxFunIframe($user.edit.url,fields,null,successBacks,null,null,checkBack);
                        };
                        common.validformIn(jhrAdd, callback);
                    }
                })
            }
            if ($(e.target).is('.J-delJhr')) {
            	//删除监护人
                userData = {
                    "accountId": item.accountId,
                    "kidId": datasCur.id
                };
                //监护人删除
                jConfirm('是否解除宝贝:'+datasCur.name+'与此监护人的关系', '贝安港提示',
                    function() {
                        var successBacks = function() {
                                if (ajaxData.success == true) {
                                    var message = "此监护人与"+datasCur.name+"宝贝的关系解除成功!",
                                        title = "贝安港提示",
                                        callback = function() {
                                            tempMmg.load();
                                        };
                                    jAlert(message, title, callback);
                                }
                            };
                        var url = $user.userDel.url,
                            data = userData,checkBack=function(){
                            common.btnReset();
                        };
                        common.ajaxFunIframe(url,data, null, successBacks, null, null,checkBack);
            });
            }
            //设置为第一监护人
            if ($(e.target).is('.J-sz')) {
                var message = "是否设置此人为第一监护人？",
                    title = "贝安港提示",
                    callback = function () {
                     var  fields = {
                            "isFirstGuardian": 1,
                            "id": item.acctRoleId,
                            "kidId":datasCur.id
                        };
                        successBacks = function() {
                            if (ajaxData.success == true) {
                                layer.close(editLayer);
                                var message = "设置成功!",
                                    title = "贝安港提示",
                                    callback = function() {
                                        tempMmg.load();
                                    };
                                jAlert(message, title, callback);
                            }
                        };
                        common.ajaxFunIframe($user.dateEdit.url,fields,null, successBacks);
                    };
                jConfirm(message, title, callback);
                /*var _titleQr = "是否要设置此人为第一监护人",
                fields = {
                    "isFirstGuardian": 1,
                    "kidId": item.acctRoleId
                };
                yesBack = function() {
                    beforBack = function() {};
                    successBacks = function() {
                        if (ajaxData.success == true) {
                            layer.close(editLayer);
                            var message = "第一监护人设置成功!",
                                title = "贝安港提示",
                                callback = function() {
                                    tempMmg.load();
                                };
                            jAlert(message, title, callback);
                        }
                    };
                    common.ajaxFunIframe($user.dateEdit.url,fields, beforBack, successBacks);
                };
                common.layerMsgFlag(_titleQr, yesBack);*/
            }
            if ($(e.target).is('.J-editDate')) {
                //监护人编辑;
                var kidData = item;
                kidData.acctRoleId = kidData.acctRoleId;
                kidData.videoExpirationDate = kidData.videoExpirationDate;
                var editLayer = layer.open({
                    type: 1,
                    closeBtn: 2,
                    content: template('tplDate', kidData),
                    btn: ["确定"],
                    area: ["400px", "250px"],
                    success: function() {
                        var jhrAdd = $('.J-form-date');
                        common.validformSubmit(jhrAdd);
                        document.onkeydown = function(e){
                            var ev = document.all ? window.event : e;
                            if(ev.keyCode==13) {
                                $('.layui-layer-btn0').click();
                                return false;
                            }
                        };
                        var $date=$('.J-form-date .J-date')
                        common.layerDates($date);

                    },
                    yes: function() {
                        var jhrAdd = $('.J-form-date');
                        var callback = function() {
                            var fields = jhrAdd.serialize();
                            var successBacks = function() {
                                if (ajaxData.success == true) {
                                    layer.close(editLayer);
                                    var message = "此监护人视频到期日修改成功!!",
                                        title = "贝安港提示",
                                        callback = function() {
                                            tempMmg.load();
                                        };
                                    jAlert(message, title, callback);
                                }
                            },checkBack=function(){
                                common.btnReset();
                            };
                            common.ajaxFunIframe($user.dateEdit.url,fields,null,successBacks,null,null,checkBack);
                        };
                        common.validformIn(jhrAdd, callback);
                    }
                })
                }
        };
        var loadCallback = function(e, data) {
            if (data.totalCount >= 2) {
                $('.J-addJhr').hide();
            } else {
                $('.J-addJhr').show();
            }
        };
        bag.creatMmg(id, options, pageId, callback, loadCallback);
        //新增监护人
        $('.J-addJhr').on('click',
            function(e) {
                e.preventDefault();
                var addLayer = layer.open({
                    type: 1,
                    closeBtn: 2,
                    title:"验证手机号",
                    content: template('tplTel', {}),
                    btn: ["下一步"],
                    area: ["500px", "230px"],
                    success: function() {

                        var jhrTel = $('.J-telForm');
                        common.validformSubmit(jhrTel);
                        document.onkeydown = function(e){
                            var ev = document.all ? window.event : e;
                            if(ev.keyCode==13) {
                                $('.layui-layer-btn0').click();
                                return false;
                             }
                        }

                    },
                    yes: function() {
                        var jhrTel = $('.J-telForm');
                        var callback = function() {
                            var fields = jhrTel.serialize();
                            telephone = jhrTel.find('input[name="telephone"]').val();
                            var successBacks = function() {
                                    if (ajaxData.data != null && ajaxData.data != '') {
                                        //手機號存在
                                        $('.layui-layer-page').find('.layui-layer-btn').find('.layui-layer-btn0').removeClass('disabled').text('确定');
                                        jConfirm('监护人账号已存在，您可以进入并关联此监护人与宝贝'+datasCur.name+"的关系", '贝安港提示',
                                            function() {
                                                layer.close(addLayer);
                                                var jhrDatas = ajaxData.data;
                                                jhrDatas.kidId = datasCur.id;
                                                jhrDatas.classId = datasCur.classId;
                                                jhrDatas.sex = 1;
                                                var addLayers = layer.open({
                                                    type: 1,
                                                    closeBtn: 2,
                                                    content: template('tplJhrForm', jhrDatas),
                                                    btn: ["确定"],
                                                    area: ["700px", "350px"],
                                                    success: function() {
                                                        var jhrAdd = $('.J-jhrForm');
                                                        common.validformSubmit(jhrAdd);
                                                        $('input[name="gender"]').on('change',function(){
                                                            var v = parseInt($(this).val());
                                                            var _html = template("tplSex",{"gender":v});
                                                            $('select[name="relationshipId"]').html(_html);
                                                        });

                                                    },
                                                    yes: function() {
                                                        var jhrAdd = $('.J-jhrForm');
                                                        var callback = function() {
                                                            var fields = jhrAdd.serialize();
                                                            var successBacks = function() {
                                                                    if (ajaxData.success == true) {
                                                                        layer.close(addLayers);
                                                                        var message = "监护人信息修改成功,并成功关联此宝贝!",
                                                                            title = "贝安港提示",
                                                                            callback = function() {
                                                                                tempMmg.load();
                                                                            };
                                                                        jAlert(message, title, callback);
                                                                    }
                                                                };
                                                            var url = $user.edit.url,adata = fields,checkBack=function(){
                                                                    common.btnReset();
                                                                };
                                                            common.ajaxFunIframe(url,adata, null,successBacks, null, null,checkBack);

                                                        };
                                                        common.validformIn(jhrAdd, callback);
                                                    }
                                                })
                                            },
                                            function() {
                                               alert('取消');
                                            });
                                    } else {
                                        layer.close(addLayer);
                                        //手機號不存在
                                        jhrDatas = {
                                            "kidId": datasCur.id,
                                            "classId": datasCur.classId,
                                            "telephone": telephone
                                        };
                                        var addLayers = layer.open({
                                            type: 1,
                                            closeBtn: 2,
                                            content: template('tplJhrForm', jhrDatas),
                                            btn: ["确定"],
                                            area: ["700px", "350px"],
                                            success: function() {
                                                var jhrAdd = $('.J-jhrForm');
                                                common.validformSubmit(jhrAdd);
                                                $('input[name="gender"]').on('change',function(){
                                                            var v = $(this).val();
                                                            var _html = template("tplSex",{"gender":v});
                                                            $('select[name="relationshipId"]').html(_html);
                                                        });
                                                $("input[type=radio][name=gender][value=0]").attr("checked",'checked').trigger('change');

                                            },
                                            yes: function() {
                                                var jhrAdd = $('.J-jhrForm');
                                                var callback = function() {
                                                    var fields = jhrAdd.serialize();
                                                    var successBacks = function() {
                                                            if (ajaxData.success == true) {
                                                                layer.close(addLayers);
                                                                var message = "监护人关联成功!",
                                                                    title = "贝安港提示",
                                                                    callback = function() {
                                                                        tempMmg.load();
                                                                    };
                                                                jAlert(message, title, callback);
                                                            }
                                                        };
                                                    var url = $user.add.url,adata = fields,checkBack=function(){
                                                        common.btnReset();
                                                    };
                                                    common.ajaxFunIframe(url,adata, null,successBacks, null, null,checkBack);
                                                };
                                                common.validformIn(jhrAdd, callback);
                                            }
                                        })
                                    }
                                };
                            var url = $user.userDetail.url,adata = fields,checkBack=function(){
                                common.btnReset();
                            };
                            common.ajaxFunIframe(url,adata, null,successBacks, null, null,checkBack);
                        };
                        common.validformIn(jhrTel, callback);
                    }
                })
            });
    },
    getcardList: function(ids) {
        var itemSelect=[];
        //门禁卡相关
        var id = $('#mmgJhr'),
            pageId = $('#paginatorJhr'),
            it = [{
                title: '卡号',
                name: 'rfId',
                width: 46,
                align: 'center',
                renderer:function(val,row){
                    if(val == null || val == ""){
                        val = row.rfId8
                    }
                    return val;
                }
            },
                {
                    title: '监护人',
                    name: 'name',
                    width: 46,
                    align: 'center'
                },
                {
                    title: '操作',
                    width: 100,
                    align: 'center',
                    renderer: function(val, row) {
                        var editBtns = "<a class='iconfont J-editCard' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
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
                kidId: ids
            }*/
            "url": $kidRfIds.list.url+"?kidId="+ids
        };

        var callback = function(e, item, rowIndex, colIndex) {
            var itsc = $(tempMmg).find('tbody tr').eq(rowIndex);
            if ($(itsc).hasClass('selected')) {
                for (var i = 0; i < itemSelect.length; i++) {
                    if (item.id == itemSelect[i].id) {
                        itemSelect.splice(i, 1);
                        i--;
                    }
                }
            } else {
                itemSelect.push(item);
            }
            if ($(e.target).is('.J-editCard')) {
                //监护人门禁卡编辑;
                var kidId=datasCur.id;
                if(datasCur.rfId == "" || datasCur.rfId == null ){
                    rfIds = item.rfId8
                }else{
                    rfIds = item.rfId;
                }
                var url=$user.list.url,datas={
                    "kidId":kidId
                };
                var callback=function () {
                        var jhr=ajaxDatas.list;
                        var editLayer = layer.open({
                            type: 1,
                            closeBtn: 2,
                            content: template('tplCardForm',{list:jhr,kidId:datasCur.id,rfId:rfIds,id:item.id}),
                            btn: ["确定"],
                            area: ["700px", "350px"],
                            success: function() {
                                var jhrAdd = $('.J-Form');
                                common.validformSubmit(jhrAdd);
                                document.onkeydown = function(e){
                                    var ev = document.all ? window.event : e;
                                    if(ev.keyCode==13) {
                                        if($('#popup_ok').length>0){
                                            $('#popup_ok').click()
                                        }else
                                        $('.layui-layer-btn0').click();
                                        return false;
                                     }
                                }
                            },
                            yes: function() {
                                var jhrAdd = $('.J-Form');
                                var callback = function() {
                                    var fields = jhrAdd.serialize();
                                    var successBacks = function() {
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
                                    var url = $kidRfIds.edit.url,adata = fields,checkBack=function(){
                                        common.btnReset();
                                    };
                                    common.ajaxFunIframe(url,adata, null,successBacks, null, null,checkBack);
                                };
                                common.validformIn(jhrAdd, callback);
                            }
                        })
                };
                common.ajaxSubmitV(url,datas,callback);

            }
            if ($(e.target).is('.J-delCard')) {
                //删除门禁卡

                userData = {
                    "id": [item.id]
                };
                //监护人门禁卡删除
                jConfirm('是否刪除此监护人名下的卡', '贝安港提示',
                    function() {
                        var successBacks = function() {
                                if (ajaxData.success == true) {
                                    var message = "删除成功",
                                        title = "贝安港提示",
                                        callback = function() {
                                            tempMmg.load();
                                        };
                                    jAlert(message, title, callback);
                                }
                            };
                        var url = $kidRfIds.del.url,adata = userData,checkBack=function(){
                            common.btnReset();
                        };
                        common.ajaxFunIframe(url,adata,null,successBacks, null, null,checkBack);
                    });
            }
        };
        var loadCallback = function(e, data) {
            $('.checkAll').on('click', function(e) {
                var th = $(this);
                if (th.prop('checked') == false) {
                    itemSelect = [];
                } else {
                    if(data.success == true){
                        itemSelect = data.list;
                    }
                }
            });
            $('.J-delBtnAll').on('click',function(){
                if(itemSelect.length == 0){
                    //监护人删除
                    jConfirm('未选中需要删除的数据', '贝安港提示')
                }
                else{
                    var ids=[];
                    for(var i=0;i<itemSelect.length;i++){
                        ids.push(itemSelect[i].id)
                    }
                    userData ={
                        "id":ids
                    }
                    //监护人删除
                    jConfirm('是否刪除此监护人名下的卡', '贝安港提示',
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
                            var url = $kidRfIds.del.url,adata = userData,checkBack=function(){
                                common.btnReset();
                            };
                            common.ajaxFunIframe(url,adata, null,successBacks, null, null,checkBack);
                        });
                }
            })
        };

        bag.creatMmg(id,options,pageId,callback,loadCallback);

        //门禁卡新增
        $('.J-cardBtn').unbind('click').on('click',function(e){
            e.preventDefault();
            var kidId=datasCur.id;
            var url=$user.list.url,datas={
                "kidId":kidId
            };
            var callback=function () {
                if(ajaxDatas.totalCount==0){
                    var message = "请先添加监护人，再执行此操作",
                        title = "贝安港提示",
                        callback = function() {
                        };
                    jAlert(message, title, callback);
                }
                else{
                    var jhr=ajaxDatas.list,kidId=datasCur.id;
                    var addLayers = layer.open({
                        type: 1,
                        title:'添加门禁卡',
                        closeBtn: 2,
                        content: template('tplCardForm', {list:jhr,kidId:kidId}),
                        btn: ["下一步"],
                        area: ["450px", "280px"],
                        success: function() {
                            var mjk = $('.J-Form');
                            common.validformSubmit(mjk);
                            document.onkeydown = function(e){
                                    var ev = document.all ? window.event : e;
                                    if(ev.keyCode==13) {
                                        if($('#popup_ok').length>0){
                                            $('#popup_ok').click()
                                        }else
                                        $('.layui-layer-btn0').click();
                                        return false;
                                     }
                                }
                        },
                        yes: function() {
                            var mjk = $('.J-Form');
                            var callback=function () {
                                var fields = mjk.serialize();
                                var successBacks = function() {
                                        if (ajaxData.success == true) {
                                            var message = "门禁卡添加成功!",
                                                title = "贝安港提示",
                                                callback = function() {
                                                    layer.close(addLayers);
                                                    tempMmg.load();
                                                };
                                            jAlert(message, title, callback);
                                        }
                                    };
                                var url = $kidRfIds.add.url,adata = fields,checkBack=function(){
                                    common.btnReset();
                                };
                                var completeBack = function(){
                                    $('.layui-layer-page .layui-layer-btn0').removeClass('disabled');
                                    $('.layui-layer-page .layui-layer-btn0').text('确定');
                                };
                                common.ajaxFunIframe(url,adata, null,successBacks,completeBack, null,checkBack);
                            };
                            common.validformIn(mjk, callback);
                        }
                    })
                }
            };
            common.ajaxSubmitV(url,datas,callback);
        });


    },
    formEmpty: function() {
        $('.J-add-form').empty();
        $('.J-btn-add').removeClass('disabled');
    },
    renderJhrBox: function(datas, url, type) {
        //清空 tel
        $('.J-add-form').html(template('tplJhrForm', datas));
        var btnJhrForm = $('.J-jhrForm');
        var backs = function() {
            var fields = btnJhrForm.serialize();
            var successBacks = function() {
                    if (ajaxData.success == true) {
                        sFlag = false;
                        bag.getJhrList(datasCur.id);
                    }
            },checkBack=function(){
                common.btnReset();
            };
            common.ajaxFunIframe(url, fields,null,successBack,null,null,checkBack);
        };
        common.validformIn(btnJhrForm, backs);
    },
    ajaxSubmitV: function(url, datas, callback) {
        //提交数据
        $.ajax({
            type: "post",
            url: url,
            data: datas,
            dataType: "json",
            success: function(data) {
                ajaxDatas = data;
                if (callback) {
                    callback();
                }
            }
        });
    },
    searchRest: function() {
        $('#isUse').val('');
        $('#gender').val('');
        $('#keyWords').val('');
    }
};
//执行
//


bag._init();
