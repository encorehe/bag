/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(c,b){var $=c.jQuery||c.Cowboy||(c.Cowboy={}),a;$.throttle=a=function(f,h,d,e){var i,g=0;if(typeof h!=="boolean"){e=d;d=h;h=b}function j(){var o=this,m=+new Date()-g,k=arguments;function n(){g=+new Date();d.apply(o,k)}function l(){i=b}if(e&&!i){n()}i&&clearTimeout(i);if(e===b&&m>f){n()}else{if(h!==true){i=setTimeout(e?l:n,e===b?f-m:f)}}}if($.guid){j.guid=d.guid=d.guid||$.guid++}return j};$.debounce=function(f,d,e){return e===b?a(f,d,false):a(f,e,d!==false)}})(this);