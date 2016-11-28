options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $agentOrders; //代理订单配置信息
        common.powerFlag(powers);

        var items = [
            { title:'订单号', name:'orderNO' ,width:120, align:'center'},
            { title:'状态', name:'isUse' ,width:30, align:'center',renderer: function(val){
                if(val==null){
                    val=0;
                }
                if(val==0){
                    state="<span class='f-red'>待支付</span>";
                } else if( val == 1){
                    state="<span class='f-blue'>配送中</span>";
                } else if( val == 2){
                    state="<span class='f-blue'>完成</span>";
                } else if( val == 3){
                    state="<span class='f-gray'>无效</span>";
                }
                return state;
            }},
            { title:'总金额', name:'total' ,width:30, align:'center'},
            { title:'创建时间', name:'insertDate' ,width:60, align:'center'},
            { title:'完结时间', name:'endDate' ,width:60, align:'center'},
            {title:'订单商品详细',name:'orderDetail', align: 'left',width:190,renderer:function(val,row){
                var _html="";
                for(var i=0;i<val.length;i++){
                    _html+='<span class="spandisc">商品:'+val[i].proName+'<i>数量：'+val[i].number+'</i>单价:'+val[i].price+'</span>'
                }
                return _html;
            }},
            { title:'操作',width:80, align:'center', renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    payBtns="<a class='iconfont J-pay' href='javascript:void(0);' title='去付款'>&#xe63a;</a>"
                editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>";
                btnsHtml=ckBtns;
                if(editFlagS){
                    btnsHtml+=editBtns;
                }
                if(delFlag){
                    if(row.isUse == 0){
                        btnsHtml+=payBtns;
                    }
                }
                return "<span class='table-action'>"+btnsHtml+"</span>";
            }}
        ];
        var addBox= function() {
        };
        var edtiBox = function() {
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
    mmgSelects:function () {
        //表格选中行
        mmg.on('cellSelected',function(e,item,rowIndex,colIndex){
            datasCur=item;
            if ($(e.target).is('.J-pay')) {
                var title="订单支付",area=['415px', '235px'],content=template('tplPay',item),
                    successBack=function () {
                        var elePay=$('.J-pays'),eleForm=$('#form-pay');
                        $('.layui-layer-btn').remove();
                        var data={"out_trade_no":datasCur.orderNO};
                        elePay.on('click',function () {
                            var th=$(this);
                            th.addClass('disabled');
                            window.open('./tpl/pays.html?out_trade_no='+datasCur.orderNO);
                        });
                    };
                common.layerConfirm(title, area, content, successBack);
            }
        })
    },
    _do:function (items,options) {
        bag.searchRest();


        //tab切换
        $('.tabBar span').on('click',function (e) {
            e.preventDefault();
            var th=$(this),_index=$(this).index();
            if(th.hasClass('current')){
                return false;
            }
            else{
                $('.tabBar span').removeClass('current');
                th.addClass('current');
                switch(_index){
                    case 0:
                        orders=1;
                        break;
                    case 1:
                        orders=0;
                        break;
                }
                common.creatSearch();
                _dataParams.orders=orders;
                if(mmg==undefined || mmg == null){
                    mainCont.getList(items,options);
                }
                else{
                    mmg.load(_dataParams);
                }
            }
        });

        $('.tabBar span').eq(0).click();

        //表格行选中
        if(mmg){
            mmg.on('loadSuccess',function(){
                bag.mmgSelects();
            });
        }

    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keyWords').val('');
    },
    loadParam:function (ind) {
        parama={
            'isUse':$('#isUse').val(),
            'myOrder':ind,
            'keyWords':$('#keyWords').val()
        };
        for(var i in parama){
            if(parama[i]=="" || parama[i]==null || parama[i]==undefined ){
                delete parama[i];
            }
        };
        _dataParams=parama;
        return parama;
    }
};


//执行
bag._init();