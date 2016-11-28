///<jscompress sourcefile="Validform.js" />
/*
 通用表单验证方法
 Validform version 5.3.2
 By sean during April 7, 2010 - March 26, 2013
 For more information, please visit http://validform.rjboy.cn
 Validform is available under the terms of the MIT license.

 Demo:
 $(".demoform").Validform({//$(".demoform")指明是哪一表单需要验证,名称需加在form表单上;
 btnSubmit:"#btn_sub", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
 btnReset:".btn_reset",//可选项 .btn_reset是该表单下要绑定点击重置表单事件的按钮;
 tiptype:1, //可选项 1=>pop box,2=>side tip(parent.next.find; with default pop),3=>side tip(siblings; with default pop),4=>side tip(siblings; none pop)，默认为1，也可以传入一个function函数，自定义提示信息的显示方式（可以实现你想要的任何效果，具体参见demo页）;
 ignoreHidden:false,//可选项 true | false 默认为false，当为true时对:hidden的表单元素将不做验证;
 dragonfly:false,//可选项 true | false 默认false，当为true时，值为空时不做验证；
 tipSweep:true,//可选项 true | false 默认为false，只在表单提交时触发检测，blur事件将不会触发检测（实时验证会在后台进行，不会显示检测结果）;
 label:".label",//可选项 选择符，在没有绑定nullmsg时查找要显示的提示文字，默认查找".Validform_label"下的文字;
 showAllError:false,//可选项 true | false，true：提交表单时所有错误提示信息都会显示，false：一碰到验证不通过的就停止检测后面的元素，只显示该元素的错误信息;
 postonce:true, //可选项 表单是否只能提交一次，true开启，不填则默认关闭;
 ajaxPost:true, //使用ajax方式提交表单数据，默认false，提交地址就是action指定地址;
 datatype:{//传入自定义datatype类型，可以是正则，也可以是函数（函数内会传入一个参数）;
 "*6-20": /^[^\s]{6,20}$/,
 "z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
 "username":function(gets,obj,curform,regxp){
 //参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
 var reg1=/^[\w\.]{4,16}$/,
 reg2=/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,8}$/;

 if(reg1.test(gets)){return true;}
 if(reg2.test(gets)){return true;}
 return false;

 //注意return可以返回true 或 false 或 字符串文字，true表示验证通过，返回字符串表示验证失败，字符串作为错误提示显示，返回false则用errmsg或默认的错误提示;
 },
 "phone":function(){
 // 5.0 版本之后，要实现二选一的验证效果，datatype 的名称 不 需要以 "option_" 开头;
 }
 },
 usePlugin:{
 swfupload:{},
 datepicker:{},
 passwordstrength:{},
 jqtransform:{
 selector:"select,input"
 }
 },
 beforeCheck:function(curform){
 //在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
 //这里明确return false的话将不会继续执行验证操作;
 },
 beforeSubmit:function(curform){
 //在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
 //这里明确return false的话表单将不会提交;
 },
 callback:function(data){
 //返回数据data是json格式，{"info":"demo info","status":"y"}
 //info: 输出提示信息;
 //status: 返回提交数据的状态,是否提交成功。如可以用"y"表示提交成功，"n"表示提交失败，在ajax_post.php文件返回数据里自定字符，主要用在callback函数里根据该值执行相应的回调操作;
 //你也可以在ajax_post.php文件返回更多信息在这里获取，进行相应操作；
 //ajax遇到服务端错误时也会执行回调，这时的data是{ status:**, statusText:**, readyState:**, responseText:** }；

 //这里执行回调操作;
 //注意：如果不是ajax方式提交表单，传入callback，这时data参数是当前表单对象，回调函数会在表单验证全部通过后执行，然后判断是否提交表单，如果callback里明确return false，则表单不会提交，如果return true或没有return，则会提交表单。
 }
 });

 Validform对象的方法和属性：
 tipmsg：自定义提示信息，通过修改Validform对象的这个属性值来让同一个页面的不同表单使用不同的提示文字；
 dataType：获取内置的一些正则；
 eq(n)：获取Validform对象的第n个元素;
 ajaxPost(flag,sync,url)：以ajax方式提交表单。flag为true时，跳过验证直接提交，sync为true时将以同步的方式进行ajax提交，传入了url地址时，表单会提交到这个地址；
 abort()：终止ajax的提交；
 submitForm(flag,url)：以参数里设置的方式提交表单，flag为true时，跳过验证直接提交，传入了url地址时，表单会提交到这个地址；
 resetForm()：重置表单；
 resetStatus()：重置表单的提交状态。传入了postonce参数的话，表单成功提交后状态会设置为"posted"，重置提交状态可以让表单继续可以提交；
 getStatus()：获取表单的提交状态，normal：未提交，posting：正在提交，posted：已成功提交过；
 setStatus(status)：设置表单的提交状态，可以设置normal，posting，posted三种状态，不传参则设置状态为posting，这个状态表单可以验证，但不能提交；
 ignore(selector)：忽略对所选择对象的验证；
 unignore(selector)：将ignore方法所忽略验证的对象重新获取验证效果；
 addRule(rule)：可以通过Validform对象的这个方法来给表单元素绑定验证规则；
 check(bool,selector):对指定对象进行验证(默认验证当前整个表单)，通过返回true，否则返回false（绑定实时验证的对象，格式符合要求时返回true，而不会等ajax的返回结果），bool为true时则只验证不显示提示信息；
 config(setup):可以通过这个方法来修改初始化参数，指定表单的提交地址，给表单ajax和实时验证的ajax里设置参数；
 */

