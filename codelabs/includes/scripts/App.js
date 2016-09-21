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
					App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+App.User.codelab).once("value", function(data) {
						if(data.val().cA > 3) {
							App.DialogBox.el.find(".wrapper p").html("Congratulations! You earned <b>"+data.val().score+" points</b> in this codelab.<br><br>Time elapsed on this quiz is "+App.Codelabs.getTimeRemaining(data.val().end_quiz - data.val().start_quiz));
						} else {
							App.DialogBox.el.find(".wrapper p").html("Sorry! You failed the quiz but you earned <b>"+data.val().score+" points</b> in this codelab.<br><br>Time elapsed on this quiz is "+App.Codelabs.getTimeRemaining(data.val().end_quiz - data.val().start_quiz));
							App.DialogBox.el.find("#restartCodelab, span.message").show();
						}
					})
					App.DialogBox.enable();
				},
				error: function(xhrtemp, ajaxOptions, thrownError) {
					App.Process.onError(xhrtemp, ajaxOptions, thrownError);
				}
			})
		}
	},
	Codelabs: {
		list: {
			"android-1": {
				url: "https://codelabs.developers.google.com/codelabs/android-doze-standby/index.html?index=..%2F..%2Findex#0",
				desc: "Get your app ready for Doze and App Standby",
				time: 5,
				questions: [
					{
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}
				]
			},
			"firebase-1": {
				url: "",
				desc: "Lorem ipsum dolor sit amet1.",
				time: 5,
				questions: [
					{
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}
				]
			},
			"firebase-2": {
				url: "",
				desc: "Lorem ipsum dolor sit amet2.",
				time: 5,
				questions: [
					{
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
					}, {
						question: "Question 1",
						choices: ["choice1", "choice2", "choice3", "choice4"]
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
			"CHOICES_SEPARATOR": "//",
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
									var decrypt = CryptoJS.AES.decrypt(choices[rand], s.val()).toString(CryptoJS.enc.Utf8);
									$last.find(".options label:nth-child("+(5-i)+") input").attr("value", decrypt).attr("name", "q"+(index+1));
									if(answerList[index] == decrypt) {
										$last.find(".options label:nth-child("+(5-i)+") input").attr("checked", "checked");
										$last.find(".options label:nth-child("+(5-i)+") input").prop("checked", true);
									} else {
										$last.find(".options label:nth-child("+(5-i)+") input").removeAttr("checked");
										$last.find(".options label:nth-child("+(5-i)+") input").prop("checked", false);
									}
									$last.find(".options label:nth-child("+(5-i)+") span.desc").html(decrypt);
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
								if(CryptoJS.AES.decrypt(cQ.val()[ucdata.val().questions[q].question].choices.split(App.Codelabs.Quiz.CHOICES_SEPARATOR)[0], s.val()).toString(CryptoJS.enc.Utf8) == ucdata.val().questions[q].answer)
									cA++;
							}
							var start_quiz = ucdata.val()["start_quiz"];
							end_quiz = ((end_quiz !== false) ? end_quiz : App.Codelabs.list[key].end_quiz);
							var time_spent = end_quiz - start_quiz;
							var score = Math.ceil((((300 - time_spent)/300)*100)-((5-cA)*20));
							userRef.update({
								"score": udata.val().score + score
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
				console.log("WOO");
				console.log(data.key);
				console.log(data.val());
				if(data.key == App.User.loggedIn.uid)
					App.User.loadRanking(rank);
				rank++;
			})
		},
		loadRanking(rank) {
			App.Firebase.ref("users").once("value", function(data) {
				var count = 0;
				for(var v in data.val()) {
					count++;
					console.log(v);
				}
				$("#myranking").html(count-rank);
			})
		}
	},
	Leaderboard: {
		load: function() {
			this.getCount();
		},
		getCount: function() {
			App.Firebase.ref("users").on("value", function(data) {
				var count = 0;
				for(var v in data.val())
					count++;
				App.Leaderboard.render(count);
			});
		},
		render: function(count) {
			var rank = 0;
			$parent = $(".ranking");
			$template = $parent.children(".rank-list");
			$clone = false;
			var n = 0;
			App.Firebase.ref("users").orderByChild("score").on("child_added", function(data) {
				if(count-rank <= 10 && data.val().score > 0) {
					if(!$clone)
						$clone = true;
					else
						$parent.prepend($template.clone());
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
				rank++;
			})
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
								var choices = [];
								ival.choices.forEach(function(jval, j) {
									choices.push(CryptoJS.AES.encrypt(jval, s.val()));
								});
								qRef.child(key).push({
									question: ival.question,
									choices: choices.join(App.Codelabs.Quiz.CHOICES_SEPARATOR)
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