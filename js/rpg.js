var active = document.getElementsByTagName('td');
var myMove = document.getElementById('move');
// var roleHome_ = document.getElementById('roleHome');
//添加css规则
function addCSSRule(sheet, selector, rules, index) {
    //判断sheet中是否含有该属性
    if ("insertRule" in sheet) {
        sheet.insertRule(selector + "{" + rules + "}", index);
    } else if ("addRule" in sheet) {
        sheet.addRule(selector, rules, index);
    }
}

//删除CSS规则
function delCSSRule(sheet) {
    sheet.deleteRule(0);
}

var arr = document.cookie.split("; ");

//角色替换
active[0].onclick = function () {
    window.location.href = "roleHome.html";
};

/*
function setCookie(n, v, t) {
    if (t == undefined) {
        document.cookie = n + "=" + v;
        return document.cookie
    }
    var odate = new Date();
    odate.setDate(odate.getDate() + t);
    document.cookie = n + "=" + v + ";expires=" + odate;
    return document.cookie;
}

function removeCookie(n) {
    setCookie(n, 1, -1);
}*/

// console.log(document.cookie);

function imgControl() {
    if (document.cookie != '') {
        let r = arr[0].split("=")[0];
        myMove.firstElementChild.src = "img/fgo小表情/" + r + ".jpg";
    }
}
imgControl();

for (let i = 1; i < active.length; i++) {
    active[i].onclick = function (e) {
        // console.log(active[i].className);
        //获取角色初始位置
        var rX = $('#move').position().left;
        var rY = $('#move').position().top;
        // console.log(rX, rY);
        const target = e.target;
        if (target.tagName == "TD") {
            var clientX = active[i].offsetLeft; //当前X坐标
            var clientY = active[i].offsetTop; //当前Y坐标
            // console.log(clientX);
            var X = clientX - rX;
            var Y = clientY - rY;
            //计算角色距离目标位置的x坐标方格数量。
            if (X > 0) {
                X = parseInt(X / 120);
            } else {
                X = parseInt(X / 120);
            }
            //计算y坐标
            if (Y > 0) {
                Y = parseInt(Y / 120);
            } else {
                Y = parseInt(Y / 120);
            }

            //过渡时间设置，以及定时器时间设置
            var playTime = Math.abs(X) + Math.abs(Y);
            //获取角色属性
            var role = document.getElementById('move');
            role.style.left = +clientX + "px";
            role.style.transition = Math.abs(X) + "s";
            setTimeout(f, Math.abs(X) * 1000);

            function f() {
                role.style.transition = Math.abs(Y) + "s";
                /*    由于css中一开始时定位设置的为bottom，所以在做第一次定位修改操作
                    的时候会产生bug，图片过渡属性设置失效*/
                role.style.top = +clientY + "px";
            }

            //动态添加规则
            /* var sty = "move " + parseInt(playTime / 2) + " " + playTime + "s both";
             console.log(sty);*/

            //修改动画图片
            {
                let r = arr[0].split("=")[0];
                myMove.firstElementChild.src = "img/fgo小表情/" + (r + r + r) + ".jpg";
            }

            //这里的动画，后面还需要进行修改，把背景图片的替换改到外面来。方便动画的重复使用。
            addCSSRule(document.styleSheets[0], "@keyframes move", `0% {transform:rotate3d(0,0,1,0deg)scale(1.1);}
            25% {transform:rotate3d(0,0,1,-10deg)scale(1.1);}
            50% {transform:rotate3d(0,0,1,10deg)scale(1.1);}
            75% {transform:rotate3d(0,0,1,-10deg)scale(1.1);}
            100% {transform:rotate3d(0,0,1,0deg)scale(1.1);}`);
            //删除规则
            //将添加的动画删除：因为动画的设置为infinite，会不断重复执行，所以要在人物移动结束后将动画删除。
            setTimeout(function () {
                delCSSRule(document.styleSheets[0]);
                imgControl();
            }, playTime * 1000);
        }

        //人物移动到boss目标位置后，进行页面跳转，跳转到战斗页面。
        if (active[i].className == "boss") {
            for (let z in active) {
                active[z].onclick = "";
            }
            setTimeout(function () {
                var challenge = confirm("是否进入boss房间");
                if (challenge == true) {
                    window.location.href = "boss.html";
                } else {
                    alert("你选择了逃避，上一个世界线的你已经没办法成为拯救世界的勇士了，已为你重新加载世界");
                    setTimeout(function () {
                        window.location.href = "RPG.html";
                    }, 1000);
                }
            }, playTime * 1000);
        }
    }
}


