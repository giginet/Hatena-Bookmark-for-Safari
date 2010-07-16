if(window.top==window){
<<<<<<< HEAD
    var post =["","",0,0];
    var posr =[0,"",0,""];
    var posl =["",0,"",0];
    var posb =[0,0,"",""];
=======
>>>>>>> 344176d9d3fceee4591223e7375a56a06c8874ee
    var flag = false
    var count = 0;
    var haveComment = false;
    var toggleViewer = false;
<<<<<<< HEAD
    var rooturl = safari.extension.baseURI;
    //はてぶついか
    var showAddForm = function(){
        var base = "http://b.hatena.ne.jp/add"
        if(location.href.indexOf(base)==-1){
=======
    var rooturl = "";
    //はてブついか
    $(document).bind("keydown","ctrl+b",function(){
        var base = "http://b.hatena.ne.jp/add"
        if(location.href.indexOf(base)==-1){
            console.log("press!");
>>>>>>> 344176d9d3fceee4591223e7375a56a06c8874ee
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
<<<<<<< HEAD
    }
    var api;
    var viewer = $("<div></div>");
    var tooltip = $("<div></div>");
    var counter = $("<span></span>");
=======
    });
    var api;
    var viewer = $("<div></div>");
    var tooltip = $("<div></div>");
    tooltip.attr("id","HBtool"); 
    var counter = $("<span></span>");
    counter.attr("id","HBcounter");
    tooltip.append(counter);
>>>>>>> 344176d9d3fceee4591223e7375a56a06c8874ee
    //ツールチップ表示
    function showTooltip(){
        counter.css({"background":"url("+rooturl+"hatena.png) no-repeat scroll 0pt 50% transparent"});
        counter.html(count);
    }
    tooltip.bind("mouseenter",function(){
<<<<<<< HEAD
        if(haveComment && !toggleViewer){
=======
        console.log(toggleViewer);
        if(haveComment && !toggleViewer){
            console.log("open");
>>>>>>> 344176d9d3fceee4591223e7375a56a06c8874ee
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
<<<<<<< HEAD
                //ビュワー表示位置
                viewer.css("top",post[setting.position]+" !important");
                viewer.css("right",posr[setting.position]+" !important");
                viewer.css("left",posl[setting.position]+" !important");
                viewer.css("bottom",posb[setting.position]+" !important");
=======
>>>>>>> 344176d9d3fceee4591223e7375a56a06c8874ee
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
<<<<<<< HEAD
                        viewer.width(setting.width);
=======
>>>>>>> 344176d9d3fceee4591223e7375a56a06c8874ee
                        viewer.append(com);
                    }
                });
                if(com_count>0){
                    haveComment = true;
                    $(document.body).append(viewer);
<<<<<<< HEAD
                    if(viewer.height()<setting.height){
                        viewer.height(viewer.height()+10);
                    }else{
                        viewer.height(setting.height)
=======
                    if(viewer.height()<300){
                        console.log(viewer.height());
                        viewer.height(viewer.height()+10);
                    }else{
                        viewer.height(300)
>>>>>>> 344176d9d3fceee4591223e7375a56a06c8874ee
                    }
                    viewer.toggle(false);
                }
            }
            showTooltip();
<<<<<<< HEAD
        }else if(evt.name=="setting"){
            setting = evt.message;
            //tooltipの設置
            if(!setting.disable){
                tooltip.attr("id","HBtool"); 
                counter.attr("id","HBcounter");
                tooltip.append(counter);
                counter.css({"background":"url("+rooturl+"loading.gif) no-repeat scroll 0pt 50% transparent"});
                counter.html("loading...");
                $(document.body).append(tooltip);
                tooltip.css("top",post[setting.position]+" !important");
                tooltip.css("right",posr[setting.position]+" !important");
                tooltip.css("left",posl[setting.position]+" !important");
                tooltip.css("bottom",posb[setting.position]+" !important");
            }
            //キーバインドの設定
            $(document).bind("keydown",setting.keybind,showAddForm);
            //はてブAPIの読み込み
            if(!flag){
                safari.self.tab.dispatchMessage('api',location.href);
                flag = true;
            }
        }
    },false);
    //設定の読み込み
    var setting;
    safari.self.tab.dispatchMessage("setting",location.href);
=======
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
>>>>>>> 344176d9d3fceee4591223e7375a56a06c8874ee
}
