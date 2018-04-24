	//头部导航
	$(".nav li").hover(function() {
		$(".nav li").removeClass("navActive");
		$(this).addClass("navActive").children("div").show();
	}, function() {
		$(".nav li").removeClass("navActive").children("div").hide();
	});
	$(".nav .singleNav").on("click", function() {
		$(".nav li").removeClass("navActive1");
		$(this).addClass("navActive1");
	})

	$(".nav li p").hover(function() {
		$(".nav li p").removeClass("navItemActive");
		$(this).addClass("navItemActive");
	}, function() {
		$(this).removeClass("navItemActive");
	});
	$(".nav li p").on("click", function() {
		$(".nav li").removeClass("navActive1");
		$(this).parents("li").addClass("navActive1");
		$(".nav li p").removeClass("navItemActive1");
		$(this).addClass("navItemActive1");
	})
	
	document.onclick = function(e) {
		$("#mine_menu").hide();
	};
	$('.mine').on("click", function(e) {
		$("#mine_menu").toggle();
		e = e || event;
		stopFunc(e);
	});
	$('#mine_menu').on("click", function(e) {
		e = e || event;
		stopFunc(e);
	});
    $('.mine a').on('click',function(){
        window.location.href = 'http://sso.ehaofang.net/loginout';
    })


	//项目开发url跳转
    $(".nav li:eq(2) dl p:eq(0) a").on("click", function() {
        window.location.href = 'http://xmkfweb.ehaofang.net/floorLists';
    })