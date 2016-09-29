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



		$(document).on("click", "a[data-codelab-id][data-codelab-status]", function() {
			var key = $(this).attr("data-codelab-id");
			$status = $(this).attr("data-codelab-status");
			App.DialogBox.el.attr("data-codelab-status", $status);
			App.User.codelab = key;
			App.Firebase.ref("users").child(App.User.loggedIn.uid+"/codelabs/"+key).once("value", function(data) {
				setTimeout(function() {
					if(data.child("end_quiz").exists()) {
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
				}, 500);
			});
		});
		var ink, d, x, y;
		$(document).on("click", "a", function(e){
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
		$(document).on("click", ".dialog-box[data-codelab-status=enabled] #startCodelab", function() {
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
		$(document).on("click", "#startQuiz", function() {
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

		$(document).on("click", "#submitQuiz", function() {
			App.DialogBox.disable();
			$.ajax({
				"url": "http://www.timeapi.org/utc/now.json?callback=?",
				cache: true,
				dataType: 'jsonp',
				success: function(json) {
					var date = new Date(json.dateString);
					var utc = new Date(date.getTime() + date.getTimezoneOffset());
					App.Codelabs.Quiz.finish(App.User.codelab, Math.round(utc.getTime()/1000));
				}
			})
		});

		$(document).on("click", "#restartCodelab", function() {
			App.DialogBox.disable();
			var userRef = App.Firebase.ref("users/"+App.User.loggedIn.uid);
			userRef.once("value", function(userdata) {
				var clS = userdata.val().codelabs[App.User.codelab].score;
				var uS = userdata.val().score;
				userRef.update({
					"score": uS - clS
				}, function() {
					userRef.child("codelabs/"+App.User.codelab).remove(function() {
						$("a.codelab-list[data-codelab-id="+App.User.codelab+"]")
							.removeClass("done fail").addClass("code");
						App.Process.step1();
					});
				});
			})
		})









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
		if(App.fl)
			App.fl = false;
		else
			App.xhr.abort();
		$("body").animate({
			scrollTop: 0
		}, 500, 'swing');
		$("ul.nav a").removeClass("selected");
		$("ul.nav a[data-page='"+controller+"']").addClass("selected");
		if(controller == "home_signedin" && !(this.User.loggedIn))
			controller = "home";
		else if(controller == "home" && (this.User.loggedIn))
			controller = "home_signedin";
		else if(controller != "home" && !(this.User.loggedIn))
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
		onError: function(xhrtemp, ajaxOptions, thrownError) {
			App.DialogBox.el.find(".wrapper").html('<h4>Error</h4><p>Cannot find content</p>');
			App.DialogBox.enable();
		},
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
					App.DialogBox.enable();
					if(App.DialogBox.getCodelabStatus() == "disabled") {
						App.DialogBox.el.find("a").removeAttr("id");
						App.DialogBox.el.find("span.message").html("You can't start this codelab because you have a codelab in progress.");
					}
				},
				error: function(xhrtemp, ajaxOptions, thrownError) {
					App.Process.onError(xhrtemp, ajaxOptions, thrownError);
				}
			})

		},
		step2: function() {
			App.DialogBox.show();
			App.DialogBox.disable();
			$(".codelabs a.codelab-list:not([data-codelab-id="+App.User.codelab+"])").attr("data-codelab-status", "disabled");
			$(".codelabs a.codelab-list[data-codelab-id="+App.User.codelab+"]").attr("data-codelab-status", "enabled");
			$.ajax({
				url: "views/codelab_2.html",
				cache: true,
				success: function(html) {
					App.DialogBox.el.find(".wrapper").html(html);
					App.DialogBox.el.find(".wrapper img").attr("src", App.getCodelabImage(App.User.codelab));
					App.DialogBox.el.find(".wrapper span.title").html(App.Codelabs.list[App.User.codelab].desc);
					App.DialogBox.el.find(".wrapper a").attr("href", App.Codelabs.list[App.User.codelab].url);
					App.DialogBox.enable();
					App.Codelabs.readyCountdown(App.User.codelab);
				},
				error: function(xhrtemp, ajaxOptions, thrownError) {
					App.Process.onError(xhrtemp, ajaxOptions, thrownError);
				}
			})
			$("a.codelab-list[data-codelab-id="+App.User.codelab+"] div:last-child").html('<span class="countdown"></span>');
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
					App.DialogBox.enable();
				},
				error: function(xhrtemp, ajaxOptions, thrownError) {
					App.Process.onError(xhrtemp, ajaxOptions, thrownError);
				}
			})
		},
		step4: function() {
			App.DialogBox.show();
			App.DialogBox.disable();
			$.ajax({
				url: "views/codelab_4.html",
				cache: false,
				success: function(html) {
					App.DialogBox.el.find(".wrapper").html(html);
					App.DialogBox.el.find(".wrapper img").attr("src", App.getCodelabImage(App.User.codelab));
					App.DialogBox.el.find(".wrapper span.title").html(App.Codelabs.list[App.User.codelab].desc);
					App.Codelabs.Quiz.init(App.User.codelab);
					App.Codelabs.Quiz.displayQuestions(App.User.codelab);
				},
				error: function(xhrtemp, ajaxOptions, thrownError) {
					App.Process.onError(xhrtemp, ajaxOptions, thrownError);
				}
			})
			$("a.codelab-list[data-codelab-id="+App.User.codelab+"] div:last-child").html('<span class="countdown"></span>');
		},
		step5: function() {
			App.DialogBox.show();
			App.DialogBox.disable();
			$(".codelabs a.codelab-list").attr("data-codelab-status", "enabled");
			$.ajax({
				url: "views/codelab_5.html",
				cache: true,
				success: function(html) {
					App.DialogBox.el.find(".wrapper").html(html);
					App.DialogBox.el.find(".wrapper img").attr("src", App.getCodelabImage(App.User.codelab));
					App.DialogBox.el.find(".wrapper span.title").html(App.Codelabs.list[App.User.codelab].desc);
					App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+App.User.codelab).once("value", function(ucdata) {
						App.DialogBox.el.find(".wrapper p").html("Congratulations! You earned <b>"+ucdata.val().score+" points</b> in this codelab.<br><br>Time elapsed on this quiz is "+App.Codelabs.getTimeRemaining(ucdata.val().end_quiz - ucdata.val().start_quiz));
						App.Firebase.ref("questions/"+App.User.codelab).once("value", function(cQ) {
							App.Firebase.ref("s").once("value", function(s) {
								var i = 0;
								$parent = $(".dialog-box .quiz");
								$template = $parent.children(".row:first-child");
								$parent.html("");
								for(var q in ucdata.val().questions) {
									$parent.append($template.clone());
									$last = $(".dialog-box .quiz .row:last-child");
									$last.find(".question-number").html(i+1);
									$last.find(".question").html(cQ.val()[ucdata.val().questions[q].question].question);
									var correctanswer = cQ.val()[ucdata.val().questions[q].question].choices.split(App.Codelabs.Quiz.CHOICES_SEPARATOR)[0];
									var useranswer = ucdata.val().questions[q].answer;
									$last.find(".your-answer").html("<b>Your Answer:</b> "+ useranswer);
									if(correctanswer == useranswer) {
										$last.find("i").html("done").addClass("green-text");
									} else {
										$last.find("i").html("close").addClass("red-text");
									}
									i++;
								}
								if(ucdata.val().cA < 4) {
									App.DialogBox.el.find(".wrapper p").html("Sorry! You failed the quiz but you earned <b>"+ucdata.val().score+" points</b> in this codelab.<br><br>Time elapsed on this quiz is "+App.Codelabs.getTimeRemaining(ucdata.val().end_quiz - ucdata.val().start_quiz));
									App.DialogBox.el.find("#restartCodelab, span.message").show();
								}
								App.DialogBox.enable();
							})
						})
					})
				},
				error: function(xhrtemp, ajaxOptions, thrownError) {
					App.Process.onError(xhrtemp, ajaxOptions, thrownError);
				}
			})
		}
	},
	Codelabs: {
		list: {
			"pwa-1": {
				url: "https://codelabs.developers.google.com/codelabs/your-first-pwapp/index.html#0",
				desc: "Your First Progressive Web App",
				time: 30,
				questions: [
					{
						question: "It is a property of a PWA which allows user to “keep” apps they find most useful on their home screen without the hassle of an app store.",
						choices: ["Installable", "App-Like", "Linkable", "Discoverable"]
					}, {
						question: "It is a property of a PWA which makes it work for every user, regardless of browser choice because it's built with progressive enhancement as a core tenet.",
						choices: ["Progressive", "Safe", "Fresh", "Connectivity independent"]
					}, {
						question: "It is the minimal HTML, CSS, and JavaScript that is required to power the user interface of a progressive web app and is one of the components that ensures reliably good performance.",
						choices: ["App Shell", "App UI", "App Menu", "App Options"]
					}, {
						question: "It means that the shell files are loaded once over the network and then saved to the local device.",
						choices: ["Cached", "Saved", "Stored", "Downloaded"]
					}, {
						question: "A caching strategy where it gets data on screen as quickly as possible, then updates that once the network has returned the latest data.",
						choices: ["Cache-then-network", "Network-then-cache", "Cache-only", "Network-only"]
					}, {
						question: "It is a simple JSON file that gives you, the developer, the ability to control how your app appears to the user in the areas that they would expect to see apps, direct what the user can launch and more importantly how they can launch it.",
						choices: ["web app manifest / manifest.json", "web app control / control.json", "web app config / config.json", "web app settings / settings.json"]
					}, {
						question: "It is a script that is run by your browser in the background, separate from a web page, opening the door to features which don’t need a web page or user interaction. It can be used to pre-cache the app shell.",
						choices: ["Service Worker", "Service Cacher", "Service Loader", "Service Saver"]
					}, {
						question: "A caching strategy where it gets the latest data first, but offline users get an older cached version.",
						choices: ["Network-then-cache", "Cache-only", "Network-only", "Cache-then-network"]
					}, {
						question: "It is a property of a PWA which make it identifiable as an \"application\" thanks to W3C manifest and service worker registration scope, allowing search engines to find it. ",
						choices: ["Discoverable", "App-like", "Installable", "Linkable"]
					}, {
						question: "How many asynchronous requests does the service worker perform?",
						choices: ["Two", "Three", "One", "Four and above"]
					}
				]
			},
			"polymer-1": {
				url: "https://codelabs.developers.google.com/codelabs/polymer-maps/index.html#0",
				desc: "Build Google Maps Using Web Components & No Code!",
				time: 20,
				questions: [
					{
						question: "It is a client-side package management tool that can be used with any web app.",
						choices: ["Bower", "Bowler", "Power", "Dower"]
					}, {
						question: "What is the complete command to install the &lt;google-map> element using the command line?",
						choices: ["bower install GoogleWebComponents/google-map –save", "bower download GoogleWebComponents/google-map –save", "bower install googlemap –save", "bower install GoogleWebComponents/map –save"]
					}, {
						question: "In which file can we find the project dependencies where we would add the google-map dependency?",
						choices: ["bower.json", "dependency.json", "google-map.json", "derulo.json"]
					}, {
						question: "This disable the map’s controls.",
						choices: ["disable-default-ui", "disable-map-controls", "disable-controls", "disable-map-ui"]
					}, {
						question: "This element adds a marker on the map.",
						choices: ["&lt;google-map-marker>", "&lt;map-marker>", "&lt;google-marker>", "&lt;marker>"]
					}, {
						question: "It provides driving direction information using the Google Maps API. ",
						choices: ["&lt;google-map-directions>", "&lt;google-driving-directions>", "&lt;google-directions>", "&lt;google-directions-map>"]
					}, {
						question: "An element of Polymer which provides a text field.",
						choices: ["&lt;paper-input>", "&lt;polymer-field>", "&lt;text-field>", "&lt;paper-text>"]
					}, {
						question: "It is an element of Polymer useful for displaying an icon.",
						choices: ["&lt;iron-icon>", "&lt;paper-icon>", "&lt;icon>", "&lt;polymer-icon>"]
					}, {
						question: "It is a type-extension version of the &lt;template>. It allows you to use Polymer sugaring features outside of Polymer.",
						choices: ["dom-bind", "template-bind", "polymer-sugar", "bind-dom"]
					}, {
						question: "Symbols used in data-bindings for Polymer.",
						choices: ["{ { } }", "[ [ ] ]", "&lt; >", "( ( ) )"]
					}
				]
			},
			"polymer-2": {
				url: "https://codelabs.developers.google.com/codelabs/polymer-first-elements/index.html#0",
				desc: "Build your first Polymer element",
				time: 40,
				questions: [
					{
						question: "It is a client-side package management tool that can be used with any web app. ",
						choices: ["Bower", "Dower", "Power", "Bowler"]
					}, {
						question: "It lets you add a scoped DOM tree inside an element, with local styles and markup that are decoupled from the rest of the web page.",
						choices: ["Local DOM", "Tree DOM", "Element DOM", "Local Tree"]
					}, {
						question: "It is the element containing the Local DOM.",
						choices: ["Host element", "Child element", "Parent element", "Sibling element"]
					}, {
						question: "It defines the element's internal DOM structure, or local DOM as well as the element's local styling.",
						choices: ["&lt;dom-module>", "&lt;internal-dom>", "&lt;local-dom>", "&lt;dom-structure>"]
					}, {
						question: "It defines the element's local DOM structure. This is where you'll add markup for your custom element. ",
						choices: ["&lt;template>", "&lt;body>", "&lt;pattern>", "&lt;structure>"]
					}, {
						question: "This property tells Polymer to generate property change events when the property value changes. This lets the change be observed by other nodes.",
						choices: ["notify", "valueChanged", "upgrade", "update"]
					}, {
						question: "This property tells Polymer to update the corresponding attribute when the property changes. This lets you style the element using an attribute selector.",
						choices: ["reflectToAttribute", "polymerUpdate", "propertyChanged", "updateAttribute"]
					}, {
						question: "It is a property you'll define on the toggle button element.",
						choices: ["toggleIcon", "buttonIcon", "elementIcon", "tapIcon"]
					}, {
						question: "This object maps event names to handler names.",
						choices: ["listeners", "event maps", "action event", "action handlers"]
					}, {
						question: "This event is generated by Polymer's gesture system when the user clicks or taps on a target with a mouse or finger.",
						choices: ["tap", "onrelease", "ondown", "click"]
					}
				]
			},
			"firebase-1": {
				url: "https://codelabs.developers.google.com/codelabs/firebase-web/index.html#0",
				desc: "Firebase: Build a Real Time Web Chat App",
				time: 60,
				questions: [
					{
						question: "This will allow you to serve your web apps locally and deploy your web app to Firebase hosting.",
						choices: ["Firebase CLI", "Firebase Server", "Firebase Host", "Firebase Deployer"]
					}, {
						question: "What is the complete command to install the Firebase CLI?",
						choices: ["npm -g install firebase-tools", "npm -g install firebase-cli", "npm -g install firebase", "pm -g download firebase-tools"]
					}, {
						question: "This function in our project initializes the Firebase of your app where we can set some shortcuts and initiate the authentication.",
						choices: ["initFirebase", "startFirebase", "configFirebase", "loadFirebase"]
					}, {
						question: "This method allows you to sign in with your Google account. ",
						choices: ["GoogleAuthProvider()", "GoogleAccountLogin()", "GoogleLogin()", "GoogleAccountProvider()"]
					}, {
						question: "This function removes all previous listeners.",
						choices: ["off()", "dispose()", "remove()", "clear()"]
					}, {
						question: "This rule variable is a special variable containing information about the user if authenticated.",
						choices: ["auth", "permit", "allow", "valid"]
					}, {
						question: "This function adds a new entry to the Firebase Database.",
						choices: ["push()", "pull()", "new()", "add()"]
					}, {
						question: "It is a file/blob database service of Firebase.",
						choices: ["Firebase Storage", "Firebase Data Store", "Firebase Blob", "Firebase File Server"]
					}, {
						question: "This function saves the file to the Firebase Storage.",
						choices: ["put()", "pload()", "copyTo()", "save()"]
					}, {
						question: "This command deploys or uploads your app to the Firebase hosting service.",
						choices: ["firebase deploy", "firebase server", "firebase host", "firebase upload"]
					}
				]
			},
			"firebase-2": {
				url: "https://codelabs.developers.google.com/codelabs/firebase-android/index.html#0",
				desc: "Firebase Android Codelab",
				time: 40,
				questions: [
					{
						question: "It is a configuration file that contains all the necessary Firebase metadata for your app.",
						choices: ["google-services.json", "firebase.json", "firebase-services.json", "metadata.json"]
					}, {
						question: "This method gets the current instance of Firebase Authentication.",
						choices: ["FirebaseAuth.getInstance();", "FirebaseAuthInstance.get();", "FirebaseAuth.instance();", "FirebaseAuth.currentInstance();"]
					}, {
						question: "This method returns the logged in user of the Firebase Auth.",
						choices: ["getCurrentUser();", "getUser();", "getAuthUser();", "getLoggedInUser();"]
					}, {
						question: "Which line adds the Firebase Database dependency to your app?",
						choices: ["compile 'com.google.firebase:firebase-database:9.2.1'", "compile 'com.google.firebase:firebase-data:9.2.1'", "compile 'com.google.firebase:firebase-db:9.2.1'", "compile 'com.google.firebase:database:9.2.1'"]
					}, {
						question: "It can be used to send notifications to users of your app. It provides the ability to send and receive FCM messages.",
						choices: ["firebase-messaging / Firebase Cloud Messaging", "firebase-broadcasts", "firebase-reports", "firebase-notifications"]
					}, {
						question: "This dependency provides the ability to remotely configure applications without having to deploy and new code.",
						choices: ["firebase-config / Firebase Remote Config", "firebase-app-update", "firebase-remote", "firebase-code"]
					}, {
						question: "This dependency provides a simple way for your users to share your application with their friends through Email or SMS.",
						choices: ["firebase-appinvites / Firebase App Invites", "firebase-appfriends", "firebase-appshare", "firebase-messaging"]
					}, {
						question: "It provides a way for you to understand the way users move through your application, where they succeed and where they get stuck. It can also be used to understand the most used parts of your application.",
						choices: ["firebase-analytics / Firebase Analytics", "firebase-appstats", "firebase-usage-data", "firebase-statistics"]
					}, {
						question: "It gives you a way to easily monetize your application, you simply add the AdView placeholder and Google handles the ad delivery for you.",
						choices: ["play-services-ads / AdMob", "firebase-services-ads", "play-services-adwords", "google-firebase-commercials"]
					}, {
						question: "It allows your application to report when crashes occur and log the events leading up to the crash.",
						choices: ["firebase-crash / Firebase Crash", "firebase-logger", "firebase-exception", "firebase-error"]
					}
				]
			},
			"android-1": {
				url: "https://codelabs.developers.google.com/codelabs/getting-ready-for-android-n/index.html#0",
				desc: "Getting your app ready for Android Nougat",
				time: 45,
				questions: [
					{
						question: "It is the official IDE for Android development.",
						choices: ["Android Studio", "Eclipse", "IntelliJ Idea", "Visual Studio"]
					}, {
						question: "Visual StudioThis attribute sets the activity / app to be resizable for multi-window feature or not.",
						choices: ["resizeableActivity", "resizeable", "multiWindowable", "resizeableApp"]
					}, {
						question: "This feature of Android N adds support for displaying more than one app at the same time.",
						choices: ["multi-window", "split-screen", "dual-window", "multi-display"]
					}, {
						question: "The windowBackground property can be overridden by this property.",
						choices: ["windowBackgroundFallback", "windowBackgroundPriority", "windowOriginalBackground", "windowBackgroundOverride"]
					}, {
						question: "This is flag tells the app to open the new activity in an adjacent window, when the user is in split-window mode.",
						choices: ["FLAG_ACTIVITY_LAUNCH_ADJACENT", "FLAG_ACTIVITY_SPLIT_SCREEN", "FLAG_ACTIVITY_SIDE_BY_SIDE", "FLAG_ACTIVITY_LAUNCH_DOCUMENT"]
					}, {
						question: "A system mode that defers apps' CPU and network activities when the device is idle, such as when it's sitting on a table or in a drawer.",
						choices: ["Doze", "Sleep", "Greenify", "Idle"]
					}, {
						question: "Which method ensures that jobs are scheduled after a restart?",
						choices: ["setPersisted()", "setActive()", "startOnBoot()", "reschedcule()"]
					}, {
						question: "It is a wrapper around JobScheduler that provides backwards compatibility for devices older than API 21.",
						choices: ["GcmNetworkManager", "GcmJobScheduler", "SchedulerCompat", "JobSchedulerWrapper"]
					}, {
						question: "This method of the NotificationCompat.Builder class groups notifications with similar keys.",
						choices: ["setGroup()", "group()", "ddToGroup()", "groupNotifs()"]
					}, {
						question: "This class enables support the for text input responses directly from notifications.",
						choices: ["RemoteInput", "InstantReply", "InstantResponse", "QuickReply"]
					}
				]
			},
			"android-2": {
				url: "https://codelabs.developers.google.com/codelabs/constraint-layout/index.html#0",
				desc: "Using ConstraintLayout to design your views",
				time: 45,
				questions: [
					{
						question: "It is a new type of layout available in the Android Support repository built on top of a flexible constraint system.",
						choices: ["ConstraintLayout", "AdvancedRelativeLayout", "FlexiLayout", "NewRelativeLayout"]
					},
					{
						question: "It keeps widgets aligned using anchors or handles.",
						choices: ["Constraints", "Anchors", "Aligners", "Handles"]
					},
					{
						question: "This handle allows you to resize the widgets, represented by squares on the corners.",
						choices: ["Resize Handle", "Size Handle", "Height Handle", "Width Handle"]
					},
					{
						question: "This handle specifies the location of the widget, represented by circles on the sides.",
						choices: ["Side Constraint Handle", "Circular Handle", "Location Handle", "Proximity Handle"]
					},
					{
						question: "This handle aligns text fields of any two or more widgets, irrespective of widget sizes.",
						choices: ["Baseline Constraint Handle", "Text Align Handle", "Text Handle", "Level Handle"]
					},
					{
						question: "Until what version constraint-layout is backwards compatible?",
						choices: ["Android 2.3 Gingerbread", "Android 2.2 Froyo", "Android 3.0 Honeycomb", "Android 2.0 Eclair"]
					},
					{
						question: "How do you manually create a constraint?",
						choices: ["Click, Hold and Drag the handle.", "Right-click and drag the handle.", "Double-click the handle.", "You cannot create a constraint manually."]
					},
					{
						question: "The goal of this tool is to let you edit all properties and constraints without leaving the UI Builder.",
						choices: ["Inspector", "Constraint Editor", "Blueprint", "UI Manager"]
					},
					{
						question: "This option lets you automatically create constraints between widgets and their neighbors.",
						choices: ["Autoconnect", "Autoconstraint", "Autocreate", "AutoConstraintCreate"]
					},
					{
						question: "It aids developers by creating constraints among elements added in the layout. The constraints created through this depend on the types of elements added to the layout and their sizes.",
						choices: ["Inference Engine", "Constraint Creator", "Layout Manager", "UI Builder"]
					}
				]
			},
			"cardboard-1": {
				url: "https://codelabs.developers.google.com/codelabs/vr_view_101/index.html#0",
				desc: "Getting started with VR view for HTML",
				time: 40,
				questions: [
					{
						question: "It allows you to embed 360 degree VR media into websites on desktop and mobile.",
						choices: ["VR View", "Daydream", "VR Embedder", "Cardboard"]
					},
					{
						question: "VR View is available to all of the following except one. ",
						choices: ["Windows Phone", "Web pages", "Android", "iOS"]
					},
					{
						question: "Default location where Cardboard Camera images are stored.",
						choices: ["DCIM/CardboardCamera", "DCIM/Cardboard", "Google/CardboardCamera", "Google/CardboardPhotos"]
					},
					{
						question: "HTML element where the VR image or video is loaded or rendered.",
						choices: ["<iframe>", "<div>", "<img>", "<video>"]
					},
					{
						question: "The attribute and its value of iframe which removes the scrollbars, and allows moving around your POV allowing 360 degree viewing.",
						choices: ["scrolling=\"no\"", "scrollbars=\"none\"", "fullscreen", "scrollable=\"false\""]
					},
					{
						question: "A required control parameter specifies the image or video to load.",
						choices: ["image / video", "media", "content", "src"]
					},
					{
						question: "An optional control parameter that sets the initial yaw of the viewer, in degrees.",
						choices: ["start_yaw", "initial_yaw", "yaw_degrees", "yaw_view"]
					},
					{
						question: "An optional control parameter that identifies if content is in stacked stereo format or not.",
						choices: ["is_stereo", "is_stacked_stereo", "is_content_stereo", "is_format_stereo"]
					},
					{
						question: "Another optional parameter that sets the sneak peek of the content. ",
						choices: ["preview", "sneakpeek", "thumbnail", "imageicon"]
					},
					{
						question: "An optional control parameter that identifies if motion is restricted to yaw only or not.",
						choices: ["is_yaw_only", "is_motion_restricted", "is_moveable", "is_yaw_or_not"]
					}
				]
			},
			"cardboard-2": {
				url: "https://codelabs.developers.google.com/codelabs/vr_view_app_101/index.html#0",
				desc: "Getting started with VR View for Android",
				time: 40,
				questions: [
					{
						question: "It allows you to embed 360 degree VR media into websites on desktop and mobile.",
						choices: ["VR View","Daydream","VR Embedder","Cardboard"]
					},
					{
						question: "VR View is available to all of the following except one.",
						choices: ["Windows Phone","Web pages","Android","iOS"]
					},
					{
						question: "Default location where Cardboard Camera images are stored.",
						choices: ["DCIM/CardboardCamera","DCIM/Cardboard","Google/CardboardCamera","Google/CardboardPhotos"]
					},
					{
						question: "The software development kit (SDK) required to fully use the VR View for Android.",
						choices: ["Google VR SDK","Android SDK","Daydream SDK","Java SDK"]
					},
					{
						question: "Widget from the Google VR SDK that renders the panoramic and stereo images on the application.",
						choices: ["VrPanoramaView","StereoView","PanoramicView","VrImageView"]
					},
					{
						question: "What is the import statement for you to be able to use the VrPanoramaView class?",
						choices: ["import com.google.vr.sdk.widgets.pano.VrPanoramaView;","import com.google.vr.sdk.widgets.VrPanoramaView;","import com.google.vr.sdk.pano.widgets.VrPanoramaView;","import com.google.vr.sdk.VrPanoramaView;"]
					},
					{
						question: "What is the purpose of our ImageLoaderTask that extends the AsyncTask class?",
						choices: ["To load the image in a background thread.","To load the image on a later time","To load selected images from the gallery","To download the image currently shown"]
					},
					{
						question: "Widget from the Google VR SDK that renders the panoramic and stereo videos on the application.",
						choices: ["VrVideoView","VrVideoLoader","VrVideoWidget","VrViewerVideo"]
					},
					{
						question: "What is the import statement for you to be able to use the VrVideoView class?",
						choices: ["import com.google.vr.sdk.widgets.video.VrVideoView;","import com.google.vr.sdk.widgets.VrVideoView;","import com.google.vr.sdk.video.widgets.VrVideoView;","import com.google.vr.sdk.VrVideoView;"]
					},
					{
						question: "It handles the events performed or occurred on the VrVideoView.",
						choices: ["VrVideoEventListener","VrVideoEventHandler","VrVideoEventPerformed","VrVideoEventOccured"]
					}
				]
			},
			"cloud-1": {
				url: "https://codelabs.developers.google.com/codelabs/cloud-speech-intro/index.html#0",
				desc: "Speech to Text Transcription with the Cloud Speech API",
				time: 20,
				questions: [
					{
						question: "It is the prior step before using APIs such as Google Cloud Speech API.",
						choices: ["Enable API via API Manager","Download API Manager","Download Google Cloud","Enable Google Cloud API"]
					},
					{
						question: "It is a command line environment running in the Cloud.",
						choices: ["Google Cloud Shell","Google Cloud Bash","Google Cloud CLI","Google Cloud CMD"]
					},
					{
						question: "What do we need on our requests to use the Speech API?",
						choices: ["API Key","License Key","Serial Key","Speech Key"]
					},
					{
						question: "Command used to create the JSON file that will be used for the request.",
						choices: ["touch request.json","create request.json","request request.json","create request -json"]
					},
					{
						question: "In this part of the request body, we tell the Speech APi how to process the request.",
						choices: ["config","process","options","settings"]
					},
					{
						question: "In this part of the request body, we pass the uri of our audio file.",
						choices: ["audio","uri","audioUri","file"]
					},
					{
						question: "This part of the result shows the transcription of the audio file.",
						choices: ["transcript","text","message","textResult"]
					},
					{
						question: "This value indicates how sure the API of its transcription.",
						choices: ["confidence","sureness","accuracy","percentSure"]
					},
					{
						question: "This method can be used to transcribe text while the user is still speaking.",
						choices: ["syncrecognize","livetranscribe","realtimerecognize","liverecognize"]
					},
					{
						question: " A parameter of the config where we specify the language spoken in the audio.",
						choices: ["language_code","language_used","language_config","language_spoken"]
					}
				]
			},
			"cloud-2": {
				url: "https://codelabs.developers.google.com/codelabs/cloud-vision-nodejs/index.html#0",
				desc: "Using Cloud Vision with Node.js",
				time: 50,
				questions: [
					{
						question: "It is a command line environment running in the Cloud.",
						choices: ["Google Cloud Shell","Google Cloud Bash","Google Cloud CLI","Google Cloud CMD"]
					},
					{
						question: "It is a powerful and unified command-line tool for Google Cloud Platform.",
						choices: ["gcloud","gcp","gcli","gtool"]
					},
					{
						question: "This command lists the authenticated accounts.",
						choices: ["gcloud auth list","gcloud acc list","gcloud list","gcloud list accounts"]
					},
					{
						question: "This node package is Google's officially supported node.js client library for using Google APIs.",
						choices: ["googleapis","googleapipackage","googleapipack","googleapilib"]
					},
					{
						question: "It is a node.js middleware for providing signed cookie-based sessions.",
						choices: ["cookie-session","cookiejs","jscookie","session-cookies"]
					},
					{
						question: "Cookies are signed with the value of this object to protect against forgery.",
						choices: ["config.secret","cookie.secret","cookie.security","cookie.code"]
					},
					{
						question: "It is the middleware that makes the user's credentials available in the request as ``req.oauth2client``.",
						choices: ["oauth2.aware","oauth2.template","oauth2.account","oauth2.router"]
					},
					{
						question: "The command to create buckets which hold your data in the Google Cloud Storage.",
						choices: ["gsutil mb gs://<your-bucket-name>.appspot.com","gsutil defacl set public-read gs://<your-project-id>.appspot.com","gsutil create bucket <your-bucket-name>","gsutil bucket new <your-bucket-name>"]
					},
					{
						question: "This function is needed in lib/routes.js to upload the image to Cloud Storage and return a publicly accessible URL to display image and URI used for the Cloud Vision API.",
						choices: ["post()","upload()","put()","addToBucket()"]
					},
					{
						question: "This client exposes the different feature types available in the API, run detection on images and adds the call to the API to send the Google Cloud Storage URI.",
						choices: ["Cloud Vision Client","Cloud Storage Client","Google Cloud Client","Google Images Client"]
					}
				]
			},
			"cloud-3": {
				url: "https://codelabs.developers.google.com/codelabs/cloud-app-engine-python/index.html#0",
				desc: "Getting Started with App Engine (Python)",
				time: 20,
				questions: [
					{
						question: "They are easy to create, easy to maintain, and easy to scale as your traffic and data storage needs change.",
						choices: ["Google App Engine applications", "Firebase Applications", "Google Cloud Applications", "Python applications"]
					}, {
						question: "On what are App Engine applications based for automatically scaling?",
						choices: ["incoming traffic", "none of the above", "both incoming and outgoing traffic", "outgoing traffic"]
					}, {
						question: "The two App Engine’s environments that support a host of programming languages, including Java, Python, PHP, NodeJS, Go, etc..",
						choices: ["Standard Environment and Flexible Environment", "Simple Environment and Complex Environment", "Easy Environment and Hard Environment", "Normal Environment and Advanced Environment"]
					}, {
						question: "It is a command line environment running in the Cloud.",
						choices: ["Google Cloud Shell", "Google Cloud CMD", "Google Cloud CLI", "Google Cloud Bash"]
					}, {
						question: "It is a powerful and unified command-line tool for Google Cloud Platform. gcloud",
						choices: ["gcloud", "gcp", "gcli", "gtool"]
					}, {
						question: "What is the purpose of the helloworld.py that we created?",
						choices: ["Simple Request Handler", "Response and Request Handler", "Complex Request Handler", "Simple Response Handler"]
					}, {
						question: "This attribute or characteristic means that the same instance of the application can handle several simultaneous requests.",
						choices: ["threadsafe", "runnable", "concurrent", "real-time"]
					}, {
						question: "This configuration file, among other things, describes which handler scripts should be used for which URLs.",
						choices: ["app.yaml", "manifest.json", "yaml.app", "app.xml"]
					}, {
						question: "The command to start a deployment instance of the application server so we can test the application.",
						choices: ["dev_appserver.py ./ ", "host_appserver.py ./", "upload_appserver.py ./", "deploy_app.py ./"]
					}, {
						question: "The complete command to deploy or upload the Hello World server to the App Engine environment.",
						choices: ["gcloud app deploy app.yaml", "gcloud host app helloworld", "dev_appserver.py ./ --upload", "gcloud app upload helloworld.py"]
					}
				]
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
		getTimeNow: function(key, type = "codelab") {
			$.ajax({
				"url": "http://www.timeapi.org/utc/now.json?callback=?",
				cache: true,
				dataType: 'jsonp',
				success: function(json) {
					var date = new Date(json.dateString);
					var utc = new Date(date.getTime() + date.getTimezoneOffset());
					App.Codelabs.now = Math.round(utc.getTime()/1000);
					if(type == "codelab")
						App.Codelabs.start(key);
					else if(type == "quiz")
						App.Codelabs.Quiz.start(key);
				}
			});
		},
		start: function(key) {
			this.list[key].end_time = this.list[key].start_time + this.list[key].time;
			var remaining = this.list[key].end_time - this.now;
			if(!this.list[key].interval)
				this.list[key].interval = setInterval(function() {
					$("a.codelab-list[data-codelab-id="+key+"] span.countdown").html(App.Codelabs.getTimeRemaining(remaining, true));
					$(".dialog-box span.countdown").html(App.Codelabs.getTimeRemaining(remaining));
					remaining--;
					if(remaining < 0)
						App.Codelabs.finish(key);
				}, 1000);
		},
		finish: function(key) {
			clearInterval(this.list[key].interval);
			this.list[key].interval = false;
			App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+key).update({
				"end_time": App.Codelabs.list[key].end_time
			}, function() {
				var userQuestionsRef = App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+key+"/questions");
				var codelabQuestionsRef = App.Firebase.ref("questions/"+key);
				codelabQuestionsRef.once("value", function(value) {
					var questionList = [];
					for(var v in value.val())
						questionList.push(v);
					for(var i = 10; i >= 6; i--) {
						var rand = Math.floor(Math.random() * i);
						userQuestionsRef.push({
							question: questionList[rand],
							answer: ""
						});
						questionList.splice(rand, 1);
					}
				});
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
			if(minutes <= 0 && seconds <= 0)
				return (short) ? "0s" : "0 second";
			return ((minutes != 0) ? minutes + ((short) ? "m" : ((minutes == 1) ? " minute" : " minutes")) : "") + " " + ((seconds != 0) ? seconds + (((short) ? "s" : ((seconds == 1 || seconds == 0) ? " second" : " seconds"))) : "")
		},
		Quiz: {
			"CHOICES_SEPARATOR": "@#@",
			"TIME_PER_QUIZ": 300,
			init: function(key) {
				this.getStartTime(key);
			},
			displayQuestions: function(key) {
				var userQuestionsRef = App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+key+"/questions");
				userQuestionsRef.once("value", function(snapshot) {
					var qIDList = [];
					var questionList = [];
					var answerList = [];
					for(var v in snapshot.val()) {
						qIDList.push(v);
						questionList.push(snapshot.val()[v].question);
						answerList.push(snapshot.val()[v].answer);
					}
					var codelabQuestionsRef = App.Firebase.ref("questions/"+key);
					codelabQuestionsRef.once("value", function(cQ) {
						App.Firebase.ref("s").once("value", function(s) {
							$parent = $(".dialog-box .quiz");
							$template = $parent.children(".row:first-child");
							$parent.html("");
							questionList.forEach(function(qid, index) {
								$parent.append($template.clone());
								$last = $(".dialog-box .quiz .row:last-child");
								$last.attr("data-question-id", qIDList[index]);
								$last.find(".question-number").html(index+1);
								$last.find(".question").html(cQ.val()[qid].question);
								var choices = cQ.val()[qid].choices.split(App.Codelabs.Quiz.CHOICES_SEPARATOR);
								for(var i = 4; i >= 1; i--) {
									var rand = Math.floor(Math.random() * i);
									$last.find(".options label:nth-child("+(5-i)+") input").attr("value", choices[rand]).attr("name", "q"+(index+1));
									if(answerList[index] == choices[rand]) {
										$last.find(".options label:nth-child("+(5-i)+") input").attr("checked", "checked");
										$last.find(".options label:nth-child("+(5-i)+") input").prop("checked", true);
									} else {
										$last.find(".options label:nth-child("+(5-i)+") input").removeAttr("checked");
										$last.find(".options label:nth-child("+(5-i)+") input").prop("checked", false);
									}
									$last.find(".options label:nth-child("+(5-i)+") span.desc").html(choices[rand]);
									choices.splice(rand,1);
								}
							})
							$(".dialog-box input").change(function() {
								$qID = $(this).parents(".row").attr("data-question-id");
								$val = $(this).val();
								if(this.checked) {
									App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+key+"/questions/"+$qID).update({
										"answer": $val
									});
								}
							})
							App.DialogBox.enable();
						});
					})
				});
			},
			getStartTime: function(key) {
				App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+key+"/start_quiz").once("value", function(data) {
					App.Codelabs.list[key].start_quiz = data.val();
					App.Codelabs.getTimeNow(key, "quiz");
				});
			},
			start: function(key) {
				App.Codelabs.list[key].end_quiz = App.Codelabs.list[key].start_quiz + this.TIME_PER_QUIZ;
				var remaining = App.Codelabs.list[key].end_quiz - App.Codelabs.now;
				if(!App.Codelabs.list[key].interval) {
					App.Codelabs.list[key].interval = setInterval(function() {
						$("a.codelab-list[data-codelab-id="+key+"] span.countdown").html(App.Codelabs.getTimeRemaining(remaining, true));
						$(".dialog-box span.countdown").html(App.Codelabs.getTimeRemaining(remaining));
						remaining--;
						if(remaining < 0)
							App.Codelabs.Quiz.finish(key);
					}, 1000);
				}
			},
			finish: function(key, end_quiz = false) {
				clearInterval(App.Codelabs.list[key].interval);
				App.Codelabs.list[key].interval = false;
				var userRef = App.Firebase.ref("users/"+App.User.loggedIn.uid);
				userRef.once("value", function(udata) {
					var ucdata = udata.child("codelabs/"+key);
					App.Firebase.ref("questions/"+key).once("value", function(cQ) {
						App.Firebase.ref("s").once("value", function(s) {
							var cA = 0;
							for(var q in ucdata.val().questions) {
								if(cQ.val()[ucdata.val().questions[q].question].choices.split(App.Codelabs.Quiz.CHOICES_SEPARATOR)[0] == ucdata.val().questions[q].answer)
									cA++;
							}
							var start_quiz = ucdata.val()["start_quiz"];
							end_quiz = ((end_quiz !== false) ? end_quiz : App.Codelabs.list[key].end_quiz);
							var time_spent = end_quiz - start_quiz;
							var score = Math.ceil((((300 - time_spent)/300)*100)-((5-cA)*20));
							userRef.update({
								"score": udata.val().score + ((score >= 0) ? score : 0)
							}, function() {
								userRef.child("codelabs/"+key).update({
									"end_quiz": end_quiz,
									"cA": cA,
									"score": ((score >= 0) ? score : 0)
								}, function() {
									App.User.codelab = key;
									$(".codelabs [data-codelab-id="+key+"]").removeClass("quiz code")
									if(cA > 3)
										$(".codelabs [data-codelab-id="+key+"]").addClass("done");
									else
										$(".codelabs [data-codelab-id="+key+"]").addClass("fail");
									$(".codelabs [data-codelab-id="+key+"] div:last-child").html('<i class="material-icons"></i>');
									$(".codelabs a.codelab-list").attr("data-codelab-status", "enabled");
									App.User.listCodelabs();
									App.Process.step5();
								});	
							})
						})
					})
				})
			}
		}
	},
	User: {
		codelab: "",
		loggedIn: 0,
		register: function(user) {
			App.Firebase.ref("users/"+user.uid).once("value", function(data) {
				if(!data.exists()) {
					App.Firebase.ref("users/"+user.uid).set({
						displayName: user.displayName,
						photoURL: user.photoURL,
						score: 0
					});	
				}
			});
		},
		updatePoints: function() {
			App.Firebase.ref("users/"+this.loggedIn.uid).on("value", function(data) {
				$("#pointMsg").hide();
				if(data.val().score == 0) {
					$("#pointMsg").show();
				}
				$("#mypoints").html(data.val().score);
				App.User.getRanking();
			})
		},
		getRanking: function() {
			var rank = 0;
			App.Firebase.ref("users").orderByChild("score").on("child_added", function(data) {
				if(data.key == App.User.loggedIn.uid) {
					if(data.val().score == 0) 
						App.User.loadRanking(0);
					else
						App.User.loadRanking(rank);
				}
				if(data.val().score != 0)
					rank++;
			})
		},
		loadRanking(rank) {
			App.Firebase.ref("users").once("value", function(data) {
				var count = 0;
				for(var v in data.val()) {
					if(data.val()[v].score != 0)
						count++;
				}
				if(count - rank == 0) 
					$("#myranking").html("-");
				else
					$("#myranking").html(count-rank);
			})
		},
		CODELAB_TEMPLATE: '<a class="card table middle codelab-list ripple" data-codelab-id="">' +
						'<div class="cell fit">' +
							'<img src="">' +
						'</div>' +
						'<div class="cell">' +
							'<span class="title"></span>' +
						'</div>' +
						'<div class="cell fit nowrap">' +
						'</div>' +
					'</a>',
		listCodelabs() {
			var i = 1;
			$parent = $(".codelabs");
			$disabled = false;
			$parent.html("");
			$.each(App.Codelabs.list, function(key, data) {
				$parent.append(App.User.CODELAB_TEMPLATE);
				$last = $(".codelabs .codelab-list:last-child");
				$last.find("img").attr("src", App.getCodelabImage(key));
				$last.find("span.title").html(data.desc);
				$last.attr("data-codelab-id", key);
				App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+key).once("value", function(data) {
					$codelab = $parent.find(".codelab-list[data-codelab-id="+key+"]");
					function disableCodelab(key) {
						$(".codelabs a.codelab-list:not([data-codelab-id="+key+"])").attr("data-codelab-status", "disabled");
						$(".codelabs a.codelab-list[data-codelab-id="+key+"]").attr("data-codelab-status", "enabled");
					}
					if(data.child("end_quiz").exists()) {
						$codelab.removeClass("code quiz")
						if(data.val()["cA"] > 3)
							$codelab.addClass("done");
						else
							$codelab.addClass("fail");
						$codelab.find("div:last-child").html('<i class="material-icons"></i>');
						var status = "enabled";
						if($disabled)
							status = "disabled";
						$codelab.attr("data-codelab-status", status);
					} else if(data.child("start_quiz").exists()) {
						$codelab.removeClass("code").addClass("quiz");
						$codelab.find("div:last-child").html('<span class="countdown"></span>');
						App.Codelabs.Quiz.init(key);
						$disabled = true;
						disableCodelab(key);
					} else if(data.child("end_time").exists()) {
						$codelab.removeClass("code").addClass("quiz");
						$codelab.find("div:last-child").html('<i class="material-icons"></i>');
						$disabled = true;
						disableCodelab(key);
					} else if (data.child("start_time").exists()) {
						$codelab.find("div:last-child").html('<span class="countdown"></span>');
						$disabled = true;
						disableCodelab(key);
						App.Codelabs.readyCountdown(key);
					} else if(!data.hasChildren()) {
						$codelab.addClass("code").removeClass("quiz");
						$codelab.find("div:last-child").html('<i class="material-icons"></i>');
						var status = "enabled";
						if($disabled)
							status = "disabled";
						$codelab.attr("data-codelab-status", status);
					}
				})

				i++;
			});
		}
	},
	Leaderboard: {
		load: function(codelab) {
			this.getCount(codelab);
		},
		getCount: function(codelab) {
			App.Firebase.ref("users").on("value", function(data) {
				var count = 0;
				$(".ranking").html("");
				for(var v in data.val())
					count++;
				App.Leaderboard.render(count,codelab);
			});
		},
		TEMPLATE: 	'<div class="card rank-list">' +
					'	<div class="table middle">' +
					'		<div class="cell fit"></div>' +
					'		<div class="cell fit"><img src=""></div>' +
					'		<div class="cell"></div>' +
					'		<div class="cell fit right"></div>' +
					'	</div>' +
					'</div>',
		render: function(count,codelab) {
			var rank = 0;
			$parent = $(".ranking");
			$parent.html("")
			var n = 0;
			if(codelab == "all") {
				App.Firebase.ref("users").orderByChild("score").on("child_added", function(data) {
					if(count-rank <= 10 && data.val().score > 0) {
						$parent.prepend(App.Leaderboard.TEMPLATE);
						$el = $(".ranking .rank-list:first-child");
						$el.find(".table .cell:first-child").html(count-rank);
						if(count-rank == 1)
							$el.addClass("first-place").removeClass("second-place third-place");
						else if(count-rank == 2)
							$el.addClass("second-place").removeClass("third-place");
						else if(count-rank == 3) 
							$el.addClass("third-place");
						$el.find(".table .cell:nth-child(3)").html(data.val().displayName);
						$el.find(".table .cell:last-child").html(data.val().score + "pts");
						$el.find("img").attr("src", data.val().photoURL);
						n = 1;
					}
					if(n == 1)
						$("#leaderboardMsg").hide();
					else
						$("#leaderboardMsg").show();
					rank++;
				})
			} else {
				App.Firebase.ref("users").orderByChild("codelabs/"+codelab+"/score").on("child_added", function(data) {
					if(count-rank <= 10 && data.val().codelabs[codelab].score > 0) {
						$parent.prepend(App.Leaderboard.TEMPLATE);
						$el = $(".ranking .rank-list:first-child");
						$el.find(".table .cell:first-child").html(count-rank);
						if(count-rank == 1)
							$el.addClass("first-place").removeClass("second-place third-place");
						else if(count-rank == 2)
							$el.addClass("second-place").removeClass("third-place");
						else if(count-rank == 3) 
							$el.addClass("third-place");
						$el.find(".table .cell:nth-child(3)").html(data.val().displayName);
						$el.find(".table .cell:last-child").html(data.val().score + "pts");
						$el.find("img").attr("src", data.val().photoURL);
						n = 1;
					}
					if(n == 1)
						$("#leaderboardMsg").hide();
					else
						$("#leaderboardMsg").show();
					rank++;
				})
			}
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
			//
			this.addQuestions();
		},
		ref: function(path) {
			return this.database.ref(path);
		},
		addQuestions: function() {
			var qRef = this.ref("questions");
			$.each(App.Codelabs.list, function(key, data) {
				qRef.child(key).once("value", function(snapshot) {
					if(!snapshot.exists()) {
						App.Firebase.ref("s").once("value", function(s) {
							App.Codelabs.list[key].questions.forEach(function(ival, i) {
								qRef.child(key).push({
									question: ival.question,
									choices: ival.choices.join(App.Codelabs.Quiz.CHOICES_SEPARATOR)
								})
							}) 
						})
					}
				})
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
				App.DialogBox.el.html('<div class="wrapper"></div>');
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
		enableCodelabStatus: function(enable = true) {
			if(enable)
				this.el.attr("data-codelab-status", "enabled");
			else
				this.el.attr("data-codelab-status", "disabled");
		},
		getCodelabStatus: function() {
			return this.el.attr("data-codelab-status");
		},
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
			this.el.find(".wrapper").html("");
			this.el.hide();
		},
		disable: function() {
			this.el.css("overflow-y", "hidden");
			this.el.scrollTop(0);
			if(this.el.find(".blur").length == 1)
				this.el.find(".blur").show();
			else
				this.el.append(this.loading);
			if(this.el.find(".wrapper").html() == "")
				this.el.css("height", "200px");
			this.reposition();
		},
		enable: function() {
			this.reposition();
			this.el.find(".blur").hide();
			this.el.css("overflow-y", "scroll");
			this.el.css("height", "auto");
			this.reposition();
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