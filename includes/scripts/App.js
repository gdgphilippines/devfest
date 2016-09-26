var App = {
	xhr: null,
	fl: true,
	viewLoad: false,
	headLoad: false,
	currentPage: "",
	getRandom: function(arr, n) {
		var result = new Array(n),
		len = arr.length,
		taken = new Array(len);
		if (n > len)
			throw new RangeError("getRandom: more elements taken than available");
		while (n--) {
			var x = Math.floor(Math.random() * len);
			result[n] = arr[x in taken ? taken[x] : x];
			taken[x] = --len;
		}
		return result;
	},
	ready: function(page) {
		if(page == "")
			page = "home";
		App.loadController(page);
		App.responsive();
		$(window).scroll(function() {
			var pos = $(window).scrollTop();
			var height = $(".header").outerHeight() - $(".action-bar").outerHeight();
			$(".header .bg").css("opacity", 1-(pos/(height)));
			$(".header .wrapper").css("opacity", 1-(pos/(height)));
			$(".header .black-filter").css("opacity", 1-(pos/(height)));
			if(pos > height) {
				$(".action-bar").addClass("color");
				if(App.currentPage == "home")
					$(".action-bar img.logo").css("opacity", "1")
			} else {
				$(".action-bar").removeClass("color")
				if(App.currentPage == "home")
					$(".action-bar img.logo").css("opacity", "0")
			}
		}).resize(function() {
			App.responsive();
		})
		$(".black-trans, .back").click(function() {
			App.slider("hide");
			$(".speaker-container").css("bottom", "-80%");
		})
		$(".menu").click(function() {
			App.slider("show");
		})
		$("[data-page]").click(function() {
			if(!$(this).is(".selected")) {
				App.loadController($(this).attr("data-page"));
			}
		});

		Input.ready();
	},
	readyChips: function() {
        var colors = ["red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "brown", "gray", "blue-gray"];
        $(".chip").each(function() {
            $icon = $(this).attr("data-icon");
            if(typeof $icon !== typeof undefined && $icon !== false) {
                if($icon == "letter") {
                    $(this).html('<span class="icon '+ colors[Math.floor(Math.random() * colors.length)]+'"></span>' + $(this).html());
                    $(this).find(".icon").text($(this).find("span:not(.icon)").text().charAt(0));
                } else if($icon == "background") {
                    $bg = $(this).attr("data-background");
                    if(typeof $bg !== typeof undefined && $bg !== false) {
                        $(this).html('<span class="icon '+ colors[Math.floor(Math.random() * colors.length)]+'"></span>' + $(this).html());
                        $(this).find(".icon").css({
                            "background-image": "url("+$bg+")"
                        }, 500);
                    }
                }
            }
            $hasButton = $(this).attr("data-hasButton");
            if(typeof $hasButton !== typeof undefined && $hasButton !== false) {
                $(this).append('<a><i class="material-icons">close</i></a>');
            }
            if($(this).find(".icon").length > 0) {
                $(this).addClass("hasIcon");
                $(this).find("span:not(.icon)").addClass("hasIcon");
            }
            if($(this).find("a").length > 0) {
                $(this).addClass("hasButton");
                $(this).find("span:not(.icon)").addClass("hasButton");
            }
        })

        $(".chip a").click(function() {
            $(this).parents(".chip").remove();
        })
	},
	slider: function(action) {
		if(action == "show") {
			$(".slider").animate({
				"left": "0px"
			}, 500);
			$(".black-trans").show();
			$("body").css("overflow", "hidden");
		} else {
			$(".slider").animate({
				"left": "-310px"
			}, 500);
			$(".black-trans").hide();
			$("body").css("overflow", "auto");
		}
	},
	responsive: function() {
		$(".action-bar .nav").show();
		$(".action-bar .menu").hide();
		if($(window).width() < 750) {
			$(".action-bar .nav").hide();
			$(".action-bar .menu").css("display", "table");
		}
	},
	loadSpeaker: function(si) {
		$("body").css("overflow", "hidden");
		$(".black-trans").show();
		$(".speaker-container").scrollTop(0);
		$(".speaker-container").css("bottom", "0px");
		var ss = Data.speakerInfo[si];
		$(".speaker-container .cover").css("background-image", "url(includes/images/speakers/"+ss.img+".jpg)")
		$(".speaker-container .name").html(ss.name);
		$(".speaker-container small").html(ss.title);
		var skillhtml = "";
		$(".speaker-container p").html(ss.bio);
		$(".speaker-container .chips").html("");
		for(var i = 0; i < ss.skills.length; i++) {
			skillhtml += '<div class="chip '+Data.skills[ss.skills[i]].color+'"><span>'+Data.skills[ss.skills[i]].name+'</span></div>';
		}
		$(".speaker-container .chips").html(skillhtml);
		$(".speaker-container .sm").html(((ss.sm.gp != "") ? '<a href="'+ss.sm.gp+'" target="_blank" class="sm"><img src="includes/images/gp.png"></a>' : '') +
						((ss.sm.fb != "") ? '<a href="'+ss.sm.fb+'" target="_blank" class="sm"><img src="includes/images/fb.png"></a>' : '') +
						((ss.sm.tw != "") ? '<a href="'+ss.sm.tw+'" target="_blank" class="sm"><img src="includes/images/tw.png"></a>' : '') +
						((ss.sm.li != "") ? '<a href="'+ss.sm.li+'" target="_blank" class="sm"><img src="includes/images/li.png"></a>' : '') +
						((ss.sm.wb != "") ? '<a href="'+ss.sm.wb+'" target="_blank" class="sm"><img src="includes/images/wb.png"></a>' : ''));
	},
	getSpeakerIndex: function(d) {
		var i = -1;
		$.each(Data.speakerInfo, function(index, speaker) {
			if(d == speaker.img)
				i = index;
		});
		return i;
	},
	getSpeakerData: function(d) {
		var i = false;
		$.each(Data.speakerInfo, function(index, speaker) {
			if(d == speaker.img)
				i = speaker;
		});
		return i;
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
					"top": "200px",
					"opacity": "0"
				}, 500);
				$(".header .wrapper").animate({
					"top": "500px"
				}, 500);
				setTimeout(function() {
					if(controller != "home") {
						$(".action-bar img.logo").css("opacity", "1")
					} else {
						$(".action-bar img.logo").css("opacity", "0")
					}
					$(".view").html($(html).filter("#view")).animate({
						"top": "0px",
						"opacity": "1"
					}, 1500).css("height", "auto");
					$(".header .col-6").html($(html).filter("#header"));
					$(".header .wrapper").animate({
						"top": "0px"
					}, 1500, function() {
						$(".loading").css("top", "-80px");
					});
				}, 750);

			},
			error: function(xhrtemp, ajaxOptions, thrownError) {
				if(xhrtemp.status == 404) {
					App.loadController("home");
				}
			}
		})
	},
	Schedule: {
		//<a onclick="App.loadSpeaker(\'ralph-regalado\')"><span class="chip" data-icon="background" data-background="includes/images/speakers/ralph-regalado.jpg"><span>Ralph Vincent Regalado</span></span></a>
		SPEAKER_TEMPLATE: '',
		TEMPLATE: '<div class="col-12">' +
					'<div class="col-2 t-col-12">' +
						'<span class="time"><span></span><small></small></span>' +
					'</div>' +
					'<div class="col-10 t-col-12">' +
						'<div class="card">' +
							'<div class="filter"></div>' +
							'<div class="wrapper">' +
								'<b></b><br>' +
								'<span class="duration"></span>' +
							'</div>' +
							'<div class="speaker">' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>',
		render: function() {
			$.each(Data.schedule, function(key, data) {
				$(".schedule:not(.parallel)").append(App.Schedule.TEMPLATE);
				$e = $(".schedule:not(.parallel) .col-12:last-child");
				var time = App.Schedule.getHourMinutes(data.start);
				$e.find("span.time span").html(time[0]);
				$e.find("span.time small").html(time[1]);
				$e.find(".wrapper b").html(data.desc);
				$e.find("span.duration").html(App.Schedule.getDuration(data.duration));
				$e.find(".speaker").hide();
				if(data.speaker.length > 0) {
					$e.find(".speaker").show();
					if(data.speaker.length > 1)						
						$e.find(".speaker").append("<b>Speakers</b><br><br>");
					else
						$e.find(".speaker").append("<b>Speaker</b><br><br>");
					$.each(data.speaker, function(sk, sd) {
						var speaker = App.getSpeakerData(sd);
						if(App.getSpeakerIndex(sd) > -1) 
							$e.find(".speaker").append('<a onclick="App.loadSpeaker(\''+App.getSpeakerIndex(sd)+'\')"><span class="chip" data-icon="background" data-background="includes/images/speakers/'+sd+'.jpg"><span>'+speaker.name+'</span></span></a>');
						else
							$e.find(".speaker").append('<span class="chip" data-icon="letter"><span>'+sd+'</span></span>');
					})
				}
				if(data.hasOwnProperty("bg")) {
					$e.find(".filter").show();
					$e.find(".card").addClass("white-text").css({
						"text-shadow": "0px 3px 4px rgba(0,0,0,.2)",
						"background-image": "url("+data.bg+")"
					});
				}
			})


			$.each(Data["parallel-activities"], function(key, data) {
				$(".schedule.parallel").append(App.Schedule.TEMPLATE);
				$e = $(".schedule.parallel .col-12:last-child");
				var time = App.Schedule.getHourMinutes(data.start);
				$e.find("span.time span").html(time[0]);
				$e.find("span.time small").html(time[1]);
				$e.find(".wrapper b").html(data.desc);
				$e.find("span.duration").html(App.Schedule.getDuration(data.duration));
				$e.find(".speaker").hide();
				if(data.hasOwnProperty("speaker")) {
					if(data.speaker.length > 0) {
						$e.find(".speaker").show();
						if(data.speaker.length > 1)						
							$e.find(".speaker").append("<b>Speakers</b><br><br>");
						else
							$e.find(".speaker").append("<b>Speaker</b><br><br>");
						$.each(data.speaker, function(sk, sd) {
							var speaker = App.getSpeakerData(sd);
							if(App.getSpeakerIndex(sd) > -1) 
								$e.find(".speaker").append('<a onclick="App.loadSpeaker(\''+App.getSpeakerIndex(sd)+'\')"><span class="chip" data-icon="background" data-background="includes/images/speakers/'+sd+'.jpg"><span>'+speaker.name+'</span></span></a>');
							else
								$e.find(".speaker").append('<span class="chip" data-icon="letter"><span>'+sd+'</span></span>');
						})
					}
				} else if(data.hasOwnProperty("judges")) {
					if(data.judges.length > 0) {
						$e.find(".speaker").show();
						if(data.judges.length > 1)						
							$e.find(".speaker").append("<b>Judges</b><br><br>");
						else
							$e.find(".speaker").append("<b>Judge</b><br><br>");
						$.each(data.judges, function(sk, sd) {
							var speaker = App.getSpeakerData(sd);
							if(App.getSpeakerIndex(sd) > -1) 
								$e.find(".speaker").append('<a onclick="App.loadSpeaker(\''+App.getSpeakerIndex(sd)+'\')"><span class="chip" data-icon="background" data-background="includes/images/speakers/'+sd+'.jpg"><span>'+speaker.name+'</span></span></a>');
							else
								$e.find(".speaker").append('<span class="chip" data-icon="letter"><span>'+sd+'</span></span>');
						})
					}
				} else if(data.hasOwnProperty("mentors")) {
					var codelabs = ["firebase", "pwa", "vr", "android", "cloud"];
					$e.find(".speaker").show();
					$.each(codelabs, function(ci, cd) {
						if(ci > 0)
							$e.find(".speaker").append("<br>");
						if(cd == "firebase") {
							if(data.mentors[cd].length > 1)						
								$e.find(".speaker").append("<b>Firebase Mentors</b><br><br>");
							else
								$e.find(".speaker").append("<b>Firebase Mentor</b><br><br>");
						} else if(cd == "pwa") {
							if(data.mentors[cd].length > 1)						
								$e.find(".speaker").append("<b>Web Mentors</b><br><br>");
							else
								$e.find(".speaker").append("<b>Web Mentor</b><br><br>");
						} else if(cd == "vr") {
							if(data.mentors[cd].length > 1)						
								$e.find(".speaker").append("<b>VR Mentors</b><br><br>");
							else
								$e.find(".speaker").append("<b>VR Mentor</b><br><br>");
						} else if(cd == "android") {
							if(data.mentors[cd].length > 1)						
								$e.find(".speaker").append("<b>Android Mentors</b><br><br>");
							else
								$e.find(".speaker").append("<b>Android Mentor</b><br><br>");
						} else if(cd == "cloud") {
							if(data.mentors[cd].length > 1)						
								$e.find(".speaker").append("<b>Cloud Mentors</b><br><br>");
							else
								$e.find(".speaker").append("<b>Cloud Mentor</b><br><br>");
						}
						$.each(data.mentors[cd], function(sk, sd) {
							var speaker = App.getSpeakerData(sd);
							if(App.getSpeakerIndex(sd) > -1) 
								$e.find(".speaker").append('<a onclick="App.loadSpeaker(\''+App.getSpeakerIndex(sd)+'\')"><span class="chip" data-icon="background" data-background="includes/images/speakers/'+sd+'.jpg"><span>'+speaker.name+'</span></span></a>');
							else
								$e.find(".speaker").append('<span class="chip" data-icon="letter"><span>'+sd+'</span></span>');
						})
					})
				}
				if(data.hasOwnProperty("bg")) {
					$e.find(".filter").show();
					$e.find(".card").addClass("white-text").css({
						"text-shadow": "0px 3px 4px rgba(0,0,0,.2)",
						"background-image": "url("+data.bg+")"
					});
				}
			})
			App.readyChips();
		},
		getHourMinutes: function(time) {
			var t = [];
			t[0] = time.substring(0,2);
			t[1] = time.substring(2);
			return t;
		},
		getDuration: function(minutes) {
			var hour = 0;
			if(minutes / 60 >= 1) {
				hour = Math.floor(minutes / 60);
				minutes = minutes - (hour * 60);
			}
			return ((hour != 0) ? hour + ((hour == 1) ? " hour " : " hours ") : "") + ((minutes != 0) ? ((hour != 0) ? " " : "") + minutes + ((minutes == 1) ? " minute" : " minutes") : "")
		}
	}
}