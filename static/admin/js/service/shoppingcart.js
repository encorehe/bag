//需要引入jquery.fly.min.js 抛物线插件
var dingdan=[],itemShop=[];
var shopcart={
	init:function(){
			shopcart.renderShop();
	},
	buyCLick:function(){
		var offset = $("#end").offset(),carBtn;
		mmg.on('cellSelected',function(e,item,rowIndex,colIndex){
			if ($(e.target).is('.J-goumai')) {
				e.stopPropagation();
				carBtn = $(e.target);
				if(carBtn.hasClass('active')){
					return false;
				}
				carBtn.addClass('active');
				itemShop.push(item);
				mmg.select(rowIndex);
				var flyer = $('<i class="iconfont">&#xe632;</i>');
				flyer.fly({
					start: {
						left: event.pageX,
						top: event.pageY
					},
					end: {
						left: offset.left+10,
						top: offset.top+10,
						width: 0,
						height: 0
					},
					onEnd: function(){
						$("#msg").show().animate({width: '250px'}, 200).fadeOut(1000);
						shopcart.renderList();
						this.destory();
					}
				});
			}
		});
	},
	renderShop:function(){
		shopcart.buyCLick();
		var objWrap=$('.sidebarWrapper');
		$('.J-shopbtn').on('click',function(){
			if(objWrap.hasClass('open')){
				$(objWrap).removeClass('open');
			}
			else{
				$(objWrap).addClass('open');
                //关闭购物车
                $('body').on('click','.J-closeSide',function (e) {
                    e.preventDefault();
                    $(objWrap).removeClass('open');
                });
			}
		})
	},renderList:function(){
		shopcart.buyCLick();
		$('.J-counts').text(itemShop.length);
		dingdan=[];
		for( var i=0;i<itemShop.length;i++){
			dingdan.push({
				'proId':itemShop[i].id,
				'price':itemShop[i].price,
				'number':1
			});
		}
		var listHtml=template('tplShop',{list:itemShop});
		$('.J-shop-cont').html(listHtml);
		var res=0;
		for(var i=0;i<$('.J-result').length;i++){
			res+=parseInt($('.J-result').eq(i).text());
		}
		$('.J-total').text(res);
		$('.J-dels').on('click',function(){
			//删除
			var _index=$(this).parent().parent().index(),_curTr=mmg.find('tbody tr.selected').eq(_index);
			itemShop.splice(_index,1);
			shopcart.renderList();
			_curTr.removeClass('selected');
			_curTr.find('input').attr('checked',false);
			_curTr.find(".J-goumai").removeClass('active');
		});
		$('.J-edits').on('click',function(e){
			e.preventDefault();
			var th=$(this),
				thv=th.text(),
				_ind=th.parent().parent().index(),
				inputv=th.parent().parent().find('input');
			if(thv=='修改'){
				th.text('保存');
				inputv.attr('readonly',false);
			}else{
				th.text('修改');
				inputv.attr('readonly',true);
				dingdan[_ind].counts=parseFloat(inputv.val());
			}
		});
		$('.J-count').on('change',function(e){
			e.preventDefault();
			//编辑的时候
			var th=$(this),
				counts=parseFloat(th.val()),
				res=th.parent().find('.J-result'),
				price=parseFloat(th.parent().find('.J-price').text());
				res.text(parseFloat(counts*price));
			ress=0;
			for(var i=0;i<$('.J-result').length;i++){
				ress+=parseInt($('.J-result').eq(i).text());
			}
			$('.J-total').text(ress);
		});
		$('.J-xiadan').on('click',function(e){
			e.preventDefault();
            //下单
			var dataProId = [],
				dataPrice=[],
				dataNum=[],
				datas = {};
			for(var i=0;i<dingdan.length;i++){
				dataProId.push(dingdan[i].proId);
				dataPrice.push(dingdan[i].price);
				dataNum.push(dingdan[i].number);
			}
			datas.proId = dataProId;
			datas.price = dataPrice;
			datas.number = dataNum;
			datas.total=parseFloat($('.J-total').text());
			var url=$agentOrders.add.url,beforBack=function(){},
			successBack=function(){
			  if(ajaxData.success==true){
				  common.iframeLayerMsg('下单成功',1,function(){
                      var page=$.hash('page');
                      if(page=='shangpin'){
                          pager='qdingdan';
                      }
                      if(page=="shangpinguanli"){
                          pager='dingdan';
                      }
					 index.navClick(pager);
					  //$(parent.document).find('.J-menu a').eq(0).click();
				  })
			  }
			};
			common.ajaxFunIframe(url,datas,beforBack,successBack);
		});


	}
};