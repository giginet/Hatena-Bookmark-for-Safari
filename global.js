<<<<<<< HEAD

var regexps = [];
//ブラックリストの正規表現リスト
//指定したURLがブラックリストに含まれるかどうか
function isDisable(url){
    flag = false;
    jQuery.each(regexps,function(){
        if(this.test(url)){
            flag=true;
            break;
        }
    });
    return flag;
} 

function initAll(){
    safari.application.addEventListener('message',function(evt){
        if(evt.name=="api"){
            if(!isDisable(evt.message)){
=======
function initAll(){
    safari.application.addEventListener('message',function(evt){
        if(evt.name=="api"){
            var urlreg = new RegExp("^http:\/\/.*");
            if(urlreg.test(evt.message)){
>>>>>>> 344176d9d3fceee4591223e7375a56a06c8874ee
                var api="http://b.hatena.ne.jp/entry/jsonlite/?url="+evt.message;
                $.getJSON(api,function(data){
                    evt.target.page.dispatchMessage('api', data);
                });
            }else{
                evt.target.page.dispatchMessage('api', false);
            }
<<<<<<< HEAD
            }else if(evt.name=="setting"){
                setting = safari.extension.settings;
                //keybindの設定
                var keys=setting.key.split(",");
                if(setting.ctrl)keys.unshift("ctrl");
                if(setting.alt)keys.unshift("alt");
                if(setting.shift)keys.unshift("shift");
                var keybind =keys.join("+"); 
                //無効化するURLリストの作成
                var urls = setting.disable_url.split(",");
                jQuery.each(urls,function(){
                    var reg ="^";
                    reg +=this.replace("*",".*");
                    reg +="$";
                    reg = new RegExp(reg);
                    regexps.push(reg);
                });
                var obj={
                    "width":setting.width,
                    "height":setting.height,
                    "position":setting.position,
                    "keybind":keybind,
                    "disable_url":regexps,
                    "disable":isDisable(evt.message)
                };
                evt.target.page.dispatchMessage('setting',obj);
            }
=======
         }else if(evt.name=="root"){
                var url = location.href;
                url = url.replace("global.html","");
                evt.target.page.dispatchMessage('root', url);
         }
>>>>>>> 344176d9d3fceee4591223e7375a56a06c8874ee
        },false);
    }
