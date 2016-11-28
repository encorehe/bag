options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $ageProducts; //商品配置信息
        common.powerFlag(powers);

        var items = [{
            title: '商品名',
            name: 'proName',
            width: 120,
            align: 'center'
        },{
            title: '终端应用名称',
            name: 'appName',
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
                    state = "<span class='f-blue'>√</span>";
                } else {
                    state = "<span class='f-red'>X</span>";
                }
                return state;
            }
        }, {
            title: '商品价格',
            name: 'price',
            width: 120,
            align: 'center'
        }, {
            title: '商品描述',
            name: 'brief',
            width: 30,
            align: 'center',
            hidden:'true'
        }, {
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
                buyBtns = "<a class='iconfont J-goumai' href='javascript:void(0);' title='购买'>&#xe632;</a>";
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

                btnsHtml+=buyBtns;

                return "<span class='table-action'>"+btnsHtml+"</span>";
            }
        }];

        var addBox= function() {
            //UE.getEditor('myEditor').destroy();
            //common.creaUeditor('myEditor');
        };
        var edtiBox = function() {
            //var eleUeditor=$('#myEditor').attr('id');
            //common.creaUeditor('myEditor');
        };
        var chkBox = function() {
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
        bag.searchRest();
        common.creatSearch();
        if(mmg==undefined || mmg == null){
            mainCont.getList(items,options);
        }
        else{
            mmg.load(_dataParams);
        }

        if(mmg){
            shopcart.init();
        }


    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();