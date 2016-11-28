			options = [];
			var bag={
				_init:function () {
					var powers = temD[0].power, //权限
						_con = $attendanceRules; //考勤
					common.powerFlag(powers);

					var items = [
				{
					title: '班级',
					name: 'className',
					width: 100,
					align: 'center',
					renderer:function(val,row){
						if(val == null){
							val='全部班级';
						}

						return val;
					}
				},{
                    title: '类型',
                    name: 'type',
                    width: 100,
                    align: 'center',
                    renderer:function(val,row){
                        var state="";
                        switch(val){
                            case 1:
                                state="教职工";
                                break;
                            case 2:
                                state="班级";
                                break;    
                        }  
                        return state;  
                    }
                },
                {
                title: '有效时间(教职工类型只有上班时间和下班时间)',
                align: 'center',
                cols: [{
                    title: '上学开始/上班时间',
                    name: 'punchInStart',
                    width: 100,
                    align: 'center'
                },{
                    title: '上学结束',
                    name: 'punchInEnd',
                    width: 100,
                    align: 'center'
                },{
                    title: '放学开始/下班时间',
                    name: 'punchOutStart',
                    width: 100,
                    align: 'center'
                },{
                    title: '放学结束',
                    name: 'punchOutEnd',
                    width: 100,
                    align: 'center'
                }]
              }
			,{
				title: '操作',
				width: 80,
				align: 'center',
				renderer: function(val, row) {
					var ckBtns = "<a class='iconfont J-info' href='javascript:void(0);' title='详情'>&#xe61c;</a>",
						editBtns = "<a class='iconfont J-edit' href='javascript:void(0);' title='编辑'>&#xe61a;</a>",
						delBtns = "<a class='iconfont J-del' href='javascript:void(0);' title='删除'>&#xe617;</a>";
					btnsHtml = ckBtns;
					if (editFlagS) {
						btnsHtml += editBtns;
					}
                    if (delFlag) {
                        btnsHtml += delBtns;
                    }
					return "<span class='table-action'>"+btnsHtml+"</span>";
				}
			}];

			var coders=common.getCode();
			if(coders==1||coders==2||coders==3){
				var schoolItem={
					title: '学校',
					name: 'schoolName',
					width: 90,
					align: 'center'
				};
				items.splice(0,0,schoolItem);
			}


            var commonFun=function () {
                if(zhuangtaiTag=="chk"){
                    if(datasCur.type == 1){
                        commmArea();
                     }else{
                         commonClass();
                     }

                     return false;
                }
                var eleType=$('.layui-layer .J-type');
                    eleType.on('change',function () {
                        var eleS=$('.layui-layer .J-school'),eleC=$('.layui-layer .J-class');
                        eleS.empty();
                        eleC.empty();
                       var th=$(this),thv=parseInt(th.val());
                       if(thv==1){
                           //针对职工
                           commmArea();
                       }else{
                           //针对班级
                           commonClass();
                       }
                    });
                    eleType.change();
                    if( zhuangtaiTag == "bianji"){
                        eleType.val(datasCur.type);
                        setTimeout(function(){
                            if( datasCur.type == 1){
                            $('.layui-layer .J-class').empty();
                        }
                        },100);
                        
                    }


               

            };


                    var commmArea=function () {
                        var eleS=$('.layui-layer .J-school'),
                            eleTable = $('.layui-layer .tableStyle');
                            eleTable.find('.J-row-hidden,.J-row').remove();
                        var doAdmin=function () {
                            var p={page:0,count:0},em=1;
                            if(zhuangtaiTag=="zengjia"){
                                eleTable.find('tbody').append(template('tplTeacherDate',{}));
                                if(schoolCurrent != undefined){
                                    var schoolCur = {
                                        "schoolId":schoolCurrent.id?schoolCurrent.id:schoolCurrent.schoolId,
                                        "schoolName":schoolCurrent.schoolName
                                    };
                                        common.getSchoolItem(eleS,p,em,null,schoolCur);
                                    }
                                else{
                                    common.getSchoolItem(eleS,p,em);
                                }
                                
                            }
                            else{
                                eleTable.find('tbody').append(template('tplTeacherDate',datasCur));
                                var cab=function () {

                                },cur={
                                    "schoolId":datasCur.schoolId,
                                    "schoolName":datasCur.schoolName
                                };
                                common.getSchoolItem(eleS,p,em,cab,cur);
                            }

                        },doUser=function () {
                            eleS.text($('.J-sc').text());
                            if(zhuangtaiTag=="zengjia"){
                                eleTable.find('tbody').append(template('tplTeacherDate',{}));
                            }
                            else{
                                eleTable.find('tbody').append(template('tplTeacherDate',datasCur));
                            }
                        };
                        common.codeFlag(doAdmin,doUser);
                    };


                    var commons = function(){
                        $('.J-qufen').on('change',function(e){
                            e.preventDefault();
                            var v = parseInt($(this).val());
                            eleTable.find('.J-row-hidden').remove();
                            if(v==1){
                                if(zhuangtaiTag == "zengjia"){
                                    eleTable.find('tbody').append(template('tplDateBabys2',{}));
                                }else{
                                    eleTable.find('tbody').append(template('tplDateBabys2',datasCur));
                                }

                            }else{
                                if(zhuangtaiTag == "zengjia"){
                                    eleTable.find('tbody').append(template('tplDateBabys1',{}));
                                }else{
                                    eleTable.find('tbody').append(template('tplDateBabys1',datasCur));
                                }
                            }
                        });
                        if(zhuangtaiTag =="zengjia"){
                            $('.J-qufen').change();
                        }else{

                            if(datasCur.punchOutStart2 == null){
                                $('.J-qufen').val(0);
                                $(".J-qufen").trigger("change");
                            }else{
                                $('.J-qufen').val(1);
                                $(".J-qufen").trigger("change");
                            }
                        }
                    };

                    var commonClass=function () {
                        var eleS=$('.layui-layer .J-school'),
                            eleC=$('.layui-layer .J-class');
                            eleTable = $('.layui-layer .tableStyle');
                            eleTable.find('.J-row-hidden').remove();
                        var doAdmin=function () {
                            var em=1,emptyC=0;
                            if(zhuangtaiTag=="zengjia"){
                                eleTable.find('tbody').append(template('tplDateBaby',{}));
                                common.getSchoolAndClassItem(eleS,em,eleC,emptyC);
                            }
                            else{
                                eleTable.find('tbody').append(template('tplDateBaby',datasCur));
                                var fun=function(){},
                                    schoolCur={
                                        "schoolId":datasCur.schoolId,
                                        "schoolName":datasCur.schoolName
                                    },classCur={
                                        "classId":datasCur.classId,
                                        "className":datasCur.className
                                    }
                                    ;
                                common.getSchoolAndClassItem(eleS,em,eleC,emptyC,fun,schoolCur,classCur);
                            }
                            commons();
                            
                        },doUser=function () {
                            eleS.text($('.J-sc').text());
                            var p={'page':0,'count':0},emptyC=0;
                            if(zhuangtaiTag=="zengjia"){
                                eleTable.find('tbody').append(template('tplDateBaby',{}));
                                common.getClass(eleC,emptyC,p);
                            }
                            else{
                                eleTable.find('tbody').append(template('tplDateBaby',datasCur));
                                var fun=function(){},classCur={
                                    "classId":datasCur.classId,
                                    "className":datasCur.className
                                };
                                common.getClass(eleC,emptyC,p,fun,classCur);
                            }

                            commons();

                        };
                        common.codeFlag(doAdmin,doUser);
                    };
      

        //增加
        var addBox= function(){
            commonFun();
        };
        //修改
        var edtiBox=function () {
            commonFun();
        };
        var chkBox=function () {
            commonFun();
        };


                    //删除
        var delRow=function(){
            var _Jtitle=$('.J-title'),
                _Jcontent=$('.J-content');
            _Jtitle.empty('');
            _Jcontent.empty();

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

        var commonFun = function() {
            bag.searchRest();
            common.creatSearch();
            if (mmg == undefined || mmg == null) {
                options[0].params = _dataParams;
                mainCont.getList(items, options);
            } else {
                common.creatSearch();
                mmg.load(_dataParams);
            }
        };
        var doAdmin = function() {
                var eleS = $('.action .J-schools'),
                    emptyS = 0,emptyC=0,
                    eleC = $('.action .J-classs');
                var fun = function() {
                    _dataParams.page = 1;
                    commonFun();
                };
                if(schoolCurrent == undefined){
                    common.getSchoolAndClassItem(eleS, emptyS, eleC,emptyC,fun);
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
                var eleC = $('.J-classs'),
                    emptyC=0,
                    p = {'page':0,'count':0};
                common.getClass(eleC,emptyC,p,commonFun);
            },
            doUser = function() {
                var eleC = $('.J-classs'),
                    emptyC=1,
                    p = {'page':0,'count':0};
                common.getClass(eleC,emptyC,p,commonFun);
            };
        common.codeFlag(doAdmin,doYz,doUser);
    },
    searchRest:function () {
        $('#isUse').val('');
        $('#keyWords').val('');
    }
};


//执行
bag._init();