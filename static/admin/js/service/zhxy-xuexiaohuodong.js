options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $schoolActivity; //学校活动

        common.powerFlag(powers);
        //列
        var items = [
            { title:'活动名', name:'activityName',width:46, align:'center'},
            { title:'状态', name:'isUse' ,width:120, align:'center',renderer:function (val,row) {
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
                title: '操作',
                width: 100,
                align: 'center',
                renderer: function(val, row) {
                    var editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                        delBtns = '',
                        delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>",
                        delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>",
                        yulanBtn = "<a style='display:none' class='iconfont J-yulan' data-id='1' href='javascript:void(0);' title='预览'>&#xe60a;</a>";
                    btnsHtml = "";
                    if (row.isUse == 0) {
                        btnsHtml += delBtnsStart;
                    } else {
                        btnsHtml += delBtnsEnd;
                    }
                    if (editFlagS == true) {
                        if(row.isUse == 1)
                        btnsHtml += editBtns;
                    }
                    if (delFlag == true) {
                        btnsHtml += delBtns;
                    }
                    return "<span class='table-action'>" + btnsHtml +yulanBtn+ "</span>";
                }
            }
        ];
        var coders=common.getCode();
        if(coders==1||coders==2||coders==3){
            var schoolItem={
                title: '园所',
                name: 'schoolName',
                width: 90,
                align: 'center'
            };
            items.splice(1,0,schoolItem);
        }
         if(coders==1){
            $('.J-renHtml').show();
            $('.J-renHtml').on('click',function(){
                var _titleQr="是否要重新生成所有的活动?",
                    yesBack = function(){
                             var successBack = function() {
                                        var _titleYes= "活动重新生成成功!"
                                        common.iframeLayerMsg(_titleYes, 1);
                                    };
                                common.ajaxFunIframe($schoolActivity.renCreatHtml.url,[],null,successBack);
                    }
                common.layerMsgFlag(_titleQr, yesBack);
            })
         }
        var resetFunAdd = function() {
            var eleForm=$('.J-addForm');
            var callback=function () {
                var showContent=html5Content(),
                    activityName=$('.layui-layer input[name="activityName"]').val(),
                    schoolId = $('.layui-layer input[name="schoolId"]').val();
                showContent=showContent.replace('<p><br/></p>', "");//替换空白
                addFields={
                    "schoolId":schoolId,
                    "showContent":showContent,
                    "activityName":activityName
                };
                before = function() {};
                succes=function() {
                    if (ajaxData.success == true) {
                            common.iframeLayerMsg("添加成功!", 1, function() {
                                sFlag=false;
                                mmg.load(_dataParams);
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
                var showContent=html5Content(),
                    activityName=$('.layui-layer input[name="activityName"]').val(),
                    schoolId = $('.layui-layer input[name="schoolId"]').val();
                showContent=showContent.replace('<p><br/></p>', "");//替换空白
                addFields={
                    "id":datasCur.id,
                    "schoolId":schoolId,
                    "showContent":showContent,
                    "activityName":activityName
                };
                before = function() {};
                succes=function() {
                    if (ajaxData.success == true) {
                        common.iframeLayerMsg("修改成功!", 1, function() {
                            sFlag=false;
                            mmg.load(_dataParams);
                        });

                    }
                };
                common.ajaxFunIframe(editUrl,addFields,before,succes);
            };
            common.validformIn(eleForm,callback);
        };
        var html5Content=function(){
            var _html5= ue.getContent();
            return _html5;
        };
        var commonFun = function(){
            var eleS=$('.layui-layer .J-school');
            var doAdmin=function () {
                var p={"page":0,"count":0},emptyS=1;
                if( zhuangtaiTag == undefined || zhuangtaiTag == "zengjia"){
                    common.getSchoolItem(eleS,p,emptyS);
                }
                if(zhuangtaiTag == "chk"){
                    $('.J-school').text(datasCur.schoolName);
                }

                if(zhuangtaiTag == "bianji"){
                   var cab = function () {

                    },cur = {
                        "schoolId":datasCur.schoolId,
                        "schoolName":datasCur.schoolName
                    };
                    common.getSchoolItem(eleS,p,emptyS,cab,cur);
                }

            };
            var doUser=function () {
                var eleS=$('.layui-layer .J-school');
                eleS.text($('.J-sc').text());
            };
            common.codeFlag(doAdmin,doUser);
            common.creaUeditor('myEditor');
            var url =  $zhxyModManage.list.url,
                datas = {},
                callback = function(data){
                   var datas = data.list,tempData=[];
                    for(var i=0;i<datas.length;i++){
                       if(datas[i].isUse == 1 || datas[i].isUse == null){
                           tempData.push(datas[i]);
                       }
                    }

                    var tempChangjinData=[],zujianData=[];
                    for(var i=0;i<tempData.length;i++){
                        if(tempData[i].modType==1 || tempData[i].modType==2){
                            zujianData.push(tempData[i]);
                        }else{
                            tempChangjinData.push(tempData[i]);
                        }
                    }
                    var _htmlChangjin = template("tplModList",{list:tempChangjinData});
                    var _htmlXujian = template("tplModList",{list:zujianData});
                    $('.J-mod').eq(0).html(_htmlChangjin);
                     $('.J-mod').eq(1).html(_htmlXujian);
                     $('.moban-tab li').on('click',function(){
                        $('.moban-tab li').removeClass('active');
                        $('.J-mod').hide();
                        var th=$(this),thInd=th.index();
                        th.addClass('active');
                        $('.J-mod').eq(thInd).show();
                     });
                     $('.moban-tab li').eq(0).click();
                    ue.ready(function() {
                        if(zhuangtaiTag == "bianji"){
                            ue.execCommand('insertHtml',datasCur.showContent);
                        }
                        ue.addListener('selectionchange',function(){

                            var $mobWrap = $('.J-content');
                            $mobWrap.html(html5Content());
                            $mobItem = $('.J-content .J-mod-item');
                            $mobItem.on('mouseenter',function(){
                                var th = $(this);
                                th.find('.mod-bgWrapper').remove();
                                th.append(template("tplCloseMod",{}));
                                $('.J-closeMod').on('click',function(){
                                    var th = $(this),thP=th.parent(),thPd=thP.index();
                                    thP.remove();
                                    ue.setContent(" ");
                                    $('.J-tempCont').find('.J-mod-item').eq(thPd).remove();
                                    var thv = $('.J-tempCont').html();
                                    if(thv == "<p><br></p>"){
                                        return false;
                                    }
                                    ue.execCommand('insertHtml',thv);
                                });
                            });
                            $mobItem.on('mouseleave',function(){
                                $('.mod-bgWrapper').remove();
                            });
                            var tempCont = $('.J-tempCont');
                            if(tempCont.length>0){
                                tempCont.html(ue.getContent());
                            }else{
                                $('body').append('<div class="J-tempCont hidden"></div>');
                                $('.J-tempCont').html(html5Content());
                            }

                        });




                       $('.mod-wrapper').on('scroll',function () {
                    //console.log($(this).scrollTop());
                    var scroolTop=$(this).scrollTop();
                    console.log(scroolTop);
                    if(scroolTop>0){
                        $('.edui-default .edui-editor-toolbarbox').addClass('fixed');
                        
                    }else{
                       
                    }
                })

                        $('.J-mod li').on('click',function(e){
                            e.preventDefault();
                            var th = $(this),
                                thInd=th.index(),
                                thPp = th.parent().parent().index(),
                                thv="";
                                if(thPp == 0){
                                    thv = tempChangjinData[thInd].modContent;
                                }else{
                                    thv = zujianData[thInd].modContent
                                }
                            ue.execCommand('insertHtml',thv);
                        });

                    });

                };
            common.ajaxSubmitV(url,datas,callback);

        };
        var addBox = function() {
            commonFun();
        };
        var editBox = function() {
            commonFun();
        };
        var chkBox = function() {
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
            },"callback": {
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
            if(mmg){
                bag.mmgSelects();
            }
        };

        var doAdmin = function() {
                var eleS = $('.action .J-schools'),
                    p = {"page":0,"count":0},
                    emptyS = 0,
                    emptyC = 0,
                    eleC = $('.action .J-classs');
                var cab = function() {
                    commonFun();
                };

                if(schoolCurrent == undefined){
                    common.getSchoolItem(eleS,p,emptyS,cab);
                }else{
                    var cur={
                        "schoolId":schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId,
                        "schoolName":schoolCurrent.schoolName
                    };
                    common.getSchoolItem(eleS,p,emptyS,commonFun,cur);
                }

            },
            doUser = function() {
                commonFun();
            };
        common.codeFlag(doAdmin, doUser);
    },
    mmgSelects:function(){
        //表格选中行
        mmg.on('cellSelected',
            function(e, item, rowIndex, colIndex) {
                datasCur = item;
                var title,area,content,successBack;
                if ($(e.target).is('.J-yulan')) {
                    //弹出预览
                   var area = ['715px', '355px'],
                        title= item.schoolName+"-"+item.activityName+"扫码预览";
                   var $webUrl = _pathWeb+datasCur.url;
                    layer.open({
                          type: 2,
                          title: title,
                          shadeClose: true,
                          shade: 0.8,
                          area: area,
                          content: 'http://www.mrxn.net/mrxnqrapi/api.php?size=4x4&data='+$webUrl //iframe的url
                        }); 


                }
            })
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keywords').val('');
    }
};


//执行
bag._init();