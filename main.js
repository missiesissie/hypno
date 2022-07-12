


$(document).ready(function () {

 
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

          var posting = $.post('hash.php', {
            vShort: hashh,
            vType: 'short'
          });
          posting.done(function(data) {
            console.dir('long: ' + data);//show errors
			getVars(data);
            window.location.href='/?'+data;
            
          });        

    }

    function getVars(url) {
      var hash;
      var myJson = {};
      var hashes = url.slice(url.indexOf('?') + 1).split('&');
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        myJson[hash[0]] = hash[1];
        // If you want to get in native datatypes
        // myJson[hash[0]] = JSON.parse(hash[1]); 
      }
      //return myJson;
      console.dir('test:' + JSON.stringify(myJson));
    } 

    function cancelFullScreen(el) {
        var requestMethod = el.cancelFullScreen||el.webkitExitFullscreen||el.mozCancelFullScreen||el.exitFullscreen;
        if (requestMethod) { // cancel full screen.
            requestMethod.call(el);
        } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }

    function requestFullScreen(el) {
        // Supports most browsers and their versions.
        var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

        if (requestMethod) { // Native full screen.
            requestMethod.call(el);
        } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
        return false
    }

    function toggleFull() {
        var elem = document.documentElement; // Make the body go full screen.
        var isInFullScreen = (document.mozFullScreen || document.webkitIsFullScreen);//(document.fullScreenElement && document.fullScreenElement !== null) || 

        if (isInFullScreen) {
            cancelFullScreen(document);
        } else {
            requestFullScreen(elem);
        }
        return false;
    }
    $('.fullscreen').on('click',function(){
        toggleFull();
        $(this).toggleClass('full');
        return false;
    });

