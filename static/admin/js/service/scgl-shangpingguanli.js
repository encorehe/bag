options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $products; //商品配置信息
        common.powerFlag(powers);

        var items = [{
            title: '封面',
            name: 'coverImg',
            width: 120,
            align: 'center',
            renderer:function(val,row){
                var state="";
                if(val == null || val == "" ){
                    state="未上传";
                }else{
                    var timestamp = Date.parse(new Date());
                    state="<img width='150' height='100' src='http://image.bag61.com/"+val+"?time="+timestamp+"' />";
                } 

               

                return state;
            }
        },{
            title: '商品名',
            name: 'productName',
            width: 120,
            align: 'center'
        },{
            title: '价格',
            name: 'price',
            width: 60,
            align: 'center'
        },{
            title: '库存',
            name: 'numbers',
            width: 30,
            align: 'center',
            renderer:function(val,row){
                if(val == null || val == ""){
                    val = 0;
                }
                return val;
            }
        }, {
            title: '状态',
            name: 'isUse',
            width: 10,
            align: 'center',
            renderer: function(val) {
                if (val == null) {
                    val = 1;
                }
                if (val == 1) {
                    state="<span class='f-blue'>√</span>";
                } else {
                    state="<span class='f-red'>X</span>";
                }
                return state;
            }
        },  {
            title: '操作',
            width: 80,
            align: 'center',
            renderer: function(val, row) {
                var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns = '';
                delBtnsStart = "<a class='iconfont J-qiyong' href='javascript:void(0);' title='上架'>&#xe629;</a>";
                delBtnsEnd = "<a class='iconfont J-tingyong' data-id='1' href='javascript:void(0);' title='下架'>&#xe628;</a>";
                buyBtns = "<a class='iconfont J-goumai' href='javascript:void(0);' title='购买'>&#xe632;</a>";
                btnsHtml = ckBtns;
                if(delFlag){
                    if (row.isUse == 0) {
                        btnsHtml += delBtnsStart;
                    } else {
                        btnsHtml += delBtnsEnd;
                    }
                }
                if (editFlagS) {
                    btnsHtml+=editBtns;
                }
                if (delFlag) {
                    btnsHtml+=delBtns;
                }


                return "<span class='table-action'>"+btnsHtml+"</span>";
            }
        }];

        var commonFun=function (obj) {
            var url=$productCategorys.list.url,
                data={"page":0,"count":0,'isUse':1},
                callback=function(){
                    var datas=ajaxDatas.list;
                    if(datasCur&&zhuangtaiTag=="bianji"){
                        var _html = template('tplFenlei',{list:datas,cur:datasCur.productCategoryId});        
                    }
                    else{
                        var _html = template('tplFenlei',{list:datas});
                    }
                    
                    obj.html(_html);
                };
             common.ajaxSubmitV(url,data,callback)
        };

        var addBox= function() {
            $('#fileName').on('change',function(){
                 common.imgPreview();
            });
            common.creaUeditor('myEditor');
            commonFun($('.layui-layer .J-fenlei'));
            ue.ready(function() {
                ue.addListener('selectionchange',function(){
                    var div = document.getElementById("J-scroll-content");
                    $('.J-content').html(html5Content());
                   
                });

                $('.layui-layer-content').on('scroll',function () {
                    //console.log($(this).scrollTop());
                    var scroolTop=$(this).scrollTop();
                    if(scroolTop<280){
                        $('.J-content').parent().removeClass('mobie-fixed');
                        $("#edui1_toolbarbox").removeAttr("style");
                        $("#edui1_toolbarbox").prev().css('height:auto');
                    }else{
                        $('.J-content').parent().addClass('mobie-fixed');
                        $('#edui1_toolbarbox').css('position:fixed');
                    }
                })

            });

            
        };
        var edtiBox = function() {
             var timestamp = Date.parse(new Date());
            $('#preview').attr('src','http://image.bag61.com/'+datasCur.coverImg+"?time="+timestamp);
            $('#fileName').on('change',function(){
                 common.imgPreview();
            });
            common.creaUeditor('myEditor');
            commonFun($('.layui-layer .J-fenlei'));
            ue.ready(function() {
                 ue.setContent(datasCur.brief);
                 ue.addListener('selectionchange',function(){
                    var div = document.getElementById("J-scroll-content");
                    $('.J-content').html(ue.getContent());
                 });

                $('.layui-layer-content').on('scroll',function () {

                    var scroolTop=$(this).scrollTop();
                    if(scroolTop<280){
                        $('.J-content').parent().removeClass('mobie-fixed');
                        $("#edui1_toolbarbox").removeAttr("style");
                        $("#edui1_toolbarbox").prev().css('height:auto');
                    }else{
                        $('.J-content').parent().addClass('mobie-fixed');
                        $('#edui1_toolbarbox').css('position:fixed');
                    }
                })

            });
           
        };
        var html5Content=function(){
            var _html5= '<meta name="viewport" content="height=device-height,width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" /><style>' +
                        'img{ width:100% !important;display:block;margin:0 auto;} p,div,h1,h2,h3,h4,h5,h6{ margin:0;padding:0;}'+
                        '</style><div id="content">'+ue.getContent()
                        +'</div>';
            return _html5;            
        };
        var chkBox = function() {
            $('.layui-layer-btn').remove();
            $('.J-shangping').html(datasCur.brief);
        };

        var resetFunAdd = function() {

            var eleForm=$('.J-addForm');

                    var callback=function () {
                        var biref=html5Content(),
                            price=$('input[name="price"]').val(),
                            productCategoryId=$('select[name="productCategoryId"]').val(),
                            productName=$('input[name="productName"]').val(),
                            numbers = $('input[name="numbers"]').val(),
                            description = $('textarea[name="description"]').val(),
                            isUse=$('input[name="isUse"]').val();
                            addFields={
                                "brief":html5Content(),
                                "price":price,
                                "productCategoryId":productCategoryId,
                                "isUse":isUse,
                                "productName":productName,
                                "numbers":numbers,
                                "description":description
                            };
                            before = function() {};
                            succes=function() {
                                  if (ajaxData.success == true) {
                                      if($("#fileName").prop('files')[0]==undefined){
                                             common.iframeLayerMsg("添加成功!", 1, function() {
                                                sFlag=false;
                                                mmg.load(_dataParams);
                                            });
                                      }
                                      else{
                                        var kidId=ajaxData.data.id;
                                        $.ajax({
                                            url: $products.upImg.url,
                                            data:{"fileName":"product_"+kidId},
                                            type: 'post',
                                            cache: false,
                                            dataType: 'json',
                                            success: function (data) {
                                                if (data.success == true) {
                                                    Q.AddParams('x:id',kidId);
                                                   // Q.AddParams('key',"kid_"+kidId);
                                                    Q.addEvent("putFinished", function(fsize, res, taking) {
                                                        addFields.id = kidId;
                                                        addFields.coverImg = "product_"+kidId;
                                                        var before = function(){},
                                                             success=function(){
                                                                common.iframeLayerMsg("添加成功!", 1, function() {
                                                                           mmg.load(_dataParams);
                                                                        });
                                                             };

                                                        common.ajaxFunIframe(editUrl,addFields,before,success);
                                                        
                                                    });
                                                    Q.addEvent("putFailure", function(err) {
                                                        alert(err);
                                                    });
                                                    Q.SetToken(data.qiniuTokenStr);

                                                    Q.Upload($("#fileName").prop('files')[0],"product_"+kidId);
                                                }
                                            }
                                        });
                                        }

                                    }  

                            };
                            common.ajaxFunIframe(addUrl,addFields,before,succes);
                    };
                    common.validformIn(eleForm,callback);
        };

        var resetFunEdit = function() {
            var eleForm=$('.J-editForm');

                    var callback=function () {
                        var biref=ue.getContent(),
                            id=$('input[name="id"]').val(),
                            price=$('input[name="price"]').val(),
                            productCategoryId=$('select[name="productCategoryId"]').val(),
                            productName=$('input[name="productName"]').val(),
                            numbers = $('input[name="numbers"]').val(),
                            description = $('textarea[name="description"]').val(),
                            isUse=$('input[name="isUse"]').val();
                            editFields={
                                "id":id,
                                "brief":biref,
                                "price":price,
                                "productCategoryId":productCategoryId,
                                "isUse":isUse,
                                "numbers":numbers,
                                "productName":productName,
                                "description":description
                            };
                            before = function() {};
                            succes=function() {

                                  if (ajaxData.success == true) {
                                      if($("#fileName").prop('files')[0]==undefined){
                                             common.iframeLayerMsg("修改成功!", 1, function() {
                                            sFlag=false;
                                            mmg.load(_dataParams);
                                            });
                                      }
                                      else{
                                        var kidId=datasCur.id;
                                        $.ajax({
                                            url: $products.upImg.url,
                                            data:{"fileName":"product_"+kidId},
                                            type: 'post',
                                            cache: false,
                                            dataType: 'json',
                                            success: function (data) {
                                                if (data.success == true) {
                                                    Q.AddParams('x:id',kidId);
                                                   // Q.AddParams('key',"kid_"+kidId);
                                                    Q.addEvent("putFinished", function(fsize, res, taking) {
                                                        editFields.coverImg = "product_"+kidId;
                                                        var before = function(){},
                                                             success=function(){
                                                                common.iframeLayerMsg("修改成功!", 1, function() {
                                                                            mmg.load(_dataParams);
                                                                        });
                                                             };

                                                        common.ajaxFunIframe(editUrl,editFields,before,success);
                                                    });
                                                    Q.addEvent("putFailure", function(err) {
                                                        alert(err);
                                                    });
                                                    Q.SetToken(data.qiniuTokenStr);

                                                    Q.Upload($("#fileName").prop('files')[0],"product_"+kidId);
                                                }
                                            }
                                        });
                                        }

                                    }  

                            };
                            common.ajaxFunIframe(editUrl,editFields,before,succes);
                    };
                    common.validformIn(eleForm,callback);
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
            },"resetFun":{
                "add":resetFunAdd,
                "edit":resetFunEdit
            }
        });

        bag._do(items,options);

    },
    _do:function (items,options) {
        bag.searchRest();
        common.creatSearch();
        if(mmg==undefined || mmg == null){
            mainCont.getList(items,options);
        }
        else{
            mmg.load(_dataParams);
        }

    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keyWords').val('');
       
    }
};


//执行
bag._init();