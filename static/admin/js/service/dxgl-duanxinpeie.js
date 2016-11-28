options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $schoolSmsChas; //短信配额

        common.powerFlag(powers);
        //列
        var items = [
            { title:'渠道', name:'channelName',width:46, align:'center'},
            { title:'短信条数', name:'smsNums' ,width:120, align:'center'},
            { title:'状态', name:'isUse' ,width:120, align:'center',renderer:function (val,row) {
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
            { title:'创建时间', name:'insertDate' ,width:120, align:'center'},
            { title:'操作', name:'insertDate' ,width:60, align:'center',renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                     delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>",
                     delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>",
                btnsHtml="";
                if(delFlag==true){
                    if (row.isUse == 0) {
                            btnsHtml += delBtnsStart;
                        } else {
                            btnsHtml += delBtnsEnd;
                        }
                }
                if(editFlagS){
                    btnsHtml+=editBtns;
                }
                
                return "<span class='table-action'>"+btnsHtml+"</span>";
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
            var  eleSms=$('.layui-layer .J-qudao');
            var callback=function () {
                slectChange();
                $('.J-qudao select').on('change',function () {
                    slectChange();
                });
            };
            var slectChange=function () {
                var _inputSnum=$('input[name="smsNums"]');
                var ed=$('.J-qudao option:selected').data('smsnums');
                $('.J-nums').html(ed);
                $(_inputSnum).attr('max',ed);
            };
            common.getSmsChannels(eleSms,callback);
            var eleS=$('.J-school'),em=0,p={page:0,count:0};
            var cab=function () {

            };
            common.getSchoolItem(eleS,p,em,cab);

        };
        var edtiBox = function() {

            var eleSms=$('.J-qudao'),
                eleS=$('.J-school');
            var callback=function () {
                if(ajaxDuanxin != undefined){
                    $('.J-qudao select').val(datasCur.smsChannelId);
                }
                slectChange();
               $('.J-qudao select').on('change',function () {
                    slectChange();
                });
            };
            var slectChange=function () {
                var _inputSnum=$('input[name="smsNums"]');
                var ed=$('.J-qudao option:selected').data('smsnums');
                $('.J-nums').html(ed);
                $(_inputSnum).attr('max',ed);
            };
            common.getSmsChannels(eleSms,callback);
            var em=1,p={page:0,count:0};
            var cur = {
                "schoolId":datasCur.schoolId,
                "schoolName":datasCur.schoolName
            }
            common.getSchoolItem(eleS,p,em,null,cur)

        };
        var chkBox = function() {
        };

        var renderInfo=function () {
            var ele=$('#proId').find("option:selected");
            var oldPrice=ele.data('price'),brief=ele.data('brief');
            $('.J-oldPrice').text(oldPrice);
            $('.J-editor').html(brief);
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
                mmg.load(_dataParams);
            }
        };

        var doAdmin=function () {
            var ele=$('.J-school');
            var em=0,p={page:0,count:0};
            common.getSchoolItem(ele,p,em,commonFun);
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
            };

            _dataParams=parama;
        }

        return parama;

    }
};


//执行
bag._init();