(function($,win,undef){
    var errorobj=null,//指示当前验证失败的表单元素;
        msgobj=null,//pop box object
        msghidden=true;//msgbox hidden?

    var tipmsg={//默认提示文字;
        tit:"提示信息",
        w:{
            "*":"不能为空！",
            "*6-16":"请填写6到16位任意字符！",
            "n":"请填写数字！",
            "n6-16":"请填写6到16位数字！",
            "s":"不能输入特殊字符！",
            "s6-18":"请填写6到18位字符！",
            "p":"请填写邮政编码！",
            "m":"请填写手机号码！",
            "e":"邮箱地址格式不对！",
            "url":"网址必须以http或https等开头的一段完整网址！",
            "cname":"2-20位纯中文,不能中英混合",
            "ename":"2-20位纯英文,不能中英混合",
            "qq":"QQ号为5-10位纯数字",
            "rfId":"门禁卡应该是10位纯数字",
            "numZero":"必须是大于0的数字",
            "fax":"可以"+"或数字开头,可含有'-'",
            "t":"格式为：区号-座机号码-分机号码",
            "cen":"汉字或字母以及汉字&字母",
            "noZifu":"不能有特殊字符",
            "AZ":"只能是大写字母",
            "az":"只能是小写字母",
            "azZA":"只能是大写或小写字母",
            "title":"只能是2-16位字符",
            "time":"时间是时分秒",
            "busId":'车牌格式不对',
            "jibie":"只能是1-4个级别",
            "initNum":"只能是大于0的整数",
            "version":"格式类似:1.1或1.1.2或10000",
            "ip":"ip地址格式不正确",
            "pwd":"6-20数字或字母",
            "zzs":"请输入大于零的整数",
            "numFeifu":"非负整数",
            "numFeifushu":'非负数',
            "enShuzi":'登录名只能由英文字母或数字组成(不支持中文、不能以数字开头)'
        },
        def:"请填写正确信息！",
        undef:"datatype未定义！",
        reck:"两次输入的内容不一致！",
        r:"通过信息验证！",
        c:"正在检测信息…",
        s:"请{填写|选择}{0|信息}！",
        v:"所填信息没有经过验证，请稍后…",
        p:"正在提交数据…"
    }
    $.Tipmsg=tipmsg;

    var Validform=function(forms,settings,inited){
        var settings=$.extend({},Validform.defaults,settings);
        settings.datatype && $.extend(Validform.util.dataType,settings.datatype);

        var brothers=this;
        brothers.tipmsg={w:{}};
        brothers.forms=forms;
        brothers.objects=[];

        //创建子对象时不再绑定事件;
        if(inited===true){
            return false;
        }

        forms.each(function(){
            //已经绑定事件时跳过，避免事件重复绑定;
            if(this.validform_inited=="inited"){return true;}
            this.validform_inited="inited";

            var curform=this;
            curform.settings=$.extend({},settings);

            var $this=$(curform);

            //防止表单按钮双击提交两次;
            curform.validform_status="normal"; //normal | posting | posted;

            //让每个Validform对象都能自定义tipmsg;
            $this.data("tipmsg",brothers.tipmsg);

            //bind the blur event;
            $this.delegate("[datatype]","blur",function(){
                //判断是否是在提交表单操作时触发的验证请求；
                var subpost=arguments[1];
                Validform.util.check.call(this,$this,subpost);
            });

            $this.delegate(":text","keypress",function(event){
                if(event.keyCode==13 && $this.find(":submit").length==0){
                    $this.submit();
                }
            });

            //点击表单元素，默认文字消失效果;
            //表单元素值比较时的信息提示增强;
            //radio、checkbox提示信息增强;
            //外调插件初始化;
            Validform.util.enhance.call($this,curform.settings.tiptype,curform.settings.usePlugin,curform.settings.tipSweep);

            curform.settings.btnSubmit && $this.find(curform.settings.btnSubmit).bind("click",function(){
                $this.trigger("submit");
                return false;
            });

            $this.submit(function(){
                var subflag=Validform.util.submitForm.call($this,curform.settings);
                subflag === undef && (subflag=true);
                return subflag;
            });

            $this.find("[type='reset']").add($this.find(curform.settings.btnReset)).bind("click",function(){
                Validform.util.resetForm.call($this);
            });

        });

        //预创建pop box;
        if( settings.tiptype==1 || (settings.tiptype==2 || settings.tiptype==3) && settings.ajaxPost ){
            creatMsgbox();
        }
    }

    Validform.defaults={
        tiptype:1,
        tipSweep:false,
        showAllError:false,
        postonce:false,
        ajaxPost:false
    }

    Validform.util={
        dataType:{
            "*":/[\w\W]+/,
            "*6-16":/^[\w\W]{6,16}$/,
            "n":/^\d+$/,
            "n6-16":/^\d{6,16}$/,
            "s":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
            "s6-18":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
            "p":/^[0-9]{6}$/,
            "m": /^0{0,1}(13[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/,
            //"m":/^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|70)\\d{8}$/,
            "e":/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            "url":/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/,
            "cname":/^[\u4e00-\u9fa5 ]{2,20}$/,
            "ename":/^[a-z\/ ]{2,20}$/i,
            "qq":/^\d{5,10}$/,
            "rfId":/^(\d{8}|\d{10})$/,
            "numZero":/^(\d|[1-9]\d+)(\.\d+)?$/,      //大于0的数字，包括小数
            "fax":/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,  //传真号码：可以"+"或数字开头,可含有"-",
            "t":/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/, //电话号码匹配
            "cen":/^([A-Za-z]|[\u4E00-\u9FA5])+$/, //只能是汉字或字母
            "noZifu":/^([\u4E00-\u9FA5]|\w)*$/,
            "AZ":/^[A-Z]+$/,
            "az":/^[a-z]+$/,
            "azAZ":/^[a-zA-Z]+$/,
            "title":/^[\w\W]{2,16}$/,
            "time":/([01]?\d|2[0-3]):[0-5]?\d:[0-5]?\d/,
            "busId":/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/,
            "jibie":/^[1-4]{1}$/,
            "initNum":/^(0|([1-9]\d*))$/,
            "version":/^\d[\d\.]+\d$/,
            "ip":/^(0|[1-9]?|1\d\d?|2[0-4]\d|25[0-5])\.(0|[1-9]?|1\d\d?|2[0-4]\d|25[0-5])\.(0|[1-9]?|1\d\d?|2[0-4]\d|25[0-5])\.(0|[1-9]?|1\d\d?|2[0-4]\d|25[0-5])$/,
            "pwd":/[a-zA-Z\d+]{6,20}/,
            "zzs": /^[0-9]*[1-9][0-9]*$/,
            "numFeifu":/^\d+$/,
            "numFeifushu":/^\d+(\.\d+)?$/,
            "enShuzi": /^[a-zA-Z]+[a-zA-Z0-9]+$/
        },

        toString:Object.prototype.toString,

        isEmpty:function(val){
            return val==="" || val===$.trim(this.attr("tip"));
        },

        getValue:function(obj){
            var inputval,
                curform=this;

            if(obj.is(":radio")){
                inputval=curform.find(":radio[name='"+obj.attr("name")+"']:checked").val();
                inputval= inputval===undef ? "" : inputval;
            }else if(obj.is(":checkbox")){
                inputval="";
                curform.find(":checkbox[name='"+obj.attr("name")+"']:checked").each(function(){
                    inputval +=$(this).val()+',';
                })
                inputval= inputval===undef ? "" : inputval;
            }else{
                inputval=obj.val();
            }
            inputval=$.trim(inputval);

            return Validform.util.isEmpty.call(obj,inputval) ? "" : inputval;
        },

        enhance:function(tiptype,usePlugin,tipSweep,addRule){
            var curform=this;

            //页面上不存在提示信息的标签时，自动创建;
            curform.find("[datatype]").each(function(){
                if(tiptype==2){
                    if($(this).parent().next().find(".Validform_checktip").length==0){
                        $(this).parent().next().append("<span class='Validform_checktip' />");
                        $(this).siblings(".Validform_checktip").remove();
                    }
                }else if(tiptype==3 || tiptype==4){
                    if($(this).siblings(".Validform_checktip").length==0){
                        $(this).parent().append("<span class='Validform_checktip' />");
                        $(this).parent().next().find(".Validform_checktip").remove();
                    }
                }
            })

            //表单元素值比较时的信息提示增强;
            curform.find("input[recheck]").each(function(){
                //已经绑定事件时跳过;
                if(this.validform_inited=="inited"){return true;}
                this.validform_inited="inited";

                var _this=$(this);
                var recheckinput=curform.find("input[name='"+$(this).attr("recheck")+"']");
                recheckinput.bind("keyup",function(){
                    if(recheckinput.val()==_this.val() && recheckinput.val() != ""){
                        if(recheckinput.attr("tip")){
                            if(recheckinput.attr("tip") == recheckinput.val()){return false;}
                        }
                        _this.trigger("blur");
                    }
                }).bind("blur",function(){
                    if(recheckinput.val()!=_this.val() && _this.val()!=""){
                        if(_this.attr("tip")){
                            if(_this.attr("tip") == _this.val()){return false;}
                        }
                        _this.trigger("blur");
                    }
                });
            });

            //hasDefaultText;
            curform.find("[tip]").each(function(){//tip是表单元素的默认提示信息,这是点击清空效果;
                //已经绑定事件时跳过;
                if(this.validform_inited=="inited"){return true;}
                this.validform_inited="inited";

                var defaultvalue=$(this).attr("tip");
                var altercss=$(this).attr("altercss");
                $(this).focus(function(){
                    if($(this).val()==defaultvalue){
                        $(this).val('');
                        if(altercss){$(this).removeClass(altercss);}
                    }
                }).blur(function(){
                    if($.trim($(this).val())===''){
                        $(this).val(defaultvalue);
                        if(altercss){$(this).addClass(altercss);}
                    }
                });
            });

            //enhance info feedback for checkbox & radio;
            curform.find(":checkbox[datatype],:radio[datatype]").each(function(){
                //已经绑定事件时跳过;
                if(this.validform_inited=="inited"){return true;}
                this.validform_inited="inited";

                var _this=$(this);
                var name=_this.attr("name");
                curform.find("[name='"+name+"']").filter(":checkbox,:radio").bind("click",function(){
                    //避免多个事件绑定时的取值滞后问题;
                    setTimeout(function(){
                        _this.trigger("blur");
                    },0);
                });

            });

            //select multiple;
            curform.find("select[datatype][multiple]").bind("click",function(){
                var _this=$(this);
                setTimeout(function(){
                    _this.trigger("blur");
                },0);
            });

            //plugins here to start;
            Validform.util.usePlugin.call(curform,usePlugin,tiptype,tipSweep,addRule);
        },

        usePlugin:function(plugin,tiptype,tipSweep,addRule){
            /*
             plugin:settings.usePlugin;
             tiptype:settings.tiptype;
             tipSweep:settings.tipSweep;
             addRule:是否在addRule时触发;
             */

            var curform=this,
                plugin=plugin || {};
            //swfupload;
            if(curform.find("input[plugin='swfupload']").length && typeof(swfuploadhandler) != "undefined"){

                var custom={
                    custom_settings:{
                        form:curform,
                        showmsg:function(msg,type,obj){
                            Validform.util.showmsg.call(curform,msg,tiptype,{obj:curform.find("input[plugin='swfupload']"),type:type,sweep:tipSweep});
                        }
                    }
                };

                custom=$.extend(true,{},plugin.swfupload,custom);

                curform.find("input[plugin='swfupload']").each(function(n){
                    if(this.validform_inited=="inited"){return true;}
                    this.validform_inited="inited";

                    $(this).val("");
                    swfuploadhandler.init(custom,n);
                });

            }

            //datepicker;
            if(curform.find("input[plugin='datepicker']").length && $.fn.datePicker){
                plugin.datepicker=plugin.datepicker || {};

                if(plugin.datepicker.format){
                    Date.format=plugin.datepicker.format;
                    delete plugin.datepicker.format;
                }
                if(plugin.datepicker.firstDayOfWeek){
                    Date.firstDayOfWeek=plugin.datepicker.firstDayOfWeek;
                    delete plugin.datepicker.firstDayOfWeek;
                }

                curform.find("input[plugin='datepicker']").each(function(n){
                    if(this.validform_inited=="inited"){return true;}
                    this.validform_inited="inited";

                    plugin.datepicker.callback && $(this).bind("dateSelected",function(){
                        var d=new Date( $.event._dpCache[this._dpId].getSelected()[0] ).asString(Date.format);
                        plugin.datepicker.callback(d,this);
                    });
                    $(this).datePicker(plugin.datepicker);
                });
            }

            //passwordstrength;
            if(curform.find("input[plugin*='passwordStrength']").length && $.fn.passwordStrength){
                plugin.passwordstrength=plugin.passwordstrength || {};
                plugin.passwordstrength.showmsg=function(obj,msg,type){
                    Validform.util.showmsg.call(curform,msg,tiptype,{obj:obj,type:type,sweep:tipSweep});
                };

                curform.find("input[plugin='passwordStrength']").each(function(n){
                    if(this.validform_inited=="inited"){return true;}
                    this.validform_inited="inited";

                    $(this).passwordStrength(plugin.passwordstrength);
                });
            }

            //jqtransform;
            if(addRule!="addRule" && plugin.jqtransform && $.fn.jqTransSelect){
                if(curform[0].jqTransSelected=="true"){return;};
                curform[0].jqTransSelected="true";

                var jqTransformHideSelect = function(oTarget){
                    var ulVisible = $('.jqTransformSelectWrapper ul:visible');
                    ulVisible.each(function(){
                        var oSelect = $(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);
                        //do not hide if click on the label object associated to the select
                        if( !(oTarget && oSelect.oLabel && oSelect.oLabel.get(0) == oTarget.get(0)) ){$(this).hide();}
                    });
                };

                /* Check for an external click */
                var jqTransformCheckExternalClick = function(event) {
                    if ($(event.target).parents('.jqTransformSelectWrapper').length === 0) { jqTransformHideSelect($(event.target)); }
                };

                var jqTransformAddDocumentListener = function (){
                    $(document).mousedown(jqTransformCheckExternalClick);
                };

                if(plugin.jqtransform.selector){
                    curform.find(plugin.jqtransform.selector).filter('input:submit, input:reset, input[type="button"]').jqTransInputButton();
                    curform.find(plugin.jqtransform.selector).filter('input:text, input:password').jqTransInputText();
                    curform.find(plugin.jqtransform.selector).filter('input:checkbox').jqTransCheckBox();
                    curform.find(plugin.jqtransform.selector).filter('input:radio').jqTransRadio();
                    curform.find(plugin.jqtransform.selector).filter('textarea').jqTransTextarea();
                    if(curform.find(plugin.jqtransform.selector).filter("select").length > 0 ){
                        curform.find(plugin.jqtransform.selector).filter("select").jqTransSelect();
                        jqTransformAddDocumentListener();
                    }

                }else{
                    curform.jqTransform();
                }

                curform.find(".jqTransformSelectWrapper").find("li a").click(function(){
                    $(this).parents(".jqTransformSelectWrapper").find("select").trigger("blur");
                });
            }

        },

        getNullmsg:function(curform){
            var obj=this;
            var reg=/[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z\s]+/g;
            var nullmsg;

            var label=curform[0].settings.label || ".Validform_label";
            label=obj.siblings(label).eq(0).text() || obj.siblings().find(label).eq(0).text() || obj.parent().siblings(label).eq(0).text() || obj.parent().siblings().find(label).eq(0).text();
            label=label.replace(/\s(?![a-zA-Z])/g,"").match(reg);
            label=label? label.join("") : [""];

            reg=/\{(.+)\|(.+)\}/;
            nullmsg=curform.data("tipmsg").s || tipmsg.s;

            if(label != ""){
                nullmsg=nullmsg.replace(/\{0\|(.+)\}/,label);
                if(obj.attr("recheck")){
                    nullmsg=nullmsg.replace(/\{(.+)\}/,"");
                    obj.attr("nullmsg",nullmsg);
                    return nullmsg;
                }
            }else{
                nullmsg=obj.is(":checkbox,:radio,select") ? nullmsg.replace(/\{0\|(.+)\}/,"") : nullmsg.replace(/\{0\|(.+)\}/,"$1");
            }
            nullmsg=obj.is(":checkbox,:radio,select") ? nullmsg.replace(reg,"$2") : nullmsg.replace(reg,"$1");

            obj.attr("nullmsg",nullmsg);
            return nullmsg;
        },

        getErrormsg:function(curform,datatype,recheck){
            var regxp=/^(.+?)((\d+)-(\d+))?$/,
                regxp2=/^(.+?)(\d+)-(\d+)$/,
                regxp3=/(.*?)\d+(.+?)\d+(.*)/,
                mac=datatype.match(regxp),
                temp,str;

            //如果是值不一样而报错;
            if(recheck=="recheck"){
                str=curform.data("tipmsg").reck || tipmsg.reck;
                return str;
            }

            var tipmsg_w_ex=$.extend({},tipmsg.w,curform.data("tipmsg").w);

            //如果原来就有，直接显示该项的提示信息;
            if(mac[0] in tipmsg_w_ex){
                return curform.data("tipmsg").w[mac[0]] || tipmsg.w[mac[0]];
            }

            //没有的话在提示对象里查找相似;
            for(var name in tipmsg_w_ex){
                if(name.indexOf(mac[1])!=-1 && regxp2.test(name)){
                    str=(curform.data("tipmsg").w[name] || tipmsg.w[name]).replace(regxp3,"$1"+mac[3]+"$2"+mac[4]+"$3");
                    curform.data("tipmsg").w[mac[0]]=str;

                    return str;
                }

            }

            return curform.data("tipmsg").def || tipmsg.def;
        },

        _regcheck:function(datatype,gets,obj,curform){
            var curform=curform,
                info=null,
                passed=false,
                reg=/\/.+\//g,
                regex=/^(.+?)(\d+)-(\d+)$/,
                type=3;//default set to wrong type, 2,3,4;

            //datatype有三种情况：正则，函数和直接绑定的正则;

            //直接是正则;
            if(reg.test(datatype)){
                var regstr=datatype.match(reg)[0].slice(1,-1);
                var param=datatype.replace(reg,"");
                var rexp=RegExp(regstr,param);

                passed=rexp.test(gets);

                //function;
            }else if(Validform.util.toString.call(Validform.util.dataType[datatype])=="[object Function]"){
                passed=Validform.util.dataType[datatype](gets,obj,curform,Validform.util.dataType);
                if(passed === true || passed===undef){
                    passed = true;
                }else{
                    info= passed;
                    passed=false;
                }

                //自定义正则;
            }else{
                //自动扩展datatype;
                if(!(datatype in Validform.util.dataType)){
                    var mac=datatype.match(regex),
                        temp;

                    if(!mac){
                        passed=false;
                        info=curform.data("tipmsg").undef||tipmsg.undef;
                    }else{
                        for(var name in Validform.util.dataType){
                            temp=name.match(regex);
                            if(!temp){continue;}
                            if(mac[1]===temp[1]){
                                var str=Validform.util.dataType[name].toString(),
                                    param=str.match(/\/[mgi]*/g)[1].replace("\/",""),
                                    regxp=new RegExp("\\{"+temp[2]+","+temp[3]+"\\}","g");
                                str=str.replace(/\/[mgi]*/g,"\/").replace(regxp,"{"+mac[2]+","+mac[3]+"}").replace(/^\//,"").replace(/\/$/,"");
                                Validform.util.dataType[datatype]=new RegExp(str,param);
                                break;
                            }
                        }
                    }
                }

                if(Validform.util.toString.call(Validform.util.dataType[datatype])=="[object RegExp]"){
                    passed=Validform.util.dataType[datatype].test(gets);
                }

            }


            if(passed){
                type=2;
                info=obj.attr("sucmsg") || curform.data("tipmsg").r||tipmsg.r;

                //规则验证通过后，还需要对绑定recheck的对象进行值比较;
                if(obj.attr("recheck")){
                    var theother=curform.find("input[name='"+obj.attr("recheck")+"']:first");
                    if(gets!=theother.val()){
                        passed=false;
                        type=3;
                        info=obj.attr("errormsg")  || Validform.util.getErrormsg.call(obj,curform,datatype,"recheck");
                    }
                }
            }else{
                info=info || obj.attr("errormsg") || Validform.util.getErrormsg.call(obj,curform,datatype);

                //验证不通过且为空时;
                if(Validform.util.isEmpty.call(obj,gets)){
                    info=obj.attr("nullmsg") || Validform.util.getNullmsg.call(obj,curform);
                }
            }

            return{
                passed:passed,
                type:type,
                info:info
            };

        },

        regcheck:function(datatype,gets,obj){
            /*
             datatype:datatype;
             gets:inputvalue;
             obj:input object;
             */
            var curform=this,
                info=null,
                passed=false,
                type=3;//default set to wrong type, 2,3,4;

            //ignore;
            if(obj.attr("ignore")==="ignore" && Validform.util.isEmpty.call(obj,gets)){
                if(obj.data("cked")){
                    info="";
                }

                return {
                    passed:true,
                    type:4,
                    info:info
                };
            }

            obj.data("cked","cked");//do nothing if is the first time validation triggered;

            var dtype=Validform.util.parseDatatype(datatype);
            var res;
            for(var eithor=0; eithor<dtype.length; eithor++){
                for(var dtp=0; dtp<dtype[eithor].length; dtp++){
                    res=Validform.util._regcheck(dtype[eithor][dtp],gets,obj,curform);
                    if(!res.passed){
                        break;
                    }
                }
                if(res.passed){
                    break;
                }
            }
            return res;

        },

        parseDatatype:function(datatype){
            /*
             字符串里面只能含有一个正则表达式;
             Datatype名称必须是字母，数字、下划线或*号组成;
             datatype="/regexp/|phone|tel,s,e|f,e";
             ==>[["/regexp/"],["phone"],["tel","s","e"],["f","e"]];
             */

            var reg=/\/.+?\/[mgi]*(?=(,|$|\||\s))|[\w\*-]+/g,
                dtype=datatype.match(reg),
                sepor=datatype.replace(reg,"").replace(/\s*/g,"").split(""),
                arr=[],
                m=0;

            arr[0]=[];
            arr[0].push(dtype[0]);
            for(var n=0;n<sepor.length;n++){
                if(sepor[n]=="|"){
                    m++;
                    arr[m]=[];
                }
                arr[m].push(dtype[n+1]);
            }

            return arr;
        },

        showmsg:function(msg,type,o,triggered){
            /*
             msg:提示文字;
             type:提示信息显示方式;
             o:{obj:当前对象, type:1=>正在检测 | 2=>通过, sweep:true | false},
             triggered:在blur或提交表单触发的验证中，有些情况不需要显示提示文字，如自定义弹出提示框的显示方式，不需要每次blur时就马上弹出提示;

             tiptype:1\2\3时都有坑能会弹出自定义提示框
             tiptype:1时在triggered bycheck时不弹框
             tiptype:2\3时在ajax时弹框
             tipSweep为true时在triggered bycheck时不触发showmsg，但ajax出错的情况下要提示
             */

            //如果msg为undefined，那么就没必要执行后面的操作，ignore有可能会出现这情况;
            if(msg==undef){return;}

            //tipSweep为true，且当前不是处于错误状态时，blur事件不触发信息显示;
            if(triggered=="bycheck" && o.sweep && (o.obj && !o.obj.is(".Validform_error") || typeof type == "function")){return;}

            $.extend(o,{curform:this});

            if(typeof type == "function"){
                type(msg,o,Validform.util.cssctl);
                return;
            }

            if(type==1 || triggered=="byajax" && type!=4){
                msgobj.find(".Validform_info").html(msg);
            }

            //tiptypt=1时，blur触发showmsg，验证是否通过都不弹框，提交表单触发的话，只要验证出错，就弹框;
            if(type==1 && triggered!="bycheck" && o.type!=2 || triggered=="byajax" && type!=4){
                msghidden=false;
                msgobj.find(".iframe").css("height",msgobj.outerHeight());
                msgobj.show();
                setCenter(msgobj,100);
            }

            if(type==2 && o.obj){
                o.obj.parent().next().find(".Validform_checktip").html(msg);
                Validform.util.cssctl(o.obj.parent().next().find(".Validform_checktip"),o.type);
            }

            if((type==3 || type==4) && o.obj){
                o.obj.siblings(".Validform_checktip").html(msg);
                Validform.util.cssctl(o.obj.siblings(".Validform_checktip"),o.type);
            }

        },

        cssctl:function(obj,status){
            switch(status){
                case 1:
                    obj.removeClass("Validform_right Validform_wrong").addClass("Validform_checktip Validform_loading");//checking;
                    break;
                case 2:
                    obj.removeClass("Validform_wrong Validform_loading").addClass("Validform_checktip Validform_right");//passed;
                    break;
                case 4:
                    obj.removeClass("Validform_right Validform_wrong Validform_loading").addClass("Validform_checktip");//for ignore;
                    break;
                default:
                    obj.removeClass("Validform_right Validform_loading").addClass("Validform_checktip Validform_wrong");//wrong;
            }
        },

        check:function(curform,subpost,bool){
            /*
             检测单个表单元素;
             验证通过返回true，否则返回false、实时验证返回值为ajax;
             bool，传入true则只检测不显示提示信息;
             */
            var settings=curform[0].settings;
            var subpost=subpost || "";
            var inputval=Validform.util.getValue.call(curform,$(this));

            //隐藏或绑定dataIgnore的表单对象不做验证;
            if(settings.ignoreHidden && $(this).is(":hidden") || $(this).data("dataIgnore")==="dataIgnore"){
                return true;
            }

            //dragonfly=true时，没有绑定ignore，值为空不做验证，但验证不通过;
            if(settings.dragonfly && !$(this).data("cked") && Validform.util.isEmpty.call($(this),inputval) && $(this).attr("ignore")!="ignore"){
                return false;
            }

            var flag=Validform.util.regcheck.call(curform,$(this).attr("datatype"),inputval,$(this));

            //值没变化不做检测，这时要考虑recheck情况;
            //不是在提交表单时触发的ajax验证;
            if(inputval==this.validform_lastval && !$(this).attr("recheck") && subpost==""){
                return flag.passed ? true : false;
            }

            this.validform_lastval=inputval;//存储当前值;

            var _this;
            errorobj=_this=$(this);

            if(!flag.passed){
                //取消正在进行的ajax验证;
                Validform.util.abort.call(_this[0]);

                if(!bool){
                    //传入"bycheck"，指示当前是check方法里调用的，当tiptype=1时，blur事件不让触发错误信息显示;
                    Validform.util.showmsg.call(curform,flag.info,settings.tiptype,{obj:$(this),type:flag.type,sweep:settings.tipSweep},"bycheck");

                    !settings.tipSweep && _this.addClass("Validform_error");
                }
                return false;
            }

            //验证通过的话，如果绑定有ajaxurl，要执行ajax检测;
            //当ignore="ignore"时，为空值可以通过验证，这时不需要ajax检测;
            var ajaxurl=$(this).attr("ajaxurl");
            if(ajaxurl && !Validform.util.isEmpty.call($(this),inputval) && !bool){
                var inputobj=$(this);

                //当提交表单时，表单中的某项已经在执行ajax检测，这时需要让该项ajax结束后继续提交表单;
                if(subpost=="postform"){
                    inputobj[0].validform_subpost="postform";
                }else{
                    inputobj[0].validform_subpost="";
                }

                if(inputobj[0].validform_valid==="posting" && inputval==inputobj[0].validform_ckvalue){return "ajax";}

                inputobj[0].validform_valid="posting";
                inputobj[0].validform_ckvalue=inputval;
                Validform.util.showmsg.call(curform,curform.data("tipmsg").c||tipmsg.c,settings.tiptype,{obj:inputobj,type:1,sweep:settings.tipSweep},"bycheck");

                Validform.util.abort.call(_this[0]);

                var ajaxsetup=$.extend(true,{},settings.ajaxurl || {});

                var localconfig={
                    type: "POST",
                    cache:false,
                    url: ajaxurl,
                    data: "param="+encodeURIComponent(inputval)+"&name="+encodeURIComponent($(this).attr("name")),
                    success: function(data){
                        if($.trim(data.status)==="y"){
                            inputobj[0].validform_valid="true";
                            data.info && inputobj.attr("sucmsg",data.info);
                            Validform.util.showmsg.call(curform,inputobj.attr("sucmsg") || curform.data("tipmsg").r||tipmsg.r,settings.tiptype,{obj:inputobj,type:2,sweep:settings.tipSweep},"bycheck");
                            _this.removeClass("Validform_error");
                            errorobj=null;
                            if(inputobj[0].validform_subpost=="postform"){
                                curform.trigger("submit");
                            }
                        }else{
                            inputobj[0].validform_valid=data.info;
                            Validform.util.showmsg.call(curform,data.info,settings.tiptype,{obj:inputobj,type:3,sweep:settings.tipSweep});
                            _this.addClass("Validform_error");
                        }
                        _this[0].validform_ajax=null;
                    },
                    error: function(data){
                        if(data.status=="200"){
                            if(data.responseText=="y"){
                                ajaxsetup.success({"status":"y"});
                            }else{
                                ajaxsetup.success({"status":"n","info":data.responseText});
                            }
                            return false;
                        }

                        //正在检测时，要检测的数据发生改变，这时要终止当前的ajax。不是这种情况引起的ajax错误，那么显示相关错误信息;
                        if(data.statusText!=="abort"){
                            var msg="status: "+data.status+"; statusText: "+data.statusText;

                            Validform.util.showmsg.call(curform,msg,settings.tiptype,{obj:inputobj,type:3,sweep:settings.tipSweep});
                            _this.addClass("Validform_error");
                        }

                        inputobj[0].validform_valid=data.statusText;
                        _this[0].validform_ajax=null;

                        //localconfig.error返回true表示还需要执行temp_err;
                        return true;
                    }
                }

                if(ajaxsetup.success){
                    var temp_suc=ajaxsetup.success;
                    ajaxsetup.success=function(data){
                        localconfig.success(data);
                        temp_suc(data,inputobj);
                    }
                }

                if(ajaxsetup.error){
                    var temp_err=ajaxsetup.error;
                    ajaxsetup.error=function(data){
                        //localconfig.error返回false表示不需要执行temp_err;
                        localconfig.error(data) && temp_err(data,inputobj);
                    }
                }

                ajaxsetup=$.extend({},localconfig,ajaxsetup,{dataType:"json"});
                _this[0].validform_ajax=$.ajax(ajaxsetup);

                return "ajax";
            }else if(ajaxurl && Validform.util.isEmpty.call($(this),inputval)){
                Validform.util.abort.call(_this[0]);
                _this[0].validform_valid="true";
            }

            if(!bool){
                Validform.util.showmsg.call(curform,flag.info,settings.tiptype,{obj:$(this),type:flag.type,sweep:settings.tipSweep},"bycheck");
                _this.removeClass("Validform_error");
            }
            errorobj=null;

            return true;

        },

        submitForm:function(settings,flg,url,ajaxPost,sync){
            /*
             flg===true时跳过验证直接提交;
             ajaxPost==="ajaxPost"指示当前表单以ajax方式提交;
             */
            var curform=this;

            //表单正在提交时点击提交按钮不做反应;
            if(curform[0].validform_status==="posting"){return false;}

            //要求只能提交一次时;
            if(settings.postonce && curform[0].validform_status==="posted"){return false;}

            var beforeCheck=settings.beforeCheck && settings.beforeCheck(curform);
            if(beforeCheck===false){return false;}

            var flag=true,
                inflag;

            curform.find("[datatype]").each(function(){
                //跳过验证;
                if(flg){
                    return false;
                }

                //隐藏或绑定dataIgnore的表单对象不做验证;
                if(settings.ignoreHidden && $(this).is(":hidden") || $(this).data("dataIgnore")==="dataIgnore"){
                    return true;
                }

                var inputval=Validform.util.getValue.call(curform,$(this)),
                    _this;
                errorobj=_this=$(this);

                inflag=Validform.util.regcheck.call(curform,$(this).attr("datatype"),inputval,$(this));

                if(!inflag.passed){
                    Validform.util.showmsg.call(curform,inflag.info,settings.tiptype,{obj:$(this),type:inflag.type,sweep:settings.tipSweep});
                    _this.addClass("Validform_error");

                    if(!settings.showAllError){
                        _this.focus();
                        flag=false;
                        return false;
                    }

                    flag && (flag=false);
                    return true;
                }

                //当ignore="ignore"时，为空值可以通过验证，这时不需要ajax检测;
                if($(this).attr("ajaxurl") && !Validform.util.isEmpty.call($(this),inputval)){
                    if(this.validform_valid!=="true"){
                        var thisobj=$(this);
                        Validform.util.showmsg.call(curform,curform.data("tipmsg").v||tipmsg.v,settings.tiptype,{obj:thisobj,type:3,sweep:settings.tipSweep});
                        _this.addClass("Validform_error");

                        thisobj.trigger("blur",["postform"]);//continue the form post;

                        if(!settings.showAllError){
                            flag=false;
                            return false;
                        }

                        flag && (flag=false);
                        return true;
                    }
                }else if($(this).attr("ajaxurl") && Validform.util.isEmpty.call($(this),inputval)){
                    Validform.util.abort.call(this);
                    this.validform_valid="true";
                }

                Validform.util.showmsg.call(curform,inflag.info,settings.tiptype,{obj:$(this),type:inflag.type,sweep:settings.tipSweep});
                _this.removeClass("Validform_error");
                errorobj=null;
            });

            if(settings.showAllError){
                curform.find(".Validform_error:first").focus();
            }

            if(flag){
                var beforeSubmit=settings.beforeSubmit && settings.beforeSubmit(curform);
                if(beforeSubmit===false){return false;}

                curform[0].validform_status="posting";

                if(settings.ajaxPost || ajaxPost==="ajaxPost"){
                    //获取配置参数;
                    var ajaxsetup=$.extend(true,{},settings.ajaxpost || {});
                    //有可能需要动态的改变提交地址，所以把action所指定的url层级设为最低;
                    ajaxsetup.url=url || ajaxsetup.url || settings.url || curform.attr("action");

                    //byajax：ajax时，tiptye为1、2或3需要弹出提示框;
                    Validform.util.showmsg.call(curform,curform.data("tipmsg").p||tipmsg.p,settings.tiptype,{obj:curform,type:1,sweep:settings.tipSweep},"byajax");

                    //方法里的优先级要高;
                    //有undefined情况;
                    if(sync){
                        ajaxsetup.async=false;
                    }else if(sync===false){
                        ajaxsetup.async=true;
                    }

                    if(ajaxsetup.success){
                        var temp_suc=ajaxsetup.success;
                        ajaxsetup.success=function(data){
                            settings.callback && settings.callback(data);
                            curform[0].validform_ajax=null;
                            if($.trim(data.status)==="y"){
                                curform[0].validform_status="posted";
                            }else{
                                curform[0].validform_status="normal";
                            }

                            temp_suc(data,curform);
                        }
                    }

                    if(ajaxsetup.error){
                        var temp_err=ajaxsetup.error;
                        ajaxsetup.error=function(data){
                            settings.callback && settings.callback(data);
                            curform[0].validform_status="normal";
                            curform[0].validform_ajax=null;

                            temp_err(data,curform);
                        }
                    }

                    var localconfig={
                        type: "POST",
                        async:true,
                        data: curform.serializeArray(),
                        success: function(data){
                            if($.trim(data.status)==="y"){
                                //成功提交;
                                curform[0].validform_status="posted";
                                Validform.util.showmsg.call(curform,data.info,settings.tiptype,{obj:curform,type:2,sweep:settings.tipSweep},"byajax");
                            }else{
                                //提交出错;
                                curform[0].validform_status="normal";
                                Validform.util.showmsg.call(curform,data.info,settings.tiptype,{obj:curform,type:3,sweep:settings.tipSweep},"byajax");
                            }

                            settings.callback && settings.callback(data);
                            curform[0].validform_ajax=null;
                        },
                        error: function(data){
                            var msg="status: "+data.status+"; statusText: "+data.statusText;

                            Validform.util.showmsg.call(curform,msg,settings.tiptype,{obj:curform,type:3,sweep:settings.tipSweep},"byajax");

                            settings.callback && settings.callback(data);
                            curform[0].validform_status="normal";
                            curform[0].validform_ajax=null;
                        }
                    }

                    ajaxsetup=$.extend({},localconfig,ajaxsetup,{dataType:"json"});

                    curform[0].validform_ajax=$.ajax(ajaxsetup);

                }else{
                    if(!settings.postonce){
                        curform[0].validform_status="normal";
                    }

                    var url=url || settings.url;
                    if(url){
                        curform.attr("action",url);
                    }

                    return settings.callback && settings.callback(curform);
                }
            }

            return false;

        },

        resetForm:function(){
            var brothers=this;
            brothers.each(function(){
                this.reset && this.reset();
                this.validform_status="normal";
            });

            brothers.find(".Validform_right").text("");
            brothers.find(".passwordStrength").children().removeClass("bgStrength");
            brothers.find(".Validform_checktip").removeClass("Validform_wrong Validform_right Validform_loading");
            brothers.find(".Validform_error").removeClass("Validform_error");
            brothers.find("[datatype]").removeData("cked").removeData("dataIgnore").each(function(){
                this.validform_lastval=null;
            });
            brothers.eq(0).find("input:first").focus();
        },

        abort:function(){
            if(this.validform_ajax){
                this.validform_ajax.abort();
            }
        }

    }

    $.Datatype=Validform.util.dataType;

    Validform.prototype={
        dataType:Validform.util.dataType,

        eq:function(n){
            var obj=this;

            if(n>=obj.forms.length){
                return null;
            }

            if(!(n in obj.objects)){
                obj.objects[n]=new Validform($(obj.forms[n]).get(),{},true);
            }

            return obj.objects[n];

        },

        resetStatus:function(){
            var obj=this;
            $(obj.forms).each(function(){
                this.validform_status="normal";
            });

            return this;
        },

        setStatus:function(status){
            var obj=this;
            $(obj.forms).each(function(){
                this.validform_status=status || "posting";
            });

            return this;
        },

        getStatus:function(){
            var obj=this;
            var status=$(obj.forms)[0].validform_status;

            return status;
        },

        ignore:function(selector){
            var obj=this;
            var selector=selector || "[datatype]"

            $(obj.forms).find(selector).each(function(){
                $(this).data("dataIgnore","dataIgnore").removeClass("Validform_error");
            });

            return this;
        },

        unignore:function(selector){
            var obj=this;
            var selector=selector || "[datatype]"

            $(obj.forms).find(selector).each(function(){
                $(this).removeData("dataIgnore");
            });

            return this;
        },

        addRule:function(rule){
            /*
             rule => [{
             ele:"#id",
             datatype:"*",
             errormsg:"出错提示文字！",
             nullmsg:"为空时的提示文字！",
             tip:"默认显示的提示文字",
             altercss:"gray",
             ignore:"ignore",
             ajaxurl:"valid.php",
             recheck:"password",
             plugin:"passwordStrength"
             },{},{},...]
             */
            var obj=this;
            var rule=rule || [];

            for(var index=0; index<rule.length; index++){
                var o=$(obj.forms).find(rule[index].ele);
                for(var attr in rule[index]){
                    attr !=="ele" && o.attr(attr,rule[index][attr]);
                }
            }

            $(obj.forms).each(function(){
                var $this=$(this);
                Validform.util.enhance.call($this,this.settings.tiptype,this.settings.usePlugin,this.settings.tipSweep,"addRule");
            });

            return this;
        },

        ajaxPost:function(flag,sync,url){
            var obj=this;

            $(obj.forms).each(function(){
                //创建pop box;
                if( this.settings.tiptype==1 || this.settings.tiptype==2 || this.settings.tiptype==3 ){
                    creatMsgbox();
                }

                Validform.util.submitForm.call($(obj.forms[0]),this.settings,flag,url,"ajaxPost",sync);
            });

            return this;
        },

        submitForm:function(flag,url){
            /*flag===true时不做验证直接提交*/


            var obj=this;

            $(obj.forms).each(function(){
                var subflag=Validform.util.submitForm.call($(this),this.settings,flag,url);
                subflag === undef && (subflag=true);
                if(subflag===true){
                    this.submit();
                }
            });

            return this;
        },

        resetForm:function(){
            var obj=this;
            Validform.util.resetForm.call($(obj.forms));

            return this;
        },

        abort:function(){
            var obj=this;
            $(obj.forms).each(function(){
                Validform.util.abort.call(this);
            });

            return this;
        },

        check:function(bool,selector){
            /*
             bool：传入true，只检测不显示提示信息;
             */

            var selector=selector || "[datatype]",
                obj=this,
                curform=$(obj.forms),
                flag=true;

            curform.find(selector).each(function(){
                Validform.util.check.call(this,curform,"",bool) || (flag=false);
            });

            return flag;
        },

        config:function(setup){
            /*
             config={
             url:"ajaxpost.php",//指定了url后，数据会提交到这个地址;
             ajaxurl:{
             timeout:1000,
             ...
             },
             ajaxpost:{
             timeout:1000,
             ...
             }
             }
             */
            var obj=this;
            setup=setup || {};
            $(obj.forms).each(function(){
                var $this=$(this);
                this.settings=$.extend(true,this.settings,setup);
                Validform.util.enhance.call($this,this.settings.tiptype,this.settings.usePlugin,this.settings.tipSweep);
            });

            return this;
        }
    }

    $.fn.Validform=function(settings){
        return new Validform(this,settings);
    };

    function setCenter(obj,time){
        var left=($(window).width()-obj.outerWidth())/2,
            top=($(window).height()-obj.outerHeight())/2,

            top=(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)+(top>0?top:0);

        obj.css({
            left:left
        }).animate({
            top : top
        },{ duration:time , queue:false });
    }

    function creatMsgbox(){
        if($("#Validform_msg").length!==0){return false;}
        msgobj=$('<div id="Validform_msg"><div class="Validform_title">'+tipmsg.tit+'<a class="Validform_close" href="javascript:void(0);">&chi;</a></div><div class="Validform_info"></div><div class="iframe"><iframe frameborder="0" scrolling="no" height="100%" width="100%"></iframe></div></div>').appendTo("body");//提示信息框;
        msgobj.find("a.Validform_close").click(function(){
            msgobj.hide();
            msghidden=true;
            if(errorobj){
                errorobj.focus().addClass("Validform_error");
            }
            return false;
        }).focus(function(){this.blur();});

        $(window).bind("scroll resize",function(){
            !msghidden && setCenter(msgobj,400);
        });
    };

    //公用方法显示&关闭信息提示框;
    $.Showmsg=function(msg){
        creatMsgbox();
        Validform.util.showmsg.call(win,msg,1,{});
    };

    $.Hidemsg=function(){
        msgobj.hide();
        msghidden=true;
    };

})(jQuery,window);
///<jscompress sourcefile="mmGrid.js" />

/**
 * Author: meimeidev
 */

isParams = 0;
isParam = false;
!function($){
    checkFisrt = false;
    var MMGrid = function (element, options) {
        this._id = (((1 + Math.random()) * 0x10000) | 0).toString(16);
        this._loadCount = 0;
        this.opts = options;
        this._initLayout($(element));
        this._initHead();
        this._initOptions();
        this._initEvents();
        this._setColsWidth();
        if(this.opts.fullWidthRows){
            this._fullWidthRows();
        }

        //初始化插件
        for(var i=0; i< this.opts.plugins.length; i++){
            var plugin = this.opts.plugins[i];
            plugin.init($.extend(element, this));
        }

        if(options.autoLoad){
            var that = this;
            this.opts = options;
            setTimeout(function(){

                if(options.url){
                    that.load();
                }else{
                    that.load(options.items);
                }
            },0); //chrome style problem
        }

    };

    //see: http://tanalin.com/en/articles/ie-version-js/
    var browser = function(){
        var isIE=!!window.ActiveXObject;
        var isIE10 = isIE && !!window.atob;
        var isIE9 = isIE && document.addEventListener && !window.atob;
        var isIE8 = isIE && document.querySelector && !document.addEventListener;
        var isIE7 = isIE && window.XMLHttpRequest && !document.querySelector;
        var isIE6 = isIE && !window.XMLHttpRequest;

        return {
            isIE: isIE
            , isIE6: isIE6
            , isIE7: isIE7
            , isIE8: isIE8
            , isIE9: isIE9
            , isIE10: isIE10
        };
    }();

    MMGrid.prototype = {

        _initLayout: function($el){
            var opts = this.opts;
            var $elParent = $el.parent();
            var elIndex = $el.index();

            var mmGrid = [
                '<div class="mmGrid">',
                '<style></style>',
                '<div class="mmg-headWrapper">',
                '<table class="mmg-head" cellspacing="0"></table>',
                '</div>',
                '<div class="mmg-colResizePointer"></div>',
                '<div class="mmg-colResizePointer-before"></div>',
                '<div class="mmg-backboard">',
                '<a class="mmg-btnBackboardUp"></a>',
                '</div>',
                '<div class="mmg-bodyWrapper"></div>',
                '<a class="mmg-btnBackboardDn"></a>',
                '<div class="mmg-message">'+ this.opts.noDataText +'</div>',
                '<div class="mmg-mask mmg-transparent"></div>',
                '<div class="mmg-loading">',
                '<div class="mmg-loadingImg"></div>',
                '<div class="mmg-loadingText">'+ this.opts.loadingText +'</div>',
                '</div>',

                '</div>'
            ];
            //fix in IE7,IE6
            if(browser.isIE7 || browser.isIE6){
                $el.prop('cellspacing',0);
            }


            //cached object
            var $mmGrid = $(mmGrid.join(''));
            this.$mmGrid = $mmGrid;
            this.$style = $mmGrid.find('style');
            this.$headWrapper = $mmGrid.find('.mmg-headWrapper');
            this.$head = $mmGrid.find('.mmg-head');
            this.$backboard = $mmGrid.find('.mmg-backboard');
            this.$bodyWrapper = $mmGrid.find('.mmg-bodyWrapper');
            this.$body = $el.removeAttr("style").addClass('mmg-body');
            this._insertEmptyRow();
            this.$body.appendTo(this.$bodyWrapper);



            //放回原位置
            if(elIndex === 0 || $elParent.children().length == 0){
                $elParent.prepend(this.$mmGrid);
            }else{
                $elParent.children().eq(elIndex-1).after(this.$mmGrid);
            }


            // fix in ie6
            if(browser.isIE6 && (!opts.width || opts.width === 'auto')){
                $mmGrid.width('100%');
                $mmGrid.width($mmGrid.width() - ($mmGrid.outerWidth(true) - $mmGrid.width()));
            }else{
                $mmGrid.width(opts.width);
            }

            if(browser.isIE6 && (!opts.height || opts.height === 'auto')){
                $mmGrid.height('100%');
                $mmGrid.height($mmGrid.height() - ($mmGrid.outerHeight(true) - $mmGrid.height()));
            }else{
                $mmGrid.height(opts.height);
            }

            if(opts.checkCol){
                var chkHtml = opts.multiSelect ?  '<input type="checkbox" class="checkAll" >'
                    : '<input type="checkbox" disabled="disabled" class="checkAll">';
                opts.cols.unshift({title:chkHtml,width: 20, align: 'center' ,lockWidth: true, checkCol: true, renderer:function(){
                    return '<input type="checkbox" class="mmg-check">';
                }});
            }

            if(opts.indexCol){

                opts.cols.unshift({title:'#',width: opts.indexColWidth, align: 'center' ,lockWidth: true, indexCol:true, renderer:function(val,item,rowIndex){
                   return '<label class="mmg-index">' + (rowIndex+1) + '</label>';
                }});
            }

        }

        ,_expandCols: function(cols){
            var newCols = [];
            if(!cols){
                return newCols;
            }
            for(var colIndex=0; colIndex<cols.length; colIndex++){
                var col = cols[colIndex];
                if(col.cols){
                    newCols.push(col);
                    newCols.push.apply(newCols,this._expandCols(col.cols));
                }else{
                    newCols.push(col);
                }
            }
            return newCols;
        }
        ,_leafCols: function(){
            var opts = this.opts;
            var newCols = [];
            var cols = this._expandCols(opts.cols);
            for(var colIndex=0; colIndex<cols.length; colIndex++){
                var col = cols[colIndex];
                if(!col.cols){
                    newCols.push(col);
                }
            }
            return newCols;
        }

        ,_expandThs: function(){
            return this.$head.find('th').sort(function(a, b){
                return parseInt($(a).data('colindex')) - parseInt($(b).data('colindex'));
            });
        }

        ,_leafThs: function(){
            return this.$head.find('th').filter(function(){
                return !$.data(this,'col').cols;
            }).sort(function(a, b){
                return parseInt($(a).data('colindex')) - parseInt($(b).data('colindex'));
            });
        }


        ,_colsWithTitleDeep: function(cols,deep){
            var newCols = [];
            if(!cols){
                return newCols;
            }
            for(var colIndex=0; colIndex<cols.length; colIndex++){
                var col = cols[colIndex];
                if(deep === 1){
                    newCols.push(col);
                }else{
                    newCols.push.apply(newCols, this._colsWithTitleDeep(col.cols, deep-1));
                }
            }
            return newCols;
        }

        ,_titleDeep: function(cols){
            var deep = 1;
            for(var colIndex=0; colIndex<cols.length; colIndex++){
                var col = cols[colIndex];
                if(col.cols){
                    var newDeep = 1 + this._titleDeep(col.cols);
                    if(deep < newDeep){
                        deep = newDeep;
                    }
                }
            }
            return deep;
        }

        , _titleHtml: function(col, rowspan){
            var opts = this.opts;

            var titleHtml = [];
            if(!col.cols){
                titleHtml.push('<th class="');
                var colIndex =  $.inArray(col, this._expandCols(opts.cols));
                titleHtml.push(this._genColClass(colIndex));
                titleHtml.push(' " ');
                titleHtml.push(' rowspan="');
                titleHtml.push(rowspan);
                titleHtml.push('" colspan="');
                titleHtml.push(1);
                titleHtml.push('" data-colIndex="');
                titleHtml.push(colIndex);
                titleHtml.push('" >');
                titleHtml.push('<div class="mmg-titleWrapper" >');
                titleHtml.push('<span class="mmg-title ');
                if(col.sortable) titleHtml.push('mmg-canSort ');
                titleHtml.push('">');
                if(col.titleHtml){
                    titleHtml.push(col.titleHtml);
                }else{
                    titleHtml.push(col.title);
                }
                titleHtml.push('</span><div class="mmg-sort"></div>');
                if(!col.lockWidth) titleHtml.push('<div class="mmg-colResize"></div>');
                titleHtml.push('</div></th>');
            }else{
                titleHtml.push('<th class="');
                var colIndex =  $.inArray(col, this._expandCols(opts.cols));
                titleHtml.push(this._genColClass(colIndex));
                titleHtml.push(' mmg-groupCol" ');
                titleHtml.push(' rowspan="');
                titleHtml.push(rowspan-1);
                titleHtml.push('" colspan="');
                titleHtml.push(col.cols.length);
                titleHtml.push('" data-colIndex="');
                titleHtml.push(colIndex);
                titleHtml.push('" >');
                titleHtml.push('<div class="mmg-titleWrapper" >');
                titleHtml.push('<span class="mmg-title ');
                if(col.sortable) titleHtml.push('mmg-canSort ');
                titleHtml.push('">');
                if(col.titleHtml){
                    titleHtml.push(col.titleHtml);
                }else{
                    titleHtml.push(col.title);
                }
                titleHtml.push('</span><div class="mmg-sort"></div>');
                titleHtml.push('</div></th>');
            }

            return titleHtml.join("");
        }

        , _initHead: function(){
            var that = this;
            var opts = this.opts;
            var $head = this.$head;

            if(opts.cols){
                var theadHtmls = ['<thead>'];

                //获取标题深度
                var titleDeep = that._titleDeep(opts.cols);
                for(var deep=1; deep<= titleDeep; deep++){
                    var cols = that._colsWithTitleDeep(opts.cols, deep);
                    theadHtmls.push('<tr>');
                    for(var colIndex=0; colIndex< cols.length; colIndex++){
                        var col = cols[colIndex];
                        theadHtmls.push(this._titleHtml(col, titleDeep-deep+1));
                    }
                    theadHtmls.push('</tr>');
                }
                theadHtmls.push('</thead>');
                $head.html(theadHtmls.join(''));
            }

            var $ths = this._expandThs();
            var expandCols = this._expandCols(opts.cols);
            $.each($ths,function(index){
                if(!expandCols[index].width){
                    expandCols[index].width = 100;
                }
                $.data(this,'col-width',expandCols[index].width);
                $.data(this,'col',expandCols[index]);
            });

            var $mmGrid = this.$mmGrid;
            var $headWrapper = this.$headWrapper;
            var $bodyWrapper = this.$bodyWrapper;
            if(opts.height !== 'auto'){
                $bodyWrapper.height($mmGrid.height() - $headWrapper.outerHeight(true));
            }



            //初始化排序状态
            if(opts.sortName){
                for(var colIndex=0; colIndex< expandCols.length; colIndex++){
                    var col = expandCols[colIndex];
                    if(col.sortName === opts.sortName || col.name === opts.sortName){
                        var $th= $ths.eq(colIndex);
                        $.data($th.find('.mmg-title')[0],'sortStatus',opts.sortStatus);
                        $th.find('.mmg-sort').addClass('mmg-'+opts.sortStatus);
                    }
                }
            }
        }

        , _initOptions: function(){
            var opts = this.opts;
            var $mmGrid = this.$mmGrid;
            var $headWrapper = this.$headWrapper;
            var $backboard = this.$backboard;
            $mmGrid.find('a.mmg-btnBackboardDn').css({
                'top': $headWrapper.outerHeight(true)
            }).slideUp('fast');

            var cols = this._leafCols();
            if(cols){
                var bbHtml = ['<h1>显示列</h1>'];
                for(var colIndex=0; colIndex<cols.length; colIndex++){
                    bbHtml.push('<label ');
                    if(cols[colIndex].checkCol || cols[colIndex].indexCol){
                        bbHtml.push('style="display:none;" ');
                    }
                    var col = cols[colIndex];
                    bbHtml.push('><input type="checkbox"  ');
                    if(!col.hidden) bbHtml.push('checked="checked"');
                    if(col.lockDisplay) bbHtml.push(' disabled="disabled"');
                    bbHtml.push('/><span>');
                    if(col.title){
                        bbHtml.push(col.title);
                    }else{
                        bbHtml.push('未命名');
                    }

                    bbHtml.push('</span></label>');
                }

                $backboard.append($(bbHtml.join('')));
            }
        }

        , _initEvents: function(){
            var that = this;
            var opts = this.opts;
            var $mmGrid = this.$mmGrid;
            var $headWrapper = this.$headWrapper;
            var $head = this.$head;
            var $bodyWrapper = this.$bodyWrapper;
            var $body = this.$body;
            var $backboard = this.$backboard;
            var $ths = this._expandThs();
            var expandCols = this._expandCols(opts.cols);
            var leafCols = this._leafCols();

            //调整浏览器
            if(opts.width === 'auto' || opts.height === 'auto' || (typeof opts.width === 'string' && opts.width.indexOf('%') === opts.width.length-1) ||
                typeof opts.height === 'string' && opts.height.indexOf('%') === opts.height.length-1){
                $(window).on('resize', function(){
                    that.resize();
                });
            }

            //滚动条事件
            $bodyWrapper.on('scroll', function(){
                $head.css('left',- $(this).scrollLeft());
            });

            //向下按钮
            var $btnBackboardDn = $mmGrid.find('a.mmg-btnBackboardDn').on('click', function(){
                var backboardHeight = $mmGrid.height() - $headWrapper.outerHeight(true);
                if(opts.height === 'auto'&& opts.backboardMinHeight !== 'auto' && backboardHeight < opts.backboardMinHeight){
                    backboardHeight = opts.backboardMinHeight;
                }
                $backboard.height(backboardHeight);
                if(opts.height === 'auto'){
                    $mmGrid.height($headWrapper.outerHeight(true) + $backboard.outerHeight(true));
                }
                $backboard.slideDown();
                $btnBackboardDn.slideUp('fast');

                that._hideNoData();
            });
            $body.on('mouseenter', function(){
                $btnBackboardDn.slideUp('fast');
            });
            $mmGrid.on('mouseleave', function(){
                $btnBackboardDn.slideUp('fast');
            });
            $headWrapper.on('mouseenter',function(){
                if($backboard.is(':hidden') && opts.showBackboard){
                    $btnBackboardDn.slideDown('fast');
                }
            });
            //向上按钮
            $mmGrid.find('a.mmg-btnBackboardUp').on('click', function(){
                $backboard.slideUp().queue(function(next){
                    if(!that.rowsLength() || (that.rowsLength() === 1 && $body.find('tr.emptyRow').length === 1)){
                        that._showNoData();
                    }
                    if(opts.height === 'auto'){
                        $mmGrid.height('auto');
                    }
                    next();
                });
            });

            //隐藏列
            $backboard.on('click', ':checkbox', function(){
                var index = $backboard.find('label').index($(this).parent());
                //最后一个不隐藏
                var last = 1;
                if(opts.checkCol){
                    last = last + 1;
                }
                if(opts.indexCol){
                    last = last + 1;
                }
                if($backboard.find('label :checked').length < last){
                    this.checked = true;
                    return;
                }

                var col = leafCols[index];
                if(this.checked){
                    col.hidden = false;

                }else{
                    col.hidden = true;
                }

                var $ths = $head.find('th');
                for(var colIndex=$ths.length-1; colIndex>=0; colIndex--){
                    var $th = $ths.eq(colIndex);
                    var iCol = $th.data('col');
                    if(iCol.cols){
                        var hidden = true;
                        var colspan = 0;
                        $.each(iCol.cols,function(index,item){
                            if(!item.hidden){
                                hidden = false;
                                colspan++;
                            }
                        });
                        //IE bug
                        if(colspan !== 0){
                            $th.prop('colspan',colspan);
                        }
                        iCol.hidden = hidden;
                    }
                }

                that._setColsWidth();
                $backboard.height($mmGrid.height() - $headWrapper.outerHeight(true));
                if(opts.height !== 'auto'){
                    $bodyWrapper.height($mmGrid.height() - $headWrapper.outerHeight(true));
                }
                $mmGrid.find('a.mmg-btnBackboardDn').css({
                    'top': $headWrapper.outerHeight(true)
                })
            });



            //排序事件
            $head.on('click', '.mmg-title', function(){
                var $this = $(this);
                var $titles =  $ths.find('.mmg-title');

                //当前列不允许排序
                var col =$this.parent().parent().data('col');
                if(!col.sortable){
                    return;
                }
                //取得当前列下一个排序状态
                var sortStatus = $.data(this, 'sortStatus') === 'asc' ? 'desc' : 'asc';
                //清除排序状态
                $.each($titles, function(){
                    $.removeData(this,'sortStatus');
                });
                $ths.find('.mmg-sort').removeClass('mmg-asc').removeClass('mmg-desc');
                //设置当前列排序状态
                $.data(this, 'sortStatus', sortStatus);
                $this.siblings('.mmg-sort').addClass('mmg-'+sortStatus);

                if(opts.url && opts.remoteSort){
                    that.load()
                }else{
                    that._nativeSorter($.inArray(col, leafCols), sortStatus);
                    that._setStyle();
                }
            }).on('mousedown', '.mmg-colResize', function(e){
                //调整列宽
                var $resize = $(this);
                var start = e.pageX;
                var $colResizePointer = $mmGrid.find('.mmg-colResizePointer')
                    .css('left', e.pageX - $headWrapper.offset().left).show();

                var scrollLeft = $head.position().left;
                var $colResizePointerBefore = $mmGrid.find('.mmg-colResizePointer-before')
                    .css('left', $resize.parent().parent().position().left + scrollLeft).show();
                //取消文字选择
                document.selection && document.selection.empty && ( document.selection.empty(), 1)
                || window.getSelection && window.getSelection().removeAllRanges();
                document.body.onselectstart = function () {
                    return false;
                };
                $headWrapper.css('-moz-user-select','none');

                $mmGrid.on('mousemove', function(e){
                    $colResizePointer.css('left', e.pageX - $headWrapper.offset().left);
                }).on('mouseup', function(e){
                    //改变宽度
                    var $th = $resize.parent().parent();
                    var width = $th.width() + e.pageX - start;
                    $.data($th[0], 'col-width', width);
                    that._setColsWidth();
                    $headWrapper.mouseleave();
                }).on('mouseleave',function(){
                    $mmGrid.off('mouseup').off('mouseleave').off('mousemove');
                    $colResizePointer.hide();
                    $colResizePointerBefore.hide();
                    document.body.onselectstart = function(){
                        return true;//开启文字选择
                    };
                    $headWrapper.css('-moz-user-select','text');
                });
            });

            //选中事件
            var $body = this.$body;
            $body.on('click','td',function(e){
                var $this = $(this);
                var event = jQuery.Event("cellSelected");
                event.target = e.target;
                that.$body.triggerHandler(event, [$.data($this.parent()[0], 'item'), $this.parent().index(), $this.index()]);

                if(event.isPropagationStopped()){
                    return;
                }
                if(!$this.parent().hasClass('selected')){
                    that.select($this.parent().index());
                }else{
                    that.deselect($this.parent().index());
                }
            });

            $body.on('click','tr > td .mmg-check',function(e){
                e.stopPropagation();
                var $this = $(this);
                if(this.checked){
                    that.select($($this.parents('tr')[0]).index());
                }else{
                    that.deselect($($this.parents('tr')[0]).index());
                }
            });

            //checkbox列
            if(opts.checkCol){
                $head.find('th .checkAll').on('click', function(){
                    if(this.checked){
                        that.select('all');
                    }else{
                        that.deselect('all');
                    }
                });
            }

            //IE6不支持hover
            if (browser.isIE6){
                $body.on('mouseenter','tr', function () {
                    $(this).toggleClass('hover');
                }).on('mouseleave','tr', function () {
                    $(this).toggleClass('hover');
                });
            };


        }

        , _rowHtml: function(item, rowIndex){

            var opts = this.opts;
            var expandCols = this._expandCols(opts.cols);
            var leafCols = this._leafCols();


            if($.isPlainObject(item)){
                var trHtml = [];
                trHtml.push('<tr>');
                for(var colIndex=0; colIndex < leafCols.length; colIndex++){
                    var col = leafCols[colIndex];
                  trHtml.push('<td class="');
                   
                    var index =  $.inArray(col, expandCols);
                    trHtml.push(this._genColClass(index));
                    if(opts.nowrap){
                        trHtml.push(' nowrap');
                    }
                    trHtml.push('"><span class="');
                    if(opts.nowrap){
                        trHtml.push('nowrap');
                    }
                    trHtml.push('">');
                    if(col.renderer){
                        trHtml.push(col.renderer(item[col.name],item,rowIndex));
                    }else{
                        trHtml.push(item[col.name]);
                    }

                    trHtml.push('</span></td>');
                };
                trHtml.push('</tr>');
                return trHtml.join('');
            }
        }

        , _populate: function(items){
            var opts = this.opts;
            var $body=this.$body;
            this._hideNoData();
            if(items && items.length !== 0 && opts.cols){
                var tbodyHtmls = [];
                tbodyHtmls.push('<tbody>');
                for(var rowIndex=0; rowIndex < items.length; rowIndex++){
                    var item = items[rowIndex];
                    tbodyHtmls.push(this._rowHtml(item, rowIndex));
                }
                tbodyHtmls.push('</tbody>');
                var tbodyH=tbodyHtmls.join('');
                $body.empty().html(tbodyH);
               
                var $trs = $body.find('tr');
                for(var rowIndex=0; rowIndex < items.length; rowIndex++){
                    $.data($trs.eq(rowIndex)[0],'item',items[rowIndex]);
                }
            }else{
                this._insertEmptyRow();
                this._showNoData();
            }
            this._setStyle();

            if(opts.fullWidthRows && this._loadCount <= 1){
                this._fullWidthRows();
            }

            this._hideLoading();
        }

        , _insertEmptyRow: function(){
            var $body = this.$body;
            $body.empty().html('<tbody><tr class="emptyRow"><td  style="border: 0px;background: none;">&nbsp;</td></tr></tbody>');
        }
        , _removeEmptyRow: function(){
            var $body = this.$body;
            $body.find('tr.emptyRow').remove();
        }

        /* 生成列类 */
        , _genColClass: function(colIndex){
            return 'mmg'+ this._id +'-col'+colIndex;
        }

        , _setStyle: function(){
            var $head = this.$head;
            var $ths = this._expandThs();
            var $body = this.$body;
            var leafCol = this._leafCols();

            //head
            $ths.eq(0).addClass('first');
            $ths.eq(1).addClass('noExl');
            $ths.eq(-1).addClass('last noExl');
            //body
            $body.find('tr,td').removeClass('even')
                .removeClass('colSelected').removeClass('colSelectedEven');

            $body.find('tr:odd').addClass('even');
            $body.find('tr>td').eq(1).addClass('noExl');
            $body.find('tr>td').eq(-1).addClass('noExl');



            var sortIndex = $.inArray($head.find('.mmg-title').filter(function(){
                return $.data(this,'sortStatus') === 'asc' || $(this).data('sortStatus') === 'desc';
            }).parent().parent().data('col'), leafCol);

            $body.find('tr > td:nth-child('+(sortIndex+1)+')').addClass('colSelected')
                .filter(':odd').addClass('colSelectedEven');

            this._resizeHeight();

        }
        , _setColsWidth: function(){
            var opts = this.opts;
            var $style = this.$style;
            var $head = this.$head;

            var $bodyWrapper = this.$bodyWrapper;
            var $body = this.$body;
            var $ths = this._expandThs();
            var expandCols = this._expandCols(opts.cols);

            var scrollTop = $bodyWrapper.scrollTop();
            var scrollLeft = $head.position().left;

            $bodyWrapper.width(9999);
            $body.width('auto');
            var styleText = [];
            for(var colIndex=0; colIndex<$ths.length; colIndex++){
                var $th = $ths.eq(colIndex);
                styleText.push('.mmGrid .'+this._genColClass(colIndex) + ' {');
                var width = $.data($th[0],'col-width');
                styleText.push('width: '+ width +'px;');
                styleText.push('max-width: '+ width +'px;');

                var col = expandCols[colIndex];
                if(col.align){
                    styleText.push('text-align: '+col.align+';');
                }
                if(col.hidden){
                    styleText.push('display: none; ');
                }
                styleText.push(' }');
            }

            $body.detach();
            try{
                $style.text(styleText.join(''));
            }catch(error){
                $style[0].styleSheet.cssText = styleText.join('');//IE fix
            }
            $body.width($head.width()-17);
            $bodyWrapper.width('100%');
            $bodyWrapper.append($body);

            //调整滚动条

            $bodyWrapper.scrollLeft(-scrollLeft);
            if($bodyWrapper.scrollLeft() === 0){
                $head.css('left', 0);
            }

            $bodyWrapper.scrollTop(scrollTop);
        }
        , _fullWidthRows: function(){
            var opts = this.opts;
            var $bodyWrapper = this.$bodyWrapper;
            var $mmGrid = this.$mmGrid;
            var $head = this.$head;
            var scrollWidth = $bodyWrapper.width() - $bodyWrapper[0].clientWidth;

            if(scrollWidth && browser.isIE){
                scrollWidth = scrollWidth + 1;
            }

            var fitWidth =  $mmGrid.width() - $head.width() - scrollWidth;
            if(fitWidth < -20){
                return;
            }

            var thsArr = [];
            var $ths = this._leafThs();
            var leafCol = this._leafCols();
            for(var i=0; i< leafCol.length; i++){
                var col = leafCol[i];
                var $th = $ths.eq(i);
                if(!col.lockWidth && $th.is(':visible')){
                    thsArr.push($th);
                }
            }

            var increaseWidth =  Math.floor(fitWidth / thsArr.length);
            var maxColWidthIndex = 0;
            for(var i=0; i< thsArr.length; i++){
                var $th = thsArr[i];
                var colWidth = $.data($th[0], 'col-width') + increaseWidth;
                $.data($th[0], 'col-width', colWidth);

                var maxColWidth = $.data(thsArr[maxColWidthIndex][0], 'col-width');
                if(maxColWidth < colWidth){
                    maxColWidthIndex = i;
                }
            }

            var remainWidth =  fitWidth -  increaseWidth * thsArr.length;
            var maxColWidth = $.data(thsArr[maxColWidthIndex][0], 'col-width');
            $.data(thsArr[maxColWidthIndex][0], 'col-width', maxColWidth + remainWidth);
            this._setColsWidth();
        }


        , _showLoading: function(){
            var $mmGrid = this.$mmGrid;
            $mmGrid.find('.mmg-mask').show();

            var $loading = $mmGrid.find('.mmg-loading');
            $loading.css({
                'left': ($mmGrid.width() - $loading.width()) / 2,
                'top': ($mmGrid.height() - $loading.height()) / 2
            }).show();
        }
        , _hideLoading: function(){
            var $mmGrid = this.$mmGrid;
            $mmGrid.find('.mmg-mask').hide();
            $mmGrid.find('.mmg-loading').hide();
        }
        , _showNoData: function(){
            this._showMessage(this.opts.noDataText);
        }
        , _hideNoData: function(){
            this._hideMessage();
        }

        , _showMessage: function(msg){
            var $mmGrid = this.$mmGrid;
            var $headWrapper = this.$headWrapper;
            var $message = $mmGrid.find('.mmg-message');
            $message.css({
                'left': ($mmGrid.width() - $message.width()) / 2,
                'top': ($mmGrid.height() + $headWrapper.height()  - $message.height()) / 2
            }).text(msg).show();
        }
        , _hideMessage: function(){
            var $mmGrid = this.$mmGrid;
            $mmGrid.find('.mmg-message').hide();
        }

        , _nativeSorter: function(colIndex, sortStatus){
            var leafCols = this._leafCols();
            var col = leafCols[colIndex];

            this.$body.find('tr > td:nth-child('+(colIndex+1)+')')
                .sortElements(function(a, b){
                    var av = $.text($(a));
                    var bv = $.text($(b));
                    //排序前转换
                    if(col.type === 'number'){
                        av = parseFloat(av);
                        bv = parseFloat(bv);
                    }else{
                        //各个浏览器localeCompare的结果不一致
                        return sortStatus === 'desc' ? -av.localeCompare(bv)  : av.localeCompare(bv);
                    }
                    return av > bv ? (sortStatus === 'desc' ? -1 : 1) : (sortStatus === 'desc' ? 1 : -1);
                }, function(){
                    return this.parentNode;
                });
        }

        , _refreshSortStatus: function(){
            var $ths = this.$head.find('th');
            var sortColIndex = -1;
            var sortStatus = '';
            $ths.find('.mmg-title').each(function(index, item){
                var status = $.data(item, 'sortStatus');
                if(status){
                    sortColIndex = index;
                    sortStatus = status;
                }
            });
            var sortStatus = sortStatus === 'desc' ? 'asc' : 'desc';
            if(sortColIndex >=0){
                $ths.eq(sortColIndex).find('.mmg-title').data('sortStatus',sortStatus).click();
            }
        }

        , _loadAjax: function(args){
            var that = this;
            var opts = this.opts;
            var params = {};

           /* if($.isEmptyObject(opts.params)==false&&opts.params.isUse == 1){
                params = $.extend(params, opts.params);
            }*/
            //opt的params可以使函数，例如收集过滤的参数
            if(isParam){
                if($.isFunction(opts.params)){
                    params = $.extend(params, opts.params());
                }
                else if($.isPlainObject(opts.params)){
                    params = $.extend(params, opts.params);
                }
            }
            if(opts.remoteSort){
                var sortName = '';
                var sortStatus = '';
                var $titles = this.$head.find('.mmg-title');
                for(var colIndex=0; colIndex<$titles.length; colIndex++){
                    var status = $.data($titles[colIndex], 'sortStatus');
                    if(status){
                        var col = $titles.eq(colIndex).parent().parent().data('col');
                        sortName = col.sortName ?
                            col.sortName : col.name;
                        sortStatus = status;
                    }
                }
                if(sortName){
                    params.sort = sortName+'.'+sortStatus;
                }
            }

            //插件参数合并
            for(var i=0; i< this.opts.plugins.length; i++){
                var plugin = this.opts.plugins[i];
                $.extend(params, plugin.params());
            }

            //合并load的参数
            params = $.extend(params, args);
           var paramsLength= $.Object.count.call(params,true);
           if(paramsLength>2&&params.page>=1&&isParams==0){
             isParams = 1;
             page = 1;
            
              for(var i=0; i< this.opts.plugins.length; i++){
                var plugin = this.opts.plugins[i];
                $.extend(params, plugin.params());
                }
                 params.page = page;
           }else{

              if((params.page>1 || params.page==1 )&&ssFlag==true){
                  isParams = 0;
                  params.page =1;
              }else{

              }


           }
            $.ajax({
                type: opts.method,
                url: opts.url,
                data: params,
                dataType: 'json',
                cache: opts.cache
            }).done(function(data){
                //获得root对象
                if (data.success == false) {
                    if(data.msg == "noSession"){
                         common.loginTimeout();
                         return false;
                    }
                    jAlert(data.msg, '贝安港提示',function() {
                        if(checkBack){
                            checkBack();
                        }
                        layer.closeAll('loading');
                    });
                }
                var items = data;
                if($.isArray(data[opts.root])){
                    items = data[opts.root];
                }
                that._populate(items);
                if(!opts.remoteSort){
                    that._refreshSortStatus();
                }


                that.$body.triggerHandler('loadSuccess', data);


            }).fail(function(data){
                that.$body.triggerHandler('loadError', data);
            });

        }

        , _loadNative: function(args){
            this._populate(args);
            this._refreshSortStatus();
            this.$body.triggerHandler('loadSuccess', args);
        }
        , load: function(args){
            var opts = this.opts;
            this._hideMessage();
            this._showLoading();
            this._loadCount = this._loadCount + 1 ;

            if($.isArray(args)){
                //加载本地数据
                this._loadNative(args);
            }else if(opts.url){
                this._loadAjax(args);
            }else if(opts.items){
                this._loadNative(opts.items);
            }else{
                this._loadNative([]);
            }
        }

        //重设尺寸
        , resize: function(){
            var opts = this.opts;
            var $mmGrid = this.$mmGrid;
            var $headWrapper = this.$headWrapper;
            var $bodyWrapper = this.$bodyWrapper;

            // fix in ie6
            if(browser.isIE6 && (!opts.width || opts.width === 'auto')){
                $mmGrid.width('100%');
                $mmGrid.width($mmGrid.width() - ($mmGrid.outerWidth(true) - $mmGrid.width()));
            }else{
                $mmGrid.width(opts.width);
            }

            if(opts.height !== 'auto'){
                if(browser.isIE6 && (!opts.height || opts.height === 'auto')){
                    $mmGrid.height('100%');
                    $mmGrid.height($mmGrid.height() - ($mmGrid.outerHeight(true) - $mmGrid.height()));
                }else{
                    $mmGrid.height(opts.height);
                }

                $bodyWrapper.height($mmGrid.height() - $headWrapper.outerHeight(true));
            }

            //调整message
            var $message = $mmGrid.find('.mmg-message');
            if($message.is(':visible')){
                $message.css({
                    'left': ($mmGrid.width() - $message.width()) / 2,
                    'top': ($mmGrid.height() + $headWrapper.height() - $message.height()) / 2
                });
            }
            //调整loading
            var $mask = $mmGrid.find('.mmg-mask');
            if($mask.is(':visible')){
                $mask.width($mmGrid.width()).height($mmGrid.height());
                var $loadingWrapper = $mmGrid.find('.mmg-loading');
                $loadingWrapper.css({
                    'left': ($mmGrid.width() - $loadingWrapper.width()) / 2,
                    'top': ($mmGrid.height() - $loadingWrapper.height()) / 2
                })
            }

            $bodyWrapper.trigger('scroll');

            this._resizeHeight();
        }

        , _resizeHeight: function(){
            var opts = this.opts;
            var $bodyWrapper = this.$bodyWrapper;
            var $body= this.$body;
            if(opts.height === 'auto' && browser.isIE7){
                $bodyWrapper.height('auto');
                if($bodyWrapper.width() < $body.width()){
                    $bodyWrapper.height($bodyWrapper.height() + $bodyWrapper.height() - $bodyWrapper[0].clientHeight  + 1);
                }
            }
        }

        //选中
        , select: function(args){
            var opts = this.opts;
            var $body = this.$body;
            var $head = this.$head;

            if(typeof args === 'number'){
                var $tr = $body.find('tr').eq(args);
                if(!opts.multiSelect){
                    $body.find('tr.selected').removeClass('selected');
                    if(opts.checkCol){
                        $body.find('tr > td').find('.mmg-check').prop('checked','');
                    }
                }
                if(!$tr.hasClass('selected')){
                    $tr.addClass('selected');
                    if(opts.checkCol){
                        $tr.find('td .mmg-check').prop('checked','checked');
                    }
                }
            }else if(typeof args === 'function'){
                $.each($body.find('tr'), function(index){
                    if(args($.data(this, 'item'), index)){
                        var $this = $(this);
                        if(!$this.hasClass('selected')){
                            $this.addClass('selected');
                            if(opts.checkCol){
                                $this.find('td .mmg-check').prop('checked','checked');
                            }
                        }
                    }
                });
            }else if(args === undefined || (typeof args === 'string' && args === 'all')){
                $body.find('tr.selected').removeClass('selected');
                $body.find('tr').addClass('selected');
                $body.find('tr > td').find('.mmg-check').prop('checked','checked');
            }else{
                return;
            }

            if(opts.checkCol){
                var $checks = $body.find('tr > td').find('.mmg-check');
                if($checks.length === $checks.filter(':checked').length){
                    $head.find('th .checkAll').prop('checked','checked');
                }
            }


        }
        //取消选中
        , deselect: function(args){
            var opts = this.opts;
            var $body = this.$body;
            var $head = this.$head;
            if(typeof args === 'number'){
                $body.find('tr').eq(args).removeClass('selected');
                if(opts.checkCol){
                    $body.find('tr').eq(args).find('td .mmg-check').prop('checked','');
                }
            }else if(typeof args === 'function'){
                $.each($body.find('tr'), function(index){
                    if(args($.data(this, 'item'), index)){
                        $(this).removeClass('selected');
                        if(opts.checkCol){
                            $(this).find('td .mmg-check').prop('checked','');
                        }
                    }
                });
            }else if(args === undefined || (typeof args === 'string' && args === 'all')){
                $body.find('tr.selected').removeClass('selected');
                if(opts.checkCol){
                    $body.find('tr > td').find('.mmg-check').prop('checked','');
                }
            }else{
                return;
            }

            $head.find('th .checkAll').prop('checked','');

        }
        , selectedRows: function(){
            var $body = this.$body;
            var selected = [];
            $.each($body.find('tr.selected'), function(index ,item){
                selected.push($.data(this,'item'));
            });
            return selected;
        }

        , selectedRowsIndex: function(){
            var $body = this.$body;
            var $trs = this.$body.find('tr')
            var selected = [];
            $.each($body.find('tr.selected'), function(index){
                selected.push($trs.index(this));
            });
            return selected;
        }

        , rows: function(){
            var $body = this.$body;
            var items = [];
            $.each($body.find('tr'), function(){
                items.push($.data(this,'item'));
            });
            return items;
        }

        , row: function(index){
            var $body = this.$body;
            if(index !== undefined && index >= 0){
                var $tr = $body.find('tr').eq(index);
                if($tr.length !== 0){
                    return $.data($tr[0],'item');
                }
            }
        }

        , rowsLength: function(){
            var $body = this.$body;
            var length = $body.find('tr').length;
            if(length === 1 && $body.find('tr.emptyRow').length === 1){
                return 0;
            }
            return length;
        }

        //添加数据，第一个参数可以为数组
        , addRow: function(item, index){
            var $tbody = this.$body.find('tbody');

            if($.isArray(item)){
                for(var i=item.length-1; i >= 0; i--){
                    this.addRow(item[i], index);
                }
                return ;
            }

            if(!$.isPlainObject(item)){
                return ;
            }

            this._hideNoData();
            this._removeEmptyRow();

            var $tr;

            if(index === undefined || index < 0){
                $tr = $(this._rowHtml(item, this.rowsLength()));
                $tbody.append($tr);
            }else{
                $tr = $(this._rowHtml(item, index));
                if(index === 0){
                    $tbody.prepend($tr);
                }else{
                    var $before = $tbody.find('tr').eq(index-1);
                    //找不到就插到最后
                    if($before.length === 0){
                        $tbody.append($tr);
                    }else{
                        $before.after($($tr));
                    }
                }
            }
            $tr.data('item', item);
            this._setStyle();


            this.$body.triggerHandler('rowInserted', [item, index]);
        }
        //更新行内容，两个参数都必填
        , updateRow: function(item, index){
            var opts = this.opts;
            var $tbody = this.$body.find('tbody');
            if(!$.isPlainObject(item)){
                return ;
            }
            var oldItem = this.row(index);

            var $tr = $tbody.find('tr').eq(index);
            var checked = $tr.find('td:first :checkbox').is(':checked');
            $tr.html(this._rowHtml(item, index).slice(4,-5));
            if(opts.checkCol){
                $tr.find('td:first :checkbox').prop('checked',checked);
            }

            $tr.data('item', item);
            this._setStyle();

            this.$body.triggerHandler('rowUpdated', [oldItem, item, index]);
        }

        //删除行，参数可以为索引数组
        , removeRow: function(index){
            var that = this;
            var $tbody = that.$body.find('tbody');

            if($.isArray(index)){
                for(var i=index.length-1; i >= 0; i--){
                    that.removeRow(index[i]);
                }
                return ;
            }

            if(index === undefined){
                var $trs = $tbody.find('tr');
                for(var i=$trs.length-1; i >= 0; i--){
                    that.removeRow(i);
                }
            }else{
                var item = that.row(index);
                $tbody.find('tr').eq(index).remove();
                this.$body.triggerHandler('rowRemoved', [item, index]);
            }
            this._setStyle();
            if(this.rowsLength() === 0){
                this._showNoData();
                this._insertEmptyRow();
            }
        }
    };

    $.fn.mmGrid = function(){
        if(arguments.length === 0 || typeof arguments[0] === 'object'){
            var option = arguments[0]
                , data = this.data('mmGrid')
                , options = $.extend(true, {}, $.fn.mmGrid.defaults, option);
            if (!data) {
                data = new MMGrid(this, options);
                this.data('mmGrid', data);
            }
            return $.extend(true, this, data);
        }
        if(typeof arguments[0] === 'string'){
            var data = this.data('mmGrid');
            var fn =  data[arguments[0]];
            if(fn){
                var args = Array.prototype.slice.call(arguments);
                return fn.apply(data,args.slice(1));
            }
        }
    };

    $.fn.mmGrid.defaults = {
        width: 'auto'
        , height: '280px'
        , cols: []
        , url: false
        , params: {}
        , method: 'POST'
        , cache: false
        , root: 'items'
        , items: []
        , autoLoad: true
        , remoteSort: false
        , sortName: ''
        , sortStatus: 'asc'
        , loadingText: '正在载入...'
        , noDataText: '没有数据'
        , multiSelect: false
        , checkCol: false
        , indexCol: false
        , indexColWidth: 30
        , fullWidthRows: false
        , nowrap: false
        , showBackboard: true
        , backboardMinHeight: 125
        , plugins: [] //插件 插件必须实现 init($mmGrid)和params()方法，参考mmPaginator
    };
//  event : loadSuccess(e,data), loadError(e, data), cellSelected(e, item, rowIndex, colIndex)
//          rowInserted(e,item, rowIndex), rowUpdated(e, oldItem, newItem, rowIndex), rowRemoved(e,item, rowIndex)
//


    $.fn.mmGrid.Constructor = MMGrid;


    // see: http://james.padolsey.com/javascript/sorting-elements-with-jquery/
    $.fn.sortElements = (function(){
        var sort = [].sort;
        return function(comparator, getSortable) {
            getSortable = getSortable || function(){return this;};
            var placements = this.map(function(){
                var sortElement = getSortable.call(this),
                    parentNode = sortElement.parentNode,
                    nextSibling = parentNode.insertBefore(
                        document.createTextNode(''),
                        sortElement.nextSibling
                    );
                return function() {
                    if (parentNode === this) {
                        throw new Error(
                            "You can't sort elements if any one is a descendant of another."
                        );
                    }
                    parentNode.insertBefore(this, nextSibling);
                    parentNode.removeChild(nextSibling);
                };
            });
            return sort.call(this, comparator).each(function(i){
                placements[i].call(getSortable.call(this));
            });
        };
    })();
}(window.jQuery);




$.extend({
    //  获取对象的长度，需要指定上下文 this
    Object:     {
        count: function( p ) {
            p = p || false;
         
            return $.map( this, function(o) {
                if( !p ) return o;
                 
                return true;
            } ).length;
        }
    }
});
///<jscompress sourcefile="mmPaginator.js" />
!function($){
    var MMPaginator = function(element, options){
        this.$el = $(element);
        this.opts = options;
    };


    isChange = false;
    totalPages = 0;

    MMPaginator.prototype = {
        _initLayout: function(){
            var that = this;
            var $el = this.$el;
            var opts = this.opts;



            $el.addClass("mmPaginator");
            var pgHtmls = [
                '<div class="totalCountLabel"></div>',
                '<ul class="pageList"></ul>',
                '<div class="limit"><select class="select"></select></div>'
            ];
            $el.append($(pgHtmls.join('')));

            this.$totalCountLabel = $el.find('.totalCountLabel');
            this.$pageList = $el.find('.pageList');
            this.$limitList = $el.find('.limit select');

            var $limitList = this.$limitList
            $.each(opts.limitList, function(){
                var $option = $('<option></option>')
                    .prop('value',this)
                    .text(that.formatString(opts.limitLabel,[this]));
                $limitList.append($option);
            });



        }

        , _plain: function(page, totalCount, limit){
            if(ssFlag){
                page = 1;
            }
            var that = this;
            var $el = this.$el;
            var $pageList = this.$pageList;

            var totalPage = totalCount % limit === 0 ? parseInt(totalCount/limit) : parseInt(totalCount/limit) + 1;
            totalPage = totalPage ? totalPage : 0;
            totalPages = totalPage;
            if(totalPage === 0){
                page = 1;
            }else if(page > totalPage){
                page = totalPage;
            }else if(page < 1 && totalPage != 0){
                page = 1;
            }
            //

            //select翻页
            var selectDom = that.find('select');
            totalCounts = 0 ;
            totalCounts = totalCount;
            thDome = that.find('select');
            selectDom.unbind('change').on('change',function(){
                var nums = $(this).val();
                limit = nums;
                var totalPage = totalCounts % nums === 0 ? parseInt(totalCounts/nums) : parseInt(totalCounts/nums) + 1;
                totalPage = totalPage ? totalPage : 0;
                totalPages = totalPage;
                if(totalPage === 0){
                    page = 1;
                }else if(page > totalPage){
                    page = totalPage;
                }else if(page < 1 && totalPage != 0){
                    page = 1;
                }
                $pageList.empty();
                isChange = true;
                that._plain(page,totalCounts,limit);
                _dataParams.count = nums;
                _dataParams.page = 1;
                $pageList.find('li').removeClass('acitve');
                $pageList.find('li').eq(1).addClass('active');
                that.$mmGrid.load(_dataParams);
            });



            var $prev = $('<li class="prev"><a>«</a></li>');
            if(page<=1){
                $prev.addClass('disable');
            }else{
                $prev.find('a').on('click', function(){
                    $el.data('page', page-1);
                    that.$mmGrid.load(_dataParams);
                });
            }
            $pageList.append($prev);
            /////
            var list = [1];
            if(page > 4 ){
                list.push('...');
            }
            for(var i= 0; i < 5; i++){
                var no = page - 2 + i;
                if(no > 1 && no <= totalPage-1){
                    list.push(no);
                }
            }
            if(page+1 < totalPage-1){
                list.push('...');
            }
            if(totalPage>1){
                list.push(totalPage);
            }
            $.each(list, function(index, item){

                var $li = $('<li><a></a></li>');
                if(item === '...'){
                    $li.addClass('').html('...');
                }else if(item === page){
                    $li.addClass('active').find('a').text(item);
                }else{

                    $li.find('a').text(item).prop('title','第'+item+'页').on('click', function(e){
                        ssFlag = false;
                        $el.data('page', item);
                         _dataParams.page=item;
                        isParams = 1;
                        that.$mmGrid.load(_dataParams);
                    });
                }
                $pageList.append($li);
            });


            //
            var $next = $('<li class="next"><a title="下一页">»</a></li>');
            if(page>=totalPage){
                $next.addClass('disable');
            }else{
                $next.find('a').on('click', function(){
                    $el.data('page', page+1);
                    _dataParams.page=page+1;
                    that.$mmGrid.load(_dataParams);

                });
            }
            $pageList.append($next);

            $el.find('.page-search').remove();
            ssPage=1;
            if(page-totalPage<0){
                ssPage = page+1;
            }else if(page == totalPage){
                ssPage = 1;
            }
            if(totalPage == 0){
                totalPage = 1;
            }
            $el.append('<div class="page-search">当前第'+page+'页/共'+totalPage+'页&nbsp;&nbsp;转到<input type="text" class="input-text J-input-sPage" value="'+ssPage+'" />页<a href="javascript:void(0)" class="btn btn-primary radius J-pager-search">确定</a></div>');

            $('.J-pager-search').on('click',function(){
                var pages = parseInt($('.J-input-sPage').val());
                  if(isNaN(pages) == true || pages>totalPages){
                    pages = totalPages;
                    $('.J-input-sPage').val(pages);
                 }
                $pageList.empty();
                ssFlag = false;
                that._plain(pages,totalCounts,limit);
                $el.data('page', pages);
                _dataParams.page=pages;
                isParams = 1;
                that.$mmGrid.load(_dataParams);
            })


        }

        , _search: function(page, totalCount, limit){
            var that = this;
            var $el = this.$el;
            var $pageList = this.$pageList;
           $el.find('.page-search').remove();

        }

        , load: function(params){
            var $el = this.$el;
            var $limitList = this.$limitList;
            var opts = this.opts;

            var page = params[opts.pageParamName];
            if(page === undefined || page === null){
                page = $el.data('page');
            }
           

            var totalCount = params[opts.totalCountName];
            if(totalCount === undefined){
                totalCount = 0;
                page = 0;
                 $el.data('page',0);
            }
            else{
                 $el.data('page', page);
            }
            $el.data('totalCount', totalCount);

            var limit = params[opts.limitParamName];
            if(!limit){
                limit = $limitList.val();
            }
            this.$limitList.val(limit);

            this.$totalCountLabel.html(this.formatString(opts.totalCountLabel,[totalCount]));
            this.$pageList.empty();

            this._plain(page, totalCount, this.$limitList.val());

        }

        , formatString: function(text, args){
            return text.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                    ;
            });
        }

        , params: function(){
            var opts = this.opts;
            var $el = this.$el;
            var $limitList = this.$limitList;
            var params = {};
            params[opts.pageParamName] = $el.data('page');
            params[opts.limitParamName] = $limitList.val();
            return params;
        }

        , init: function($grid){
            var that = this;
            var opts = that.opts;
            this.$mmGrid = $grid;
            this._initLayout();
            this.$mmGrid.on('loadSuccess', function(e, data){
                that.load(data);
            });

            var params = {};

            params[opts.totalCountName] = 0;
            params[opts.pageParamName] = opts.page;
            params[opts.limitParamName] = opts.limit;
            this.load(params);

            if($grid.opts.indexCol){
                var indexCol = $grid.opts.cols[0];

                indexCol.renderer = function(val,item,rowIndex){
                    var params = that.params();
                    if(ssFlag){
                        params[opts.pageParamName] = 1;
                    }
                    return '<label class="mmg-index">' +
                        (rowIndex + 1 + ((params[opts.pageParamName]-1) * params[opts.limitParamName])) +
                        '</label>';
                };
            }

        }

    };

    $.fn.mmPaginator = function(){

        if(arguments.length === 0 || typeof arguments[0] === 'object'){
            var option = arguments[0]
                , data = this.data('mmPaginator')
                , options = $.extend(true, {}, $.fn.mmPaginator.defaults, option);
            if (!data) {
                data = new MMPaginator(this[0], options);
                this.data('mmPaginator', data);
            }
            return $.extend(true, this, data);
        }
        if(typeof arguments[0] === 'string'){
            var data = this.data('mmPaginator');
            var fn =  data[arguments[0]];
            if(fn){
                var args = Array.prototype.slice.call(arguments);
                return fn.apply(data,args.slice(1));
            }
        }
    };

    $.fn.mmPaginator.defaults = {
        style: 'plain'
        , totalCountName: 'totalCount'
        , page: 1
        , pageParamName: 'page'
        , limitParamName: 'limit'
        , limitLabel: '每页{0}条'
        , totalCountLabel: '共<span>{0}</span>条记录'
        , limit: undefined
        , limitList: [20, 30, 40, 50]
    };

    $.fn.mmPaginator.Constructor = MMPaginator;

}(window.jQuery);
///<jscompress sourcefile="template.js" />
/*art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function A(b){return b.replace(T,"").replace(U,",").replace(V,"").replace(W,"").replace(X,"").split(Y)}function B(b){return"'"+b.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function C(n,o){function r(c){return ah+=c.split(/\n/).length-1,af&&(c=c.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),c&&(c=ak[1]+B(c)+ak[2]+"\n"),c}function aa(d){var g=ah;if(ae?d=ae(d,o):ab&&(d=d.replace(/\n/g,function(){return ah++,"$line="+ah+";"})),0===d.indexOf("=")){var h=ag&&!/^=[=#]/.test(d);if(d=d.replace(/^=[=#]?|[\s;]*$/g,""),h){var i=d.replace(/\s*\([^\)]+\)/,"");N[i]||/^(include|print)$/.test(i)||(d="$escape("+d+")")}else{d="$string("+d+")"}d=ak[1]+d+ak[2]}return ab&&(d="$line="+g+";"+d),R(A(d),function(c){if(c&&!ai[c]){var e;e="print"===c?am:"include"===c?an:N[c]?"$utils."+c:O[c]?"$helpers."+c:"$data."+c,ao+=c+"="+e+",",ai[c]=!0}}),d+"\n"}var ab=o.debug,ac=o.openTag,ad=o.closeTag,ae=o.parser,af=o.compress,ag=o.escape,ah=1,ai={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},aj="".trim,ak=aj?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],al=aj?"$out+=text;return $out;":"$out.push(text);",am="function(){var text=''.concat.apply('',arguments);"+al+"}",an="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+al+"}",ao="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(ab?"$line=0,":""),ap=ak[0],aq="return new String("+ak[3]+");";R(n.split(ac),function(d){d=d.split(ad);var e=d[0],f=d[1];1===d.length?ap+=r(e):(ap+=aa(e),f&&(ap+=r(f)))});var ar=ao+ap+aq;ab&&(ar="try{"+ar+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+B(n)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var a=new Function("$data","$filename",ar);return a.prototype=N,a}catch(b){throw b.temp="function anonymous($data,$filename) {"+ar+"}",b}}var D=function(c,d){return"string"==typeof d?Q(d,{filename:c}):G(c,d)};D.version="3.0.0",D.config=function(c,d){E[c]=d};var E=D.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},F=D.cache={};D.render=function(c,d){return Q(c,d)};var G=D.renderFile=function(d,e){var f=D.get(d)||P({filename:d,name:"Render Error",message:"Template not found"});return e?f(e):f};D.get=function(e){var f;if(F[e]){f=F[e]}else{if("object"==typeof document){var g=document.getElementById(e);if(g){var h=(g.value||g.innerHTML).replace(/^\s*|\s*$/g,"");f=Q(h,{filename:e})}}}return f};var H=function(c,d){return"string"!=typeof c&&(d=typeof c,"number"===d?c+="":c="function"===d?H(c.call(c)):""),c},I={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},J=function(b){return I[b]},K=function(b){return H(b).replace(/&(?![\w#]+;)|[<>"']/g,J)},L=Array.isArray||function(b){return"[object Array]"==={}.toString.call(b)},M=function(e,f){var g,h;if(L(e)){for(g=0,h=e.length;h>g;g++){f.call(e,e[g],g,e)}}else{for(g in e){f.call(e,e[g],g)}}},N=D.utils={$helpers:{},$include:G,$string:H,$escape:K,$each:M};D.helper=function(c,d){O[c]=d};var O=D.helpers=N.$helpers;D.onerror=function(d){var e="Template Error\n\n";for(var f in d){e+="<"+f+">\n"+d[f]+"\n\n"}"object"==typeof console&&console.error(e)};var P=function(b){return D.onerror(b),function(){return"{Template Error}"}},Q=D.compile=function(c,e){function f(a){try{return new m(a,l)+""}catch(b){return e.debug?P(b)():(e.debug=!0,Q(c,e)(a))}}e=e||{};for(var k in E){void 0===e[k]&&(e[k]=E[k])}var l=e.filename;try{var m=C(c,e)}catch(n){return n.filename=l||"anonymous",n.name="Syntax Error",P(n)}return f.prototype=m.prototype,f.toString=function(){return m.toString()},l&&e.cache&&(F[l]=f),f},R=N.$each,S="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",T=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,U=/[^\w$]+/g,V=new RegExp(["\\b"+S.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),W=/^\d[^,]*|,\d[^,]*/g,X=/^,+|,+$/g,Y=/^$|,+/;E.openTag="{{",E.closeTag="}}";var Z=function(f,g){var h=g.split(":"),i=h.shift(),j=h.join(":")||"";return j&&(j=", "+j),"$helpers."+i+"("+f+j+")"};E.parser=function(d){d=d.replace(/^\s/,"");var p=d.split(" "),q=p.shift(),r=p.join(" ");switch(q){case"if":d="if("+r+"){";break;case"else":p="if"===p.shift()?" if("+p.join(" ")+")":"",d="}else"+p+"{";break;case"/if":d="}";break;case"each":var s=p[0]||"$data",t=p[1]||"as",u=p[2]||"$value",v=p[3]||"$index",w=u+","+v;"as"!==t&&(s="[]"),d="$each("+s+",function("+w+"){";break;case"/each":d="});";break;case"echo":d="print("+r+");";break;case"print":case"include":d=q+"("+p.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(r)){var x=!0;0===d.indexOf("#")&&(d=d.substr(1),x=!1);for(var y=0,z=d.split("|"),aa=z.length,ab=z[y++];aa>y;y++){ab=Z(ab,z[y])}d=(x?"=":"=#")+ab}else{d=D.helpers[q]?"=#"+q+"("+p.join(",")+");":"="+d}}return d},"function"==typeof define?define(function(){return D}):"undefined"!=typeof exports?module.exports=D:this.template=D}();
///<jscompress sourcefile="jQuery.print.js" />
/* @license 
 * jQuery.print, version 1.3.2
 *  (c) Sathvik Ponangi, Doers' Guild
 * Licence: CC-By (http://creativecommons.org/licenses/by/3.0/)
 *--------------------------------------------------------------------------*/
