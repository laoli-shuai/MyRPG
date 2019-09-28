//0对敌方效果  1对自身效果  2对友方效果  3对友方全体效果  4特殊效果  5对敌方全体效果

if (window.XMLHttpRequest) {
    var role = new XMLHttpRequest();
} else {
    var role = new ActiveXObject("Microsoft.XMLHTTP");
}

role.open("get", "role.json", true);

role.send();
var rolA = [];
var roles = null;
role.onreadystatechange = function () {
    if (role.readyState == 4 && role.status == 200) {
        //roles代表了角色的全部内容
        roles = JSON.parse(role.responseText);
        //rolA代表一个数组，用来存放角色名字
        //遍历对象，通过key来确定当前对象属性。对象都是通过键值对来保存的。
        for (let key in roles) {
            rolA.push(key);
            console.log(rolA);
            roles[key].card = function () {
                var that = this;
                this.Q = function () {
                    return parseInt(+that.atk * +that.Quick.bl);
                };
                this.A = function () {
                    return parseInt(+that.atk * +that.Arts.bl);
                };
                this.B = function () {
                    return parseInt(+that.atk * +that.Buster.bl);
                }
            };
            roles[key].card();
            //将buff属性转化为数组
            roles[key].buff = [];
        }
        // console.log(rolA);
    }
};
