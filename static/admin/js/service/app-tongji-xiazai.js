options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $appDownLogs; //app下载统计配置信息
        common.powerFlag(powers,1);
        var items = [

            { title:'设备系统', name:'deviceSys' ,width:90, align:'center'},
            { title:'下载时间', name:'downDate' ,width:90, align:'center'},
            { title:'app版本', name:'version' ,width:90, align:'center'},
            { title:'下载地址', name:'downUrl' ,width:230, align:'center',renderer:function (val,row) {
                return '<a href="'+val+'" target="_blank">'+val+'</a>'
            }},
            { title:'系统', name:'system' ,width:100, align:'center',renderer:function (val,row) {
                var state="";
                switch (val){
                    case 0:
                        state="ios";
                        break;
                    case 1:
                        state="android";
                        break;
                    case 2:
                        state="win";
                        break;
                }
                return state;
            }},
            { title:'说明', name:'remark' ,width:120, align:'center'},
            { title:'创建时间', name:'insertDate' ,width:90, align:'center'}
        ];

        var addBox= function() {



        };
        var edtiBox = function() {

        };
        var chkBox = function() {
            var _w= $(window.parent.document),
                eleS=_w.find('.J-school'),
                eleC= _w.find(".J-class");
            eleS.text($('.J-schools select option:selected').text());
            eleC.text($('.J-classs select option:selected').text());
            _w.find('.layui-layer-btn').remove();
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
        }else{
            mmg.load(_dataParams);
        }

        //表格行选中
        if(mmg){
            bag.mmgSelects();
        }

    },
    mmgSelects:function () {
        //表格选中行
        mmg.on('cellSelected',function(e,item,rowIndex,colIndex){
            datasCur=item;
        })
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
        $('#system').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();