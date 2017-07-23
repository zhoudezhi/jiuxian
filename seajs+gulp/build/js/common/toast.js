define("../js/common/toast", [], function(require, exports, module) {
    return function toast(text, showIn) {
        var toast = document.querySelector(".toast-box");
        if (toast || !text) {
            return false;
        }
        var showIn = showIn || 2e3;
        var toastDom = document.createElement("div");
        toastDom.className = "toast-box";
        var p = document.createElement("p");
        p.className = "toast-msg";
        p.innerHTML = text;
        toastDom.appendChild(p);
        document.body.appendChild(toastDom);
        setTimeout(function() {
            var toast = document.querySelector(".toast-box");
            document.body.removeChild(toast);
        }, showIn);
    };
});