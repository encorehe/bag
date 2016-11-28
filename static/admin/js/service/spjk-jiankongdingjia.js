options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $monitorPrice; //监控定价信息
        common.powerFlag(powers);

        var items = [
            { title:'时间(单位：月)', name:'months',width:46, align:'center'},
            { title:'现价(元)', name:'price',width:46, align:'center'},
            { title:'原价(元)', name:'originalPrice',width:46, align:'center'},
            { title:'说明', name:'remark',width:46, align:'center'},
            { title:'状态', name:'isUse' ,width:120, align:'center',renderer:function(val,row){
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
            { title:'创建时间', name:'insertDate' ,width:60, align:'center'},
            { title:'操作', name:'code' ,width:60, align:'center',renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns='';
                delBtnsEnd="<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>";
                delBtnsStart="<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>";
                btnsHtml=ckBtns;
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
                if(delFlag){
                    btnsHtml+=delBtns;
                }
                return "<span class='table-action'>" + btnsHtml+"</span>";
            }}
        ];

       /* var coders=common.getCode();
        if(coders==1||coders==2||coders==3){
            var schoolItem={
                title: '学校',
                name: 'schoolName',
                width: 90,
                align: 'center'
            };
            items.splice(0,0,schoolItem);
        }*/




        var commonFun=function () {
          /*  var ele = $('.layui-layer .J-school'),p={'page':0,'count':0},em=0,cab=function(){},isChecked=true;
            if(zhuangtaiTag=="bianji"){
                var current ={
                    "schoolId":datasCur.schoolId,
                    "schoolName":datasCur.schoolName
                };
                common.getSchoolItem(ele,p,em,cab,current,isChecked);
            }else{
                var current = {};
                common.getSchoolItem(ele,p,em,cab,current,isChecked);
            }*/

        };

        var addBox= function() {
            commonFun();
        };
        var edtiBox = function() {
            commonFun();
        };
        var chkBox = function() {
           /* var eleS=$('.J-school'),
                eleC= $(".J-class");
            eleS.text($('.J-schools select option:selected').text());
            eleC.text($('.J-classs select option:selected').text());*/
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

        var doAdmin=function () {
            var eleS=$('.J-schools'),p={"page":0,"count":0},emptyS=0;
            common.getSchoolItem(eleS,p,emptyS,commonFun);
        },doUser=function () {
            $('.J-schools,.J-classs').hide();
            commonFun();
        };
        common.codeFlag(doAdmin,doUser);
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#gender').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();