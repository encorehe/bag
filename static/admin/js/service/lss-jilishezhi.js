options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $pointTypes; //激励设置-配置信息
        common.powerFlag(powers,1);

        var items = [
            { title:'积分名', name:'pointName' ,width:46, align:'center'},
            { title:'积分数', name:'points' ,width:120, align:'center'},
            { title:'状态', name:'isUse' ,width:100, align:'center',renderer: function(val){
                if(val==0){
                    state="<span class='f-red'>X</span>";
                }else{
                    state="<span class='f-blue'>√</span>";
                }
                return state;
            }},
            { title:'上限', name:'upperLimit' ,width:30, align:'center'},
            { title:'创建时间', name:'insertDate' ,width:60, align:'center'},
            { title:'操作', name:'insertDate' ,width:60, align:'center',renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                delBtnsEnd="<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>";
                delBtnsStart="<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>";
                btnsHtml='';
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
                return "<span class='table-action'>"+btnsHtml+"</span>";
            }}
        ];


        options.push({
            "tpl": {
                "edit": 'editTpl',
                "chk": 'chkTpl',
                "add": 'addTpl'
            },
            "url": {
                "edit": _con.edit.url,
                "list": _con.list.url,
                "del":_con.del.url
            },
            "area": {
                "edit": _con.edit.area
            },
            "title": {
                "edit": _con.edit.title,
                "del": _con.del.title,
                "titleStart": _con.del.titleStart,
                "titleEnd": _con.del.titleEnd
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