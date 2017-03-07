// JavaScript Document
function startMove(obj, json, endFn) {

    clearInterval(obj.timer);

    obj.timer = setInterval(function() {

        var bBtn = true;

        for (var attr in json) {

            var iCur = 0;

            if (attr == 'opacity') {
                if (Math.round(parseFloat(getStyle(obj, attr)) * 100) == 0) {
                    iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100);

                } else {
                    iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100) || 100;
                }
            } else {
                iCur = parseInt(getStyle(obj, attr)) || 0;

            }

            var iSpeed = (json[attr] - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (iCur != json[attr]) {
                bBtn = false;
            }

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;

            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }

        }

        if (bBtn) {
            clearInterval(obj.timer);

            if (endFn) {
                endFn.call(obj);
            }
        }

    },
    30);

}

function startMove1(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {

        var bBtn = true;

        for (var attr in json) {

            var iCur = 0;
            if (attr == 'opacity') {
                iCur = Math.round(getStyle(obj, attr) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }

            var iSpeed = (json[attr] - iCur) / 3;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (iCur != json[attr]) {
                bBtn = false;
            }

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }

        }

        if (bBtn) {
            clearInterval(obj.timer);
            if (fn) {
                fn.call(obj);
            }
        }

    },
    30);
}

//匀速运动
function doMove(obj, json, endFn) {

    clearInterval(obj.timer);

    obj.timer = setInterval(function() {

        for (attr in json) {

            var dir = parseInt(getStyle(obj, attr)) < json[attr] ? 2 : -2;

            var speed = parseInt(getStyle(obj, attr)) + dir; //获取样式表里的left值
            if (speed > json[attr] && dir > 0 || speed < json[attr] && dir < 0) {

                speed = json[attr];

            };
            obj.style[attr] = speed + 'px';

            if (speed === json[attr]) {

                clearInterval(obj.timer);

                endFn && endFn();

            };

        };

    },
    30);

};

//获取CSS样式表里的属性值
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
}

function docW() {
    return document.documentElement.clientWidth;
};

function docH() {
    return document.documentElement.clientHeight;
};

function scrollY() {
    return document.body.scrollTop || document.documentElement.scrollTop;
}