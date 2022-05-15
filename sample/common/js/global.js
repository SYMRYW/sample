$(function () {
	// どんな機能なのかが分かるよう"アニメーション"、"クラス名ループ"のように説明を一文入れてください
	// -----------------------------------------------------------------
	var $window = $(window);
	// ****************************************************************
	//アニメーション
	// ****************************************************************
	var $animated = $('[class*="js-anime"]');
	$window.on('load resize scroll', function () {
		var $windowH = document.documentElement.clientHeight;
		$animated.each(function () {
			var $animatedOffsetTop = $(this).offset().top;
			//オフセット値別トリガー
			//コンテンツの表示域0%地点
			if ($(this).hasClass('js-anime-offset0')) {
				if ($window.scrollTop() > $animatedOffsetTop - $windowH + 0) {
					$(this).addClass('show');
				}
				//コンテンツの表示域20%地点
			} else if ($(this).hasClass('js-anime-offset20')) {
				var $offset = $(this).height() / 5;
				if ($window.scrollTop() > $animatedOffsetTop - $windowH + $offset) {
					$(this).addClass('show');
				}
				//コンテンツの表示域50%地点
			} else if ($(this).hasClass('js-anime-offset50')) {
				var $offset = $(this).height() / 2;
				if ($window.scrollTop() > $animatedOffsetTop - $windowH + $offset) {
					$(this).addClass('show');
				}
				//コンテンツの表示域100%地点
			} else if ($(this).hasClass('js-anime-offset100')) {
				var $offset = $(this).height();
				if ($window.scrollTop() > $animatedOffsetTop - $windowH + $offset) {
					$(this).addClass('show');
				}
				//コンテンツの表示域200%地点
			} else if ($(this).hasClass('js-anime-offset200')) {
				var $offset = $(this).height() / 0.5;
				if ($window.scrollTop() > $animatedOffsetTop - $windowH + $offset) {
					$(this).addClass('show');
				}
				//コンテンツの表示域80%地点 デフォルト
			} else {
				var $offset = $(this).height() / 1.25;
				if ($window.scrollTop() > $animatedOffsetTop - $windowH + $offset) {
					$(this).addClass('show');
				}
			}
		});
	});
	// ****************************************************************
	//クラス名ループ
	// ****************************************************************
	var trigger_text = $('.js-trigger-text');
	for(var i = 0; i < trigger_text.length; i++){
		$(trigger_text[i]).addClass('js-trigger-text' + [i]);
	}
	var demo_body_text = $('.js-demo-body-text');
	for(var i = 0; i < demo_body_text.length; i++){
		$(demo_body_text[i]).addClass('js-demo-body-text' + [i]);
	}
	// ****************************************************************
	//アコーディオンメニュー
	// ****************************************************************
	var $accodion_trigger = $('.js-accordion_trigger');
	var $accodion_content = $('.js-accordion_content');
	$accodion_trigger.each(function () {
		var self = $(this);
		self.on('click', function () {
			//自身以外のトリガーから.openクラスを取る、対応するコンテンツを閉じる
			$accodion_trigger.not(self).removeClass('open').next($accodion_content).slideUp(300);
			//自身に.openクラスを付け外しする、対応するコンテンツを開け閉めする
			self.toggleClass('open').next($accodion_content).stop(true).slideToggle(300);
		});
	});
	// ****************************************************************
	//和暦生年月日から年齢を計算する
	// ****************************************************************
	function calcAge(){
		var age=0;
		try{
			var birthera   = document.getElementById('id_era').value;
			var birthyear  = document.getElementById('id_year').value;
			var birthmonth = document.getElementById('id_month').value;
			var birthday   = document.getElementById('id_day').value;
			var birthyear = parseInt(birthyear, 10);
			if(birthera == 'M'){
				birthyear = birthyear + 1867;
			}else if(birthera == 'T'){
				birthyear = birthyear + 1911;
			}else if(birthera == 'S'){
				birthyear = birthyear + 1925;
			}else if(birthera == 'H'){
				birthyear = birthyear + 1988;
			}else if(birthera == 'R'){
				birthyear = birthyear + 2018;
			}
			now = new Date();
			var y = now.getYear();
			var m = now.getMonth()+1;
			var d = now.getDate();
			if(m < birthmonth){
				age = y - birthyear - 1;
			}
			if(m > birthmonth){
				age = y - birthyear;
			}
			if(m == birthmonth){
				if(d < birthday){
					age = y - birthyear - 1;
				}else{
					age = y - birthyear;
				}
			}
		}catch(e){
			return "";
		}
		if(age && age > 0){
			document.getElementById("id_txt").value=age;
		}
	}
	// ****************************************************************
	//他のページからのアクセス時に特定のタブコンテンツを開く
	// ****************************************************************
	$('.js-course').hide();
	$('.js-planTab1').click(function () {
		$('.js-course').hide().filter(this.hash).fadeIn();
		$('.js-planTab1').removeClass('js-planTab1Active');
		$(this).addClass('js-planTab1Active');
		return false;
	}).filter(':eq(0)').click();

	$('.js-plan1').hide();
	$('.js-planTab2').click(function () {
		$('.js-plan1').hide().filter(this.hash).fadeIn();
		$('.js-planTab2').removeClass('js-planTab2Active');
		$(this).addClass('js-planTab2Active');
		this.hash == '#coursePlan3' ? $('.js-view').hide() : $('.js-view').show();
		return false;
	}).filter(':eq(0)').click();

	var courseBox,
		url = $(location).attr('pathname'),
		urlsplit = url.split('/'),
		tabActive = 'js-planTab1Active',
		contActive = 'js-courseActive';
	urlsplit.forEach(function (value) {
		if (value == 'highspeed') {
			$('.js-planTab1').removeClass(tabActive);
			$('.js-course').removeClass(contActive);
			courseBox = $('.js-courseBox').find('.js-planTab1');
			for (var i = 1; i <= courseBox.length; i++) {
				var hash = $(courseBox[i]).attr('href');
				if (hash == '#course2') {
					$(courseBox[i]).addClass(tabActive);
					$(hash).addClass(contActive).show();
				}
			}
		}
	});
	// ****************************************************************
	//スライドショー
	// ****************************************************************
	var $slideshowBox = $container.find('.slideshowBox');
	var $slideshow = $slideshowBox.find('.slideshow');
	$slideshow.each(function () {
		var
			$slideGroup = $slideshow.find('.slideshow_slides'),
			$slides = $slideGroup.find('.slideshow_image'),
			$slideshow_indicator = $slideshowBox.find('.slideshow_indicator'),
			$slideshow_nav = $slideshowBox.find('.slideshow_nav'),
			slideshow_indicatorHTML = '',
			slideCount = $slides.length,
			currentIndex = 0,
			interval = 5000,
			timer;
		//HTML要素の配置
		//各スライドの位置を決定
		$slides.each(function (index) {
			$(this).css({
				left: 100 * index + '%'
			});
			slideshow_indicatorHTML += '<a href="#">' + (index) + '</a>';
		});
		$slideshow_indicator.html(slideshow_indicatorHTML);
		//任意のスライドを表示する関数
		function goToSlide(index) {
			$slideGroup.animate({
				left: -100 * index + '%'
			}, 600, 'easeInOutExpo');
			//今表示しているインデックスの更新
			currentIndex = index;
			//ナビ更新
			updateNav();
		} //goToSlide関数
		function updateNav() {
			var $navPrev = $slideshow_nav.find('.prev'),
				$navNext = $slideshow_nav.find('.next');
			//もし最初のスライドならPrevを無効に
			if (currentIndex === 0) {
				$navPrev.addClass('disabled');
			} else {
				$navPrev.removeClass('disabled');
			}
			//もし最後のスライドならNextを無効に
			if (currentIndex === slideCount - 1) {
				$navNext.addClass('disabled');
			} else {
				$navNext.removeClass('disabled');
			}
			//現在のスライドのインジケーターを無効に
			$slideshow_indicator.find('a').removeClass('active')
				.eq(currentIndex).addClass('active');
		}
		//インジケーター●●●
		$slideshow_indicator.on('click', 'a', function (e) {
			e.preventDefault();
			if (!$(this).hasClass('active')) {
				goToSlide($(this).index());
			}
		});
		//ナビ<>
		$slideshow_nav.on('click', 'a', function (e) {
			e.preventDefault();
			if ($(this).hasClass('disabled')) {
				goToSlide($(this).index());
			} else if ($(this).hasClass('prev')) {
				goToSlide(currentIndex - 1);
			} else {
				goToSlide(currentIndex + 1);
			}
		});
		//タイマーを開始する関数
		function startTimer() {
			timer = setInterval(function () {
				var nextIndex = (currentIndex + 1) % slideCount;
				goToSlide(nextIndex);
			}, interval);
		} //startTimer関数
		//タイマーを停止する関数
		function stopTimer() {
			clearInterval(timer);
		}
		//マウスが乗ったらタイマーを停止、はずれたら開始
		$slideshow.on({
			mouseenter: stopTimer,
			mouseleave: startTimer
		});
		//最初のスライドを表示
		goToSlide(currentIndex);
		//タイマーをスタート
		startTimer();
	});
});
