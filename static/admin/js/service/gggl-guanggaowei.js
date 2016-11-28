options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $adSpots; //广告位

        common.powerFlag(powers);
        //列
        var items = [
            { title:'名称', name:'name',width:46, align:'center'},
            { title:'宽', name:'width' ,width:120, align:'center'},
            { title:'高', name:'height' ,width:120, align:'center'}
        ];
        var addBox=function(){
            // var eleAdSpot=$('.J-ads');
            // common.getAdSpot(eleAdSpot);
        };
        var edtiBox = function() {
            // var eleAdSpot=$('.J-ads');
            // common.getAdSpot(eleAdSpot);
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

        commonFun();
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keywords').val('');
    }
};


//执行
bag._init();