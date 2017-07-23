define("../js/common/goTop", [], function(require, exports, module) {
    return function goTop() {
        clearInterval(time);
        var goTop = document.querySelector(".go-top");
        if (!goTop) {
            goTop = document.createElement("div");
            goTop.className = "go-top";
            document.body.appendChild(goTop);
        }
        var time = setInterval(function() {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 400) {
                goTop.style.display = "block";
            } else {
                goTop.style.display = "none";
            }
        }, 500);
        goTop.onclick = function() {
            goTop.style.display = "none";
            document.documentElement.scrollTop = document.body.scrollTop = 0;
        };
    };
});