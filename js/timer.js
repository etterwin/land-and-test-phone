var remain_bv   = 235;
function parseTime_bv(timestamp){
    if (timestamp < 0) timestamp = 0;

    var hour = Math.floor(timestamp/60/60);
    var mins = Math.floor((timestamp - hour*60*60)/60);
    var secs = Math.floor(timestamp - hour*60*60 - mins*60);


    if(String(mins).length > 1)
        $('#hour').text(mins);
    else
        $('#hour').text("0" + mins);
    if(String(secs).length > 1)
        $('#min').text(secs);
    else
        $('#min').text("0" + secs);

}

$(document).ready(function(){
    setInterval(function(){
        remain_bv = remain_bv - 1;
        parseTime_bv(remain_bv);
        if(remain_bv <= 0){
            $('#hour').text("00");
            $('#min').text("00");
        }
    }, 1000);
});