options = [];
var year ="",
    state="",
    system = "",
    version="",
    tempYear = "",
    tempMonth = "",
    tempDay = "",
    moon="",
    data="",
    sData = false;
var bag={
    _init:function () {
        $('#tab_demo .tabBar span').unbind('click').on('click',function(){
            $('#tab_demo .tabBar span').removeClass('current');
            $(this).addClass('current');
            system = $(this).data('system');
            bag.tabTime();
        });
        $('#tab_demo .tabBar span').eq(0).click();
    },
    tabTime:function(){
        var url=$appVersions.list.url,
            beforBack = function(){},
            data = {"system":system},
            successBack = function(){
                if(ajaxData.success== true && ajaxData.list.length>0){
                    var _html = template('tplVersion',{ list:ajaxData.list});
                    $('select[name="version"]').html(_html);
                    version = $('select[name="version"]').val();
                }
                $('select[name="version"]').on('change',function(){
                    version = $('select[name="version"]').val();
                    bag.dateToolClick();
                })
                bag.dateToolClick();
            };
            common.ajaxFun(url,data,beforBack,successBack);

       
    },
    dateToolClick:function(){
          $('.J-time a').unbind('click').on('click',function(e){
                    //年月日点击
                    e.preventDefault();
                    var v = $(this).data('time');
                    $('.J-time a').removeClass('active');
                    $(this).addClass('active');
                    bag.dataSelect(v);
                });
                $('.J-time a').eq(0).click();
    },
    dataSelect:function(v){
        switch(v){
            case 'year':
                       bag.doYear();
                       break;
            case 'month':
                       bag.doMonth();
                       break;
            case 'day':
                       bag.doDay();
                       break;
        }
    },
    doYear:function(){
        //选年 执行
        state ="year";
        var myDate = new Date();
        $('.J-date').eq(0).show();
        tempYear = myDate.getFullYear();
        $('.J-date').val(tempYear+"年");
         bag.ajaxLoadData();
        bag.WdatePickerChange("year");

    },
    doMonth:function(){
        //选月 执行
         state ="month";
         var myDate = new Date();
        var months = myDate.getMonth()+1;
        tempMonth = months;
        if(months<10){
            months = 0+months.toString()+"月";
        }else{
             months = months.toString()+"月";
        }
        $('.J-date').val(tempYear+"年"+months);
        bag.WdatePickerChange("month");
        bag.ajaxLoadData();
    },
    doDay:function(){
        //选日 执行
        state ="day";
        var myDate = new Date();
        tempDay = myDate.toLocaleDateString();
        $('.J-date').val(tempDay);
         var months = myDate.getMonth()+1;
         tempMonth = months;
         tempDay = myDate.getDate();
        bag.WdatePickerChange("day");
        bag.ajaxLoadData();
    },
    WdatePickerChange:function(v){
        $('.J-date').unbind('focus').on('focus',function(){
                switch(v){
                    case "year":
                     // WdatePicker({skin:'whyGreen',dateFmt:'yyyy年'});
                      var cYearFun =function(){
                        tempYear = $dp.cal.newdate.y;
                      };
                      WdatePicker({skin:'whyGreen',dateFmt:'yyyy年',ychanged:cYearFun,onpicked:cYearFun});
                      break;
                     case "month":
                      var cYearFun =function(){
                        tempYear = $dp.cal.newdate.y;
                        bag.ajaxLoadData();
                      };
                      var cMonthFunc = function(){
                         tempYear = $dp.cal.newdate.y;
                         tempMonth = $dp.cal.newdate.M;
                         bag.ajaxLoadData();
                      };
                      WdatePicker({skin:'whyGreen',dateFmt:'yyyy年MM月',ychanged:cYearFun,Mchanged:cMonthFunc,onpicked:cMonthFunc});
                      break;
                     case "day":
                      var cDayFunc = function(){
                            tempYear = $dp.cal.newdate.y;
                            tempMonth = $dp.cal.newdate.M;
                            tempDay = $dp.cal.newdate.d;
                            bag.ajaxLoadData();
                      };
                      WdatePicker({skin:'whyGreen',dateFmt:'yyyy年MM月dd日',onpicked:cDayFunc});
                      break;
                }
        });
    },
    ajaxLoadData:function(){
        var data = {
            "system":system
        };
        if( version != "" ){
            data.version = version;
        }
        switch(state){
            case "year":
                data.year = tempYear;
                break;
            case "month":
                data.year = tempYear;
                data.moon = parseInt(tempMonth);
                break;
            case "day":
                data.year = tempYear;
                data.moon = parseInt(tempMonth);
                data.date = parseInt(tempDay);
        }
        var url=$acctViewLogsChart.url,
            beforBack = function(){},
            successBack = function(){
                var name = [],count = [];
                if(ajaxData.list.length>0){
                    for(var i=0;i<ajaxData.list.length;i++){
                        name.push(ajaxData.list[i].privilegeTypeName);
                        count.push(ajaxData.list[i].count);
                    }
                    sData = true;
                    bag.creatEchart(name,count);
                }else{
                    sData = false;
                    var title = "没有此筛选条件的记录",icon = 2;
                    common.layerMsg(title, icon);
                }

            };
            common.ajaxFun(url,data,beforBack,successBack);
    },
    creatEchart:function(name,count){
        $('#chart').css('height',$(window).height()-200);
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart'));

        // 指定图表的配置项和数据
        var tile = "";
        if(sData == true){
                switch(state){
                case "year":
                    title = tempYear+"年用户模块浏览统计"
                    break;
                case "month":
                    title = tempYear+"年"+tempMonth+"月用户模块浏览统计"
                    break;
                case "day":
                    title = tempYear+"年"+tempMonth+"月"+tempDay+"日用户模块浏览统计"
                    break;
            }
        }

        var option = {
            tooltip : {
                trigger : 'axis',
                axisPointer : {
                    type : 'line',
                    lineStyle : {
                        color : '#0f0',
                        width : 2,
                        type : 'solid'
                    }
                }
            },
            toolbox:{
                    feature:{
                        saveAsImage:{
                            type:"png"
                        }
                    }
            },
            title : {
                text :title,
                x : 'center',
                y : 'top',
                textStyle : {
                    fontSize : 26,
                    fontFamily : "微软雅黑",
                }
            },
            xAxis: {
                  data : name,
                  splitLine : {
                    lineStyle : {
                        type : 'dotted'
                    }
                }
            },
            yAxis: {
               nameTextStyle:{
                    color: '#fff',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'sans-serif',
                    fontSize: 12
                  }
            },
            series: [{
                name: '浏览量',
                type: 'bar',
                data: count
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize = myChart.resize;
    },
    _do:function (items,options) {
    },
    mmgSelects:function () {
    },
    searchRest:function () {
        $('#keyWords').val('');
    },
    params:function () {
        param={
            'keyWords':$('#keyWords').val()
        };
        return param;
    }
};

//执行
bag._init();