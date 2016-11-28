options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $teacherSaids; //老师说

        common.powerFlag(powers);

       var caid = parseInt($.cookie('bag-user-id'));
       if(caid == 1){
         $('.btnsArea').append(template('cacheBtn',{}));
       }

        //列
        var items = [
            { title:'内容', name:'content' ,width:46, align:'center',renderer:function(val){
                return '<div class="text-overflow">'+val+'</div>';
            }},
            { title:'文件数', name:'fileNumber' ,width:120, align:'center',hidden:true},
            { title:'文件类型', name:'fileType' ,width:120, align:'center',hidden:true,renderer:function(val){
                var state="";
                if(val==1){
                    state="<span class='f-blue'>照片</span>";
                }else{
                    state="<span class='f-red'>视频</span>";
                }
                return state;
            }},
            { title:'状态', name:'isUse' ,width:100, align:'center',renderer: function(val,row){
                var state="";
                if(val==0){
                    state="<span class='f-red'>x</span>";
                }else{
                    state="<span class='f-blue'>√</span>";
                }
                return state;
            }},
            { title:'老师账号', name:'name' ,width:30, align:'center'},
            { title:'创建时间', name:'insertDate' ,width:60, align:'center'},
            { title:'操作', name:'insertDate' ,width:60, align:'center',renderer: function(val,row){
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

                // if(editFlagS){
                //     btnsHtml+=editBtns;
                // }

                if(delFlag){
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
            var eleAdSpot=$('.J-ads');
            common.getAdSpot(eleAdSpot);
        };
        var edtiBox = function() {
            var eleAdSpot=$('.J-ads');
            common.getAdSpot(eleAdSpot);
        };
        var chkBox = function() {
            if(datasCur.imgVideosList.length>0){
                var timestamp = Date.parse(new Date()),imgs=datasCur.imgVideosList;
                var dat ={
                    "imgs":imgs,
                    "timestamp":timestamp
                };
                var _html = template('imgList',dat);
                $('.J-imgs').html(_html);
                var $lg = $('#lightgallery');

                //视频播放
                $('.J-luxiang').on('click',function(e){
                    e.preventDefault();
                    var url = $(this).attr('href');
                    var title ="视频播放"
                        ,area=["800px","200px"]
                        ,content = template('tplPlayer',{})
                        ,successBack = function(){
                        var flashvars={
                            f:url,
                            c:0
                        };
                        var video=[];
                        video.push(url);
                        setTimeout(function(){
                            CKobject.embed('../lib/CKplayer_v6.7/ckplayer/ckplayer.swf','a1','ckplayer_a1','100%','455px',false,flashvars,video);
                        },500);




                    };
                    layerPlayer= layer.open({
                        title:title,
                        type: 1,
                        content: content,
                        area: ['800px', '500px'],
                        maxmin: false,
                        success:successBack
                    });

                });
            }
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
                var eleS=$('.action .J-schools'),
                    emptyS=0,emptyC=0,
                    eleC=$('.action .J-classs');
                var fun=function(){
                    commonFun();
                };
                common.getSchoolAndClassItem(eleS,emptyS,eleC,emptyC,fun);
            }, doYz=function(){
            var eleC = $('.J-classs'),
                emptyC = 0,
                p = {'page':0,'count':0};
            common.getClass(eleC,emptyC,p,commonFun);
        },
            doUser=function(){
                var eleC = $('.J-classs'),
                    emptyC = 1,
                    p = {'page':0,'count':0};
                common.getClass(eleC,emptyC,p,commonFun);
            };
        common.codeFlag(doAdmin,doYz,doUser);

        var caid = parseInt($.cookie('bag-user-id'));
       if(caid == 1){
         $('.J-cache').on('click',function(e){
            e.preventDefault();
            $(this).addClass('disabled');
            var url = $renCache.url,
                data = null,
                successBack= function(){
                    common.iframeLayerMsg("老师说缓存推送成功!",1);
                },
                completeBack=function(){
                    $('.J-cache').removeClass('disabled');
                }
            common.ajaxFun(url, data,null, successBack, completeBack);
         })
       }
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keywords').val('');
    }
};


//执行
bag._init();