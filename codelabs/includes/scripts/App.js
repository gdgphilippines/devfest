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
		$(".action-bar img.logo").css("opacity", "1"); 
		$(window).resize(function() {
			App.responsive(); 
			App.DialogBox.responsive(); 
		}); 
		$(".black-trans, .back").click(function() {
			if($(".slider").css("left") == "0px") {
				App.slider("hide"); 
			} else if(!App.DialogBox.isEnabled()) {
				if (typeof App.DialogBox.el.attr("data-can-close") !== typeof undefined && 
						   App.DialogBox.el.attr("data-can-close") !== false) {
					if(App.DialogBox.el.attr("data-can-close") == "true") 
						App.DialogBox.hide(); 
				} else 
					App.DialogBox.hide(); 
				} 
			});
		$(".menu").click(function() {
			App.slider("show");
		});
		$(".back").click(function() {
			App.slider("hide");
		});
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
		$(document).on("click", "a#selectChapter", function() {
			App.DialogBox.disable();
			var chapter = $("input[name=chapter]:checked").val();
			if(chapter != "-") {
				App.Firebase.ref("users/"+App.User.loggedIn.uid).update({
					"chapter": chapter
				}, function() {
					App.DialogBox.hide();
					App.DialogBox.el.attr("data-can-close", "true");
					App.User.updatePoints();
				});
			}
		});
		$(document).on("click", "a[data-codelab-id][data-codelab-status]", function() {
			var key = $(this).attr("data-codelab-id");
			$status = $(this).attr("data-codelab-status");
			App.DialogBox.el.attr("data-codelab-status", $status);
			App.User.codelab = key;
			App.Firebase.ref("users").child(App.User.loggedIn.uid+"/codelabs/"+key).once("value", function(data) {
				if(data.child("end_quiz").exists())
					App.Process.step5();
				else if(data.child("start_quiz").exists())
					App.Process.step4();
				else if(data.child("end_time").exists())
					App.Process.step3();
				else if (data.child("start_time").exists())
					App.Process.step2();
				else if(!data.hasChildren())
					App.Process.step1();
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
		        }, 650);
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
			});
		});
		$(document).on("click", "#startQuiz", function() {
			App.DialogBox.disable();
			$.ajax({
				"url": "http://www.timeapi.org/utc/now.json?callback=?",
				cache: true,
				dataType: 'jsonp',
				success: function(json) {
					var userQuestionsRef = App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+App.User.codelab+"/questions");
					App.Firebase.ref("codelabs/"+App.User.codelab+"/questions").once("value", function(value) {
						var questionList = [];
						for(var v in value.val())
							questionList.push(v);
						var done = 0;
						for(var i = 10; i >= 6; i--) {
							var rand = Math.floor(Math.random() * i);
							userQuestionsRef.push({
								question: questionList[rand],
								answer: ""
							}, function() {
								done++;
							});
							questionList.splice(rand, 1);
						}
						var checkifdone = setInterval(function() {
							if(done == 5) {
								clearInterval(checkifdone);
								var date = new Date(json.dateString);
								var utc = new Date(date.getTime() + date.getTimezoneOffset());
								App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+App.User.codelab).update({
									"start_quiz": Math.round(utc.getTime()/1000)
								}, function() {
									App.Process.step4();
								});
							}
						}, 1000)
					});
				}
			});
		});
		$(document).on("click", "#submitQuiz", function() {
			App.DialogBox.disable();
			App.Codelabs.Quiz.finish(App.User.codelab, true);
		});
		$(document).on("click", "#restartCodelab", function() {
			App.DialogBox.disable();
			var userRef = App.Firebase.ref("users/"+App.User.loggedIn.uid);
			App.Firebase.ref("codelabs/"+App.User.codelab).once("value", function(data) {
				userRef.once("value", function(userdata) {
					var clS = userdata.val().codelabs[App.User.codelab].score;
					var uS = userdata.val().score;
					var gtech = data.val().tech;
					var gscore = userdata.val()[gtech];
					var updates = {
						"score": uS - clS
					};
					updates[gtech] = gscore - clS;
					userRef.update(updates, function() {
						userRef.child("codelabs/"+App.User.codelab).remove(function() {
							$("a.codelab-list[data-codelab-id="+App.User.codelab+"]")
								.removeClass("done fail").addClass("code");
							App.Process.step1();
						});
					});
				});
			});
		});
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
					}, 1500).css("height", "auto");
				}, 750);
			},
			error: function(xhrtemp, ajaxOptions, thrownError) {
				if(xhrtemp.status == 404) {
					App.loadController("home");
				}
			}
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
			});
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
					App.Firebase.ref("codelabs/"+App.User.codelab).once("value", function(data) {
						App.DialogBox.el.find(".wrapper").html(html);
						App.DialogBox.el.find(".wrapper img").attr("src", App.getCodelabImage(App.User.codelab));
						App.DialogBox.el.find(".wrapper span.title").html(data.val().desc);
						App.DialogBox.el.find(".wrapper p").html("You have <b>" + App.Codelabs.getTimeRemaining(data.val().time) + "</b> to finish the codelab and to unlock the quiz.");
						App.DialogBox.enable();
						if(App.DialogBox.getCodelabStatus() == "disabled") {
							App.DialogBox.el.find("a").removeAttr("id");
							App.DialogBox.el.find("span.message").html("You can't start this codelab because you have a codelab in progress.");
						}
					})
				},
				error: function(xhrtemp, ajaxOptions, thrownError) {
					App.Process.onError(xhrtemp, ajaxOptions, thrownError);
				}
			});
		},
		step2: function() {
			App.DialogBox.show();
			App.DialogBox.disable();
			$("#listCodelabs a.codelab-list:not([data-codelab-id="+App.User.codelab+"])").attr("data-codelab-status", "disabled");
			$("#listCodelabs a.codelab-list[data-codelab-id="+App.User.codelab+"]").attr("data-codelab-status", "enabled");
			$.ajax({
				url: "views/codelab_2.html",
				cache: true,
				success: function(html) {
					App.Firebase.ref("codelabs/"+App.User.codelab).once("value", function(data) {
						App.DialogBox.el.find(".wrapper").html(html);
						App.DialogBox.el.find(".wrapper img").attr("src", App.getCodelabImage(App.User.codelab));
						App.DialogBox.el.find(".wrapper span.title").html(data.val().desc);
						App.DialogBox.el.find(".wrapper a").attr("href", data.val().url);
						App.DialogBox.enable();
						App.Codelabs.readyCountdown(App.User.codelab);
					})
				},
				error: function(xhrtemp, ajaxOptions, thrownError) {
					App.Process.onError(xhrtemp, ajaxOptions, thrownError);
				}
			});
			$("a.codelab-list[data-codelab-id="+App.User.codelab+"] div:last-child").html('<span class="countdown"></span>');
		},
		step3: function() {
			App.DialogBox.show();
			App.DialogBox.disable();
			$.ajax({
				url: "views/codelab_3.html",
				cache: true,
				success: function(html) {
					App.Firebase.ref("codelabs/"+App.User.codelab).once("value", function(data) {
						App.DialogBox.el.find(".wrapper").html(html);
						App.DialogBox.el.find(".wrapper img").attr("src", App.getCodelabImage(App.User.codelab));
						App.DialogBox.el.find(".wrapper span.title").html(data.val().desc);
						App.DialogBox.enable();
					})
				},
				error: function(xhrtemp, ajaxOptions, thrownError) {
					App.Process.onError(xhrtemp, ajaxOptions, thrownError);
				}
			});
		},
		step4: function() {
			App.DialogBox.show();
			App.DialogBox.disable();
			$.ajax({
				url: "views/codelab_4.html",
				cache: false,
				success: function(html) {
					App.Firebase.ref("codelabs/"+App.User.codelab).once("value", function(data) {
						App.DialogBox.el.find(".wrapper").html(html);
						App.DialogBox.el.find(".wrapper img").attr("src", App.getCodelabImage(App.User.codelab));
						App.DialogBox.el.find(".wrapper span.title").html(data.val().desc);
						App.Codelabs.Quiz.init(App.User.codelab);
						App.Codelabs.Quiz.displayQuestions(App.User.codelab);
					})
				},
				error: function(xhrtemp, ajaxOptions, thrownError) {
					App.Process.onError(xhrtemp, ajaxOptions, thrownError);
				}
			});
			$("a.codelab-list[data-codelab-id="+App.User.codelab+"] div:last-child").html('<span class="countdown"></span>');
		},
		step5: function() {
			App.DialogBox.show();
			App.DialogBox.disable();
			$("#listCodelabs a.codelab-list").attr("data-codelab-status", "enabled");
			$.ajax({
				url: "views/codelab_5.html",
				cache: true,
				success: function(html) {
					App.Firebase.ref("codelabs/"+App.User.codelab).once("value", function(data) {
						App.DialogBox.el.find(".wrapper").html(html);
						App.DialogBox.el.find(".wrapper img").attr("src", App.getCodelabImage(App.User.codelab));
						App.DialogBox.el.find(".wrapper span.title").html(data.val().desc);
						App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+App.User.codelab).once("value", function(ucdata) {
							App.DialogBox.el.find(".wrapper p").html("Congratulations! You earned <b>"+ucdata.val().score+" points</b> in this codelab.<br><br>Time elapsed on this quiz is "+App.Codelabs.getTimeRemaining(ucdata.val().end_quiz - ucdata.val().start_quiz));
							var cQ = data.child("questions");
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
						});
					});
				},
				error: function(xhrtemp, ajaxOptions, thrownError) {
					App.Process.onError(xhrtemp, ajaxOptions, thrownError);
				}
			});
		}
	},
	Codelabs: {
		readyCountdown: function(key) {
			this.getStartTime(key);
		},
		getStartTime: function(key) {
			App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+key+"/start_time").once("value", function(data) {
				App.Codelabs.start_time = data.val();
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
			App.Firebase.ref("codelabs/"+key).once("value", function(data) {
				App.Codelabs.end_time = App.Codelabs.start_time + data.val().time;
				App.Codelabs.remaining = App.Codelabs.end_time - App.Codelabs.now;
				if(!App.Codelabs.interval)
					App.Codelabs.interval = setInterval(function() {
						$("a.codelab-list[data-codelab-id="+key+"] span.countdown").html(App.Codelabs.getTimeRemaining(App.Codelabs.remaining, true));
						$(".dialog-box span.countdown").html(App.Codelabs.getTimeRemaining(App.Codelabs.remaining));
						App.Codelabs.remaining--;
						if(App.Codelabs.remaining < 0)
							App.Codelabs.finish(key);
					}, 1000);
			});
		},
		finish: function(key) {
			clearInterval(this.interval);
			this.interval = false;
			App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+key).update({
				"end_time": App.Codelabs.end_time
			}, function() {
				App.User.codelab = key;
				$("#listCodelabs [data-codelab-id="+key+"]").removeClass("code").addClass("quiz");
				$("#listCodelabs [data-codelab-id="+key+"] div:last-child").html('<i class="material-icons"></i>');
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
					App.Firebase.ref("codelabs/"+key+"/questions").once("value", function(cQ) {
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
						});
						$(".dialog-box input").change(function() {
							$qID = $(this).parents(".row").attr("data-question-id");
							$val = $(this).val();
							if(this.checked) {
								App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+key+"/questions/"+$qID).update({
									"answer": $val
								});
							}
						});
						App.DialogBox.enable();
					});
				});
			},
			getStartTime: function(key) {
				App.Firebase.ref("users/"+App.User.loggedIn.uid+"/codelabs/"+key+"/start_quiz").once("value", function(data) {
					App.Codelabs.start_quiz = data.val();
					App.Codelabs.getTimeNow(key, "quiz");
				});
			},
			start: function(key) {
				App.Codelabs.end_quiz = App.Codelabs.start_quiz + this.TIME_PER_QUIZ;
				App.Codelabs.remaining = App.Codelabs.end_quiz - App.Codelabs.now;
				if(!App.Codelabs.interval) {
					App.Codelabs.interval = setInterval(function() {
						$("a.codelab-list[data-codelab-id="+key+"] span.countdown").html(App.Codelabs.getTimeRemaining(App.Codelabs.remaining, true));
						$(".dialog-box span.countdown").html(App.Codelabs.getTimeRemaining(App.Codelabs.remaining));
						App.Codelabs.remaining--;
						if(App.Codelabs.remaining < 0)
							App.Codelabs.Quiz.finish(key);
					}, 1000);
				}
			},
			finish: function(key, end_quiz = false) {
				clearInterval(App.Codelabs.interval);
				App.Codelabs.interval = false;
				var userRef = App.Firebase.ref("users/"+App.User.loggedIn.uid);
				App.Firebase.ref("codelabs/"+key).once("value", function(data) {
					userRef.once("value", function(udata) {
						var ucdata = udata.child("codelabs/"+key);
						var cQ = data.child("questions");
						var cA = 0;
						for(var q in ucdata.val().questions) {
							if(cQ.val()[ucdata.val().questions[q].question].choices.split(App.Codelabs.Quiz.CHOICES_SEPARATOR)[0] == ucdata.val().questions[q].answer)
								cA++;
						}
						var start_quiz = ucdata.val()["start_quiz"];
						end_quiz = ((end_quiz != false) ? App.Codelabs.end_quiz-App.Codelabs.remaining : App.Codelabs.end_quiz);
						var time_spent = (end_quiz - start_quiz - 1 > 300) ? 300 : end_quiz - start_quiz - 1;
						var score = Math.ceil((((300 - time_spent)/300)*((50)*(cA/5)))+(((cA*20)/100)*50));
						var updates = {
							"score": udata.val().score + ((score >= 0) ? score : 0)
						};
						updates[data.val().tech] = udata.val()[data.val().tech] + ((score >= 0) ? score : 0);
						userRef.update(updates, function() {
							userRef.child("codelabs/"+key).update({
								"end_quiz": end_quiz,
								"cA": cA,
								"score": ((score >= 0) ? score : 0)
							}, function() {
								App.User.codelab = key;
								$("#listCodelabs [data-codelab-id="+key+"]").removeClass("quiz code")
								if(cA > 3)
									$("#listCodelabs [data-codelab-id="+key+"]").addClass("done");
								else
									$("#listCodelabs [data-codelab-id="+key+"]").addClass("fail");
								$("#listCodelabs [data-codelab-id="+key+"] div:last-child").html('<i class="material-icons"></i>');
								$("#listCodelabs a.codelab-list").attr("data-codelab-status", "enabled");
								App.User.listCodelabs();
								App.Process.step5();
							});	
						});
					});
				});
			}
		}
	},
	User: {
		codelab: "",
		loggedIn: 0,
		checkScore: function() {
			App.Firebase.ref("users/"+App.User.loggedIn.uid).once("value", function(user) {
				var local = {
					score: 0,
					firebase: 0,
					web: 0,
					android: 0,
					cloud: 0,
					vr: 0
				}
				var techs = ["android", "cloud", "firebase", "vr", "web"];
				App.Firebase.ref("codelabs").once("value", function(codelab) {
					$.each(user.val().codelabs, function(key, data) {
						if(data.hasOwnProperty("score")) {
							local[codelab.val()[key].tech] += data.score;
							local.score += data.score;
						}
					});
					var update = false;
					$.each(techs, function(key, data) {
						if(user.val()[data] != local[data])
							update = true;
					})
					if(user.val().score != local.score)
						update = true;
					if(update) 
						App.Firebase.ref("users/"+App.User.loggedIn.uid).update(local);
				})
			})
		},
		register: function(user) {
			App.Firebase.ref("users/"+user.uid).once("value", function(data) {
				if(!data.child("displayName").exists()) {
					App.Firebase.ref("users/"+user.uid).set({
						displayName: user.displayName,
						photoURL: user.photoURL,
						codelabs: 0,
						score: 0,
						web: 0,
						firebase: 0,
						vr: 0,
						android: 0,
						cloud: 0
					});	
				}
			});
		},
		updatePoints: function() {
			this.checkScore();
			$(".loading").css("top", "80px");
			App.Firebase.ref("users/"+this.loggedIn.uid).on("value", function(data) {
				$("#pointMsg").hide();
				if(data.val().score == 0)
					$("#pointMsg").show();
				$("#mypoints").html(data.val().score);
			});
			this.getRanking();
		},
		/*addGDGPhilippines: function() {
			App.Firebase.ref("users").once("value", function(users) {
				for(var uid in users.val()) {
					console.log(uid);
					var user = users.val()[uid];
					if(!user.hasOwnProperty("chapter")) {
						App.Firebase.ref("users/"+uid).update({
							"chapter": "GDG Philippines"
						})
					}
				}
			});
		},
		fixUserScore: function() {
			var toUpdate = 0;
			var updated = 0;
			App.Firebase.ref("codelabs").once("value", function(codelabs) {
				App.Firebase.ref("users").once("value", function(users) {
					for(var uid in users.val()) {
						console.log(uid);
						var local = {
							score: 0,
							firebase: 0,
							web: 0,
							android: 0,
							cloud: 0,
							vr: 0
						}
						var user = users.val()[uid];
						console.log(user);
						for(var j in user.codelabs) {
							if(user.codelabs[j].hasOwnProperty("score")) {
								local[codelabs.val()[j].tech] += user.codelabs[j].score;
								local.score += user.codelabs[j].score;
							}
						}
						toUpdate++;
						console.log("To update: " + toUpdate + " || Updated: " + updated);
						App.Firebase.ref("users/"+uid).update(local, function() {
							updated++;
							console.log("To Update: " + toUpdate + " || Updated: " + updated);
						});
					}
				});
			});
		},
		fixCodelabScore: function() {
			var toUpdate = 0;
			var updated = 0;
			App.Firebase.ref("codelabs").once("value", function(codelabs) {
				App.Firebase.ref("users").once("value", function(users) {
					for(var uid in users.val()) {
						console.log(uid);
						var user = users.val()[uid];
						for(var j in user.codelabs) {
							if(user.codelabs[j].hasOwnProperty("score")) {
								console.log(j);
								console.log(user.codelabs[j]);
								var cA = 0;
								for(var k in user.codelabs[j].questions) {
									// console.log("User Answer: " + user.codelabs[j].questions[k].answer);
									// console.log("Question Key: " + user.codelabs[j].questions[k].question);
									// console.log("Correct Answer: " + codelabs.val()[j].questions[user.codelabs[j].questions[k].question].choices.split(App.Codelabs.Quiz.CHOICES_SEPARATOR)[0]);
									if(user.codelabs[j].questions[k].answer == codelabs.val()[j].questions[user.codelabs[j].questions[k].question].choices.split(App.Codelabs.Quiz.CHOICES_SEPARATOR)[0])
										cA++;
								}
								var time_spent = (user.codelabs[j].end_quiz - user.codelabs[j].start_quiz - 1 > 300) ? 300 : user.codelabs[j].end_quiz - user.codelabs[j].start_quiz - 1;
								var score = Math.ceil((((300 - time_spent)/300)*((50)*(cA/5)))+(((cA*20)/100)*50));
								var update = {
									"cA": cA,
									"score": score
								};

								toUpdate++;
								console.log("To update: " + toUpdate + " || Updated: " + updated);
								App.Firebase.ref("users/"+uid+"/codelabs/"+j).update(update, function() {
									updated++;
									console.log("To Update: " + toUpdate + " || Updated: " + updated);
								});
								if(!user.codelabs[j].hasOwnProperty("questions")) {
									console.log("Removed " + uid + " " + j);
									App.Firebase.ref("users/"+uid+"/codelabs/"+j).remove();
								}
							}
						}
					}
				});
			});
		},
		cleanDB: function() {
			function isExist(array, find) {
				for(var x in array) {
					if(array[x] == find)
						return true;
				}
				return false;
			}
			var toDelete = 0;
			var deleted = 0;
			App.Firebase.ref("users").once("value", function(users) {
				for(var uid in users.val()) {
					console.log(uid);
					var user = users.val()[uid];
					for(var j in user.codelabs) {
						if(user.codelabs[j].hasOwnProperty("questions")) {
							// var tempQ = [];
							// console.log(codelab.questions);
							// // get current questions
							// for(var k in codelab.questions) {
							// 	var qID = codelab.questions[k];
							// 	tempQ.push(qID.question);
							// }
							console.log("original");
							console.log(user.codelabs[j]);
							var q = [];
							var duplicate = [];
							// remove duplicate questions
							for(var k in user.codelabs[j].questions) {
								var qID = user.codelabs[j].questions[k].question;
								if(!isExist(q, qID))
									q.push(qID);
								else 
									duplicate.push(k);
							}
							for(var k in duplicate) {
								delete user.codelabs[j].questions[duplicate[k]];
							}
							console.log("remove duplicate");
							console.log(user.codelabs[j]);

							// get 5 questions
							var count = 0;
							for(var k in user.codelabs[j].questions) {
								if(count > 4)
									delete user.codelabs[j].questions[k];
								count++;
							}
							console.log("get 5 questions");
							console.log(user.codelabs[j]);
							console.log("--");


							// delete questions
							toDelete++;
							console.log("To Delete: " + toDelete + " || Deleted: " + deleted);
							App.Firebase.ref("users/"+uid+"/codelabs/"+j).set(user.codelabs[j], function() {
								deleted++;
								console.log("To Delete: " + toDelete + " || Deleted: " + deleted);
							});



						}
					}
				}
			});
		},*/
		getRanking: function() {
			var rank = 0;
			App.Firebase.ref("users/"+App.User.loggedIn.uid+"/chapter").once("value", function(userChapter) {
				App.Firebase.ref("users").orderByChild("score").on("child_added", function(data) {
					if(data.child("chapter").exists()) {
						if(data.val().chapter == userChapter.val()) {
							if(data.key == App.User.loggedIn.uid) {
								if(data.val().score == 0) 
									App.User.loadRanking(-1);
								else
									App.User.loadRanking(rank);
							}
							if(data.val().score != 0)
								rank++;
						}
					}
				});
			});
		},
		loadRanking(rank) {
			App.Firebase.ref("users/"+App.User.loggedIn.uid+"/chapter").once("value", function(userChapter) {
				App.Firebase.ref("users").once("value", function(data) {
					var count = 0;
					for(var v in data.val()) {
						if(data.val()[v].chapter == userChapter.val() && data.val()[v].score != 0)
							count++;
					}
					$("#myranking").html("-");
					if(rank >= 0)
						$("#myranking").html(count-rank);
					App.User.listCodelabs();
				});
			});
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
		listCodelabs: function() {
			var i = 1;
			var parent = $("#listCodelabs");
			$disabled = false;
			parent.html("");
			App.Firebase.ref("users/"+App.User.loggedIn.uid).once("value", function(data) {
				App.Firebase.ref("codelabs/").once("value", function(codelabs) {
					var list = [];
					for(var codelab in codelabs.val())
						list.push(codelab);
					$.each(list, function(key, datax) {
						parent.append(App.User.CODELAB_TEMPLATE);
						$last = $("#listCodelabs .codelab-list:last-child");
						$last.find("img").attr("src", App.getCodelabImage(datax));
						$last.find("span.title").html(codelabs.val()[datax].desc);
						$last.attr("data-codelab-id", datax);
						$codelab = parent.find(".codelab-list[data-codelab-id="+datax+"]");
						function disableCodelab(datax) {
							$("#listCodelabs a.codelab-list:not([data-codelab-id="+datax+"])").attr("data-codelab-status", "disabled");
							$("#listCodelabs a.codelab-list[data-codelab-id="+datax+"]").attr("data-codelab-status", "enabled");
						}
						if(data.child("codelabs/"+datax+"/end_quiz").exists()) {
							$codelab.removeClass("code quiz");
							if(data.val().codelabs[datax]["cA"] > 3)
								$codelab.addClass("done");
							else
								$codelab.addClass("fail");
							$codelab.find("div:last-child").html('<i class="material-icons"></i>');
							var status = "enabled";
							if($disabled)
								status = "disabled";
							$codelab.attr("data-codelab-status", status);
						} else if(data.child("codelabs/"+datax+"/start_quiz").exists()) {
							$codelab.removeClass("code").addClass("quiz");
							$codelab.find("div:last-child").html('<span class="countdown"></span>');
							App.Codelabs.Quiz.init(datax);
							$disabled = true;
							disableCodelab(datax);
						} else if(data.child("codelabs/"+datax+"/end_time").exists()) {
							$codelab.removeClass("code").addClass("quiz");
							$codelab.find("div:last-child").html('<i class="material-icons"></i>');
							$disabled = true;
							disableCodelab(datax);
						} else if (data.child("codelabs/"+datax+"/start_time").exists()) {
							$codelab.find("div:last-child").html('<span class="countdown"></span>');
							$disabled = true;
							disableCodelab(datax);
							App.Codelabs.readyCountdown(datax);
						} else if(!data.child("codelabs/"+datax).hasChildren()) {
							$codelab.addClass("code").removeClass("quiz");
							$codelab.find("div:last-child").html('<i class="material-icons"></i>');
							var status = "enabled";
							if($disabled)
								status = "disabled";
							$codelab.attr("data-codelab-status", status);
						}
						i++;
					});
					$(".loading").css("top", "-80px");
				});
			});
		}
	},
	Leaderboard: {
		load: function(codelab) {
			if(!codelab)
				codelab = "score";
			this.getCount(codelab);
		},
		TEMPLATE: 	'<div class="card rank-list">' +
					'	<div class="table middle">' +
					'		<div class="cell fit"></div>' +
					'		<div class="cell fit"><img src=""></div>' +
					'		<div class="cell"></div>' +
					'		<div class="cell fit right"></div>' +
					'	</div>' +
					'</div>',
		getCount: function(codelab) {
			App.Firebase.ref("users/"+App.User.loggedIn.uid+"/chapter").once("value", function(userChapter) {
				App.Firebase.ref("users").once("value", function(data) {
					var count = 0;
					for(var u in data.val()) {
						if(data.val()[u].chapter == userChapter.val())
							count++;
					}
					App.Leaderboard.render(count, codelab);
				});
			});
		},
		render: function(count, codelab) {
			$parent = $(".ranking");
			$parent.html("");
			var n = 0;
			var rank = 0;
			App.Firebase.ref("users/"+App.User.loggedIn.uid+"/chapter").once("value", function(userChapter) {
				App.Firebase.ref("users").orderByChild(codelab).on("child_added", function(data) {
					if(data.val().chapter == userChapter.val()) {
						if(count-rank <= 10 && data.val()[codelab] > 0) {
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
							$el.find(".table .cell:last-child").html(data.val()[codelab] + "pts");
							$el.find("img").attr("src", data.val().photoURL);
							n = 1;
						}
						if(n == 1)
							$("#leaderboardMsg").hide();
						else
							$("#leaderboardMsg").show();
							rank++;
					}
				});
				$(".loading").css("top", "-80px");
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
	},
	Chapter: {
		load: function() {
			this.getCount();
		},
		TEMPLATE: 	'<div class="card rank-list">' +
					'	<div class="table middle">' +
					'		<div class="cell fit"></div>' +
					'		<div class="cell fit"><img src=""></div>' +
					'		<div class="cell"></div>' +
					'		<div class="cell fit right"></div>' +
					'	</div>' +
					'</div>',
		getCount: function() {

			App.Firebase.ref("users/"+App.User.loggedIn.uid+"/chapter").once("value", function(userChapter) {
				App.Firebase.ref("users").on("value", function(data) {
					var count = 0;
					for(var u in data.val())
						if(data.val()[u]["chapter"] == userChapter.val())
							count++;
					App.Chapter.render(count);
				});
			});
		},
		render: function(count) {
			$(".ranking").html("");
			$(".ranking-2").html("");
			var n = 0;
			var rank = 0;
			App.Firebase.ref("users/"+App.User.loggedIn.uid+"/chapter").once("value", function(userChapter) {
				App.Firebase.ref("users").orderByChild("score").on("child_added", function(data) {
					if(data.val()["chapter"] == userChapter.val()) {
						$parent = $(".ranking");
						$parent.prepend(App.Leaderboard.TEMPLATE);
						$el = $parent.find(".rank-list:first-child");
						$el.find(".table .cell:first-child").html(count-rank);
						if(count-rank == 1)
							$el.addClass("first-place").removeClass("second-place third-place");
						else if(count-rank == 2)
							$el.addClass("second-place").removeClass("third-place");
						else if(count-rank == 3) 
							$el.addClass("third-place");
						if(data.val()["score"] == 0)
							$el.addClass("disabled");
						$el.find(".table .cell:nth-child(3)").html(data.val().displayName);
						$el.find(".table .cell:last-child").html(data.val()["score"] + "pts");
						$el.find("img").attr("src", data.val().photoURL);
						n = 1;
					}
					if(n == 1)
						$("#leaderboardMsg").hide();
					else
						$("#leaderboardMsg").show();
					if(data.val()["chapter"] == userChapter.val())
						rank++;
					$(".loading").css("top", "-80px");
				});
			});
		}
	},
	All: {
		load: function() {
			this.getCount();
		},
		TEMPLATE: 	'<div class="card rank-list">' +
					'	<div class="table middle">' +
					'		<div class="cell fit"></div>' +
					'		<div class="cell fit"><img src=""></div>' +
					'		<div class="cell"></div>' +
					'		<div class="cell fit right"></div>' +
					'	</div>' +
					'</div>',
		getCount: function() {
			var callback = function(data) {
				var count = 0;
				for(var u in data.val())
					count++;
				App.All.render(count);
			};

			App.Firebase.ref("users").on("value", callback);
		},
		render: function(count) {
			$(".ranking").html("");
			$(".ranking-2").html("");
			var n = 0;
			var rank = 0;
			App.Firebase.ref("users").orderByChild("score").on("child_added", function(data) {
				$parent = $(".ranking");
				$parent.prepend(App.Leaderboard.TEMPLATE);
				$el = $parent.find(".rank-list:first-child");
				$el.find(".table .cell:first-child").html(count-rank);
				if(count-rank == 1)
					$el.addClass("first-place").removeClass("second-place third-place");
				else if(count-rank == 2)
					$el.addClass("second-place").removeClass("third-place");
				else if(count-rank == 3) 
					$el.addClass("third-place");
				if(data.val()["score"] == 0)
					$el.addClass("disabled");
				$el.find(".table .cell:nth-child(3)").html(data.val().displayName+'<span class="chapter-name">'+data.val().chapter+'</span>');
				$el.find(".table .cell:last-child").html(data.val()["score"] + "pts");
				$el.find("img").attr("src", data.val().photoURL);
				$("#leaderboardMsg").hide();
				rank++;
				$(".loading").css("top", "-80px");
			});
		}
	}
}