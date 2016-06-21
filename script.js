

$( document ).ready(function() {

    var usr_id_long = $("[title='Profil Sayfam']").attr('href')
    var usr_id = usr_id_long.split('=')[1]

    
    var bos = "https://icon.donanimhaber.com/yeni-like-bos.png"
    var dolu = "https://icon.donanimhaber.com/yeni-like.png"

    $( ".select-this-as-popup" ).each(function() {
        var msg_long = $( this ).attr('id');
        var msg_id = msg_long.split('_')[2]



        $.getJSON('http://"server ip"/api/users/?msg_id=' + msg_id, function(json_data){
            var dis_count = json_data.length;

            $.getJSON('http://"server ip"/api/users/?msg_id=' + msg_id + '&'+'usr_id='+usr_id, function(json_data){
                if($.isEmptyObject(json_data)){
                    $( ".mesaj-topluluk > #rate_" + msg_id + "_arti").before('<a href="#" onclick="dis_add('+ msg_id+ ','+ dis_count + ',' + usr_id +');    return false;" class="'+ msg_id +'"title="Bu mesajı beğenme"><div class="like" id="'+ msg_id +'"><img style="transform: rotate(180deg);" src="https://icon.donanimhaber.com/yeni-like-bos.png">' + dis_count +'</div></a><span>|</span>')

                    }else{
                    $( ".mesaj-topluluk > #rate_" + msg_id + "_arti").before('<a href="#" onclick="re_dis('+ msg_id+ ','+ dis_count + ',' + usr_id +');    return false;" class="'+ msg_id +'"title="Bu mesajı beğenme"><div class="like" id="'+ msg_id +'"><img style="transform: rotate(180deg);" src="https://icon.donanimhaber.com/yeni-like.png">' + dis_count +'</div></a><span>|</span>')        

                    }
                });

            });     
        });

    var re_dis= "function re_dis(msg_id,dis_count,usr_id){$.ajax({url:'http://"server ip"/api/users/'+'?'+$.param({'msg_id':msg_id,'usr_id':usr_id}),type:'DELETE',});var dis_count = dis_count - 1;$('.mesaj-topluluk > .'+msg_id+'').replaceWith('<a href=\"#\" onclick=\"dis_add('+msg_id+','+dis_count+','+usr_id+');    return false;\" class=\"'+msg_id+'\" title=\"Bu mesajı beğenme\"><div class=\"like\" id=\"'+msg_id+'\"><img style=\"transform: rotate(180deg);\" src=\"https://icon.donanimhaber.com/yeni-like-bos.png\">'+(dis_count)+'</div></a>');};"
    var dis_add = "function dis_add(msg_id,dis_count,usr_id){$.post('http://"server ip"/api/users',{'msg_id':msg_id,'usr_id':usr_id});var dis_count = dis_count + 1;$('.mesaj-topluluk > .'+msg_id+'').replaceWith('<a href=\"#\" onclick=\"re_dis('+msg_id+','+dis_count+','+usr_id+');    return false;\" class=\"'+msg_id+'\" title=\"Bu mesajı beğenme\"><div class=\"like\" id=\"'+msg_id+'\"><img style=\"transform: rotate(180deg);\" src=\"https://icon.donanimhaber.com/yeni-like.png\">'+(dis_count)+'</div></a>');}"
        var script = document.createElement('script'); 
        var get = document.getElementsByTagName('script')[0]; 
        script.text = re_dis + " " + dis_add;
        get.parentNode.insertBefore(script, get);

});

