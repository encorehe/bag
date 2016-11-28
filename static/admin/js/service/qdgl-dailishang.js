options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $agents; //代理商配置信息
        common.powerFlag(powers);

        var items = [
            { title:'姓名', name:'agentName' ,width:120, align:'center'},
            { title:'用户名', name:'userName' ,width:120, align:'center'},
            { title:'状态', name:'isUse' ,width:30, align:'center',renderer: function(val){
                if(val==null){
                    val=1;
                }
                if(val==1){
                    state="<span class='f-blue'>√</span>";
                }
                else{
                    state="<span class='f-red'>X</span>";
                }
                return state;
            }},
            { title:'父代理', name:'parentName' ,width:120, align:'center',renderer: function(val,row){
                if( val == null){
                    return '一级代理';
                }else{
                    return val;
                }
            }},
            { title:'省', name:'provName' ,width:100, align:'center' },
            { title:'市', name:'cityName' ,width:100, align:'center',hidden: true},
            { title:'区', name:'distName' ,width:100, align:'center',hidden: true},
            { title:'地址', name:'address' ,width:100, align:'center',hidden: true},
            {  title:'网站地址', name:'homePageUrl' ,width:100, align:'center',renderer:function (val,row) {
                if( val != null && val != undefined){
                    return '<a href="http://'+val+'" target="_blank">'+val+'</a>';
                }
            }},
            { title:'加入时间', name:'insertDate' ,width:100, align:'center'},
            { title:'操作',width:80, align:'center', renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns='';
                delBtnsEnd="<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>";
                delBtnsStart="<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>";
                btnsHtml=ckBtns;
                if(row.isUse==0){
                    delBtns+=delBtnsStart;
                }
                else{
                    delBtns+=delBtnsEnd;
                }
                if(editFlagS){
                    btnsHtml+=editBtns;
                }
                if(delFlag){
                    btnsHtml+=delBtns;
                }
                return "<span class='table-action'>"+btnsHtml+"</span>";;
            }}
        ];
        var coders = common.getCode();
        if(coders == 3){
            $('.J-add').remove();
        }
        var loadCitysEdit=function () {
            var objCity=$('.J-citysEdit');
            //省市区联动
            var _prov=datasCur.provId,_city=datasCur.cityId,_dist=datasCur.distId;
            common.selectCitys(objCity,_prov,_city,_dist);
        };
        var addBox= function() {
            var objCity=$('.J-citysAdd');
            //省市区联动
            var _prov='17',_city='169',_dist='',_nodata=null,_require=true;
            common.selectCitys(objCity,_prov,_city,_dist,_nodata,_require);
        };
        var edtiBox = function() {
            var doAdmin=function () {
                loadCitysEdit();
            };
            var doUser=function () {
                loadCitysEdit();
            };
            common.codeFlag(doAdmin,doUser);
        };
        var chkBox = function() {
            var eleS=$('.J-school'),
                eleC= $(".J-class");
            eleS.text($('.J-schools select option:selected').text());
            eleC.text($('.J-classs select option:selected').text());
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

        var doAdmin=function () {
            var caldo=function () {
                bag.searchRest();
                common.creatSearch();
                if(mmg==undefined || mmg == null){
                    mainCont.getList(items,options);
                }
                else{
                    mmg.load(_dataParams);
                }

            };
            var objCity=$('.J-citys');
            //省市区联动
            var _prov='17',_city='169',_dist='',_nodata=null,_require=true;
            common.selectCitys(objCity,_prov,_city,_dist,_nodata,_require,caldo);
        },doUser=function () {
            $('.J-schools,.J-classs').hide();
        };
        common.codeFlag(doAdmin,doUser);
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();