options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $imgVideos; //精彩录像配置信息
        common.powerFlag(powers);

        var items = [
            { title: '录像标题', name: 'title', width:120, align: 'center' },
            { title:'班级',name:'className',width:90,align:'center'},
            {
                title: '类型',
                name: 'fileType',
                width: 30,
                align: 'center',
                renderer: function(val,row) {
                    var state = "";
                    if( val == null){
                        val=3;
                    }
                    switch (val) {
                        case 1:
                            state = "照片";
                            break;
                        case 2:
                            state = "视频";
                            break;
                        case 3:
                            state = '视频或照片';
                            break;
                    }
                    return state;

                }
            }, {
                title: '状态',
                name: 'isUse',
                width: 30,
                align: 'center',
                renderer: function(val, row) {
                     if (val == null) {
                        val = 1;
                    }
                    if (val == 1) {
                        state = "<span class='f-blue'>√</span>";
                    } else {
                        state = "<span class='f-red'>X</span>";
                    }
                    return state;

                }
            },
            { title: '创建时间', name: 'insertDate', width: 60, align: 'center' },
            {
                title: '操作',
                name: 'fileType',
                width: 60,
                align: 'center',
                renderer: function(val, row) {

                    var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                        editBtns = "<a  class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                        delBtns = '';
                    delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>";
                    delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>",
                    imgBtns = "<a class='iconfont J-img' href='javascript:void(0);' title='录像管理'>&#xe648;</a>",
                    btnsHtml = ckBtns;
                    if(delFlag){
                        if (row.isUse == 0) {
                            btnsHtml+= delBtnsStart;
                        } else {
                            btnsHtml+= delBtnsEnd;
                        }
                    }
                    if (editFlagS&&val != null) {
                        btnsHtml +=editBtns;
                    }
                    if (delFlag) {
                        btnsHtml+=delBtns;
                    }

                    return "<span class='table-action'>"+btnsHtml+imgBtns+"</span>";
                }
            }
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

        var addBox= function() {
            var eleS=$('.J-school'),
                eleC= $(".J-class"),
                eleDate=$(".J-date");
            var doAdmin=function () {
                var emptyS=1,emptyC=1,
                    fun=function () {
                    common.layerDateYYMM(eleDate);
                };
                common.getSchoolAndClassItem(eleS,emptyS,eleC,emptyC,fun);
            };
            var doUser=function () {
               eleS.text($('.J-sc').text());
                var fun=function () {
                    common.layerDateYYMM(eleDate);
                },p={"page":0,"count":0},emptyC=1;
                common.getClass(eleC,emptyC,p,fun);
            };
            common.codeFlag(doAdmin,doUser);


        };
        var edtiBox = function() {
            var eleS=$('.J-school'),
                eleC=$(".J-class"),
                eleDate=$(".J-date"),
                eleBnum=$('#kidNo');
            var doAdmin=function () {
                var emptyS = 1,emptyC=1;
                var sCur = {
                    "schoolId": datasCur.schoolId,
                    "schoolName": datasCur.schoolName
                };
                var cCur = {
                    "classId": datasCur.classId,
                    "className": datasCur.className
                };
                var fun = function() {
                };
                common.getSchoolAndClassItem(eleS, emptyS, eleC,emptyC, fun, sCur, cCur);
            };
            var doUser=function () {
                eleS.text($('.J-sc').text());
                 var cCur = {
                    "classId": datasCur.classId,
                    "className": datasCur.className
                },emptyC=1,p={"page":0,"count":0},f=function(){};
                common.getClass(eleC,emptyC,p,f,cCur);
            };
            common.codeFlag(doAdmin,doUser);
            eleBnum.val(datasCur.kidNO);

            common.layerDateYYMM(eleDate);
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
    _do:function (items,options) {var commonFun = function() {
        bag.searchRest();
        common.creatSearch();
        if (mmg == undefined || mmg == null) {
            mainCont.getList(items, options);
        } else {
            common.creatSearch();
            mmg.load(_dataParams);
        }
        if(mmg){
             bag.mmgSelects();
        }
    };
        var doAdmin = function() {
                var eleS = $('.action .J-schools'),
                    emptyS = 0,
                    emptyC = 0,
                    eleC = $('.action .J-classs');
                var fun = function() {
                    _dataParams.page = 1;
                    commonFun();
                };
                if(schoolCurrent == undefined){
                    common.getSchoolAndClassItem(eleS,emptyS,eleC,emptyC,fun);
                }else{
                    var cur={
                        "schoolId":schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId,
                        "schoolName":schoolCurrent.schoolName
                    };
                    //eleS,emptyS,eleC,emptyC,fun,schoolCur,classCur
                    common.getSchoolAndClassItem(eleS, emptyS,eleC,emptyC,fun,cur);
                }
            },
            doYz = function() {
                var eleC = $('.J-classs'),emptyC=0,
                    p = {"page":0,"count":0,"schoolId":$.cookie('bag-schoolId')};
                common.getClass(eleC,emptyC,p, commonFun);
            },
            doUser = function() {
                var eleC = $('.J-classs'),emptyC=1,
                    p = {"page":0,"count":0,"schoolId":$.cookie('bag-schoolId')};
                common.getClass(eleC,emptyC,p, commonFun);
            };
        common.codeFlag(doAdmin,doYz,doUser);
    },
    renderPhotos:function (obj) {
        var timestamp = Date.parse(new Date());
        var url=$imgVidos.list.url,
            count = 24,
            datas={"classAlbumId":datasCur.id,"fileType":1,"page":1,"count":count},
            callback=function () {
                if(ajaxDatas.success){
                        var ele = obj;
                        var pages = Math.ceil(ajaxDatas.totalCount/count); //得到总页
                        //调用分页
                        isp = 0;
                        var delD = [],delDId=[],delDfile=[];
                        laypage({
                            cont:'biuuu_city',
                            pages: pages,
                            jump: function(obj){
                                isp++;
                               curPage = obj.curr;
                               datas.page = curPage;
                               var hashPage="";
                               var callback = function(){
                                    ele.html(template('tplPhotos',{list:ajaxDatas.list,"time":timestamp}));
                                    var $lg = $('#lightgallery');

                               			//视频播放
                               			$lg.find('a').on('click',function(e){
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

                                    $('#lightgallery span').on('click',function(e){
                                        e.stopPropagation();
                                        var th = $(this).find('input[name="imgId"]')
                                            ,thChec = th.prop('checked')
                                            ,thP = th.parent().parent()
                                            ,tId = thP.data('id')
                                            ,tFile = thP.data('filepath');
                                            if(thChec){
                                                delDId.push(tId);
                                                delDfile.push(tFile);
                                            }else{
                                                for( var i=0;i<delDId.length;i++){
                                                    if( tId == delDId[i]){
                                                        delDId.splice(i,1);
                                                        delDfile.splice(i,1);
                                                        i--;
                                                    }
                                                }
                                            }
                                    });
                                    //取消
                                    $('.J-reset-btn').on('click',function(e){
                                        e.preventDefault();
                                        var $lgs = $('#lightgallery');
                                            $lgs.find('a').removeClass('active');
                                            $('.del-action').removeClass('active');
                                            $('input[name="imgId"]').prop('checked',false);
                                            delDId=[];
                                            delDfile=[];
                                    });
                                    //确定
                                    $('.J-yes-btn').unbind('click').on('click',function(e){
                                        e.preventDefault();
                                        $(this).addClass('disabled');
                                        if(delDId.length == 0){
                                            var title = "请先选中需要删除的视频"
                                                ,icon = 0
                                                ,callback=function(){
                                                    $('.J-yes-btn').removeClass('disabled');
                                                };
                                            common.iframeLayerMsg(title, icon,callback);
                                        }else{
                                            var delDIdStr = delDId.join()
                                                ,delDfileStr = delDfile.join();
                                            var pareams = {
                                                "id":delDIdStr,
                                                "fileName":delDfileStr,
                                                "type":1
                                            };
                                            common.ajaxSubmitV($imgVidos.del.url,pareams,function(){
                                                var title = "视频删除成功"
                                                ,icon = 1
                                                ,callback=function(){
                                                		$('.del-action').removeClass('active');
                                                		$('.J-yes-btn').removeClass('disabled');
                                                        bag.renderPhotos($('.J-photo'));
                                                };
                                                common.iframeLayerMsg(title, icon,callback);
                                            });  
                                        }
                                    });
                                    //全选
                                    $('.J-checkAlls').on('click',function(){
                                        var th = $(this).find('input[name="imgIdAll"]')
                                            ,thChec = th.prop('checked');
                                            if(thChec){
                                                $('input[name="imgId"]').prop('checked',true);
                                                var dataSource = ajaxDatas.list;
                                                for(var i=0;i<dataSource.length;i++){
                                                    delDId.push(dataSource[i].id);
                                                    delDfile.push(dataSource[i].filePath);
                                                }
                                            }else{
                                                $('input[name="imgId"]').prop('checked',false);
                                            }
                                    })

                                    
                               }
                               common.ajaxSubmitV(url,datas,callback);
                            }
                        });
                        $('.J-delAll').on('click',function(){
                            var $lgs = $('#lightgallery');
                            $lgs.find('a').addClass('active');
                            $('.del-action').addClass('active')
                        });
                        
                     //视频上传
                     $('.J-addPic').unbind('click').on('click',function(){

                        var accountId=$.cookie('bag-user-id'),
                            classAlbumId=datasCur.id;
                             var title = "上传视频",
                             area = ["600px","370px"],
                             content = template("tplUp",{"classAlbumId":classAlbumId,"accountId":accountId}),
                             successBack=function(){
                                var callback = function(){
                                        if($file.files.length>0){
                                            $('.J-up').removeClass('disabled')
                                        }else{
                                            $('.J-up').addClass('disabled')
                                        }
                                        $('.J-up').unbind('click').on('click',function(e){
                                                e.preventDefault();
                                                 $(this).addClass('disabled');
                                                 indexLoading = layer.load(1, {
                                                shade: [0.1, '#fff'] //0.1透明度的背景
                                            });
                                                 var dataImg=$("#fileName").prop('files');
                                                 var datas={
                                                    "classAlbumId":classAlbumId,
                                                    "type":2,
                                                    "accountId":accountId,
                                                    "isCover":0,
                                                    "teacherSaidId":0,
                                                    "ordinal":0
                                                 },
                                                     datass = {"type":"video"},
                                                     dataImgLeng=dataImg.length,
                                                     j=0,
                                                     a=0;
                                                 var img = [];
                                                  $.each(dataImg, function(i,value) {
                                                            $.ajax({
                                                                url: $qiniuVideo.url,
                                                                type: 'post',
                                                                cache: false,
                                                                dataType: 'json',
                                                                success: function (data) {
                                                                    if (data.success == true) {
                                                                        Q.AddParams("x:classAlbumId",classAlbumId);
                                                                        Q.AddParams("x:type",2);
                                                                        Q.AddParams("x:accountId",accountId);
                                                                        Q.AddParams("x:isCover",0);
                                                                        Q.AddParams("x:teacherSaidId",0);
                                                                        Q.AddParams("x:ordinal",0);
                                                                        Q.addEvent("putFinished", function(fsize, res, taking) {
                                                                                j++;
                                                                                 if(j==dataImgLeng&&a==0){
                                                                                        layer.close(indexLoading);
                                                                                         bag.renderPhotos($('.J-photo'));
                                                                                        layer.close(layerBox);
                                                                                 }

                                                                            });
                                                                            Q.addEvent("putFailure", function(err) {
                                                                                alert(err);
                                                                            });

                                                                            Q.SetToken(data.qiniuTokenStr);
                                                                            Q.Upload($("#fileName").prop('files')[i]);
                                                                    }
                                                                }
                                                            });

                                                  });
                                             })
                                        };
                                    common.upVideo($('#fileName'),callback);
                             };
                         common.layerBox(title,area,content,successBack);
                     });

                     
                }
            };
        common.ajaxSubmitV(url,datas,callback);
    },
    mmgSelects:function () {
        //表格选中行
        mmg.unbind('cellSelected').on('cellSelected',function(e,item,rowIndex,colIndex){
            datasCur=item;
            if ($(e.target).is('.J-img')) {
                //弹出
                var area =['850px', '480px'],
                    content=template('photoList',{}),
                    successBack=function () {
                        $('.layui-layer-btn').remove();
                        accountId=$.cookie('bag-user-id');
                        bag.renderPhotos($('.J-photo'));
                    };
                common.layerBox('视频',area,content,successBack);
            }
        })
    },
    formEmpty:function () {
        $(parent.document).find('.J-add-form').empty();
        $(parent.document).find('.J-btn-add').removeClass('disabled');
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