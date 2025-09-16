função count_js () { document.writeln(''); }

$().ready(função(){
	$("#go_top").css("exibir", "nenhum");
	$(janela).scroll(função () {
        se ($(window).scrollTop() > 100) {
            $("#go_top").fadeIn(500);
        } outro {
            $("#go_top").fadeOut(500);
        }
    });
    //å½“ç‚¹å‡»è·³è½¬é“¾æŽ¥å Žï¼Œå›žåˆ°é¡µé ¢é¡¶éƒ¨ä½ ç½®
    $("#go_top").click(função () {
        $('corpo,html').animate({scrollTop: 0}, 300);
        retornar falso;
    });
	
});

//è§£å†³IOSé¡µé ¢è¿”å›žä¸ åˆ·æ–°çš„é—®é¢˜
window.onpageshow = função (evento) {
	//evento.persistedåˆ¤æ–æ˜¯å ¦å Žé€€è¿›å…¥
	se (evento.persistido || janela.desempenho && janela.desempenho.navegação.tipo == 2) {
		var u = navigator.userAgent;
		var is_android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //androidç»ˆç«¯
		var is_ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //iosç»ˆç«¯
		se (is_ios) {
			janela.localização.recarregar();
		}
	}
};

//è§£å†³APPé¢'ç¹ å”¤èµ·Safariæµ è§ˆå™¨
if(("autônomo" em window.navigator) && window.navigator.standalone){
	var noddy, remotes = falso;
	document.addEventListener('clique', função(evento) {
		noddy = evento.alvo;
		while(noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
			noddy = noddy.parentNode;
		}
		if('href' em noddy && noddy.href.indexOf('http') !== -1 && (noddy.href.indexOf(document.location.host) !== -1 || remotos)){
			evento.preventDefault();
			documento.localização.href = noddy.href;
		}
	},falso);
}
