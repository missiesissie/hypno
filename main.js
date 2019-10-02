$(document).ready(function () {

    var endpoint = "https://www.jsonstore.io/f639a0172d9cddfa9bce1c0aff0acf9208a1dc8a753b95e0fea5e6319b55c058";
    
    function fetchJSON(a) {
        var f = new XMLHttpRequest;
        f.open("GET", a, false);
        f.send(null);
        return f.responseText
    }

    function isURL(a) {
        var f = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (f.test(a)) {
            console.log(f.test(a));
            return true
        } else {
            console.log(f.test(a));
            return false
        }
    }
    var hashh = window.location.hash.substr(1);

    if(window.location.hash!=""){
        console.log('hash found: '+ hashh);
    var res=JSON.parse(fetchJSON(endpoint+"/"+hashh));
    var data=res.result;
    if(data!=null){
        if(isURL(data)){
            window.location.href=data
            }
        }
    }

    let pushJSON = (url, data) => {
        let request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(JSON.stringify(data));
    };

    let geturl = () => {
        let url = document.getElementById("urlinput").value;
        return url;
    };

    let getrandom = () => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };

    let genhash = () => {
        if (document.getElementById("custominput").value == "") {
            window.location.hash = getrandom();
            check_is_unique();
        } else {
            window.location.hash = document.getElementById("custominput").value;

        }
    };

    let check_is_unique = () => {
        let url = window.location.hash.substr(1);
        let res = JSON.parse(fetchJSON(endpoint + '/' + url));
        let data = res.result;

        if (data != null) {
            genhash();
        }


    };

    let copyer = (containerid) => {
        let elt = document.getElementById(containerid);
        if (document.selection) { // IE
            if (elt.nodeName.toLowerCase() === "input") {
                document.getElementById(containerid).select();
                document.execCommand("copy");
            } else {
                let range = document.body.createTextRange();
                range.moveToElementText(document.getElementById(containerid));
                range.select();
                document.execCommand("copy");
            }

        } else if (window.getSelection) {
            if (elt.nodeName.toLowerCase() === "input") {
                document.getElementById(containerid).select();
                document.execCommand("copy");
            } else {
                let range_ = document.createRange();
                range_.selectNode(document.getElementById(containerid));
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range_);
                document.execCommand("copy");
            }
        }
    };

    let send_request = (url) => {
        let myurl = url;
        let address = endpoint + "/" + window.location.hash.substr(1);
        //console.log(window.location.hash.substr(1))
        pushJSON(address, myurl);
        document.getElementById('shortenedURL').value = 'http://' + window.location.hostname + '/'+window.location.hash.substr(1) + '/';
        //console.log(window.location.href);
        document.getElementById('sucess').innerHTML = "Short URL Copied to Clipboard!";
        copyer("shortenedURL");
    };

    let shorturl = () => {
        let longurl = geturl();
        let re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
        let cre = /^([a-zA-Z0-9 _-]+)$/;
        let protocol_ok = re.test(longurl);
        if (!protocol_ok) {
        } else {
            genhash();
            send_request(longurl);
        }
    };
  
    // Read a page's GET URL variables and return them as an associative array.
    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
    //?me=John
    //ex var vName = getUrlVars()["me"]; 

  if(getUrlVars()['hash']){
    //console.log('hash found: '+ getUrlVars()['hash']);
    var vdec = decodeURIComponent(getUrlVars()['hash']);
    //console.log('decoded: '+ vdec);
    var vdecs = vdec.split('&');
    var vdec1 = vdecs[0].split('=')[1];
    var vdec2 = vdecs[1].split('=')[1];
    var vdec3 = vdecs[2].split('=')[1];
    var vdec4 = vdecs[3].split('=')[1];
    vdec5 = '';
    if(vdecs[4] != undefined){
        vdec5 = vdecs[4].split('=')[1];
    }
    $('#img1').val(vdec1);
    $('#img2').val(vdec2);
    $('#speed').val(vdec3);
    $('#sub').val(vdec4);
    $('#sub2').val(vdec5);
    $('#speedval').text(vdec3/1000 + ' seconds');    
    createflickr();
  } else if(getUrlVars()['v1']){
    $('#img1').val(getUrlVars()['v1']);
    $('#img2').val(getUrlVars()['v2']);
    $('#speed').val(getUrlVars()['speed']);
    $('#sub').val(decodeURIComponent(getUrlVars()['sub']));
    $('#sub2').val(decodeURIComponent(getUrlVars()['sub2']));
    $('#speedval').text(getUrlVars()['speed']/1000 + ' seconds');        
    createflickr();
  }else{
    createflickr();
  }
  
    //createshare();
    
    function createshare(){
        var v1 = $('#img1').val();
        var v2 = $('#img2').val();
        var v3 = $('#speed').val();
        var v4 = $('#sub').val();
        var v5 = $('#sub2').val();
        var vShare = ('http://' + window.location.hostname + '/index.html?hash=' +  encodeURIComponent('v1='+v1+'&v2='+v2+'&speed='+v3+'&sub='+v4+'&sub2='+v5));
        $('#urlinput').attr('value',vShare);
      
    }

  $('#img1, #img2, #speed, #sub, #sub2').on('keyup change',function(){
      createshare();
      createflickr();      
  });

  
    $('.press').on('click',function(){
        $('#shortenedURL').css({'display':'block'});
        createshare();
        createflickr();
        shorturl();
    });

  function createflickr(){
    var v1 = $('#img1').val();
    var v2 = $('#img2').val();  
    var v3 = $('.imagescontainer');
    var v4 = $('#sub').val().replace('+',' ');
    var v5 = $('#sub2').val().replace('+',' ');

    var textspeed = 900;

    $('.flickr').remove();
    $('.flickr2').remove();
    $('.subtitle').remove();
    $('.subtitle2').remove();
    var vW = $('.wrapper');
    v3.append('<div class="flickr" style="background-image:url('+v1+')"></div>');
    v3.append('<div class="flickr2" style="background-image:url('+v2+')"></div>');
    v3.append('<div class="subtitle">' + v4 + '</div><div class="subtitle2">' + v5 + '</div>');
    $('.flickr, .flickr2').css({'animation-duration':$('#speed').val() + 'ms'});   
    $('.flickr2').css({'animation-delay':$('#speed').val()/2 + 'ms'});     
    //$('.subtitle, .subtitle2').css({'animation-duration':textspeed*2 + 'ms'}); 
    //$('.subtitle2').css({'animation-delay':textspeed + 'ms'}); 

    function calcRatio(){
        var nh = 100;
            var nw = 100;  
            var img = new Image();
            img.onload = function() {
                var v1w = this.width;
                var v1h = this.height;
                var img2 = new Image();
                img2.onload = function() {
                    var v2w = this.width;
                    var v2h = this.height;            
                    var dw = $(window).width();
                    var dh = $(window).height();
                    var or = 'unknown';
                    var square = false;
                    if((v1w > v1h) && (v2w > v2h)){
                        vor = 'wide';
                        if(v1w > v2w){
                            nh = (v2h / v2w)*100;
                        }else{
                            nh = (v1h / v1w)*100;
                        }
                    }else if((v1w < v1h) && (v2w < v2h)){
                        vor = 'tall';
                        if(v1h > v2h){
                            nw = (v2w / v2h)*100;
                        }else{
                            nw = (v1w / v1h)*100;
                        }  

                    }else{
                        square = true;
                        $('.imagescontainer').css({'width':'90vh','height':'90vw','max-width':'90vw','max-height':'90vh'});
                    }
                    var dOr = 'tall';
                    var dnw = 100;
                    var dnh = 100;
                    if(dw > dh){
                        dnh = dh/dw*100;
                    }else{
                        dnw = dw/dh*100;
                    } 
                    if(!square){
                        if(nh > nw){
                            if(nw > dnw){
                                $('.imagescontainer').animate({'height':(200-(90/100*nw)) +'vw','width':'90vw'});
                            }else{
                                $('.imagescontainer').animate({'height':'90vh','width':((90/100*nw))+'vh'});
                            }                        
                        }else{
                            if(nh > dnh){
                                $('.imagescontainer').animate({'width':(200-(90/100*nh)) +'vh','height':'90vh'});
                            }else{
                                $('.imagescontainer').animate({'width':'90vw','height':((90/100*nh))+'vw'});
                            }
                        }                    
                    }
                }
                img2.src = v2;     
            }
            img.src = v1;
    }
    calcRatio();
    $(window).on('resize', function () {
        calcRatio();
    });

  }
   
});
