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
		App.DialogBox.responsive();
		$(".action-bar img.logo").css("opacity", "1")
		$(window).resize(function() {
			App.responsive();
			App.DialogBox.responsive();
		})
		$(".black-trans, .back").click(function() {
			if($(".slider").css("left") == "0px") {
				App.slider("hide");
			} else if(!App.DialogBox.isEnabled()) {
				App.DialogBox.hide();
			}
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
		$("a[data-codelab-id]:not(disabled)").click(function() {
			var key = $(this).attr("data-codelab-id");
			App.User.codelab = key;
			App.Firebase.ref("users").child(App.User.loggedIn.uid+"/codelabs/"+key).once("value", function(data) {
				if(data.child("finish").exists()) {
					App.Process.step5();
				} else if(data.child("start_quiz").exists()) {
					App.Process.step4();
				} else if(data.child("end_time").exists()) {
					App.Process.step3();
				} else if (data.child("start_time").exists()) {
					App.Process.step2();
				} else if(!data.hasChildren()) {
					App.Process.step1();
				}
			});
		});
		$("#startCodelab").click(function() {
			App.DialogBox.disable();
			$.ajax({
				"url": "http://www.timeapi.org/utc/now.json?callback=?",
				cache: true,
				dataType: 'jsonp',
				success: function(json) {
					var date = new Date(json.dateString);
					var utc = new Date(date.getTime() + date.getTimezoneOffset());
					App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+App.User.codelab).set({
						"start_time": Math.round(utc.getTime()/1000)
					}, function() {
						App.Process.step2();
					});
				}
			})
		})
		$("#startQuiz").click(function() {
			App.DialogBox.disable();
			$.ajax({
				"url": "http://www.timeapi.org/utc/now.json?callback=?",
				cache: true,
				dataType: 'jsonp',
				success: function(json) {
					var date = new Date(json.dateString);
					var utc = new Date(date.getTime() + date.getTimezoneOffset());
					App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+App.User.codelab).update({
						"start_quiz": Math.round(utc.getTime()/1000)
					}, function() {
						App.Process.step4();
					});
				}
			})
		})
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
		if(controller == "home_signedin" && !(this.User.loggedIn))
			controller = "home";
		else if(controller == "home" && (this.User.loggedIn))
			controller = "home_signedin";
		else if(controller != "home" && (this.User.loggedIn))
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
	getParameter: function(name) {
		var url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
		if (!results)
			return null;
		if (!results[2])
			return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	},
	getCodelabImage: function(key) {
		return "includes/images/codelabs/"+((key.split('-'))[0])+".png";
	},
	Process: {
		step1: function() {
			App.DialogBox.show();
			App.DialogBox.disable();
			$.ajax({
				url: "views/codelab_1.html",
				cache: true,
				success: function(html) {
					App.DialogBox.el.find(".wrapper").html(html);
					App.DialogBox.el.find(".wrapper img").attr("src", App.getCodelabImage(App.User.codelab));
					App.DialogBox.el.find(".wrapper span.title").html(App.Codelabs.list[App.User.codelab].desc);
					App.DialogBox.el.find(".wrapper p").html("You have <b>" + App.Codelabs.getTimeRemaining(App.Codelabs.list[App.User.codelab].time) + "</b> to finish the codelab and to unlock the quiz.");
					App.DialogBox.el.find(".wrapper a").attr("data-codelab-id", App.User.codelab);
					App.DialogBox.enable();
				}
			})

		},
		step2: function() {
			App.DialogBox.show();
			App.DialogBox.disable();
			$.ajax({
				url: "views/codelab_2.html",
				cache: true,
				success: function(html) {
					App.DialogBox.el.find(".wrapper").html(html);
					App.DialogBox.el.find(".wrapper img").attr("src", App.getCodelabImage(App.User.codelab));
					App.DialogBox.el.find(".wrapper span.title").html(App.Codelabs.list[App.User.codelab].desc);
					App.DialogBox.el.find(".wrapper a").attr("data-codelab-id", App.User.codelab)
						.attr("href", App.Codelabs.list[App.User.codelab].url);
					App.DialogBox.enable();
				}
			})
			$("a.codelab-list[data-codelab-id="+App.User.codelab+"] div:last-child").html('<span class="countdown"></span>');
			App.Codelabs.readyCountdown(App.User.codelab);
		},
		step3: function() {
			App.DialogBox.show();
			App.DialogBox.disable();
			$.ajax({
				url: "views/codelab_3.html",
				cache: true,
				success: function(html) {
					App.DialogBox.el.find(".wrapper").html(html);
					App.DialogBox.el.find(".wrapper img").attr("src", App.getCodelabImage(App.User.codelab));
					App.DialogBox.el.find(".wrapper span.title").html(App.Codelabs.list[App.User.codelab].desc);
					App.DialogBox.el.find(".wrapper a").attr("data-codelab-id", App.User.codelab)
						.attr("href", App.Codelabs.list[App.User.codelab].url);
					App.DialogBox.enable();
				}
			})
		},
		step4: function() {
			App.DialogBox.show();
			App.DialogBox.disable();
			$.ajax({
				url: "views/codelab_4.html",
				cache: true,
				success: function(html) {
					App.DialogBox.el.find(".wrapper").html(html);
					App.DialogBox.el.find(".wrapper img").attr("src", App.getCodelabImage(App.User.codelab));
					App.DialogBox.el.find(".wrapper span.title").html(App.Codelabs.list[App.User.codelab].desc);
					App.DialogBox.el.find(".wrapper a").attr("data-codelab-id", App.User.codelab)
						.attr("href", App.Codelabs.list[App.User.codelab].url);
					App.DialogBox.enable();
				}
			})
		}
	},
	Codelabs: {
		list: {
			"android-1": {
				url: "https://codelabs.developers.google.com/codelabs/android-doze-standby/index.html?index=..%2F..%2Findex#0",
				desc: "Get your app ready for Doze and App Standby",
				time: 10
			},
			"firebase-1": {
				url: "",
				desc: "Lorem ipsum dolor sit amet1.",
				time: 10
			},
			"firebase-2": {
				url: "",
				desc: "Lorem ipsum dolor sit amet2.",
				time: 10
			}
		},
		readyCountdown: function(key) {
			this.getStartTime(key);
		},
		getStartTime: function(key) {
			App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+key+"/start_time").once("value", function(data) {
				App.Codelabs.list[key].start_time = data.val();
				App.Codelabs.getTimeNow(key);
			});
		},
		getTimeNow: function(key) {
			$.ajax({
				"url": "http://www.timeapi.org/utc/now.json?callback=?",
				cache: true,
				dataType: 'jsonp',
				success: function(json) {
					var date = new Date(json.dateString);
					var utc = new Date(date.getTime() + date.getTimezoneOffset());
					App.Codelabs.now = Math.round(utc.getTime()/1000);
					App.Codelabs.startCountdown(key);
				}
			});
		},
		startCountdown: function(key) {
			this.list[key].end_time = this.list[key].start_time + this.list[key].time;
			var remaining = this.list[key].end_time - this.now;
			if(!this.list[key].interval)
				this.list[key].interval = setInterval(function() {
					$("a.codelab-list[data-codelab-id="+key+"] span.countdown").html(App.Codelabs.getTimeRemaining(remaining, true));
					$(".dialog-box span.countdown").html(App.Codelabs.getTimeRemaining(remaining));
					remaining--;
					if(remaining <= 0)
						App.Codelabs.finishCodelab(key);
				}, 1000);
		},
		finishCodelab: function(key) {
			clearInterval(this.list[key].interval)
			App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+key).update({
				"end_time": App.Codelabs.list[key].end_time
			}, function() {
				App.User.codelab = key;
				$(".codelabs [data-codelab-id="+key+"]").removeClass("code")
					.addClass("quiz");
				$(".codelabs [data-codelab-id="+key+"] div:last-child").html('<i class="material-icons"></i>');
				App.Process.step3();
			});
		},
		getTimeRemaining: function(seconds, short = false) {
			var minutes = Math.floor(seconds / 60);
			var seconds = seconds -(minutes*60);
			if(minutes == 0 && seconds == 0)
				return "0s";
			return ((minutes != 0) ? minutes + ((short) ? " m" : ((minutes == 1) ? " minute" : " minutes")) : "") + " " + ((seconds != 0) ? seconds + (((short) ? " s" : ((seconds == 1 || seconds == 0) ? " second" : " seconds"))) : "")
		}
	},
	User: {
		codelab: "",
		loggedIn: 0,
		register: function(user) {
			App.Firebase.ref("users/"+user.uid).on("value", function(data) {
				if(!data.exists()) {
					App.Firebase.ref("users/"+user.uid).set({
						displayName: user.displayName,
						photoURL: user.photoURL,
						score: 0
					});	
				}
			});
		}
	},
	Firebase: {
		init: function() {
			this.auth = firebase.auth();
			this.database = firebase.database();
			this.storage = firebase.storage();

			this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));


			$(".signin").click(function() {
				var provider = new firebase.auth.GoogleAuthProvider();
				App.Firebase.auth.signInWithPopup(provider);
			});
			$(".signout").click(function() {
				App.Firebase.auth.signOut();
				delete App.User.loggedIn;
			});
		},
		ref: function(path) {
			return this.database.ref(path);
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
				App.User.register(user);
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
				App.DialogBox.el.html("");
				App.DialogBox.hide();
			}
			App.User.loggedIn = user;
			App.loadController(App.currentPage);
		},
		isSignedIn: function() {
			if(this.auth.currentUser)
				return true;
			return false;
		}
	},
	DialogBox: {
		el: $(".dialog-box"),
		loading: '<div class="blur"><div class="table"><div class="loading">'+$(".loading").html()+'</div></div></div>',
		show: function() {
			$(".black-trans").show();
			$("body").css("overflow", "hidden");
			this.reposition();
			this.el.css({
				"opacity": "0",
				"display": "block"
			}).animate({
				"opacity": "1"
			}, 250);
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
				this.el.find(".blur").show();
			else
				this.el.append(this.loading);
		},
		enable: function() {
			this.reposition();
			this.el.find(".blur").hide();
			this.el.css("overflow-y", "scroll");
		},
		isEnabled: function() {
			return (this.el.find(".blur").is(":visible"))
		},
		reposition: function() {
			this.el.css({
				"left": (($(window).outerWidth()-this.el.outerWidth())/2) + "px",
				"top": (($(window).outerHeight()-this.el.outerHeight())/2)+"px"
			});
		},
		responsive: function() {
			if($(window).outerWidth() < 500)
				this.el.css({
					"width": $(window).outerWidth()+"px",
					"left": "0px"
				});
			else {
				this.el.css("width", "500px");
				this.reposition();
			}
		}
	}
}