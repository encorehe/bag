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