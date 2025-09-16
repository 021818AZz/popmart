/**
 * è¯¥æ–‡ä»¶è¦æ”¾åœ¨JQueryåŽé¢
 */

/**
 * æ—¶é—´æˆ³è½¬æ—¥æœŸæ ¼å¼
 * @param {int} timestamp æ—¶é—´æˆ³
 * @param {string} format æ—¥æœŸæ ¼å¼Y-m-d H:i:s
 * @return {string} 2018-12-31 00:00:00
 */
function formatDateTime(timestamp,format='Y-m-d H:i:s')
{
    if(String(timestamp).length == 10)
    {
        timestamp = timestamp * 1000;
    }
    
    var date = new Date(timestamp); //æ—¶é—´æˆ³ä¸º10ä½éœ€*1000ï¼Œæ—¶é—´æˆ³ä¸º13ä½çš„è¯ä¸éœ€ä¹˜1000
    var year = date.getFullYear(),
        month = date.getMonth()+1,//æœˆä»½æ˜¯ä»Ž0å¼€å§‹çš„
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
        
    var preArr = Array.apply(null,Array(10)).map(function(elem, index) {
        return '0'+index;
    }); //å¼€ä¸ªé•¿åº¦ä¸º10çš„æ•°ç»„ æ ¼å¼ä¸º 00 01 02 03
    
    var newTime = format.replace(/Y/g,year)
                        .replace(/m/g,preArr[month]||month)
                        .replace(/d/g,preArr[day]||day)
                        .replace(/H/g,preArr[hour]||hour)
                        .replace(/i/g,preArr[min]||min)
                        .replace(/s/g,preArr[sec]||sec);
                        
    return newTime;
}

function setCookie(name, value, expire)
{
	expire = expire || 24 * 60 * 60 * 1000; //æ­¤ cookie å°†è¢«ä¿å­˜ 30 å¤©
	var exp  = new Date(); //new Date("December 31, 9998");
	exp.setTime(exp.getTime() + expire);
	document.cookie = name + "="+ escape(value) +";expires="+ exp.toGMTString();
}
function getCookie(name)
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]); return null;
}
function deleteCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) document.cookie=name +"="+cval+";expires="+exp.toGMTString();
}

function setLocalStorage(key, value)
{
    var curtime = new Date().getTime(); //èŽ·å–å½“å‰æ—¶é—´
    localStorage.setItem(key, JSON.stringify({val:value,time:curtime})); //è½¬æ¢æˆjsonå­—ç¬¦ä¸²åºåˆ—
}
/**
 * expireæ˜¯è®¾ç½®çš„è¿‡æœŸæ—¶é—´
 */
function getLocalStorage(key, expire)
{
    var val = localStorage.getItem(key); //èŽ·å–å­˜å‚¨çš„å…ƒç´ 
    if (val == null) {
        return null;
    }
    var dataobj = JSON.parse(val); //è§£æžå‡ºjsonå¯¹è±¡
    //å¦‚æžœå½“å‰æ—¶é—´-å‡åŽ»å­˜å‚¨çš„å…ƒç´ åœ¨åˆ›å»ºæ—¶å€™è®¾ç½®çš„æ—¶é—´ > è¿‡æœŸæ—¶é—´
    if((new Date().getTime() - dataobj.time) > expire)
    {
        //LocalStorageè¿‡æœŸï¼Œç§»é™¤
        localStorage.removeItem(key);
        return null;
    }
    else{
        return dataobj.val;
    }
}
function deleteLocalStorage(key)
{
	localStorage.removeItem(key);
}
function clearLocalStorage()
{
	localStorage.clear();
}

//åˆ é™¤ç¡®è®¤æ¡†
function delconfirm(url)
{
	if(confirm("ç¡®å®šåˆ é™¤å—"))
	{
		location.href= url;
	}
	else
	{
		
	}
}

function confirm_prompt(href, desc)
{
	desc = desc || 'ç¡®å®šè¦æ‰§è¡Œæ­¤æ“ä½œå—';
	if (confirm(desc)) { window.location.href = href; }
}

//å¤é€‰æ¡†åé€‰
function selAll(arcID)
{
	var checkboxs = document.getElementsByName(arcID);
	
	for (var i=0;i<checkboxs.length;i++)
	{
		var e=checkboxs[i];
		e.checked=!e.checked;
	}
}

