var App = {
	xhr: null,
	fl: true,
	viewLoad: false,
	headLoad: false,
	currentPage: "",
	ready: function(page) {
		this.Firebase.init();
		if(page == "")
			page = "home";
		this.currentPage = page;
		App.responsive();
		$(".action-bar img.logo").css("opacity", "1")
		$(window).resize(function() {
			App.responsive();
			App.DialogBox.responsive();
		})
		$(".black-trans, .back").click(function() {
			App.slider("hide");
			$(".speaker-container").css("bottom", "-80%");
			if(!App.DialogBox.isEnabled())
				App.DialogBox.hide();
		});
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
	afterLoad: function() {
		var ink, d, x, y;
		$("a").click(function(e){
		    if($(this).hasClass("ripple")) {
		        $clicked = $(this);
		        if($clicked.children(".ink").length == 0)
		            $clicked.prepend("<span class=\"ink\"></span>");
		        ink = $clicked.children(".ink");
		        ink.removeClass("animate");
		        if(!ink.height() && !ink.width()) {
		            d = Math.max($clicked.outerWidth(), $clicked.outerHeight());
		            ink.css({height: d, width: d});
		        }
		        x = e.pageX - $clicked.offset().left - ink.width()/2;
		        y = e.pageY - $clicked.offset().top - ink.height()/2;
		        ink.css({top: y+"px", left: x+"px"}).addClass("animate");
		        setTimeout(function() {
		            ink.remove();
		        }, 650)
		    }
		});
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
		if(controller == "home_signedin" && !(this.Firebase.loggedIn))
			controller = "home";
		else if(controller == "home" && (this.Firebase.loggedIn))
			controller = "home_signedin";
		else if(controller != "home" && (this.Firebase.loggedIn))
			controller = "home";
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
	Firebase: {
		init: function() {
			this.auth = firebase.auth();
			this.database = firebase.database();
			this.storage = firebase.storage();

			this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));


			$(".signin").click(function() {
				var provider = new firebase.auth.GoogleAuthProvider();
				Firebase.auth.signInWithPopup(provider);
			});
			$(".signout").click(function() {
				delete app.loggedIn;
				Firebase.auth.signOut();
			});
		},
		onAuthStateChanged: function(user) {
			if(user) {
				$(".signin").hide();
				$(".slider .user img").attr("src", user.photoURL);
				$(".slider .user span").html(user.displayName);
				$(".slider .user small").html(user.email);
				$(".slider .user").show();
				$(".slider ul.nav").show();

				$(".action-bar .user img").attr("src", user.photoURL);
				$(".action-bar .more-options img").attr("src", user.photoURL);
				$(".action-bar .more-options span").html(user.email);
				$(".action-bar .user").parents("li").show();
				this.registerUser(user);
			} else {
				$(".signin").show();
				$(".slider .user img").attr("src", "");
				$(".slider .user span").html("");
				$(".slider .user small").html("");
				$(".slider .user").hide();

				$(".action-bar .user img").attr("src", "");
				$(".action-bar .more-options img").attr("src", "");
				$(".action-bar .more-options span").html("");
				$(".action-bar .user").parents("li").hide();
				$(".slider ul.nav").hide();
			}
			this.loggedIn = user;
			App.loadController(App.currentPage);
		},
		isSignedIn: function() {
			if(this.auth.currentUser)
				return true;
			return false;
		},
		registerUser: function(user) {
			var userRef = this.database.ref("users");
			userRef.child(user.uid).on("value", function(data) {
				var exist = (data.val() !== null);
				console.log(exist);
				if(data.val() === null) {
					userRef.child(user.uid).push({
						displayName: user.displayName,
						photoURL: user.photoURL,
						score: 0
					});
				}
			});
		}
	},
	Codelabs: {
		"android": 
	}
	DialogBox: {
		el: $(".dialog-box"),
		loading: '<div class="blur"><div class="loading">'+$(".loading").html()+'</div></div>',
		show: function() {
			$(".black-trans").show();
			$("body").css("overflow", "hidden");
			this.reposition();
			this.el.show();
		},
		hide: function() {
			$(".black-trans").hide();
			$("body").css("overflow", "auto");
			this.el.hide();
		},
		disable: function() {
			this.el.css("overflow-y", "hidden");
			this.el.scrollTop(0);
			if(this.el.find(".blur").length == 1)
				this.el.find("blur").show();
			else
				this.el.append(this.loading);
		},
		enable: function() {
			this.el.find("blur").hide();
			this.el.css("overflow-y", "scroll");
		},
		isEnabled: function() {
			return (this.el.find(".blur").is(":visible"))
		},
		reposition: function() {
			this.el.css({
				"left": (($(window).outerWidth()-this.el.outerWidth())/2) + "px"
			});
		},
		responsive: function() {
			this.reposition();
		}
	}
}