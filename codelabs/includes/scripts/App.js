var App = {
	xhr: null,
	fl: true,
	viewLoad: false,
	headLoad: false,
	currentPage: "",
	ready: function(page) {
		this.initFirebase();
		if(page == "")
			page = "home";
		App.loadController(page);
		App.responsive();
		$(".action-bar img.logo").css("opacity", "1")
		$(window).resize(function() {
			App.responsive();
		})
		$(".black-trans, .back").click(function() {
			App.slider("hide");
			$(".speaker-container").css("bottom", "-80%");
		})
		$(".menu").click(function() {
			App.slider("show");
		})
		$(".back").click(function() {
			App.slider("hide");
		})
		$("[data-page]").click(function() {
			if(!$(this).is(".selected")) {
				App.loadController($(this).attr("data-page"));
			}
		});
		var app = this;
		$('html').click(function(e) {                    
		   if($(".more-options").is(":visible"))
	   			app.showUserOptions(false);
		});
		$('.user').click(function(event){
		   event.stopPropagation();
		});
		Input.ready();
	},
	slider: function(action) {
		if(action == "show") {
			$(".slider").animate({
				"left": "0px"
			}, 500, function() {
				$(".black-trans").show();
				$("body").css("overflow", "hidden");
			});
		} else {
			$(".slider").animate({
				"left": "-310px"
			}, 500, function() {
				$(".black-trans").hide();
				$("body").css("overflow", "auto");
			});
		}
	},
	responsive: function() {
		$(".action-bar .nav").show();
		if($(window).width() < 600) {
			$(".action-bar .nav").hide();
		}
	},
	loadController: function(controller) {
		App.slider("hide");
		App.currentPage = controller;
		$(".loading").css("top", "80px");
		$("ul.nav a").removeClass("selected");
		$("ul.nav a[data-page='"+controller+"']").addClass("selected");
		if(App.fl)
			App.fl = false;
		else
			App.xhr.abort();
		$("body").animate({
			scrollTop: 0
		}, 500, 'swing');
		App.xhr = $.ajax({
			url: "views/"+controller+".html",
			cache: true,
			success: function(html) {
				$(".view").html("").attr("controller", controller).css("height", "400px").animate({
					"top": "0px",
					"opacity": "0"
				}, 500);
				$(".header .wrapper").animate({
					"top": "0px"
				}, 500);
				setTimeout(function() {
					$(".view").html($(html).filter("#view")).animate({
						"top": "0px",
						"opacity": "1"
					}, 1500, function() {
						$(".loading").css("top", "-80px");
					}).css("height", "auto");
				}, 750);

			},
			error: function(xhrtemp, ajaxOptions, thrownError) {
				if(xhrtemp.status == 404) {
					App.loadController("home");
				}
			}
		})
	},
	initFirebase: function() {
		this.auth = firebase.auth();
		this.database = firebase.database();
		this.storage = firebase.storage();

		this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));

		var app = this;

		$(".signin").click(function() {
			var provider = new firebase.auth.GoogleAuthProvider();
			app.auth.signInWithPopup(provider);
		});
		$(".signout").click(function() {
			app.auth.signOut();
		});
	},
	showUserOptions: function(show = true) {
		if(show)
			$(".more-options").show().animate({
				"opacity": "1"
			}, 250);
		else
			$(".more-options").animate({
				"opacity": "0"
			}, 250, function() {
				$(this).hide();
			})
	},
	onAuthStateChanged: function(user) {
		if(user) {
			$(".signin").hide();
			$(".slider .user img").attr("src", user.photoURL);
			$(".slider .user span").html(user.displayName);
			$(".slider .user small").html(user.email);
			$(".slider .user").show();

			$(".action-bar .user img").attr("src", user.photoURL);
			$(".action-bar .more-options img").attr("src", user.photoURL);
			$(".action-bar .more-options span").html(user.email);
			$(".action-bar .user").parents("li").show();
		} else {

		}
	},
	isSignedIn: function() {
		return this.auth.curentUser;
	}
}