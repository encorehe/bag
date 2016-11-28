options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $agentOffers; //商品定价配置信息
        common.powerFlag(powers);


        var items = [{
            title: '商品名',
            name: 'proName',
            width: 120,
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
                    state = "√";
                } else {
                    state = "X";
                }
                return state;
            }
        }, {
            title: '商品价格',
            name: 'price',
            width: 120,
            align: 'center'
        },{
            title: '创建时间',
            name: 'insertDate',
            width: 120,
            align: 'center'
        }, {
            title: '操作',
            width: 80,
            align: 'center',
            renderer: function(val, row) {
                var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns = '';
                delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='上架'>&#xe625;</a>";
                delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='下架'>&#xe630;</a>";
                buyBtns = "<a style='display:none' class='iconfont J-goumai' href='javascript:void(0);' title='购买'>&#xe632;</a>";
                btnsHtml = ckBtns;
                if(delFlag){
                    if (row.isUse == 0) {
                        btnsHtml += delBtnsStart;
                    } else {
                        btnsHtml += delBtnsEnd;
                    }
                }
                if (editFlagS) {
                    btnsHtml+=editBtns;
                }
                if (delFlag) {
                    btnsHtml+=delBtns;
                }
                return btnsHtml;
            }
        }];
        var addBox= function() {
            var datas=[],callback=function () {
                var _html=template('tplGoods',{list:ajaxDatas.list});
                $('.J-goods').html(_html);
                renderInfo();
                $('#proId').on('change',function (e) {
                    e.preventDefault();
                    renderInfo();
                })

            };
            common.ajaxSubmitV($ageProducts.list.url,datas,callback);
        };
        var edtiBox = function() {
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
                "checkCol": true,
                "root": "list"
            }
        });

        bag._do(items,options);

    },
    _do:function (items,options) {
        bag.searchRest();
        common.creatSearch();
        if(mmg==undefined || mmg == null){
            mainCont.getList(items,options);
        }
        else{
            mmg.load(_dataParams);
        }




    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();