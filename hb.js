if(window.top==window){
    var flag = false
    var count = 0;
    var haveComment = false;
    var toggleViewer = false;
    var rooturl = "";
    //はてブついか
    $(document).bind("keydown","ctrl+b",function(){
        var base = "http://b.hatena.ne.jp/add"
        if(location.href.indexOf(base)==-1){
            console.log("press!");
            var url=base+'?mode=confirm&is_bm=1&title='+escape(document.title)+'&url='+escape(location.href);
            var popup = $("<div></div>");
            popup.attr("id","hb-add");
            var iframe= $("<iframe></iframe>");
            iframe.attr("src",url);
            iframe.attr("scrolling","no");
            popup.append(iframe);
            iframe.height(500);
            iframe.width(500);
            popup.lightbox_me();
        }
    });
    var api;
    var viewer = $("<div></div>");
    var tooltip = $("<div></div>");
    tooltip.attr("id","HBtool"); 
    var counter = $("<span></span>");
    counter.attr("id","HBcounter");
    tooltip.append(counter);
    //ツールチップ表示
    function showTooltip(){
        counter.css({"background":"url("+rooturl+"hatena.png) no-repeat scroll 0pt 50% transparent"});
        counter.html(count);
    }
    tooltip.bind("mouseenter",function(){
        console.log(toggleViewer);
        if(haveComment && !toggleViewer){
            console.log("open");
            toggleViewer = true;
            viewer.toggle(200);
            tooltip.toggle(200);
        }
    });
    viewer.bind("mouseleave",function(){
        viewer.toggle(200);
        tooltip.toggle(200);
        toggleViewer = false;
    });
    //API読み込み
    safari.self.addEventListener('message',function(evt){
        var base = "http://b.hatena.ne.jp/add"
        var com_count = 0;
        if(evt.name=="api"){
            api = evt.message;
            if(api!=null){
                viewer.attr("id","HBcommentViewer");
                count = api.count;
                jQuery.each(api.bookmarks,function(){
                    var user = this.user;
                    var time = this.timestamp;
                    var comment = this.comment;
                    var tags = this.tags;
                    var url = "http://b.hatena.ne.jp/"+user+"/";
                    var image_url = "http://www.st-hatena.com/users/"+user+"/profile_s.gif"
                    if(comment.length>0){
                        com_count++;
                        com = $("<div><a class='HBuser' href='"+url+"' target='_blank'>"+user+"</a>:<span class='HBcomment'>"+comment+"</span><span class='HBtime'>("+time+")</span></div>");
                        var link = com.children("a.HBuser:first");
                        link.css({"background":"url("+image_url+") no-repeat scroll 0pt 50% transparent"});
                        com.attr("class","HBcomment");
                        viewer.append(com);
                    }
                });
                if(com_count>0){
                    haveComment = true;
                    $(document.body).append(viewer);
                    if(viewer.height()<300){
                        console.log(viewer.height());
                        viewer.height(viewer.height()+10);
                    }else{
                        viewer.height(300)
                    }
                    viewer.toggle(false);
                }
            }
            showTooltip();
        }else if(evt.name=="root"){
            rooturl = evt.message;                
            counter.css({"background":"url("+rooturl+"loading.gif) no-repeat scroll 0pt 50% transparent"});
            counter.html("loading...");
            $(document.body).append(tooltip);
        }
    },false);

    if(!flag){
        safari.self.tab.dispatchMessage('api',location.href); // Global Pageに送信
        flag = true;
    }

    safari.self.tab.dispatchMessage('root',0); // Global Pageに送信
}
