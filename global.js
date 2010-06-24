function initAll(){
    safari.application.addEventListener('message',function(evt){
        if(evt.name=="api"){
            var urlreg = new RegExp("^http:\/\/.*");
            if(urlreg.test(evt.message)){
                var api="http://b.hatena.ne.jp/entry/jsonlite/?url="+evt.message;
                $.getJSON(api,function(data){
                    evt.target.page.dispatchMessage('api', data);
                });
            }else{
                evt.target.page.dispatchMessage('api', false);
            }
         }else if(evt.name=="root"){
                var url = location.href;
                url = url.replace("global.html","");
                evt.target.page.dispatchMessage('root', url);
         }
        },false);
    }
