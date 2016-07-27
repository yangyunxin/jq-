(function ($) {
	/**
	 * 轮播函数
	 * @param {[object]} [varname] [description]
	 * @param {[type]} [varname] [description]
	 * @return {[type]} [description]
	 */
	function Carousel (ele, opt) {
		this.$element = ele;
		this.config = {
			num: 0,
			nowIndex: 0,
			timer: null
		}
		this.options = $.extend({}, this.config, opt);
		var _self = this;
		this.timer = setInterval(function () {
			_self.init(_self.options);
		}, 4000);
		_self.bindEvent(_self.options);
		
	}
	Carousel.prototype = {
		constructor: Carousel,
		init: function (config) {
			config.num++;
			config.nowIndex = config.num;
			if (config.num > 2) {
				config.num = 0;
			}
			this.play(config.num, config.nowIndex-1);
		},
		play: function (index,preIndex) {
			var $width = $(window).width();
			var $carouselList = this.$element.children(".carousel-list");

			if (!$carouselList.find('li').is(':animated')) {
				/*当前页*/
				$carouselList.find('li').css({"zIndex": 1}).end()
				.find('li').eq(index)
				.css({"left": $width, "zIndex": "9"}).stop().animate({"left": 0});
				/*上一页*/
				$carouselList.find('li').eq(preIndex)
				.css({"left": 0, "zIndex": "9"})
				.animate({"left": -$width});
			}
			
		},
		bindEvent: function (config) {
			var $olList = this.$element.children('.circle_list');
			var that = this;
			$olList.hover(function () {
				clearInterval(that.timer);
			}, function () {
				that.timer = setInterval(function () {
					that.init(that.options);
				}, 4000);
			})
			$olList.on("click", "li", function () {
				var $index = $(this).index();
				$(this).addClass("active").siblings().removeClass("active");
				console.log($index, config.nowIndex)
				if ($index != config.nowIndex) {
					that.play($index, config.nowIndex);
					config.nowIndex = $index;
				}
			});
		}
	}
	var carousel = new Carousel($(".carousel"));
})(jQuery);