(function ($) {
    "use strict";
    // A nice closure for our definitions
    function getjQueryObject(string) {
        // Make string a vaild jQuery thing
        var jqObj = $("");
        try {
            jqObj = $(string)
                .clone();
        } catch (e) {
            jqObj = $("<span />")
                .html(string);
        }
        return jqObj;
    }

    function printFrame(frameWindow) {
        // Print the selected window/iframe
        var def = $.Deferred();
        try {
            setTimeout(function () {
                // Fix for IE : Allow it to render the iframe
                frameWindow.focus();
                try {
                    // Fix for IE11 - printng the whole page instead of the iframe content
                    if (!frameWindow.document.execCommand('print', false, null)) {
                        // document.execCommand returns false if it failed -http://stackoverflow.com/a/21336448/937891
                        frameWindow.print();
                    }
                } catch (e) {
                    frameWindow.print();
                }
                frameWindow.close();
                def.resolve();
            }, 250);
        } catch (err) {
            def.reject(err);
        }
        return def;
    }

    function printContentInNewWindow(content) {
        // Open a new window and print selected content
        var w = window.open();
        w.document.write(content);
        w.document.close();
        return printFrame(w);
    }

    function isNode(o) {
        /* http://stackoverflow.com/a/384380/937891 */
        return !!(typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
    }
    $.print = $.fn.print = function () {
        // Print a given set of elements
        var options, $this, self = this;
        // console.log("Printing", this, arguments);
        if (self instanceof $) {
            // Get the node if it is a jQuery object
            self = self.get(0);
        }
        if (isNode(self)) {
            // If `this` is a HTML element, i.e. for
            // $(selector).print()
            $this = $(self);
            if (arguments.length > 0) {
                options = arguments[0];
            }
        } else {
            if (arguments.length > 0) {
                // $.print(selector,options)
                $this = $(arguments[0]);
                if (isNode($this[0])) {
                    if (arguments.length > 1) {
                        options = arguments[1];
                    }
                } else {
                    // $.print(options)
                    options = arguments[0];
                    $this = $("html");
                }
            } else {
                // $.print()
                $this = $("html");
            }
        }
        // Default options
        var defaults = {
            globalStyles: true,
            mediaPrint: false,
            stylesheet: null,
            noPrintSelector: ".no-print",
            iframe: true,
            append: null,
            prepend: null,
            manuallyCopyFormValues: true,
            deferred: $.Deferred()
        };
        // Merge with user-options
        options = $.extend({}, defaults, (options || {}));
        var $styles = $("");
        if (options.globalStyles) {
            // Apply the stlyes from the current sheet to the printed page
            $styles = $("style, link, meta, title");
        } else if (options.mediaPrint) {
            // Apply the media-print stylesheet
            $styles = $("link[media=print]");
        }
        if (options.stylesheet) {
            // Add a custom stylesheet if given
            $styles = $.merge($styles, $('<link rel="stylesheet" href="' + options.stylesheet + '">'));
        }
        // Create a copy of the element to print
        var copy = $this.clone();
        // Wrap it in a span to get the HTML markup string
        copy = $("<span/>")
            .append(copy);
        // Remove unwanted elements
        copy.find(options.noPrintSelector)
            .remove();
        // Add in the styles
        copy.append($styles.clone());
        // Appedned content
        copy.append(getjQueryObject(options.append));
        // Prepended content
        copy.prepend(getjQueryObject(options.prepend));
        if (options.manuallyCopyFormValues) {
            // Manually copy form values into the HTML for printing user-modified input fields
            // http://stackoverflow.com/a/26707753
            copy.find("input")
                .each(function () {
                    var $field = $(this);
                    if ($field.is("[type='radio']") || $field.is("[type='checkbox']")) {
                        if ($field.prop("checked")) {
                            $field.attr("checked", "checked");
                        }
                    } else {
                        $field.attr("value", $field.val());
                    }
                });
            copy.find("select").each(function () {
                var $field = $(this);
                $field.find(":selected").attr("selected", "selected");
            });
            copy.find("textarea").each(function () {
                // Fix for https://github.com/DoersGuild/jQuery.print/issues/18#issuecomment-96451589
                var $field = $(this);
                $field.text($field.val());
            });
        }
        // Get the HTML markup string
        var content = copy.html();
        // Notify with generated markup & cloned elements - useful for logging, etc
        try {
            options.deferred.notify('generated_markup', content, copy);
        } catch (err) {
            console.warn('Error notifying deferred', err);
        }
        // Destroy the copy
        copy.remove();
        if (options.iframe) {
            // Use an iframe for printing
            try {
                var $iframe = $(options.iframe + "");
                var iframeCount = $iframe.length;
                if (iframeCount === 0) {
                    // Create a new iFrame if none is given
                    $iframe = $('<iframe height="0" width="0" border="0" wmode="Opaque"/>')
                        .prependTo('body')
                        .css({
                            "position": "absolute",
                            "top": -999,
                            "left": -999
                        });
                }
                var w, wdoc;
                w = $iframe.get(0);
                w = w.contentWindow || w.contentDocument || w;
                wdoc = w.document || w.contentDocument || w;
                wdoc.open();
                wdoc.write(content);
                wdoc.close();
                printFrame(w)
                    .done(function () {
                        // Success
                        setTimeout(function () {
                            // Wait for IE
                            if (iframeCount === 0) {
                                // Destroy the iframe if created here
                                $iframe.remove();
                            }
                        }, 100);
                    })
                    .fail(function (err) {
                        // Use the pop-up method if iframe fails for some reason
                        console.error("Failed to print from iframe", err);
                        printContentInNewWindow(content);
                    })
                    .always(function () {
                        try {
                            options.deferred.resolve();
                        } catch (err) {
                            console.warn('Error notifying deferred', err);
                        }
                    });
            } catch (e) {
                // Use the pop-up method if iframe fails for some reason
                console.error("Failed to print from iframe", e.stack, e.message);
                printContentInNewWindow(content)
                    .always(function () {
                        try {
                            options.deferred.resolve();
                        } catch (err) {
                            console.warn('Error notifying deferred', err);
                        }
                    });
            }
        } else {
            // Use a new window for printing
            printContentInNewWindow(content)
                .always(function () {
                    try {
                        options.deferred.resolve();
                    } catch (err) {
                        console.warn('Error notifying deferred', err);
                    }
                });
        }
        return this;
    };
})(jQuery);

///<jscompress sourcefile="jquery.cityselect.js" />
(function(a) {
    a.fn.citySelect = function(n) {
        if (this.length < 1) {
            return
        }
        n = a.extend({
            url: "city.min.js",
            prov: null,
            city: null,
            dist: null,
            nodata: null,
            required: true,
            callback: null
        }, n);
        var Z=0;
        var b = this;
        var k = b.find(".prov");
        var d = b.find(".city");
        var g = b.find(".dist");
        var l = n.prov;
        provId = l;
        var e = n.city;
        cityId = e;
        var h = n.dist;
        hId = h;
        var m = (n.required) ? "" : "<option value=''>请选择</option>";
        var c;
        var f = function() {
            var o = k.get(0).selectedIndex-1;
            if(zhuangtaiTag != undefined){
                o = k.get(0).selectedIndex;
            }
            if (!n.required) {
                o--
            }
            d.empty().attr("disabled", true);
            g.empty().attr("disabled", true);
            if (o < 0 || typeof(c.list[o].cityList) == "undefined") {
                if (n.nodata == "none") {
                    d.css("display", "none");
                    g.css("display", "none")
                } else {
                    if (n.nodata == "hidden") {
                        d.css("visibility", "hidden");
                        g.css("visibility", "hidden")
                    }
                }
                return
            }
            temp_html = m;
                if(c.list[o].cityList.length>1 ){
                    if(zhuangtaiTag == undefined){
                        iszx=0;
                        temp_html = "<option value=''>全省</option>";
                    }
                    a.each(c.list[o].cityList, function(q, p) {
                        temp_html += "<option value='" + p.id + "'>" + p.name + "</option>"
                    });

                }
                else{
                    iszx=1;
                    var tempId = c.list[o].cityList[0].id;
                    temp_html = "<option value='"+tempId+"'>直辖市</option>" ;
                }
            

            d.html(temp_html).attr("disabled", false).css({
                display: "",
                visibility: ""
            });
            i()
        };
        var i = function() {
            var p = k.get(0).selectedIndex;
            var o = d.get(0).selectedIndex;
            if (!n.required) {
                p--;
                o--
            }

            g.empty().attr("disabled", true);
            var carea=$(d.get(0)).val();
            if( carea == "0" ){
                g.css("display", "none");
                return;
            }


                if(m == "" && zhuangtaiTag == undefined ){
                temp_html = "<option value=''>全区</option>";
                }else{
                    temp_html = m;
                }

            if($(d.get(0)).val() !=""){
                if(zhuangtaiTag == undefined){
                    a.each(c.list[p-1].cityList[o-1].distsList, function(r, q) {
                        temp_html += "<option value='" + q.id + "'>" + q.name + "</option>"
                    });
                }else{
                    a.each(c.list[p].cityList[o].distsList, function(r, q) {
                        temp_html += "<option value='" + q.id + "'>" + q.name + "</option>"
                    });
                }

            }
            else{
                if(zhuangtaiTag == undefined ){
                    a.each(c.list[p-1].cityList[o].distsList, function(r, q) {
                        temp_html += "<option value='" + q.id + "'>" + q.name + "</option>"
                    });
                }else{

                    a.each(c.list[p].cityList[o].distsList, function(r, q) {
                        temp_html += "<option value='" + q.id + "'>" + q.name + "</option>"
                    });
                }

            }
            


            g.html(temp_html).attr("disabled", false).css({
                display: "",
                visibility: ""
            })
        };
        var j = function() {
            if( m == "" && zhuangtaiTag == undefined){
                temp_html = "<option value=''>全国</option>";
            }else{
                temp_html = m;
            }
            a.each(c.list, function(o, p) {
                temp_html += "<option value='" + p.id + "'>" + p.name + "</option>"
            });
            k.html(temp_html);
            setTimeout(function() {
                if (n.prov != null && n.prov != "" ) {
                    k.val(n.prov);
                    f();
                    setTimeout(function() {
                        if (n.city != null) {
                            d.val(n.city);
                            i();
                            setTimeout(function() {
                                if (n.dist != null) {
                                    g.val(n.dist);
                                }
                            }, 1)
                        }
                    }, 1)
                }
                setTimeout(function(){
                    if (n.callback != null) {
                        n.callback()
                    }
                },100);

            }, 10);
            k.bind("change", function() {
                f()
            });
            d.bind("change", function() {
                i()
            })
        };
        if (typeof(n.url) == "string") {
            a.getJSON(n.url, function(o) {
                c = o;
                j()
            })
        } else {
            c = n.url;
            j()
        }
    }
})(jQuery);
///<jscompress sourcefile="jquery.cookie.js" />
/*
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{if(typeof exports==="object"){module.exports=a(require("jquery"))}else{a(jQuery)}}}(function(a){var f=/\+/g;function d(i){return b.raw?i:encodeURIComponent(i)}function c(i){return b.raw?i:decodeURIComponent(i)}function h(i){return d(b.json?JSON.stringify(i):String(i))}function e(j){if(j.indexOf('"')===0){j=j.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{j=decodeURIComponent(j.replace(f," "));return b.json?JSON.parse(j):j}catch(i){}}function g(j,i){var k=b.raw?j:e(j);return a.isFunction(i)?i(k):k}var b=a.cookie=function(o,w,r){if(arguments.length>1&&!a.isFunction(w)){r=a.extend({},b.defaults,r);if(typeof r.expires==="number"){var m=r.expires,v=r.expires=new Date();v.setMilliseconds(v.getMilliseconds()+m*86400000)}return(document.cookie=[d(o),"=",h(w),r.expires?"; expires="+r.expires.toUTCString():"",r.path?"; path="+r.path:"",r.domain?"; domain="+r.domain:"",r.secure?"; secure":""].join(""))}var u=o?undefined:{},k=document.cookie?document.cookie.split("; "):[],n=0,p=k.length;for(;n<p;n++){var s=k[n].split("="),q=c(s.shift()),j=s.join("=");if(o===q){u=g(j,w);break}if(!o&&(j=g(j))!==undefined){u[q]=j}}return u};b.defaults={};a.removeCookie=function(i,j){a.cookie(i,"",a.extend({},j,{expires:-1}));return !a.cookie(i)}}));
///<jscompress sourcefile="jquery.fly.js" />
/* fly - v1.0.0 - 2014-12-22
* https://github.com/amibug/fly
* Copyright (c) 2014 wuyuedong; Licensed MIT */
!function(b){b.fly=function(a,g){var h={version:"1.0.0",autoPlay:!0,vertex_Rtop:20,speed:1.2,start:{},end:{},onEnd:b.noop},i=this,j=b(a);i.init=function(c){this.setOptions(c),!!this.settings.autoPlay&&this.play()},i.setOptions=function(d){this.settings=b.extend(!0,{},h,d);var f=this.settings,n=f.start,o=f.end;j.css({marginTop:"0px",marginLeft:"0px",position:"fixed"}).appendTo("body"),null!=o.width&&null!=o.height&&b.extend(!0,n,{width:j.width(),height:j.height()});var p=Math.min(n.top,o.top)-Math.abs(n.left-o.left)/3;p<f.vertex_Rtop&&(p=Math.min(f.vertex_Rtop,Math.min(n.top,o.top)));var q=Math.sqrt(Math.pow(n.top-o.top,2)+Math.pow(n.left-o.left,2)),r=Math.ceil(Math.min(Math.max(Math.log(q)/0.05-75,30),100)/f.speed),s=n.top==p?0:-Math.sqrt((o.top-p)/(n.top-p)),t=(s*n.left-o.left)/(s-1),u=o.left==t?0:(o.top-p)/Math.pow(o.left-t,2);b.extend(!0,f,{count:-1,steps:r,vertex_left:t,vertex_top:p,curvature:u})},i.play=function(){this.move()},i.move=function(){var f=this.settings,n=f.start,o=f.count,p=f.steps,q=f.end,r=n.left+(q.left-n.left)*o/p,s=0==f.curvature?n.top+(q.top-n.top)*o/p:f.curvature*Math.pow(r-f.vertex_left,2)+f.vertex_top;if(null!=q.width&&null!=q.height){var t=p/2,u=q.width-(q.width-n.width)*Math.cos(t>o?0:(o-t)/(p-t)*Math.PI/2),v=q.height-(q.height-n.height)*Math.cos(t>o?0:(o-t)/(p-t)*Math.PI/2);j.css({width:u+"px",height:v+"px","font-size":Math.min(u,v)+"px"})}j.css({left:r+"px",top:s+"px"}),f.count++;var w=window.requestAnimationFrame(b.proxy(this.move,this));o==p&&(window.cancelAnimationFrame(w),f.onEnd.apply(this))},i.destory=function(){j.remove()},i.init(g)},b.fn.fly=function(a){return this.each(function(){void 0==b(this).data("fly")&&b(this).data("fly",new b.fly(this,a))})}}(jQuery);
///<jscompress sourcefile="jquery.hash.js" />
!function(b){b.hash||(b.hash=function(a,i){function j(c){return"string"==typeof c||"[object String]"===Object.prototype.toString.call(c)}var k,l,m,n;if(j(a)&&""!=a){return k=new RegExp("(;"+a+"=[^;]*)|(\\b"+a+"=[^;]*&)|(\\b"+a+"=[^;]*)","ig"),l=new RegExp(";*\\b"+a+"=[^;]*","i"),"undefined"==typeof i?(m=location.hash.match(l),m?decodeURIComponent(b.trim(m[0].split("=")[1])):null):(null===i?location.hash=location.hash.replace(k,""):(i+="",n=location.hash.replace(k,""),n+=";"+a+"="+encodeURIComponent(i),location.hash=n),void 0)}})}(jQuery);
///<jscompress sourcefile="jquery.mCustomScrollbar.concat.js" />
!function(b){"function"==typeof define&&define.amd?define(["jquery"],b):"object"==typeof exports?module.exports=b:b(jQuery)}(function(l){function m(a){var c=a||window.event,d=t.call(arguments,1),e=0,f=0,i=0,k=0,w=0,x=0;if(a=l.event.fix(c),a.type="mousewheel","detail" in c&&(i=-1*c.detail),"wheelDelta" in c&&(i=c.wheelDelta),"wheelDeltaY" in c&&(i=c.wheelDeltaY),"wheelDeltaX" in c&&(f=-1*c.wheelDeltaX),"axis" in c&&c.axis===c.HORIZONTAL_AXIS&&(f=-1*i,i=0),e=0===i?f:i,"deltaY" in c&&(i=-1*c.deltaY,e=i),"deltaX" in c&&(f=c.deltaX,0===i&&(e=-1*f)),0!==i||0!==f){if(1===c.deltaMode){var y=l.data(this,"mousewheel-line-height");e*=y,i*=y,f*=y}else{if(2===c.deltaMode){var z=l.data(this,"mousewheel-page-height");e*=z,i*=z,f*=z}}if(k=Math.max(Math.abs(i),Math.abs(f)),(!q||q>k)&&(q=k,o(c,k)&&(q/=40)),o(c,k)&&(e/=40,f/=40,i/=40),e=Math[e>=1?"floor":"ceil"](e/q),f=Math[f>=1?"floor":"ceil"](f/q),i=Math[i>=1?"floor":"ceil"](i/q),v.settings.normalizeOffset&&this.getBoundingClientRect){var A=this.getBoundingClientRect();w=a.clientX-A.left,x=a.clientY-A.top}return a.deltaX=f,a.deltaY=i,a.deltaFactor=q,a.offsetX=w,a.offsetY=x,a.deltaMode=0,d.unshift(a,e,f,i),p&&clearTimeout(p),p=setTimeout(n,200),(l.event.dispatch||l.event.handle).apply(this,d)}}function n(){q=null}function o(c,d){return v.settings.adjustOldDeltas&&"mousewheel"===c.type&&d%120===0}var p,q,r=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],s="onwheel" in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],t=Array.prototype.slice;if(l.event.fixHooks){for(var u=r.length;u;){l.event.fixHooks[r[--u]]=l.event.mouseHooks}}var v=l.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener){for(var a=s.length;a;){this.addEventListener(s[--a],m,!1)}}else{this.onmousewheel=m}l.data(this,"mousewheel-line-height",v.getLineHeight(this)),l.data(this,"mousewheel-page-height",v.getPageHeight(this))},teardown:function(){if(this.removeEventListener){for(var a=s.length;a;){this.removeEventListener(s[--a],m,!1)}}else{this.onmousewheel=null}l.removeData(this,"mousewheel-line-height"),l.removeData(this,"mousewheel-page-height")},getLineHeight:function(a){var e=l(a),f=e["offsetParent" in l.fn?"offsetParent":"parent"]();return f.length||(f=l("body")),parseInt(f.css("fontSize"),10)||parseInt(e.css("fontSize"),10)||16},getPageHeight:function(a){return l(a).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};l.fn.extend({mousewheel:function(b){return b?this.bind("mousewheel",b):this.trigger("mousewheel")},unmousewheel:function(b){return this.unbind("mousewheel",b)}})});!function(c,d,b){!function(g){var f="function"==typeof define&&define.amd,e="https:"==b.location.protocol?"https:":"http:",a="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";f||c.event.special.mousewheel||c("head").append(decodeURI("%3Cscript src="+e+"//"+a+"%3E%3C/script%3E")),g()}(function(){var aD,aB="mCustomScrollbar",ap="mCS",aK=".mCustomScrollbar",ax={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:!0},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},aM=0,ad={},af=d.attachEvent&&!d.addEventListener?1:0,aQ=!1,aj=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],an={init:function(i){var i=c.extend(!0,{},ax,i),f=az.call(this);if(i.live){var h=i.liveSelector||this.selector||aK,g=c(h);if("off"===i.live){return void al(h)}ad[h]=setTimeout(function(){g.mCustomScrollbar(i),"once"===i.live&&g.length&&al(h)},500)}else{al(h)}return i.setWidth=i.set_width?i.set_width:i.setWidth,i.setHeight=i.set_height?i.set_height:i.setHeight,i.axis=i.horizontalScroll?"x":aS(i.axis),i.scrollInertia=i.scrollInertia>0&&i.scrollInertia<17?17:i.scrollInertia,"object"!=typeof i.mouseWheel&&1==i.mouseWheel&&(i.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),i.mouseWheel.scrollAmount=i.mouseWheelPixels?i.mouseWheelPixels:i.mouseWheel.scrollAmount,i.mouseWheel.normalizeDelta=i.advanced.normalizeMouseWheelDelta?i.advanced.normalizeMouseWheelDelta:i.mouseWheel.normalizeDelta,i.scrollButtons.scrollType=aW(i.scrollButtons.scrollType),aG(i),c(f).each(function(){var j=c(this);if(!j.data(ap)){j.data(ap,{idx:++aM,opt:i,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:j.css("direction"),cbOffsets:null,trigger:null});var q=j.data(ap),p=q.opt,s=j.data("mcs-axis"),m=j.data("mcs-scrollbar-position"),k=j.data("mcs-theme");s&&(p.axis=s),m&&(p.scrollbarPosition=m),k&&(p.theme=k,aG(p)),e.call(this),c("#mCSB_"+q.idx+"_container img:not(."+aj[2]+")").addClass(aj[2]),an.update.call(null,j)}})},update:function(h,f){var g=h||az.call(this);return c(g).each(function(){var q=c(this);if(q.data(ap)){var k=q.data(ap),j=k.opt,m=c("#mCSB_"+k.idx+"_container"),i=[c("#mCSB_"+k.idx+"_dragger_vertical"),c("#mCSB_"+k.idx+"_dragger_horizontal")];if(!m.length){return}k.tweenRunning&&aJ(q),q.hasClass(aj[3])&&q.removeClass(aj[3]),q.hasClass(aj[4])&&q.removeClass(aj[4]),ae.call(this),aU.call(this),"y"===j.axis||j.advanced.autoExpandHorizontalScroll||m.css("width",aN(m.children())),k.overflowed=av.call(this),aL.call(this),j.autoDraggerLength&&aY.call(this),ac.call(this),aE.call(this);var p=[Math.abs(m[0].offsetTop),Math.abs(m[0].offsetLeft)];"x"!==j.axis&&(k.overflowed[0]?i[0].height()>i[0].parent().height()?aA.call(this):(am(q,p[0].toString(),{dir:"y",dur:0,overwrite:"none"}),k.contentReset.y=null):(aA.call(this),"y"===j.axis?aq.call(this):"yx"===j.axis&&k.overflowed[1]&&am(q,p[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==j.axis&&(k.overflowed[1]?i[1].width()>i[1].parent().width()?aA.call(this):(am(q,p[1].toString(),{dir:"x",dur:0,overwrite:"none"}),k.contentReset.x=null):(aA.call(this),"x"===j.axis?aq.call(this):"yx"===j.axis&&k.overflowed[0]&&am(q,p[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),f&&k&&(2===f&&j.callbacks.onImageLoad&&"function"==typeof j.callbacks.onImageLoad?j.callbacks.onImageLoad.call(this):3===f&&j.callbacks.onSelectorChange&&"function"==typeof j.callbacks.onSelectorChange?j.callbacks.onSelectorChange.call(this):j.callbacks.onUpdate&&"function"==typeof j.callbacks.onUpdate&&j.callbacks.onUpdate.call(this)),aC.call(this)}})},scrollTo:function(h,f){if("undefined"!=typeof h&&null!=h){var g=az.call(this);return c(g).each(function(){var p=c(this);if(p.data(ap)){var m=p.data(ap),q=m.opt,k={trigger:"external",scrollInertia:q.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},u=c.extend(!0,{},k,f),i=aZ.call(this,h),j=u.scrollInertia>0&&u.scrollInertia<17?17:u.scrollInertia;i[0]=aX.call(this,i[0],"y"),i[1]=aX.call(this,i[1],"x"),u.moveDragger&&(i[0]*=m.scrollRatio.y,i[1]*=m.scrollRatio.x),u.dur=j,setTimeout(function(){null!==i[0]&&"undefined"!=typeof i[0]&&"x"!==q.axis&&m.overflowed[0]&&(u.dir="y",u.overwrite="all",am(p,i[0].toString(),u)),null!==i[1]&&"undefined"!=typeof i[1]&&"y"!==q.axis&&m.overflowed[1]&&(u.dir="x",u.overwrite="none",am(p,i[1].toString(),u))},u.timeout)}})}},stop:function(){var f=az.call(this);return c(f).each(function(){var g=c(this);g.data(ap)&&aJ(g)})},disable:function(g){var f=az.call(this);return c(f).each(function(){var h=c(this);if(h.data(ap)){h.data(ap);aC.call(this,"remove"),aq.call(this),g&&aA.call(this),aL.call(this,!0),h.addClass(aj[3])}})},destroy:function(){var f=az.call(this);return c(f).each(function(){var g=c(this);if(g.data(ap)){var j=g.data(ap),k=j.opt,i=c("#mCSB_"+j.idx),m=c("#mCSB_"+j.idx+"_container"),h=c(".mCSB_"+j.idx+"_scrollbar");k.live&&al(k.liveSelector||c(f).selector),aC.call(this,"remove"),aq.call(this),aA.call(this),g.removeData(ap),a(this,"mcs"),h.remove(),m.find("img."+aj[2]).removeClass(aj[2]),i.replaceWith(m.contents()),g.removeClass(aB+" _"+ap+"_"+j.idx+" "+aj[6]+" "+aj[7]+" "+aj[5]+" "+aj[3]).addClass(aj[4])}})}},az=function(){return"object"!=typeof c(this)||c(this).length<1?aK:this},aG=function(l){var f=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],j=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],h=["minimal","minimal-dark"],g=["minimal","minimal-dark"],k=["minimal","minimal-dark"];l.autoDraggerLength=c.inArray(l.theme,f)>-1?!1:l.autoDraggerLength,l.autoExpandScrollbar=c.inArray(l.theme,j)>-1?!1:l.autoExpandScrollbar,l.scrollButtons.enable=c.inArray(l.theme,h)>-1?!1:l.scrollButtons.enable,l.autoHideScrollbar=c.inArray(l.theme,g)>-1?!0:l.autoHideScrollbar,l.scrollbarPosition=c.inArray(l.theme,k)>-1?"outside":l.scrollbarPosition},al=function(f){ad[f]&&(clearTimeout(ad[f]),a(ad,f))},aS=function(f){return"yx"===f||"xy"===f||"auto"===f?"yx":"x"===f||"horizontal"===f?"x":"y"},aW=function(f){return"stepped"===f||"pixels"===f||"step"===f||"click"===f?"stepped":"stepless"},e=function(){var A=c(this),f=A.data(ap),w=f.opt,y=w.autoExpandScrollbar?" "+aj[1]+"_expand":"",q=["<div id='mCSB_"+f.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+f.idx+"_scrollbar mCS-"+w.theme+" mCSB_scrollTools_vertical"+y+"'><div class='"+aj[12]+"'><div id='mCSB_"+f.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+f.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+f.idx+"_scrollbar mCS-"+w.theme+" mCSB_scrollTools_horizontal"+y+"'><div class='"+aj[12]+"'><div id='mCSB_"+f.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],z="yx"===w.axis?"mCSB_vertical_horizontal":"x"===w.axis?"mCSB_horizontal":"mCSB_vertical",i="yx"===w.axis?q[0]+q[1]:"x"===w.axis?q[1]:q[0],j="yx"===w.axis?"<div id='mCSB_"+f.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",B=w.autoHideScrollbar?" "+aj[6]:"",n="x"!==w.axis&&"rtl"===f.langDir?" "+aj[7]:"";w.setWidth&&A.css("width",w.setWidth),w.setHeight&&A.css("height",w.setHeight),w.setLeft="y"!==w.axis&&"rtl"===f.langDir?"989999px":w.setLeft,A.addClass(aB+" _"+ap+"_"+f.idx+B+n).wrapInner("<div id='mCSB_"+f.idx+"' class='mCustomScrollBox mCS-"+w.theme+" "+z+"'><div id='mCSB_"+f.idx+"_container' class='mCSB_container' style='position:relative; top:"+w.setTop+"; left:"+w.setLeft+";' dir="+f.langDir+" /></div>");var v=c("#mCSB_"+f.idx),x=c("#mCSB_"+f.idx+"_container");"y"===w.axis||w.advanced.autoExpandHorizontalScroll||x.css("width",aN(x.children())),"outside"===w.scrollbarPosition?("static"===A.css("position")&&A.css("position","relative"),A.css("overflow","visible"),v.addClass("mCSB_outside").after(i)):(v.addClass("mCSB_inside").append(i),x.wrap(j)),ab.call(this);var k=[c("#mCSB_"+f.idx+"_dragger_vertical"),c("#mCSB_"+f.idx+"_dragger_horizontal")];k[0].css("min-height",k[0].height()),k[1].css("min-width",k[1].width())},aN=function(f){return Math.max.apply(Math,f.map(function(){return c(this).outerWidth(!0)}).get())},aU=function(){var i=c(this),f=i.data(ap),h=f.opt,g=c("#mCSB_"+f.idx+"_container");h.advanced.autoExpandHorizontalScroll&&"y"!==h.axis&&g.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(g[0].getBoundingClientRect().right+0.4)-Math.floor(g[0].getBoundingClientRect().left),position:"relative"}).unwrap()},ab=function(){var m=c(this),f=m.data(ap),i=f.opt,h=c(".mCSB_"+f.idx+"_scrollbar:first"),j=aa(i.scrollButtons.tabindex)?"tabindex='"+i.scrollButtons.tabindex+"'":"",g=["<a href='#' class='"+aj[13]+"' oncontextmenu='return false;' "+j+" />","<a href='#' class='"+aj[14]+"' oncontextmenu='return false;' "+j+" />","<a href='#' class='"+aj[15]+"' oncontextmenu='return false;' "+j+" />","<a href='#' class='"+aj[16]+"' oncontextmenu='return false;' "+j+" />"],k=["x"===i.axis?g[2]:g[0],"x"===i.axis?g[3]:g[1],g[2],g[3]];i.scrollButtons.enable&&h.prepend(k[0]).append(k[1]).next(".mCSB_scrollTools").prepend(k[2]).append(k[3])},ae=function(){var m=c(this),f=m.data(ap),i=c("#mCSB_"+f.idx),h=m.css("max-height")||"none",j=-1!==h.indexOf("%"),g=m.css("box-sizing");if("none"!==h){var k=j?m.parent().height()*parseInt(h)/100:parseInt(h);"border-box"===g&&(k-=m.innerHeight()-m.height()+(m.outerHeight()-m.innerHeight())),i.css("max-height",Math.round(k))}},aY=function(){var p=c(this),f=p.data(ap),j=c("#mCSB_"+f.idx),i=c("#mCSB_"+f.idx+"_container"),k=[c("#mCSB_"+f.idx+"_dragger_vertical"),c("#mCSB_"+f.idx+"_dragger_horizontal")],h=[j.height()/i.outerHeight(!1),j.width()/i.outerWidth(!1)],m=[parseInt(k[0].css("min-height")),Math.round(h[0]*k[0].parent().height()),parseInt(k[1].css("min-width")),Math.round(h[1]*k[1].parent().width())],g=af&&m[1]<m[0]?m[0]:m[1],q=af&&m[3]<m[2]?m[2]:m[3];k[0].css({height:g,"max-height":k[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":m[0]+"px"}),k[1].css({width:q,"max-width":k[1].parent().width()-10})},ac=function(){var m=c(this),f=m.data(ap),i=c("#mCSB_"+f.idx),h=c("#mCSB_"+f.idx+"_container"),j=[c("#mCSB_"+f.idx+"_dragger_vertical"),c("#mCSB_"+f.idx+"_dragger_horizontal")],g=[h.outerHeight(!1)-i.height(),h.outerWidth(!1)-i.width()],k=[g[0]/(j[0].parent().height()-j[0].height()),g[1]/(j[1].parent().width()-j[1].width())];f.scrollRatio={y:k[0],x:k[1]}},aO=function(g,j,f){var i=f?aj[0]+"_expanded":"",h=g.closest(".mCSB_scrollTools");"active"===j?(g.toggleClass(aj[0]+" "+i),h.toggleClass(aj[1]),g[0]._draggable=g[0]._draggable?0:1):g[0]._draggable||("hide"===j?(g.removeClass(aj[0]),h.removeClass(aj[1])):(g.addClass(aj[0]),h.addClass(aj[1])))},av=function(){var k=c(this),f=k.data(ap),i=c("#mCSB_"+f.idx),h=c("#mCSB_"+f.idx+"_container"),j=null==f.overflowed?h.height():h.outerHeight(!1),g=null==f.overflowed?h.width():h.outerWidth(!1);return[j>i.height(),g>i.width()]},aA=function(){var m=c(this),f=m.data(ap),i=f.opt,h=c("#mCSB_"+f.idx),j=c("#mCSB_"+f.idx+"_container"),g=[c("#mCSB_"+f.idx+"_dragger_vertical"),c("#mCSB_"+f.idx+"_dragger_horizontal")];if(aJ(m),("x"!==i.axis&&!f.overflowed[0]||"y"===i.axis&&f.overflowed[0])&&(g[0].add(j).css("top",0),am(m,"_resetY")),"y"!==i.axis&&!f.overflowed[1]||"x"===i.axis&&f.overflowed[1]){var k=dx=0;"rtl"===f.langDir&&(k=h.width()-j.outerWidth(!1),dx=Math.abs(k/f.scrollRatio.x)),j.css("left",k),g[1].css("left",dx),am(m,"_resetX")}},aE=function(){function j(){i=setTimeout(function(){c.event.special.mousewheel?(clearTimeout(i),t.call(f[0])):j()},100)}var f=c(this),h=f.data(ap),g=h.opt;if(!h.bindEvents){if(ag.call(this),g.contentTouchScroll&&ay.call(this),aV.call(this),g.mouseWheel.enable){var i;j()}a0.call(this),aR.call(this),g.advanced.autoScrollOnFocus&&ao.call(this),g.scrollButtons.enable&&ak.call(this),g.keyboard.enable&&aI.call(this),h.bindEvents=!0}},aq=function(){var m=c(this),i=m.data(ap),h=i.opt,j=ap+"_"+i.idx,g=".mCSB_"+i.idx+"_scrollbar",k=c("#mCSB_"+i.idx+",#mCSB_"+i.idx+"_container,#mCSB_"+i.idx+"_container_wrapper,"+g+" ."+aj[12]+",#mCSB_"+i.idx+"_dragger_vertical,#mCSB_"+i.idx+"_dragger_horizontal,"+g+">a"),f=c("#mCSB_"+i.idx+"_container");h.advanced.releaseDraggableSelectors&&k.add(c(h.advanced.releaseDraggableSelectors)),i.bindEvents&&(c(b).unbind("."+j),k.each(function(){c(this).unbind("."+j)}),clearTimeout(m[0]._focusTimeout),a(m[0],"_focusTimeout"),clearTimeout(i.sequential.step),a(i.sequential,"step"),clearTimeout(f[0].onCompleteTimeout),a(f[0],"onCompleteTimeout"),i.bindEvents=!1)},aL=function(p){var f=c(this),j=f.data(ap),i=j.opt,k=c("#mCSB_"+j.idx+"_container_wrapper"),h=k.length?k:c("#mCSB_"+j.idx+"_container"),m=[c("#mCSB_"+j.idx+"_scrollbar_vertical"),c("#mCSB_"+j.idx+"_scrollbar_horizontal")],g=[m[0].find(".mCSB_dragger"),m[1].find(".mCSB_dragger")];"x"!==i.axis&&(j.overflowed[0]&&!p?(m[0].add(g[0]).add(m[0].children("a")).css("display","block"),h.removeClass(aj[8]+" "+aj[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&g[0].css("display","none"),h.removeClass(aj[10])):(m[0].css("display","none"),h.addClass(aj[10])),h.addClass(aj[8]))),"y"!==i.axis&&(j.overflowed[1]&&!p?(m[1].add(g[1]).add(m[1].children("a")).css("display","block"),h.removeClass(aj[9]+" "+aj[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&g[1].css("display","none"),h.removeClass(aj[11])):(m[1].css("display","none"),h.addClass(aj[11])),h.addClass(aj[9]))),j.overflowed[0]||j.overflowed[1]?f.removeClass(aj[5]):f.addClass(aj[5])},ah=function(g){var i=g.type;switch(i){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return[g.originalEvent.pageY,g.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var f=g.originalEvent.touches[0]||g.originalEvent.changedTouches[0],h=g.originalEvent.touches.length||g.originalEvent.changedTouches.length;return[f.pageY,f.pageX,h>1];default:return[g.pageY,g.pageX,!1]}},ag=function(){function C(g){var h=z.find("iframe");if(h.length){var f=g?"auto":"none";h.css("pointer-events",f)}}function y(g,n,f,l){if(z[0].idleTimer=j.scrollInertia<233?250:0,x.attr("id")===w[1]){var h="x",m=(x[0].offsetLeft-n+l)*i.scrollRatio.x}else{var h="y",m=(x[0].offsetTop-g+f)*i.scrollRatio.y}am(B,m.toString(),{dir:h,drag:!0})}var x,A,u,B=c(this),i=B.data(ap),j=i.opt,q=ap+"_"+i.idx,w=["mCSB_"+i.idx+"_dragger_vertical","mCSB_"+i.idx+"_dragger_horizontal"],z=c("#mCSB_"+i.idx+"_container"),k=c("#"+w[0]+",#"+w[1]),D=j.advanced.releaseDraggableSelectors?k.add(c(j.advanced.releaseDraggableSelectors)):k;k.bind("mousedown."+q+" touchstart."+q+" pointerdown."+q+" MSPointerDown."+q,function(r){if(r.stopImmediatePropagation(),r.preventDefault(),ai(r)){aQ=!0,af&&(b.onselectstart=function(){return !1}),C(!1),aJ(B),x=c(this);var l=x.offset(),f=ah(r)[0]-l.top,g=ah(r)[1]-l.left,n=x.height()+l.top,s=x.width()+l.left;n>f&&f>0&&s>g&&g>0&&(A=f,u=g),aO(x,"active",j.autoExpandScrollbar)}}).bind("touchmove."+q,function(g){g.stopImmediatePropagation(),g.preventDefault();var l=x.offset(),f=ah(g)[0]-l.top,h=ah(g)[1]-l.left;y(A,u,f,h)}),c(b).bind("mousemove."+q+" pointermove."+q+" MSPointerMove."+q,function(g){if(x){var l=x.offset(),f=ah(g)[0]-l.top,h=ah(g)[1]-l.left;if(A===f){return}y(A,u,f,h)}}).add(D).bind("mouseup."+q+" touchend."+q+" pointerup."+q+" MSPointerUp."+q,function(){x&&(aO(x,"active",j.autoExpandScrollbar),x=null),aQ=!1,af&&(b.onselectstart=null),C(!0)})},ay=function(){function W(g,h){var f=[1.5*h,2*h,h/1.5,h/2];return g>90?h>4?f[0]:f[3]:g>60?h>3?f[3]:f[2]:g>30?h>8?f[1]:h>6?f[0]:h>4?h:f[2]:h>8?h:f[3]}function j(g,m,f,l,k,h){g&&am(i,g.toString(),{dur:m,scrollEasing:f,dir:l,overwrite:k,drag:h})}var N,R,J,U,u,A,D,F,K,Q,E,Y,at,i=c(this),V=i.data(ap),Z=V.opt,o=ap+"_"+V.idx,z=c("#mCSB_"+V.idx),a2=c("#mCSB_"+V.idx+"_container"),q=[c("#mCSB_"+V.idx+"_dragger_vertical"),c("#mCSB_"+V.idx+"_dragger_horizontal")],X=[],H=[],L=0,P="yx"===Z.axis?"none":"all",G=[];a2.bind("touchstart."+o+" pointerdown."+o+" MSPointerDown."+o,function(f){if(!aP(f)||aQ||ah(f)[2]){return void (aD=0)}aD=1,Y=0,at=0;var g=a2.offset();N=ah(f)[0]-g.top,R=ah(f)[1]-g.left,G=[ah(f)[0],ah(f)[1]]}).bind("touchmove."+o+" pointermove."+o+" MSPointerMove."+o,function(k){if(aP(k)&&!aQ&&!ah(k)[2]&&(k.stopImmediatePropagation(),!at||Y)){A=aw();var x=z.offset(),v=ah(k)[0]-x.top,p=ah(k)[1]-x.left,r="mcsLinearOut";if(X.push(v),H.push(p),G[2]=Math.abs(ah(k)[0]-G[0]),G[3]=Math.abs(ah(k)[1]-G[1]),V.overflowed[0]){var w=q[0].parent().height()-q[0].height(),g=N-v>0&&v-N>-(w*V.scrollRatio.y)&&(2*G[3]<G[2]||"yx"===Z.axis)}if(V.overflowed[1]){var m=q[1].parent().width()-q[1].width(),n=R-p>0&&p-R>-(m*V.scrollRatio.x)&&(2*G[2]<G[3]||"yx"===Z.axis)}g||n?(k.preventDefault(),Y=1):at=1,Q="yx"===Z.axis?[N-v,R-p]:"x"===Z.axis?[null,R-p]:[N-v,null],a2[0].idleTimer=250,V.overflowed[0]&&j(Q[0],L,r,"y","all",!0),V.overflowed[1]&&j(Q[1],L,r,"x",P,!0)}}),z.bind("touchstart."+o+" pointerdown."+o+" MSPointerDown."+o,function(f){if(!aP(f)||aQ||ah(f)[2]){return void (aD=0)}aD=1,f.stopImmediatePropagation(),aJ(i),u=aw();var g=z.offset();J=ah(f)[0]-g.top,U=ah(f)[1]-g.left,X=[],H=[]}).bind("touchend."+o+" pointerup."+o+" MSPointerUp."+o,function(k){if(aP(k)&&!aQ&&!ah(k)[2]){k.stopImmediatePropagation(),Y=0,at=0,D=aw();var v=z.offset(),s=ah(k)[0]-v.top,l=ah(k)[1]-v.left;if(!(D-A>30)){K=1000/(D-u);var w="mcsEaseOut",f=2.5>K,g=f?[X[X.length-2],H[H.length-2]]:[0,0];F=f?[s-g[0],l-g[1]]:[s-J,l-U];var h=[Math.abs(F[0]),Math.abs(F[1])];K=f?[Math.abs(F[0]/4),Math.abs(F[1]/4)]:[K,K];var p=[Math.abs(a2[0].offsetTop)-F[0]*W(h[0]/K[0],K[0]),Math.abs(a2[0].offsetLeft)-F[1]*W(h[1]/K[1],K[1])];Q="yx"===Z.axis?[p[0],p[1]]:"x"===Z.axis?[null,p[1]]:[p[0],null],E=[4*h[0]+Z.scrollInertia,4*h[1]+Z.scrollInertia];var m=parseInt(Z.contentTouchScroll)||0;Q[0]=h[0]>m?Q[0]:0,Q[1]=h[1]>m?Q[1]:0,V.overflowed[0]&&j(Q[0],E[0],w,"y",P,!1),V.overflowed[1]&&j(Q[1],E[1],w,"x",P,!1)}}})},aV=function(){function u(){return d.getSelection?d.getSelection().toString():b.selection&&"Control"!=b.selection.type?b.selection.createRange().text:0}function w(h,l,f){j.type=f&&o?"stepped":"stepless",j.scrollAmount=10,ar(x,h,l,"mcsLinearOut",f?60:null)}var o,x=c(this),g=x.data(ap),i=g.opt,j=g.sequential,k=ap+"_"+g.idx,q=c("#mCSB_"+g.idx+"_container"),v=q.parent();q.bind("mousedown."+k,function(){aD||o||(o=1,aQ=!0)}).add(b).bind("mousemove."+k,function(h){if(!aD&&o&&u()){var m=q.offset(),f=ah(h)[0]-m.top+q[0].offsetTop,l=ah(h)[1]-m.left+q[0].offsetLeft;f>0&&f<v.height()&&l>0&&l<v.width()?j.step&&w("off",null,"stepped"):("x"!==i.axis&&g.overflowed[0]&&(0>f?w("on",38):f>v.height()&&w("on",40)),"y"!==i.axis&&g.overflowed[1]&&(0>l?w("on",37):l>v.width()&&w("on",39)))}}).bind("mouseup."+k,function(){aD||(o&&(o=0,w("off",null)),aQ=!1)})},t=function(){function p(n){var s=null;try{var l=n.contentDocument||n.contentWindow.document;s=l.body.innerHTML}catch(r){}return null!==s}var f=c(this),j=f.data(ap);if(j){var i=j.opt,k=ap+"_"+j.idx,h=c("#mCSB_"+j.idx),m=[c("#mCSB_"+j.idx+"_dragger_vertical"),c("#mCSB_"+j.idx+"_dragger_horizontal")],g=c("#mCSB_"+j.idx+"_container").find("iframe"),q=h;g.length&&g.each(function(){var l=this;p(l)&&(q=q.add(c(l).contents().find("body")))}),q.bind("mousewheel."+k,function(z,v){if(aJ(f),!aH(f,z.target)){var y="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):af&&z.deltaFactor<100?100:z.deltaFactor||100;if("x"===i.axis||"x"===i.mouseWheel.axis){var l="x",A=[Math.round(y*j.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],n="auto"!==i.mouseWheel.scrollAmount?A[1]:A[0]>=h.width()?0.9*h.width():A[0],s=Math.abs(c("#mCSB_"+j.idx+"_container")[0].offsetLeft),w=m[1][0].offsetLeft,x=m[1].parent().width()-m[1].width(),o=z.deltaX||z.deltaY||v}else{var l="y",A=[Math.round(y*j.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],n="auto"!==i.mouseWheel.scrollAmount?A[1]:A[0]>=h.height()?0.9*h.height():A[0],s=Math.abs(c("#mCSB_"+j.idx+"_container")[0].offsetTop),w=m[0][0].offsetTop,x=m[0].parent().height()-m[0].height(),o=z.deltaY||v}"y"===l&&!j.overflowed[0]||"x"===l&&!j.overflowed[1]||(i.mouseWheel.invert&&(o=-o),i.mouseWheel.normalizeDelta&&(o=0>o?-1:1),(o>0&&0!==w||0>o&&w!==x||i.mouseWheel.preventDefault)&&(z.stopImmediatePropagation(),z.preventDefault()),am(f,(s-o*n).toString(),{dir:l}))}})}},aH=function(j,f){var h=f.nodeName.toLowerCase(),g=j.data(ap).opt.mouseWheel.disableOver,i=["select","textarea"];return c.inArray(h,g)>-1&&!(c.inArray(h,i)>-1&&!c(f).is(":focus"))},a0=function(){var k=c(this),f=k.data(ap),i=ap+"_"+f.idx,h=c("#mCSB_"+f.idx+"_container"),j=h.parent(),g=c(".mCSB_"+f.idx+"_scrollbar ."+aj[12]);g.bind("touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(){aQ=!0}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(){aQ=!1}).bind("click."+i,function(r){if(c(r.target).hasClass(aj[12])||c(r.target).hasClass("mCSB_draggerRail")){aJ(k);var p=c(this),q=p.find(".mCSB_dragger");if(p.parent(".mCSB_scrollTools_horizontal").length>0){if(!f.overflowed[1]){return}var u="x",m=r.pageX>q.offset().left?-1:1,n=Math.abs(h[0].offsetLeft)-0.9*m*j.width()}else{if(!f.overflowed[0]){return}var u="y",m=r.pageY>q.offset().top?-1:1,n=Math.abs(h[0].offsetTop)-0.9*m*j.height()}am(k,n.toString(),{dir:u,scrollEasing:"mcsEaseInOut"})}})},ao=function(){var k=c(this),h=k.data(ap),g=h.opt,i=ap+"_"+h.idx,f=c("#mCSB_"+h.idx+"_container"),j=f.parent();f.bind("focusin."+i,function(){var m=c(b.activeElement),l=f.find(".mCustomScrollBox").length,n=0;m.is(g.advanced.autoScrollOnFocus)&&(aJ(k),clearTimeout(k[0]._focusTimeout),k[0]._focusTimer=l?(n+17)*l:0,k[0]._focusTimeout=setTimeout(function(){var q=[aF(m)[0],aF(m)[1]],o=[f[0].offsetTop,f[0].offsetLeft],r=[o[0]+q[0]>=0&&o[0]+q[0]<j.height()-m.outerHeight(!1),o[1]+q[1]>=0&&o[0]+q[1]<j.width()-m.outerWidth(!1)],p="yx"!==g.axis||r[0]||r[1]?"all":"none";"x"===g.axis||r[0]||am(k,q[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:p,dur:n}),"y"===g.axis||r[1]||am(k,q[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:p,dur:n})},k[0]._focusTimer))})},aR=function(){var i=c(this),f=i.data(ap),h=ap+"_"+f.idx,g=c("#mCSB_"+f.idx+"_container").parent();g.bind("scroll."+h,function(){(0!==g.scrollTop()||0!==g.scrollLeft())&&c(".mCSB_"+f.idx+"_scrollbar").css("visibility","hidden")})},ak=function(){var m=c(this),f=m.data(ap),i=f.opt,h=f.sequential,j=ap+"_"+f.idx,g=".mCSB_"+f.idx+"_scrollbar",k=c(g+">a");k.bind("mousedown."+j+" touchstart."+j+" pointerdown."+j+" MSPointerDown."+j+" mouseup."+j+" touchend."+j+" pointerup."+j+" MSPointerUp."+j+" mouseout."+j+" pointerout."+j+" MSPointerOut."+j+" click."+j,function(n){function p(q,l){h.scrollAmount=i.snapAmount||i.scrollButtons.scrollAmount,ar(m,q,l)}if(n.preventDefault(),ai(n)){var o=c(this).attr("class");switch(h.type=i.scrollButtons.scrollType,n.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===h.type){return}aQ=!0,f.tweenRunning=!1,p("on",o);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===h.type){return}aQ=!1,h.dir&&p("off",o);break;case"click":if("stepped"!==h.type||f.tweenRunning){return}p("on",o)}}})},aI=function(){var p=c(this),j=p.data(ap),i=j.opt,k=j.sequential,h=ap+"_"+j.idx,m=c("#mCSB_"+j.idx),f=c("#mCSB_"+j.idx+"_container"),g=f.parent(),q="input,textarea,select,datalist,keygen,[contenteditable='true']";m.attr("tabindex","0").bind("blur."+h+" keydown."+h+" keyup."+h,function(r){function u(s,l){k.type=i.keyboard.scrollType,k.scrollAmount=i.snapAmount||i.keyboard.scrollAmount,"stepped"===k.type&&j.tweenRunning||ar(p,s,l)}switch(r.type){case"blur":j.tweenRunning&&k.dir&&u("off",null);break;case"keydown":case"keyup":var x=r.keyCode?r.keyCode:r.which,n="on";if("x"!==i.axis&&(38===x||40===x)||"y"!==i.axis&&(37===x||39===x)){if((38===x||40===x)&&!j.overflowed[0]||(37===x||39===x)&&!j.overflowed[1]){return}"keyup"===r.type&&(n="off"),c(b.activeElement).is(q)||(r.preventDefault(),r.stopImmediatePropagation(),u(n,x))}else{if(33===x||34===x){if((j.overflowed[0]||j.overflowed[1])&&(r.preventDefault(),r.stopImmediatePropagation()),"keyup"===r.type){aJ(p);var o=34===x?-1:1;if("x"===i.axis||"yx"===i.axis&&j.overflowed[1]&&!j.overflowed[0]){var v="x",w=Math.abs(f[0].offsetLeft)-0.9*o*g.width()}else{var v="y",w=Math.abs(f[0].offsetTop)-0.9*o*g.height()}am(p,w.toString(),{dir:v,scrollEasing:"mcsEaseInOut"})}}else{if((35===x||36===x)&&!c(b.activeElement).is(q)&&((j.overflowed[0]||j.overflowed[1])&&(r.preventDefault(),r.stopImmediatePropagation()),"keyup"===r.type)){if("x"===i.axis||"yx"===i.axis&&j.overflowed[1]&&!j.overflowed[0]){var v="x",w=35===x?Math.abs(g.width()-f.outerWidth(!1)):0}else{var v="y",w=35===x?Math.abs(g.height()-f.outerHeight(!1)):0}am(p,w.toString(),{dir:v,scrollEasing:"mcsEaseInOut"})}}}}})},ar=function(C,f,y,x,A){function v(n){var h="stepped"!==D.type,E=A?A:n?h?z/1.5:k:1000/60,r=n?h?7.5:40:2.5,F=[Math.abs(q[0].offsetTop),Math.abs(q[0].offsetLeft)],l=[i.scrollRatio.y>10?10:i.scrollRatio.y,i.scrollRatio.x>10?10:i.scrollRatio.x],p="x"===D.dir[0]?F[1]+D.dir[1]*l[1]*r:F[0]+D.dir[1]*l[0]*r,u="x"===D.dir[0]?F[1]+D.dir[1]*parseInt(D.scrollAmount):F[0]+D.dir[1]*parseInt(D.scrollAmount),G="auto"!==D.scrollAmount?u:p,H=x?x:n?h?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",g=n?!0:!1;return n&&17>E&&(G="x"===D.dir[0]?F[1]:F[0]),am(C,G.toString(),{dir:D.dir[0],scrollEasing:H,dur:E,onComplete:g}),n?void (D.dir=!1):(clearTimeout(D.step),void (D.step=setTimeout(function(){v()},E)))}function B(){clearTimeout(D.step),a(D,"step"),aJ(C)}var i=C.data(ap),j=i.opt,D=i.sequential,q=c("#mCSB_"+i.idx+"_container"),w="stepped"===D.type?!0:!1,z=j.scrollInertia<26?26:j.scrollInertia,k=j.scrollInertia<1?17:j.scrollInertia;switch(f){case"on":if(D.dir=[y===aj[16]||y===aj[15]||39===y||37===y?"x":"y",y===aj[13]||y===aj[15]||38===y||37===y?-1:1],aJ(C),aa(y)&&"stepped"===D.type){return}v(w);break;case"off":B(),(w||i.tweenRunning&&D.dir)&&v(!0)}},aZ=function(h){var f=c(this).data(ap).opt,g=[];return"function"==typeof h&&(h=h()),h instanceof Array?g=h.length>1?[h[0],h[1]]:"x"===f.axis?[null,h[0]]:[h[0],null]:(g[0]=h.y?h.y:h.x||"x"===f.axis?null:h,g[1]=h.x?h.x:h.y||"y"===f.axis?null:h),"function"==typeof g[0]&&(g[0]=g[0]()),"function"==typeof g[1]&&(g[1]=g[1]()),g},aX=function(A,g){if(null!=A&&"undefined"!=typeof A){var w=c(this),v=w.data(ap),y=v.opt,k=c("#mCSB_"+v.idx+"_container"),z=k.parent(),h=typeof A;g||(g="x"===y.axis?"x":"y");var i="x"===g?k.outerWidth(!1):k.outerHeight(!1),B="x"===g?k[0].offsetLeft:k[0].offsetTop,j="x"===g?"left":"top";switch(h){case"function":return A();case"object":var q=A.jquery?A:c(A);if(!q.length){return}return"x"===g?aF(q)[1]:aF(q)[0];case"string":case"number":if(aa(A)){return Math.abs(A)}if(-1!==A.indexOf("%")){return Math.abs(i*parseInt(A)/100)}if(-1!==A.indexOf("-=")){return Math.abs(B-parseInt(A.split("-=")[1]))}if(-1!==A.indexOf("+=")){var x=B+parseInt(A.split("+=")[1]);return x>=0?0:Math.abs(x)}if(-1!==A.indexOf("px")&&aa(A.split("px")[0])){return Math.abs(A.split("px")[0])}if("top"===A||"left"===A){return 0}if("bottom"===A){return Math.abs(z.height()-k.outerHeight(!1))}if("right"===A){return Math.abs(z.width()-k.outerWidth(!1))}if("first"===A||"last"===A){var q=k.find(":"+A);return"x"===g?aF(q)[1]:aF(q)[0]}return c(A).length?"x"===g?aF(c(A))[1]:aF(c(A))[0]:(k.css(j,A),void an.update.call(null,w[0]))}}},aC=function(G){function h(){clearTimeout(H[0].autoUpdate),H[0].autoUpdate=setTimeout(function(){return k.advanced.updateOnSelectorChange&&(z=D(),z!==F)?(y(3),void (F=z)):(k.advanced.updateOnContentResize&&(C=[H.outerHeight(!1),H.outerWidth(!1),I.height(),I.width(),f()[0],f()[1]],(C[0]!==J[0]||C[1]!==J[1]||C[2]!==J[2]||C[3]!==J[3]||C[4]!==J[4]||C[5]!==J[5])&&(y(C[0]!==J[0]||C[1]!==J[1]),J=C)),k.advanced.updateOnImageLoad&&(q=B(),q!==i&&(H.find("img").each(function(){A(this)}),i=q)),void ((k.advanced.updateOnSelectorChange||k.advanced.updateOnContentResize||k.advanced.updateOnImageLoad)&&h()))},60)}function B(){var g=0;return k.advanced.updateOnImageLoad&&(g=H.find("img").length),g}function A(p){function g(n,o){return function(){return o.apply(n,arguments)}}function m(){this.onload=null,c(p).addClass(aj[2]),y(2)}if(c(p).hasClass(aj[2])){return void y()}var l=new Image;l.onload=g(l,m),l.src=p.src}function D(){k.advanced.updateOnSelectorChange===!0&&(k.advanced.updateOnSelectorChange="*");var l=0,g=H.find(k.advanced.updateOnSelectorChange);return k.advanced.updateOnSelectorChange&&g.length>0&&g.each(function(){l+=c(this).height()+c(this).width()}),l}function y(g){clearTimeout(H[0].autoUpdate),an.update.call(null,E[0],g)}var E=c(this),j=E.data(ap),k=j.opt,H=c("#mCSB_"+j.idx+"_container");if(G){return clearTimeout(H[0].autoUpdate),void a(H[0],"autoUpdate")}var z,C,q,I=H.parent(),K=[c("#mCSB_"+j.idx+"_scrollbar_vertical"),c("#mCSB_"+j.idx+"_scrollbar_horizontal")],f=function(){return[K[0].is(":visible")?K[0].outerHeight(!0):0,K[1].is(":visible")?K[1].outerWidth(!0):0]},F=D(),J=[H.outerHeight(!1),H.outerWidth(!1),I.height(),I.width(),f()[0],f()[1]],i=B();h()},aT=function(g,h,f){return Math.round(g/h)*h-f},aJ=function(h){var f=h.data(ap),g=c("#mCSB_"+f.idx+"_container,#mCSB_"+f.idx+"_container_wrapper,#mCSB_"+f.idx+"_dragger_vertical,#mCSB_"+f.idx+"_dragger_horizontal");g.each(function(){a1.call(this)})},am=function(P,j,K){function J(f){return N&&z.callbacks[f]&&"function"==typeof z.callbacks[f]}function M(){return[z.callbacks.alwaysTriggerOffsets||i>=O[0]+k,z.callbacks.alwaysTriggerOffsets||-A>=i]}function H(){var g=[G[0].offsetTop,G[0].offsetLeft],f=[R[0].offsetTop,R[0].offsetLeft],l=[G.outerHeight(!1),G.outerWidth(!1)],h=[E.height(),E.width()];P[0].mcs={content:G,top:g[0],left:g[1],draggerTop:f[0],draggerLeft:f[1],topPct:Math.round(100*Math.abs(g[0])/(Math.abs(l[0])-h[0])),leftPct:Math.round(100*Math.abs(g[1])/(Math.abs(l[1])-h[1])),direction:K.dir}}var N=P.data(ap),z=N.opt,D={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:z.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},K=c.extend(D,K),Q=[K.dur,K.drag?0:K.dur],E=c("#mCSB_"+N.idx),G=c("#mCSB_"+N.idx+"_container"),I=G.parent(),L=z.callbacks.onTotalScrollOffset?aZ.call(P,z.callbacks.onTotalScrollOffset):[0,0],F=z.callbacks.onTotalScrollBackOffset?aZ.call(P,z.callbacks.onTotalScrollBackOffset):[0,0];if(N.trigger=K.trigger,(0!==I.scrollTop()||0!==I.scrollLeft())&&(c(".mCSB_"+N.idx+"_scrollbar").css("visibility","visible"),I.scrollTop(0).scrollLeft(0)),"_resetY"!==j||N.contentReset.y||(J("onOverflowYNone")&&z.callbacks.onOverflowYNone.call(P[0]),N.contentReset.y=1),"_resetX"!==j||N.contentReset.x||(J("onOverflowXNone")&&z.callbacks.onOverflowXNone.call(P[0]),N.contentReset.x=1),"_resetY"!==j&&"_resetX"!==j){switch(!N.contentReset.y&&P[0].mcs||!N.overflowed[0]||(J("onOverflowY")&&z.callbacks.onOverflowY.call(P[0]),N.contentReset.x=null),!N.contentReset.x&&P[0].mcs||!N.overflowed[1]||(J("onOverflowX")&&z.callbacks.onOverflowX.call(P[0]),N.contentReset.x=null),z.snapAmount&&(j=aT(j,z.snapAmount,z.snapOffset)),K.dir){case"x":var R=c("#mCSB_"+N.idx+"_dragger_horizontal"),U="left",i=G[0].offsetLeft,O=[E.width()-G.outerWidth(!1),R.parent().width()-R.width()],T=[j,0===j?0:j/N.scrollRatio.x],k=L[1],A=F[1],V=k>0?k/N.scrollRatio.x:0,q=A>0?A/N.scrollRatio.x:0;break;case"y":var R=c("#mCSB_"+N.idx+"_dragger_vertical"),U="top",i=G[0].offsetTop,O=[E.height()-G.outerHeight(!1),R.parent().height()-R.height()],T=[j,0===j?0:j/N.scrollRatio.y],k=L[0],A=F[0],V=k>0?k/N.scrollRatio.y:0,q=A>0?A/N.scrollRatio.y:0}T[1]<0||0===T[0]&&0===T[1]?T=[0,0]:T[1]>=O[1]?T=[O[0],O[1]]:T[0]=-T[0],P[0].mcs||(H(),J("onInit")&&z.callbacks.onInit.call(P[0])),clearTimeout(G[0].onCompleteTimeout),(N.tweenRunning||!(0===i&&T[0]>=0||i===O[0]&&T[0]<=O[0]))&&(au(R[0],U,Math.round(T[1]),Q[1],K.scrollEasing),au(G[0],U,Math.round(T[0]),Q[0],K.scrollEasing,K.overwrite,{onStart:function(){K.callbacks&&K.onStart&&!N.tweenRunning&&(J("onScrollStart")&&(H(),z.callbacks.onScrollStart.call(P[0])),N.tweenRunning=!0,aO(R),N.cbOffsets=M())},onUpdate:function(){K.callbacks&&K.onUpdate&&J("whileScrolling")&&(H(),z.callbacks.whileScrolling.call(P[0]))},onComplete:function(){if(K.callbacks&&K.onComplete){"yx"===z.axis&&clearTimeout(G[0].onCompleteTimeout);var f=G[0].idleTimer||0;G[0].onCompleteTimeout=setTimeout(function(){J("onScroll")&&(H(),z.callbacks.onScroll.call(P[0])),J("onTotalScroll")&&T[1]>=O[1]-V&&N.cbOffsets[0]&&(H(),z.callbacks.onTotalScroll.call(P[0])),J("onTotalScrollBack")&&T[1]<=q&&N.cbOffsets[1]&&(H(),z.callbacks.onTotalScrollBack.call(P[0])),N.tweenRunning=!1,G[0].idleTimer=0,aO(R,"hide")},f)}}}))}},au=function(B,k,K,J,G,M,H){function N(){q.stop||(j||L.call(),j=aw()-T,y(),j>=q.time&&(q.time=j>q.time?j+F-(j-q.time):j+F-1,q.time<j+1&&(q.time=j+1)),q.time<J?q.id=I(N):Q.call())}function y(){J>0?(q.currVal=D(q.time,O,z,J,G),R[k]=Math.round(q.currVal)+"px"):R[k]=K+"px",E.call()}function A(){F=1000/60,q.time=j+F,I=d.requestAnimationFrame?d.requestAnimationFrame:function(f){return y(),setTimeout(f,0.01)},q.id=I(N)}function P(){null!=q.id&&(d.requestAnimationFrame?d.cancelAnimationFrame(q.id):clearTimeout(q.id),q.id=null)}function D(g,s,f,m,l){switch(l){case"linear":case"mcsLinear":return f*g/m+s;case"mcsLinearOut":return g/=m,g--,f*Math.sqrt(1-g*g)+s;case"easeInOutSmooth":return g/=m/2,1>g?f/2*g*g+s:(g--,-f/2*(g*(g-2)-1)+s);case"easeInOutStrong":return g/=m/2,1>g?f/2*Math.pow(2,10*(g-1))+s:(g--,f/2*(-Math.pow(2,-10*g)+2)+s);case"easeInOut":case"mcsEaseInOut":return g/=m/2,1>g?f/2*g*g*g+s:(g-=2,f/2*(g*g*g+2)+s);case"easeOutSmooth":return g/=m,g--,-f*(g*g*g*g-1)+s;case"easeOutStrong":return f*(-Math.pow(2,-10*g/m)+1)+s;case"easeOut":case"mcsEaseOut":default:var h=(g/=m)*g,p=h*g;return s+f*(0.499999999999997*p*h+-2.5*h*h+5.5*p+-6.5*h+4*g)}}B._mTween||(B._mTween={top:{},left:{}});var F,I,H=H||{},L=H.onStart||function(){},E=H.onUpdate||function(){},Q=H.onComplete||function(){},T=aw(),j=0,O=B.offsetTop,R=B.style,q=B._mTween[k];"left"===k&&(O=B.offsetLeft);var z=K-O;q.stop=0,"none"!==M&&P(),A()},aw=function(){return d.performance&&d.performance.now?d.performance.now():d.performance&&d.performance.webkitNow?d.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},a1=function(){var g=this;g._mTween||(g._mTween={top:{},left:{}});for(var f=["top","left"],i=0;i<f.length;i++){var h=f[i];g._mTween[h].id&&(d.requestAnimationFrame?d.cancelAnimationFrame(g._mTween[h].id):clearTimeout(g._mTween[h].id),g._mTween[h].id=null,g._mTween[h].stop=1)}},a=function(g,h){try{delete g[h]}catch(f){g[h]=null}},ai=function(f){return !(f.which&&1!==f.which)},aP=function(f){var g=f.originalEvent.pointerType;return !(g&&"touch"!==g&&2!==g)},aa=function(f){return !isNaN(parseFloat(f))&&isFinite(f)},aF=function(f){var g=f.parents(".mCSB_container");return[f.offset().top-g.offset().top,f.offset().left-g.offset().left]};c.fn[aB]=function(f){return an[f]?an[f].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof f&&f?void c.error("Method "+f+" does not exist"):an.init.apply(this,arguments)},c[aB]=function(f){return an[f]?an[f].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof f&&f?void c.error("Method "+f+" does not exist"):an.init.apply(this,arguments)},c[aB].defaults=ax,d[aB]=!0,c(d).load(function(){c(aK)[aB](),c.extend(c.expr[":"],{mcsInView:c.expr[":"].mcsInView||function(k){var f,j,h=c(k),g=h.parents(".mCSB_container");if(g.length){return f=g.parent(),j=[g[0].offsetTop,g[0].offsetLeft],j[0]+aF(h)[0]>=0&&j[0]+aF(h)[0]<f.height()-h.outerHeight(!1)&&j[1]+aF(h)[1]>=0&&j[1]+aF(h)[1]<f.width()-h.outerWidth(!1)}},mcsOverflow:c.expr[":"].mcsOverflow||function(g){var f=c(g).data(ap);if(f){return f.overflowed[0]||f.overflowed[1]}}})})})}(jQuery,window,document);
///<jscompress sourcefile="layer.js" />
/*! layer-v2.2 弹层组件 License LGPL  http://layer.layui.com/ By 贤心 */
;
!
    function (a, b) {
        "use strict";
        var c, d, e = {
                getPath: function () {
                    var a = document.scripts,
                        b = a[a.length - 1],
                        c = b.src;
                    if (!b.getAttribute("merge")) return c.substring(0, c.lastIndexOf("/") + 1)
                }(),
                enter: function (a) {
                    13 === a.keyCode && a.preventDefault()
                },
                config: {},
                end: {},
                btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
                type: ["dialog", "page", "iframe", "loading", "tips"]
            },
            f = {
                v: "2.2",
                ie6: !! a.ActiveXObject && !a.XMLHttpRequest,
                index: 0,
                path: e.getPath,
                config: function (a, b) {
                    var d = 0;
                    return a = a || {},
                        f.cache = e.config = c.extend(e.config, a),
                        f.path = e.config.path || f.path,
                    "string" == typeof a.extend && (a.extend = [a.extend]),
                        f.use("../lib/layer/skin/layer.css", a.extend && a.extend.length > 0 ?
                            function g() {
                                var c = a.extend;
                                f.use(c[c[d] ? d : d - 1], d < c.length ?
                                    function () {
                                        return ++d,
                                            g
                                    }() : b)
                            }() : b),
                        this
                },
                use: function (a, b, d) {
                    var e = c("head")[0],
                        a = a.replace(/\s/g, ""),
                        g = /\.css$/.test(a),
                        h = document.createElement(g ? "link" : "script"),
                        i = "layui_layer_" + a.replace(/\.|\//g, "");
                    return f.path ? (g && (h.rel = "stylesheet"), h[g ? "href" : "src"] = /^http:\/\//.test(a) ? a : f.path + a, h.id = i, c("#" + i)[0] || e.appendChild(h), function j() {
                        (g ? 1989 === parseInt(c("#" + i).css("width")) : f[d || i]) ?
                            function () {
                                b && b();
                                try {
                                    g || e.removeChild(h)
                                } catch (a) {}
                            }() : setTimeout(j, 100)
                    }(), this) : void 0
                },
                ready: function (a, b) {
                    var d = "function" == typeof a;
                    return d && (b = a),
                        f.config(c.extend(e.config, function () {
                            return d ? {} : {
                                path: a
                            }
                        }()), b),
                        this
                },
                alert: function (a, b, d) {
                    var e = "function" == typeof b;
                    return e && (d = b),
                        f.open(c.extend({
                            content: a,
                            yes: d
                        }, e ? {} : b))
                },
                confirm: function (a, b, d, g) {
                    var h = "function" == typeof b;
                    return h && (g = d, d = b),
                        f.open(c.extend({
                            content: a,
                            btn: e.btn,
                            yes: d,
                            cancel: g
                        }, h ? {} : b))
                },
                msg: function (a, d, g) {
                    var i = "function" == typeof d,
                        j = e.config.skin,
                        k = (j ? j + " " + j + "-msg" : "") || "layui-layer-msg",
                        l = h.anim.length - 1;
                    return i && (g = d),
                        f.open(c.extend({
                            content: a,
                            time: 3e3,
                            shade: !1,
                            skin: k,
                            title: !1,
                            closeBtn: !1,
                            btn: !1,
                            end: g
                        }, i && !e.config.skin ? {
                            skin: k + " layui-layer-hui",
                            shift: l
                        } : function () {
                            return d = d || {},
                            (-1 === d.icon || d.icon === b && !e.config.skin) && (d.skin = k + " " + (d.skin || "layui-layer-hui")),
                                d
                        }()))
                },
                load: function (a, b) {
                    return f.open(c.extend({
                        type: 3,
                        icon: a || 0,
                        shade: .01
                    }, b))
                },
                tips: function (a, b, d) {
                    return f.open(c.extend({
                        type: 4,
                        content: [a, b],
                        closeBtn: !1,
                        time: 3e3,
                        shade: !1,
                        maxWidth: 210
                    }, d))
                }
            },
            g = function (a) {
                var b = this;
                b.index = ++f.index,
                    b.config = c.extend({}, b.config, e.config, a),
                    b.creat()
            };
        g.pt = g.prototype;
        var h = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
        h.anim = ["layui-anim", "layui-anim-01", "layui-anim-02", "layui-anim-03", "layui-anim-04", "layui-anim-05", "layui-anim-06"],
            g.pt.config = {
                type: 0,
                shade: .3,
                fix: !0,
                move: h[1],
                title: "&#x4FE1;&#x606F;",
                offset: "auto",
                area: "auto",
                closeBtn: 1,
                time: 0,
                zIndex: 19891014,
                maxWidth: 360,
                shift: 0,
                icon: -1,
                scrollbar: !0,
                tips: 2
            },
            g.pt.vessel = function (a, b) {
                var c = this,
                    d = c.index,
                    f = c.config,
                    g = f.zIndex + d,
                    i = "object" == typeof f.title,
                    j = f.maxmin && (1 === f.type || 2 === f.type),
                    k = f.title ? '<div class="layui-layer-title" style="' + (i ? f.title[1] : "") + '">' + (i ? f.title[0] : f.title) + "</div>" : "";
                return f.zIndex = g,
                    b([f.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + d + '" times="' + d + '" style="' + ("z-index:" + (g - 1) + "; background-color:" + (f.shade[1] || "#000") + "; opacity:" + (f.shade[0] || f.shade) + "; filter:alpha(opacity=" + (100 * f.shade[0] || 100 * f.shade) + ");") + '"></div>' : "", '<div class="' + h[0] + " " + (h.anim[f.shift] || "") + (" layui-layer-" + e.type[f.type]) + (0 != f.type && 2 != f.type || f.shade ? "" : " layui-layer-border") + " " + (f.skin || "") + '" id="' + h[0] + d + '" type="' + e.type[f.type] + '" times="' + d + '" showtime="' + f.time + '" conType="' + (a ? "object" : "string") + '" style="z-index: ' + g + "; width:" + f.area[0] + ";height:" + f.area[1] + (f.fix ? "" : ";position:absolute;") + '">' + (a && 2 != f.type ? "" : k) + '<div id="' + (f.id || "") + '" class="layui-layer-content' + (0 == f.type && -1 !== f.icon ? " layui-layer-padding" : "") + (3 == f.type ? " layui-layer-loading" + f.icon : "") + '">' + (0 == f.type && -1 !== f.icon ? '<i class="layui-layer-ico layui-layer-ico' + f.icon + '"></i>' : "") + (1 == f.type && a ? "" : f.content || "") + '</div><span class="layui-layer-setwin">' +
                    function () {
                        var a = j ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
                        return f.closeBtn && (a += '<a class="layui-layer-ico ' + h[7] + " " + h[7] + (f.title ? f.closeBtn : 4 == f.type ? "1" : "2") + '" href="javascript:;"></a>'),
                            a
                    }() + "</span>" + (f.btn ?
                        function () {
                            var a = "";
                            "string" == typeof f.btn && (f.btn = [f.btn]);
                            for (var b = 0, c = f.btn.length; c > b; b++) a += '<a class="' + h[6] + b + '">' + f.btn[b] + "</a>";
                            return '<div class="' + h[6] + '">' + a + "</div>"
                        }() : "") + "</div>"], k),
                    c
            },
            g.pt.creat = function () {
                var a = this,
                    b = a.config,
                    g = a.index,
                    i = b.content,
                    j = "object" == typeof i;
                if (!c("#" + b.id)[0]) {
                    switch ("string" == typeof b.area && (b.area = "auto" === b.area ? ["", ""] : [b.area, ""]), b.type) {
                        case 0:
                            b.btn = "btn" in b ? b.btn : e.btn[0],
                                f.closeAll("dialog");
                            break;
                        case 2:
                            var i = b.content = j ? b.content : [b.content || "http://layer.layui.com", "auto"];
                            b.content = '<iframe scrolling="' + (b.content[1] || "auto") + '" allowtransparency="true" id="' + h[4] + g + '" name="' + h[4] + g + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + b.content[0] + '"></iframe>';
                            break;
                        case 3:
                            b.title = !1,
                                b.closeBtn = !1,
                            -1 === b.icon && 0 === b.icon,
                                f.closeAll("loading");
                            break;
                        case 4:
                            j || (b.content = [b.content, "body"]),
                                b.follow = b.content[1],
                                b.content = b.content[0] + '<i class="layui-layer-TipsG"></i>',
                                b.title = !1,
                                b.fix = !1,
                                b.tips = "object" == typeof b.tips ? b.tips : [b.tips, !0],
                            b.tipsMore || f.closeAll("tips")
                    }
                    a.vessel(j, function (d, e) {
                        c("body").append(d[0]),
                            j ?
                                function () {
                                    2 == b.type || 4 == b.type ?
                                        function () {
                                            c("body").append(d[1])
                                        }() : function () {
                                        i.parents("." + h[0])[0] || (i.show().addClass("layui-layer-wrap").wrap(d[1]), c("#" + h[0] + g).find("." + h[5]).before(e))
                                    }()
                                }() : c("body").append(d[1]),
                            a.layero = c("#" + h[0] + g),
                        b.scrollbar || h.html.css("overflow", "hidden").attr("layer-full", g)
                    }).auto(g),
                    2 == b.type && f.ie6 && a.layero.find("iframe").attr("src", i[0]),
                        c(document).off("keydown", e.enter).on("keydown", e.enter),
                        a.layero.on("keydown", function (a) {
                            c(document).off("keydown", e.enter)
                        }),
                        4 == b.type ? a.tips() : a.offset(),
                    b.fix && d.on("resize", function () {
                        a.offset(),
                        (/^\d+%$/.test(b.area[0]) || /^\d+%$/.test(b.area[1])) && a.auto(g),
                        4 == b.type && a.tips()
                    }),
                    b.time <= 0 || setTimeout(function () {
                        f.close(a.index)
                    }, b.time),
                        a.move().callback()
                }
            },
            g.pt.auto = function (a) {
                function b(a) {
                    a = g.find(a),
                        a.height(i[1] - j - k - 2 * (0 | parseFloat(a.css("padding"))))
                }
                var e = this,
                    f = e.config,
                    g = c("#" + h[0] + a);
                "" === f.area[0] && f.maxWidth > 0 && (/MSIE 7/.test(navigator.userAgent) && f.btn && g.width(g.innerWidth()), g.outerWidth() > f.maxWidth && g.width(f.maxWidth));
                var i = [g.innerWidth(), g.innerHeight()],
                    j = g.find(h[1]).outerHeight() || 0,
                    k = g.find("." + h[6]).outerHeight() || 0;
                switch (f.type) {
                    case 2:
                        b("iframe");
                        break;
                    default:
                        "" === f.area[1] ? f.fix && i[1] >= d.height() && (i[1] = d.height(), b("." + h[5])) : b("." + h[5])
                }
                return e
            },
            g.pt.offset = function () {
                var a = this,
                    b = a.config,
                    c = a.layero,
                    e = [c.outerWidth(), c.outerHeight()],
                    f = "object" == typeof b.offset;
                a.offsetTop = (d.height() - e[1]) / 2,
                    a.offsetLeft = (d.width() - e[0]) / 2,
                    f ? (a.offsetTop = b.offset[0], a.offsetLeft = b.offset[1] || a.offsetLeft) : "auto" !== b.offset && (a.offsetTop = b.offset, "rb" === b.offset && (a.offsetTop = d.height() - e[1], a.offsetLeft = d.width() - e[0])),
                b.fix || (a.offsetTop = /%$/.test(a.offsetTop) ? d.height() * parseFloat(a.offsetTop) / 100 : parseFloat(a.offsetTop), a.offsetLeft = /%$/.test(a.offsetLeft) ? d.width() * parseFloat(a.offsetLeft) / 100 : parseFloat(a.offsetLeft), a.offsetTop += d.scrollTop(), a.offsetLeft += d.scrollLeft()),
                    c.css({
                        top: a.offsetTop,
                        left: a.offsetLeft
                    })
            },
            g.pt.tips = function () {
                var a = this,
                    b = a.config,
                    e = a.layero,
                    f = [e.outerWidth(), e.outerHeight()],
                    g = c(b.follow);
                g[0] || (g = c("body"));
                var i = {
                        width: g.outerWidth(),
                        height: g.outerHeight(),
                        top: g.offset().top,
                        left: g.offset().left
                    },
                    j = e.find(".layui-layer-TipsG"),
                    k = b.tips[0];
                b.tips[1] || j.remove(),
                    i.autoLeft = function () {
                        i.left + f[0] - d.width() > 0 ? (i.tipLeft = i.left + i.width - f[0], j.css({
                            right: 12,
                            left: "auto"
                        })) : i.tipLeft = i.left
                    },
                    i.where = [function () {
                        i.autoLeft(),
                            i.tipTop = i.top - f[1] - 10,
                            j.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", b.tips[1])
                    },


                        function () {
                            i.tipLeft = i.left + i.width + 10,
                                i.tipTop = i.top,
                                j.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", b.tips[1])
                        },


                        function () {
                            i.autoLeft(),
                                i.tipTop = i.top + i.height + 10,
                                j.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", b.tips[1])
                        },


                        function () {
                            i.tipLeft = i.left - f[0] - 10,
                                i.tipTop = i.top,
                                j.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", b.tips[1])
                        }],
                    i.where[k - 1](),
                    1 === k ? i.top - (d.scrollTop() + f[1] + 16) < 0 && i.where[2]() : 2 === k ? d.width() - (i.left + i.width + f[0] + 16) > 0 || i.where[3]() : 3 === k ? i.top - d.scrollTop() + i.height + f[1] + 16 - d.height() > 0 && i.where[0]() : 4 === k && f[0] + 16 - i.left > 0 && i.where[1](),
                    e.find("." + h[5]).css({
                        "background-color": b.tips[1],
                        "padding-right": b.closeBtn ? "30px" : ""
                    }),
                    e.css({
                        left: i.tipLeft,
                        top: i.tipTop
                    })
            },
            g.pt.move = function () {
                var a = this,
                    b = a.config,
                    e = {
                        setY: 0,
                        moveLayer: function () {
                            var a = e.layero,
                                b = parseInt(a.css("margin-left")),
                                c = parseInt(e.move.css("left"));
                            0 === b || (c -= b),
                            "fixed" !== a.css("position") && (c -= a.parent().offset().left, e.setY = 0),
                                a.css({
                                    left: c,
                                    top: parseInt(e.move.css("top")) - e.setY
                                })
                        }
                    },
                    f = a.layero.find(b.move);
                return b.move && f.attr("move", "ok"),
                    f.css({
                        cursor: b.move ? "move" : "auto"
                    }),
                    c(b.move).on("mousedown", function (a) {
                        if (a.preventDefault(), "ok" === c(this).attr("move")) {
                            e.ismove = !0,
                                e.layero = c(this).parents("." + h[0]);
                            var f = e.layero.offset().left,
                                g = e.layero.offset().top,
                                i = e.layero.outerWidth() - 6,
                                j = e.layero.outerHeight() - 6;
                            c("#layui-layer-moves")[0] || c("body").append('<div id="layui-layer-moves" class="layui-layer-moves" style="left:' + f + "px; top:" + g + "px; width:" + i + "px; height:" + j + 'px; z-index:2147483584"></div>'),
                                e.move = c("#layui-layer-moves"),
                            b.moveType && e.move.css({
                                visibility: "hidden"
                            }),
                                e.moveX = a.pageX - e.move.position().left,
                                e.moveY = a.pageY - e.move.position().top,
                            "fixed" !== e.layero.css("position") || (e.setY = d.scrollTop())
                        }
                    }),
                    c(document).mousemove(function (a) {
                        if (e.ismove) {
                            var c = a.pageX - e.moveX,
                                f = a.pageY - e.moveY;
                            if (a.preventDefault(), !b.moveOut) {
                                e.setY = d.scrollTop();
                                var g = d.width() - e.move.outerWidth(),
                                    h = e.setY;
                                0 > c && (c = 0),
                                c > g && (c = g),
                                h > f && (f = h),
                                f > d.height() - e.move.outerHeight() + e.setY && (f = d.height() - e.move.outerHeight() + e.setY)
                            }
                            e.move.css({
                                left: c,
                                top: f
                            }),
                            b.moveType && e.moveLayer(),
                                c = f = g = h = null
                        }
                    }).mouseup(function () {
                        try {
                            e.ismove && (e.moveLayer(), e.move.remove(), b.moveEnd && b.moveEnd()),
                                e.ismove = !1
                        } catch (a) {
                            e.ismove = !1
                        }
                    }),
                    a
            },
            g.pt.callback = function () {
                function a() {
                    var a = g.cancel && g.cancel(b.index);
                    a === !1 || f.close(b.index)
                }
                var b = this,
                    d = b.layero,
                    g = b.config;
                b.openLayer(),
                g.success && (2 == g.type ? d.find("iframe").on("load", function () {
                    g.success(d, b.index)
                }) : g.success(d, b.index)),
                f.ie6 && b.IE6(d),
                    d.find("." + h[6]).children("a").on("click", function () {
                        var e = c(this).index();
                        g["btn" + (e + 1)] && g["btn" + (e + 1)](b.index, d),
                            0 === e ? g.yes ? g.yes(b.index, d) : f.close(b.index) : 1 === e ? a() : g["btn" + (e + 1)] || f.close(b.index)
                    }),
                    d.find("." + h[7]).on("click", a),
                g.shadeClose && c("#layui-layer-shade" + b.index).on("click", function () {
                    f.close(b.index)
                }),
                    d.find(".layui-layer-min").on("click", function () {
                        f.min(b.index, g),
                        g.min && g.min(d)
                    }),
                    d.find(".layui-layer-max").on("click", function () {
                        c(this).hasClass("layui-layer-maxmin") ? (f.restore(b.index), g.restore && g.restore(d)) : (f.full(b.index, g), g.full && g.full(d))
                    }),
                g.end && (e.end[b.index] = g.end)
            },
            e.reselect = function () {
                c.each(c("select"), function (a, b) {
                    var d = c(this);
                    d.parents("." + h[0])[0] || 1 == d.attr("layer") && c("." + h[0]).length < 1 && d.removeAttr("layer").show(),
                        d = null
                })
            },
            g.pt.IE6 = function (a) {
                function b() {
                    a.css({
                        top: f + (e.config.fix ? d.scrollTop() : 0)
                    })
                }
                var e = this,
                    f = a.offset().top;
                b(),
                    d.scroll(b),
                    c("select").each(function (a, b) {
                        var d = c(this);
                        d.parents("." + h[0])[0] || "none" === d.css("display") || d.attr({
                            layer: "1"
                        }).hide(),
                            d = null
                    })
            },
            g.pt.openLayer = function () {
                var a = this;
                f.zIndex = a.config.zIndex,
                    f.setTop = function (a) {
                        var b = function () {
                            f.zIndex++,
                                a.css("z-index", f.zIndex + 1)
                        };
                        return f.zIndex = parseInt(a[0].style.zIndex),
                            a.on("mousedown", b),
                            f.zIndex
                    }
            },
            e.record = function (a) {
                var b = [a.outerWidth(), a.outerHeight(), a.position().top, a.position().left + parseFloat(a.css("margin-left"))];
                a.find(".layui-layer-max").addClass("layui-layer-maxmin"),
                    a.attr({
                        area: b
                    })
            },
            e.rescollbar = function (a) {
                h.html.attr("layer-full") == a && (h.html[0].style.removeProperty ? h.html[0].style.removeProperty("overflow") : h.html[0].style.removeAttribute("overflow"), h.html.removeAttr("layer-full"))
            },
            a.layer = f,
            f.getChildFrame = function (a, b) {
                return b = b || c("." + h[4]).attr("times"),
                    c("#" + h[0] + b).find("iframe").contents().find(a)
            },
            f.getFrameIndex = function (a) {
                return c("#" + a).parents("." + h[4]).attr("times")
            },
            f.iframeAuto = function (a) {
                if (a) {
                    var b = f.getChildFrame("html", a).outerHeight(),
                        d = c("#" + h[0] + a),
                        e = d.find(h[1]).outerHeight() || 0,
                        g = d.find("." + h[6]).outerHeight() || 0;
                    d.css({
                        height: b + e + g
                    }),
                        d.find("iframe").css({
                            height: b
                        })
                }
            },
            f.iframeSrc = function (a, b) {
                c("#" + h[0] + a).find("iframe").attr("src", b)
            },
            f.style = function (a, b) {
                var d = c("#" + h[0] + a),
                    f = d.attr("type"),
                    g = d.find(h[1]).outerHeight() || 0,
                    i = d.find("." + h[6]).outerHeight() || 0;
                (f === e.type[1] || f === e.type[2]) && (d.css(b), f === e.type[2] && d.find("iframe").css({
                    height: parseFloat(b.height) - g - i
                }))
            },
            f.min = function (a, b) {
                var d = c("#" + h[0] + a),
                    g = d.find(h[1]).outerHeight() || 0;
                e.record(d),
                    f.style(a, {
                        width: 180,
                        height: g,
                        overflow: "hidden"
                    }),
                    d.find(".layui-layer-min").hide(),
                "page" === d.attr("type") && d.find(h[4]).hide(),
                    e.rescollbar(a)
            },
            f.restore = function (a) {
                var b = c("#" + h[0] + a),
                    d = b.attr("area").split(",");
                b.attr("type");
                f.style(a, {
                    width: parseFloat(d[0]),
                    height: parseFloat(d[1]),
                    top: parseFloat(d[2]),
                    left: parseFloat(d[3]),
                    overflow: "visible"
                }),
                    b.find(".layui-layer-max").removeClass("layui-layer-maxmin"),
                    b.find(".layui-layer-min").show(),
                "page" === b.attr("type") && b.find(h[4]).show(),
                    e.rescollbar(a)
            },
            f.full = function (a) {
                var b, g = c("#" + h[0] + a);
                e.record(g),
                h.html.attr("layer-full") || h.html.css("overflow", "hidden").attr("layer-full", a),
                    clearTimeout(b),
                    b = setTimeout(function () {
                        var b = "fixed" === g.css("position");
                        f.style(a, {
                            top: b ? 0 : d.scrollTop(),
                            left: b ? 0 : d.scrollLeft(),
                            width: d.width(),
                            height: d.height()
                        }),
                            g.find(".layui-layer-min").hide()
                    }, 100)
            },
            f.title = function (a, b) {
                var d = c("#" + h[0] + (b || f.index)).find(h[1]);
                d.html(a)
            },
            f.close = function (a) {
                var b = c("#" + h[0] + a),
                    d = b.attr("type");
                if (b[0]) {
                    if (d === e.type[1] && "object" === b.attr("conType")) {
                        b.children(":not(." + h[5] + ")").remove();
                        for (var g = 0; 2 > g; g++) b.find(".layui-layer-wrap").unwrap().hide()
                    } else {
                        if (d === e.type[2]) try {
                            var i = c("#" + h[4] + a)[0];
                            i.contentWindow.document.write(""),
                                i.contentWindow.close(),
                                b.find("." + h[5])[0].removeChild(i)
                        } catch (j) {}
                        b[0].innerHTML = "",
                            b.remove()
                    }
                    c("#layui-layer-moves, #layui-layer-shade" + a).remove(),
                    f.ie6 && e.reselect(),
                        e.rescollbar(a),
                        c(document).off("keydown", e.enter),
                    "function" == typeof e.end[a] && e.end[a](),
                        delete e.end[a]
                }
            },
            f.closeAll = function (a) {
                c.each(c("." + h[0]), function () {
                    var b = c(this),
                        d = a ? b.attr("type") === a : 1;
                    d && f.close(b.attr("times")),
                        d = null
                })
            },
            e.run = function () {
                c = jQuery,
                    d = c(a),
                    h.html = c("html"),
                    f.open = function (a) {
                        var b = new g(a);
                        return b.index
                    }
            },
            "function" == typeof define ? define(function () {
                return e.run(),
                    f
            }) : function () {
                e.run()
            }()
    }(window);
///<jscompress sourcefile="layer.ext.js" />
/*! layer弹层组件拓展类 */
; !
function() {
    layer.use("layer/skin/layer.ext.css",
    function() {
        layer.layui_layer_extendlayerextjs = !0
    });
    var a = layer.cache || {},
    b = function(b) {
        return a.skin ? " " + a.skin + " " + a.skin + "-" + b: ""
    };
    layer.prompt = function(a, c) {
        a = a || {},
        "function" == typeof a && (c = a);
        var d, e = 2 == a.formType ? '<textarea class="layui-layer-input">' + (a.value || "") + "</textarea>": function() {
            return '<input type="' + (1 == a.formType ? "password": "text") + '" class="layui-layer-input" value="' + (a.value || "") + '">'
        } ();
        return layer.open($.extend({
            btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
            content: e,
            skin: "layui-layer-prompt" + b("prompt"),
            success: function(a) {
                d = a.find(".layui-layer-input"),
                d.focus()
            },
            yes: function(b) {
                var e = d.val();
                "" === e ? d.focus() : e.length > (a.maxlength || 500) ? layer.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (a.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", d, {
                    tips: 1
                }) : c && c(e, b, d)
            }
        },
        a))
    },
    layer.tab = function(a) {
        a = a || {};
        var c = a.tab || {};
        return layer.open($.extend({
            type: 1,
            skin: "layui-layer-tab" + b("tab"),
            title: function() {
                var a = c.length,
                b = 1,
                d = "";
                if (a > 0) for (d = '<span class="layui-layer-tabnow">' + c[0].title + "</span>"; a > b; b++) d += "<span>" + c[b].title + "</span>";
                return d
            } (),
            content: '<ul class="layui-layer-tabmain">' +
            function() {
                var a = c.length,
                b = 1,
                d = "";
                if (a > 0) for (d = '<li class="layui-layer-tabli xubox_tab_layer">' + (c[0].content || "no content") + "</li>"; a > b; b++) d += '<li class="layui-layer-tabli">' + (c[b].content || "no  content") + "</li>";
                return d
            } () + "</ul>",
            success: function(b) {
                var c = b.find(".layui-layer-title").children(),
                d = b.find(".layui-layer-tabmain").children();
                c.on("mousedown",
                function(b) {
                    b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0;
                    var c = $(this),
                    e = c.index();
                    c.addClass("layui-layer-tabnow").siblings().removeClass("layui-layer-tabnow"),
                    d.eq(e).show().siblings().hide(),
                    "function" == typeof a.change && a.change(e)
                })
            }
        },
        a))
    },
    layer.photos = function(a, c, d) {
        function e(a, b, c) {
            var d = new Image;
            d.onload = function() {
                d.onload = null,
                b(d)
            },
            d.onerror = function(a) {
                d.onerror = null,
                c(a)
            },
            d.src = a
        }
        var f = {};
        if (a = a || {},
        a.photos) {
            var g = a.photos.constructor === Object,
            h = g ? a.photos: {},
            i = h.data || [],
            j = h.start || 0;
            if (f.imgIndex = j + 1, g) {
                if (0 === i.length) return layer.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")
            } else {
                var k = $(a.photos),
                l = function() {
                    return i = [],
                    k.find(a.img || "img").each(function(a) {
                        var b = $(this);
                        i.push({
                            alt: b.attr("alt"),
                            pid: b.attr("layer-pid"),
                            src: b.attr("layer-src") || b.attr("src"),
                            thumb: b.attr("src")
                        })
                    }),
                    arguments.callee
                } ();
                if (0 === i.length) return;
                if (c || k.on("click", a.img || "img",
                function() {
                    var b = $(this),
                    c = b.index();
                    l(),
                    layer.photos($.extend(a, {
                        photos: {
                            start: c,
                            data: i,
                            tab: a.tab
                        },
                        full: a.full
                    }), !0)
                }), !c) return
            }
            f.imgprev = function(a) {
                f.imgIndex--,
                f.imgIndex < 1 && (f.imgIndex = i.length),
                f.tabimg(a)
            },
            f.imgnext = function(a, b) {
                f.imgIndex++,
                f.imgIndex > i.length && (f.imgIndex = 1, b) || f.tabimg(a)
            },
            f.keyup = function(a) {
                if (!f.end) {
                    var b = a.keyCode;
                    a.preventDefault(),
                    37 === b ? f.imgprev(!0) : 39 === b ? f.imgnext(!0) : 27 === b && layer.close(f.index)
                }
            },
            f.tabimg = function(b) {
                i.length <= 1 || (h.start = f.imgIndex - 1, layer.close(f.index), layer.photos(a, !0, b))
            },
            f.event = function() {
                f.bigimg.hover(function() {
                    f.imgsee.show()
                },
                function() {
                    f.imgsee.hide()
                }),
                f.bigimg.find(".layui-layer-imgprev").on("click",
                function(a) {
                    a.preventDefault(),
                    f.imgprev()
                }),
                f.bigimg.find(".layui-layer-imgnext").on("click",
                function(a) {
                    a.preventDefault(),
                    f.imgnext()
                }),
                $(document).on("keyup", f.keyup)
            },
            f.loadi = layer.load(1, {
                shade: "shade" in a ? !1 : .9,
                scrollbar: !1
            }),
            e(i[j].src,
            function(c) {
                layer.close(f.loadi),
                f.index = layer.open($.extend({
                    type: 1,
                    area: function() {
                        var b = [c.width, c.height],
                        d = [$(window).width() - 100, $(window).height() - 100];
                        return ! a.full && b[0] > d[0] && (b[0] = d[0], b[1] = b[0] * d[1] / b[0]),
                        [b[0] + "px", b[1] + "px"]
                    } (),
                    title: !1,
                    shade: .9,
                    shadeClose: !0,
                    closeBtn: !1,
                    move: ".layui-layer-phimg img",
                    moveType: 1,
                    scrollbar: !1,
                    moveOut: !0,
                    shift: 5 * Math.random() | 0,
                    skin: "layui-layer-photos" + b("photos"),
                    content: '<div class="layui-layer-phimg"><img src="' + i[j].src + '" alt="' + (i[j].alt || "") + '" layer-pid="' + i[j].pid + '"><div class="layui-layer-imgsee">' + (i.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>': "") + '<div class="layui-layer-imgbar" style="display:' + (d ? "block": "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (i[j].alt || "") + "</a><em>" + f.imgIndex + "/" + i.length + "</em></span></div></div></div>",
                    success: function(b, c) {
                    	var arryPhoto = $('.layui-layer-photos');
                    	if(arryPhoto.length>1){
                    		for(var i = 0;i<arryPhoto.length-1;i++){
                    				$(arryPhoto[i]).prev('.layui-layer-shade').remove();
                    				$(arryPhoto[i]).remove();
                    		}
                    		
                    	}
                        f.bigimg = b.find(".layui-layer-phimg"),
                        f.imgsee = b.find(".layui-layer-imguide,.layui-layer-imgbar"),
                        f.event(b),
                        a.tab && a.tab(i[j], b)
                    },
                    end: function() {
                        f.end = !0,
                        $(document).off("keyup", f.keyup)
                    }
                },
                a))
            },
            function() {
                layer.close(f.loadi),
                layer.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
                    time: 3e4,
                    btn: ["下一张", "不看了"],
                    yes: function() {
                        i.length > 1 && f.imgnext(!0, !0)
                    }
                })
            })
        }
    }
} ();
///<jscompress sourcefile="laypage.js" />
/*! layPage-v1.3.0 分页组件 License MIT  http://laypage.layui.com/ By 贤心 */
; !
function() {
    "use strict";
    function a(d) {
        var e = "laypagecss";
        a.dir = "dir" in a ? a.dir: f.getpath + "../lib/laypage/skin/laypage.css",
        new f(d),
        a.dir && !b[c](e) && f.use(a.dir, e)
    }
    a.v = "1.3";
    var b = document,
    c = "getElementById",
    d = "getElementsByTagName",
    e = 0,
    f = function(a) {
        var b = this,
        c = b.config = a || {};
        c.item = e++,
        b.render(!0)
    };
    f.on = function(a, b, c) {
        return a.attachEvent ? a.attachEvent("on" + b,
        function() {
            c.call(a, window.even)
        }) : a.addEventListener(b, c, !1),
        f
    },
    f.getpath = function() {
        var a = document.scripts,
        b = a[a.length - 1].src;
        return b.substring(0, b.lastIndexOf("/") + 1)
    } (),
    f.use = function(c, e) {
        var f = b.createElement("link");
        f.type = "text/css",
        f.rel = "stylesheet",
        f.href = a.dir,
        e && (f.id = e),
        b[d]("head")[0].appendChild(f),
        f = null
    },
    f.prototype.type = function() {
        var a = this.config;
        return "object" == typeof a.cont ? void 0 === a.cont.length ? 2 : 3 : void 0
    },
    f.prototype.view = function() {
        var b = this,
        c = b.config,
        d = [],
        e = {};
        if (c.pages = 0 | c.pages, c.curr = 0 | c.curr || 1, c.groups = "groups" in c ? 0 | c.groups: 5, c.first = "first" in c ? c.first: "&#x9996;&#x9875;", c.last = "last" in c ? c.last: "&#x5C3E;&#x9875;", c.prev = "prev" in c ? c.prev: "&#x4E0A;&#x4E00;&#x9875;", c.next = "next" in c ? c.next: "&#x4E0B;&#x4E00;&#x9875;", c.pages <= 1) return "";
        for (c.groups > c.pages && (c.groups = c.pages), e.index = Math.ceil((c.curr + (c.groups > 1 && c.groups !== c.pages ? 1 : 0)) / (0 === c.groups ? 1 : c.groups)), c.curr > 1 && c.prev && d.push('<a href="javascript:;" class="laypage_prev" data-page="' + (c.curr - 1) + '">' + c.prev + "</a>"), e.index > 1 && c.first && 0 !== c.groups && d.push('<a href="javascript:;" class="laypage_first" data-page="1"  title="&#x9996;&#x9875;">' + c.first + "</a><span>&#x2026;</span>"), e.poor = Math.floor((c.groups - 1) / 2), e.start = e.index > 1 ? c.curr - e.poor: 1, e.end = e.index > 1 ?
        function() {
            var a = c.curr + (c.groups - e.poor - 1);
            return a > c.pages ? c.pages: a
        } () : c.groups, e.end - e.start < c.groups - 1 && (e.start = e.end - c.groups + 1); e.start <= e.end; e.start++) e.start === c.curr ? d.push('<span class="laypage_curr" ' + (/^#/.test(c.skin) ? 'style="background-color:' + c.skin + '"': "") + ">" + e.start + "</span>") : d.push('<a href="javascript:;" data-page="' + e.start + '">' + e.start + "</a>");
        return c.pages > c.groups && e.end < c.pages && c.last && 0 !== c.groups && d.push('<span>&#x2026;</span><a href="javascript:;" class="laypage_last" title="&#x5C3E;&#x9875;"  data-page="' + c.pages + '">' + c.last + "</a>"),
        e.flow = !c.prev && 0 === c.groups,
        (c.curr !== c.pages && c.next || e.flow) && d.push(function() {
            return e.flow && c.curr === c.pages ? '<span class="page_nomore" title="&#x5DF2;&#x6CA1;&#x6709;&#x66F4;&#x591A;">' + c.next + "</span>": '<a href="javascript:;" class="laypage_next" data-page="' + (c.curr + 1) + '">' + c.next + "</a>"
        } ()),
        '<div name="laypage' + a.v + '" class="laypage_main laypageskin_' + (c.skin ?
        function(a) {
            return /^#/.test(a) ? "molv": a
        } (c.skin) : "default") + '" id="laypage_' + b.config.item + '">' + d.join("") +
        function() {
            return c.skip ? '<span class="laypage_total"><label>&#x5230;&#x7B2C;</label><input type="number" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" class="laypage_skip"><label>&#x9875;</label><button type="button" class="laypage_btn">&#x786e;&#x5b9a;</button></span>': ""
        } () + "</div>"
    },
    f.prototype.jump = function(a) {
        if (a) {
            for (var b = this,
            c = b.config,
            e = a.children,
            g = a[d]("button")[0], h = a[d]("input")[0], i = 0, j = e.length; j > i; i++)"a" === e[i].nodeName.toLowerCase() && f.on(e[i], "click",
            function() {
                var a = 0 | this.getAttribute("data-page");
                c.curr = a,
                b.render()
            });
            g && f.on(g, "click",
            function() {
                var a = 0 | h.value.replace(/\s|\D/g, "");
                a && a <= c.pages && (c.curr = a, b.render())
            })
        }
    },
    f.prototype.render = function(a) {
        var d = this,
        e = d.config,
        f = d.type(),
        g = d.view();
        2 === f ? e.cont.innerHTML = g: 3 === f ? e.cont.html(g) : b[c](e.cont).innerHTML = g,
        e.jump && e.jump(e, a),
        d.jump(b[c]("laypage_" + e.item)),
        e.hash && !a && (location.hash = "!" + e.hash + "=" + e.curr)
    },
    "function" == typeof define ? define(function() {
        return a
    }) : "undefined" != typeof exports ? module.exports = a: window.laypage = a
} ();
///<jscompress sourcefile="WdatePicker.js" />
var $dp, WdatePicker;
(function () {
    var d = {
        $langList: [{
            name: "en",
            charset: "UTF-8"
        },
            {
                name: "zh-cn",
                charset: "gb2312"
            },
            {
                name: "zh-tw",
                charset: "GBK"
            }],
        $skinList: [{
            name: "default",
            charset: "gb2312"
        },
            {
                name: "whyGreen",
                charset: "gb2312"
            },
            {
                name: "blue",
                charset: "gb2312"
            },
            {
                name: "green",
                charset: "gb2312"
            },
            {
                name: "simple",
                charset: "gb2312"
            },
            {
                name: "ext",
                charset: "gb2312"
            },
            {
                name: "blueFresh",
                charset: "gb2312"
            },
            {
                name: "twoer",
                charset: "gb2312"
            },
            {
                name: "YcloudRed",
                charset: "gb2312"
            }],
        $wdate: true,
        $crossFrame: true,
        $preLoad: false,
        $dpPath: "../lib/My97DatePicker/",
        doubleCalendar: false,
        enableKeyboard: true,
        enableInputMask: true,
        autoUpdateOnChanged: null,
        weekMethod: "ISO8601",
        position: {},
        lang: "auto",
        skin: "default",
        dateFmt: "yyyy-MM-dd",
        realDateFmt: "yyyy-MM-dd",
        realTimeFmt: "HH:mm:ss",
        realFullFmt: "%Date %Time",
        minDate: "1900-01-01 00:00:00",
        maxDate: "2099-12-31 23:59:59",
        startDate: "",
        alwaysUseStartDate: false,
        yearOffset: 1911,
        firstDayOfWeek: 0,
        isShowWeek: false,
        highLineWeekDay: true,
        isShowClear: true,
        isShowToday: true,
        isShowOK: true,
        isShowOthers: true,
        readOnly: false,
        errDealMode: 0,
        autoPickDate: null,
        qsEnabled: true,
        autoShowQS: false,
        opposite: false,
        hmsMenuCfg: {
            H: [1, 6],
            m: [5, 6],
            s: [15, 4]
        },
        opposite: false,
        specialDates: null,
        specialDays: null,
        disabledDates: null,
        disabledDays: null,
        onpicking: null,
        onpicked: null,
        onclearing: null,
        oncleared: null,
        ychanging: null,
        ychanged: null,
        Mchanging: null,
        Mchanged: null,
        dchanging: null,
        dchanged: null,
        Hchanging: null,
        Hchanged: null,
        mchanging: null,
        mchanged: null,
        schanging: null,
        schanged: null,
        eCont: null,
        vel: null,
        elProp: "",
        errMsg: "",
        quickSel: [],
        has: {},
        getRealLang: function () {
            var a = d.$langList;
            for (var b = 0; b < a.length; b++) {
                if (a[b].name == this.lang) {
                    return a[b]
                }
            }
            return a[0]
        }
    };
    WdatePicker = ac;
    var ag = window,
        ab = {
            innerHTML: ""
        },
        v = "document",
        p = "documentElement",
        k = "getElementsByTagName",
        ad, g, aa, o, j, af = navigator.appName;
    if (af == "Microsoft Internet Explorer") {
        aa = true
    } else {
        if (af == "Opera") {
            j = true
        } else {
            o = true
        }
    }
    g = d.$dpPath || r();
    if (d.$wdate) {
        //s(g + "../lib/My97DatePicker/skin/WdatePicker.css")
    }
    ad = ag;
    if (d.$crossFrame) {
        try {
            while (ad.parent != ad && ad.parent[v][k]("frameset").length == 0) {
                ad = ad.parent
            }
        } catch (w) {}
    }
    if (!ad.$dp) {
        ad.$dp = {
            ff: o,
            ie: aa,
            opera: j,
            status: 0,
            defMinDate: d.minDate,
            defMaxDate: d.maxDate
        }
    }
    i();
    if (d.$preLoad && $dp.status == 0) {
        m(ag, "onload", function () {
            ac(null, true)
        })
    }
    if (!ag[v].docMD) {
        m(ag[v], "onmousedown", l, true);
        ag[v].docMD = true
    }
    if (!ad[v].docMD) {
        m(ad[v], "onmousedown", l, true);
        ad[v].docMD = true
    }
    m(ag, "onunload", function () {
        if ($dp.dd) {
            x($dp.dd, "none")
        }
    });

    function i() {
        try {
            ad[v],
                ad.$dp = ad.$dp || {}
        } catch (a) {
            ad = ag;
            $dp = $dp || {}
        }
        var c = {
            win: ag,
            $: function (A) {
                return (typeof A == "string") ? ag[v].getElementById(A) : A
            },
            $D: function (A, B) {
                return this.$DV(this.$(A).value, B)
            },
            $DV: function (E, D) {
                if (E != "") {
                    this.dt = $dp.cal.splitDate(E, $dp.cal.dateFmt);
                    if (D) {
                        for (var G in D) {
                            if (this.dt[G] === undefined) {
                                this.errMsg = "invalid property:" + G
                            } else {
                                this.dt[G] += D[G];
                                if (G == "M") {
                                    var H = D.M > 0 ? 1 : 0,
                                        F = new Date(this.dt.y, this.dt.M, 0).getDate();
                                    this.dt.d = Math.min(F + H, this.dt.d)
                                }
                            }
                        }
                    }
                    if (this.dt.refresh()) {
                        return this.dt
                    }
                }
                return ""
            },
            show: function () {
                var E = ad[v].getElementsByTagName("div"),
                    C = 100000;
                for (var F = 0; F < E.length; F++) {
                    var D = parseInt(E[F].style.zIndex);
                    if (D > C) {
                        C = D
                    }
                }
                this.dd.style.zIndex = C + 2;
                x(this.dd, "block");
                x(this.dd.firstChild, "")
            },
            unbind: function (A) {
                A = this.$(A);
                if (A.initcfg) {
                    t(A, "onclick", function () {
                        ac(A.initcfg)
                    });
                    t(A, "onfocus", function () {
                        ac(A.initcfg)
                    })
                }
            },
            hide: function () {
                x(this.dd, "none")
            },
            attachEvent: m
        };
        for (var b in c) {
            ad.$dp[b] = c[b]
        }
        $dp = ad.$dp
    }
    function m(D, b, c, a) {
        if (D.addEventListener) {
            var E = b.replace(/on/, "");
            c._ieEmuEventHandler = function (A) {
                return c(A)
            };
            D.addEventListener(E, c._ieEmuEventHandler, a)
        } else {
            D.attachEvent(b, c)
        }
    }
    function t(c, a, b) {
        if (c.removeEventListener) {
            var C = a.replace(/on/, "");
            b._ieEmuEventHandler = function (A) {
                return b(A)
            };
            c.removeEventListener(C, b._ieEmuEventHandler, false)
        } else {
            c.detachEvent(a, b)
        }
    }
    function f(b, a, c) {
        if (typeof b != typeof a) {
            return false
        }
        if (typeof b == "object") {
            if (!c) {
                for (var C in b) {
                    if (typeof a[C] == "undefined") {
                        return false
                    }
                    if (!f(b[C], a[C], true)) {
                        return false
                    }
                }
            }
            return true
        } else {
            if (typeof b == "function" && typeof a == "function") {
                return b.toString() == a.toString()
            } else {
                return b == a
            }
        }
    }
    function r() {
        var b, c, a = ag[v][k]("script");
        for (var C = 0; C < a.length; C++) {
            b = a[C].getAttribute("src") || "";
            b = b.substr(0, b.toLowerCase().indexOf("wdatepicker.js"));
            c = b.lastIndexOf("/");
            if (c > 0) {
                b = b.substring(0, c + 1)
            }
            if (b) {
                break
            }
        }
        return b
    }
    function s(c, a, C) {
        var E = ag[v][k]("HEAD").item(0),
            b = ag[v].createElement("link");
        if (E) {
            b.href = c;
            b.rel = "stylesheet";
            b.type = "text/css";
            if (a) {
                b.title = a
            }
            if (C) {
                b.charset = C
            }
            E.appendChild(b)
        }
    }
    function n(a) {
        a = a || ad;
        var c = 0,
            b = 0;
        while (a != ad) {
            var G = a.parent[v][k]("iframe");
            for (var I = 0; I < G.length; I++) {
                try {
                    if (G[I].contentWindow == a) {
                        var H = ae(G[I]);
                        c += H.left;
                        b += H.top;
                        break
                    }
                } catch (C) {}
            }
            a = a.parent
        }
        return {
            leftM: c,
            topM: b
        }
    }
    function ae(O, N) {
        if (O.getBoundingClientRect) {
            return O.getBoundingClientRect()
        } else {
            var c = {
                    ROOT_TAG: /^body|html$/i,
                    OP_SCROLL: /^(?:inline|table-row)$/i
                },
                M = false,
                Q = null,
                b = O.offsetTop,
                P = O.offsetLeft,
                L = O.offsetWidth,
                J = O.offsetHeight,
                K = O.offsetParent;
            if (K != O) {
                while (K) {
                    P += K.offsetLeft;
                    b += K.offsetTop;
                    if (z(K, "position").toLowerCase() == "fixed") {
                        M = true
                    } else {
                        if (K.tagName.toLowerCase() == "body") {
                            Q = K.ownerDocument.defaultView
                        }
                    }
                    K = K.offsetParent
                }
            }
            K = O.parentNode;
            while (K.tagName && !c.ROOT_TAG.test(K.tagName)) {
                if (K.scrollTop || K.scrollLeft) {
                    if (!c.OP_SCROLL.test(x(K))) {
                        if (!j || K.style.overflow !== "visible") {
                            P -= K.scrollLeft;
                            b -= K.scrollTop
                        }
                    }
                }
                K = K.parentNode
            }
            if (!M) {
                var a = h(Q);
                P -= a.left;
                b -= a.top
            }
            L += P;
            J += b;
            return {
                left: P,
                top: b,
                right: L,
                bottom: J
            }
        }
    }
    function u(a) {
        a = a || ad;
        var C = a[v],
            c = (a.innerWidth) ? a.innerWidth : (C[p] && C[p].clientWidth) ? C[p].clientWidth : C.body.offsetWidth,
            b = (a.innerHeight) ? a.innerHeight : (C[p] && C[p].clientHeight) ? C[p].clientHeight : C.body.offsetHeight;
        return {
            width: c,
            height: b
        }
    }
    function h(a) {
        a = a || ad;
        var C = a[v],
            c = C[p],
            b = C.body;
        C = (c && c.scrollTop != null && (c.scrollTop > b.scrollTop || c.scrollLeft > b.scrollLeft)) ? c : b;
        return {
            top: C.scrollTop,
            left: C.scrollLeft
        }
    }
    function l(a) {
        try {
            var b = a ? (a.srcElement || a.target) : null;
            if ($dp.cal && !$dp.eCont && $dp.dd && b != $dp.el && $dp.dd.style.display == "block") {
                $dp.cal.close()
            }
        } catch (a) {}
    }
    function ah() {
        $dp.status = 2
    }
    var y, e;

    function ac(I, b) {
        if (!$dp) {
            return
        }
        i();
        var M = {};
        for (var E in I) {
            M[E] = I[E]
        }
        for (E in d) {
            if (E.substring(0, 1) != "$" && M[E] === undefined) {
                M[E] = d[E]
            }
        }
        if (b) {
            if (!G()) {
                e = e || setInterval(function () {
                        if (ad[v].readyState == "complete") {
                            clearInterval(e)
                        }
                        ac(null, true)
                    }, 50);
                return
            }
            if ($dp.status == 0) {
                $dp.status = 1;
                M.el = ab;
                q(M, true)
            } else {
                return
            }
        } else {
            if (M.eCont) {
                M.eCont = $dp.$(M.eCont);
                M.el = ab;
                M.autoPickDate = true;
                M.qsEnabled = false;
                q(M)
            } else {
                if (d.$preLoad && $dp.status != 2) {
                    return
                }
                var B = c();
                if (ag.event === B || B) {
                    M.srcEl = B.srcElement || B.target;
                    B.cancelBubble = true
                }
                M.el = M.el = $dp.$(M.el || M.srcEl);
                if (!M.el || M.el.My97Mark === true || M.el.disabled || ($dp.dd && x($dp.dd) != "none" && $dp.dd.style.left != "-970px")) {
                    try {
                        if (M.el.My97Mark) {
                            M.el.My97Mark = false
                        }
                    } catch (a) {}
                    return
                }
                if (B && M.el.nodeType == 1 && !f(M.el.initcfg, I)) {
                    $dp.unbind(M.el);
                    m(M.el, B.type == "focus" ? "onclick" : "onfocus", function () {
                        ac(I)
                    });
                    M.el.initcfg = I
                }
                q(M)
            }
        }
        function G() {
            if (aa && ad != ag && ad[v].readyState != "complete") {
                return false
            }
            return true
        }
        function c() {
            if (o) {
                func = c.caller;
                while (func != null) {
                    var A = func.arguments[0];
                    if (A && (A + "").indexOf("Event") >= 0) {
                        return A
                    }
                    func = func.caller
                }
                return null
            }
            return event
        }
    }
    function z(b, a) {
        return b.currentStyle ? b.currentStyle[a] : document.defaultView.getComputedStyle(b, false)[a]
    }
    function x(b, a) {
        if (b) {
            if (a != null) {
                b.style.display = a
            } else {
                return z(b, "display")
            }
        }
    }
    function q(H, a) {
        var A = H.el ? H.el.nodeName : "INPUT";
        if (a || H.eCont || new RegExp(/input|textarea|div|span|p|a/ig).test(A)) {
            H.elProp = A == "INPUT" ? "value" : "innerHTML"
        } else {
            return
        }
        if (H.lang == "auto") {
            H.lang = aa ? navigator.browserLanguage.toLowerCase() : navigator.language.toLowerCase()
        }
        if (!H.eCont) {
            for (var c in H) {
                $dp[c] = H[c]
            }
        }
        if (!$dp.dd || H.eCont || ($dp.dd && (H.getRealLang().name != $dp.dd.lang || H.skin != $dp.dd.skin))) {
            if (H.eCont) {
                F(H.eCont, H)
            } else {
                $dp.dd = ad[v].createElement("DIV");
                $dp.dd.style.cssText = "position:absolute";
                ad[v].body.appendChild($dp.dd);
                F($dp.dd, H);
                if (a) {
                    $dp.dd.style.left = $dp.dd.style.top = "-970px"
                } else {
                    $dp.show();
                    b($dp)
                }
            }
        } else {
            if ($dp.cal) {
                $dp.show();
                $dp.cal.init();
                if (!$dp.eCont) {
                    b($dp)
                }
            }
        }
        function F(U, T) {
            var S = ad[v].domain,
                P = false,
                Q = '<iframe hideFocus=true width=9 height=7 frameborder=0 border=0 scrolling=no src="about:blank"></iframe>';
            U.innerHTML = Q;
            var B = d.$langList,
                N = d.$skinList,
                R;
            try {
                R = U.lastChild.contentWindow[v]
            } catch (O) {
                P = true;
                U.removeChild(U.lastChild);
                var V = ad[v].createElement("iframe");
                V.hideFocus = true;
                V.frameBorder = 0;
                V.scrolling = "no";
                V.src = "javascript:(function(){var d=document;d.open();d.domain='" + S + "';})()";
                U.appendChild(V);
                setTimeout(function () {
                    R = U.lastChild.contentWindow[v];
                    M()
                }, 97);
                return
            }
            M();

            function M() {
                var E = T.getRealLang();
                U.lang = E.name;
                U.skin = T.skin;
                var D = ["<head><script>", "", "var doc=document, $d, $dp, $cfg=doc.cfg, $pdp = parent.$dp, $dt, $tdt, $sdt, $lastInput, $IE=$pdp.ie, $FF = $pdp.ff,$OPERA=$pdp.opera, $ny, $cMark = false;", "if($cfg.eCont){$dp = {};for(var p in $pdp)$dp[p]=$pdp[p];}else{$dp=$pdp;};for(var p in $cfg){$dp[p]=$cfg[p];}", "doc.oncontextmenu=function(){try{$c._fillQS(!$dp.has.d,1);showB($d.qsDivSel);}catch(e){};return false;};", "</script><script src=", g, "lang/", E.name, ".js charset=", E.charset, "></script>"];
                if (P) {
                    D[1] = 'document.domain="' + S + '";'
                }
                for (var G = 0; G < N.length; G++) {
                    if (N[G].name == T.skin) {
                        D.push('<link rel="stylesheet" type="text/css" href="' + g + "skin/" + N[G].name + '/datepicker.css" charset="' + N[G].charset + '"/>')
                    }
                }
                D.push('<script src="' + g + 'calendar.js"></script>');
                D.push('</head><body leftmargin="0" topmargin="0" tabindex=0></body></html>');
                D.push("<script>var t;t=t||setInterval(function(){if(doc.ready){new My97DP();$cfg.onload();$c.autoSize();$cfg.setPos($dp);clearInterval(t);}},20);</script>");
                T.setPos = b;
                T.onload = ah;
                R.write("<html>");
                R.cfg = T;
                R.write(D.join(""));
                R.close()
            }
        }
        function b(U) {
            var S = U.position.left,
                O = U.position.top,
                P = U.el;
            if (P == ab) {
                return
            }
            if (P != U.srcEl && (x(P) == "none" || P.type == "hidden")) {
                P = U.srcEl
            }
            var T = ae(P),
                K = n(ag),
                Q = u(ad),
                N = h(ad),
                R = $dp.dd.offsetHeight,
                M = $dp.dd.offsetWidth;
            if (isNaN(O)) {
                O = 0
            }
            if ((K.topM + T.bottom + R > Q.height) && (K.topM + T.top - R > 0)) {
                O += N.top + K.topM + T.top - R - 2
            } else {
                O += N.top + K.topM + T.bottom;
                var L = O - N.top + R - Q.height;
                if (L > 0) {
                    O -= L
                }
            }
            if (isNaN(S)) {
                S = 0
            }
            S += N.left + Math.min(K.leftM + T.left, Q.width - M - 5) - (aa ? 2 : 0);
            U.dd.style.top = O + "px";
            U.dd.style.left = S + "px"
        }
    }
})();
///<jscompress sourcefile="jquery.alert.js" />
// jQuery Alert Dialogs Plugin
//
// Version 1.0
// Download by http://keleyi.com
// 由 柯乐义 改进改插件，使插件适用于新版的jquery（比如1.10.1） 版本
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 29 December 2008
//
// Visit http://keleyi.com/a/bjac/no0m3cb1.htm for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
// 
// History:
//
//		1.00 - Released (29 December 2008)
//
// License:
// 
//		This plugin is licensed under the GNU General Public License
//
(function($) {
	
	$.alerts = {
		
		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
		
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .01,                // transparency level of overlay
		overlayColor: '#FFF',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;确定&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;取消&nbsp;', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs
		
		// Public methods
		
		alert: function(message, title, callback) {
			if( title == null ) title = 'Alert';
			$.alerts._show(title, message, null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},
		
		confirm: function(message, title, callback) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},
			
		prompt: function(message, value, title, callback) {
			if( title == null ) title = 'Prompt';
			$.alerts._show(title, message, value, 'prompt', function(result) {
				if( callback ) callback(result);
			});
		},
		
		// Private methods
		
		_show: function(title, msg, value, type, callback) {
			
			$.alerts._hide();
			$.alerts._overlay('show');
			
			$("BODY").append(
			  '<div id="popup_container">' +
			    '<h1 id="popup_title"></h1>' +
			    '<div id="popup_content">' +
				  '<i class="pop"></i>'+
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			
			// IE6 Fix
			//var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			var pos = ('undefined' == typeof (document.body.style.maxHeight)) ? 'absolute' : 'fixed';

			$("#popup_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			$("#popup_title").text(title);
			$("#popup_content pop").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			
			$("#popup_container").css({
				minWidth: $("#popup_container").outerWidth(),
				maxWidth: $("#popup_container").outerWidth()
			});
			
			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
				case 'alert':
					$("#popup_message").after('<div id="popup_panel"><input type="button" class="btn btn-primary radius" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel"><input type="button" class="btn btn-primary radius" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" class="btn btn-default radius" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						//if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" class="btn btn-primary radius" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" class="btn btn-default radius" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;
			}
			
			// Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},
		
		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},
		
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if ('undefined' == typeof (document.body.style.maxHeight)) top = top + $(window).scrollTop();
			
			$("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#popup_overlay").height( $(document).height() );
		},
		
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', function() {
							$.alerts._reposition();
						});
					break;
					case false:
						$(window).unbind('resize');
					break;
				}
			}
		}
		
	}
	
	// Shortuct functions
	jAlert = function(message, title, callback) {
		$.alerts.alert(message, title, callback);
	}
	
	jConfirm = function(message, title, callback) {
		$.alerts.confirm(message, title, callback);
	};
		
	jPrompt = function(message, value, title, callback) {
		$.alerts.prompt(message, value, title, callback);
	};
	
})(jQuery);
///<jscompress sourcefile="jquery.form.js" />
/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
/*global ActiveXObject */

// AMD support
(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // using AMD; register as anon module
        define(['jquery'], factory);
    } else {
        // no AMD; invoke directly
        factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
    }
}

(function($) {
"use strict";

/*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are mutually exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').on('submit', function(e) {
            e.preventDefault(); // <-- important
            $(this).ajaxSubmit({
                target: '#output'
            });
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });

    You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
    form does not have to exist when you invoke ajaxForm:

    $('#myForm').ajaxForm({
        delegation: true,
        target: '#output'
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
*/

/**
 * Feature detection
 */
var feature = {};
feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
feature.formdata = window.FormData !== undefined;

var hasProp = !!$.fn.prop;

// attr2 uses prop when it can but checks the return type for
// an expected string.  this accounts for the case where a form 
// contains inputs with names like "action" or "method"; in those
// cases "prop" returns the element
$.fn.attr2 = function() {
    if ( ! hasProp ) {
        return this.attr.apply(this, arguments);
    }
    var val = this.prop.apply(this, arguments);
    if ( ( val && val.jquery ) || typeof val === 'string' ) {
        return val;
    }
    return this.attr.apply(this, arguments);
};

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
    /*jshint scripturl:true */

    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }

    var method, action, url, $form = this;

    if (typeof options == 'function') {
        options = { success: options };
    }
    else if ( options === undefined ) {
        options = {};
    }

    method = options.type || this.attr2('method');
    action = options.url  || this.attr2('action');

    url = (typeof action === 'string') ? $.trim(action) : '';
    url = url || window.location.href || '';
    if (url) {
        // clean url (don't include hash vaue)
        url = (url.match(/^([^#]+)/)||[])[1];
    }

    options = $.extend(true, {
        url:  url,
        success: $.ajaxSettings.success,
        type: method || $.ajaxSettings.type,
        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
    }, options);

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSerialize callback');
        return this;
    }

    var traditional = options.traditional;
    if ( traditional === undefined ) {
        traditional = $.ajaxSettings.traditional;
    }

    var elements = [];
    var qx, a = this.formToArray(options.semantic, elements);
    if (options.data) {
        options.extraData = options.data;
        qx = $.param(options.data, traditional);
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }

    var q = $.param(a, traditional);
    if (qx) {
        q = ( q ? (q + '&' + qx) : qx );
    }
    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else {
        options.data = q; // data is the query string for 'post'
    }

    var callbacks = [];
    if (options.resetForm) {
        callbacks.push(function() { $form.resetForm(); });
    }
    if (options.clearForm) {
        callbacks.push(function() { $form.clearForm(options.includeHidden); });
    }

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            var fn = options.replaceTarget ? 'replaceWith' : 'html';
            $(options.target)[fn](data).each(oldSuccess, arguments);
        });
    }
    else if (options.success) {
        callbacks.push(options.success);
    }

    options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
        var context = options.context || this ;    // jQuery 1.4+ supports scope context
        for (var i=0, max=callbacks.length; i < max; i++) {
            callbacks[i].apply(context, [data, status, xhr || $form, $form]);
        }
    };

    if (options.error) {
        var oldError = options.error;
        options.error = function(xhr, status, error) {
            var context = options.context || this;
            oldError.apply(context, [xhr, status, error, $form]);
        };
    }

     if (options.complete) {
        var oldComplete = options.complete;
        options.complete = function(xhr, status) {
            var context = options.context || this;
            oldComplete.apply(context, [xhr, status, $form]);
        };
    }

    // are there files to upload?

    // [value] (issue #113), also see comment:
    // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
    var fileInputs = $('input[type=file]:enabled', this).filter(function() { return $(this).val() !== ''; });

    var hasFileInputs = fileInputs.length > 0;
    var mp = 'multipart/form-data';
    var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

    var fileAPI = feature.fileapi && feature.formdata;
    log("fileAPI :" + fileAPI);
    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

    var jqxhr;

    // options.iframe allows user to force iframe mode
    // 06-NOV-09: now defaulting to iframe mode if file input is detected
    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
        // hack to fix Safari hang (thanks to Tim Molendijk for this)
        // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
        if (options.closeKeepAlive) {
            $.get(options.closeKeepAlive, function() {
                jqxhr = fileUploadIframe(a);
            });
        }
        else {
            jqxhr = fileUploadIframe(a);
        }
    }
    else if ((hasFileInputs || multipart) && fileAPI) {
        jqxhr = fileUploadXhr(a);
    }
    else {
        jqxhr = $.ajax(options);
    }

    $form.removeData('jqxhr').data('jqxhr', jqxhr);

    // clear element array
    for (var k=0; k < elements.length; k++) {
        elements[k] = null;
    }

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;

    // utility fn for deep serialization
    function deepSerialize(extraData){
        var serialized = $.param(extraData, options.traditional).split('&');
        var len = serialized.length;
        var result = [];
        var i, part;
        for (i=0; i < len; i++) {
            // #252; undo param space replacement
            serialized[i] = serialized[i].replace(/\+/g,' ');
            part = serialized[i].split('=');
            // #278; use array instead of object storage, favoring array serializations
            result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
        }
        return result;
    }

     // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
    function fileUploadXhr(a) {
        var formdata = new FormData();

        for (var i=0; i < a.length; i++) {
            formdata.append(a[i].name, a[i].value);
        }

        if (options.extraData) {
            var serializedData = deepSerialize(options.extraData);
            for (i=0; i < serializedData.length; i++) {
                if (serializedData[i]) {
                    formdata.append(serializedData[i][0], serializedData[i][1]);
                }
            }
        }

        options.data = null;

        var s = $.extend(true, {}, $.ajaxSettings, options, {
            contentType: false,
            processData: false,
            cache: false,
            type: method || 'POST'
        });

        if (options.uploadProgress) {
            // workaround because jqXHR does not expose upload property
            s.xhr = function() {
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position; /*event.position is deprecated*/
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        options.uploadProgress(event, position, total, percent);
                    }, false);
                }
                return xhr;
            };
        }

        s.data = null;
        var beforeSend = s.beforeSend;
        s.beforeSend = function(xhr, o) {
            //Send FormData() provided by user
            if (options.formData) {
                o.data = options.formData;
            }
            else {
                o.data = formdata;
            }
            if(beforeSend) {
                beforeSend.call(this, xhr, o);
            }
        };
        return $.ajax(s);
    }

    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUploadIframe(a) {
        var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
        var deferred = $.Deferred();

        // #341
        deferred.abort = function(status) {
            xhr.abort(status);
        };

        if (a) {
            // ensure that every serialized input is still enabled
            for (i=0; i < elements.length; i++) {
                el = $(elements[i]);
                if ( hasProp ) {
                    el.prop('disabled', false);
                }
                else {
                    el.removeAttr('disabled');
                }
            }
        }

        s = $.extend(true, {}, $.ajaxSettings, options);
        s.context = s.context || s;
        id = 'jqFormIO' + (new Date().getTime());
        if (s.iframeTarget) {
            $io = $(s.iframeTarget);
            n = $io.attr2('name');
            if (!n) {
                $io.attr2('name', id);
            }
            else {
                id = n;
            }
        }
        else {
            $io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
            $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
        }
        io = $io[0];


        xhr = { // mock object
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {},
            abort: function(status) {
                var e = (status === 'timeout' ? 'timeout' : 'aborted');
                log('aborting upload... ' + e);
                this.aborted = 1;

                try { // #214, #257
                    if (io.contentWindow.document.execCommand) {
                        io.contentWindow.document.execCommand('Stop');
                    }
                }
                catch(ignore) {}

                $io.attr('src', s.iframeSrc); // abort op in progress
                xhr.error = e;
                if (s.error) {
                    s.error.call(s.context, xhr, e, status);
                }
                if (g) {
                    $.event.trigger("ajaxError", [xhr, s, e]);
                }
                if (s.complete) {
                    s.complete.call(s.context, xhr, e);
                }
            }
        };

        g = s.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && 0 === $.active++) {
            $.event.trigger("ajaxStart");
        }
        if (g) {
            $.event.trigger("ajaxSend", [xhr, s]);
        }

        if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
            if (s.global) {
                $.active--;
            }
            deferred.reject();
            return deferred;
        }
        if (xhr.aborted) {
            deferred.reject();
            return deferred;
        }

        // add submitting element to data if we know it
        sub = form.clk;
        if (sub) {
            n = sub.name;
            if (n && !sub.disabled) {
                s.extraData = s.extraData || {};
                s.extraData[n] = sub.value;
                if (sub.type == "image") {
                    s.extraData[n+'.x'] = form.clk_x;
                    s.extraData[n+'.y'] = form.clk_y;
                }
            }
        }

        var CLIENT_TIMEOUT_ABORT = 1;
        var SERVER_ABORT = 2;
                
        function getDoc(frame) {
            /* it looks like contentWindow or contentDocument do not
             * carry the protocol property in ie8, when running under ssl
             * frame.document is the only valid response document, since
             * the protocol is know but not on the other two objects. strange?
             * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
             */
            
            var doc = null;
            
            // IE8 cascading access check
            try {
                if (frame.contentWindow) {
                    doc = frame.contentWindow.document;
                }
            } catch(err) {
                // IE8 access denied under ssl & missing protocol
                log('cannot get iframe.contentWindow document: ' + err);
            }

            if (doc) { // successful getting content
                return doc;
            }

            try { // simply checking may throw in ie8 under ssl or mismatched protocol
                doc = frame.contentDocument ? frame.contentDocument : frame.document;
            } catch(err) {
                // last attempt
                log('cannot get iframe.contentDocument: ' + err);
                doc = frame.document;
            }
            return doc;
        }

        // Rails CSRF hack (thanks to Yvan Barthelemy)
        var csrf_token = $('meta[name=csrf-token]').attr('content');
        var csrf_param = $('meta[name=csrf-param]').attr('content');
        if (csrf_param && csrf_token) {
            s.extraData = s.extraData || {};
            s.extraData[csrf_param] = csrf_token;
        }

        // take a breath so that pending repaints get some cpu time before the upload starts
        function doSubmit() {
            // make sure form attrs are set
            var t = $form.attr2('target'), 
                a = $form.attr2('action'), 
                mp = 'multipart/form-data',
                et = $form.attr('enctype') || $form.attr('encoding') || mp;

            // update form attrs in IE friendly way
            form.setAttribute('target',id);
            if (!method || /post/i.test(method) ) {
                form.setAttribute('method', 'POST');
            }
            if (a != s.url) {
                form.setAttribute('action', s.url);
            }

            // ie borks in some cases when setting encoding
            if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
                $form.attr({
                    encoding: 'multipart/form-data',
                    enctype:  'multipart/form-data'
                });
            }

            // support timout
            if (s.timeout) {
                timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
            }

            // look for server aborts
            function checkState() {
                try {
                    var state = getDoc(io).readyState;
                    log('state = ' + state);
                    if (state && state.toLowerCase() == 'uninitialized') {
                        setTimeout(checkState,50);
                    }
                }
                catch(e) {
                    log('Server abort: ' , e, ' (', e.name, ')');
                    cb(SERVER_ABORT);
                    if (timeoutHandle) {
                        clearTimeout(timeoutHandle);
                    }
                    timeoutHandle = undefined;
                }
            }

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (s.extraData) {
                    for (var n in s.extraData) {
                        if (s.extraData.hasOwnProperty(n)) {
                           // if using the $.param format that allows for multiple values with the same name
                           if($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                               extraInputs.push(
                               $('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value)
                                   .appendTo(form)[0]);
                           } else {
                               extraInputs.push(
                               $('<input type="hidden" name="'+n+'">').val(s.extraData[n])
                                   .appendTo(form)[0]);
                           }
                        }
                    }
                }

                if (!s.iframeTarget) {
                    // add iframe to doc and submit the form
                    $io.appendTo('body');
                }
                if (io.attachEvent) {
                    io.attachEvent('onload', cb);
                }
                else {
                    io.addEventListener('load', cb, false);
                }
                setTimeout(checkState,15);

                try {
                    form.submit();
                } catch(err) {
                    // just in case form has element with name/id of 'submit'
                    var submitFn = document.createElement('form').submit;
                    submitFn.apply(form);
                }
            }
            finally {
                // reset attrs and remove "extra" input elements
                form.setAttribute('action',a);
                form.setAttribute('enctype', et); // #380
                if(t) {
                    form.setAttribute('target', t);
                } else {
                    $form.removeAttr('target');
                }
                $(extraInputs).remove();
            }
        }

        if (s.forceSync) {
            doSubmit();
        }
        else {
            setTimeout(doSubmit, 10); // this lets dom updates render
        }

        var data, doc, domCheckCount = 50, callbackProcessed;

        function cb(e) {
            if (xhr.aborted || callbackProcessed) {
                return;
            }
            
            doc = getDoc(io);
            if(!doc) {
                log('cannot access response document');
                e = SERVER_ABORT;
            }
            if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                xhr.abort('timeout');
                deferred.reject(xhr, 'timeout');
                return;
            }
            else if (e == SERVER_ABORT && xhr) {
                xhr.abort('server abort');
                deferred.reject(xhr, 'error', 'server abort');
                return;
            }

            if (!doc || doc.location.href == s.iframeSrc) {
                // response not received yet
                if (!timedOut) {
                    return;
                }
            }
            if (io.detachEvent) {
                io.detachEvent('onload', cb);
            }
            else {
                io.removeEventListener('load', cb, false);
            }

            var status = 'success', errMsg;
            try {
                if (timedOut) {
                    throw 'timeout';
                }

                var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                log('isXml='+isXml);
                if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
                    if (--domCheckCount) {
                        // in some browsers (Opera) the iframe DOM is not always traversable when
                        // the onload callback fires, so we loop a bit to accommodate
                        log('requeing onLoad callback, DOM not available');
                        setTimeout(cb, 250);
                        return;
                    }
                    // let this fall through because server response could be an empty document
                    //log('Could not access iframe DOM after mutiple tries.');
                    //throw 'DOMException: not available';
                }

                //log('response detected');
                var docRoot = doc.body ? doc.body : doc.documentElement;
                xhr.responseText = docRoot ? docRoot.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                if (isXml) {
                    s.dataType = 'xml';
                }
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': s.dataType};
                    return headers[header.toLowerCase()];
                };
                // support for XHR 'status' & 'statusText' emulation :
                if (docRoot) {
                    xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
                    xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                }

                var dt = (s.dataType || '').toLowerCase();
                var scr = /(json|script|text)/.test(dt);
                if (scr || s.textarea) {
                    // see if user embedded response in textarea
                    var ta = doc.getElementsByTagName('textarea')[0];
                    if (ta) {
                        xhr.responseText = ta.value;
                        // support for XHR 'status' & 'statusText' emulation :
                        xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
                        xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                    }
                    else if (scr) {
                        // account for browsers injecting pre around json response
                        var pre = doc.getElementsByTagName('pre')[0];
                        var b = doc.getElementsByTagName('body')[0];
                        if (pre) {
                            xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                        }
                        else if (b) {
                            xhr.responseText = b.textContent ? b.textContent : b.innerText;
                        }
                    }
                }
                else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
                    xhr.responseXML = toXml(xhr.responseText);
                }

                try {
                    data = httpData(xhr, dt, s);
                }
                catch (err) {
                    status = 'parsererror';
                    xhr.error = errMsg = (err || status);
                }
            }
            catch (err) {
                log('error caught: ',err);
                status = 'error';
                xhr.error = errMsg = (err || status);
            }

            if (xhr.aborted) {
                log('upload aborted');
                status = null;
            }

            if (xhr.status) { // we've set xhr.status
                status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (status === 'success') {
                if (s.success) {
                    s.success.call(s.context, data, 'success', xhr);
                }
                deferred.resolve(xhr.responseText, 'success', xhr);
                if (g) {
                    $.event.trigger("ajaxSuccess", [xhr, s]);
                }
            }
            else if (status) {
                if (errMsg === undefined) {
                    errMsg = xhr.statusText;
                }
                if (s.error) {
                    s.error.call(s.context, xhr, status, errMsg);
                }
                deferred.reject(xhr, 'error', errMsg);
                if (g) {
                    $.event.trigger("ajaxError", [xhr, s, errMsg]);
                }
            }

            if (g) {
                $.event.trigger("ajaxComplete", [xhr, s]);
            }

            if (g && ! --$.active) {
                $.event.trigger("ajaxStop");
            }

            if (s.complete) {
                s.complete.call(s.context, xhr, status);
            }

            callbackProcessed = true;
            if (s.timeout) {
                clearTimeout(timeoutHandle);
            }

            // clean up
            setTimeout(function() {
                if (!s.iframeTarget) {
                    $io.remove();
                }
                else { //adding else to clean up existing iframe response.
                    $io.attr('src', s.iframeSrc);
                }
                xhr.responseXML = null;
            }, 100);
        }

        var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else {
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            }
            return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
        };
        var parseJSON = $.parseJSON || function(s) {
            /*jslint evil:true */
            return window['eval']('(' + s + ')');
        };

        var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

            var ct = xhr.getResponseHeader('content-type') || '',
                xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
                data = xml ? xhr.responseXML : xhr.responseText;

            if (xml && data.documentElement.nodeName === 'parsererror') {
                if ($.error) {
                    $.error('parsererror');
                }
            }
            if (s && s.dataFilter) {
                data = s.dataFilter(data, type);
            }
            if (typeof data === 'string') {
                if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                    data = parseJSON(data);
                } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                    $.globalEval(data);
                }
            }
            return data;
        };

        return deferred;
    }
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
    options = options || {};
    options.delegation = options.delegation && $.isFunction($.fn.on);

    // in jQuery 1.3+ we can fix mistakes with the ready state
    if (!options.delegation && this.length === 0) {
        var o = { s: this.selector, c: this.context };
        if (!$.isReady && o.s) {
            log('DOM not ready, queuing ajaxForm');
            $(function() {
                $(o.s,o.c).ajaxForm(options);
            });
            return this;
        }
        // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
        log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
        return this;
    }

    if ( options.delegation ) {
        $(document)
            .off('submit.form-plugin', this.selector, doAjaxSubmit)
            .off('click.form-plugin', this.selector, captureSubmittingElement)
            .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
            .on('click.form-plugin', this.selector, options, captureSubmittingElement);
        return this;
    }

    return this.ajaxFormUnbind()
        .bind('submit.form-plugin', options, doAjaxSubmit)
        .bind('click.form-plugin', options, captureSubmittingElement);
};

