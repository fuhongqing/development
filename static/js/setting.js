var floorUrl='http://192.168.1.223/';//'http://192.168.1.223/';//'http://xmkfapi.ehaofang.com/'
var cityUrl='http://xiangmuglapi.ehaofang.net/';
var weihuUrl='http://hr.ehaofang.net/';
var statesUrl='http://hr.ehaofang.net/';//是否管理员
//登录人员信息
function _getCookie(key) {
    var str = document.cookie;
    var arr = str.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (key == arr2[0]) {
            return arr2[1]
        }
    }
    return "";
}
var userName='张三';//JSON.parse(decodeURIComponent(_getCookie("user").replace(/[\\]/g, ''))).name;//登录人名字
var createUserid=11;//JSON.parse(decodeURIComponent(_getCookie("user").replace(/[\\]/g, ''))).id;//
var thisstate=1;//	是	Integer	//权限是否为管理员 1为个人 2为管理员
var maintainerId;//维护人id
//suix下拉框选择改变字体颜色
$('.sui-dropdown-menu').on('click','li',function(){
    if($(this).children('a').html()!='请选择'){
        $(this).parent().prev().children('span').css('color','#333');
    }
});
var staiccount = 0;
//ajax过期设置
$.ajaxSetup({
    contentType : "application/x-www-form-urlencoded;charset=utf-8",
    complete : function(XMLHttpRequest, textStatus) {

        var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus"); // 通过XMLHttpRequest取得响应头，sessionstatus，

        if(staiccount >=1)
        {
            return;
        }
        if (sessionstatus == "timeout")
        {
            alert("长时间未操作,账户信息过期,请重新登录!");
            // 如果超时就处理 ，指定要跳转的页面
            window.location.replace("http://sso.ehaofangwang.com/ehaofang-ssoweb/pages/login.jsp");
            staiccount++;
        }
    }
});

//为数组原型添加一个方法，获得指定内容对应的下标
Array.prototype.indexOf=function(val){
    for(var i=0;i<this.length;i++){
        if(this[i]==val){
            return i;
        }
    }
    return -1;
};
//为数组原型添加一个方法，删除指定元素
Array.prototype.remove=function(val){
    var index=this.indexOf(val);
    if(index>-1){
        this.splice(index,1);
    }
};
//判断是否管理员
$.ajax({//
    type:'get',
    url:statesUrl+'api/outside/identity',
    data:{
        userId:createUserid//	是	Integer	当前登录人id
    },
    async:false,
    success(data){
        if(data.status=='success'){
            if(data.data=='2'){
                thisstate=2;
                maintainerId='';
            }else{
                thisstate=1;
                maintainerId=createUserid;
            }
        }else{
            alert('获取用户身份错误');
        }
    },
    error(){
        console.log('查询用户身份网络错误');
    }
});