//==========================================================================================================================================================




    // Read a page's GET URL variables and return them as an associative array.
    function getUrlVars()
    {
        var vars = [], hash;
        var vhref = window.location.href;
        //console.log('vhref:'+vhref);
        var hashes = vhref.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
  
  
 

    var subspeed = 2000;
    $('#subspeed').val(subspeed);
    //?me=John
    //ex var vName = getUrlVars()["me"]; 
    var imgCount = 2;
    if(getUrlVars()['imgcount']){
        //console.log('imgcount from url: ' + getUrlVars()['imgcount']);
        imgCount = getUrlVars()['imgcount'] * 1;
    }
    var subcount = 2;
    if(getUrlVars()['subcount']){
        //console.log('subcount: ' + getUrlVars()['subcount']);
        subcount = getUrlVars()['subcount'] * 1;
        $('#subcount').val(subcount);
    }    
  	if(getUrlVars()['multitext']){
      $('#multitext').val(decodeURIComponent(getUrlVars()['multitext']));
    }
  	
  
    $('.loading').on('click',function(){
        $(this).fadeOut();
        createflickr();
    });


   if(getUrlVars()['img1']){ //the new way
        console.log('v2.0');
        $('#imgswrap').html('');
        var vImgs = '' //for preloading     
        for(var i = 0; i < (getUrlVars()['imgcount']*1); i++)
        {
            var vImg = decodeURIComponent(getUrlVars()['img'+(i+1)]);
          
            if (vImg.indexOf('format') > 0){
              
              if (vImg.indexOf('?format=jpg') == -1){
                vImg = vImg.replace('?format','?format=jpg');
              } 
            }
            vImgs += vImg +',';
            $('#img'+(i+1)).val(decodeURIComponent(getUrlVars()['img'+(i+1)]));
            $('#imgswrap').append('<label for="img'+(i+1)+'">Image '+(i+1)+':</label><input type="text" name="img'+(i+1)+'" size="100" class="updatetrigger" id="img'+(i+1)+'" value="'+vImg+'"><br />');
        } 
        vImgs = vImgs.slice(0,-1);//for preloading
        var imgs = vImgs.split(',');
      


        $('#subswrap').html('');
        for(var i = 0; i < (subcount*1); i++)
        {
            $('#sub'+(i+1)).val(getUrlVars()['sub'+(i+1)]);
            var subval = getUrlVars()['sub'+(i+1)] ? getUrlVars()['sub'+(i+1)] : '';
            subval = subval.replace('%22','&quot;').replace('%22','&quot;');
           // console.log(subval);
            $('#subswrap').append('<label for="sub'+(i+1)+'">Text '+(i+1)+':</label><input type="text" name="sub'+(i+1)+'" size="100" class="updatetrigger" id="sub'+(i+1)+'" value="'+ decodeURIComponent(subval) +'"><br />');
        }         

        $('#imgcount').val(getUrlVars()['imgcount']);

        //backwards compatibility
        if(getUrlVars()['sub']){
            $('#sub1').val(getUrlVars()['sub']);
        }
        $('#speed').val(getUrlVars()['speed']);
        if(getUrlVars()['subspeed']){
            $('#subspeed').val(getUrlVars()['subspeed']);
        }
        //$('#speedval').text($('#speed').val()/1000 + ' seconds');   





            function calcRatio(){
                    var nh = 100;
                    var nw = 100;  

                    //var ext = v1.split('.').pop();
                    //console.log('ext:'+ext);
                    //if((ext == 'mp4')||(ext == 'gifv')||(ext == 'webm')){
                    //    $('.imagescontainer').css({'height':'60vw','width':'90vw'});
                    //    createflickr();
                    //}else{
                        var totalImgs = imgs.length;
                        //console.log('length: '+totalImgs);
                        var imgCount = 0;
                        imgs.forEach(function(el,index){
                            //console.log(index + ': ' + el);
                            loading_gif = new Image();
                            loading_gif.src = el;

                            $(loading_gif).on('load',function () {
                                
                                imgCount ++;
                                allLoaded(true,totalImgs);
                                //console.log(loading_gif.src + ' loaded');
                                //console.log(imgCount + ' imgcount!');  
                                //$('.progress').html(totalImgs/imgCount + '%');
                            }).on('error',function () {
                                
                                imgCount ++;
                                allLoaded(true,totalImgs);
                                console.log(loading_gif.src + ' won\'t load');
                            });
                        });
                        var vAll = 0;
                        function allLoaded(el,all){
                            if(el){
                                vAll ++;
                                //console.log((vAll/all)*100);
                                $('.progress').html('preloading '+Math.round((vAll/all)*100) + '% (click to dismiss)')
                                if(vAll == all){
                                    //console.log('tadaa');
                                    $('.loading').fadeOut();
                                    createflickr();
                                    
                                }
                            }
                        }

            }

            // $(window).on('load resize', function () {
            //     calcRatio();
            // });
            calcRatio();        


        //if all is well
        //createflickr();

   }else{
        console.log('no query');
        createflickr();
    //$('#speedval').text($('#speed').val()/1000 + ' seconds');  
   }

    var vintensity = '2';
    if(getUrlVars()['intensity']){
        $('#intensity').val(getUrlVars()['intensity']);
        vintensity = getUrlVars()['intensity'];
    }
    $('body').attr('intensity',vintensity)
    if(vintensity=='1'){
        $('body').addClass('int-easy');
    } 


   

    var vmusic = '178261963';
    if(getUrlVars()['music']){
        $('#music').val(getUrlVars()['music']);
        vmusic = getUrlVars()['music'];
    }
    //fix broken soundclouds
    //if(vmusic = '230428630'){vmusic = '286013598';}
    
    $('#music').val(vmusic);
    var musicframe = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+vmusic+'&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false';

    if(vmusic == '0'){
        $('#musicframe').hide().attr('src','');
    }else{
        $('#musicframe').show().attr('src',musicframe);
    }

    


    var vbackground = 'https://i.imgur.com/UwE6Y2E.gif';
    if(getUrlVars()['background']){
        $('#background').val(getUrlVars()['background']);
        vbackground = getUrlVars()['background'];
    }
    $('#background').val(vbackground);
    $('.wrapper').css('background-image','url('+vbackground+')');

    


    var imgCount = $('#imgcount').val()*1;
    $('.btn-add-image').on('click',function(){
        $('#img'+imgCount).after('<br /><label for="img'+(imgCount+1)+'">Image '+(imgCount+1)+':</label><input type="text" name="img'+(imgCount+1)+'" size="100" class="updatetrigger ut-img" id="img'+(imgCount+1)+'" value="">');
        imgCount++;
        $('#imgcount').val(imgCount);
        return false;
    });

    var subcount = $('#subcount').val()*1;
    $('.btn-add-sub').on('click',function(){
        $('#sub'+subcount).after('<br /><label for="sub'+(subcount+1)+'">Text '+(subcount+1)+':</label><input type="text" name="sub'+(subcount+1)+'" size="100" class="updatetrigger ut-sub" id="sub'+(subcount+1)+'" value="">');
        subcount++;
        $('#subcount').val(subcount);
        return false;
    });    

    //createshare();
    
    function createshare(){
        //console.log('creating share for ' + $('#imgcount').val() + ' images');
        var shareurl = '';
        var vars = {};
        var vars2 = {};
        var v3 = $('#speed').val();
        var v7 = $('#subspeed').val();

        var imgcount = $('#imgcount').val()*1;
        shareurl += 'imgcount=' + imgcount;
        var subcount = $('#subcount').val()*1;
        shareurl += '&subcount=' + subcount; 

        shareurl += '&intensity'+ '=' + $('#intensity').val();       
        shareurl += '&music'+ '=' + $('#music').val();
        shareurl += '&speed'+ '=' + $('#speed').val();
        shareurl += '&subspeed'+ '=' + $('#subspeed').val();
        shareurl += '&background'+ '=' + $('#background').val();

        for(var i = 0; i < (imgCount); i++)
        {
            vars['img' + (i+1)] = $('#img'+(i+1)).val();
            //console.log('test: '+ vars['img'+(i+1)]);
            shareurl += '&img' + (i+1) + '=' + encodeURIComponent(vars['img'+(i+1)]);
        }    




        if($('#multitext').val().length){
          shareurl += '&multitext=' + encodeURIComponent($('#multitext').val());
        }else{
          for(var i = 0; i < (subcount); i++)
          {
              vars2['sub' + (i+1)] = $('#sub'+(i+1)).val();
              //console.log('sub '+(i+1)+': '+ vars2['sub'+(i+1)]);
              shareurl += '&sub' + (i+1) + '=' + encodeURIComponent(vars2['sub'+(i+1)]);
          }          
        }
        //console.log(v1 + ' / ' + v2);
        //console.log('v1='+v1+'&v2='+v2+'&speed='+v3+'&sub='+v4);


        var vShare = ('https://' + window.location.hostname + '/?'+shareurl);
        //$('.share').html('<a href="'+vShare+'">'+vShare+'</a>');
        $('#longshare').val(shareurl); //for the db
      
        $('#urlinput').attr('value',vShare); //f
      
    }

    $('#multitext').on('input propertychange paste', function() {
      	console.log('multitext updated');
        createshare();
        createflickr(); 
    });  
	$('#inputwrap').on('change input','#speed, #subspeed, .updatetrigger',function(){
        createshare();
        createflickr(); 
    });
    $('.ut-img').on('change',function(){
            calcRatio();
    });  

    $('#imgswrap').on('change','input',function(){
        var vT= $(this);
        var vVal = vT.val();
        var fileExtension = ['jpeg', 'jpg', 'png', 'gif', 'gifv', 'webp', 'webm', 'mp4'];
        //if (($.inArray(vVal.split('.').pop().toLowerCase(), fileExtension) == -1) && (vVal.indexOf('format=jpg') == -1)) {
        //    alert("Make sure the url ends with one of these extensions : "+fileExtension.join(', '));
        //}
        createflickr();       
    });

    $('#music').on('change',function(){
        var vT = $(this);
        var musicframe = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+vT.val()+'&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false';
        if(+vT.val() == '0'){
            $('#musicframe').hide().attr('src','');
        }else{
            $('#musicframe').show().attr('src',musicframe);
        }       
    });

    $('#background').on('change',function(){
        var vT = $(this);
        $('.wrapper').css('background-image','url('+vT.val()+')');
    });    

    $('#intensity').on('change',function(){
        var vT = $(this);
        var vInt = vT.val();
        $('body').attr('intensity',vInt);
        if(vInt=='1'){
            $('body').addClass('int-easy');
        }else{
            $('body').removeClass('int-easy');
        }     
    }); 
  
    $('.press').on('click',function(){
        $('#shortenedURL').css({'display':'block'});
        //$('#urlinput').css({'display':'block'});
        
        createshare();
        createflickr();
        shorturl();
    });

  function shorturl(){
    $('#shortenedURL').val('');
      var shareurl = $('#longshare').val();
          var posting = $.post('hash.php', {
            vLong: shareurl,
            vType: 'long'
          });
          posting.done(function(data) {
            console.log(data);
             $('#shortenedURL').val('https://' + window.location.hostname + '/#'+data + '');

            document.getElementById('sucess').innerHTML = "Short URL Copied to Clipboard!";
            copyer("shortenedURL");          
          }); 
  }
  
  
  function createflickr(){
      
    var v1 = $('#img1').val();//first 2 images are used to calculate ratio > use all in future version
    var v2 = $('#img2').val();  
    var v3 = $('.imagescontainer');
    var v4 = $('#sub1').val();
    var v5 = $('#sub2').val();
    var imgwrap = $('#imgswrap');
    var subwrap = $('#subswrap');
    var subspeed = $('#subspeed').val();
    var imgspeed = $('#speed').val();

    v3.html('');

    var vW = $('.wrapper');

            //IMAGES======================================================================
            var imgcount = $('#imgcount').val();
            //console.log('imgcount:' + imgcount);
            var vImg10 = (100/imgcount)*1;
            var vImg50 = (100/imgcount)*1.5;
            console.log('speedval:'+ imgspeed);
            //--JS--
            var KeyFrame =
            {
            init: function(){
            if(!KeyFrame.check)
            {
                //set the style and append to head
            // console.log('vImg10: '+ vImg10);
                //console.log('vImg50: '+ vImg50);
                $('#keyblink').remove();
                var css = $('<style id="keyblink">.flickr{-webkit-transition: opacity '+(imgspeed/2)+'ms , transform '+imgspeed+'ms ease-in-out;transition: opacity '+(imgspeed/2)+'ms , transform '+imgspeed+'ms ease-in-out;}</style>').appendTo('head'); //make sure you don't carriage return the css inline statement, or else it'll be error as ILLEGAL
                //so u don't keep appending style to head
                KeyFrame.check = true;
            }
            }
            }
            KeyFrame.init();

            for(var i = 0; i < imgCount; i++)
            {

                var vSrc = $('#img'+(i+1)).val();
                var vVideo = '';
                var ext = vSrc.split('.').pop();
                if((ext == 'mp4')||(ext == 'gifv')||(ext == 'webm')){
                    vVideo = '<video class="video" width="100%" height="100%" autoplay loop muted nocontrols><source src="'+vSrc.replace('.gifv','.mp4').replace('.webm','.mp4')+'" type="video/mp4">Your browser does not support the video tag.</video>';
                }
                v3.append('<div class="flickr flickr'+(i+1)+'" style="background-image:url('+$('#img'+(i+1)).val()+')">'+vVideo+'</div>');
                //$('.flickr'+(i+1)).css({'animation-delay':(imgspeed)*i + 'ms','z-index':(100+i),'animation-duration':imgspeed*imgcount + 'ms','animation-iteration-count':'infinite','animation-name':'blinking'});
            } 
        



            //SUBTITLES======================================================================
            var subcount = $('#subcount').val();
    
    		if($('#multitext').val().length){
              console.log('multitext found');
              var vMul = $('#multitext').val();
              var vArrMull = vMul.split(',');
              subcount = vArrMull.length
            }
    
    		var vSub10 = (100/subcount)*0.5;
            var vSub50 = (100/subcount)*1;        
            //--JS--
            var KeyFrame =
            {
            init: function(){
            if(!KeyFrame.check)
            {
                //set the style and append to head
                //console.log('vSub10: '+ vSub10);
                //console.log('vSub50: '+ vSub50);
                $('#keyzoom').remove();
                var css = $('<style id="keyzoom">@-webkit-keyframes zoom { 0%{transform: scale(0.4);opacity:0;}'+vSub10+'%{transform: scale(0.8);opacity: 0.85;}'+vSub50+'%{opacity: 0;}100%{transform: scale(1.3);opacity: 0;}}@keyframes zoom { 0%{transform: scale(0.4);opacity:0;}'+vSub10+'%{transform: scale(0.8);opacity: 0.85;}'+vSub50+'%{opacity: 0;}100%{transform: scale(1.3);opacity: 0;}}</style>').appendTo('head'); //make sure you don't carriage return the css inline statement, or else it'll be error as ILLEGAL
                //so u don't keep appending style to head
                KeyFrame.check = true;
            }
            }
            }
            KeyFrame.init();

            $('.subtitle').remove();
    
    		if($('#multitext').val().length){

              for(var i = 0; i < subcount; i++)
              {
                  var vsub = decodeURIComponent(vArrMull[i]);
                  var vsublen = vsub.length;

                  v3.after('<div class="subtitle subtitle'+(i+1)+'">'+vsub+'</div>');
                  $('.subtitle'+(i+1)).css({'animation-delay':(subspeed*(subcount)/(subcount)*(i)) + 'ms','z-index':(200+i),'animation-duration':subspeed*(subcount) + 'ms','animation-iteration-count':'infinite','animation-name':'zoom'});
              }                
              
            }else{
    
              for(var i = 0; i < subcount; i++)
              {
                  var vsub = decodeURIComponent($('#sub'+(i+1)).val());
                  var vsublen = vsub.length;

                  v3.after('<div class="subtitle subtitle'+(i+1)+'">'+vsub+'</div>');
                  $('.subtitle'+(i+1)).css({'animation-delay':(subspeed*(subcount)/(subcount)*(i)) + 'ms','z-index':(200+i),'animation-duration':subspeed*(subcount) + 'ms','animation-iteration-count':'infinite','animation-name':'zoom'});
              }  
            }



    function calcRatio(){
      	$('.loading').fadeOut();
        startHypno();            
    }

	
    calcRatio();

  }
    var startHypnoInterval;
    


    function startHypno(){
            //animate images

                $('.flickr.active').removeClass('active');
                $('.flickr1').addClass('active');
            clearInterval(startHypnoInterval);
            //console.log('clearing interval')
            //console.log('newspeed:' + $('#speed').val());
            startHypnoInterval = setInterval(function(i,imgCount){
                nextHypno();
            },($('#speed').val()));        

    }
    function nextHypno(){
        var vA = $('.flickr.active');

        if(vA.next('.flickr').length){
            vA.removeClass('active');
            vA.next('.flickr').addClass('active');

        }else{
            vA.removeClass('active');
            $('.flickr1').addClass('active');

            
        }
    }     


});
