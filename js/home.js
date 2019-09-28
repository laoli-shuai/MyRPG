/*********************角色选择界面**********************/
var role = document.getElementById('roleHome');
var li_s = document.getElementsByTagName('li');
var button_s = document.getElementsByTagName('button');
var div_s = document.getElementsByClassName('pos-left');
var fight = document.getElementsByTagName('fight_start')[0];
var x;
var count = 0;
var counts = 0;

//设置cookie，记录上场角色
function setCookie(n,v,t) {
    if (t == undefined){
        document.cookie = n+"="+v;
        return document.cookie
    }
    var odate = new Date();
    odate.setDate(odate.getDate()+t);
    document.cookie = n+"="+v+";expires="+odate;
    return document.cookie;
}

function removeCookie(n) {
    setCookie(n,1,-1);
}

//为每个选择按钮添加点击选中事件。
for (let i = 0; i < li_s.length - 3; i++) {
    // console.log(i);
    div_s[i].style.left = -i*140+"px";
    li_s[i].style.backgroundImage = "url(img/fgo小表情/"+(+i+1)+".jpg)";
    //这里使用局部变量，计数每个角色上场个数
    let countR = 0;
    button_s[i].onclick = function (e) {
        var e = e || event;
        e.stopPropagation();
        e.cancelBubble = true;
//一旦选择角色就将之前的cookie全部清除
        for (let i = 1;i<=7;i++) {
            removeCookie(i);
        }

        //根据当前计数来判断角色上场是否超过限制。
        if (countR>=2){
            alert("当前角色最大上场数为2");
            var a = confirm("是否解开限制？");
            if (a == false){
                return;
            }else{
                countR = -100;
            }
        }
        countR++;
        let name = "";
        name+=(i+1);
        //保存cookie，以此判断选中角色是谁


        if (count == 0 && counts<=2) {
            li_s[li_s.length-3].style.backgroundImage = "url(img/fgo小表情/" + (+i+1) + ".jpg)";
            button_s[i].innerHTML = "已选";
            button_s[li_s.length-3].className = "";

            //cookie的设置要在点击成功的内部设置，否则会产生计数bug
            setCookie(name,countR);
            button_s[li_s.length-3].onclick = function (){
                button_s[i].innerHTML = "选择";
                button_s[li_s.length-3].className = "hidden_";
                li_s[li_s.length-3].style.backgroundImage = "none";
                //如果目标被替换，则清除当前的cookie；
                removeCookie(name);
                count = 0;
                counts--;
            };
            counts++;
            count = 1;
        } else if (count == 1 && counts<=2) {
            li_s[li_s.length-2].style.backgroundImage = "url(img/fgo小表情/" + (+i+1) + ".jpg)";
            button_s[i].innerHTML = "已选";
            button_s[li_s.length-2].className = "";
            setCookie(name,countR);
            button_s[li_s.length-2].onclick = function (){
                button_s[i].innerHTML = "选择";
                button_s[li_s.length-2].className = "hidden_";
                li_s[li_s.length-2].style.backgroundImage = "none";
                removeCookie(name);
                count = 1;
                counts--;
            };
            count = 2;
            counts++;
        } else if (count == 2 && counts<=2) {
            li_s[li_s.length-1].style.backgroundImage = "url(img/fgo小表情/" + (+i+1) + ".jpg)";
            button_s[i].innerHTML = "已选";
            button_s[li_s.length-1].className = "";
            setCookie(name,countR);
            button_s[li_s.length-1].onclick = function (){
                button_s[i].innerHTML = "选择";
                button_s[li_s.length-1].className = "hidden_";
                li_s[li_s.length-1].style.backgroundImage = "none";
                removeCookie(name);
                count = 2;
                counts--;
            };
            count = 3;
            counts++;
        }else {
            alert("已达最大上场人数！");
            console.log(document.cookie);
        }
        if (count>0){
            fight.style.display = "block";
        }
    };

    li_s[i].onclick = function () {
        li_s[i].firstElementChild.style.display = "block";
        var e = e || event;
        e.stopPropagation();
        e.cancelBubble = true;
    };

    li_s[i].ondblclick = function () {
        li_s[i].firstElementChild.style.display = "none";
        var e = e || event;
        e.stopPropagation();
        e.cancelBubble = true;
    }
}

fight.onclick =function () {
        window.location.href = "RPG.html";
};