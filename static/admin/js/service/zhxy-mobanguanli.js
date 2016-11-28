options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $zhxyModManage; //智慧校园

        common.powerFlag(powers);
        //列
        var items = [
            { title:'模板名', name:'modName',width:46, align:'center'},
            { title:'预览图', name:'content' ,width:120, align:'center'},
            { title:'状态', name:'isUse' ,width:120, align:'center',renderer:function (val,row) {
                var state="";
                if( val== null){
                    val=1;
                }
                switch (val){
                    case 1:
                        state="√";
                        break;
                    case 0:
                        state="x";
                        break;
                }

                return state;
            }},{
                title: '操作',
                width: 100,
                align: 'center',
                renderer: function(val, row) {
                    var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                        editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                        delBtns = "<a class='iconfont J-del' href='javascript:void(0);' title='删除'>&#xe617;</a>",
                        delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>",
                        delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>";
                    btnsHtml = ckBtns;
                    if (row.isUse == 0) {
                        btnsHtml += delBtnsStart;
                    } else {
                        btnsHtml += delBtnsEnd;
                    }
                    if (editFlagS == true) {
                        btnsHtml += editBtns;
                    }
                    if (delFlag == true) {
                        btnsHtml += delBtns;
                    }
                    return "<span class='table-action'>" + btnsHtml + "</span>";
                }
            }
        ];
        var isAdd = 0,isModId=null;
        var resetFunAdd = function() {

            var eleForm=$('.J-addForm');

            var callback=function () {
                var modContent=html5Content(),
                    modType = $('.layui-layer select[name="modType"]').val(),
                    modName=$('input[name="modName"]').val();
                addFields={
                    "modType":modType,
                    "modContent":modContent,
                    "modName":modName,
                    "isUse":1
                };
                succes=function() {
                    if (ajaxData.success == true) {
                        if($("#fileName").prop('files')[0]==undefined){
                            common.iframeLayerMsg("添加成功!", 1, function() {
                                sFlag=false;
                                mmg.load(_dataParams);
                            });
                        }
                        else{
                            var kidId=ajaxData.data.id;
                            $.ajax({
                                url: $zhxyModManage.upImg,
                                data:{"fileName":"mod_"+kidId},
                                type: 'post',
                                cache: false,
                                dataType: 'json',
                                success: function (data) {
                                    if (data.success == true) {
                                        Q.AddParams('x:id',kidId);
                                        // Q.AddParams('key',"kid_"+kidId);
                                        Q.addEvent("putFinished", function(fsize, res, taking) {
                                            addFields.id = kidId;
                                            addFields.previewImage = "mod_"+kidId;
                                            var before = function(){},
                                                success=function(){
                                                    common.iframeLayerMsg("添加成功!", 1, function() {
                                                        mmg.load(_dataParams);
                                                    });
                                                };

                                            common.ajaxFunIframe(editUrl,addFields,before,success);

                                        });
                                        Q.addEvent("putFailure", function(err) {
                                            alert(err);
                                        });
                                        Q.SetToken(data.qiniuTokenStr);

                                        Q.Upload($("#fileName").prop('files')[0],"mod_"+kidId);
                                    }
                                }
                            });
                        }

                    }

                };
                var url = addUrl;
                if(isModId != null){
                    url = editUrl;
                    addFields.id = isModId;
                }
                common.ajaxFunIframe(url,addFields,null,succes);
            };
            common.validformIn(eleForm,callback);
        };

        var resetFunEdit = function() {
            var eleForm=$('.J-editForm');
            var callback=function () {

                var modContent=html5Content(),
                    id=$('input[name="id"]').val(),
                    modType = $('.layui-layer select[name="modType"]').val(),
                    modName=$('input[name="modName"]').val();
                editFields={
                    "id":id,
                    "modType":parseInt(modType),
                    "modContent":modContent,
                    "modName":modName
                };
                before = function() {};
                succes=function() {

                    if (ajaxData.success == true) {
                        if($("#fileName").prop('files')[0]==undefined){
                            common.iframeLayerMsg("修改成功!", 1, function() {
                                sFlag=false;
                                mmg.load(_dataParams);
                            });
                        }
                        else{
                            var kidId=datasCur.id;
                            $.ajax({
                                url: $products.upImg.url,
                                data:{"fileName":"mod_"+kidId},
                                type: 'post',
                                cache: false,
                                dataType: 'json',
                                success: function (data) {
                                    if (data.success == true) {
                                        Q.AddParams('x:id',kidId);
                                        // Q.AddParams('key',"kid_"+kidId);
                                        Q.addEvent("putFinished", function(fsize, res, taking) {
                                            editFields.previewImage = "mod_"+kidId;
                                            var before = function(){},
                                                success=function(){
                                                    common.iframeLayerMsg("修改成功!", 1, function() {
                                                        mmg.load(_dataParams);
                                                    });
                                                };

                                            common.ajaxFunIframe(editUrl,editFields,before,success);
                                        });
                                        Q.addEvent("putFailure", function(err) {
                                            alert(err);
                                        });
                                        Q.SetToken(data.qiniuTokenStr);

                                        Q.Upload($("#fileName").prop('files')[0],"mod_"+kidId);
                                    }
                                }
                            });
                        }

                    }

                };
                common.ajaxFunIframe(editUrl,editFields,before,succes);
            };
            common.validformIn(eleForm,callback);
        };

        var html5Content=function(){
            var _html5= '<div class="mod-item-style J-mod-item">'+ue.getContent()
                +'</div>';
            return _html5;
        };


        var modMessage = function(){
            $('.modMsg').fadeIn();
            setTimeout(function(){
                $('.modMsg').fadeOut();
            },10000000);
        };
        var postDatas = function(){
            //临时存储数据
            var modName = $('.layui-layer input[name="modName"]').val(),
                modContent = html5Content(),
                ueCont = ue.getContent();
            if(modName != "" && ueCont != ""){
                submitData(modName,modContent);
            }
        };

        var submitData = function(modName,modContent){
            var addFields={
                "modContent":modContent,
                "modName":modName,
                "isUse":0
            };
            var succes = function(){
                if(ajaxData.success){
                    isAdd++;
                    modMessage();
                    if(zhuangtaiTag =="zengjia"){
                        isModId = ajaxData.data.id;
                    }else{
                        isModId = datasCur.id;
                    }

                }
            };
            var url = addUrl;
            if(zhuangtaiTag == "bianji"){
                isAdd = 1;
            }
            if(isAdd>0){
                url = editUrl;
                addFields.id = isModId;
            }
            common.ajaxFunIframe(url,addFields,null,succes);
        };

        var commonFun = function(){
            var eleModeType = $('.layui-layer select[name="modType"]');
            $(eleModeType).on('change',function () {
                modeTypes=eleModeType.val();
            });
            eleModeType.trigger('change');
            $('#fileName').on('change',function(){
                $file = document.getElementById("fileName");
                img="";
                if($file.files&&$file.files.length>0){
                    for(var i=0;i<$file.files.length;i++){
                        if($file.files[i].type != "image/png" && $file.files[i].type != "image/jpeg" && $file.files[i].type != "image/Gif"){
                            alert('请传的图片格式不正确，请重新选择!');
                            $($file).val('');
                            return false;
                        }else{
                            //var upimg = window.URL.createObjectURL($file.files[i]);
                            var upimg='<img src="'+window.URL.createObjectURL($file.files[i])+'" />';
                        }
                    }
                    if(modeTypes != 1){
                        $('.J-content').append(upimg);
                    }
                }
            });
            common.creaUeditor('myEditor');
            ue.ready(function() {
                if(zhuangtaiTag == 'bianji'){
                    //避免产生多余的标签
                    var oldCont = datasCur.modContent;
                    var oldContNew = "<div class='hidden J-conts'>"+datasCur.modContent+"</div>";
                    if($('.J-conts').length>0){
                        $('.J-conts').remove();
                    }
                    $('body').append(oldContNew);
                    var newConts = $('.J-conts').find('.J-mod-item').html();
                    //避免产生多余的标签结束
                    ue.setContent(newConts);

                }
                ue.addListener('selectionchange',function(){
                    if(modeTypes == 1){
                        $('.J-content').html(html5Content());
                    }

                });



                //setInterval (postDatas,10000);


                $('.layui-layer-content').on('scroll',function () {
                    //console.log($(this).scrollTop());
                    var scroolTop=$(this).scrollTop();
                    if(scroolTop<280){
                        $('.J-content').parent().removeClass('mobie-fixed');
                        $('.J-content').parent().css('left','11px');
                        $("#edui1_toolbarbox").removeAttr("style");
                        $("#edui1_toolbarbox").prev().css('height:auto');
                    }else{
                        $('.J-content').parent().addClass('mobie-fixed');
                        $('#edui1_toolbarbox').css('position','fixed');
                        $('#edui1_toolbarbox').css('top','0');
                        $('#edui1_toolbarbox').css('z-index','9999');
                         $('.J-content').parent().css('left','151px');
                    }
                })

            });
        };
        var addBox = function() {
            commonFun();
        };
        var editBox = function() {
            commonFun();
        };
        var chkBox = function() {
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
                "edit": editBox,
                "chk": chkBox
            },
            "mmg": {
                "indexCol": true,
                "checkCol": true,
                "root": "list"
            },
            "resetFun":{
                "add":resetFunAdd,
                "edit":resetFunEdit
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
        };

        commonFun();
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keywords').val('');
    }
};


//执行
bag._init();