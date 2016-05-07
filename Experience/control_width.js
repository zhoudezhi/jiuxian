// JavaScript Document
var limitWidth = "lt",
	fmWdith = 718;

function isHomePage() {
	var homePage = stripscript(window.location.href);
	if (homePage == "httpwwwjiuxiancomindexhtml" || homePage == "httpwwwjiuxiancom") {
		return true
	} else {
		return false
	}
}
if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style && isHomePage()) {fmWdith = 918;} else {
	$(function() {
		
		
		var newW = $(window).width();
		if (newW < 1200) {
			limitWidth = "lt";
			fmWdith = 718;
			var ohead1 = document.getElementById("newLink");
			ohead1.href ='';
			if ($("#mainbody").length > 0 && $(".wine_navbx").length < 0) {
				setTab()
			}
		} else {
			if (newW >= 1200) {
				limitWidth = "gt";
				var ohead1 = document.getElementById("newLink");
				ohead1.href = "css/index_1200.css";
				fmWdith = 918;
				if ($("#mainbody").length > 0 && $(".wine_navbx").length < 0) {
					setTab();
					
				}
			}
		}
		function takeCss() {
			var newH = $(window).width();
			if (newH <= 1200 && limitWidth == "gt") {
				$(".raceListWrap").css("width", 718);
				var ohead2 = document.getElementById("newLink");
				ohead2.href = "";
				if ($(".indexTabNav li:eq(4)").attr("class") == "n5 on") {
					$(".indexTabNav li:eq(4)").removeClass("on");
					$(".indexTabNav li:eq(0)").addClass("on")
				}
				limitWidth = "lt";
				if ($("#mainbody").length > 0 && $(".wine_navbx").length < 0) {
					setTab()
				}
			} else {
				if (newH > 1200 && limitWidth == "lt") {
					$(".raceListWrap").css("width", 918);
					var ohead1 = document.getElementById("newLink");
					ohead1.href ="css/index_1200.css";
					limitWidth = "gt";
					$(".indexTabNav .n4").attr("style", "");
					if ($("#mainbody").length > 0 && $(".wine_navbx").length < 0) {
						setTab()
					}
				}
			}
		}
		$(window).bind("resize", function() {
			takeCss();
			if ($("#mainbody").length > 0 && $(".wine_navbx").length < 0) {
				fmNum = 0;
				fmBtn.removeClass("on");
				fmBtn.eq(fmNum).addClass("on");
				fmWdith = $(".raceListWrap").width();
				$(".raceList").css("left", -fmWdith + "px");
				$(".raceList[waitpro=" + fmNum + "]").css("left", 0);
			}
		})
	})
};