var Input = {
    ready: function() {
        this.readyInput();
        this.readySelect();
        this.readyTextArea();
    },
    readyInput: function() {
        $("label input[type=text], label input[type=password], label input[type=date], label input[type=time], label input[type=email], label input[type=number]").each(function() {
            $val = $(this).val();
            $type = $(this).attr("type");
            if($val != "" || $type == "date" || $type == "time")
                $(this).siblings("span").addClass("top");
        }).focus(function() {
            $(this).siblings("span").addClass("top");
        }).focusout(function() {
            $val = $(this).val();
            $type = $(this).attr("type");
            if($val == "" && !($type == "date" || $type == "time"))
                $(this).siblings("span").removeClass("top");
        })
    },
    readySelect: function() {
        $("label select").each(function() {
            $(this).siblings("span").addClass("top");
        })
    },
    readyTextArea: function() {
        autosize(document.querySelectorAll('textarea'));
        $("label textarea").each(function() {
            $val = $(this).val();
            if($val != "")
                $(this).siblings("span").addClass("top");
        }).focus(function() {
            $(this).siblings("span").addClass("top");
        }).focusout(function() {
            $val = $(this).val();
            $type = $(this).attr("type");
            if($val == "")
                $(this).siblings("span").removeClass("top");
        })
    }
}