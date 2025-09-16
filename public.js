function count_js() { 
    document.writeln(''); 
}

$(document).ready(function() {
    $("#go_top").css("display", "none");

    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $("#go_top").fadeIn(500);
        } else {
            $("#go_top").fadeOut(500);
        }
    });

    // Quando clicar no botão "voltar ao topo"
    $("#go_top").click(function() {
        $('body,html').animate({scrollTop: 0}, 300);
        return false;
    });
});

// Resolver problema do iOS que não recarrega ao voltar página
window.onpageshow = function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
        var u = navigator.userAgent;
        var is_android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        var is_ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

        if (is_ios) {
            window.location.reload();
        }
    }
};

// Resolver problema de abrir no Safari quando é standalone (WebApp)
if (("standalone" in window.navigator) && window.navigator.standalone) {
    var noddy, remotes = false;
    document.addEventListener('click', function(event) {
        noddy = event.target;
        while (noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
            noddy = noddy.parentNode;
        }
        if ('href' in noddy && noddy.href.indexOf('http') !== -1 && 
            (noddy.href.indexOf(document.location.host) !== -1 || remotes)) {
            event.preventDefault();
            document.location.href = noddy.href;
        }
    }, false);
}
