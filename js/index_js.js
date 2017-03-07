window.onload = function() {

    /*************左侧菜单***************/
    var oLeft_box = document.getElementById('left_box');
    var left_app = document.getElementById('left_app');
    var aImg = left_app.getElementsByTagName('img');

    var doc_h = Math.floor((docH() - oLeft_box.offsetHeight) / 2);
    oLeft_box.style.top = doc_h + 'px';

    left_app.onmouseover = function() {

        document.onmousemove = function(ev) {

            var e = ev || event;

            for (var i = 0; i < aImg.length; i++) {

                var x = aImg[i].offsetLeft + aImg[i].offsetWidth / 2;
                var y = aImg[i].offsetTop + aImg[i].offsetHeight / 2 + left_app.offsetTop;

                var a = x - e.clientX;
                var b = y - e.clientY;

                var c = Math.sqrt(a * a + b * b);
                var scale = 0.8 - c / 300;

                if (scale < 0.5) {
                    scale = 0.5;
                };

                aImg[i].style.width = scale * 70 + 'px';
                aImg[i].style.height = scale * 70 + 'px';
            };
            return false;
        };

    };

    /************天气**************/
    var oTime = document.getElementById('time');
    var oWeather = document.getElementById('web_weather');
    var oWea_close = document.getElementById('wea_close');

    /*关闭天气窗口*/
    oWea_close.onclick = function() {

        oWeather.style.display = 'none';

    };

    /*时间函数*/
    time();
    setInterval(time, 1000);

    function time() {

        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();

        oTime.innerHTML = '当前时间为:' + h + ':' + setTim(m);
    };
    function setTim(n) {

        return n < 10 ? '0' + n: '' + n;

    };

    drag(oWeather, false); //调用拖动函数
    /***************桌面APP**************/
    var oWeb_app_div = document.getElementById('web_app_div');
    var aUl = oWeb_app_div.getElementsByTagName('ul');
    var oWeb_focus = document.getElementById('web_top_focus');
    var aLi = oWeb_focus.getElementsByTagName('li');
    var arrAli = [];
    var n = 0;
    var timer = null;
    var millisecond = 60000;

    for (var i = 1; i < aUl.length; i++) {

        aUl[i].style.left = -1500 + 'px';

    };

    for (var i = 0; i < aUl.length; i++) {

        arrAli.push(aUl[i].getElementsByTagName('li'));

    };
    //app布局
    //桌面app排序函数
    appLayout(3, true);

    function appLayout(a, direction) {

        for (var i = 0; i < arrAli.length; i++) {
            for (var j = 0; j < arrAli[i].length; j++) {
                if (direction) {
                    if (j > a) {
                        if (a == 1) {
                            startMove(arrAli[i][j], {
                                top: (j - (a + 1)) * 100,
                                left: 120
                            });
                            if (j >= (a + 3)) {
                                startMove(arrAli[i][j], {
                                    top: (j - (a + 3)) * 100,
                                    left: 240
                                });
                            };
                        } else {
                            startMove(arrAli[i][j], {
                                top: (j - (a + 1)) * 100,
                                left: 120
                            });
                        }
                    } else {
                        startMove(arrAli[i][j], {
                            top: j * 100,
                            left: 10
                        });
                    };
                } else {
                    startMove(arrAli[i][j], {
                        top: 0,
                        left: j * 120
                    })
                };
                //app拖拽
                drag(arrAli[i][j], true);
            };
        };
    };

    //桌面app自动切换
    // timer = setInterval(play, millisecond);
    function play() {

        num++;

        if (num > aLi.length - 1) num = 0;

        for (var i = 0; i < aLi.length; i++) {

            aLi[i].className = '';
        };
        aLi[num].className = 'active';
        if (num > n) {
            aUl[num].style.left = -1500 + 'px';
            startMove(aUl[n], {
                left: 1500,
                opacity: 0
            });
        } else if (num < n) {
            aUl[num].style.left = 1500 + 'px';
            startMove(aUl[n], {
                left: -1500,
                opacity: 0
            });
        };
        startMove(aUl[num], {
            left: 0,
            opacity: 100
        });
        n = num;
    };

    //点击序号添加cass
    for (var k = 0; k < aLi.length; k++) {
        aLi[k].index = k;
        aLi[k].onclick = function() {
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].className = '';
            };
            this.className = 'active';
            if (this.index > n) {
                aUl[this.index].style.left = -1500 + 'px';
                startMove(aUl[n], {
                    left: 1500,
                    opacity: 0
                });
            } else if (this.index < n) {
                aUl[this.index].style.left = 1500 + 'px';
                startMove(aUl[n], {
                    left: -1500,
                    opacity: 0
                });
            };
            startMove(aUl[this.index], {
                left: 0,
                opacity: 100
            });
            n = this.index;
        };
    };

    //滚轮事件
    var num = 0;
    var off = false;
    var off2 = false;
    var scrollFunc = function(ev) {
        //var direct=0;
        var e = ev || event;

        if (e.wheelDelta) { //IE/Opera/Chrome
            if (e.wheelDelta > 0) {
                num--;
                if (off2) {
                    num++;
                };
                if (num < 0) num = 4;
                off2 = !off2;
            } else {
                num++
                if (off) {
                    num--;
                };
                if (num > 4) num = 0;
                off = !off;
            };

        } else if (e.detail) { //Firefox
            if (e.detail > 0) {
                num--;
                if (num <= 0) num = 4;
            } else {
                num++
                if (num > 4) num = 0;
            };
        }

        for (var i = 0; i < aLi.length; i++) {
            aLi[i].className = '';
        };
        aLi[num].className = 'active';
        if (num > n) {
            aUl[num].style.left = -1500 + 'px';
            startMove(aUl[n], {
                left: 1500,
                opacity: 0
            });
        } else if (num < n) {
            aUl[num].style.left = 1500 + 'px';
            startMove(aUl[n], {
                left: -1500,
                opacity: 0
            });
        };
        startMove(aUl[num], {
            left: 0,
            opacity: 100
        });
        n = num;
        //timer = setInterval(play, millisecond);
    }
    /*注册事件*/
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    } //W3C
    window.onmousewheel = document.onmousewheel = scrollFunc; //IE/Opera/Chrome/Safari
    /**************换皮肤********************/
    var oMenu_focus = document.getElementById('menu_focus4');
    var oMeb_bj_win = document.getElementById('web_bj_win');
    var oWin_close = document.getElementById('bj_win_close');
    var oBj_win_ul = document.getElementById('bj_win_ul');
    var oBj_li = oBj_win_ul.getElementsByTagName('li');
    var oImg = document.getElementById('bj_img');
    var oTheme = document.getElementById('theme');

    var win_L = Math.floor((document.documentElement.clientWidth - oMeb_bj_win.offsetWidth) / 2);
    var win_T = Math.floor((document.documentElement.clientHeight - oMeb_bj_win.offsetHeight) / 2);
    //初始化窗口
    oMeb_bj_win.style.top = -800 + 'px';
    oMeb_bj_win.style.left = 304 + 'px';
    //拖拽函数	
    drag(oMeb_bj_win, false);

    oMenu_focus.onclick = function() {
        oMeb_bj_win.style.top = -800 + 'px';
        startMove(oMeb_bj_win, {
            top: win_T,
            left: win_L,
            opacity: 100
        });
        oMeb_bj_win.style.display = 'block'
    };
    //桌面右键菜单弹出窗口
    oTheme.onclick = function() {
        oMeb_bj_win.style.top = -800 + 'px';
        startMove(oMeb_bj_win, {
            top: win_T,
            left: win_L,
            opacity: 100
        });
        oMeb_bj_win.style.display = 'block'
    };

    oWin_close.onclick = function() {
        startMove(oMeb_bj_win, {
            opacity: 0
        },
        function() {
            oMeb_bj_win.style.display = 'none';
        });
    };
    //点击换肤
    for (var i = 0; i < oBj_li.length; i++) {
        oBj_li[i].index = i;
        oBj_li[i].onclick = function() {
            oImg.src = 'images/bg' + (this.index + 1) + '.jpg';
        };
    };

    /**************右键菜单*****************/
    var oRight_menu = document.getElementById('web_right_menu');
    var oRight_li = oRight_menu.getElementsByTagName('li');
    var oCro_but = document.getElementById('crosswise_but');
    var oLeng_but = document.getElementById('lengthways_but');

    document.oncontextmenu = function() {
        return false; //阻止系统默认事件
    };

    document.onmousedown = function(ev) {
        var e = ev || event;
        var menu_L = e.clientX + 'px';
        var menu_Y = e.clientY + 'px';
        //button 事件属性可返回一个整数，指示当事件被触发时哪个鼠标按键被点击。
        if (e.button == 2) {
            startMove1(oRight_menu, {
                opacity: 100
            });
            oRight_menu.style.display = 'block';
            oRight_menu.style.left = menu_L;
            oRight_menu.style.top = menu_Y;
        } else if (e.button == 0) {
            startMove1(oRight_menu, {
                opacity: 0
            },
            function() {
                oRight_menu.style.display = 'none';
            });

        };

    };
    //桌面app横向排列
    oCro_but.onclick = function() {
        appLayout(3, false);
    };
    //桌面app纵向排列
    oLeng_but.onclick = function() {
        appLayout(3, true);
    };

    /******************检测浏览器高度动态改变app布局*********************/
    window.onresize = function() {
        var doc_height = document.documentElement.clientHeight;

        if (doc_height > 600) appLayout(3, true);
        if (doc_height < 538) appLayout(2, true);
        if (doc_height < 424) appLayout(1, true);
        if (doc_height < 279) appLayout(1, false);
    };

    /*****************个人信息************************/
    var oPersonal = document.getElementById('personal');
    var oRe_win = document.getElementById('web_resume');
    var web_resume01 = document.getElementById('web_resume01');
    var web_resume02 = document.getElementById('web_resume02');
    var web_resume03 = document.getElementById('web_resume03');
    var web_resume04 = document.getElementById('web_resume04');
    var web_resume_close = document.getElementById('web_resume_close');
    var web_show = document.getElementById('web_show');

    //点击居中显示
    web_show.onclick = function() {

        this.style.display = 'none';
        oRe_win.style.display = 'block';

        oRe_win.style.right = -200 + 'px';
        oRe_win.style.top = -100 + 'px';

        var oRe_win_L = Math.floor((docW() - oRe_win.offsetWidth) / 2);
        var oRe_win_T = Math.floor((docH() - oRe_win.offsetHeight) / 2);

        startMove(oRe_win, {
            right: oRe_win_L,
            top: oRe_win_T
        },
        function() {
            //简历弹出动画
            startMove1(web_resume01, {
                height: 187,
                top: 0,
                opacity: 100
            },
            function() {

                startMove1(web_resume02, {
                    width: 301,
                    opacity: 100
                },
                function() {

                    startMove1(web_resume04, {
                        height: 187,
                        top: 187,
                        opacity: 100
                    },
                    function() {

                        startMove1(web_resume03, {
                            width: 301,
                            left: 0,
                            top: 187,
                            opacity: 100
                        },
                        function() {

                            web_resume_close.style.display = 'block';

                            startMove1(web_resume_close, {
                                opacity: 100
                            });

                        });

                    });

                });

            });

        });

    };

    web_resume_close.onclick = function() {

        this.style.display = 'block';
        startMove1(this, {
            opacity: 0
        },
        function() {
            //简历弹出动画
            startMove1(web_resume03, {
                width: 0,
                left: 301,
                top: 187,
                opacity: 0
            },
            function() {

                startMove1(web_resume04, {
                    height: 0,
                    top: 187,
                    opacity: 0
                },
                function() {

                    startMove1(web_resume02, {
                        width: 0,
                        opacity: 0
                    },
                    function() {

                        startMove1(web_resume01, {
                            height: 0,
                            top: 187,
                            opacity: 0
                        },
                        function() {

                            web_resume_close.style.display = 'block';
                            startMove(oRe_win, {
                                right: -200,
                                top: -100
                            },
                            function() {
                                oRe_win.style.display = 'none';
                                web_show.style.display = 'block';
                            });

                        });

                    });

                });

            });
        });

    };

    /*******************网页窗体***********************/
    var iframe = document.getElementsByTagName('iframe')[0];
    var web_content_win = document.getElementById('web_content_win');
    var content_title = document.getElementById('content_title');
    var web_content_btn = document.getElementById('web_content_btn');
    var aBtn = web_content_btn.getElementsByTagName('a');
    var left_app_ul = document.getElementById('left_app');
    var left_app_li = left_app_ul.getElementsByTagName('li');
    var web_app = document.getElementById('web_app_div');
    var web_app_ul = web_app.getElementsByTagName('ul');

    var webAppLi = [];

    for (var i = 0; i < web_app_ul.length; i++) {
        webAppLi.push(web_app_ul[i].getElementsByTagName('li'));
    };

    var aHttp = {
        '欢乐斗地主': 'http://web.3366.com/ddz/',
        '3366': 'http://mgp.qq.com/webqqindex.html',
        'QQ宝贝': 'http://qqbaby.qq.com/baby.html',
        '芒果乐游': 'http://www.4399.com/',
        '团购地图': 'http://www.mangocity.com/webqq/bookFlight.html',
        '快递查询': 'http://kuaidi100.com/frame/app/index.html',
        '网络硬盘': 'http://www.bjbqdz.com/',
        '百度云盘': 'http://pan.baidu.com/',
        '浏览网页': 'http://baidu.com/',
        '爱奇艺': 'http://www.iqiyi.com/',
        '芒果乐游': 'http://www.4399.com/',
        '起点中文': 'http://www.qidian.com/Default.aspx',
        'QQ阅读': 'http://qqreader.qq.com/',
        '音乐盒子': 'http://play.baidu.com/?from=mp3',
        '腾讯视频': 'http://v.qq.com/',
        '乐视网': 'http://www.letv.com/',
        '朋友网': 'http://www.pengyou.com',
        '好友管理': 'http://friend.pengyou.com/index.php?mod=friends&adtag=top_friend',
        '开开': 'http://id.qq.com/index.html',
        '腾讯视频': 'http://v.qq.com/',
        '腾讯视频': 'http://v.qq.com/',
        '微云网盘': 'http://www.weiyun.com/index.html',
        'QQ邮箱': 'http://mail.qq.com/cgi-bin/login',
        'QQ': 'http://connect.qq.com/',
        '搜狗地图': 'http://map.sogou.com/',
        '腾讯微博': 'http://t.qq.com/',
        'QQ空间': 'http://qzone.qq.com/',
        '文档说明': 'explain.html',
		'css作品1':'project/football/souye.html',
		'css作品2':'project/suit-dress/index.html'
    };

    //给app绑定事件
    for (var i = 0; i < webAppLi.length; i++) {
        for (var j = 0; j < webAppLi[i].length; j++) {
            webAppLi[i][j].ondblclick = function() {
                openWin(this.title);
                for (var attr in aHttp) {
                    if (this.title == attr) {
                        openWin(this.title, aHttp[attr]);
                    };
                };
            };
        };
    };
    for (var i = 0; i < left_app_li.length; i++) {
        left_app_li[i].onclick = function() {
            openWin(this.title);
            for (var attr in aHttp) {
                if (this.title == attr) {
                    openWin(this.title, aHttp[attr]);
                };
            };
        };
    };

    //关闭窗口
    aBtn[2].onclick = function() {
        startMove1(web_content_win, {
            height: 0,
            opacity: 0
        },
        function() {
            web_content_win.style.display = 'none';
        });
    };

    //窗口最大化
    var winOff = true;
    aBtn[1].onclick = function() {
        if (winOff) {
            this.className = 'maximize2';
            startMove1(web_content_win, {
                width: docW(),
                height: docH(),
                left: 0,
                top: 0
            });

            winOff = !winOff;
        } else {
            this.className = 'maximize';
            var webCon_L = Math.floor((docW() - 755) / 2);
            var webCon_T = Math.floor((docH() - 400) / 2);
            startMove1(web_content_win, {
                width: 755,
                height: 400,
                left: webCon_L,
                top: webCon_T
            });

            winOff = !winOff;
        };

    };

    //窗口最小化
    aBtn[0].onclick = function() {

        startMove1(web_content_win, {
            width: 100,
            height: 30,
            left: 150,
            top: 600
        });

    };

    //窗体封装
    function openWin(title, src) {
        iframe.src = src;
        web_content_win.style.width = 755 + 'px';
        web_content_win.style.height = 420 + 'px';
        web_content_win.style.display = 'block';
        web_content_win.style.filter = 'alpha(opacity=100)';
        web_content_win.style.opacity = 1;
        content_title.innerText = title;
        var webCon_L = (docW() - web_content_win.offsetWidth) / 2;
        var webCon_T = (docH() - web_content_win.offsetHeight) / 2;
        web_content_win.style.left = webCon_L + 'px';
        web_content_win.style.top = webCon_T + 'px';
    };

    drag(web_content_win, false);

    /*****************music*******************/
    var oMusic_box = document.getElementById('music_box');
    var oMusic = document.getElementById('audio-btn');
    var oMedia = document.getElementById('media');
    var oUp = document.getElementById('up');
    var oDown = document.getElementById('down');

    var Song = [
		'music/许巍 - 曾经的你.mp3',
		'music/南征北战 - 我的天空 - 电影 青春派 主题曲.mp3',
		'music/齐晨 - 咱们结婚吧.mp3', 'music/阿杜 - 坚持到底.mp3',
		'music/动画片 圣斗士星矢主题曲.mp3',
		'music/李承铉、王恩琦 - 会有天使替我爱你.mp3',
		'music/齐晨 - 咱们结婚吧.mp3',
		'music/千百惠 - 走过咖啡屋.mp3',
		'music/张国荣 - 倩女幽魂.mp3'
	];

    var num = 0;

    oMusic.onclick = function() {
        if (this.className == 'off') {
            this.className = 'on';
            oMedia.play();
        } else {
            this.className = 'off';
            oMedia.pause();
        };

    };

    oMusic.onmouseover = function() {
        var a = Song[num].indexOf('.mp3');
        this.title = Song[num].substring(6, a);
    };

    //下一首
    oDown.onclick = function() {
        control(1);
    };
    //上一首
    oUp.onclick = function() {
        control( - 1);
    };

    //自动下一首
    oMedia.onended = function() {
        control(1);
    };

    function control(a) {
        a > 0 ? num++:num--;
        if (num > Song.length - 1) num = 0;
        if (num < 0) num = Song.length - 1;
        oMedia.src = Song[num];
        oMedia.play();
        oMusic.className = 'on';
    };

    drag(oMusic_box, false)
};

//拖拽函数封装
function drag(obj, off) {
    var x = 0;
    var y = 0;
    var T = 0;
    var L = 0;

    obj.onmousedown = function(ev) {
        var e = ev || event;
        x = e.clientX - obj.offsetLeft;
        y = e.clientY - obj.offsetTop;
        T = parseInt(getStyle(obj, 'top'));
        L = parseInt(getStyle(obj, 'left'));

        document.onmousemove = function(ev) {
            var e = ev || event;
            var pieY = e.clientY - y;
            var pieX = e.clientX - x;
            //可视区
            var doc_W = document.documentElement.clientWidth - obj.offsetWidth;
            var doc_H = document.documentElement.clientHeight - obj.offsetHeight;

            if (pieY > doc_H) {
                pieY = doc_H;
            } else if (pieY < 0) {
                pieY = 0;
            };
            if (pieX > doc_W) {
                pieX = doc_W;
            } else if (pieX < 0) {
                pieX = 0;
            }
            obj.style.top = pieY + 'px';
            obj.style.left = pieX + 'px';

        };
        document.onmouseup = function() {
            if (off) {
                startMove(obj, {
                    left: L,
                    top: T
                });
            };
            document.onmousemove = null;
            document.onmouseup = null;
        };
        return false;
    };
};