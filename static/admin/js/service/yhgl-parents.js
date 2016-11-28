options = [];
var bag={
    _init:function () {
        var powers = temD[1].power, //权限
            _con = $user; //家长配置信息
        common.powerFlag(powers);

        var items = [{
            title: '基本信息',
            align: 'center',
            cols: [{
                title: '头像',
                name: 'icon',
                width: 46,
                align: 'center',
                renderer: function(val, row) {
                    var avatar = '';
                    if (val == null || val == "") {
                        if (row.gender == null || row.gender == 1) {
                            avatar = "<span class='avatarMan'>男</span>";
                        } else {
                            avatar = "<span class='avatarWomen'>女</span>";
                        }
                    } else {
                       var timestamp = Date.parse(new Date());
                        avatar = "<span class='imgPhoto'><img src='http://image.bag61.com/" + val + "?time="+timestamp+"'  width='36px' height='36px' /></span>"
                    }
                    return avatar;
                }
            },{
                title: '宝贝称呼',
                name: 'relationshipId',
                width: 120,
                align: 'center',
                renderer:function(val,row){
                 var state ="";
                 if(val == null ){
                    val = 0;
                 }
                 switch (val){
                    case 0:
                        state = "亲属";
                        break;
                    case 1:
                        state = "父亲";
                        break;
                    case 2:
                        state = "母亲";
                        break;
                    case 3:
                        state = "祖父";
                        break;
                    case 4:
                        state = "祖母";
                        break;
                    case 5:
                        state = "外祖父";
                        break;
                    case 6:
                        state = "外祖母";
                        break;    
                    case 7:
                        state = "伯父";
                        break;
                    case 8:
                        state = "伯母";
                        break;
                    case 9:
                        state = "叔父";
                        break;
                    case 10:
                        state = "叔母";
                        break;
                    case 11:
                        state = "舅舅";
                        break;
                    case 12:
                        state = "舅妈";
                        break;
                    case 13:
                        state = "姨父";
                        break;
                    case 14:
                        state = "姨妈";
                        break;                                                   
                 }
                 return state;
                }
            },{
                title: '用户名',
                name: 'userName',
                width: 120,
                align: 'center'
            }, {
                title: '姓名/英文名',
                name: 'name',
                width: 100,
                align: 'center',
                renderer: function(val, row) {
                    var name = "",
                        enname = row.enName,
                        cname = row.name;
                    if (cname == '' || cname == null) {
                        if (enname == '' || enname == null) {
                            name = "未输入";
                        }
                    }
                    if (cname == '' && enname == '') {
                        name = "未输入";
                    } else {
                        if (enname == '' || enname == null) {
                            name = cname;

                        } else if (cname == '' || cname == null) {
                            name = enname;
                        } else {
                            name = cname + '/' + enname;
                        }

                    }

                    return name;

                }
            }, {
                title: '性别',
                name: 'gender',
                width: 30,
                align: 'center',
                renderer: function(val) {
                    if (val == null) {
                        val = 1;
                    }
                    if (val == 1) {
                        sex = "男";
                    } else {
                        sex = "女";
                    }
                    return sex;
                }
            },{
                title: '状态',
                name: 'isUse',
                width: 30,
                align: 'center',
                renderer: function(val,row) {
                    if (val == null || row.relationshipId == null || row.relationshipId == 0) {
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
                title: '手机',
                name: 'telephone',
                width: 90,
                align: 'center'
            }, {
                title: '身份证',
                name: 'idCard',
                width: 100,
                align: 'center'
            }, {
                title: 'qq号',
                name: 'qq',
                width: 100,
                align: 'center'
            }, {
                title: 'email',
                name: 'email',
                width: 60,
                align: 'center'
            }]
        }, {
            title: '操作',
            width: 120,
            name:'code',
            align: 'center',
            renderer: function(val, row) {
                var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
                    editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
                    delBtns = '',                delBtnsEnd = "<a class='iconfont J-tingyong' href='javascript:void(0);' title='停用'>&#xe625;</a>",
                delBtnsStart = "<a class='iconfont J-qiyong' data-id='1' href='javascript:void(0);' title='启用'>&#xe630;</a>";
                babyBtns = "<a class='iconfont J-babys' data-id='1' href='javascript:void(0);' title='宝贝'>&#xe614;</a>";
                btnsHtml = ckBtns;
                var coders = common.getCode();
                if(  row.relationshipId != 0 &&(coders == 1 || coders == 2 || coders == 3 || coders == 4) ){
                    if (row.isUse == 0) {
                    btnsHtml += delBtnsStart;
                    } else {
                        btnsHtml += delBtnsEnd;
                    }
                }
                
                if(editFlagS){
                    btnsHtml+=editBtns;
                }
                if(delFlag  ){

                    btnsHtml+=delBtns;
                }

                return "<span class='table-action'>"+btnsHtml+babyBtns+"</span>";
            }
        }];

        var addBox= function() {
        };
        var edtiBox = function() {
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
    mmgSelects: function() {
        //表格选中行
        mmg.on('cellSelected',
            function(e, item, rowIndex, colIndex) {
                datasCur = item;
                var title,area,content,successBack;
                if ($(e.target).is('.J-babys')) {
                    //弹出宝贝界面
                    area = ['715px', '350px'];
                    title= item.name+"的宝贝信息";
                    content = template('tplBaby', datasCur);
                    successBack = function() {
                        //获取宝贝
                        $('.layui-layer-btn').remove();
                        bag.getJhrList(datasCur.accountId);
                    };
                    common.layerConfirm(title, area, content, successBack);
                }
            })
    },
    getJhrList: function(ids) {
        //1、弹出宝贝界面
        var id = $('#mmgJhr'),
            pageId = $('#paginatorJhr'),
            it = [{
            title: '宝贝基本信息',
            align: 'center',
            cols: [{
                title: '头像',
                name: 'icon',
                width: 46,
                align: 'center',
                renderer: function(val, row) {
                    var avatar = '';
                    if (val == null || val == "") {
                        if (row.gender == null || row.gender == 1) {
                            avatar = "<span class='avatarMan'>男</span>";
                        } else {
                            avatar = "<span class='avatarWomen'>女</span>";
                        }
                    } else {
                        avatar = "<span class='imgPhoto'><img src='http://image.bag61.com/" + val + "'  width='36px' height='36px' /></span>"
                    }
                    return avatar;

                    // http://image.bag61.com/{{ val.filePath }}
                }
            },
                {
                    title: '姓名/英文名',
                    name: 'name',
                    width: 100,
                    align: 'center',
                    renderer: function(val, row) {
                        var name = "",
                            enname = row.enName,
                            cname = row.name;
                        if (cname == '' || cname == null) {
                            if (enname == '' || enname == null) {
                                name = "未输入";
                            }
                        }
                        if (cname == '' && enname == '') {
                            name = "未输入";
                        } else {
                            if (enname == '' || enname == null) {
                                name = cname;
                            } else if (cname == '' || cname == null) {
                                name = enname;
                            } else {
                                name = cname + '/' + enname;
                            }
                        }
                        return name;
                    }
                },
                {
                    title: '性别',
                    name: 'gender',
                    width: 30,
                    align: 'center',
                    renderer: function(val) {
                        if (val == null) {
                            val = 1;
                        }
                        if (val == 1) {
                            sex = "男";
                        } else {
                            sex = "女";
                        }
                        return sex;
                    }
                }]
        },
            {
                title: '入园信息',
                align: 'center',
                cols: [
                    {
                        title: '学校',
                        name: 'schoolName',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '班级',
                        name: 'className',
                        width: 100,
                        align: 'center'
                    },
                    {
                    title: '状态',
                    name: 'isUse',
                    width: 30,
                    align: 'center',
                    renderer: function(val) {
                        if (val == null) {
                            val = 1;
                        }
                        if (val == 1) {
                            state = "√";
                        } else {
                            state = "X";
                        }
                        return state;
                    }
                    },
                    {
                        title: '贝贝号',
                        name: 'kidNO',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '门禁卡',
                        name: 'rfId',
                        width: 40,
                        align: 'center'
                    },
                    {
                        title: '入学日期',
                        name: 'registerTime',
                        width: 100,
                        align: 'center',
                        hidden: true
                    }]
            }];
        var options = {
            "indexCol": true,
            "checkCol": false,
            "it": it,
            /*"params": {
                "parentId" : ids
            },*/
            "url": $kid.list.url+"?parentId="+ids
        };
        bag.creatMmg(id, options, pageId);
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
                if (loadCallback) {
                    loadCallback(e, data);
                }
            });
    },
    _do:function (items,options) {
        var doAdmin=function () {
            bag.getGrids(items);
        },doUser=function () {
            common.creatSearch();
            $('.J-schools,.J-classs').hide();
            bag.getGrids(items);
        };
        common.codeFlag(doAdmin,doUser);
    },
    getGrids:function (items) {
        bag.searchRest();
        common.creatSearch();
        if(mmg==undefined || mmg == null){
            mainCont.getList(items,options);
        }
        else{
            mmg.load(_dataParams);
        }

        if(mmg){
            bag.mmgSelects();
        }


    },
    searchRest:function () {
        $('#isUse').val('');
        $('#gender').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();