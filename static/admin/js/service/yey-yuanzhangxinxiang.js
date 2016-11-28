options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $emailBoxs; //园长信箱-配置信息
        common.powerFlag(powers);

        var items = [
            { title:'标题', name:'title' ,width:100, align:'center'},
            { title:'内容', name:'content' ,width:400, align:'center'},

            { title:'发件人', name:'senderName' ,width:100, align:'center',renderer:function(val,row){
                var state="";
                if(row.isAnonymous==1){
                    state="<span class='f-red'>匿名</span>";
                }else{
                    state=val+"<br><i class='iconfont' style='position:relative;top:2px;'>&#xe60a;</i>"+row.telephone;
                }
                return state;
            }},
            { title:'发信时间', name:'insertDate' ,width:30, align:'center'},
            { title:'操作', name:'replyerId' ,width:30, align:'center',renderer:function (val,row) {
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                huifuBtns="<a class='iconfont J-huifu' href='javascript:void(0);' title='回复'>&#xe635;</a>";
                btnsHtml=ckBtns;
                var coder=common.getCode();
                if((val == null || val == 0)&&coder==4){
                    btnsHtml+=huifuBtns;
                }
                return "<span class='table-action'>"+btnsHtml+"</span>";
            }}
        ];



        var addBox= function() {
            //添加抄送人
            addUsers=[];
            $('.addPerson-btn').on('click',function () {
                var th=$(this),thp=th.parent();
                if( th.hasClass('actived')){
                    th.removeClass('actived');
                    thp.removeClass('actived');
                }
                else{

                    var obj=$('.J-users'),params=[],
                        callback=function () {
                            if(addUsers.length>0){
                                for(var i=0;i<addUsers.length;i++){
                                    for(var j=0;j<res.length;j++){
                                        if(addUsers[i].id==res[j].id){
                                            res.splice(j,1);
                                            j--;
                                        }
                                    }
                                }
                                renderUsers();
                            }
                            else{
                                renderUsers();
                                aClick();
                            }

                        };
                    common.getTeachers("tplTeachers",obj,params,callback);
                    th.addClass('actived');
                    thp.addClass('actived');
                }

            });

            var aClick=function () {
                $('.J-users').find('a').on('click',function () {
                    var th=$(this),thind=th.parent().index();
                    addUsers.push(res[thind]);
                    res.splice(thind,1);
                    renderUsers();
                });
                $('.J-users-add').find('a').on('click',function () {
                    var th=$(this),thind=th.parent().index();
                    res.push(addUsers[thind]);
                    addUsers.splice(thind,1);
                    renderUsers();
                });
            };

            var eleAdd=document.getElementById('usersdd'),
                eleUser=document.getElementById('users');

            var renderUsers=function () {
                var _html = template('tplTeachers', {list: res});
                $('.J-users').html(_html);
                var _htmls = template('tplTeachersDel',{list:addUsers});
                $('.J-users-add').html(_htmls);
                eleAdd.scrollTop=eleAdd.scrollHeight;
                eleAdd.scrollTop=eleUser.scrollHeight;
                aClick();
            };



        };
        var edtiBox = function() {

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
        bag.searchRest();
        common.creatSearch();
        if(mmg==undefined || mmg == null){
            mainCont.getList(items,options);
        }else{
            common.creatSearch();
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
            if ($(e.target).is('.J-huifu')) {
               var title="回复邮件",area=["715px;","500px"],content=template('tplRep',datasCur),successBack=function () {
                   
               },yesBack=function () {
                   var data=$('.J-addsForm').serialize(),beforBack=function () {

                   },successBack=function () {
                       if (ajaxData.success == true) {
                           common.iframeLayerMsg("添加成功!", 1, function() {
                               mmg.load();

                           });
                       }
                   };
                   common.ajaxFunIframe($emailBoxs.edit.url, data, beforBack, successBack);
               };
               common.layerConfirm(title, area, content, successBack, yesBack);
            }
        })
    },
    searchRest:function () {
        $('#keyWords').val('');
    }
};

//执行
bag._init();