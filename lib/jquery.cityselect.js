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