options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $productCategorys; //商城管理-商品分类配置信息
        common.powerFlag(powers);

        var items = [
            { title:'类名', name:'categoryName',width:46, align:'center'},
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
            { title:'操作', name:'isUse' ,width:60, align:'center',renderer: function(val,row){
                var editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>",
                    delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>",
                btnsHtml="";
                if(editFlagS){
                    btnsHtml+=editBtns;
                }
                if(delFlag){
                    if( val == null){
                        val=1;
                    }
                    switch (val){
                        case 1:
                            btnsHtml+=delBtnsEnd;
                            break;
                        case 0:
                            btnsHtml+=delBtnsStart;
                            break;
                    }
                }
                return "<span class='table-action'>"+btnsHtml+"</span>";
            }}
        ];
        var addBox = function() {};
        var editBox = function() {};
        var chkBox = function() {};
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
            "mmg": {
                "indexCol": true,
                "checkCol": true,
                "root": "list"
            },
            "callback": {
                "add": addBox,
                "edit":editBox,
                "chk": chkBox
            },
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
        commonFun();

    },
    formEmpty:function () {
        $('.J-add-form').empty();
       $('.J-btn-add').removeClass('disabled');
    },
    ajaxSubmitV:function (url,datas,callback) {
        //提交数据
        $.ajax({
            type: "post",
            url:url,
            data: datas,
            dataType: "json",
            success: function(data){
                ajaxDatas=data;
                if(callback){
                    callback();
                }
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