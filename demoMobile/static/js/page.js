'use strict';
function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
}
/*rem处理*/
var AfedFn = {};
var myScroll;

AfedFn = {
    fontScale : 20 * innerWidth / 320,
    /*返回顶部*/
    toTop : function(obj){
        window.addEventListener('scroll',function(){
            var sT = document.body.scrollTop,
                winH = window.innerHeight;
            if(sT>winH/2){
                obj.classList.add('topShow');
            }else{
                obj.classList.remove('topShow');
            }
        },false);
        AfedFn.bindTouch(obj,function(e){
            /* window.scrollTo(0,0);*/
            document.body.scrollTop = 0;
        });
    },
    /*模态层处理*/
    lightBox :function(openBtn,openBox,closeBtn,openFn,closeFn){
        openBtn.addEventListener('click',function(){
            openBox.style.display = 'block';
            document.addEventListener('touchmove',AfedFn.prevent,false);
            closeBtn && AfedFn.bindTouch(closeBtn,cls);
            openBox.addEventListener('click',function(){
                var target =  event.target,
                    imgTag = target.tagName.trim() =='IMG',
                    clsTag = target.classList.contains('fullPage');

                clsTag && !imgTag && cls();
            },false);
            openFn && openFn();
            event.stopPropagation();

        },false);
        function cls(){
            openBox.style.display = 'none';
            closeFn && closeFn();
            document.removeEventListener('touchmove',AfedFn.prevent,false);
        }
    },
    prevent : function(){
        event.preventDefault();
        event.stopPropagation();
    },
    /*touch穿透*/
    bindTouch : function(obj,callBack){
        obj.addEventListener('click',function(){
            callBack && callBack(event);
            // event.stopPropagation();
        },false);
        /* obj.addEventListener('touchend',function(){
             setTimeout(function(){
                 callBack && callBack(event);
             },400);
           // event.stopPropagation();
         },false);*/
    },
    /*获取元素偏移位置*/
    getPos : function(obj){
        var t= 0,
            l= 0;

        while(obj){
            t+=obj.offsetTop;
            l+=obj.offsetLeft;
            obj = obj.offsetParent;

        }
        return {left :l ,top:t};
    },
    /*ajax 封装
   opts={
       url : 'http://www.baidu.com/',
       data :{
           param1 : value1,
           param2 : value2
       },
       type: 'get',
       success : function(){
       },
       fail : function(){
       }
   }
   */
    ajax : function(opts){
        opts = opts || {};
        opts.type = opts.type || 'get';
        opts.data = data2Url(opts.data);

        /*创建ajax对象*/
        var oAjax = window.XMLHttpRequest && new XMLHttpRequest();
        if(opts.type.toLocaleLowerCase()=='get')
        {
            /*建立连接*/
            oAjax.open('GET',opts.url+'?'+ opts.data,true);
            /*发送请求*/
            oAjax.send();
        }else if(opts.type.toLocaleLowerCase()=='post'){
            //POST
            oAjax.open('POST',opts.url,true);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded'); //设置请求头
            oAjax.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            oAjax.send(opts.data);
        }
        //alert(opts.url+'?'+ opts.data)

        oAjax.onreadystatechange = function(e){
            if(this.readyState == 4){
                if(this.status >=200 && this.status<=300 || this.status==304){
                    opts.success && opts.success(this.responseText);
                }else{
                    opts.fail && opts.fail(this.status);
                }
            }
        }
        /*拼接url*/
        function data2Url(data){
            var url = [];
            data.rnd = new Date().getTime();

            for(var name in data){
                url.push(name+'='+encodeURIComponent(data[name]));
            }
            return url.join('&');
        }
    },
    alertInfo : function(info){
        var oAlert = document.createElement('div');
        oAlert.classList.add('alert');
        oAlert.innerHTML = ' <div class="error"><i class="icon"></i><p>'+info+'</p></div>';
        document.body.appendChild(oAlert);
        oAlert.classList.add('active');
        oAlert.addEventListener('webkitAnimationEnd',function(){
            document.body.removeChild(oAlert);
        },false);

    },
    clipt : function(img){
        if(img.loaded){
            return false;
        }
        var newImg = new Image();
        newImg.src = img.src;
        newImg.onload = function(){
            if (this.complete) {
                var	imgH = newImg.height,
                    imgW = newImg.width,
                    rate = imgW/imgH,
                    oWrap = img.parentNode,
                    wrapW =parseFloat( getComputedStyle(oWrap,false)['width']),
                    wrapH =parseFloat( getComputedStyle(oWrap,false)['height']);

                img.loaded = true;

                if(rate>1){
                    img.style.height = wrapH/AfedFn.fontScale+'rem';
                }else{
                    img.style.width = wrapW/AfedFn.fontScale+'rem';
                }
            }
        };
    },
    clipImgs : function(){
        var aImgWrap = document.querySelectorAll('.imgClipt'),
            oImg = null;
        for(var i=0;i<aImgWrap.length;i++){
            oImg = aImgWrap[i].children[0];
            if(getComputedStyle(oImg,false)['display']!='none'){
                (function(img){
                    AfedFn.clipt(img);
                })(oImg);
            }
            /*  oImg.onclick= function(){
                 alert("height:"+this.style.height+"\nwidth:"+this.style.width);
             }*/
        }
    },
    tabsChage : function(className,fn){
        var tags= document.querySelectorAll(className);
        if(tags.length){
            for(var i=0,l=tags.length; i<l;i++){
                var oLi = tags[i].children;
                for(var j= 0,k=oLi.length;j<k;j++){
                    oLi[j].index = j;
                    oLi[j].onclick = function(){
                        var aTabCont = this.parentNode.parentNode.querySelectorAll('.tabCont');
                        for(var i=0,l=oLi.length;i<l;i++){
                            oLi[i].classList.remove('curr');
                            aTabCont[i].classList.remove('currShow');
                        }
                        this.classList.add('curr');
                        aTabCont[this.index].classList.add('currShow');
                        fn&&fn(this.index,this,aTabCont[this.index]);
                        event.stopPropagation();
                    }
                }
            }
        }
    },
    findParent : function(obj,cName){
        while(obj){
            if(obj.classList.contains(cName)){
                return obj;
            }
            obj = obj.parentNode;
        }
        return false;
    },
    dragImg : function(oUl,moveBack,endBack){/*拖拽*/
        var aLi = oUl.children,
            liW = aLi[0].offsetWidth+aLi[0].offsetLeft+1,
            ulW = liW* aLi.length,
            ulH =0,
            maxW = oUl.parentNode.offsetWidth,
            maxMove =ulW >maxW ? ulW - maxW : ulW,
            BUFFER = liW;

        /*初始化列表*/
        oUl.style.width = ulW +'px';
        ulH = oUl.offsetHeight;
        oUl.parentNode.style.height = ulH+'px';
        oUl.listLeft = oUl.listLeft || oUl.offsetLeft;

        if(ulW < maxW ){
            return false;
        }
        /**/
        oUl.addEventListener('touchstart',function(){
            var touchS  = event.targetTouches[0],
                startX = touchS.pageX,
                disX = startX - oUl.listLeft,
                startTime = new Date()*1;

            oUl.style.transition = 'none';
            oUl.addEventListener('touchmove',moveFn,false);
            oUl.addEventListener('touchend',endFn,false);

            function moveFn(){
                var touchM = event.targetTouches[0],
                    moveX = touchM.pageX;

                oUl.listLeft = moveX -disX; /*更新距离值*/

                oUl.listLeft >= BUFFER  && (oUl.listLeft = BUFFER);
                oUl.listLeft <= -maxMove-BUFFER && (oUl.listLeft =  -maxMove-BUFFER);

                oUl.style.webkitTransform = 'translate3d('+ oUl.listLeft+'px,0,0)';
                moveBack && moveBack(oUl.listLeft);

                event.preventDefault();
                event.stopPropagation();
            }
            function endFn(){
                var endX = event.changedTouches[0].pageX,
                    endDis = endX - startX,
                    endTime = new Date()*1;


                if(Math.abs(endDis) > 100 && endTime-startTime <200){
                    oUl.listLeft = endDis + oUl.listLeft;
                }


                if( oUl.listLeft >0/* && oUl.listLeft<= BUFFER */){
                    oUl.listLeft = 0;
                    oUl.style.webkitTransform = 'translate3d('+oUl.listLeft+'px,0,0)';
                }

                if(Math.abs(oUl.listLeft)>=maxMove /*&& Math.abs(oUl.listLeft) <= maxMove+BUFFER*/){
                    oUl.listLeft = -maxMove;

                    oUl.style.webkitTransform = 'translate3d('+oUl.listLeft+'px,0,0)';
                }

                oUl.style.webkitTransition = 'all 150ms ease-out';

                //console.log('final:  '+ oUl.listLeft);
                endBack && endBack(oUl.listLeft);
                oUl.removeEventListener('touchmove',moveFn,false);
                oUl.removeEventListener('touchend',endFn,false);
                event.stopPropagation();
            }

        },false);
    },
    slidTxt : function(aSlideBtn){ /*文字内容折叠*/
        for(var i=0;i<aSlideBtn.length;i++){
            var oTxt =  aSlideBtn[i].txtObj = AfedFn.findParent(aSlideBtn[i],'txtSlide').querySelector('.txt');

            if(!oTxt){
                aSlideBtn[i].style.display ="none";
                continue;
            }

            aSlideBtn[i].downTag = false;
            oTxt.initH = oTxt.offsetHeight;
            oTxt.scrollH = oTxt.scrollHeight;

            if(oTxt.initH == oTxt.scrollH) {
                aSlideBtn[i].parentNode.style.display ="none";
                continue;
            }

            aSlideBtn[i].addEventListener('click',function(e){
                var oTxt= this.txtObj;

                if(!this.downTag){
                    oTxt.style.height = oTxt.scrollH+'px';
                    this.classList.add('down');
                }
                else{
                    oTxt.style.height = oTxt.initH+'px';
                    this.classList.remove('down');
                }
                this.downTag = !this.downTag;

            },false);
        }
    },

    favorAct : function(oFavor){
        var oCopy = oFavor.children[0],
            workId = oFavor.dataset.id,
            oCount = oFavor.querySelector('.count'),
            countNum = oCount ? Number(oCount.innerHTML) : 0;

        if(oFavor.tag){
            AfedFn.alertInfo('你已经赞过了,谢谢你的参与');
            return false;
        }

        AfedFn.ajax({
            type : 'post',
            url : '/exhibitions/addlike/',
            data : {
                worksId : workId
            },
            "success" : function(data){
                data =new Function('return '+data)();
                if(data && data.code == '1'){
                    if(data.login == '1'){
                        oCopy.style.display = 'block';

                        setTimeout(function(){
                            oFavor.classList.add('favored');
                        },-20);
                        oCopy.addEventListener('webkitAnimationEnd',hideCopy,false);
                        countNum ++;
                        oCount ? (oCount.innerHTML = countNum) : (oFavor.innerHTML+='<cite class="count">'+countNum+'</cite>');
                        oFavor.tag =true;
                        AfedFn.alertInfo(data.msg);
                    } else {
                        var url = window.location.href;
                        //console.log(url)
                        window.location.href = "http://passport.artron.net/login?redirect=" + encodeURIComponent(url);
                    }
                } else {
                    AfedFn.alertInfo(data.msg || "网络异常");
                }
            }
        });

        event.stopPropagation();

        function hideCopy(){
            oCopy.style.display = 'none';
            oCopy.removeEventListener('webkitAnimationEnd',hideCopy,false);
        }
    },
    voteAct : function(oVote){
        var workId = oVote.dataset.id,
            activeHidden = document.getElementById('voteLinks'),
            inAppAct = document.getElementById('inAppAct').value,
            voteUrl = activeHidden ? activeHidden.value : '',
            oCount = oVote.querySelector('.count'),
            countNum = oCount ? Number(oCount.innerHTML) : 0,
            oStatus = oVote.querySelector('span'),
            vote = oVote.getAttribute("data-vote"),
            voteDis = oVote.classList.contains('voteDis');

        if(oVote.tag||voteDis){
            AfedFn.alertInfo('您已经投过票了，\<br\>24小时后再来吧~~');
            return false;
        }
        AfedFn.ajax({
            type : 'post',
            url : voteUrl,
            data : {
                worksId : workId
            },
            "success" : function(data){
                data =new Function('return '+data)();
                if(data && data.code == '1'){
                    if(data.login == '1'){
                        if(inAppAct==1) {
                            if (typeof(vote) == "undefined") {
                                vote=0;
                            }else{
                                vote = Number(vote)
                                vote =  !vote ? 0:vote;
                            }
                            if(vote==4){
                                data.msg="投票成功";
                                oVote.classList.add('voteDis');
                                oVote.tag =true;

                            }else {
                                data.msg="投票成功，还可投"+(4-vote)+"次";
                                oVote.setAttribute('data-vote',vote+1)
                            }
                        }else{
                            oVote.classList.add('voteDis');
                            oVote.tag =true;
                        }
                        oStatus.innerHTML='投票';
                        countNum ++;
                        oCount ? (oCount.innerHTML = countNum) : (oVote.innerHTML+='<cite class="count">'+countNum+'</cite>');
                        AfedFn.alertInfo(data.msg);
                    } else {
                        var url = window.location.href;
                        //console.log(url)
                        window.location.href = "http://passport.artron.net/login?redirect=" + encodeURIComponent(url);
                    }
                } else {
                    AfedFn.alertInfo(data.msg || "网络异常");
                }
            }
        });
        event.stopPropagation();
    },
    dragLoadMore :function(opts){
        opts.obj = opts.obj || null;  /*列表外围ul*/
        opts.imgData = opts.imgData || [];
        opts.noInfo = opts.noInfo || '暂无更多作品！';
        opts.moreInfo = opts.moreInfo || '<img src="/static/mobile/imgs/load.gif" alt="加载中">';
        opts.htmlStr = opts.htmlStr || '';
        opts.count = opts.count || 15;
        opts.loadType = opts.loadType || 'drag'; /*click-点击加载；drag-滚动加载*/

        if(opts.obj == null) {
            return false;
        }

        opts.obj.bLoadMore = true;
        opts.obj.loaded = 0;

        workImgInit();

        if(opts.loadType === 'drag'){
            window.addEventListener('scroll',function(){
                var scrollT =  document.body.scrollTop||document.documentElement.scrollTop,
                    winH = window.innerHeight,
                    bodyH =document.body.scrollHeight;

                /*向上拖动150px时加载更多*/
                if((scrollT+winH+150>= bodyH) && opts.obj.bLoadMore){
                    LoadList();
                }
            },false);
        }else if(opts.loadType ==='click'){
            opts.obj.addEventListener('click',function(){
                var oTarget = event.target;
                while(oTarget){
                    if(oTarget.classList =='clickAll'){
                        LoadList();
                        break;
                    }
                    oTarget = oTarget.parentNode;
                }
            },!1);
        }

        /*作品列表图片初始化*/
        function workImgInit(startIndex){
            var oMoreDrag = document.createElement('li');

            if(!opts.imgData || opts.imgData.length<1){
                oMoreDrag.innerHTML = opts.noInfo;
                oMoreDrag.classList.add('noInfo');
                opts.obj.appendChild(oMoreDrag);
                return false;
            }
            oMoreDrag.classList.add('moreDrag');
            oMoreDrag.innerHTML = opts.moreInfo;
            opts.obj.appendChild(oMoreDrag);
            LoadList();
        }
        /*上拉加载作品内容*/
        function LoadList(){
            var start = opts.obj.loaded || 0,
                frag = document.createDocumentFragment();

            if(start == opts.imgData.length) { return false;}
            opts.obj.loaded += opts.count;
            opts.obj.loaded = Math.min(opts.imgData.length,opts.obj.loaded);

            for(var i=start;i<opts.obj.loaded;i++){
                var oLi = document.createElement('li'),
                    dataSource = opts.imgData[i],
                    favorVoteHtml;
                oLi.innerHTML = templetInit(dataSource,opts.htmlStr);
                if(parseInt(dataSource.vote)){
                    switch(dataSource.vote){
                        case '1' :
                            favorVoteHtml = '<em class="voteIcn voteAble" onclick="AfedFn.voteAct(this)" data-id="'+dataSource.workId+'" data-vote="'+dataSource.votedNum+'"><span>投票</span>'+(dataSource.voteCount >0 ? '<cite class="count">'+dataSource.voteCount+'</cite></em>':'');
                            break;
                        case '2' :
                            favorVoteHtml = '<em class="voteIcn voteDis voted" onclick="AfedFn.voteAct(this)" data-id="'+dataSource.workId+'"><span>已投票</span>'+(dataSource.voteCount >0 ? '<cite class="count">'+dataSource.voteCount+'</cite></em>':'');
                            break;
                        case '3' :
                            favorVoteHtml = '<em class="voteIcn voteDis notBegin"><span>即将投票</span></em>';
                            break;
                        case '4' :
                            favorVoteHtml = '<em class="voteIcn voteDis end"><span>投票已结束</span>'+(dataSource.voteCount >0 ? '<cite class="count">'+dataSource.voteCount+'</cite></em>':'');
                            break;
                    }
                    oLi.innerHTML +=favorVoteHtml;
                }else if(dataSource.click || dataSource.lickCount){
                    oLi.innerHTML +='<em class="icon favorIcn'+(dataSource.click && dataSource.click=='1'? ' favored' : '')+'" onclick="AfedFn.favorAct(this)" data-id="'+dataSource.workId+'">&#xe606;<i>&#xe606;</i>'+(dataSource.likeCount && dataSource.likeCount!='0' ? '<cite class="count">'+dataSource.likeCount+'</cite>' : '' )+'</em>';
                }
                frag.appendChild(oLi);
            }
            opts.obj.appendChild(frag);
            var isDrag = opts.loadType === 'drag',
                isClick = opts.loadType === 'click',
                oClickAll = opts.obj.querySelector('.clickAll'),
                oMore = opts.obj.querySelector('.moreDrag');
            if(opts.obj.loaded <opts.imgData.length){
                isDrag && oMore && opts.obj.appendChild(oMore);
                if(isClick){
                    oMore && opts.obj.removeChild(oMore);
                    opts.obj.appendChild(oClickAll);
                    oClickAll.style.display = 'block';
                }
            }else{
                oMore && opts.obj.removeChild(oMore);
                if(isClick){
                    opts.obj.removeChild(oClickAll);
                }
            }
        }
        /*模板*/
        function templetInit(imgData,htmlStr){
            // 模板格式：{{$%src%$}}
            return htmlStr.replace(/\{\{\$\%\w+\%\$\}\}/g, function (s){
                return imgData[s.substring(4, s.length-4)];
            });
        }

    },

    /*图片延时加载*/
    lasyPageImg : function (){
        var aImg = document.querySelectorAll('img');

        lasyJudge(aImg);

        window.addEventListener('scroll',function(){
            lasyJudge(aImg);

        },false);
        /*图片延时加载*/
        function lasyJudge(aImgs){
            var sTop =  document.body.scrollTop,
                loadH = window.innerHeight*1.5;

            for(var i=0;i<aImgs.length;i++){
                var imgTop = AfedFn.getPos(aImgs[i]).top;
                if(imgTop<sTop+loadH){

                    aImgs[i].src =  aImgs[i].dataset.src ? aImgs[i].dataset.src : aImgs[i].src ;
                }
            }
        }
    },
    classMenu :function(){
        AfedFn.tabsChage('.cTags',function(index,oCurr){
            var oCurrCont =  document.querySelector('.currShow'),
                currTop = AfedFn.getPos(oCurr).top + oCurr.offsetHeight-1;

            oCurrCont.style.top = currTop +'px';
            document.addEventListener('click',cls,false);
            document.addEventListener('touchmove',AfedFn.prevent,false);
            AfedFn.bindTouch(oCurrCont,function(e){
                var oTarget = e.target;

                (oTarget.classList.contains('fullPage') || oTarget.tagName.toLowerCase()=='a' ) && cls();
            });

            function cls(){
                oCurrCont.classList.remove('currShow');
                oCurr.classList.remove('curr');
                document.removeEventListener('click',cls,false);
                document.removeEventListener('touchmove',AfedFn.prevent,false);
            }
        });
    },
    lasyImg : function(aImgs){
        for(var i=0;i<aImgs.length;i++){
            aImgs[i].dataset.src && (aImgs[i].src = aImgs[i].dataset.src);
        }
    },
    homePageInit : function (){
        var oFirst = document.getElementById('firstPage'),
            oSec = document.getElementById('secPage');

        if(!oFirst|| !oSec){return false;}

        /*首页首屏处理*/
        if(oFirst ){
            oSec && this.firstPageSlide({
                "firstPage" : oFirst,
                "secPage" : oSec,
                "pageDownFn" : function(){
                    var oFix = document.getElementById('fixNav');
                    oFix && oFix.classList.remove('hideFix');
                },
                "beforePageUpFn" : function(){
                    var oFix = document.getElementById('fixNav');
                    oFix && oFix.classList.add('hideFix');
                }
            });
        }
    },
    firstPageSlide: function (json) {
        var oFirst = json.firstPage ,
            oSec = json.secPage ,
            pageDownFn = json.pageDownFn,
            pageUpFn = json.pageUpFn,
            beforePageDownFn = json.beforePageDownFn,
            beforePageUpFn = json.beforePageUpFn,
            _class = this;

        oSec.dragAble = 'false';
        _class.dagSwitch(oFirst, function (dis) {
            if (dis < -100) {
                beforePageDownFn && beforePageDownFn();
                oSec.style.transition = 'all .5s ease';
                oSec.style.webkitTransform = 'translateZ(0)';
                oSec.style.top = '0px';
                document.getElementById('page').classList.remove('scrollForbid');
                oSec.addEventListener('webkitTransitionEnd', downEnd, false);
            }
            function downEnd() {
                this.bPreDef = true;
                this.dragAble = 'true';
                pageDownFn && pageDownFn();
                oSec.removeEventListener('webkitTransitionEnd', downEnd, false);
            }
        });

        _class.dagSwitch(oSec, function (dis) {
            if (dis > 100 && oSec.dragAble == 'true') {
                beforePageUpFn && beforePageUpFn();
                oSec.style.webkitTransform = 'translateZ(0)';
                oSec.style.transition = 'all .5s ease';
                oSec.style.top = '100%';
                document.getElementById('page').classList.add('scrollForbid');
                oSec.addEventListener('webkitTransitionEnd', upEnd, false);
            }
            function upEnd() {
                setTimeout(function () {
                    oSec.style.transition = 'none';
                }, 0);
                pageUpFn && pageUpFn();
                oSec.removeEventListener('webkitTransitionEnd', upEnd, false);
            }
        }, function (moveY) {
            oSec.bPreDef = moveY < 0 ? true : false;
        });
        oFirst.querySelector('.mainData').addEventListener('touchstart',function(){
            event.stopPropagation();
        },!1)
    },
    dagSwitch: function (obj, callBack, movefn) {
        obj.addEventListener('touchstart', function () {
            var touchS = event.targetTouches[0],
                startY = touchS.pageY,
                disY = startY,
                _this = this;

            _this.style.transition = 'none';
            _this.addEventListener('touchmove', pageMove, false);
            _this.addEventListener('touchend', pageEnd, false);

            function pageMove() {
                if (document.body.scrollTop >= 5) {
                    return false;
                }
                var touchM = event.targetTouches[0],
                    moveY = touchM.pageY;
                movefn && movefn(moveY - disY);
                !_this.bPreDef && event.preventDefault();
            }

            function pageEnd() {
                var endS = event.changedTouches[0],
                    endY = endS.pageY,
                    changeDis = endY - startY;

                if (document.body.scrollTop >= 5) {
                    return false;
                }
                callBack && callBack(changeDis);
                event.stopPropagation();
                _this.removeEventListener('touchmove', pageMove, false);
                _this.removeEventListener('touchend', pageEnd, false);
            }
            !_this.bPreDef && event.preventDefault();

        }, false);
    }

};

