options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $roles; //岗位

        common.powerFlag(powers);
        //列
        var items = [
            { title:'岗位名', name:'roleName' ,width:120, align:'center'},
            { title:'code', name:'code' ,width:30, align:'center'},
            { title:'创建时间', name:'insertDate' ,width:100, align:'center' },
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
            }}
            ,
            { title:'操作',width:80, align:'center', renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns='',
                    delBtnsEnd="<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>",
                    delBtnsStart="<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>",
                    quanxianBtns="<a class='iconfont J-quanxian' data-id='1' href='javascript:void(0);' title='权限分配'>&#xe645;</a>";
                btnsHtml=ckBtns;
                var code = common.getCode();

                if( code == 5 || code == 6 || code == 7 || code == 8 || code == 9 || code == 10 || code == 11){

                }else{
                     if(row.isUse==0){
                        btnsHtml+=delBtnsStart;
                        }
                        else{
                            btnsHtml+=delBtnsEnd;
                        }
                     if(editFlagS){
                        btnsHtml+=editBtns;
                    }
                    if(delFlag){
                        btnsHtml+=delBtns;
                    }
                     btnsHtml+=quanxianBtns;
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
            var classItem={
                title: '班级',
                name: 'className',
                width: 90,
                align: 'center'
            };
            items.splice(2,0,schoolItem);
            items.splice(3,0,classItem);
        }
        var addBox=function(){
            var eleS=$('.layui-layer .J-school');
            var doAdmin=function(){
                    var p={"page":0,"count":0},emptyS=1;
                    if(schoolCurrent==undefined){
                        common.getSchoolItem(eleS,p,emptyS);
                    }else{
                        var sId = schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId;
                        var cur = {"schoolId":sId,'schoolName':schoolCurrent.schoolName},cab = function () {

                        };
                        common.getSchoolItem(eleS,p,emptyS,cab,cur);
                    }
                },
                doUser=function(){
                        $('.J-school').html($('.J-sc').text());
                };
            common.codeFlag(doAdmin,doUser);
        };
        var edtiBox = function() {

            var doAdmin=function(){
                    var ele=$('.layui-layer .J-school'),
                        p={page:0,count:0},
                        em=0,
                        callback=function () {

                        },sCur={
                        "schoolId":datasCur.schoolId,
                        "schoolName":datasCur.schoolName
                    };
                    common.getSchoolItem(ele,p,em,callback,sCur);
                },
                doUser=function(){
                    var ele=$('.layui-layer .J-school');
                    ele.text($.cookie('bag-school'));
                };
            common.codeFlag(doAdmin,doUser);

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
        //权限管理
        mmg.on('cellSelected', function(e, item, rowIndex, colIndex) {
             if ($(e.target).is('.J-quanxian')) {
                datasCur = item;
                var url=$roleprivs.list.url,
                    datas=[],
                        //权限信息
                        area = ['715px', '500px'];
                        title= "分配"+datasCur.schoolName+"的"+datasCur.roleName+"岗位权限";
                        content = template('tplProvies',item);
                        successBack = function() {
                            //获取权限列表
                            bag.getQuanxianList(datasCur.id);
                     },yesFun=function(){
                        var Jdatass = [];
                                        for(var i=0;i<$('.J-all-check').length;i++){
                                            var eleP=$('.J-all-check').eq(i).parent().parent();
                                            _PrivName=eleP.find('.privName').val();
                                            _RoleId=eleP.find('.roleId').val();
                                            _PrivId=eleP.find('.privId').val();
                                            _Add=eleP.find('.powerAdd').prop('checked');
                                            if(_Add==true){
                                                _Add=1;
                                            }else{
                                                _Add=0;
                                            }
                                            _Del=eleP.find('.powerDel').prop('checked');
                                            if(_Del==true){
                                                _Del=1;
                                            }else{
                                                _Del=0;
                                            }
                                            _Edit=eleP.find('.powerEdit').prop('checked');
                                            if(_Edit==true){
                                                _Edit=1;
                                            }else{
                                                _Edit=0;
                                            }
                                            _Chk=eleP.find('.powerChk').prop('checked');
                                            if(_Chk==true){
                                                _Chk=1;
                                            }else{
                                                _Chk=0;
                                            }
                                            _powerString=_Chk+','+_Add+','+_Edit+','+_Del;

                                            if($('.J-all-check').eq(i).prop('checked')){
                                                Jdatass.push({
                                                    'privName':_PrivName,
                                                    'roleId': datasCur.id,
                                                    'privId': _PrivId,
                                                    'power':_powerString
                                                });
                                            }
                                        }
                                        var url=$roleprivs.edit.url,call=function () {
                                            var title ="配置成功!",icon=1,
                                                yesBack = function(){
                                                    mmg.load(_dataParams);
                                                };
                                            var rr=common.layerMsg(title, icon,null,yesBack);
                                        };
                                        quanxianAdd = [{
                                            "name": 'roleprivsJson',
                                            "value": JSON.stringify(Jdatass)
                                        }];
                                        if(Jdatass.length>0){
                                            common.ajaxSubmitV(url,quanxianAdd,call);
                                        }
                     };
                    common.layerConfirm(title, area, content, successBack,yesFun);
             }
        })
    },
    getQuanxianList:function(id){
         var itemSelect=[];
         currentId = datasCur.id;
        //权限

           var url = $roleprivs.list.url
                ,datas=null,
                 callback=function(){
                    datasQx=ajaxDatas.list;
                    var url = $roleprivs.list.url,
                        datas = { "roleId":currentId },
                        callback = function(){
                            currenQx=ajaxDatas.list;
                             if(currenQx&&currenQx.length>0){
                                   for(var i=0;i<datasQx.length;i++){
                                      for(var j=0;j<currenQx.length;j++){
                                        if(datasQx[i].privId == currenQx[j].privId){
                                            currenQx[j].flag = 1;
                                           datasQx[i] = currenQx[j];
                                        }
                                      }
                                   }
                                    for( var i=0;i<datasQx.length;i++){
                                        var qx=datasQx[i].power;
                                        var arr = qx.split(',');
                                        datasQx[i].powerChk=arr[0];
                                        datasQx[i].powerAdd=arr[1];
                                        datasQx[i].powerEdit=arr[2];
                                        datasQx[i].powerDel=arr[3];
                                    }
                                }else{
                                    for( var i=0;i<datasQx.length;i++){
                                        var qx=datasQx[i].power;
                                        var arr = qx.split(',');
                                        datasQx[i].powerChk=arr[0];
                                        datasQx[i].powerAdd=arr[1];
                                        datasQx[i].powerEdit=arr[2];
                                        datasQx[i].powerDel=arr[3];
                                    }
                                }

                                 var _html=template('tplRoleprivs',{list:datasQx});
                                 $('.proviesWrap').html(_html);
                                 $('.J-all-check').on('click',function(){
                                            var th=$(this),thAll=th.parent().parent().find(".J-check");
                                            if(th.prop('checked')){
                                                thAll.prop('checked',true);
                                            }else{
                                                thAll.prop('checked',false);
                                            }
                                        });
                                        $('.J-check').on('click',function () {
                                            var th=$(this),thAll=th.parent().parent().find(".J-all-check");
                                            if(th.prop('checked')){
                                                thAll.prop('checked',true);
                                                th.prop('checked',true);
                                            }else{
                                                th.prop('checked',false);
                                            }
                                            renderCheck();
                                        });

                                        var renderCheck=function (ele) {
                                            var eleTr=$('#mmgRolePrivs tbody tr');
                                            for(var i=0;i<eleTr.length;i++){
                                                var powerChks=$(eleTr).eq(i).find('.powerChk').prop('checked'),
                                                    powerAdds=$(eleTr).eq(i).find('.powerAdd').prop('checked'),
                                                    powerEdits=$(eleTr).eq(i).find('.powerEdit').prop('checked'),
                                                    powerDels=$(eleTr).eq(i).find('.powerDel').prop('checked');
                                                if(powerChks==true&&powerAdds==true&&powerEdits==true&&powerDels==true){
                                                    $(eleTr).eq(i).find('.J-all-check').prop('checked',true);
                                                }

                                                if(powerChks==false&&powerAdds==false&&powerEdits==false&&powerDels==false){
                                                    $(eleTr).eq(i).find('.J-all-check').prop('checked',false);
                                                }

                                            }
                                        };

                                

                        };
                        common.ajaxSubmitV(url,datas,callback);
                }

           common.ajaxSubmitV(url,datas,callback);   
    },
    creatMmg: function(id, options, pageId, callback, loadCallback) {
        tempMmg = $(id).mmGrid({
            multiSelect: true,
            indexCol: options.indexCol,
            checkCol: options.checkCol,
            indexColWidth: 25,
            cols: options.it,
            root: "list",
            width: 'auto',
            height: 'auto',
            fullWidthRows: true,
            autoLoad: true,
            noDataText: "当前查询未获取到任何信息",
            items: options.items,
            cache: false,
            //sortName: 'name',
            sortStatus: 'asc',
            nowrap: false,
            method: 'post',
            showBackboard: false,
            params: options.params,
            plugins: [$(pageId).mmPaginator({
                style: 'plain',
                totalCountName: 'totalCount',
                page: 1,
                pageParamName: 'page',
                limitParamName: 'count',
                limitLabel: '每页{0}条',
                totalCountLabel: '共<span>{0}</span>条记录',
                limit: options.it,
                limitList: [20, 30, 40, 50]
            })]
        });
        tempMmg.on('cellSelected',
            function(e, item, rowIndex, colIndex) {
                if (callback) {
                    callback(e, item, rowIndex, colIndex);
                }
            }).on('loadSuccess',
            function(e, data) {
                if (loadCallback) {
                    loadCallback(e, data);
                }
            });
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
            if(mmg){
               bag.mmgSelects();
            }
        };
        var doAdmin=function(){
                var ele=$('.action .J-schools'),
                    p={page:0,count:0},
                    em=0;
                if(schoolCurrent == undefined){
                    common.getSchoolItem(ele,p,em,commonFun);
                }else{
                    var cur={
                        "schoolId":schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId,
                        "schoolName":schoolCurrent.schoolName
                    };
                    common.getSchoolItem(ele,p,em,commonFun,cur);
                }

            },
            doUser=function(){
                commonFun();
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