//èŽ·å–é€‰ä¸­çš„å¤é€‰æ¡†çš„å€¼
function getItems(arcID)
{
	if (!arcID) { arcID = 'arcID'; }
	var checkboxs = document.getElementsByName( arcID );
	
	var value = new Array();
	
	for(var i = 0; i < checkboxs.length; i++)
	{
		if (checkboxs[i].checked) value.push(checkboxs[i].value);
	}
	
	return value;
}

function upload_image(ele_id, type)
{
	type = type || 1; //1inputèµ‹å€¼2imgèµ‹å€¼
	
    $('#file_upload_input').trigger('click');
	$('#file_upload_url').val(ele_id);
	$('#file_upload_url').attr('fuzhi-type', type);
}

//JS èŽ·å– URLå‚æ•°
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

$(function () {
	// å›¾ç‰‡å®½é«˜æ¯”3:2
	$(".img-w3h2").height(function(){return parseInt($(this).width()*2/3);});
	// å›¾ç‰‡å®½é«˜æ¯”2:1
	$(".img-w2h1").height(function(){return parseInt($(this).width()/2);});
	// å›¾ç‰‡å®½é«˜æ¯”1:1
	$(".img-w1h1").height(function(){return parseInt($(this).width());});
	
    //AJAX POSTæäº¤ï¼Œä¸åŒ…æ‹¬æ–‡ä»¶ä¸Šä¼ ä¿¡æ¯
    $("form.ajax_post_submit").submit(function () {
        $.ajax({
            url: $(this).attr('action'),
            data: $(this).serialize(),
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    if (data.msg) {
                        //alert(data.msg);
                        //æç¤º
                        layer.open({
                            content: data.msg
                            ,skin: 'msg'
                            ,time: 2 //2ç§’åŽè‡ªåŠ¨å…³é—­
                        });
                        setTimeout(function () {
                            if (data.url) {
                                location.href = data.url;
                            } else {
                                location.reload();
                            }
                        }, 1000);
                    } else {
                        document.location.href = data.url;
                    }
                } else {
                    //alert(data.msg);
                    //æç¤º
                    layer.open({
                        content: data.msg
                        ,skin: 'msg'
                        ,time: 5 //2ç§’åŽè‡ªåŠ¨å…³é—­
                    });
                }
            },
            error: function () {
                alert('System error, please try again later');
            }
        });
        return false;
    });
	
	//æ–‡ä»¶ä¸Šä¼ 
	$("#file_upload_input").change(function(){
		layer.open({
			type: 2,
			title: 'ä¸Šä¼ ä¸­...',
			shadeClose: false,
		});
		$("#file_upload_form").ajaxSubmit({
			dataType: 'json',
			success: function(res) {
				var url = res.data[0].path;
				if(res.code == 0)
                {
					var temp = $('#file_upload_url').val();
					var type = $('#file_upload_url').attr('fuzhi-type');
					if (temp && type == 1) {
						temp = '#' + temp;
						$(temp).val(url);
					} else if (temp && type == 2) {
						temp = '#' + temp;
						$(temp).attr('src', url);
					}
                    setTimeout(function(){ layer.closeAll(); }, 500);
				}
			},
			error:function(res){
				alert('System error, please try again later');
			}
		});
	});
	
	$('.img_mouse_preview').each(function(){
		$(this).mouseover(function(){
			var ele = $(this).attr('data-img-ele');
			var type = $(this).attr('data-img-type');
			var temp = $('#' + ele).val();
			var wh = 'width:150px;height:200px;'; //çŸ©å½¢
			if (type == 2) {
				wh = 'width:200px;height:150px;'; //æ¨ªå‘çŸ©å½¢
			} else if (type == 3) {
				wh = 'width:200px;height:200px;'; //æ­£æ–¹å½¢
			}
			if (temp) {
				$("body").append('<img id="img_mouse_preview" style="display:block;position:fixed;top:30%;left:30%;' + wh + '" src="' + temp + '" />');
			}
		}).mouseout(function(){
			$("#img_mouse_preview").remove();
		});
	});
	
	//$("#go_top").css("display", "none");
	/* $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $("#go_top").fadeIn(500);
        } else {
            $("#go_top").fadeOut(500);
        }
    }); */
    //å½“ç‚¹å‡»è·³è½¬é“¾æŽ¥åŽï¼Œå›žåˆ°é¡µé¢é¡¶éƒ¨ä½ç½®
    $("#go_top").click(function () {
        $('body,html').animate({scrollTop: 0}, 300);
        return false;
    });
});