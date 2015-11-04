$(document).ready(function() {
	var animated = "animated zoomIn";
	var iFrog = {
		init: function() {
			this.selectBox();
			this.initEvents();
		},
		selectBox: function() {
			$("select").selectOrDie();
			this.onChangeAge();
		},
		onChangeAge: function() {
			var range = $("input[type=range]"),
				ageResult = $(".age_result"),
				self = this;
			range.on("input", function() {
				ageResult.html(this.value);
				self.userData.age = this.value || "50";
			});
		},
		userData: {},
		getData: function() {
			this.userData.user_name = $("#name").val() || "Вася",
			this.userData.sex = $("#sex").val() || "Мужчина",
			this.userData.like = $("input[name=like]:checked").val() || "Коты";
		},
		popups: function() {
			return {
				greeting: $(".greeting"),
				user_data: $(".user_data"),
				result: $(".result")
			};
		},
		hidePopups: function() {
			var obj = this.popups();
			for(var i in obj) {
				if(obj.hasOwnProperty(i)) {
					obj[i].find("button").off("click");
					obj[i].removeClass(animated).hide();
				}
			}
		},
		showPopup: function(elem, callback) {
			var form = $("form");
			if(form) {
				form.on("submit", function() {
					return false;
				});
			}
			this.hidePopups();
			this.popups()[elem].show().addClass(animated);
			if(callback && typeof callback === "function") {
				callback();
			}
		},
		initEvents: function() {
			var self = this;
			var btn = $("button:visible");
			if(btn[0] == undefined) {
				return false;
			}
			btn.on("click", function(e) {
				e.preventDefault();
				var name = $(this).attr("data-name");
				self.showPopup(name, function() {
					if(name === "result") {
						self.getData();
						for(var i in self.userData) {
							if(self.userData.hasOwnProperty(i)) {
								$("." + i).html(self.userData[i]);
							}
						}
					}
					self.initEvents();
				});
			});
		}
	}.init();
});