/*art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function A(b){return b.replace(T,"").replace(U,",").replace(V,"").replace(W,"").replace(X,"").split(Y)}function B(b){return"'"+b.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function C(n,o){function r(c){return ah+=c.split(/\n/).length-1,af&&(c=c.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),c&&(c=ak[1]+B(c)+ak[2]+"\n"),c}function aa(d){var g=ah;if(ae?d=ae(d,o):ab&&(d=d.replace(/\n/g,function(){return ah++,"$line="+ah+";"})),0===d.indexOf("=")){var h=ag&&!/^=[=#]/.test(d);if(d=d.replace(/^=[=#]?|[\s;]*$/g,""),h){var i=d.replace(/\s*\([^\)]+\)/,"");N[i]||/^(include|print)$/.test(i)||(d="$escape("+d+")")}else{d="$string("+d+")"}d=ak[1]+d+ak[2]}return ab&&(d="$line="+g+";"+d),R(A(d),function(c){if(c&&!ai[c]){var e;e="print"===c?am:"include"===c?an:N[c]?"$utils."+c:O[c]?"$helpers."+c:"$data."+c,ao+=c+"="+e+",",ai[c]=!0}}),d+"\n"}var ab=o.debug,ac=o.openTag,ad=o.closeTag,ae=o.parser,af=o.compress,ag=o.escape,ah=1,ai={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},aj="".trim,ak=aj?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],al=aj?"$out+=text;return $out;":"$out.push(text);",am="function(){var text=''.concat.apply('',arguments);"+al+"}",an="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+al+"}",ao="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(ab?"$line=0,":""),ap=ak[0],aq="return new String("+ak[3]+");";R(n.split(ac),function(d){d=d.split(ad);var e=d[0],f=d[1];1===d.length?ap+=r(e):(ap+=aa(e),f&&(ap+=r(f)))});var ar=ao+ap+aq;ab&&(ar="try{"+ar+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+B(n)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var a=new Function("$data","$filename",ar);return a.prototype=N,a}catch(b){throw b.temp="function anonymous($data,$filename) {"+ar+"}",b}}var D=function(c,d){return"string"==typeof d?Q(d,{filename:c}):G(c,d)};D.version="3.0.0",D.config=function(c,d){E[c]=d};var E=D.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},F=D.cache={};D.render=function(c,d){return Q(c,d)};var G=D.renderFile=function(d,e){var f=D.get(d)||P({filename:d,name:"Render Error",message:"Template not found"});return e?f(e):f};D.get=function(e){var f;if(F[e]){f=F[e]}else{if("object"==typeof document){var g=document.getElementById(e);if(g){var h=(g.value||g.innerHTML).replace(/^\s*|\s*$/g,"");f=Q(h,{filename:e})}}}return f};var H=function(c,d){return"string"!=typeof c&&(d=typeof c,"number"===d?c+="":c="function"===d?H(c.call(c)):""),c},I={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},J=function(b){return I[b]},K=function(b){return H(b).replace(/&(?![\w#]+;)|[<>"']/g,J)},L=Array.isArray||function(b){return"[object Array]"==={}.toString.call(b)},M=function(e,f){var g,h;if(L(e)){for(g=0,h=e.length;h>g;g++){f.call(e,e[g],g,e)}}else{for(g in e){f.call(e,e[g],g)}}},N=D.utils={$helpers:{},$include:G,$string:H,$escape:K,$each:M};D.helper=function(c,d){O[c]=d};var O=D.helpers=N.$helpers;D.onerror=function(d){var e="Template Error\n\n";for(var f in d){e+="<"+f+">\n"+d[f]+"\n\n"}"object"==typeof console&&console.error(e)};var P=function(b){return D.onerror(b),function(){return"{Template Error}"}},Q=D.compile=function(c,e){function f(a){try{return new m(a,l)+""}catch(b){return e.debug?P(b)():(e.debug=!0,Q(c,e)(a))}}e=e||{};for(var k in E){void 0===e[k]&&(e[k]=E[k])}var l=e.filename;try{var m=C(c,e)}catch(n){return n.filename=l||"anonymous",n.name="Syntax Error",P(n)}return f.prototype=m.prototype,f.toString=function(){return m.toString()},l&&e.cache&&(F[l]=f),f},R=N.$each,S="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",T=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,U=/[^\w$]+/g,V=new RegExp(["\\b"+S.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),W=/^\d[^,]*|,\d[^,]*/g,X=/^,+|,+$/g,Y=/^$|,+/;E.openTag="{{",E.closeTag="}}";var Z=function(f,g){var h=g.split(":"),i=h.shift(),j=h.join(":")||"";return j&&(j=", "+j),"$helpers."+i+"("+f+j+")"};E.parser=function(d){d=d.replace(/^\s/,"");var p=d.split(" "),q=p.shift(),r=p.join(" ");switch(q){case"if":d="if("+r+"){";break;case"else":p="if"===p.shift()?" if("+p.join(" ")+")":"",d="}else"+p+"{";break;case"/if":d="}";break;case"each":var s=p[0]||"$data",t=p[1]||"as",u=p[2]||"$value",v=p[3]||"$index",w=u+","+v;"as"!==t&&(s="[]"),d="$each("+s+",function("+w+"){";break;case"/each":d="});";break;case"echo":d="print("+r+");";break;case"print":case"include":d=q+"("+p.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(r)){var x=!0;0===d.indexOf("#")&&(d=d.substr(1),x=!1);for(var y=0,z=d.split("|"),aa=z.length,ab=z[y++];aa>y;y++){ab=Z(ab,z[y])}d=(x?"=":"=#")+ab}else{d=D.helpers[q]?"=#"+q+"("+p.join(",")+");":"="+d}}return d},"function"==typeof define?define(function(){return D}):"undefined"!=typeof exports?module.exports=D:this.template=D}();