// private event handlers
function doAjaxSubmit(e) {
    /*jshint validthis:true */
    var options = e.data;
    if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
        e.preventDefault();
        $(e.target).ajaxSubmit(options); // #365
    }
}

function captureSubmittingElement(e) {
    /*jshint validthis:true */
    var target = e.target;
    var $el = $(target);
    if (!($el.is("[type=submit],[type=image]"))) {
        // is this a child element of the submit el?  (ex: a span within a button)
        var t = $el.closest('[type=submit]');
        if (t.length === 0) {
            return;
        }
        target = t[0];
    }
    var form = this;
    form.clk = target;
    if (target.type == 'image') {
        if (e.offsetX !== undefined) {
            form.clk_x = e.offsetX;
            form.clk_y = e.offsetY;
        } else if (typeof $.fn.offset == 'function') {
            var offset = $el.offset();
            form.clk_x = e.pageX - offset.left;
            form.clk_y = e.pageY - offset.top;
        } else {
            form.clk_x = e.pageX - target.offsetLeft;
            form.clk_y = e.pageY - target.offsetTop;
        }
    }
    // clear form vars
    setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
}


// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic, elements) {
    var a = [];
    if (this.length === 0) {
        return a;
    }

    var form = this[0];
    var formId = this.attr('id');
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    var els2;

    if (els && !/MSIE [678]/.test(navigator.userAgent)) { // #390
        els = $(els).get();  // convert to standard array
    }

    // #386; account for inputs outside the form which use the 'form' attribute
    if ( formId ) {
        els2 = $(':input[form="' + formId + '"]').get(); // hat tip @thet
        if ( els2.length ) {
            els = (els || []).concat(els2);
        }
    }

    if (!els || !els.length) {
        return a;
    }

    var i,j,n,v,el,max,jmax;
    for(i=0, max=els.length; i < max; i++) {
        el = els[i];
        n = el.name;
        if (!n || el.disabled) {
            continue;
        }

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(form.clk == el) {
                a.push({name: n, value: $(el).val(), type: el.type });
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            }
            continue;
        }

        v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            if (elements) {
                elements.push(el);
            }
            for(j=0, jmax=v.length; j < jmax; j++) {
                a.push({name: n, value: v[j]});
            }
        }
        else if (feature.fileapi && el.type == 'file') {
            if (elements) {
                elements.push(el);
            }
            var files = el.files;
            if (files.length) {
                for (j=0; j < files.length; j++) {
                    a.push({name: n, value: files[j], type: el.type});
                }
            }
            else {
                // #180
                a.push({ name: n, value: '', type: el.type });
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            if (elements) {
                elements.push(el);
            }
            a.push({name: n, value: v, type: el.type, required: el.required});
        }
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle it here
        var $input = $(form.clk), input = $input[0];
        n = input.name;
        if (n && !input.disabled && input.type == 'image') {
            a.push({name: n, value: $input.val()});
            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) {
            return;
        }
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++) {
                a.push({name: n, value: v[i]});
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            a.push({name: this.name, value: v});
        }
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $('input[type=text]').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $('input[type=checkbox]').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $('input[type=radio]').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *    array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
            continue;
        }
        if (v.constructor == Array) {
            $.merge(val, v);
        }
        else {
            val.push(v);
        }
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (successful === undefined) {
        successful = true;
    }

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1)) {
            return null;
    }

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) {
            return null;
        }
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                var v = op.value;
                if (!v) { // extra pain for IE...
                    v = (op.attributes && op.attributes.value && !(op.attributes.value.specified)) ? op.text : op.value;
                }
                if (one) {
                    return v;
                }
                a.push(v);
            }
        }
        return a;
    }
    return $(el).val();
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function(includeHidden) {
    return this.each(function() {
        $('input,select,textarea', this).clearFields(includeHidden);
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (re.test(t) || tag == 'textarea') {
            this.value = '';
        }
        else if (t == 'checkbox' || t == 'radio') {
            this.checked = false;
        }
        else if (tag == 'select') {
            this.selectedIndex = -1;
        }
        else if (t == "file") {
            if (/MSIE/.test(navigator.userAgent)) {
                $(this).replaceWith($(this).clone(true));
            } else {
                $(this).val('');
            }
        }
        else if (includeHidden) {
            // includeHidden can be the value true, or it can be a selector string
            // indicating a special test; for example:
            //  $('#myForm').clearForm('.special:hidden')
            // the above would clean hidden inputs that have the class of 'special'
            if ( (includeHidden === true && /hidden/.test(t)) ||
                 (typeof includeHidden == 'string' && $(this).is(includeHidden)) ) {
                this.value = '';
            }
        }
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
            this.reset();
        }
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
    if (b === undefined) {
        b = true;
    }
    return this.each(function() {
        this.disabled = !b;
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
    if (select === undefined) {
        select = true;
    }
    return this.each(function() {
        var t = this.type;
        if (t == 'checkbox' || t == 'radio') {
            this.checked = select;
        }
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').selected(false);
            }
            this.selected = select;
        }
    });
};

// expose debug var
$.fn.ajaxSubmit.debug = false;

// helper fn for console logging
function log() {
    if (!$.fn.ajaxSubmit.debug) {
        return;
    }
    var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
    if (window.console && window.console.log) {
        window.console.log(msg);
    }
    else if (window.opera && window.opera.postError) {
        window.opera.postError(msg);
    }
}

}));

///<jscompress sourcefile="jquery.ba-throttle-debounce.js" />
/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(c,b){var $=c.jQuery||c.Cowboy||(c.Cowboy={}),a;$.throttle=a=function(f,h,d,e){var i,g=0;if(typeof h!=="boolean"){e=d;d=h;h=b}function j(){var o=this,m=+new Date()-g,k=arguments;function n(){g=+new Date();d.apply(o,k)}function l(){i=b}if(e&&!i){n()}i&&clearTimeout(i);if(e===b&&m>f){n()}else{if(h!==true){i=setTimeout(e?l:n,e===b?f-m:f)}}}if($.guid){j.guid=d.guid=d.guid||$.guid++}return j};$.debounce=function(f,d,e){return e===b?a(f,d,false):a(f,e,d!==false)}})(this);
