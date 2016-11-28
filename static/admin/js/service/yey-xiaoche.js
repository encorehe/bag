options = [];
zhuangtaiTags = "";
var itemscxc = [],
    babyAll = [],
    curbabys = [],
    oldBaby = [],
    zdCur,
    kidCur;
var bag = {
    _init: function() {
        var powers = temD[1].power, //权限
            _con = $busLines; //校车
        common.powerFlag(powers);

        //列
        var items = [{
            title: '路线名称',
            name: 'lineName',
            width: 100,
            align: 'center'
        }, {
            title: '巴士类型',
            name: 'busType',
            width: 65,
            align: 'center',
            renderer: function(val, row) {
                var state = "";
                switch (val) {
                    case 1:
                        state = "正常";
                        break;
                    case 2:
                        state = "加班";
                        break;
                    case 0:
                        state = "其他";
                        break;
                }
                return state;
            }
        }, {
            title: '终端编号',
            name: 'busTerminalNum',
            width: 80,
            align: 'center'
        }, {
            title: '状态',
            name: 'isUse',
            width: 30,
            align: 'center',
            renderer: function(val, row) {
                var state = "";
                switch (val) {
                    case 1:
                        state = "√";
                        break;
                    case 0:
                        state = "×";
                        break;
                }
                return state;
            }
        }, {
            title: '上学班车',
            align: 'center',
            cols: [ {
                title: '发车时间',
                name: 'toSchDriverTime',
                width: 80,
                align: 'center'
            }, {
                title: '随车老师',
                name: 'toSchTeacherName',
                width: 80,
                align: 'center'
            }]
        },{
            title: '放学班车',
            align: 'center',
            cols: [
            {
                title: '发车时间',
                name: 'fromSchDriverTime',
                width: 80,
                align: 'center'
            },{
                title: '随车老师',
                name: 'fromSchTeacherName',
                width: 80,
                align: 'center'
            }]
        }, {
            title: '操作',
            name: 'id',
            width: 60,
            align: 'center',
            renderer: function(val, row) {

                var ckBtns = "<a class='iconfont J-tabs' data-title='chk' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns = "<a class='iconfont J-tabs' data-title='bianji' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtnsEnd = "<a class='iconfont J-del' href='javascript:void(0);' title='删除'>&#xe617;</a>",
                    delBtnsStart = "<a class='iconfont J-del' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>";
                btnsHtml = ckBtns;
                if (editFlagS) {
                    btnsHtml += editBtns;
                }
                if(delFlag){
                    if (row.isUse == 0) {
                        btnsHtml += delBtnsStart;
                    } else {
                        btnsHtml += delBtnsEnd;
                    }
                }

                return "<span class='table-action'>" + btnsHtml + "</span>";
            }

        }];

        var coders = common.getCode();
        if (coders == 1 || coders == 2 || coders == 3) {
            var schoolItem = {
                title: '学校',
                name: 'schoolName',
                width: 90,
                align: 'center'
            };
            items.splice(3, 0, schoolItem);
        }



        var addBox = function() {
            //添加
            var doAdmin = function() {
                    var eleS = $('.xiaocheAdd .J-school'),
                        emptyS = 1,
                        p = {
                            page: 0,
                            count: 0
                        };
                    eleC = $('.xiaocheAdd .J-class');
                    common.getSchoolItem(eleS, p, emptyS, getWorkerInfo);
                },
                doUser = function() {
                    getWorkerInfo();
                };
            common.codeFlag(doAdmin, doUser);
            //时间
            common.layerDateHHSS($('.J-date'));
        };
        //修改
        edtiBox = function() {
             //时间
            if ($('.J-luxian').html() == "") {
                tabZd();
                luxianTab();
            }

        };
        var chkBox = function() {
            var eleS = $('.J-school'),
                eleC = $(".J-class");
            eleS.text($('.J-schools select option:selected').text());
            eleC.text($('.J-classs select option:selected').text());
            $('.layui-layer-btn').remove();
        };


        var getWorkerInfo = function(t) {
            //得到教职工信息
            var p = {"page":0,"count":0};
            if( zhuangtaiTags == "bianji" ){
                p.schoolId = datasCur.schoolId;
            }
            if( zhuangtaiTag == "zengjia" ){
                var sId = $('.xiaocheAdd input[name="schoolId"]').val();
                if(sId != undefined){
                    p.schoolId = sId;
                }

            }
            ajaxDatas(p);

        };

        var ajaxDatas = function(p) {
           p.isUse = 1;
            //ajax得到 司机和老师的信息
            $.getJSON($teachers.list.url, p, function(results) {
                dataWorkers = results.list;
                var sjAray = [],
                    jsAray = [];
                if (dataWorkers && dataWorkers.length > 0) {
                    for (var i = 0; i < dataWorkers.length; i++) {
                        if (dataWorkers[i].code == "SJ") {
                            sjAray.push(dataWorkers[i]);
                        }
                        if (dataWorkers[i].code == "JZG" || dataWorkers[i].code == "JS") {
                            jsAray.push(dataWorkers[i]);
                        }
                    }
                    

                }

                renderDatas(sjAray, jsAray);

            });
        };

        var renderDatas = function(sjData, jsData) {
            //渲染得到的数据
            var _sjHtml = template("tplTeachers", {
                    list: sjData
                }),
                _jsHtml = template("tplTeachers", {
                    list: jsData
                });
            $('.J-siji').html(_sjHtml);
            $('.J-teacher').html(_jsHtml);
            var eleObj = $('.J-siji,.J-teacher');
            eleObj.on('change', function() {
                var th = $(this),
                    tel = th.find("option:selected").attr("data-telephone");
                sjInpt = th.parent().parent().next().find("input");
                sjInpt.val(tel);
            });
            eleObj.change();
            if(zhuangtaiTags == "bianji"){
                //司机
                $('select[name="toSchDriverid"]').val(datasCur.toSchDriverid);
                $('select[name="fromSchDriverid"]').val(datasCur.fromSchDriverid);
                //教师
                $('select[name="toSchTeacherid"]').val(datasCur.toSchTeacherid);
                $('select[name="fromSchTeacherid"]').val(datasCur.fromSchTeacherid);
                
            }
        };

        var editTpl = function() {
            var _html = template("editTpl", datasCur);
            $('.J-luxian').html(_html);
             common.layerDateHHSS($('.J-date'));
            if(zhuangtaiTags == 'chk'){
				$('.J-luxian').find('.btn-act').remove();
            }
            var schoolNameCur = datasCur.schoolName,
                schoolIdCur = datasCur.schoolId;
            var commFun = function() {
                var formEdit = $('.J-editForm');
                common.validformSubmit(formEdit);
                formEdit.on('submit', function(e) {
                    e.preventDefault();
                    common.validformSubmit(formEdit);
                    if (sFlag && sFlag == true) {
                        sFlag = false;

                        var fields = formEdit.serialize();
                        var beforBack = function() {},
                            successBacks = function() {
                                if (ajaxData.success == true) {
                                    var message = "修改成功",
                                        title = "贝安港提示",
                                        callback = function() {
                                            layer.closeAll();
                                            mmg.load(_dataParams);
                                        };
                                    jAlert(message, title, callback);
                                }
                            };
                        common.ajaxFunIframe($busLines.edit.url, fields, beforBack, successBacks);
                    }

                });
            };
            getWorkerInfo();
            commFun();


        };

        //编辑查看时 路线tab
        var luxianTab = function() {
            editTpl();
        };

        //编辑查看时 站点tab
        var tabZd = function() {
            var _html = template('tplZhandian', datasCur);
            $('.J-zhandian').html(_html);
            if (zhuangtaiTags == "chk") {
                $('.J-addZD').remove();
            }

            var it = [{
                title: '站点',
                name: 'name',
                width: 120,
                align: 'center'
            }, {
                title: '幼儿数',
                name: 'kidCount',
                width: 90,
                align: 'center',
                renderer: function(val) {
                    if (val == null || val == undefined || val == "") {
                        val = 0;
                    }
                    return val;
                }
            }, {
                title: '坐标(经/纬)',
                name: 'longitude',
                width: 120,
                align: 'center',
                renderer: function(val, row) {
                    return val + "/" + row.latitude
                }
            }, {
                title: '上学到达时间',
                name: 'amTime',
                width: 30,
                align: 'center'
            }, {
                title: '放学到达时间',
                name: 'pmTime',
                width: 100,
                align: 'center'
            }, {
                title: '操作',
                name: 'code',
                width: 80,
                align: 'center',
                renderer: function(val, row) {
                    var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                        editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                        delBtns = "<a class='iconfont J-del' href='javascript:void(0);' title='删除'>&#xe617;</a>",
                        renyuanBtn = "<a class='iconfont J-renyuan' href='javascript:void(0);' title='人员管理'>&#xe63c;</a>";
                    btnsHtml = ckBtns;
                    if (editFlagS == true && zhuangtaiTags == "bianji") {
                        btnsHtml += editBtns;
                    }
                    if (delFlag == true && zhuangtaiTags == "bianji") {
                        btnsHtml += delBtns;
                    }


                    return "<span class='table-action'>" + btnsHtml + renyuanBtn + "</span>";
                }
            }];
            var id = $('#mmgZDs'),
                pageId = $('#paginators');
            var options = {
                "indexCol": true,
                "checkCol": true,
                "it": it,
                "url": $busStops.list.url+"?busLineId="+datasCur.id
            };
            //站点
            zdmmg = bag.creatMmg(id, options, pageId);

            zdmmg.on('cellSelected',
                function(e, item, rowIndex, colIndex) {

                    var itsc = $(this).find('tbody tr').eq(rowIndex);
                    if ($(itsc).hasClass('selected')) {
                        for (var i = 0; i < itemscxc.length; i++) {
                            if (item.id == itemscxc[i].id) {
                                itemscxc.splice(i, 1);
                                i--;
                            }
                        }
                    } else {
                        itemscxc.push(item);
                    }
                    if ($(e.target).is('.J-edit')) {
                        //修改站点
                        item.busLineId = datasCur.id;
                        busStopsData = item;
                        var layerZd = layer.open({
                            title: '修改站点',
                            closeBtn: 2,
                            content: template('tplZdEdit', item),
                            area: ["900px", "800px"],
                            success: function() {
                                common.biaoZhu(busStopsData.longitude, busStopsData.latitude);
                                var formEdit = $('.J-zdForm');
                                common.validformSubmit(formEdit);
                                common.layerDateHHSS($(formEdit.find('.J-date')));
                            },
                            yes: function() {
                                var eleForm = $('.J-zdForm');
                                var callback = function() {
                                    var fields = eleForm.serialize();
                                    var beforBack = function() {},
                                        successBacks = function() {
                                            if (ajaxData.success == true) {
                                                var message = "站点信息修改成功!",
                                                    title = "贝安港提示",
                                                    callback = function() {
                                                        layer.close(layerZd);
                                                        zdmmg.load();
                                                    };
                                                jAlert(message, title, callback);
                                            }
                                        };
                                    common.ajaxFunIframe($busStops.edit.url, fields, beforBack, successBacks);
                                };
                                common.validformIn(eleForm, callback);
                            }
                        });
                    }

                    if ($(e.target).is('.J-del')) {
                        zdCur = item;
                        zdmmg.select(rowIndex);
                        bag.delDataF(zdCur, $busStops.del.url, zdmmg);
                    }

                    if ($(e.target).is('.J-info')) {
                        //查看站点
                        item.busLineId = datasCur.id;
                        busStopsData = item;
                        var layerZd = layer.open({
                            type: 1,
                            title: '查看站点',
                            closeBtn: 2,
                            content: template('tplZdChk', item),
                            area: ["900px", "500px"],
                            success: function() {
                                common.biaoZhu(busStopsData.longitude, busStopsData.latitude);
                            }
                        });
                    }

                    if ($(e.target).is('.J-renyuan')) {
                        zdCur = item;
                        zdmmg.select(rowIndex);
                        var layerPerson = layer.open({
                            title: datasCur.lineName + '路线——' + zdCur.name + '站点-宝贝管理',
                            type: 1,
                            content: template('tplBabyBoxs', {}),
                            area: ["600px", "400px"],
                            closeBtn: 2,
                            success: function() {
                                bag.zdbaby();
                            }
                        });
                    }
                }).on('loadSuccess',
                function(e, data) {

                });



            $('.J-addZD').on('click', function(e) {
                e.preventDefault();

                var layerZd = layer.open({
                    title: '添加站点',
                    closeBtn: 2,
                    content: template('tplZdEdit', {
                        "busLineId": datasCur.id
                    }),
                    area: ["960px", "500px"],
                    success: function() {
                        common.biaoZhu();
                        var formEdit = $('.J-zdForm');
                        common.validformSubmit(formEdit);
                        common.layerDateHHSS($(formEdit.find('.J-date')));
                    },
                    yes: function() {
                        var eleForm = $('.J-zdForm');
                        var callback = function() {
                            var fields = eleForm.serialize();
                            var beforBack = function() {},
                                successBacks = function() {
                                    if (ajaxData.success == true) {
                                        var message = "添加成功",
                                            title = "贝安港提示",
                                            callback = function() {
                                                layer.close(layerZd);
                                                zdmmg.load();
                                            };
                                        jAlert(message, title, callback);
                                    }
                                };
                            common.ajaxFunIframe($busStops.add.url, fields, beforBack, successBacks);
                        };
                        common.validformIn(eleForm, callback);
                    }
                });
            });

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
                "list": _con.list.url,
                "resetPwdUrl": _con.list.url
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
                "titleStart": _con.del.titleStart,
                "titleEnd": _con.del.titleEnd
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
            },
            "tab": {
                "area": ['960px', '520px'],
                "option": [{
                    title: '站点列表',
                    content: '<div class="tabs J-zhandian"></div>'
                }, {
                    title: '路线信息',
                    content: '<div class="tabs J-luxian"></div>'
                }],
                "callback": function() {
                    edtiBox();
                }
            }
        });
        bag._do(items, options);


    },
    zdbaby: function() {
        //宝贝站点
        if (zhuangtaiTags == "chk") {
            $('.zdbb').remove();
        }
        var id = $('#busKid'),
            pageId = $('#paginatorBusKid');
        var it = [{
            title: '姓名',
            name: 'kidsName',
            width: 120,
            align: 'center'
        }, {
            title: '班级',
            name: 'className',
            width: 90,
            align: 'center',
            renderer: function(val) {
                if (val == null || val == undefined || val == "") {
                    val = 0;
                }
                return val;
            }
        }, {
            title: '操作',
            name: 'code',
            width: 80,
            align: 'center',
            renderer: function(val, row) {
                var delBtns = "<a class='iconfont J-del' href='javascript:void(0);' title='删除'>&#xe617;</a>";
                if (zhuangtaiTags == "chk") {
                    btnsHtml = "";
                } else {
                    btnsHtml = delBtns;
                }

                return "<span class='table-action'>" + btnsHtml + "</span>";
            }
        }];



        var options = {
            "indexCol": true,
            "checkCol": false,
            "it": it,/*
            "params": {
                "busStopId": zdCur.id
            },*/
            "url": $busKids.list.url+"?busStopId="+zdCur.id
        };

        //站点宝贝
        var kidMmg = bag.creatMmg(id, options, pageId);

        kidMmg.on('cellSelected', function(e, item, rowIndex, colIndex) {
            if ($(e.target).is('.J-del')) {
                //删除宝贝
                kidCur = item;
                kidMmg.select(rowIndex);
                bag.delDataF(kidCur, $busKids.del.url + "?busStopId=" + zdCur.id, kidMmg);
            }
        }).on('loadSuccess', function(e, item, rowIndex, colIndex) {
            if (item.success && item.list.length > 0) {
                oldBaby = item.list;
            }
        });


        $('.J-addBb').on('click', function(e) {
            e.preventDefault();
            var layerZd = layer.open({
                title: '添加站点宝贝',
                closeBtn: 2,
                content: template('tplBusKids', {}),
                area: ["800px", "400px"],
                success: function() {
                    curbabys=[];
                    oldBaby=[];
                    bag.babyFind();
                },
                yes: function() {
                    if (curbabys.length == 0) {
                        var message = "您需要选中宝贝",
                            title = "贝安港提示"
                        jAlert(message, title);
                    } else {
                        var tempdata = [];
                        for (var i = 0; i < curbabys.length; i++) {
                            tempdata.push(curbabys[i].id);
                        }
                        var ajaxData = {
                            "busStopId": zdCur.id,
                            "kidId": tempdata
                        };
                        var callback = function() {
                            if (ajaxDatas.success) {
                                var message = "添加站点宝贝成功！",
                                    title = "贝安港提示",
                                    callback = function() {
                                    	curbabys=[];
                                    	oldBaby=[];
                                        layer.close(layerZd);
                                        kidMmg.load();
                                        zdmmg.load();
                                    };
                                jAlert(message, title, callback);
                            }
                        };
                        bag.ajaxSubmitV($busKids.add.url, ajaxData, callback)
                    }
                },
                end: function() {
                    curbabys = [];
                }
            });
        });

    },
    babyFind: function() {
        //站点添加宝贝-通过学校-班级筛选宝贝
        var eleS = $('.layui-layer .J-school-xc'),
            eleC = $(".layui-layer .J-class-xc");
        var commonFun = function() {
            var url = $kid.list.url,
                datas = {"busLineId":datasCur.id},
                _classId = eleC.find('select').val(),
                callback = function() {
                    var _html = "";
                    curbabys = [];
                    if (oldBaby.length > 0) {
                        for (var i = 0; i < oldBaby.length; i++) {
                            var name = oldBaby[i].kidsName,
                                id = oldBaby[i].kidId;
                            curbabys.push({
                                "name": name,
                                "id": id
                            });
                        }
                    }
                    if (ajaxDatas.success && ajaxDatas.list.length > 0) {
                        bag.renderBabyAll();
                    } else {
                        _html = "无人";
                        $('.J-babys').html(_html);
                    }

                    bag.renderBaby();


                };
            if(  schoolCurrent){
                _schoolId = schoolCurrent.id;
            }else{
                _schoolId = undefined;
            }
            if (_schoolId == undefined) {
                 datas.page = 0;
                 datas.count = 0;
                 datas.schoolId = datasCur.schoolId;
                if (_classId != undefined && _classId != 0) {
                    datas.classId = _classId;
                }
            } else {
                datas.page = 0;
                datas.count = 0;
                datas.schoolId = _schoolId;
                if (_classId != undefined && _classId != 0) {
                    datas.classId = _classId;
                }
            }
            bag.ajaxSubmitV(url, datas, callback)
        };
        var doAdmin = function() {
            var p = {
					'schoolId':datasCur.schoolId,
                    'page': 0,
                    'count': 0
                },
                emptyC = 1;
            var userDo = function() {
                $('.J-school-xc').text(datasCur.schoolName);
                commonFun();
            };
            common.getClass(eleC, emptyC, p, userDo);

        };
        var doUser = function() {
            var p = {
                    'page': 0,
                    'count': 0
                },
                emptyC = 1;
            var userDo = function() {
                $('.J-school-xc').text($('.J-sc').text());
                commonFun();
            };
            common.getClass(eleC, emptyC, p, userDo);
        };
        common.codeFlag(doAdmin, doUser);



    },
    babyCur: function() {
        $('.layui-layer .J-babys label').on('click', function() {
            var th = $(this),
                thd = th.index();
            if (th.hasClass('active')) {
                th.removeClass('active');
                th.find('input').prop('checked', false);
                for (var i = 0; i < curbabys.length; i++) {
                    if (curbabys[i].id == babyAll[thd].id) {
                        curbabys.splice(i, 1);
                        i--;
                    }
                }
            } else {
                th.addClass('active');
                th.find('input').prop('checked', true);
                curbabys.push(babyAll[thd]);
            }

            //console.log(curbabys);
            bag.renderBaby();

        })
    },
    renderBabyAll: function() {
        babyAll = ajaxDatas.list;
        if (curbabys.length > 0) {
            for (var i = 0; i < babyAll.length; i++) {
                for (var j = 0; j < curbabys.length; j++) {
                    if (babyAll[i].id == curbabys[j].id) {
                        babyAll[i].checkedflag = true;
                    }
                };
            }
        }
        _html = template('tplBaby', {
            list: babyAll
        });
        $('.J-babys').html(_html);
        bag.babyCur();
    },
    renderBaby: function() {
        //渲染已选中的宝贝
        $('.J-curBabys').html(template('tplBabyCur', {
            list: curbabys
        }));
        $('.layui-layer .J-curBabys label').on('click', function() {
            var th = $(this),
                thd = th.index();
            if (th.hasClass('active')) {
                th.remove();
                for (var i = 0; i < curbabys.length; i++) {
                    if (curbabys[i].id == curbabys[thd].id) {
                        for (var j = 0; j < babyAll.length; j++) {
                            if (curbabys[i].id == babyAll[j].id) {
                                babyAll[j].checkedflag = false;
                            }
                        }
                        curbabys.splice(i, 1);
                    }
                }

            }
            bag.renderBaby();
            bag.renderBabyAll();

        })
    },
    delDataF: function(datas, url, mmgName) {
    	delD = datas;
        var delData = [],
            delDatas = {};
        if (datas.length != undefined && datas.length > 0) {
            for (var i = 0; i < datas.length; i++) {
                delData.push(datas[i].id);
            }
            delDatas.id = delData;
        } else {
            for (var j = 0; j < allData.length; j++) {

                if (allData[j].id == datas.id) {
                    mmgName.select(j);
                }
            }
            delData.push(datas.id);
            delDatas.id = delData;
        }

        //console.log(delDatas);
        var _titleEmpty = "您还未选中需要删除的数据",
            _titleQr = "是否确定删除!",
            _titleYes = "删除成功";

        if (itemsc.length == 0) {
            common.iframeLayerMsg(_titleEmpty, 2);
            return;
        }

        var yesBack = function() {
            var beforBacks = function() {},
                successBack = function() {
                	for( var i=0;i<oldBaby.length;i++){
						if(delD.kidId == oldBaby[i].kidId){
								oldBaby.splice(i,1);
								i--;
						}
                	}
                    $('.checkAll').prop('checked', false);
                    common.iframeLayerMsg(_titleYes, 1, function() {
                        itemscxc = [];
                        mmgName.load();
                    });
                };
            common.ajaxFunIframe(url, delDatas, beforBacks, successBack);
        };
        var cancel = function() {
            mmgName.deselect("all");
        };
        common.layerMsgFlag(_titleQr, yesBack, cancel);

    },

    creatMmg: function(id, options, pageId) {
        mmgss = $(id).mmGrid({
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

        return mmgss;
    },
    _do: function(items, options) {
        var commonFun = function() {
            bag.searchRest();
            common.creatSearch();
            if (mmg == undefined || mmg == null) {
                mainCont.getList(items, options);
            } else {
                common.creatSearch();
                mmg.load(_dataParams);
            }
            //表格行选中
            if (mmg) {
                bag.mmgSelects();
            }
        };
        var doAdmin = function() {
                var eleS = $('.J-schools'),
                    p = {
                        "page": 0,
                        "count": 0
                    },
                    emptyS = 0;
                if(schoolCurrent == undefined){
                    common.getSchoolItem(eleS,p,emptyS,commonFun);
                }else{
                    var cur={
                        "schoolId":schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId,
                        "schoolName":schoolCurrent.schoolName
                    };
                    common.getSchoolItem(eleS,p,emptyS,commonFun,cur);
                }

            },
            doUser = function() {
                $('.J-schools').remove();
                commonFun();
            };
        common.codeFlag(doAdmin, doUser);
    },
    mmgSelects: function() {
        //表格选中行
        mmg.on('cellSelected', function(e, item, rowIndex, colIndex) {
            datasCur = item;
            if ($(e.target).is('.J-tabs')) {
                e.stopPropagation(); 
                var title = $(e.target).data('title');
                zhuangtaiTags = title;
                tabOption = [{
                    title: '站点列表',
                    content: '<div class="tabs J-zhandian"></div>'
                }, {
                    title: '路线信息',
                    content: '<div class="tabs J-luxian"></div>'
                }];
                common.layerTabs(['960px', '520px'], tabOption, edtiBox);
            }
        })

    },
    ajaxSubmitV: function(url, datas, callback) {
        //提交数据
        //bag.ajaxSubmitV(url,datas,callback)
        $.ajax({
            type: "post",
            url: url,
            data: datas,
            dataType: "json",
            beforeSend: function() {
                index = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
            },
            success: function(data) {
                ajaxDatas = data;
                if (callback) {
                    callback();
                }
            },
            complete: function() {
                // body...
                layer.close(index);
            }
        });
    },
    searchRest: function() {
        $('#isUse').val('');
        $('#gender').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();