window.addEventListener('DOMContentLoaded',loadFn,false);
function loadFn(){
    var oToTop = document.getElementById('goTop'),
        oShare = document.getElementById('shareWrap'),
        aSlideBtn = document.querySelectorAll('.txtSlide .bMore'),
        aScroll = document.querySelectorAll('.scrollLeft'),
        aFavor = document.querySelectorAll('.widthFavor'),
        oSend =  document.getElementById('send'),
        oMenu = document.querySelector('.cTags'),
        oVideoSwiper= document.querySelector('.videoSwiper');


    AfedFn.homePageInit();
    /*简介展开*/
    aSlideBtn.length && AfedFn.slidTxt(aSlideBtn);
    /*图片列表拖拽*/
    aScroll.length && dragStart(aScroll);
    AfedFn.tabsChage('.sTag',function(index,oCurr){
        var aImgs = oCurr.querySelectorAll('img');
        AfedFn.lasyImg(aImgs);
        // oCurr.tag = true;
    });

    /*吊顶处理*/
    document.getElementById('bar') && topMenu();
    /*发表评论*/
    oSend && sendInit(oSend);

    /*列表分类*/
    oMenu && AfedFn.classMenu();
    /*返回顶部*/
    oToTop && AfedFn.toTop(oToTop);
    //oMapOpen && openMap(oMapOpen);
    oShare && share(oShare);

    /*视频轮播*/
    oVideoSwiper && swiperInit();

    document.getElementById('clapList') && clapList(document.getElementById('clapList'));
    /*************方法定义********/

    /*吊顶方法*/
    function topMenu(){
        var oWraper = document.getElementById('topMenu'),oMenuBtn,oMenu,oList;
        if(!oWraper) {return false;}

        oMenuBtn = oWraper.querySelector('.menuIco');
        oMenu = oWraper.querySelector('.menuItem');
        oList = oMenu.getElementsByTagName('ul')[0];
        oMenuBtn.onclick = function(){
            if(!oMenuBtn.count){
                oMenu.style.display = 'block';
                oList.style.height = oList.scrollHeight+'px';
                oMenuBtn.count = true;
                document.addEventListener('click',clsMenu,false);
            }else{
                clsMenu();
            }
            event.stopPropagation();

        };
        oList.onclick = function(){
            var target = event.target;
            if(target.tagName.toLowerCase() =='a'){
                clsMenu();
            }
            event.cancelBubble = true;
        }
        function clsMenu(){
            oList.style.height = '0px';
            oList.addEventListener('webkitTransitionEnd',transEnd,false);
            document.removeEventListener('click',clsMenu,false);

            function transEnd(){
                oMenu.style.display = 'none';
                oMenuBtn.count = false ;
                oList.removeEventListener('webkitTransitionEnd',transEnd,false);
            }
        }
    }
    /*图片列表拖拽*/
    function dragStart(aScroll){
        for(var i=0;i<aScroll.length;i++){
            AfedFn.dragImg(aScroll[i].querySelector('ul'));
        }
    }

    /*作品底层页分享处理*/
    function share(oShare){
        var oCls = oShare.querySelector('.cls'),
            oWx = oShare.querySelector('.weixin'),
            oGuidShare = document.getElementById('guaid_weixin'),
            shareIcn = document.querySelector('.shareIcn');

        AfedFn.lightBox(shareIcn,oShare,oCls);
        AfedFn.lightBox(oWx,oGuidShare,oGuidShare,function(){
            oShare.style.display ='none';
        });
        weixinCheck();
        function weixinCheck(){
            var iWeixin =is_weixin();
            if(iWeixin){
                oGuidShare.querySelector('.text').style.display = 'block';
                oGuidShare.querySelector('.qrCode').style.display = 'none';
            }else{
                oGuidShare.querySelector('.qrCode').style.display = 'block';
                oGuidShare.querySelector('.text').style.display = 'none';
            }
        }
        function is_weixin(){
            var ua = navigator.userAgent.toLowerCase();

            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                return true;
            }
            else {
                return false;
            }
        }

    }
    /*评论初始化*/
    function sendInit(oSend){
        var oCom = document.querySelector('.writeIcn'),
            oCancle = document.getElementById('cancel'),
            sHash = window.location.hash,
            reg =/^\#sended\#?/g;

        if(sHash && reg.test(sHash)){
            var oWrap = document.querySelector('.comment');
            if(oCom.dataset.login==1){
                showForm();
            }

            document.body.scrollTop = AfedFn.getPos(oWrap).top;
        }

        oCom.addEventListener('click',function(){
            showForm();
        },false);

        oCancle.addEventListener('click',function(){
            var oTxt = document.getElementById('comInput'),
                oComBox = document.getElementById('lablecomment');
            oCom.classList.remove('comOpen');
            oTxt.value ='';
            oTxt.blur();
            oComBox.style.height = '0px';
        },false);

        oSend.addEventListener('click',function(){
            if(oCom.dataset.login==0){
                var url = window.location.href+'#sended';
                window.location.href = "http://passport.artron.net/login?redirect=" + encodeURIComponent(url);
                return false;
            }
            sendComment(this);
        },false);

        function showForm(){
            var oTxt = document.getElementById('comInput'),
                oComBox = document.getElementById('lablecomment');

            if(oCom.dataset.login==0){
                var url = window.location.href+'#sended';
                window.location.href = "http://passport.artron.net/login?redirect=" + encodeURIComponent(url);
                return false;
            }
            oCom.classList.add('comOpen');
            oTxt.focus();
            oComBox.style.height = oComBox.scrollHeight+'px';
        }
    }
    /*发表评论*/
    function sendComment(oSend){
        var oForm = document.getElementById('forComment'),
            sTxt =  document.getElementById('comInput'),
            sMsg =  sTxt.value.replace(/^\s+|\s+$/,'');

        if(sMsg==''){
            AfedFn.alertInfo('请填写评论内容！');
            sTxt.value = '';
            return false;
        }
        AfedFn.ajax({
            "type" : "POST",
            "url" : oForm.action,
            "data" : {
                "leaveMessage" : sMsg
            },
            "success" : function(data){
                data = eval('('+data +')');
                if(data && data.code == 1){
                    var oDl = document.createElement('dl'),
                        oMore= document.querySelector('.moreCom'),
                        oTotal = document.getElementById('totalCom'),
                        oRecList = document.getElementById('retcomment'),
                        aChild = oRecList.children;

                    oDl.innerHTML = '<dt>\
                                        <span class="time">'+ data.time +'</span><em>'+data.username+'</em>\
                                    </dt>\
                                    <dd>'+sMsg+'</dd> ';

                    if(!aChild){
                        oRecList.appendChild(oDl);
                    }else{
                        aChild.length>=5 && oTotal && oRecList.removeChild(aChild[aChild.length-1]);
                        oRecList.insertBefore(oDl,aChild[0]);
                    }
                    AfedFn.alertInfo('发表成功！');
                    sTxt.value='';
                    sTxt.blur();
                    if(oTotal){
                        data.total ? (oTotal.innerHTML = data.total) : (oTotal.innerHTML= Number(oTotal.innerHTML)+1);
                        if(data.total > 5 || oTotal.innerHTML>5) {
                            oMore.classList.remove('noCom');
                            oTotal.innerHTML = data.total - 5;
                        }
                    }
                } else {
                    AfedFn.alertInfo(data.msg || "网络异常");
                }
            }
        });
    }
    function clapList(oClapList){
        var oList = oClapList.children,
            oFirstDD =  oList[0].querySelector('dd');
        oList[0].classList.add('curr');
        oFirstDD.style.height = oFirstDD.scrollHeight +'px';
        for(var i=0;i<oList.length;i++){
            oList[i].addEventListener('click',function(){
                var _this = this,
                    oDD = _this.querySelector('dd');

                for(var i=0;i<oList.length;i++){
                    oList[i].classList.remove('curr');
                    oList[i].querySelector('dd').style.height = '0px';

                }
                _this.classList.add('curr');
                oDD.style.height = oDD.scrollHeight+'px';

            },false);
        }
    }

    /*视频轮播*/
    function swiperInit() {
        new Swiper('.swiper-container',{
            autoplay:false,
            pagination:{
                el: '.pagination'
            }
        })
    }

}

function browserRedirect() {
　　var sUserAgent = navigator.userAgent.toLowerCase();
　　var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
　　var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
　　var bIsMidp = sUserAgent.match(/midp/i) == "midp";
　　var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
　　var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
　　var bIsAndroid = sUserAgent.match(/android/i) == "android";
　　var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
　　var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
　　if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
　　　　window.location.href="http://www.91hesuan.com/yijiaDemo";
　　} else {
　　　　window.location.href="http://www.91hesuan.com/yijiaDemoPc";
　　}　　　　
}
// browserRedirect();

