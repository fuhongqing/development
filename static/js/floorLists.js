$(function(){
    //展开更多
    var isMore=false;
    $('#fold').click(function(){
        isMore=!isMore;
        if(isMore){
            $('#filter>.moreUl').show();
            $(this).children('span').html('收起选项').end().children('img').attr('src','../static/img/doubleUp.png');
        }else{
            $('#filter>.moreUl').hide();
            $(this).children('span').html('展开选项').end().children('img').attr('src','../static/img/doubleDown.png');
        }
    });
    //获取城市列表
    function getCitys(){
        $.ajax({
            type:'get',
            url:floorUrl+'api/property/v1/cityList',
            success(data){
                if(data.status=='success'){
                    var cityData=data.data;
                    var cityHtml='';
                    if(cityData.length>0){
                       $.each(cityData,function(i){
                           cityHtml+=`
                           <li id="${cityData[i].ID}" class="city">${cityData[i].CityName}</li>
                           `;
                       });
                        $('#filter>.area>.all').after(cityHtml);
                        var moreHtml=`
                        <li class="more">
                          <span>更多</span><img src="../static/img/down.png" alt=""/>
                        </li>
                        `;
                        if($('#filter>.area>li').size()>17){
                            $('#filter>.area>li:nth-child(17)').nextAll().hide().end().after(moreHtml);
                        }
                    }else{
                        console.log('获取城市列表失败');
                    }
                }
            },
            error(){
                console.log('获取城市网络错误');
            }
        });
    }
    getCitys();
    //城市展开更多
    var isMore=false;
    $('#filter>.area').on('click','li.more',function(e){
        e.stopPropagation();
        isMore=!isMore;
        if(isMore){
            $(this).children('span').html('收起').next('img').attr('src','../static/img/up.png');
            $('#filter>.area>li:nth-child(18)').nextAll().show().end().next().css('margin-left','70px');
        }else{
            $(this).children('span').html('更多').next('img').attr('src','../static/img/down.png');
            $('#filter>.area>li:nth-child(18)').nextAll().hide();
        }
    })
    .on('click','li.city',function(e){//点击城市获取区域
        e.stopPropagation();
            $(e.target).addClass('active').siblings().removeClass('active');
            //获取鼠标相对文档点击坐标，实现板块框可变移动
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var x = e.pageX -90 + 'px' || e.clientX -90 + scrollX + 'px';
            var y = e.pageY -105 + 'px' || e.clientY -105 + scrollY + 'px';
            if (parseFloat(x) > 535) {
                x = e.pageX + 33 - 656 + 'px' || e.clientX + scrollX + 33 - 656 + 'px';
            }
            //固定板块弹出框的上下位置
            $('#filter>.borough').css({
                left: x,
                top: y
            });
            thiscityId=$(e.target).attr('id');
            floorLists();
            $('#filter>.borough').show();
            $.ajax({
                type:'get',
                url:cityUrl+'api/property/v1/borough',
                data:{
                    cityId:thiscityId//	是	string	cityId
                },
                success(data){
                    if(data.status=='success'){
                        var boroughData=data.data;
                        var boroughHtml='';
                        if(boroughData.length>0){
                            $.each(boroughData,function(i){
                                boroughHtml+=`
                                <li id="${boroughData[i].id}" class="boroughName">${boroughData[i].boroughName}</li>
                                `;
                            });
                            var labelHtml=`
                            <li class="label">区域：</li>
                            <li class="all">不限</li>
                            `;
                            $('#borough').html(labelHtml+boroughHtml);
                        }
                    }else{
                        console.log('获取区域失败');
                    }
                },
                error(){
                    console.log('获取区域网络错误');
                }
            });
        })
    .on('click','li.all',function(e){
            $('#filter>.borough').hide();
            $(e.target).addClass('active').siblings().removeClass('active');
            thiscityId='';
            floorLists();
        });
    //点击空白处隐藏多选框
    $(document).click(function (e) {
        var _con = $('#filter>.borough,#filter>.area');//设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $('#filter>.borough').hide();
        }
    });
    var thissortType=1,//	是	Integer	排序类型（1默认排序 2剩余体量从大到小3剩余体量从小到大4剩余货值从大到小5剩余货值从小到大6最近维护时间从大到小7最近维护时间从小到大）
        thiscityId='',//	否	Integer	检索条件(地区城市ID)
        thisareaId='',//	否	Integer	检索条件(区域ID)
        thisbuildType='',//	否	Integer	检索条件(建筑类型:1别墅 2住宅 3商业 4其他)
        thissaleState='',//	否	Integer	检索条件(在售状态: 0 待售 1 在售 2 售罄)
        thisfollowStatus='',//	否	Integer	检索条件(跟进状态:1待扫盘 2 扫盘中 3 维护中 4 已提报 5 商务谈判 6 合同签订 7 无效盘)
        thissaleValue='',//	否	Integer	检索条件(货值区间:1为1亿以下,2为1-3亿,3为3-10亿,4为10亿以上)
        thissearch='',//	否	string	检索条件(输入楼盘名/地址)
        thismaintainerTimeBeg='',//	否	Date	检索条件(最新维护时间从:2018-04-13)
        thismaintainerTimeEnd='',//	否	Date	检索条件(最新维护时间到:2018-04-14)
        thispageNum=1,//	是	Integer	检索条件(起始页码:1为第1页)
        thispageSize=20;//	是	Integer	检索条件(页长:20为每页显示20条信息)
    var propertyListCount,pageSize;//列表条数
    var departmentType='大客户服务部';
    $('header').on('click','.btn',function(e){
        $(e.target).addClass('btnActive').siblings().removeClass('btnActive');
        if($(e.target).html()=='地图模式'){
            $(location).attr('href','/propertyMap?'+thisstate+'&'+createUserid);
        }
    });
    if(thisstate==2){
        $("#filter>ul.weihuren").css({
            'position':'static',
            'visibility':'visible'
        });
    }
    //跟进状态
    function followStatus(t){
        switch (t){
            case 1:
                return t='待扫盘';
                break;
            case 2:
                return t='扫盘中';
                break;
            case 3:
                return t='维护中';
                break;
            case 4:
                return t='已提报';
                break;
            case 5:
                return t='商务谈判';
                break;
            case 6:
                return t='合同签订';
                break;
            case 7:
                return t='无效盘';
                break;
            default :
                return t='其他';
                break;
        }
    }
    //目前销售类型
    function saleType(t){
        switch (t){
            case 1:
                return t='独家代理';
                break;
            case 2:
                return t='自销';
                break;
            case 3:
                return t='联合代理';
                break;
            default :
                return t='其他';
                break;
        }
    }
    //在售状态
    function saleState(t){
        switch (t){
            case 1:
                return t='待售';
                break;
            case 2:
                return t='在售';
                break;
            case 3:
                return t='售罄';
                break;
            default :
                return t='其他';
                break;
        }
    }
    //建筑类型
    function buildingTypeNum(t){
        var buildVal=t.split(',');
        var buildTypeHtml='';
        for(var i=0;i<buildVal.length;i++){
            if(buildVal[i]=='1'){
                buildTypeHtml+=`
                     <span class="buildBtn">别墅</span>
                `;
            }else if(buildVal[i]=='2'){
                buildTypeHtml+=`
                     <span class="buildBtn">住宅</span>
                `;
            }else if(buildVal[i]=='3'){
                buildTypeHtml+=`
                     <span class="buildBtn">商业</span>
                `;
            }else{
                buildTypeHtml+=`
                     <span class="buildBtn">其他</span>
                `;
            }
        }
        return buildTypeHtml;
    }
    //楼盘列表
    function floorLists(){
        $.ajax({
            type:'get',
            url:floorUrl+'api/property/v1/propertyList',
            data:{
                state:thisstate,//	是	Integer	//权限是否为管理员 1为个人 2为管理员
                sortType:thissortType,//	是	Integer	排序类型（1默认排序 2剩余体量从大到小3剩余体量从小到大4剩余货值从大到小5剩余货值从小到大6最近维护时间从大到小7最近维护时间从小到大）
                cityId:thiscityId,//	否	Integer	检索条件(地区城市ID)
                areaId:thisareaId,//	否	Integer	检索条件(区域ID)
                buildType:thisbuildType,//	否	Integer	检索条件(建筑类型:1别墅 2住宅 3商业 4其他)
                saleStates:thissaleState,//	否	Integer	检索条件(在售状态: 0 待售 1 在售 2 售罄)
                followStatus:thisfollowStatus,//	否	Integer	检索条件(跟进状态:1待扫盘 2 扫盘中 3 维护中 4 已提报 5 商务谈判 6 合同签订 7 无效盘)
                saleValue:thissaleValue,//	否	Integer	检索条件(货值区间:1为1亿以下,2为1-3亿,3为3-10亿,4为10亿以上)
                search:thissearch,//	否	string	检索条件(输入楼盘名/地址)
                maintainerTimeBeg:thismaintainerTimeBeg,//	否	Date	检索条件(最新维护时间从:2018-04-13)
                maintainerTimeEnd:thismaintainerTimeEnd,//	否	Date	检索条件(最新维护时间到:2018-04-14)
                maintainerId:maintainerId,//	否	Integer	检索条件(维护人ID)
                pageNum:thispageNum,//	是	Integer	检索条件(起始页码:1为第1页)
                pageSize:thispageSize//	是	Integer	检索条件(页长:20为每页显示20条信息)
            },
            success(data){
                if(data.status=='success'){
                    propertyListCount=data.data.propertyListCount;//列表条数
                    pageSize=Math.ceil(propertyListCount/20);//获取页码最大值
                    if(propertyListCount==0){
                        $('#pageNum').html('');
                    }
                    var floorListData=data.data.propertyList;
                    var floorListHtml='';
                    if(floorListData.length>0){
                        $.each(floorListData,function(i){
                            var buildTypeNum=floorListData[i].buildingType;
                            if(!floorListData[i].BoroughName){
                                floorListData[i].BoroughName=''
                            }
                            if(!floorListData[i].CityName){
                                floorListData[i].CityName=''
                            }
                            if(!floorListData[i].FullName){
                                floorListData[i].FullName=''
                            }
                            if(floorListData[i].saleValue==null){
                                floorListData[i].saleValue=''
                            }
                            if(floorListData[i].saleHouse==null){
                                floorListData[i].saleHouse=''
                            }
                            floorListHtml+=`
                            <tr id="${floorListData[i].id}">
                                <td class="clear">
                                    <div>${floorListData[i].name}</div>
                                    <div class="gt">${buildingTypeNum(buildTypeNum)}<span class="soldBtn">${saleState(floorListData[i].saleStatus)}</span></div>
                                    <div class="${floorListData[i].latitude}" id="${floorListData[i].longitude}"><span class="name">${floorListData[i].developerShortName}</span></div>
                                </td>
                                <td class="${floorListData[i].areaId}" id="${floorListData[i].cityId}">${floorListData[i].CityName}-${floorListData[i].BoroughName}</td>
                                <td>${followStatus(floorListData[i].followStatus)}</td>
                                <td>${floorListData[i].saleHouse}套</td>
                                <td>${floorListData[i].saleValue}亿</td>
                                <td>${saleType(floorListData[i].saleType)}</td>
                                <td>${floorListData[i].maintainerTime}</td>
                                <td id="${floorListData[i].maintainerId}">${floorListData[i].FullName}</td>
                            </tr>
                            `;
                        });
                        $('#tblLists>tbody').html(floorListHtml);
                        var pageHtml='',styleHtml='';
                        if(pageSize==0){
                            pageSize=1;
                        }
                        if(pageSize<7){
                            for(var i=1;i<=pageSize;i++){
                                pageHtml+=`
                           <li><a class="${i}">${i}</a></li>
                         `;
                            }
                            $('#pageNum').html(pageHtml);
                        }else{
                            styleHtml+=`
                          <li><a class="1">1</a></li>
                          <li><a class="2">2</a></li>
                          <li><a class="3">3</a></li>
                          <li><a class="4">4</a></li>
                          <li class="more"><a>...</a></li>
                          <li class="gtFour"><a></a></li>
                          <li class="nextMore"><a>...</a></li>
                          <li><a class="${pageSize}">${pageSize}</a></li>
                        `;
                            $('#pageNum').html(styleHtml);
                        }
                        $('#pageNum>li>a.'+thispageNum).parent().addClass('active');
                        if(thispageNum>=pageSize){
                            thispageNum=pageSize;
                            $('#pages>ul>li.next').addClass('disabled');
                            $('#pageNum>li:last-child').addClass('active');
                            $('#pageNum>li.nextMore').hide();
                            $('#pageNum>li.gtFour').hide();
                        }else if(thispageNum>4){
                            $('#pageNum>li.gtFour').show().addClass('active').siblings().removeClass('active').end().children('a').html(thispageNum).addClass(thispageNum);
                            $('#pageNum>li.nextMore').show();
                        }
                    }else{
                        $('#tblLists>tbody').html('');
                    }
                }else{
                    alert(data.info||'获取楼盘列表失败');
                }
            },
            error(){
                console.log('获取楼盘列表网络错误');
            }
        });
    }
    floorLists();
    //维护人列表
    $('#weihuDrop').on('click',function(e){
        $.ajax({
            type:'get',
            url:weihuUrl+'api/outside/dept-users',
            data:{
                departmentType:departmentType//	是	string	部门类型（填部门类型名，如“大客户服务部”）
            },
            success(data){
                if(data.status=='success'){
                    var result=data.data;
                    if(result.length>0){
                        var weihurenHtml='';
                        $.each(result,function(i){
                            weihurenHtml+=`
                         <li id="${result[i].userId}" role="presentation"><a role="menuitem" tabindex="-1" >${result[i].userName}</a></li>
                            `;
                        });
                        $('#weihuDropMenu').html(weihurenHtml);
                    }
                }else{
                    alert(data.info||'获取维护人失败');
                }
            },
            error(){
                console.log('获取维护人网络错误');
            }
        });
    });
    //维护人列表点击事件
    $('#weihuDropMenu').on('click','a',function(e){
        maintainerId=$(e.target).parent().attr('id');
        floorLists();
    });
    //区域筛选
    $('#filter>.borough').on('click','li.boroughName',function(e){
        e.stopPropagation();
        $(e.target).addClass('active').siblings().removeClass('active');
        thisareaId=$(e.target).attr('id');
        floorLists();
        $('#filter>.borough').hide();
    });
    //区域不限
    $('#borough').on('click','.all',function(e){
        $('#filter>.borough').hide();
        $(e.target).addClass('active').siblings().removeClass('active');
        thisareaId='';
        floorLists();
    });
    //建筑类型筛选
    $('#filter>.buildingType').on('click','li:not(.label)',function(e){
        $(e.target).addClass('active').siblings().removeClass('active');
        if($(e.target).hasClass('all')){
            thisbuildType='';
            floorLists();
        }else{
            thisbuildType=$(e.target).index()-1;
            floorLists();
        }
    });
    //在售状态筛选
    $('#filter>.saleStatus').on('click','li:not(.label)',function(e){
        $(e.target).addClass('active').siblings().removeClass('active');
        if($(e.target).hasClass('all')){
            thissaleState='';
            floorLists();
        }else{
            thissaleState=$(e.target).index()-1;
            floorLists();
        }
    });
    //跟进状态筛选
    $('#filter>.followStatus').on('click','li:not(.label)',function(e){
        $(e.target).addClass('active').siblings().removeClass('active');
        if($(e.target).hasClass('all')){
            thisfollowStatus='';
            floorLists();
        }else{
            thisfollowStatus=$(e.target).index()-1;
            floorLists();
        }
    });
    //货值筛选
    $('#filter>.totalCount').on('click','li:not(.label)',function(e){
        $(e.target).addClass('active').siblings().removeClass('active');
        if($(e.target).hasClass('all')){
            thissaleValue='';
            floorLists();
        }else{
            thissaleValue=$(e.target).index()-1;
            floorLists();
        }
    });
    //维护时间筛选
    $('#weihuTimeSure').on('click',function(){
        thismaintainerTimeBeg=$('#weihuTimeStart').val();
        thismaintainerTimeEnd=$('#weihuTimeEnd').val();
        if(thismaintainerTimeEnd==''){
            thismaintainerTimeEnd=new Date().toLocaleDateString();
        }
        floorLists();
    });
    //剩余体量筛选
    var isCountOrder=false;
    $('#tblLists>thead').on('click','.count',function(){
        isCountOrder=!isCountOrder;
        if(isCountOrder){
            thissortType=2;
            floorLists();
            $('#tblLists>thead .count .upImg').attr('src','../static/img/selectUp.png');
            $('#tblLists>thead .count .downImg').attr('src','../static/img/selectDown-a.png');
        }else{
            thissortType=3;
            floorLists();
            $('#tblLists>thead .count .upImg').attr('src','../static/img/selectUp-a.png');
            $('#tblLists>thead .count .downImg').attr('src','../static/img/selectDown.png');
        }
    });
    //剩余货值筛选
    var isTotalVal=false;
    $('#tblLists>thead').on('click','.totalVal',function(){
        isTotalVal=!isTotalVal;
        if(isTotalVal){
            thissortType=4;
            floorLists();
            $('#tblLists>thead .totalVal .upImg').attr('src','../static/img/selectUp.png');
            $('#tblLists>thead .totalVal .downImg').attr('src','../static/img/selectDown-a.png');
        }else{
            thissortType=5;
            floorLists();
            $('#tblLists>thead .totalVal .upImg').attr('src','../static/img/selectUp-a.png');
            $('#tblLists>thead .totalVal .downImg').attr('src','../static/img/selectDown.png');
        }
    });
    //剩余货值筛选
    var isWeihu=false;
    $('#tblLists>thead').on('click','.weihu',function(){
        isWeihu=!isWeihu;
        if(isWeihu){
            thissortType=6;
            floorLists();
            $('#tblLists>thead .weihu .upImg').attr('src','../static/img/selectUp.png');
            $('#tblLists>thead .weihu .downImg').attr('src','../static/img/selectDown-a.png');
        }else{
            thissortType=7;
            floorLists();
            $('#tblLists>thead .weihu .upImg').attr('src','../static/img/selectUp-a.png');
            $('#tblLists>thead .weihu .downImg').attr('src','../static/img/selectDown.png');
        }
    });
    //搜索框筛选
    $('#search').on('click','.add-on',function(){
        thissearch=$('#searchInput').val();
        floorLists();
        $('#searchInput').val('');
    });
    //enter键快捷操作
    $(window).keydown(function(e){
        if(e.which=='13'){
            event.returnValue=false;
            event.cancel = true;
            $('#search span.add-on').click();
        }
    });
    //跳转详情
    $('#tblLists>tbody').on('click','tr',function(){
        var floorId=$(this).attr('id');
        $(location).attr('href','/floorDetail?propertyId='+floorId);
    });
    //页码数的点击事件
    $('#pageNum').on('click','li:not(.more)>a',function(e){
        $(e.target).parent().addClass('active').siblings().removeClass('active');
        thispageNum=$(e.target).html();//获取当前页码
        floorLists();
        if(thispageNum<=4){
            $('#pageNum>li.nextMore').hide();
            $('#pageNum>li.gtFour').hide();
        }
        if(thispageNum>=propertyListCount){
            $('#pageNum>li.nextMore').hide();
            $('#pageNum>li.gtFour').hide();
        }
        if(thispageNum==1){
            $('#pages>ul>li.prev').addClass('disabled').siblings().removeClass('disabled');
        }else{
            $('#pages>ul>li.prev').removeClass('disabled');
        }
        if(thispageNum==propertyListCount){
            $('#pages>ul>li.next').addClass('disabled').siblings().removeClass('disabled');
        }else{
            $('#pages>ul>li.next').removeClass('disabled');
        }
    });
//向前翻页按钮的点击事件
    $('#pages>ul>li.next').on('click','a',function(e){
        thispageNum++;
        floorLists();
        $('#pages>ul>li.prev').removeClass('disabled');
        if(thispageNum<=4){
            $('#pageNum>li.active').removeClass('active').next().addClass('active');//为下一页加.active
        }
    });
//向后翻页的点击事件
    $('#pages>ul>li.prev').on('click','a',function(e){
        thispageNum--;
        floorLists();
        $('#pages>ul>li.next').removeClass('disabled');
        if(thispageNum<5){
            $('#pageNum>li.gtFour').hide();
            $('#pageNum>li.nextMore').hide();
            $('#pageNum>li.active').removeClass('active').prev().addClass('active');//为下一页加.active
            if($('#pageNum>li.more').hasClass('active')){
                $('#pageNum>li.more').removeClass('active').prev().addClass('active');
            }
        }else{
            $('#pageNum>li.gtFour').show().addClass('active').siblings().removeClass('active').end().children('a').html(thispageNum).addClass(thispageNum);
            $('#pageNum>li.nextMore').show();
        }
        if(thispageNum<=1){
            thispageNum=1;
            $('#pages>ul>li.prev').addClass('disabled');
            $('#pageNum>li:first-child').addClass('active');
        }
    });
});