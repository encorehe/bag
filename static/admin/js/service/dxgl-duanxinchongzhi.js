options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $smsRecharges; //短信充值

        common.powerFlag(powers);
        //列
        var items = [
            { title:'短信条数', name:'smsNums' ,width:120, align:'center'},
            {title:'金额', name:'money' ,width:120, align:'center'},
            { title:'付款类型', name:'payState' ,width:120, align:'center',renderer:function (val,row) {
                var state = "";
                if (val == null) {
                    val = 1;
                }
                switch(val){
                    case 0:
                        state = "<span class='f-red'>待支付</span>";
                        break;
                    case 1:
                        state = "<span class='f-blue'>已支付</span>";
                        break;
                    case 2:
                        state = "<span class='f-blue'>线下付款</span>";
                        break;    
                }
                return state;
            }},
            { title:'渠道', name:'smsChannelName' ,width:120, align:'center'},
            { title:'充值时间', name:'insertDate' ,width:120, align:'center'},
            { title:'操作', name:'payState' ,width:60, align:'center',renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                     payBtns="<a class='iconfont J-pay' href='javascript:void(0);' title='去付款'>&#xe63a;</a>";
                btnsHtml="";
                if (val == 0) {
                        btnsHtml += payBtns;
                    } 
                if(editFlagS){
                   // btnsHtml+=editBtns;
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
                var ed=$('.J-qudao option:selected').data('price');
                $('.J-price').html(ed);
            };
            common.getSmsChannels(eleSms,callback);
            var eleS=$('.J-school'),em=0,p={page:0,count:0};
            var cab=function () {

            };
            common.getSchoolItem(eleS,p,em,cab);
            var text_2 = function(){
                var num = parseInt($('input[name="smsNums"]').val()),
                    price = parseFloat($('.J-price').text());
                    total = num*price;
                    $('.J-total').text(total);
            };
            $('input[name="smsNums"]').keyup( $.debounce( 250, text_2 ) ); 

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
                var ed=$('.J-qudao option:selected').data('price');
                $('.J-price').html(ed);
            };
            common.getSmsChannels(eleSms,callback);
            var em=1,p={page:0,count:0};
            var cur = {
                "schoolId":datasCur.schoolId,
                "schoolName":datasCur.schoolName
            }
            common.getSchoolItem(eleS,p,em,null,cur);
            var text_2 = function(){
                var num = parseInt($('input[name="smsNums"]').val()),
                    price = parseFloat($('.J-price').text());
                    total = num*price;
                    $('.J-total').text(total);
            };
            $('input[name="smsNums"]').keyup( $.debounce( 250, text_2 ) ); 

        };
        var chkBox = function() {
        };

        var renderInfo=function () {
            var ele=$('#proId').find("option:selected");
            var oldPrice=ele.data('price'),brief=ele.data('brief');
            $('.J-oldPrice').text(oldPrice);
            $('.J-editor').html(brief);
        };


        var resetFunAdd = function(){
                var eleForm=$('.J-addForm');
                var callback=function () {
                        qudaoName = $('select[name="smsChannelId"]').find('option:selected').text();
                        var addFields = eleForm.serialize(),
                            before = function() {},
                            succes=function() {
                                if (ajaxData.success == true) {
                                    var item = ajaxData.data;
                                    item.smsChannelName = qudaoName;
                                    var title="订单支付",area=['415px', '280px'],content=template('tplPay',item),
                                    successBack=function () {
                                        var elePay=$('.J-pays'),eleForm=$('#form-pay');
                                        $('.layui-layer-btn').remove();
                                        var data={"out_trade_no":item.id};
                                        elePay.on('click',function () {
                                            var th=$(this);
                                            th.addClass('disabled');
                                            window.open('./tpl/payDx.html?out_trade_no='+item.id);
                                        });
                                    };
                                     common.layerConfirm(title, area, content, successBack);
                                    // layer.closeAll();
                                    // common.iframeLayerMsg("添加成功!", 1, function() {
                                    //     debugger;
                                    // });
                                }
                            };
                            common.ajaxFunIframe(addUrl,addFields,before,succes);
                    };
                    common.validformIn(eleForm,callback);
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
            },"resetFun":{
                "add":resetFunAdd
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

             //表格行选中
        if(mmg){
            mmg.on('loadSuccess',function(){
                bag.mmgSelects();
            });
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
    mmgSelects:function () {
        //表格选中行
        mmg.on('cellSelected',function(e,item,rowIndex,colIndex){
            datasCur=item;
            if ($(e.target).is('.J-pay')) {
                var title="订单支付",area=['415px', '280px'],content=template('tplPay',item),
                    successBack=function () {
                        var elePay=$('.J-pays'),eleForm=$('#form-pay');
                        $('.layui-layer-btn').remove();
                        var data={"out_trade_no":datasCur.id};
                        elePay.on('click',function () {
                            var th=$(this);
                            th.addClass('disabled');
                            window.open('./tpl/payDx.html?out_trade_no='+datasCur.id);
                        });
                    };
                common.layerConfirm(title, area, content, successBack);
            }
        })
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