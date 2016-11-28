options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $cameraPermissions; //视频监控 区域控制

        common.powerFlag(powers);
        //列
        var items = [
            { title:'摄像头名称', name:'cameraName',width:46, align:'center'},
            { title:'角色', name:'roleName' ,width:120, align:'center'},
            { title:'操作', name:'insertDate' ,width:60, align:'center',renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns="<a style='display:none;' class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns="<a class='iconfont J-del' href='javascript:void(0);' title='删除'>&#xe617;</a>";
                btnsHtml="";
                if(delFlag==true){
                    btnsHtml+=delBtns;
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
        var addBox=function(){
            var doAdmin=function () {
                var eleS=$('.J-school'),
                    eleR=$('.J-gangwei'),
                    p = { "page":0,"count":0 },
                    fun = function(){
                       var obj=$('.layui-layer .J-carames'),p = { 'page':0,'count':0,'schoolId':$('.layui-layer input[name="schoolId"]').val()} ;
                       common.getCarams(obj,p);
                    },
                    emptyS=1;
                common.getSchoolAndRoleItem(eleS,p,emptyS,eleR,fun);
            };
            var doUser=function () {
                common.getRoles(eleS,eleR);
            };
            common.codeFlag(doAdmin,doUser);
        };
        var edtiBox = function() {
            var eleAdSpot=$('.J-ads');
            common.getAdSpot(eleAdSpot);
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
        };
        var doAdmin=function(){
                var ele=$('.action .J-schools'),
                    em=0,
                    p={page:0,count:0};
                    eleC=$('.action .J-classs');
                common.getSchoolItem(ele,p,em,commonFun);
            },
            doUser=function(){

            };
        common.codeFlag(doAdmin,doUser);
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keywords').val('');
    }
};


//执行
bag._init();