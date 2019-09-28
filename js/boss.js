if (document.cookie.length <= 0) {
    document.cookie = "2=1";
    document.cookie = "3=1";
    document.cookie = "4=1";
}

//页面布局
var $p = $('.skill li p');
var $li = $('.skill li');
$p.css({'height': $p.width() + 'px'});
$p.css({'line-height': $p.height() + 'px'});
var a = $p.width() * 9;
var b = $p.height() * 16;
if (a > b) {
    $(window).resize(function () {
        $li = $('.skill li');
        $p.css({'height': $li.height() / 2 + 'px'});
        $p = $('.skill li p');
        $p.css({'width': $p.height() + 'px'});
        $p.css({'line-height': $p.height() + 'px'});
    });
} else {
    $(window).resize(function () {
        $p.css({'height': $p.width() + 'px'});
        $p.css({'line-height': $p.height() + 'px'});
    });
}


//数据整理
var cok = document.cookie.split('; ');
//coks用来保存角色代表的索引值，从1开始。
var coks = [];
for (let j in cok) {
    //拼接时返回的是拼接后的新数组，不会影响原数组。此处的分割的是cookie；
    coks = coks.concat(cok[j].split('=')[0]);
}
$('.role img').each(function (index, el) {
    $(el).attr("src", "./img/fgo小表情/" + coks[index] + ".jpg");
    $(el).css({'width': $(window).height * 6 / 35 + "px", 'height': $(window).height * 6 / 35 + "px"});
    // console.log($(window).height*6/35)
});

$('.skill li').each(function (index, el) {
    $(el).find('p').each(function (inl, ele) {
        $(ele).on('click', function () {
            event.stopPropagation();
            event.cancelBubble = true;
            var nowRole = roles[rolA[coks[index] - 1]];
            /*console.log(document.cookie);
            console.log(coks[index]);
            console.log(rolA[coks[index] - 1]);*/
            //roles 代表角色的全部内容，roleA代表角色名的数组，coks代表角色的索引。
            var str = "roles[rolA[coks[index]-1]].skill_" + (inl + 1).toString();
            //eval解析字符串为代码。
            var a = eval(str);
            var roleSkill = [];
            for (let key in a) {
                //使用数组存放当前角色技能组
                roleSkill.push(key, a[key]);
            }
            var $skill = $('#describe');
            //将事先设置好的div插入到目标位置，然后改变其相应的内部结构
            $skill.appendTo($(ele)).end().html("<h4>" + roleSkill[1] + "</h4><button>确认</button><button>取消</button>");
            $skill.css({
                'border-radius': '6px',
                'width': '200px',
                'height': '70px',
                'position': 'absolute',
                'bottom': '0',
                'left': '0',
                'background-color': '#e8ff94',
                'z-index': '9'
            });
            $skill.show();

//**********************************行动统计*************************************
            //技能效果：0对敌方效果
            // 1对自身效果
            // 2对友方效果
            // 3对友方全体效果
            // 4特殊效果
            // 5对敌方全体效果
            var boss_pow = 0;//boss初始充能0；
            $(ele).find('button:first').on('click', function () {
                event.stopPropagation();
                event.cancelBubble = true;
                $skill.hide();
                console.log(roleSkill);
                console.log(roleSkill[3]);
                switch (roleSkill[3]) {
                    case 0:roleSkill[7].indexOf('pow');
                }
            });
            $(ele).find('button:last').on('click', function () {
                event.stopPropagation();
                event.cancelBubble = true;
                $skill.hide();
            });
        })
    })
});





























