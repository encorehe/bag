var configAdmin = {
    init : function (typeName){
        switch (typeName) {
            case 'test':
                configAdmin.test();
                        break;
            case 'formal':
                configAdmin.formal();
                                break;
            default:
                configAdmin.dev();
        }
    },
    dev: function () {
        //开发者模式
        _configbase = {
            "login": "data/login.json",
            "loginOUt": "data/loginOut.json",
            "menu": "data/menu.json",
            "cityList": ""
        };
        //宝贝管理相关数据接口
        $kid = {
            "list": {
                "url": "../data/kidList.json"
            },
            "add": {
                "url": "..data/kidAdd.json",
                "title": "添加宝贝",
                "area": ['715px', '150px']
            },
            "edit": {
                "url": "../data/kidEdit.json",
                "title": "编辑宝贝信息",
                "area": ['715px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看宝贝",
                "area": ['715px', '350px']
            },
            "del": {
                "url": "../data/kidDelete.json"
            }
        };
        //班级相关接口
        _configClass = {
            "list": {
                "url": "../data/kidList.json"
            }
        };


    },
    test: function () {
        var _path = "";
        //测试模式
     //   _path = "http://www.tsaid.com/bag_base/";
    // _path="http://123.59.156.27:8080/bag_base/";
     //_path = "http://192.168.1.206:8080/bag_base/";
    //_path = "http://192.168.1.18:8080/bag_base/";
      //   _path = "http://192.168.1.254:8080/bag_base/";
      // _path = "http://192.168.1.237:8080/bag_base/";
        _path = "./";
        _configbase = {
            "login": _path + "sys/login.do",
            "loginOUt": _path + "sys/loginOut.do",
            "menu": _path + "sys/menuList.do",
            "cityList": _path + "sys/distsList.do",
            "accountsEdit": _path + "sys/accountsEdit.do",
            "accountsRolesList":_path+"sys/accountsRolesList.do",
            "selectRole":_path+"sys/selectRole.do"
        };
        //宝贝管理相关数据接口
        $kid = {
            "list": {
                "url": _path + "sys/kidList.do"
            },
            "add": {
                "url": _path + "sys/kidAdd.do",
                "title": "添加宝贝",
                "area": ['980px', '580px']
            },
            "edit": {
                "url": _path + "sys/kidEdit.do",
                "title": "编辑宝贝信息",
                "area": ['980px', '580px']
            },
            "chk": {
                "url": "",
                "title": "查看宝贝",
                "area": ['980px', '550px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/kidDelete.do"
            },
            "dataAction":{
                "daochuUrl":_path + "sys/kidList.do",
                "daoruUrl":_path + "sys/kidList.do"
            },
            "excel":{
                "daochuUrl":_path + "sys/kidExcels.do",
                "daoruUrl":_path+"sys/uploadFile.do"
            }

        };
        //宝贝门禁卡 kidRfIdsAdd.do
        $kidRfIds = {
            "list": {
                "url": _path + "sys/kidRfIdsList.do"
            },
            "add": {
                "url": _path + "sys/kidRfIdsAdd.do",
                "title": "添加宝贝门禁卡",
                "area": ['980px', '450px']
            },
            "edit": {
                "url": _path + "sys/kidRfIdsEdit.do",
                "title": "编辑宝贝门禁卡信息",
                "area": ['980px', '450px']
            },
            "chk": {
                "url": "",
                "title": "查看宝贝门禁卡信息",
                "area": ['980px', '450px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/kidRfIdsDelete.do"
            }
        };
        //班级相关接口
        $classes = {
            "list": {
                "url": _path + "sys/classesList.do"
            },
            "add": {
                "url": _path + "sys/classesAdd.do",
                "title": "添加班级",
                "area": ['980px', '480px']
            },
            "edit": {
                "url": _path + "sys/classesEdit.do",
                "title": "编辑班级",
                "area": ['980px', '480px']
            },
            "chk": {
                "url": "",
                "title": "查看班级",
                "area": ['980px', '480px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/classesDelete.do"
            }
        };
        //老师关联班级接口
        $teacherClasses = {
            "list": {
                "url": _path + "sys/teacherClassesList.do"
            },
            "add": {
                "url": _path + "sys/teacherClassesAdd.do",
                "title": "添加班级",
                "area": ['980px', '400px']
            },
            "edit": {
                "url": _path + "sys/teacherClassesEdit.do",
                "title": "编辑班级",
                "area": ['980px', '400px']
            },
            "chk": {
                "url": "",
                "title": "查看班级",
                "area": ['980px', '400px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/teacherClassesDelete.do"
            }
        };

        //学校相关接口
        $schools = {
            "list": {
                "url": _path + "sys/schoolsList.do"
            },
            "add": {
                "url": _path + "sys/schoolsAdd.do",
                "title": "添加园所",
                "area": ['980px', '500px']
            },
            "edit": {
                "url": _path + "sys/schoolsEdit.do",
                "title": "编辑园所",
                "area": ['980px', '500px']
            },
            "chk": {
                "url": "",
                "title": "查看园所",
                "area": ['980px', '500px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/schoolsDelete.do"
            },"reHuaMaiAccount": _path + "sys/refreshHuaMaiAccount.do"
        };
        //年级相关接口 ---无
        _configGrade = {
            "list": {
                "url": _path + "sys/schoolsList.do"
            },
            "add": {
                "url": _path + "sys/schoolsAdd.do",
                "title": "添加园所",
                "area": ['980px', '600px']
            },
            "edit": {
                "url": _path + "sys/schoolsEdit.do",
                "title": "编辑园所",
                "area": ['980px', '600px']
            },
            "chk": {
                "url": "",
                "title": "查看园所",
                "area": ['980px', '600px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/schoolsDelete.do"
            }
        };
        //代理
        $agents = {
            "list": {
                "url": _path + "sys/agentsList.do"
            },
            "add": {
                "url": _path + "sys/agentsAdd.do",
                "title": "添加代理商",
                "area": ['980px', '380px']
            },
            "edit": {
                "url": _path + "sys/agentsEdit.do",
                "title": "编辑代理商",
                "area": ['980px', '320px']
            },
            "chk": {
                "url": "",
                "title": "查看代理商",
                "area": ['980px', '320px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/agentsDelete.do"
            }
        };
        //代理学校
        $agentSchools = {
            "list": {
                "url": _path + "sys/agentSchoolsList.do"
            },
            "add": {
                "url": _path + "sys/agentSchoolsAdd.do",
                "title": "添加代理商",
                "area": ['980px', '380px']
            },
            "edit": {
                "url": _path + "sys/agentSchoolsEdit.do",
                "title": "编辑代理商",
                "area": ['980px', '320px']
            },
            "chk": {
                "url": "",
                "title": "查看代理商",
                "area": ['980px', '320px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/agentSchoolsDelete.do"
            }
        };
        //园长
        $principals = {
            "list": {
                "url": _path + "sys/principalsList.do"
            },
            "add": {
                "url": _path + "sys/principalsAdd.do",
                "title": "添加园长",
                "area": ['980px', '500px']
            },
            "edit": {
                "url": _path + "sys/principalsEdit.do",
                "title": "编辑园长",
                "area": ['980px', '500px']
            },
            "chk": {
                "url": "",
                "title": "查看园长",
                "area": ['980px', '500px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/principalsDelete.do"
            },"resetPwdUrl":{
                "url":_path + "sys/accountsResetPassword.do"
            },
            "excel":{
                "daochuUrl":_path + "sys/principalsExcels.do"
            }
        };
        //教职工
        $teachers = {
            "list": {
                "url": _path + "sys/teachersList.do"
            },
            "add": {
                "url": _path + "sys/teachersAdd.do",
                "title": "添加教职工",
                "area": ['980px', '530px']
            },
            "edit": {
                "url": _path + "sys/teachersEdit.do",
                "title": "编辑教职工",
                "area": ['980px', '560px']
            },
            "chk": {
                "url": "",
                "title": "查看教职工",
                "area": ['980px', '420px']
            },"resetPwdUrl":{
                "url":_path + "sys/accountsResetPassword.do"
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/teachersDelete.do"
            },"resetPwdUrl":{
                "url":_path + "sys/accountsResetPassword.do"
            },
            "excel":{
                "daochuUrl":_path + "sys/teachersExcels.do",
                "daoruUrl":_path+"sys/uploadFile.do"
            }
        };
        //验证用户是否已存在接口 --用户详细信息
        $userDetail = {
            "list": {
                "url": _path + "sys/userDetail.do"
            }
        };
        //家长
        $user = {
            "list": {
                "url": _path + "sys/userList.do"
            },
            "add": {
                "url": _path + "sys/userAdd.do",
                "title": "添加家长",
                "area": ['980px', '350px']
            },
            "edit": {
                "url": _path + "sys/userEdit.do",
                "title": "编辑家长信息",
                "area": ['980px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看家长信息",
                "area": ['980px', '300px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/userDelete.do"
            },
            "userDetail": {
                "url": _path + "sys/userDetail.do"

            },
            "userDel": {
                "url": _path + "sys/acctRolesDelete.do"
            },
            "excel":{
                "daochuUrl":_path + "sys/principalsExcels.do"
            },"dateEdit":{
                "url":_path + "sys/acctRolesEdit.do"
            }
        };
        //家长-卡号
        $kidRfIds = {
            "list": {
                "url": _path + "sys/kidRfIdsList.do"
            },
            "add": {
                "url": _path + "sys/kidRfIdsAdd.do",
                "title": "添加家长",
                "area": ['980px', '48%']
            },
            "edit": {
                "url": _path + "sys/kidRfIdsEdit.do",
                "title": "编辑家长信息",
                "area": ['980px', '48%']
            },
            "chk": {
                "url": "",
                "title": "查看家长信息",
                "area": ['980px', '43%']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/kidRfIdsDelete.do"
            }
        };
        //交易明细-积分管理
        $acctpointlogs = {
            "list": {
                "url": _path + "sys/acctpointlogsList.do"
            },
            "add": {
                "url": "",
                "title": "添加积分",
                "area": ['980px', '80%']
            },
            "edit": {
                "url": "编辑积分",
                "title": "编辑家长信息",
                "area": ['980px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看家长信息",
                "area": ['980px', '80%']
            },
            "del": {
                "titleStart": "上架",
                "titleEnd": "下架",
                "url": "删除积分"
            }
        };
        //岗位
        $roles = {
            "list": {
                "url": _path + "sys/rolesList.do"
            },
            "add": {
                "url": _path + "sys/rolesAdd.do",
                "title": "添加岗位",
                "area": ['980px', '250px']
            },
            "edit": {
                "url": _path + "sys/rolesEdit.do",
                "title": "编辑岗位信息",
                "area": ['980px', '250px']
            },
            "chk": {
                "url": _path + "sys/rolesEdit.do",
                "title": "查看岗位信息",
                "area": ['980px', '250px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/rolesDelete.do"
            }
        };
        //商品
        $ageProducts = {
            "list": {
                "url": _path + "sys/ageProductsList.do"
            },
            "add": {
                "url": _path + "sys/ageProductsAdd.do",
                "title": "添加商品",
                "area": ['980px', '450px']
            },
            "edit": {
                "url": _path + "sys/ageProductsEdit.do",
                "title": "编辑商品信息",
                "area": ['980px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看商品信息",
                "area": ['980px', '350px']
            },
            "del": {
                "titleStart": "上架",
                "titleEnd": "下架",
                "url": _path + "sys/ageProductsDelete.do"
            }
        };
        //订单
        $agentOrders = {
            "list": {
                "url": _path + "sys/agentOrdersList.do"
            },
            "add": {
                "url": _path + "sys/agentOrdersAdd.do",
                "title": "下订单",
                "area": ['980px', '330px']
            },
            "edit": {
                "url": _path + "sys/agentOrdersEdit.do",
                "title": "编辑商品信息",
                "area": ['980px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看商品信息",
                "area": ['980px', '350px ']
            },
            "del": {
                "url": _path + "agentOrdersDelete.do"
            }
        };
        //商品定价
        $agentOffers = {
            "list": {
                "url": _path + "sys/agentOffersList.do"
            },
            "add": {
                "url": _path + "sys/agentOffersAdd.do",
                "title": "商品定价",
                "area": ['980px', '350px']
            },
            "edit": {
                "url": _path + "sys/agentOffersEdit.do",
                "title": "编辑商品定价信息",
                "area": ['980px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看商品信息",
                "area": ['980px', '350px']
            },
            "del": {
                "titleStart": "通过",
                "titleEnd": "不通过",
                "url": _path + "agentOffersDelete.do"
            }
        };
        //教学计划
        $teachingPlans = {
            "list": {
                "url": _path + "sys/teachingPlansList.do"
            },
            "add": {
                "url": _path + "sys/teachingPlansAdd.do",
                "title": "添加教学计划",
                "area": ['980px', '600px']
            },
            "edit": {
                "url": _path + "sys/teachingPlansEdit.do",
                "title": "编辑教学计划",
                "area": ['980px', '600px']
            },
            "chk": {
                "url": "",
                "title": "查看教学计划",
                "area": ['980px', '600px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/teachingPlansDelete.do"
            }
        };
        //通知公告
        $notices = {
            "list": {
                "url": _path + "sys/noticesList.do"
            },
            "add": {
                "url": _path + "sys/noticesAdd.do",
                "title": "添加通知公告",
                "area": ['980px', '550px']
            },
            "edit": {
                "url": _path + "sys/noticesEdit.do",
                "title": "编辑通知公告",
                "area": ['980px', '550px']
            },
            "chk": {
                "url": "",
                "title": "查看通知公告",
                "area": ['980px', '350px']
            },
            "del": {
                "titleStart": "通过",
                "titleEnd": "停用",
                "url": _path + "sys/noticesDelete.do"
            }
        };
        //日历管理--学期
        $semesters = {
            "list": {
                "url": _path + "sys/semestersList.do"
            },
            "add": {
                "url": _path + "sys/semestersAdd.do",
                "title": "添加学期",
                "area": ['980px', '350px']
            },
            "edit": {
                "url": _path + "sys/semestersEdit.do",
                "title": "编辑学期",
                "area": ['980px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看学期",
                "area": ['980px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/semestersDelete.do"
            }
        };
        //学周管理--学周
        $weeks = {
            "list": {
                "url": _path + "sys/weeksList.do"
            },
            "add": {
                "url": _path + "sys/weeksAdd.do",
                "title": "添加学周",
                "area": ['980px', '350px']
            },
            "edit": {
                "url": _path + "sys/weeksEdit.do",
                "title": "编辑学周信息",
                "area": ['980px', '360px']
            },
            "chk": {
                "url": "",
                "title": "查看学周信息",
                "area": ['980px', '360px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/weeksDelete.do"
            }
        };
        //考勤规则
        $attendanceRules = {
            "list": {
                "url": _path + "sys/attendanceRulesList.do"
            },
            "add": {
                "url": _path + "sys/attendanceRulesAdd.do",
                "title": "添加考勤规则",
                "area": ['980px', '550px']
            },
            "edit": {
                "url": _path + "sys/attendanceRulesEdit.do",
                "title": "编辑考勤规则信息",
                "area": ['980px', '550px']
            },
            "chk": {
                "url": "",
                "title": "查看考勤规则信息",
                "area": ['980px', '550px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/attendanceRulesDelete.do"
            }
        };
        //考勤记录
        $attendances = {
            "list": {
                "url": _path + "sys/attendancesList.do"
            },
            "add": {
                "url": _path + "sys/attendancesAdd.do",
                "title": "添加请假记录",
                "area": ['980px', '470px']
            },
            "edit": {
                "url": _path + "sys/attendancesEdit.do",
                "title": "编辑考勤记录",
                "area": ['980px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看考勤记录",
                "area": ['980px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/attendancesDelete.do"
            },
            "excel":{
                "daochuUrl":_path + "sys/attendancesExcels.do"
            }
        };
        //食谱
        $recipes = {
            "list": {
                "url": _path + "sys/recipesList.do"
            },
            "add": {
                "url": _path + "sys/recipesAdd.do",
                "title": "添加食谱",
                "area": ['980px', '550px']
            },
            "edit": {
                "url": _path + "sys/recipesEdit.do",
                "title": "编辑食谱",
                "area": ['980px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看食谱",
                "area": ['980px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/recipesDelete.do"
            }
        };
        //班级相册--精彩相册
        $classAlbums = {
            "list": {
                "url": _path + "sys/classAlbumsList.do"
            },
            "add": {
                "url": _path + "sys/classAlbumsAdd.do",
                "title": "添加班级相册",
                "area": ['980px', '350px']
            },
            "edit": {
                "url": _path + "sys/classAlbumsEdit.do",
                "title": "编辑班级相册",
                "area": ['980px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看班级相册",
                "area": ['980px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/classAlbumsDelete.do"
            }
        };

        $imgVidos = {
            "list": {
                "url": _path + "sys/imgVideosList.do"
            },
            "add": {
                "url": _path + "sys/imgVideosAdd.do",
                "title": "上传照片",
                "area": ['980px', '350px']
            },
            "edit": {
                "url": _path + "sys/imgVideosEdit.do",
                "title": "编辑照片",
                "area": ['980px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看班级相册",
                "area": ['980px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/imgVideosDelete.do"
            },
            "detail": {
                "url": _path + "sys/imgVideosList.do",
                "title": "照片查看"
            }
        };

        //精彩录像-详细
        $imgVideos = {
            "list": {
                "url": _path + "sys/classVideosList.do"
            },
            "add": {
                "url": _path + "sys/classVideosAdd.do",
                "title": "添加录像",
                "area": ['980px', '350px']
            },
            "edit": {
                "url": _path + "sys/classVideosEdit.do",
                "title": "编辑录像",
                "area": ['980px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看录像",
                "area": ['980px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/classVideosDelete.do"
            },
            "detail": {
                "url": _path + "sys/classVideosList.do",
                "title": "照片查看"
            }
        };
        $Videos = {
            "list": {
                "url": _path + "sys/imgVideosList.do?fileType=2"
            },
            "add": {
                "url": _path + "sys/imgVideosAdd.do",
                "title": "上传照片",
                "area": ['980px', '350px']
            },
            "edit": {
                "url": _path + "sys/imgVideosEdit.do",
                "title": "编辑照片",
                "area": ['980px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看班级相册",
                "area": ['980px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/imgVideosDelete.do"
            },
            "detail": {
                "url": _path + "sys/imgVideosList.do",
                "title": "照片查看"
            }
        };


        //校车管理
        $busLines = {
            "list": {
                "url": _path + "sys/busLinesList.do"
            },
            "add": {
                "url": _path + "sys/busLinesAdd.do",
                "title": "添加线路",
                "area": ['980px', '450px']
            },
            "edit": {
                "url": _path + "sys/busLinesEdit.do",
                "title": "编辑线路",
                "area": ['980px', '450px']
            },
            "chk": {
                "url": "",
                "title": "查看线路",
                "area": ['980px', '450px']
            },
            "del": {
                "title": "删除",
                "titleEnd": "停止",
                "url": _path + "sys/busLinesDelete.do"
            }
        };
        //站点管理
        $busStops = {
            "list": {
                "url": _path + "sys/busStopsList.do"
            },
            "add": {
                "url": _path + "sys/busStopsAdd.do",
                "title": "添加校车",
                "area": ['980px', '450px']
            },
            "edit": {
                "url": _path + "sys/busStopsEdit.do",
                "title": "编辑校车",
                "area": ['980px', '450px']
            },
            "chk": {
                "url": "",
                "title": "查看校车",
                "area": ['980px', '450px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/busStopsDelete.do"
            }
        };
        //站点关联宝贝
        $busKids = {
            "list": {
                "url": _path + "sys/busKidsList.do"
            },
            "add": {
                "url": _path + "sys/busKidsAdd.do",
                "title": "添加宝贝",
                "area": ['980px', '350px']
            },
            "edit": {
                "url": _path + "sys/busKidsEdit.do",
                "title": "编辑校车",
                "area": ['980px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看校车",
                "area": ['980px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/busKidsDelete.do"
            }
        };
        $baiduMap = {
            "url": [
                "http://api.map.baidu.com/api?v=2.0&ak=9kXqMdGMbmq9jv9PxPV0DXd41lKBKHUS",
                "http://api.map.baidu.com/library/MarkerTool/1.2/src/MarkerTool_min.js",
                "http://api.map.baidu.com/library/CityList/1.4/src/CityList_min.js"
            ]
        };
        //老师说-激励设置
        $pointTypes = {
        "list": {
                "url": _path + "sys/pointTypesList.do"
            },
            "edit": {
                "url": _path + "sys/pointTypesEdit.do",
                "title": "修改激励设置",
                "area": ['980px', '350px']
            },"del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/pointTypesDelete.do"
            }
        };
        //老师说
        $teacherSaids = {
            "list": {
                "url": _path + "sys/teacherSaidsList.do"
            },
            "add": {
                "url": _path + "sys/teacherSaidsAdd.do",
                "title": "添加老师说",
                "area": ['980px', '600px']
            },
            "edit": {
                "url": _path + "sys/teacherSaidsEdit.do",
                "title": "编辑老师说",
                "area": ['980px', '600px']
            },
            "chk": {
                "url": "",
                "title": "查看老师说",
                "area": ['980px', '600px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/teacherSaidsDelete.do"
            }
        };
        //区域控制
        $cameras = {
            "list": {
                "url": _path + "sys/camerasList.do"
            },
            "add": {
                "url": _path + "sys/camerasAdd.do",
                "title": "添加",
                "area": ['980px', '480px']
            },
            "edit": {
                "url": _path + "sys/camerasEdit.do",
                "title": "编辑",
                "area": ['980px', '370px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['980px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/camerasDelete.do"
            }
        };
        //监控定价
        $monitorPrice= {
            "list": {
                "url": _path + "sys/monitorPriceList.do"
            },
            "add": {
                "url": _path + "sys/monitorPriceAdd.do",
                "title": "添加",
                "area": ['650px', '370px']
            },
            "edit": {
                "url": _path + "sys/monitorPriceEdit.do",
                "title": "编辑",
                "area": ['650px', '370px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['650px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/monitorPriceDelete.do"
            }
        };
        //开放时间
        $cameraTimes= {
            "list": {
                "url": _path + "sys/cameraTimesList.do"
            },
            "add": {
                "url": _path + "sys/cameraTimesAdd.do",
                "title": "添加",
                "area": ['650px', '230px']
            },
            "edit": {
                "url": _path + "sys/cameraTimesEdit.do",
                "title": "编辑",
                "area": ['650px', '230px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['650px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/cameraTimesDelete.do"
            }
        };
        //购买记录 视频监控
        $monitorRecharges= {
            "list": {
                "url": _path + "sys/monitorRechargesList.do"
            },
            "del": {
                "url": _path + "sys/monitorRechargesDelete.do"
            }
        };
        //摄像头-权限分配
        $cameraPermissions = {
            "list": {
                "url": _path + "sys/cameraPermissionsList.do"
            },
            "add": {
                "url": _path + "sys/cameraPermissionsAdd.do",
                "title": "添加",
                "area": ['800px', '350px']
            },
            "edit": {
                "url": _path + "sys/cameraPermissionsEdit.do",
                "title": "编辑",
                "area": ['715px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/cameraPermissionsDelete.do"
            }
        };

        //短信配额
        $schoolSmsChas = {
            "list": {
                "url": _path + "sys/schoolSmsChasList.do"
            },
            "add": {
                "url": _path + "sys/schoolSmsChasAdd.do",
                "title": "添加",
                "area": ['800px', '350px']
            },
            "edit": {
                "url": _path + "sys/schoolSmsChasEdit.do",
                "title": "编辑",
                "area": ['800px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['800px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/schoolSmsChasDelete.do"
            }
        };
        //短信渠道
        $smsChannels = {
            "list": {
                "url": _path + "sys/smsChannelsList.do"
            },
            "add": {
                "url": _path + "sys/smsChannelsAdd.do",
                "title": "添加",
                "area": ['800px', '350px']
            },
            "edit": {
                "url": _path + "sys/smsChannelsEdit.do",
                "title": "编辑",
                "area": ['715px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/smsChannelsDelete.do"
            }
        };
        //短信状态
        $smsLogs = {
            "list": {
                "url": _path + "sys/smsLogsList.do"
            },
            "add": {
                "url": _path + "sys/smsLogsAdd.do",
                "title": "添加",
                "area": ['800px', '350px']
            },
            "edit": {
                "url": _path + "sys/smsLogEdit.do",
                "title": "编辑",
                "area": ['715px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/smsLogsDelete.do"
            }
        };
         //短信充值
        $smsRecharges = {
            "list": {
                "url": _path + "sys/smsRechargesList.do"
            },
            "add": {
                "url": _path + "sys/smsRechargesAdd.do",
                "title": "添加",
                "area": ['800px', '350px']
            },
            "edit": {
                "url": _path + "sys/smsRechargesEdit.do",
                "title": "编辑",
                "area": ['715px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/smsLogsDelete.do"
            },"pay":{
                "url":_path +"aliapi/smsRecharge.do"
            }

        };
        //广告位管理
        $adSpots = {
            "list": {
                "url": _path + "sys/adSpotsList.do"
            },
            "add": {
                "url": _path + "sys/adSpotsAdd.do",
                "title": "添加1",
                "area": ['600px', '350px']
            },
            "edit": {
                "url": _path + "sys/adSpotsEdit.do",
                "title": "编辑",
                "area": ['600px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['600px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/adSpotsDelete.do"
            }
        };

        //学校广告管理
        $advertSchools = {
            "list": {
                "url": _path + "sys/advertSchoolsList.do"
            },
            "add": {
                "url": _path + "sys/advertSchoolsAdd.do",
                "title": "添加1",
                "area": ['800px', '550px']
            },
            "edit": {
                "url": _path + "sys/advertSchoolsEdit.do",
                "title": "编辑",
                "area": ['715px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/smsLogsListDelete.do"
            }
        };
        //终端-广告管理
        $adverts = {
            "list": {
                "url": _path + "sys/advertsList.do"
            },
            "add": {
                "url": _path + "sys/advertsAdd.do",
                "title": "添加",
                "area": ['750px', '550px']
            },
            "edit": {
                "url": _path + "sys/advertsEdit.do",
                "title": "编辑",
                "area": ['750px', '550px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['750px', '550px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/advertsDelete.do"
            }
        };
        //广告管理：终端
        $terminals = {
            "list": {
                "url": _path + "sys/terminalsList.do"
            },
            "add": {
                "url": _path + "sys/terminalsAdd.do",
                "title": "添加",
                "area": ['700px', '550px']
            },
            "edit": {
                "url": _path + "sys/terminalsEdit.do",
                "title": "编辑",
                "area": ['500px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['500px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/terminalsDelete.do"
            }
        };
        //商城管理-商品分类
        $productCategorys = {
            "list": {
                "url": _path + "sys/productCategorysList.do"
            },
            "add": {
                "url": _path + "sys/productCategorysAdd.do",
                "title": "添加",
                "area": ['800px', '350px']
            },
            "edit": {
                "url": _path + "sys/productCategorysEdit.do",
                "title": "编辑",
                "area": ['715px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停用",
                "url": _path + "sys/productCategorysDelete.do"
            }
        };
        //商城管理-商品管理
        $products = {
            "list": {
                "url": _path + "sys/productsList.do"
            },
            "add": {
                "url": _path + "sys/productsAdd.do",
                "title": "添加",
                "area": ['980px', '650px']
            },
            "edit": {
                "url": _path + "sys/productsEdit.do",
                "title": "编辑",
                "area": ['980px', '650px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '350px']
            },
            "del": {
                "titleStart": "上架",
                "titleEnd": "下架",
                "url": _path + "sys/productsDelete.do"
            },
            "upImg": {
                "url": _path + "sys/sysQiniuProductImages.do"
            }
        };
        //商城管理-订单管理
        $productOrders = {
            "list": {
                "url": _path + "sys/productOrdersList.do"
            },
            "add": {
                "url": _path + "sys/productOrdersAdd.do",
                "title": "添加",
                "area": ['800px', '350px']
            },
            "edit": {
                "url": _path + "sys/productOrdersEdit.do",
                "title": "编辑",
                "area": ['715px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '350px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/productOrdersDelete.do"
            }
        };
        //app版本管理
        $appVersions = {
            "list": {
                "url": _path + "sys/appVersionsList.do"
            },
            "add": {
                "url": _path + "sys/appVersionsAdd.do",
                "title": "添加",
                "area": ['980px', '420px']
            },
            "edit": {
                "url": _path + "sys/appVersionsEdit.do",
                "title": "编辑",
                "area": ['980px', '420px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['980px', '420px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/appVersionsDelete.do"
            }
        };
        //app下载记录
        $appDownLogs = {
            "list": {
                "url": _path + "sys/appDownLogsList.do"
            },
            "add": {
                "url": _path + "sys/appDownLogsAdd.do",
                "title": "添加",
                "area": ['715px', '340px']
            },
            "edit": {
                "url": _path + "sys/appDownLogsEdit.do",
                "title": "编辑",
                "area": ['715px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '250px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/appDownLogsDelete.do"
            }
        };
        //用户登录
        $acctLoginLogs = {
            "list": {
                "url": _path + "sys/acctLoginLogsList.do"
            },
            "add": {
                "url": _path + "sys/acctLoginLogsAdd.do",
                "title": "添加",
                "area": ['715px', '340px']
            },
            "edit": {
                "url": _path + "sys/acctLoginLogsEdit.do",
                "title": "编辑",
                "area": ['715px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '250px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/acctLoginLogsDelete.do"
            }
        };
        //用户浏览模块
        $acctViewLogs = {
            "list": {
                "url": _path + "sys/acctViewLogsList.do"
            },
            "add": {
                "url": _path + "sys/acctViewLogsAdd.do",
                "title": "添加",
                "area": ['715px', '340px']
            },
            "edit": {
                "url": _path + "sys/acctViewLogsEdit.do",
                "title": "编辑",
                "area": ['715px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '250px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/acctViewLogsDelete.do"
            }
        };
        //pos机
        $posDateRefreshRecord = {
            "list": {
                "url": _path + "sys/posDateRefreshRecordList.do"
            }
        },
        //园长信箱-发件箱
        // $emailBoxs = {
        //     "list": {
        //         "url": _path + "sys/emailBoxsList.do"
        //     },
        //     "add": {
        //         "url": _path + "sys/emailBoxsAdd.do",
        //         "title": "添加",
        //         "area": ['715px', '340px']
        //     },
        //     "edit": {
        //         "url": _path + "sys/emailBoxsEdit.do",
        //         "title": "编辑",
        //         "area": ['715px', '350px']
        //     },
        //     "chk": {
        //         "url": "",
        //         "title": "查看",
        //         "area": ['715px', '500px;']
        //     },
        //     "del": {
        //         "titleStart": "启用",
        //         "titleEnd": "停止",
        //         "url": _path + "sys/emailBoxsDelete.do"
        //     }
        // };

        $emailBoxs = {
            "list": {
                "url": _path + "sys/mailBoxsList.do"
            },
            "add": {
                "url": _path + "sys/mailBoxsAdd.do",
                "title": "添加",
                "area": ['715px', '340px']
            },
            "edit": {
                "url": _path + "sys/mailBoxsEdit.do",
                "title": "编辑",
                "area": ['715px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '500px;']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/mailBoxsDelete.do"
            }
        };

        //园长信箱-收件箱
        $receiveEmails = {
            "list": {
                "url": _path + "sys/receiveEmailsList.do"
            },
            "add": {
                "url": _path + "sys/receiveEmailsAdd.do",
                "title": "添加",
                "area": ['715px', '340px']
            },
            "edit": {
                "url": _path + "sys/receiveEmailsEdit.do",
                "title": "编辑",
                "area": ['715px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '250px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/receiveEmailsDelete.do"
            }
        };
        //岗位权限分配
        $roleprivs = {
            "list": {
                "url": _path + "sys/roleprivsList.do"
            },
            "add": {
                "url": _path + "sys/roleprivsAdd.do",
                "title": "添加",
                "area": ['715px', '340px']
            },
            "edit": {
                "url": _path + "sys/roleprivsEdit.do",
                "title": "编辑",
                "area": ['715px', '350px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '250px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/roleprivsDelete.do"
            }
        };

        //智慧校园-模板管理
        $zhxyModManage = {
            "list": {
                "url": _path + "sys/modManageList.do"
            },
            "add": {
                "url": _path + "sys/modManageAdd.do",
                "title": "添加",
                "area": ['980px', '580px']
            },
            "edit": {
                "url": _path + "sys/modManageEdit.do",
                "title": "编辑",
                "area": ['980px', '580px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['715px', '250px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/modManageDelete.do"
            },"upImg":_path +"sQiniuTokenMods"
        };
        //智慧校园-活动管理
        $schoolActivity = {
            "list": {
                "url": _path + "sys/schoolActivityList.do"
            },
            "add": {
                "url": _path + "sys/schoolActivityAdd.do",
                "title": "添加",
                "area": ['980px', '580px']
            },
            "edit": {
                "url": _path + "sys/schoolActivityEdit.do",
                "title": "编辑",
                "area": ['980px', '580px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['980px', '580px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/schoolActivityDelete.do"
            },"renCreatHtml":{
                //重新生成所有的html页面
                "url":_path + "sys/schoolActivityReBuild.do"  
            }
        };
        //智慧校园 -报名管理 signUpManageAdd
        $signUpManage = {
            "list": {
                "url": _path + "sys/signUpManageList.do"
            },
            "add": {
                "url": _path + "signUpManageAdd.do",
                "title": "添加",
                "area": ['980px', '580px']
            },
            "edit": {
                "url": _path + "sys/schoolActivityEdit.do",
                "title": "编辑",
                "area": ['980px', '580px']
            },
            "chk": {
                "url": "",
                "title": "查看",
                "area": ['980px', '580px']
            },
            "del": {
                "titleStart": "启用",
                "titleEnd": "停止",
                "url": _path + "sys/signUpManageDelete.do"
            }
        };
        //修改密码 accountsEdit
        $accountsEdit = {
            "url": _path + "sys/accountsEdit.do"
        };



        //app订单管理
        //支付接口
        $pay = {
            "url": _path + "aliapi/product.do"
        };
        //七牛
        $qiniu = {
            "token": {
                "url": _path + "sys/sysQiniuTokenAdverts.do"
            }
        };
        //图片
        $qiniuImg = {
            "url": _path + "sys/qiniuToken.do?type=img"
        };
        //录像
        $qiniuVideo = {
            "url": _path + "sys/qiniuToken.do?type=vidoe"
        };
        //宝贝头像
        $kidIcon = {
            "url": _path + "sys/qiniuTokenKidIcon.do"
        };
        //班级集体照
        $classImg = {
            "url": _path + "sys/sysQiniuClassImages.do"
        };
        //教职工统计
        $teacherViewLogsChart = {
            "url": _path + "sys/teacherViewLogsChart.do"
        };
        //模块浏览统计
        $acctViewLogsChart = {
            "url": _path + "sys/acctViewLogsChart.do"
        };

        //登陆统计
        $acctLoginLogsChart = {
            "url": _path + "sys/acctLoginLogsChart.do"
        };
        //举报
        $reports ={
            "list": {
                "url": _path + "sys/reportsList.do"
            },
            "del":{
                "title": "已阅",
                "url": _path + "sys/reportsDelete.do"
            },"chk": {
                "url": "",
                "title": "查看",
                "area": ['600px', '450px']
            }
        };
        //反馈
        $feedBacks ={
            "list": {
                "url": _path + "sys/feedBacksList.do"
            },"del":{
                "title": "已阅",
                "url": _path + "sys/feedBacksDelete.do"
            },"chk": {
                "url": "",
                "title": "查看",
                "area": ['600px', '450px']
            }
        };
        //缓存推送
        $renCache ={
            "url":_path + "sys/refreshTeacherSaidsCache.do"
        };
        //app下载
        $appDownload ={
            "url":_path + "appDownload.do"
        };
        //app端 -报名
       // signUpManageAdd
       $appDownload ={
            "url":_path + "appDownload.do"
        };

    }
};