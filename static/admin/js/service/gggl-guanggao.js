options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $adverts; //广告

        common.powerFlag(powers);

        //列
        var items = [
            { title:'学校', name:'schoolName',width:90, align:'center',renderer:function(val,row){
               if(val == null){
                   val = "所有学校";
               }
                return val;
            }},
            { title:'广告位', name:'adSpotsName',width:46, align:'center'},
            { title:'类型', name:'type' ,width:120, align:'center',renderer:function(val,row){
                var state="";
                switch(val){
                    case 1:
                        state = "图片";
                        break;
                    case 2:
                         state = "视频";
                        break;
                    case 3:
                         state = "发现";
                        break;        
                }
                return state;
            }},
            { title:'内容', name:'images' ,width:120, align:'center',renderer:function (val,row) {
                var timestamp = Date.parse(new Date());
                if(row.type == 1 || row.type == 3 ){
                    avatar = "<span class='imgPhoto'><img src='http://image.bag61.com/" + val + "?time="+timestamp+"' layer-src='http://image.bag61.com/" + val + "?time="+timestamp+"'  width='36px' height='36px' /></span>";
                }else{
                    avatar = "<span class='imgPhoto'><img src='http://video.bag61.com/"+val+"?vframe/jpg/offset/1/w/480/h/360' layer-src='http://video.bag61.com/"+val+"?vframe/jpg/offset/1/w/480/h/360'  width='36px' height='36px' /></span>";
                }

                return avatar;
            }},
            {title:'是否有效', name:'endDate' ,width:120, align:'center',renderer:function (val,row){
                var str = null;
                if(val == null){
                    str = "长期有效";
                }else{
                    var startTime = val,
                        endTime = common.getNowFormatDate();
                    var isguoqi = common.comparaTime(startTime,endTime);
                    if(isguoqi){
                        str = "无效，已过期";
                    }else{
                        str = "有效";
                    }
                }
                return str;
            }},
            { title:'状态', name:'isUse' ,width:120, align:'center',renderer:function (val,row) {
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
            { title:'跳转目的', name:'target' ,width:120, align:'center'},
            { title:'操作', name:'isUse' ,width:60, align:'center',renderer: function(val,row){
                var ckBtns="<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns="<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>",
                    delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>",

                    btnsHtml=ckBtns;
                if(editFlagS){
                    btnsHtml+=editBtns;
                }
                if(delFlag==true){
                    if( val==null){
                        val=1;
                    }
                    switch (val){
                        case 1:
                            btnsHtml+=delBtnsEnd;
                            break;
                        case 0:
                            btnsHtml+=delBtnsStart;
                            break;

                    }
                }
                return "<span class='table-action'>"+btnsHtml+"</span>";
            }}
        ];


        var picContent = function(){
            $('.J-ad-content').html(template('tplPic',{}));
            if(zhuangtaiTag == "bianji" || zhuangtaiTag == "chk"){
                 $('.J-ad-content').html(template('tplPic',datasCur));
                var timestamp = Date.parse(new Date());
                $('.J-ad-content').find('#preview').attr('src',"http://image.bag61.com/"+datasCur.images+"?time="+timestamp);
                $('.J-ad-content').find('#preview').attr('layer-src',"http://image.bag61.com/"+datasCur.images+"?time="+timestamp);
                layer.photos({
                    photos: '.J-img'
                });
                if(zhuangtaiTag=="chk"){
                    $('input[name="fileName"]').remove();
                    $('input[name="target"]').prop('readonly',true);
                    $('input[name="content"]').prop('readonly',true);
                    $('input[name="stopTime"]').prop('readonly',true);
                }

            }
            if(zhuangtaiTag == "bianji" || zhuangtaiTag == "chk"){
                return false;
            }
            $('.J-ad-content').append('<a class="addAds J-add-pic"  href="javascript:void(0);">+</a>');
            $('.J-add-pic').on('click',function(){
                $(this).before(template('tplPic',{}));
            })
        };
        var videoContent = function(){
            $('.J-ad-content').html(template('tplVideo',{}));
            if(zhuangtaiTag=="bianji" || zhuangtaiTag == "chk"){
                $('.J-ad-content').html(template('tplVideo',datasCur));
                $('input[name="fileName"]').before("<a class='video-player' href='http://video.bag61.com/"+datasCur.images+"'><img width='60px'  src='http://video.bag61.com/"+datasCur.images+"?vframe/jpg/offset/1/w/480/h/360' /></a>");
                 $('.video-player').on('click',function(e){
                    e.preventDefault();
                    var url = $(this).attr('href');
                    var title ="视频播放"
                        ,area=["800px","500px"]
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
                        area: ['800px', '550px'],
                        maxmin: false,
                        success:successBack
                    });

                });
                  if(zhuangtaiTag=="chk"){
                    $('input[name="fileName"]').remove();
                    $('input[name="content"]').prop('readonly',true);
                    $('input[name="stopTime"]').prop('readonly',true);
                }
            }
            $('#fileName').unbind('change').on('change',function(){
                //头像预览
                common.videoPreviewList();
            });
            if(zhuangtaiTag == "bianji" || zhuangtaiTag == "chk"){
                return false;
            }
            $('.J-ad-content').append('<a class="addAds J-add-pic"  href="javascript:void(0);">+</a>');
            $('.J-add-pic').on('click',function(){
                $(this).before(template('tplVideo',{}));
                $('#fileName').ubind('change').on('change',function(){
                    //头像预览
                    common.videoPreviewList();
                });
            })
        };

        var shoppingContent = function(){
            $('.J-ad-content').empty();
            var url=$products.list.url,
            data={"page":0,"count":0},successBack=function(){
                var datas = ajaxData.list;
                var _html = template('tplShoping',{list:datas});
                $('.J-ad-content').html(_html);
                $('select[name="target"]').on('change',function(){
                    var th=$(this),
                        ted=th.find('option:selected'),
                        tname=ted.data('productname'),
                        thp=th.parent().parent(),
                        thd=thp.find('input[name="content"]').val(tname);
                });
                $('select[name="target"]').change();
                 if(zhuangtaiTag == "bianji" || zhuangtaiTag == "chk"){
                    var timestamp = Date.parse(new Date());
                    $('.J-ad-content').find('#preview').attr('src',"http://image.bag61.com/"+datasCur.images+"?time="+timestamp);
                    $('.J-ad-content').find('#preview').attr('layer-src',"http://image.bag61.com/"+datasCur.images+"?time="+timestamp);
                    layer.photos({
                        photos: '.J-img'
                    });
                    $('select[name="target"]').val(datasCur.target);
                    $('input[name="content"]').val(datasCur.content);
                    $('input[name="stopTime"]').val(datasCur.stopTime);
                    if(zhuangtaiTag == "chk"){
                        $('input[name="fileName"]').remove();
                    }
                    return false;
                }
            $('.J-ad-content').append('<a class="addAds J-add-pic"  href="javascript:void(0);">+</a>');
            $('.J-add-pic').on('click',function(){
                $(this).before(template('tplShoping',{list:datas}));

                $('select[name="target"]').on('change',function(){
                    var th=$(this),
                        ted=th.find('option:selected'),
                        tname=ted.data('productname'),
                        thp=th.parent().parent(),
                        thd=thp.find('input[name="content"]').val(tname);
                });
                $('select[name="target"]').change();
            })
            };
            common.ajaxFun(url, data,null, successBack);
        };

        var commonFun=function () {
            //终端
            //得到广告位
             var eleAd=$('.layui-layer .J-ads')
                ,eleS = $('.layui-layer .J-school')
                ,eleAdType = $('.layui-layer .J-ad-type select')
                ,emptyS = 0
                ,ps={"page":0,"count":0}
                ,ads={"page":0,"count":0}
                ,callback=function(){
                     var slectItem = eleAd.find('select option:selected');
                     var _w = slectItem.data('width'),_h=slectItem.data('height');
                     $('.J-chicun').text(_w+"*"+_h);
                     if(parseInt(slectItem.val())==2){
                            eleS.html('所有学校')
                     }else{
                        if(zhuangtaiTag=="bianji"){
                            var cur = {
                                "schoolName":datasCur.schoolName,
                                "schoolId":datasCur.schoolId
                            },cab = function(){

                            },checkeds = "aaa";
                            common.getSchoolItem(eleS,ps,emptyS,cab,cur,checkeds);
                        }else{
                            var cur = {
                            },cab = function(){

                            },checkeds = "aaa";
                            common.getSchoolItem(eleS,ps,emptyS,cab,cur,checkeds);  
                        }
                         
                     }
             };
            $(eleAdType).on('change',function(e){
                e.preventDefault();
                var v = parseInt($(this).val());
                switch(v){
                    case 1:
                        picContent();
                        break;
                    case 2:
                        videoContent();
                        break;
                    case 3:
                        shoppingContent(); //发现
                        break;         
                }
            });
            if(zhuangtaiTag=="chk"){
                if(datasCur.type==1){
                    picContent();
                }

                if(datasCur.type == 2){
                     videoContent();
                }

                if(datasCur.type == 3){
                     shoppingContent();
                }

            }
            $(eleAdType).trigger('change');
                if(zhuangtaiTag=="bianji"){
                    if( datasCur.type == 2){
                        $(eleAdType).val(2);
                     }
                     if(datasCur.type == 3){
                        $(eleAdType).val(3);
                     }
                    var cur = {"id":datasCur.adSpotId};
                    common.getAdSpot(eleAd,ads,callback,cur);

                }
                else{
                    common.getAdSpot(eleAd,ads,callback);
                }


            
            //guanggao

        };

        var addBox=function(){
            commonFun();
        };
        var edtiBox = function() {
            commonFun();
        };
        var chkBox = function() { 
            commonFun();
        };

        var resetFunAdd=function(){
            var fm=$('.J-addForm');
            var callback = function(){
                fields = fm.serializeArray();
                if($("#fileName").prop('files')[0]==undefined){
                   jAlert("请上传广告图片或视频","贝安港提示");

                }else{
                    loadingAd = layer.load(1, {
                        shade: [0.1, '#fff'] //0.1透明度的背景
                    });
                    typeNum = parseInt($('.layui-layer select[name="type"]').val());
                        var images=[],
                            target =[],
                            content=[],
                            stopTime=[],
                            j=0,
                            a=0;
                    if( typeNum == 1 || typeNum==3 ){
                        dataups=upImages;
                        typeName="img";
                    }else{
                        dataups = upVideos;
                        typeName="video";

                    }
                    dataImgLeng = dataups.length;
                        $.each(dataups, function(i,value){
                            $.ajax({
                                url: $qiniu.token.url,
                                data:{type:typeName},
                                type: 'post',
                                cache: false,
                                dataType: 'json',
                                success: function (data) {
                                    if (data.success == true){
                                        Q.addEvent("putFinished", function(fsize, res, taking) {
                                            j++;
                                            images.push(res.key);
                                            switch(typeNum){
                                                case 1:
                                                    target.push($('.layui-layer input[name="target"]').eq(j-1).val());
                                                    content.push($('.layui-layer input[name="content"]').eq(j-1).val());
                                                    stopTime.push($('.layui-layer input[name="stopTime"]').eq(j-1).val());
                                                    break;
                                                case 2:
                                                    target.push("aa");
                                                    content.push($('.layui-layer input[name="content"]').eq(j-1).val());
                                                    stopTime.push($('.layui-layer input[name="stopTime"]').eq(j-1).val());
                                                    break;
                                                case 3:
                                                    target.push($('.layui-layer select[name="target"]').eq(j-1).val());
                                                    content.push($('.layui-layer input[name="content"]').eq(j-1).val());
                                                    stopTime.push($('.layui-layer input[name="stopTime"]').eq(j-1).val());
                                                    break;        
                                            }

                                            if(j==dataImgLeng&&a==0){
                                                a++;
                                                var successBacks = function(){
                                                    if( typeNum == 1 ){
                                                        upImages=[];
                                                    }else{
                                                        upVideos = [];

                                                    }
                                                    layer.closeAll();
                                                    if(options[0].params != null){
                                                        mmg.load(options[0].params);
                                                    }
                                                    else{
                                                        mmg.load();
                                                    }
                                                };
                                                for(var i=0;i<fields.length;i++){
                                                    if(fields[i].name == "images" || fields[i].name == "target" ){
                                                        fields.splice(i,1);
                                                        i--;
                                                    }
                                                }
                                                var datas = {
                                                    "adSpotId":$('select[name="adSpotId"]').val(),
                                                    "type":typeNum,
                                                    "startDate":$('input[name="startDate"]').val(),
                                                    "endDate":$('input[name="endDate"]').val(),
                                                    "images":images,
                                                    "content":content,
                                                    "stopTime":stopTime,
                                                    "target":target
                                                };
                                                if($('input[name="schoolId"]').length>0){
                                                    datas.schoolId = $('input[name="schoolId"]').val();
                                                }
                                                common.ajaxFunIframe(addUrl,datas,null,successBacks);
                                            }
                                        });
                                        Q.addEvent("putFailure", function(err) {
                                            alert(err);
                                        });
                                        Q.SetToken(data.qiniuTokenStr);
                                        if(typeNum == 1 || typeNum == 3){
                                            Q.Upload(upImages[i]);
                                        }else{
                                            Q.Upload(upVideos[i]);
                                        }

                                    }
                                }
                            });
                        });

                }
            };
            common.validformIn(fm,callback);
        };

        var resetFunEdit=function(){
            var fm=$('.J-editForm');
            var callback = function(){
                fields = fm.serializeArray();
                if($("#fileName").prop('files')[0]==undefined&&zhuangtaiTag !="bianji"){
                    jAlert("请上传广告图片或视频","贝安港提示");
                }else{

                    loadingAd = layer.load(1, {
                        shade: [0.1, '#fff'] //0.1透明度的背景
                    });
                    if($("#fileName").prop('files')[0]==undefined&&zhuangtaiTag =="bianji"){
                         typeNum = parseInt($('.layui-layer select[name="type"]').val());
                        var successBacks = function(){
                                                if( typeNum == 1 || typeNum==3 ){
                                                    upImages=[];
                                                }else{
                                                    upVideos = [];

                                                }
                                                layer.closeAll();
                                                if(options[0].params != null){
                                                    mmg.load(options[0].params);
                                                }
                                                else{
                                                    mmg.load();
                                                }
                                            };
                                            var datas = {
                                                "id":datasCur.id,
                                                "adSpotId":$('select[name="adSpotId"]').val(),
                                                "type":typeNum,
                                                "startDate":$('input[name="startDate"]').val(),
                                                "endDate":$('input[name="endDate"]').val(),
                                                "images":datasCur.images,
                                                "oldImages":datasCur.images,
                                                "content":$('input[name="content"]').val(),
                                                "stopTime":$('input[name="stopTime"]').val(),
                                            };
                                            if($('input[name="schoolId"]').length>0){
                                                datas.schoolId = $('input[name="schoolId"]').val();
                                            }
                                            if( typeNum == 1  ){
                                                datas.target = $('input[name="target"]').val();
                                            }
                                            if( typeNum ==2){
                                                datas.target = [""];
                                            }
                                            if( typeNum == 3){
                                                datas.target = $('select[name="target"]').val();
                                            }
                                            common.ajaxFunIframe(editUrl,datas,null,successBacks);
                    }
                    var images="",
                        target ="",
                        j=0,
                        a=0;
                    typeNum = parseInt($('.layui-layer select[name="type"]').val());
                     if( typeNum == 1 || typeNum == 3 ){
                        dataups=upImages;
                        typeName="img";
                    }else{
                        dataups = upVideos;
                        typeName="video";

                    }
                    $.each(dataups, function(i,value){
                        $.ajax({
                            url: $qiniu.token.url,
                            data:{type:typeName},
                            type: 'post',
                            cache: false,
                            dataType: 'json',
                            success: function (data) {
                                if (data.success == true){
                                    Q.addEvent("putFinished", function(fsize, res, taking) {
                                        j++;
                                        images=res.key;
                                        if( typeNum == 1){
                                            target=$('input[name="target"]').eq(0).val();
                                        }

                                        if( typeNum == 3){
                                            target=$('select[name="target"]').eq(0).val();
                                        }

                                        if( typeNum == 2){
                                            target="aa";
                                        }
                                        
                                            var successBacks = function(){
                                                if( typeNum == 1 ){
                                                    upImages=[];
                                                }else{
                                                    upVideos = [];

                                                }
                                                layer.closeAll();
                                                if(options[0].params != null){
                                                    mmg.load(options[0].params);
                                                }
                                                else{
                                                    mmg.load();
                                                }
                                            };
                                            for(var i=0;i<fields.length;i++){
                                                if(fields[i].name == "images" || fields[i].name == "target" ){
                                                    fields.splice(i,1);
                                                    i--;
                                                }
                                            }
                                            var datas = {
                                                "id":datasCur.id,
                                                "adSpotId":$('select[name="adSpotId"]').val(),
                                                "type":typeNum,
                                                "startDate":$('input[name="startDate"]').val(),
                                                "endDate":$('input[name="endDate"]').val(),
                                                "images":images,
                                                "oldImages":datasCur.images,
                                                "content":$('input[name="content"]').val(),
                                                "stopTime":$('input[name="stopTime"]').val(),
                                                "target":target
                                            };
                                            if($('input[name="schoolId"]').length>0){
                                                datas.schoolId = $('input[name="schoolId"]').val();
                                            }
                                            common.ajaxFunIframe(editUrl,datas,null,successBacks);
                                    });
                                    Q.addEvent("putFailure", function(err) {
                                        alert(err);
                                    });
                                    Q.SetToken(data.qiniuTokenStr);
                                    if(typeNum == 1 || typeNum == 3 ){
                                        Q.Upload(upImages[i]);
                                    }else{
                                        Q.Upload(upVideos[i]);
                                    }
                                }
                            }
                        });
                    });
                }
            };
            common.validformIn(fm,callback);
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
            }, "resetFun":{
                "add":resetFunAdd,
                "edit":resetFunEdit
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

        if(mmg){
           // bag.mmgSelects();
        }
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keywords').val('');
    }
};


//执行
bag._init();