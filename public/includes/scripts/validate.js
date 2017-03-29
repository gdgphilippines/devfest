function validateMessage($element, $message) {
	$sib = $element.siblings(".validate-message");
	if ($sib.size() > 0) {
		$sib.html($message);
	} else {
		$element.parent("span").append("<span class=\"validate-message\"></span>");
		$sib = $element.siblings(".validate-message");
		$element.siblings(".validate-message").html($message);
	}
	$sib.css({
		//"bottom": $element.outerHeight()+"px"
		"bottom": "1px"
	})
}
function checkForm($form) {
	$checkRequired = true;
	$form.find("input, select, textarea").each(function () {
		$val = $(this).val();
		$isRequired = $(this).is("[required]");
		if ($isRequired && ($val == "" || $val == null || !$val)) {
			$checkRequired = false;
		}
	});
	if ($form.find(".validate-message").size() > 0 || !$checkRequired) {
		$form.find("input[type=submit]").prop("disabled", true);
	} else {
		$form.find("input[type=submit]").removeAttr("disabled");
	}
}
function removeValidateMessage($element) {
	$sib = $element.siblings(".validate-message");
	if ($sib.size() > 0) {
		$sib.remove();
	}
}
function validateInput($element) {
	$type = $element.attr("type");
	$ok = true;
	$val = $element.val();
	$message = "Invalid input";
	if ($type == "text") {
		if ($val == "") {
			$ok = false;
			$message = "Input cannot be empty";
		}
	} else if ($type == "email") {
		if ($val == "") {
			$ok = false;
			$message = "Input cannot be empty";
		} else if ($val.indexOf('@') === -1 || $val.indexOf('.') === -1) {
			$ok = false;
			$message = "Invalid email format";
		}
	} else if ($type == "password") {
		$to = $element.is("[data-to]");
		if ($to) {
			$to = $element.parents("form.validate").find("input[name=" + $element.attr("data-to") + "]");
			if ($val == "") {
				$ok = false;
				$message = "Password cannot be empty";
			} else if ($element.val() != $to.val()) {
				validateInput($to);
				$ok = true;
			}
		} else {
			$from = $element.parents("form.validate").find("input[name="+$element.attr("data-from")+"]");
			if ($element.val() != $from.val()) {
				$ok = false;
				$message = "Password do not match";
			}
		}
	} else if ($type == "number") {
		if ($val == "") {
			$ok = false;
			$message = "Input cannot be empty";
		} else if ($.isNumeric($val)) {
			$ok = false;
			$message = "Input numbers only";
		}
	} else if ($element.prop("tagName") == "SELECT") {
		if($val == "" || $val == null || !$val) {
			$ok = false;
			$message = "Select an option";
		}
	}
	if ($ok) {
		removeValidateMessage($element);
	} else {
		validateMessage($element, $message);
	}
	checkForm($element.parents("form"));
}