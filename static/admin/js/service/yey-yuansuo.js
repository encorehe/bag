options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $schools; //幼儿园配置信息

        common.powerFlag(powers);

        var items = [{
            title: '园所基本信息',
            align: 'center',
            cols: [{
                title: '园名',
                name: 'schoolName',
                width: 120,
                align: 'center'
            }, {
                title: '省/市/区',
                name: 'provName',
                width: 100,
                align: 'center',
                renderer: function(val,row) {
                    var $city = row.cityName;
                    if (val == $city){
                        $city = "直辖市";
                    }
                    var str = val+"/"+$city+"/"+row.distName;
                    return str;
                }
            }, {
                title: '剩余短信',
                name: 'smsBalance',
                width: 80,
                align: 'center'
            }, {
                title: '创建时间',
                name: 'insertDate',
                width: 100,
                align: 'center'
            }, {
                title: '状态',
                name: 'isUse',
                width: 30,
                align: 'center',
                renderer: function(val) {
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
            }, {
                title: '宝贝总数',
                name: 'devicePw',
                width: 80,
                align: 'center'
            }]
        }, {
            title: '园所联系人信息',
            align: 'center',
            cols: [{
                title: '联系人',
                name: 'contactName',
                width: 80,
                align: 'center'
            }, {
                title: '联系人电话/手机号',
                width: 150,
                align: 'center',
                renderer: function(val, row) {
                    var mtel = row.contactTel,
                        stel = row.telephone,
                        tel = "";
                    if (mtel == '' || mtel == null) {
                        if (stel == '' || stel == null) {
                            tel = ""
                        } else {
                            tel = stel;
                        }
                    } else {
                        tel = mtel;
                        if (stel == '' || stel == null) {

                        } else {
                            tel += '/' + stel;
                        }
                    }

                    return tel;
                }
            }]
        }, {
            title: '操作',
            width: 100,
            align: 'center',
            renderer: function(val, row) {
                var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns = '',
                    delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>",
                    delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>",
                    reHuamaiBtn = "<a class='iconfont J-huamaiBtn' href='javascript:void(0);' title='重置华迈账户'>&#xe630;</a>",
                    dailiBtn = "<a class='iconfont J-dailiBtn' href='javascript:void(0);' title='代理商管理'>&#xe651;</a>";
                btnsHtml = ckBtns;
                if(delFlag){
                    if (row.isUse == 0) {
                        btnsHtml += delBtnsStart;
                    } else {
                        btnsHtml += delBtnsEnd;
                    }
                }
                if(editFlagS == true){
                    btnsHtml += editBtns;
                }
                if(delFlag == true){
                    btnsHtml += delBtns;
                }
                var coders = common.getCode();
                if (coders == 1) {
                    btnsHtml += reHuamaiBtn+dailiBtn;
                }
                return "<span class='table-action'>"+btnsHtml+"</span>";
            }
        }];


        var addBox= function() {
            var objCity=$('.J-cityBox'),eleDaili=$('.J-daili');
            //省市区联动
            var prov="17",city="169",dist="1523";
            common.selectCitys(objCity,prov,city,dist);
           // common.getDailis(eleDaili);
        };
        var edtiBox = function() {
            var objCity=$('.J-cityBox');
            //省市区联动
            var _prov=datasCur.provId,_city=datasCur.cityId,_dist=datasCur.distId,eleDaili=$('.J-daili');
            common.selectCitys(objCity,_prov,_city,_dist);
            var dalib=function(){
                eleDaili.find('select').val(datasCur.agentId);
            };
           // common.getDailis(eleDaili,dalib);
           /* if(datasCur.cameraType !=0){
                if(datasCur.cameraType==1){
                    $('.J-laiyuan').text('华麦');
                }else{
                    $('.J-laiyuan').text('海康');
                }
            }*/
        };
        var chkBox = function() {
        };

        var renderInfo=function () {
            var ele=$('#proId').find("option:selected");
            var oldPrice=ele.data('price'),brief=ele.data('brief');
            $('.J-oldPrice').text(oldPrice);
            $('.J-editor').html(brief);
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
        bag.searchRest();
        var obj=$('.J-citys'),prov="",city="",dist="",nodata=null,require=null,
            callback=function () {
               common.creatSearch();

                if(mmg==undefined || mmg == null){
                    options[0].params = _dataParams;
                    mainCont.getList(items,options);
                }
                else{
                    common.creatSearch();
                    isParam = false;
                    mmg.load(_dataParams);
                }

                if(mmg){
                    bag.mmgSelects();
                }

            };
        common.selectCitys(obj,prov,city,dist,nodata,require,callback);
    },getJzgList: function(ids) {
        isParam=true;
        $('.layui-layer-btn').remove();
        //1、弹出教职工界面
        var id = $('#mmgJhr'),
            pageId = $('#paginatorJhr'),
            it =[ {
                title: '姓名',
                name: 'agentName',
                width: 120,
                align: 'center'
            },{
                title: '登录名',
                name: 'userName',
                width: 90,
                align: 'center'
            },{
                title: '省份',
                name: 'provName',
                width: 90,
                align: 'left'
            },{
                title: '操作',
                name: 'provName',
                width: 90,
                align: 'left',
                renderer:function(){
                  var delBtns = "<a class='iconfont J-delDailischools' style='padding-left:19px;' href='javascript:void(0);' title='解除此代理商与学校的关系'>&#xe617;</a>";
                  return delBtns;
                }
            }];
        var options = {
            "indexCol": true,
            "checkCol": false,
            "it": it,
            // "params": {
            //     "schoolId":ids
            // },
            "url": $agentSchools.list.url+"?schoolId="+ids
        };
        var callback = function(e, item, rowIndex, colIndex) {
            if ($(e.target).is('.J-delDailischools')) {
                //弹出是否重置华迈账户
                var _titleQr = "是否要解除此代理商与学校的关系",
                    id=[];
                id.push(item.id);
                fields = {
                    "id": id
                };
                yesBack = function() {
                    beforBack = function() {};
                    successBacks = function() {
                        if (ajaxData.success == true) {
                            common.iframeLayerMsg("代理商与学校的关系解除成功!", 1,function () {
                                tempMmg.load();
                            });
                        }
                    };
                    common.ajaxFunIframe( $agentSchools.del.url,fields, beforBack, successBacks);
                };
                common.layerMsgFlag(_titleQr, yesBack);
            }
        };
        var loadCallback = function(e, data) {
        };
        bag.creatMmg(id, options, pageId, callback, loadCallback);

        var getDailishang = function () {
            var url = $agents.list.url;
            var obj = $('.J-dailshangCitys');
            var provId = obj.find('#provId').val(),
                cityId = obj.find('#cityId').val(),
                distId = obj.find('#distId').val();
            var datas = {};
            if(provId != null && provId != "" && provId != undefined){
                datas.provId = provId;
            }
            if(cityId != null && cityId != "" && cityId != undefined){
                datas.cityId = cityId;
            }
            if(distId != null && distId != "" && distId != undefined){
                datas.distId = distId;
            }
            callback = function(){
                if(ajaxDatas.success){
                    var _html = template('tplSelectDailishang',{list:ajaxDatas.list});
                    $('#dailishang').html(_html);
                }
            };
            common.ajaxSubmitV(url,datas,callback);
        };

        //新增监护人
        $('.J-addJhr').on('click',
            function(e) {
                e.preventDefault();
                var addLayer = layer.open({
                    type: 1,
                    closeBtn: 2,
                    title:"选择代理商",
                    content: template('tplDailishang', {}),
                    btn: ["下一步"],
                    area: ["500px", "230px"],
                    success: function() {
                        var obj=$('.J-dailshangCitys'),prov="17",city="169",dist="1523",nodata=null,require=null,callback=function(){
                           //$agents
                            getDailishang();
                            obj.find('select').on('change',function(){
                                getDailishang();
                            })
                        };
                        common.selectCitys(obj,prov,city,dist,nodata,require,callback);
                    },
                    yes: function() {
                       var schoolId = datasCur.id;
                       var agentId = $('select[name="dailishang"]').val();
                        if( agentId == null || agentId == "" || agentId == undefined){
                            jAlert("请先选中需要关联的代理商","贝安港提示")
                        }else{
                            var url = $agentSchools.add.url,
                                datas = {"schoolId":schoolId,"agentId":agentId},
                                callback = function(){
                                    if(ajaxDatas.success){
                                        layer.close(addLayer);
                                        tempMmg.load();
                                    }
                                };
                            common.ajaxSubmitV(url,datas,callback);
                        }
                    }
                })
            });


    },
    mmgSelects:function(){
        mmg.on('cellSelected',
            function(e, item, rowIndex, colIndex) {
                datasCur = item;
                if ($(e.target).is('.J-huamaiBtn')) {
                    //弹出是否重置华迈账户
                    var _titleQr = "是否要重置华迈账户",
                        schoolId = datasCur.id;
                    fields = {
                        "schoolId": schoolId
                    };
                    yesBack = function() {
                        beforBack = function() {};
                        successBacks = function() {
                            if (ajaxData.success == true) {
                                layer.closeAll();
                                common.iframeLayerMsg("华迈账户重置成功!", 1);
                            }
                        };
                        common.ajaxFunIframe($schools.reHuaMaiAccount,fields, beforBack, successBacks);
                    };
                    common.layerMsgFlag(_titleQr, yesBack);
                }
                if ($(e.target).is('.J-dailiBtn')) {
                    //弹出代理商
                    area = ['915px', '450px'];
                    title= item.schoolName+"-"+"代理商信息";
                    content = template('tplJzg',{});
                    successBack = function() {
                        //获取教职工列表
                        bag.getJzgList(datasCur.id);
                    };
                    common.layerPage(title, area, content, successBack);
                }
            })

    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keyWords').val('');
    },creatMmg: function(id, options, pageId, callback, loadCallback) {
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
            url: options.url,
            items: options.it,
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
                var $bodyH = tempMmg.parent().parent().parent().parent().height();
                tempMmg.parent().height($bodyH-40-108);
                if (loadCallback) {
                    loadCallback(e, data);
                }
            });
    }
};


//执行
bag._init();