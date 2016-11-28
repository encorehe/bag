options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $cameraTimes; //开放时间
        common.powerFlag(powers);

        var items = [
            { title:'摄像头名称', name:'cameraName',width:46, align:'center'},
            { title:'开始时间', name:'startTime',width:46, align:'center'},
            { title:'结束时间', name:'endTime',width:46, align:'center'},
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
            { title:'操作', name:'code' ,width:60, align:'center',renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns='';
                delBtnsEnd="<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>";
                delBtnsStart="<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>";
                btnsHtml="";
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




        


        var commonFun=function () {
            var ele = $('.layui-layer .J-school'),p={'page':0,'count':0},em=1,cab=function(){},isChecked=true;
            if(zhuangtaiTag=="bianji"){
                var current ={
                    "schoolId":datasCur.schoolId,
                    "schoolName":datasCur.schoolName
                };
                var cab = function(){
                    $('.J-shexiangtou').empty();
                    var sId= $('.layui-layer input[name="schoolId"]').val();
                    var url = $cameras.list.url,
                        datas = {"schoolId":sId,"isUse":1,"page":0,"count":0},
                        callback = function(data){
                            if(data.success){
                                var _html = template('tplShexiangtou',{list:data.list});
                                $('.J-shexiangtou').html(_html);
                                if(data.list.length>0){
                                    $('.J-select-box').on('change',function(){
                                        var th = $(this),thv=th.val();
                                        $('input[name="cameraId"]').val(thv);
                                    });
                                    $('.J-select-box').trigger('change');
                                    $('.J-select-box').val(datasCur.cameraId);
                                    $('input[name="cameraId"]').val(datasCur.cameraId);
                                }
                            }
                        }
                    common.ajaxSubmitV(url,datas,callback);
                };
                common.getSchoolItem(ele,p,em,cab,current);
            }else{
                var cab = function(){
                    var sId= $('.layui-layer input[name="schoolId"]').val();
                    var url = $cameras.list.url,
                        datas = {"schoolId":sId,"isUse":1,"page":0,"count":0},
                        callback = function(data){
                            if(data.success){
                                $('.J-shexiangtou').empty();
                                var _html = template('tplShexiangtou',{list:data.list});
                                $('.J-shexiangtou').html(_html);
                                if(data.list.length>0){
                                    $('.J-select-box').on('change',function(){
                                        var th = $(this),thv=th.val();
                                        $('input[name="cameraId"]').val(thv);
                                    });
                                    $('.J-select-box').trigger('change');
                                }
                            }
                        }
                    common.ajaxSubmitV(url,datas,callback);
                };
                common.getSchoolItem(ele,p,em,cab)
            }
        };

        var addBox= function() {
            commonFun();
        };
        var edtiBox = function() {
            commonFun();
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
                var delDatas={"id":delData};
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
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#gender').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();