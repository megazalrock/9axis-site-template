(function($){
	var $body;
	$(function(){
		$body = $('body');
		$.ASconf.commonAddBodyCss();
		$.ASconf.commonAddSelfLinkClass();
		$.ASconf.commonMouseHover();
	});
	$.ASconf = {
		options:{
			currentClassName:'current',
			hoverDuration:'fast',
			hoverOpacity:0.7,
			hoverEasing:'swing'
		},
		env:(function(){
			var parser = new UAParser();
			return parser.getResult();
		})(),
		util:{
			convertToAbsoluteUrl:function(url){
				var e = document.createElement('span');
				e.innerHTML = '<a href="' + url + '" />';
				return e.firstChild.href;
			}
		},
		rootUrl:(function(){
			var path = $('#js-initJs').attr('src').replace('shr/js/jquery.init.js','');
			var e = document.createElement('span');
			e.innerHTML = '<a href="' + path + '" />';
			return e.firstChild.href.replace(/index\.html?/,'');
		})(),
		commonAddBodyCss:function(){
			var bodyClass = [];
			bodyClass.push(this.env.browser.name.toLowerCase().replace(/\s/g,'-'));
			if(this.env.browser.name === 'IE'){
				bodyClass.push(this.env.browser.name.toLowerCase().replace(/\s/g,'-') + this.env.browser.major);
			}
			bodyClass.push(this.env.os.name.toLowerCase().replace(/\s/g,'-'));
			if('ontouchend' in window){
				bodyClass.push('touch');
			}
			$body.addClass(bodyClass.join(' '));
		},
		commonAddSelfLinkClass:function(){
			var asconf = this;
			var currentPath = location.href.replace(/index\.html?/,'').replace(asconf.rootUrl,'');
			currentPath = currentPath || '/';
			$('a[href!=#]:not(.noAutoCurrent)')
				.each(function(){
					var $self = $(this);
					var href = $self.attr('href');
					href = asconf.util.convertToAbsoluteUrl(href).replace(asconf.rootUrl,'').replace(/index\.html?/,'');
					href = href || '/';
					if(href === currentPath){
						$self
							.attr('data-original-href',$self.attr('href'))
							.removeAttr('href')
							.addClass(asconf.options.currentClassName);
					}
				});
		},
		commonMouseHover:function(){
			var asconf = this;
			$('a > img:not(.nohover),.btn')
				.each(function(){
					var $self = $(this);
					$self
						.hover(function(){
							$self
								.stop(true,false)
									.fadeTo(asconf.options.hoverDuration,asconf.options.hoverOpacity,asconf.options.hoverEasing);
						},function(){
							$self
								.stop(true,false)
									.fadeTo(asconf.options.hoverDuration,1,asconf.options.hoverEasing);
						});
				});
		}
	};

})(jQuery);