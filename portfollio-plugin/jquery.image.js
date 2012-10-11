(function($) {

	jQuery.fn.juImageSlide = function(options) {
        var opt = {
        		
        		speed:500,
        		delay:5,
        		easing:'easeInSine'
        };
        var o = jQuery.extend(opt, options);
		return this.each(function() {
			var e = $(this);
			var Slider = function() {
				// this.navMain = e.find('div.nav_main');
				this.mainPara = e.find('div.main_para');
				this.mainParaCount = (this.mainPara.length); // Match index
				this.detailPara = e.find('div.detail_para');
				this.navPrev = e.find('img.left');
				this.navNext = e.find('img.right');
				this.thumbs = e.find('div.nav-logo img');

				this.getCurrentIndex = function() { // Index
					// alert(this.mainPara.filter('.show').index());
					return this.mainPara.filter('.show').index();
				};

				this.go = function(recent, index) { // Rotate images
					this.mainPara.eq(recent).removeClass('show');
					this.mainPara.eq(index).delay(o.delay).show(0).animate({
							width: ['toggle', 'swing'],
							height: ['toggle', 'swing'],
							opacity: 'toggle'
						  }, o.speed, o.easing);
					this.mainPara.eq(index).addClass('show');

					this.detailPara.eq(recent).removeClass('show');
					this.detailPara.eq(index).delay(o.delay).show(0).slideToggle({
						duration : o.speed,
						easing : o.easing
					});
					this.detailPara.eq(index).addClass('show');

					this.thumbs.eq(recent).removeClass('thumb_img');
					this.thumbs.eq(index).addClass('thumb_img');
				};

				this.next = function() {
					var index = this.getCurrentIndex();

					if (index < this.mainParaCount) {
						this.go(index - 1, index); // Go next
					} else {
						this.go(index - 1, 0); // If last go first
					}
				};

				this.prev = function() {

					var index = this.getCurrentIndex() - 1;

					if (index > 0) {
						this.go(index, index - 1); // Go previous
					} else {

						this.go(index, this.mainParaCount - 1); // If first go
						// last
					}
				};

				this.init = function() {
					this.thumbs.eq(0).addClass('thumb_img');
				}

			};

			var slider = new Slider();
			slider.init();
			slider.navNext.click(function(e) { // Click next button
				e.preventDefault();
					slider.next();
			});
			slider.navNext.doubleClick
			slider.navPrev.click(function(e) { // Click previous button
				e.preventDefault();
					slider.prev();
			});
		});
	};

})(jQuery);