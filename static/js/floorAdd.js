$(function() {
    //新增楼盘请求函数
    var thisName,//	是	string	项目名
        thisCityId,//	是	int	cityId
        thisAreaId,//	是	int	areaId
        thisAdressDetail,//	是	string	详细地址
        thisDeveloperFullName,//	是	string	开发商全称
        thisDeveloperShortName,//	是	string	开发商简称
        thisBuildingType,//	是	String	建筑类型 (此字段可多选 存储例如为 0,1,2)1别墅 2住宅 3商业 4其他
        thisSaleStatus,//	是	Integer	//在售状态 0 待售 1 在售 2 售罄
        thisMortgagePledge,//	否	Integer	抵押情况 0 有抵押 1无抵押
        thisConstructionProgress,//	否	Integer	建筑进度 0 打桩 1 浇筑 2封顶 3 竣工
        thisIsLoan,//	否	Integer	是否可贷款 0 否 1 是
        thisIsSign,//	否	Integer	是否限签 0 否 1是
        thisMaintainerId=createUserid,//	是	int	维护人id（登录人id）
        thisLongitude,//	是	Double	经度
        thisLatitude,//	是	Double	纬度
        thisTotalValue,//	否	Double	总货值
        thisSaleValue,//	否	Double	可售货值
        thisTotalArea,//	否	Double	总面积
        thisSaleArea,//	否	Double	可售面积
        thisTotalHouse,//	否	Double	总套数
        thisSaleHouse,//	否	Double	可售套数
        thisMinPrice,//	否	Double	最低单价
        thisMaxPrice,//	否	Double	最高单价
        thisMinAllPrice,//	否	Double	最低总价
        thisMaxAllPrice,//	否	Double	最高总价
        thisMinRecordPrice,//	否	Double	最低备案价
        thisMaxRecordPrice,//	否	Double	最高备案价
        thisMinFloorPrice,//	否	Double	最高总价
        thisMaxFloorPrice,//	否	Double	最低低价
        thisExperience,//	否	Integer	体验情况(1不需要保装2部分保装3整体重新保装4烂尾楼)
        thisPermitForpresale,//	否	String	预售许可证
        thisTermofValidity,//	否	Date	许可证有效期
        thisOpenPropertyDate,//	否	Date	首次开盘时间
        thisCreateUserId=createUserid,//	否	Integer	createUserId
        thisUpdateUserId=createUserid,//	否	Integer	updateUserId
        thisAgencyName,//	是	String	代理公司名
        thisSaleType,//	否	Integer	目前销售类型(1独家代理2自销3联合代理)
        thisFristAgentTime,//	否	Date	代理时间开始
        thisEndAgentTime,//	否	Date	代理时间结束
        thisAcceptSaleType,//	否	Integer	可接受销售类型(1接受代理目前无代理2独家代理3自销4联合代理5只做案场6只做联动)
        thisCommissionMethod,//	否	Integer	佣金方式(1.固定2.跳点3.报销)
        thisPartySupport,//	否	Integer	甲方支持(1班车2样板房3物料4饭盒)
        thisBond,//	否	Integer	保证金(1. 0-50万 2 50万-100万 3 100万-200万 4 200万 -300万 5 500万以上 )
        thisGroupPurchase,//	否	Integer	团购收取(1.甲方收2代理收)
        thisEmergencyDegree,//	否	Integer	紧急程度(1不紧急2一般3需要马上进场)
        thisFollowEffect,//	否	Integer	后续效应(1后续合作机会2提高知名度)
        thisLinkname,//	否	String	联系人姓名
        thisTelephone,//	否	String	联系人电话
        thisPosition,//	否	Integer	职位(1销售员2销售经理3营销总4项目总经理5股东6董事长7其他)
        thisCompeteDate,//	否	Date	竞得日期
        thisLandArea,//	否	Double	土地面积
        thisStartingPrice,//	否	Double	起始价
        thisBidPrice,//	否	Double	竞得价
        thisVolumetricRate,//	否	Double	容积率
        thisFloorPrice,//	否	Double	楼面价
        thisLandNature,//	否	Integer	用地性质(1住宅2商业/办公3工业4其他)
        thisPropertyRightLife,//	否	Integer	产权年限
        thisManagmentCompany,//	否	String	物业公司
        thisCompletionTime,//	否	Date	竣工时间
        thisPropertyType,//	否	Integer	物业类型 1 别墅 2住宅 3商业
        thisEarliestProvide,//	否	Date	最早交房时间
        thisPlotRatio,//	否	String	容积率
        thisGreeningRatio,//	否	String	绿化率
        thisPlanHouseholds,//	否	Integer	规划户数
        thisPropertyFee,//	否	Double	物业费
        thisParkingNumber,//	否	String	车位数
        thisDecorationStatus,//	否	Integer	装修情况 1 毛坯 2 简装修 3 精装修
        thisBuildingNumber,//	否	Integer	楼栋总数
        thisSupportingFacilities,//	否	String	配套设施
        thisStructureArea,//	否	Double	建筑面积
        thisFloorArea,//	否	Double	占地面积
        thisBusinessCircle;//	否	String	周边商圈
    function addSubmit(){
        thisName=$('#projectName').val();//	是	string	项目名
        thisDeveloperFullName=$('#developer').val();//	是	string	开发商全称
        thisDeveloperShortName=$('#abbreviation').val();//	是	string	开发商简称
        thisSaleStatus=$('#saleStatusMenu>li.active').index()+1;//	是	Integer	//在售状态 0 待售 1 在售 2 售罄
        thisMortgagePledge=$('#mortgageMenu>li.active').index()+1;//	否	Integer	抵押情况 0 有抵押 1无抵押
        thisConstructionProgress=$('#buildProgressMenu>li.active').index()+1;//	否	Integer	建筑进度 0 打桩 1 浇筑 2封顶 3 竣工
        thisIsLoan=$('#isLoanMenu>li.active').index()+1;//	否	Integer	是否可贷款 0 否 1 是
        thisIsSign=$('#isSignMenu>li.active').index()+1;//	否	Integer	是否限签 0 否 1是
        thisTotalValue=$('#totalPrice').val();//	否	Double	总货值
        thisSaleValue=$('#availablePrice').val();//	否	Double	可售货值
        thisTotalArea=$('#totalArea').val();//	否	Double	总面积
        thisSaleArea=$('#availableArea').val();//	否	Double	可售面积
        thisTotalHouse=$('#totalSet').val();//	否	Double	总套数
        thisSaleHouse=$('#availableSet').val();//	否	Double	可售套数
        thisMinPrice=$('#lowPrice').val();//	否	Double	最低单价
        thisMaxPrice=$('#highPrice').val();//	否	Double	最高单价
        thisMinAllPrice=$('#lowTotalPrice').val();//	否	Double	最低总价
        thisMaxAllPrice=$('#highTotalPrice').val();//	否	Double	最高总价
        thisMinRecordPrice=$('#lowRecordPrice').val();//	否	Double	最低备案价
        thisMaxRecordPrice=$('#highRecordPrice').val();//	否	Double	最高备案价
        thisMinFloorPrice=$('#bottomLowPrice').val();//	否	Double	最高总价
        thisMaxFloorPrice=$('#bottomHighPrice').val();//	否	Double	最低低价
        thisExperience=$('#experienceMenu>li.active').index()+1;//	否	Integer	体验情况(1不需要保装2部分保装3整体重新保装4烂尾楼)
        thisPermitForpresale=$('#permitCode').val();//	否	String	预售许可证
        thisTermofValidity=$('#permitTime').val();//	否	Date	许可证有效期
        thisOpenPropertyDate=$('#openTime').val();//	否	Date	首次开盘时间
        thisSaleType=$('#saleModelMenu>li.active').index()+1;//	否	Integer	目前销售类型(1独家代理2自销3联合代理)
        thisAcceptSaleType=$('#acceptSaleTypeMenu>li.active').index()+1;//	否	Integer	可接受销售类型(1接受代理目前无代理2独家代理3自销4联合代理5只做案场6只做联动)
        thisCommissionMethod=$('#commissionMethodMenu>li.active').index()+1;//	否	Integer	佣金方式(1.固定2.跳点3.报销)
        thisBond=$('#promiseMenu>li.active').index()+1;//	否	Integer	保证金(1. 0-50万 2 50万-100万 3 100万-200万 4 200万 -300万 5 500万以上 )
        thisGroupPurchase=$('#groupSituationMenu>li.active').index()+1;//	否	Integer	团购收取(1.甲方收2代理收)
        thisEmergencyDegree=$('#urgencyMenu>li.active').index()+1;//	否	Integer	紧急程度(1不紧急2一般3需要马上进场)
        thisFollowEffect=$('#followUpMenu>li.active').index()+1;//	否	Integer	后续效应(1后续合作机会2提高知名度)
        thisCompeteDate=$('#competitiveDate').val();//	否	Date	竞得日期
        thisLandArea=$('#buildingArea').val();//	否	Double	土地面积
        thisStartingPrice=$('#startingPrice').val();//	否	Double	起始价
        thisBidPrice=$('#competitivePrice').val();//	否	Double	竞得价
        thisVolumetricRate=$('#plotRatioStart').val();//	否	Double	容积率
        thisFloorPrice=$('#floorPrice').val();//	否	Double	楼面价
        thisLandNature=$('#landTypeMenu>li.active').index()+1;//	否	Integer	用地性质(1住宅2商业/办公3工业4其他)
        thisPropertyRightLife=$('#rightYears').val();//	否	Integer	产权年限
        thisManagmentCompany=$('#propertyCompany').val();//	否	String	物业公司
        thisCompletionTime=$('#completionTime').val();//	否	Date	竣工时间
        thisPropertyType=$('#propertyTypeMenu>li.active').index()+1;//	否	Integer	物业类型 0 别墅 1住宅 2商铺 3商住
        thisEarliestProvide=$('#checkRoom').val();//	否	Date	最早交房时间
        thisPlotRatio=$('#plotRatio').val();//	否	String	容积率
        thisGreeningRatio=$('#afforestationRate').val();//	否	String	绿化率
        thisPlanHouseholds=$('#planningHouse').val();//	否	Integer	规划户数
        thisPropertyFee=$('#floorManagement').val();//	否	Double	物业费
        thisParkingNumber=$('#parkingSpace').val();//	否	String	车位数
        thisDecorationStatus=$('#decorateMenu>li.active').index()+1;//	否	Integer	装修情况 1 毛坯 2 简装修 3 精装修
        thisBuildingNumber=$('#storiedBuilding').val();//	否	Integer	楼栋总数
        thisSupportingFacilities=$('#completeSet').val();//	否	String	配套设施
        thisStructureArea=$('#constructionArea').val();//	否	Double	建筑面积
        thisFloorArea=$('#coversArea').val();//	否	Double	占地面积
        thisBusinessCircle=$('#businessCircle').val();//	否	String	周边商圈
        $.ajax({
            type:'post',
            url:floorUrl+'api/property/v1/addproperty',
            data:{
                name:thisName,//	是	string	项目名
                cityId:thisCityId,//	是	int	cityId
                areaId:thisAreaId,//	是	int	areaId
                adressDetail:thisAdressDetail,//	是	string	详细地址
                developerFullName:thisDeveloperFullName,//	是	string	开发商全称
                developerShortName:thisDeveloperShortName,//	是	string	开发商简称
                buildingType:thisBuildingType,//	是	String	建筑类型 (此字段可多选 存储例如为 0,1,2)1别墅 2住宅 3商业
                saleStatus:thisSaleStatus,//	是	Integer	//在售状态 0 待售 1 在售 2 售罄
                mortgagePledge:thisMortgagePledge,//	否	Integer	抵押情况 0 有抵押 1无抵押
                constructionProgress:thisConstructionProgress,//	否	Integer	建筑进度 0 打桩 1 浇筑 2封顶 3 竣工
                isLoan:thisIsLoan,//	否	Integer	是否可贷款 0 否 1 是
                isSign:thisIsSign,//	否	Integer	是否限签 0 否 1是
                maintainerId:thisMaintainerId,//	是	int	维护人id（登录人id）
                longitude:thisLongitude,//	是	Double	经度
                latitude:thisLatitude,//	是	Double	纬度
                totalValue:thisTotalValue,//	否	Double	总货值
                saleValue:thisSaleValue,//	否	Double	可售货值
                totalArea:thisTotalArea,//	否	Double	总面积
                saleArea:thisSaleArea,//	否	Double	可售面积
                totalHouse:thisTotalHouse,//	否	Double	总套数
                saleHouse:thisSaleHouse,//	否	Double	可售套数
                minPrice:thisMinPrice,//	否	Double	最低单价
                maxPrice:thisMaxPrice,//	否	Double	最高单价
                minAllPrice:thisMinAllPrice,//	否	Double	最低总价
                maxAllPrice:thisMaxAllPrice,//	否	Double	最高总价
                minRecordPrice:thisMinRecordPrice,//	否	Double	最低备案价
                maxRecordPrice:thisMaxRecordPrice,//	否	Double	最高备案价
                minFloorPrice:thisMinFloorPrice,//	否	Double	最高总价
                maxFloorPrice:thisMaxFloorPrice,//	否	Double	最低低价
                experience:thisExperience,//	否	Integer	体验情况(1不需要保装2部分保装3整体重新保装4烂尾楼)
                permitForpresale:thisPermitForpresale,//	否	String	预售许可证
                termofValidity:thisTermofValidity,//	否	Date	许可证有效期
                openPropertyDate:thisOpenPropertyDate,//	否	Date	首次开盘时间
                createUserId:thisCreateUserId,//	否	Integer	createUserId
                updateUserId:thisUpdateUserId,//	否	Integer	updateUserId
                agencyName:thisAgencyName,//	是	String	代理公司名
                saleType:thisSaleType,//	否	Integer	目前销售类型(1独家代理2自销3联合代理)
                fristAgentTime:thisFristAgentTime,//	否	Date	代理时间开始
                endAgentTime:thisEndAgentTime,//	否	Date	代理时间结束
                acceptSaleType:thisAcceptSaleType,//	否	Integer	可接受销售类型(1接受代理目前无代理2独家代理3自销4联合代理5只做案场6只做联动)
                commissionMethod:thisCommissionMethod,//	否	Integer	佣金方式(1.固定2.跳点3.报销)
                partySupport:thisPartySupport,//	否	Integer	甲方支持(1班车2样板房3物料4饭盒)
                bond:thisBond,//	否	Integer	保证金(1. 0-50万 2 50万-100万 3 100万-200万 4 200万 -300万 5 500万以上 )
                groupPurchase:thisGroupPurchase,//	否	Integer	团购收取(1.甲方收2代理收)
                emergencyDegree:thisEmergencyDegree,//	否	Integer	紧急程度(1不紧急2一般3需要马上进场)
                followEffect:thisFollowEffect,//	否	Integer	后续效应(1后续合作机会2提高知名度)
                linkname:thisLinkname,//	否	String	联系人姓名
                telephone:thisTelephone,//	否	String	联系人电话
                position:thisPosition,//	否	Integer	职位(1销售员2销售经理3营销总4项目总经理5股东6董事长7其他)
                competeDate:thisCompeteDate,//	否	Date	竞得日期
                landArea:thisLandArea,//	否	Double	土地面积
                startingPrice:thisStartingPrice,//	否	Double	起始价
                bidPrice:thisBidPrice,//	否	Double	竞得价
                volumetricRate:thisVolumetricRate,//	否	Double	容积率
                floorPrice:thisFloorPrice,//	否	Double	楼面价
                landNature:thisLandNature,//	否	Integer	用地性质(1住宅2商业/办公3工业4其他)
                propertyRightLife:thisPropertyRightLife,//	否	Integer	产权年限
                managmentCompany:thisManagmentCompany,//	否	String	物业公司
                completionTime:thisCompletionTime,//	否	Date	竣工时间
                propertyType:thisPropertyType,//	否	Integer	物业类型 0 别墅 1住宅 2商铺 3商住
                earliestProvide:thisEarliestProvide,//	否	Date	最早交房时间
                plotRatio:thisPlotRatio,//	否	String	容积率
                greeningRatio:thisGreeningRatio,//	否	String	绿化率
                planHouseholds:thisPlanHouseholds,//	否	Integer	规划户数
                propertyFee:thisPropertyFee,//	否	Double	物业费
                parkingNumber:thisParkingNumber,//	否	String	车位数
                decorationStatus:thisDecorationStatus,//	否	Integer	装修情况 1 毛坯 2 简装修 3 精装修
                buildingNumber:thisBuildingNumber,//	否	Integer	楼栋总数
                supportingFacilities:thisSupportingFacilities,//	否	String	配套设施
                structureArea:thisStructureArea,//	否	Double	建筑面积
                floorArea:thisFloorArea,//	否	Double	占地面积
                businessCircle:thisBusinessCircle//	否	String	周边商圈
            },
            success:function(data){
                if(data.status=='success'){
                    alert('新增楼盘成功,2秒后跳转楼盘列表');
                    setTimeout(function(){
                        $(location).attr('href','/floorLists');
                    },2000);
                }else{
                    alert('新增楼盘失败');
                }
            },
            error:function(){
                console.log('网络错误');
            }
        });
    }
    //1基本信息
    //建筑类型多选
    var buildArr = [],buildIndex=[];
//建筑类型下拉框
    $('#buildingTypeMenu').on('click', 'li', function () {
        var curIndex=$(this).index()+1;
        if(buildIndex.indexOf(curIndex)==-1){
            buildIndex.push(curIndex);
        }else{
            return;
        }
        $(this).children('img').show();
        var aHtml = '';
        var buildName = $(this).children('div').text();
        if (buildArr.indexOf(buildName) == -1) {
            buildArr.push(buildName);
        } else {
            return;
        }
        $.each(buildArr, function (i) {
            aHtml += `
    <a><span>${buildArr[i]}</span><img class="delete" src="../static/img/delete.png" alt=""/></a>
    `;
        });
        $('#buildingType').html(aHtml);
        //建筑类型删除图标hover,click
        $('#buildingType>a>img').hover(function (e) {
                $(e.target).attr('src', '../static/img/delete-hover.png').css({
                    top: 0,
                    right: 0
                });
            },
            function (e) {
                $(e.target).attr('src', '../static/img/delete.png').css({
                    top: '2px',
                    right: '2px'
                });
            });
    });
    $('#buildingType').on('click', 'img.delete', function (e) {
        $(e.target).parent().remove();
        var deleteName = $(e.target).prev().text();
        buildArr.remove(deleteName);
        if (buildArr.length == 0) {
            $('#buildingType').html('请选择（多选）');
        }
        switch (deleteName) {
            case '别墅':
                buildIndex.remove('1');
                $('#buildingTypeMenu>.right0>img').hide();
                break;
            case '住宅':
                buildIndex.remove('2');
                $('#buildingTypeMenu>.right1>img').hide();
                break;
            case '商业':
                buildIndex.remove('3');
                $('#buildingTypeMenu>.right2>img').hide();
                break;
            case '其他':
                buildIndex.remove('4');
                $('#buildingTypeMenu>.right3>img').hide();
                break;
            default :
                break;
        }
    });
//点击空白处隐藏多选框
    $(document).click(function (e) {
        var _con = $('#buildingType,#buildingTypeMenu,#suggestMenu');//设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $('#buildingTypeMenu,#suggestMenu').hide();
        }
    });
//建筑类型，多选
    $('#buildingType').on('click', function () {
        $('#buildingTypeMenu').show();
        $(this).css('border-color','#ccc').parent().parent().parent().next().css('visibility','hidden');
    });
    //输入框聚焦，去除提示样式
    $('#boroughDrop,#saleStatus').on('click',function(){
        $(this).css('border-color','#ccc').parent().parent().parent().parent().next().css('visibility','hidden');
    });
    //地图
    var map = new BMap.Map("attrMap", {minZoom: 7, maxZoom: 19});
    var point=new BMap.Point(121.351868,31.228855);
    map.centerAndZoom(point, 10);
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.enableDragging();   //开启拖拽
    var myIcon = new BMap.Icon("../static/img/circle.png", new BMap.Size(95,95));
    var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
    map.addOverlay(marker);               // 将标注添加到地图中
    marker.enableDragging();
    map.panTo(point);
    //标注拖拽后的位置
    marker.addEventListener("dragend", function (e) {
        map.panTo(new BMap.Point(e.point.lng, e.point.lat));
        new BMap.Geocoder().getLocation(new BMap.Point(e.point.lng,e.point.lat), function (rs) {
            var addComp = rs.addressComponents;
            var address = addComp.province + addComp.city + addComp.district + addComp.street +
                addComp.streetNumber;
            $('#suggestId').val(address);
        });
    });
    //输入城市地图切换相应市
    $('#mapCityName').blur(function(){
        map.centerAndZoom($('#mapCityName').val(), 10);
    });
    //区域选择
    $('#mapBorough').click(function(){
        $('#mapBoroughMenu').show();
    });
    $('#boroughDrop').click(function(){
        $('#boroughMenu').show();
    });
    $('#mapBoroughMenu').on('click','a',function(e){
        e.stopPropagation();
        $('#boroughDrop>a>span').html($(e.target).html()).css('color','#333');
        $('#mapBorough>a>span').html($(e.target).html()).css('color','#333');
        $('#mapBoroughMenu').hide();
        thisAreaId=$(e.target).parent().attr('class');
        map.centerAndZoom($('#mapCityName').val()+$(e.target).html(), 10);
    });
    //根据地址查询经纬度
    var localSearch = new BMap.LocalSearch(map);
    localSearch.enableAutoViewport(); //允许自动调节窗体大小
    function searchByStationName(keyword) {
        localSearch.setSearchCompleteCallback(function (searchResult) {
            var poi = searchResult.getPoi(0);
            thisLongitude=poi.point.lng;//	是	Double	经度
            thisLatitude=poi.point.lat;//	是	Double	纬度
            //map.centerAndZoom(poi.point, 10);
        });
        localSearch.search(keyword);
    }
    //地图模糊匹配地址
    var suggestStr='',region;
    $('#suggestId').focus(function(){
        $(this).css('border-color','#ccc');
    });
    $('#suggestId').keyup(function(){
        suggestStr=$('#suggestId').val();//检索内容
        region=$('#mapCityName').val()||$('#cityName').val();//限定城市搜索
        map.centerAndZoom(suggestStr, 10);
        $.ajax({
            url:'http://api.map.baidu.com/place/v2/suggestion',
            type:'GET',
            data:{
                query:suggestStr,
                region:region,
                city_limit:'true',
                output:'json',
                ak:'CB2ede775afeb6e413abd40261396a69'
            },
            dataType:'jsonP',
            success:function(data){
                if(data.message=='ok'){
                    $('#suggestMenu').show();
                    var resultData=data.result;
                    var suggestHtml='';
                    $.each(resultData,function(i){
                        suggestHtml+=`
                        <li id="${resultData[i].location.lng}" class="${resultData[i].location.lat}">${resultData[i].name}</li>
                        `;
                    });
                    $('#suggestMenu').html(suggestHtml);
                }else{
                    console.log('无匹配信息');
                }
            },
            error:function(){
                console.log('请求地图网络出错');
            }
        });
    });
    //模糊地址菜单选择
    $('#suggestMenu').on('click','li',function(e){
        $('#suggestMenu').hide();
        $('#suggestId').val($(e.target).html());
        map.clearOverlays();//清除图层覆盖物
        var suggestLat,suggestLng;
        suggestLng=$(e.target).attr('id');
        suggestLat=$(e.target).attr('class');
        var newPoint=new BMap.Point(suggestLng, suggestLat);
        map.centerAndZoom($(e.target).text(), 10);
        var marker = new BMap.Marker(newPoint,{icon:myIcon});  // 创建标注
        map.addOverlay(marker);               // 将标注添加到地图中
        marker.enableDragging();
        //标注拖拽后的位置
        marker.addEventListener("dragend", function (e) {
            map.panTo(new BMap.Point(e.point.lng, e.point.lat));
            new BMap.Geocoder().getLocation(new BMap.Point(e.point.lng,e.point.lat), function (rs) {
                var addComp = rs.addressComponents;
                var address = addComp.province + addComp.city + addComp.district + addComp.street +
                    addComp.streetNumber;
                $('#suggestId').val(address);
            });
        });
    });
    //地图弹框展开
    $('#mapAttress').click(function(){
        $('#mapAttress>div').css('visibility','visible');
    });
    //地图弹框取消
    $('#confirm>span:last-child').click(function(e){
        e.stopPropagation();
        $('#mapAttress>div').css('visibility','hidden');
        $('#mapCityName').val('');
        $('#suggestId').val('');
        $('#mapBorough>a>span').html('请选择');
    });
    //地图弹框确认
    $('#confirm>span:first-child').click(function(e){
        e.stopPropagation();
        if($('#suggestId').val()==''){
            $('#suggestId').css('border-color','#FF4949');
            alert('详细地址不能为空');
            return;
        }else{
            thisAdressDetail=$('#suggestId').val();
            searchByStationName(thisAdressDetail);//获取经纬度
            $('#mapAttress>div').css('visibility','hidden');
            //$('#suggestId').val('');
        }
    });
    //城市查询区域
    $('#cityName').keyup(function(){
        var cityName=$(this).val();
        $.ajax({
            type:'get',
            url:cityUrl+'api/property/v1/city',
            data:{
                searchstr:cityName//是	string	查询字段
            },
            success(data){
                if(data.status=='success'){
                    var result=data.data;
                    if(result.length>0){
                        $('#cityNameMenu').show();
                        var cityNameHtml='';
                        $.each(result,function(i){
                            cityNameHtml+=`
                        <li class="${result[i].id}">${result[i].cityName}</li>
                        `;
                        });
                        $('#cityNameMenu').html(cityNameHtml);
                    }
                }else{
                    alert(data.info||'查询失败');
                }
            },
            error(){
                console.log('查询城市网络错误');
            }
        });
    });
    $('#cityNameMenu').on('click','li',function(){
        thisCityId=$(this).attr('class');
        $('#cityName').val($(this).html());
        $('#mapCityName').val($(this).html());
        map.centerAndZoom($(this).html(), 10);
        $('#cityNameMenu').hide();
        $.ajax({
            type:'get',
            url:cityUrl+'api/property/v1/borough',
            data:{
                cityId:thisCityId	//是	string	cityId
            },
            success(data){
                if(data.status=='success'){
                    var result=data.data;
                    if(result.length>0){
                        var boroughHtml='';
                        $.each(result,function(i){
                            boroughHtml+=`
                        <li class="${result[i].id}" role="presentation"><a role="menuitem" tabindex="-1" >${result[i].boroughName}</a></li>
                        `;
                        });
                        $('#boroughMenu').html(boroughHtml);
                        $('#mapBoroughMenu').html(boroughHtml);
                    }
                }else{
                    alert(data.info||'查询失败');
                }
            },
            error(){
                console.log('查询区域网络错误');
            }
        });
        var propertyName=$('#projectName').val();
        $.ajax({
            type:'get',
            url:floorUrl+'api/property/v1/judgePropertyName',
            data:{
                propertyName:propertyName,//	是	string	楼盘名
                cityId:thisCityId//	是	string	城市id
            },
            success(data){
                if(data.status=='exist'){
                    alert('楼盘名重复');
                    return;
                }
            },
            error(){
                console.log('项目名验重网络错误');
            }
        });
    });
    $('#boroughMenu').on('click','a',function(e){
        e.stopPropagation();
        thisAreaId=$(e.target).parent().attr('class');//区域id
        $('#mapBorough>a>span').html($(e.target).html()).css('color','#333');
        $('#boroughDrop>a>span').html($(e.target).html()).css('color','#333');
        $('#boroughMenu').hide();
        map.centerAndZoom($(e.target).html(), 10);
    });
    $('#mapCityName').keyup(function(){
        var cityName=$(this).val();
        $.ajax({
            type:'get',
            url:cityUrl+'api/property/v1/city',
            data:{
                searchstr:cityName//是	string	查询字段
            },
            success(data){
                if(data.status=='success'){
                    var result=data.data;
                    if(result.length>0){
                        $('#mapCityNameMenu').show();
                        var mapCityNameHtml='';
                        $.each(result,function(i){
                            mapCityNameHtml+=`
                        <li class="${result[i].id}">${result[i].cityName}</li>
                        `;
                        });
                        $('#mapCityNameMenu').html(mapCityNameHtml);
                    }
                }else{
                    alert(data.info||'查询失败');
                }
            },
            error(){
                console.log('查询城市网络错误');
            }
        });
    });
    $('#mapCityNameMenu').on('click','li',function(){
        $('#mapCityName').val($(this).html());
        $('#cityName').val($(this).html());
        $('#mapCityNameMenu').hide();
        thisCityId=$(this).attr('class');
        $.ajax({
            type:'get',
            url:cityUrl+'api/property/v1/borough',
            data:{
                cityId:	thisCityId//是	string	cityId
            },
            success(data){
                if(data.status=='success'){
                    var result=data.data;
                    if(result.length>0){
                        var mapBoroughHtml='';
                        $.each(result,function(i){
                            mapBoroughHtml+=`
                        <li class="${result[i].id}" role="presentation"><a role="menuitem" tabindex="-1" >${result[i].boroughName}</a></li>
                        `;
                        });
                        $('#boroughMenu').html(mapBoroughHtml);
                        $('#mapBoroughMenu').html(mapBoroughHtml);
                    }
                }else{
                    alert(data.info||'查询失败');
                }
            },
            error(){
                console.log('查询区域网络错误');
            }
        });
    });
    $('#cityName').focus(function(){
        $('#boroughDrop>a>span').html('请选择');
        $('#mapBorough>a>span').html('请选择');
    });
    $('#mapCityName').focus(function(){
        $('#mapBorough>a>span').html('请选择');
        $('#boroughDrop>a>span').html('请选择');
    });
    // 下一步
    $('#basicInfo>footer>span').click(function(){
        if($('#projectName').val()==''){
            $('#projectName').css('border-color','#FF4949').parent().parent().parent().next().css('visibility','visible');
            alert('请填写项目名称');
            return;
        }
        if($('#cityName').val()==''){
            $('#cityName').css('border-color','#FF4949').parent().parent().parent().next().css('visibility','visible');
            alert('请填写城市名');
            return;
        }
        if($('#boroughDrop>a>span').html()=='请选择'){
            $('#boroughDrop').css('border-color','#FF4949').parent().parent().parent().parent().next().css('visibility','visible');
            alert('请选择区域');
            return;
        }
        //if($('#plateDrop>a>span').html()=='请选择'){
        //    $('#plateDrop').css('border-color','#FF4949').parent().parent().parent().parent().next().css('visibility','visible');
        //    alert('请选择板块');
        //    return;
        //}
        if($('#suggestId').val()==''){
            $('#mapAttress>div').css('visibility','visible');
            $('#suggestId').css('border-color','#FF4949');
            alert('请填写详细地址');
            return;
        }
        if($('#developer').val()==''){
            $('#developer').css('border-color','#FF4949').parent().parent().parent().next().css('visibility','visible');
            alert('请填写开发商全称');
            return;
        }
        if($('#abbreviation').val()==''){
            $('#abbreviation').css('border-color','#FF4949').parent().parent().parent().next().css('visibility','visible');
            alert('请填写开发商简称');
            return;
        }
        if($('#buildingType').html()=='请选择（多选）'){
            $('#buildingType').css('border-color','#FF4949').parent().parent().parent().next().css('visibility','visible');
            alert('请选择建筑类型');
            return;
        }
        if($('#saleStatus>a>span').html()=='请选择'){
            $('#saleStatus').css('border-color','#FF4949').parent().parent().parent().parent().next().css('visibility','visible');
            alert('请选择在售状态');
            return;
        }
        thisBuildingType=buildIndex.join(',');//建筑类型
        $('#basicInfo').hide();
        $('#countContent').show();
    });
    //2,体量&销售信息
    //验证数字类型
    $('input.mustNum').blur(function(e){
        if(!/^[0-9]*$/.test($.trim($(e.target).val()))){
            alert('请输入合法数值');
            return;
        }
    });
    //2上一步
    $('#countContent>footer>span:last-child').click(function(){
        $('#basicInfo').show();
        $('#countContent').hide();
    });
    //2下一步
    $('#countContent>footer>span.gt').click(function(){
        $('#countContent').hide();
        $('#cooprate').show();
    });
    //3,合作情况&项目联系人
    /*可目前销售模式*/
    var acceptName='';
    $('#saleModelMenu').on('click','a',function(e){
        acceptName=$(e.target).html();
        if(acceptName=='独家代理'){
            $('#agent0').show();
        }else{
            $('.agentRow').hide();
        }
    });
    var agentCount = 0,agentIdCount=0;//记录代理公司新增个数
    var agentNameArr=[],agentTimeSArr=[],agentTimeEArr=[];
//代理公司，代理时间
    $('#agent0').on('click', 'img.add', function () {
        agentCount += 1;
        agentIdCount+=1;
        if(agentCount>=5){
            agentCount=5;
            alert('最多只能添加5条');
        }else{
            var agentHtml = `
        <div id="agent${agentIdCount}" class="agentRow sui-row-fluid">
                <div class="span6 tipControl">
                    <form class="sui-form form-horizontal">
                        <div class="control-group">
                            <label class="control-label">代理公司名</label>
                            <div class="controls">
                                <input type="text" id="agentCompany${agentIdCount}" class="focusInput" placeholder="请输入内容"/>
                            </div>
                            <img src="../static/img/must.png" alt=""/>
                        </div>
                    </form>
                    <span class="tipText">请填写代理公司名</span>
                </div>
                <div class="span6">
                    <form class="sui-form form-horizontal">
                        <div data-toggle="datepicker" class="control-group input-daterange">
                            <label class="control-label">代理时间段</label>
                            <div class="controls">
                                <input id="agentTimeStart${agentIdCount}" type="text" class="date input-medium" placeholder="请选择"/>
                                <img class="agentDate" src="../static/img/date.png" alt=""/>
                                <span class="to">至</span>
                                <input id="agentTimeEnd${agentIdCount}" type="text" class="date dateEnd input-medium" placeholder="请选择"/>
                                <img class="agentDate end" src="../static/img/date.png" alt=""/>
                                <img class="add reduce" src="../static/img/reduce.png" alt=""/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
            $('#agent0').after(agentHtml);
        }
        $('.focusInput').focus(function(e){
            $(e.target).css('border-color','#ccc').parent().parent().parent().next().css('visibility','hidden');
        });
    });
    //删除行
    $('#cooprate>section>div:first-child').on('click','img.reduce',function(e){
        agentCount-=1;
        $(e.target).parent().parent().parent().parent().parent().remove();
    });
    //输入框聚焦去除提示样式
    $('.focusInput').focus(function(e){
        $(e.target).css('border-color','#ccc').parent().parent().parent().next().css('visibility','hidden');
    });
    $('#job').on('click',function(){
        $(this).css('border-color','#ccc').parent().parent().parent().parent().next().css('visibility','hidden');
    });
    $('#cooprate').on('click','input.date',function(e){
        $(e.target).css('border-color','#ccc');
    });
    //联系人电话失去焦点验证输入内容
    $('#LinkPhone').blur(function(){
        var phoneReg=/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
        if(!phoneReg.test($('#LinkPhone').val())){
             alert('请输入合法的联系电话');
        }
    });
//新增项目联系人
    var jobArr=[],nameArr=[],phoneArr=[];
    $('#contacts').on('click', 'span.add', function () {
        if($('#job .job').html() == '请选择'||$('#LinkName').val()==''||$('#LinkPhone').val()==''){
            alert('请填完必填信息');
            return;
        }
        var jobSelect = $('#job>a>span').text();//职位
        var contactName = $('#LinkName').val();//联系人姓名
        var phoneNum = $('#LinkPhone').val();//联系电话
        jobArr.push($('#jobMenu>li.active').index()+1);
        nameArr.push(contactName);
        phoneArr.push(phoneNum);
        //清空数据
        $('#job>a>span').text('请选择');
        $('#LinkName').val('');
        $('#LinkPhone').val('');
        var tblHtml = `
    <tr>
        <td>${jobSelect}</td>
        <td>${contactName}</td>
        <td>
            <span>${phoneNum}</span><img class="reduce" src="../static/img/reduce.png" alt=""/>
        </td>
    </tr>
    `;
        $('#tbl>tbody').append(tblHtml);
    });
//删除联系人
    $('#tbl>tbody').on('click', 'img.reduce', function (e) {
        var removeIndex=$(e.target).parent().parent().index()-1;
        jobArr.splice(removeIndex,1);
        nameArr.splice(removeIndex,1);
        phoneArr.splice(removeIndex,1);
        $(e.target).parent().parent().remove();
    });
    var supportArr = [],supportIndex=[];
//甲方支持下拉框
    $('#supportMenu').on('click', 'li', function () {
        var curIndex=$(this).index()+1;
        var aHtml = '';
        var supportName = $(this).children('div').text();
        $(this).children('img').show();
        if(supportIndex.indexOf(curIndex)==-1){
            supportIndex.push(curIndex);
        }else{
            return;
        }
        if (supportArr.indexOf(supportName) == -1) {
            supportArr.push(supportName);
        } else {
            return;
        }
        $.each(supportArr, function (i) {
            aHtml += `
    <a><span>${supportArr[i]}</span><img class="delete" src="../static/img/delete.png" alt=""/></a>
    `;
        });
        $('#support').html(aHtml);
        //甲方支持删除图标hover,click
        $('#support>a>img').hover(function (e) {
                $(e.target).attr('src', '../static/img/delete-hover.png').css({
                    top: 0,
                    right: 0
                });
            },
            function (e) {
                $(e.target).attr('src', '../static/img/delete.png').css({
                    top: '2px',
                    right: '2px'
                });
            });
    });
    $('#support').on('click', 'img.delete', function (e) {
        $(e.target).parent().remove();
        var deleteName = $(e.target).prev().text();
        supportArr.remove(deleteName);
        if (supportArr.length == 0) {
            $('#support').html('请选择（多选）');
        }
        switch (deleteName) {
            case '班车':
                supportIndex.remove('1');
                $('#supportMenu>.right0>img').hide();
                break;
            case '样板房':
                supportIndex.remove('2');
                $('#supportMenu>.right1>img').hide();
                break;
            case '物料':
                supportIndex.remove('3');
                $('#supportMenu>.right2>img').hide();
                break;
            case '盒饭':
                supportIndex.remove('4');
                $('#supportMenu>.right3>img').hide();
                break;
            default :
                break;
        }
    });
//点击空白处隐藏多选框
    $(document).click(function (e) {
        var _con = $('#support,#supportMenu');//设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $('#supportMenu').hide();
        }
    });
//甲方支持，多选
    $('#support').on('click', function () {
        $('#supportMenu').show();
    });
//3上一步
    $('#cooprate>footer>span:last-child').click(function () {
        $('#countContent').show();
        $('#cooprate').hide();
    });
//3下一步
    $('#cooprate>footer>span.gt').click(function () {
        if(acceptName=='独家代理'){
            for (var i = 0; i <= agentIdCount; i++) {
                if ($('#agentCompany'+i).val() == '') {
                    $('#agent'+i+' .tipText').css('visibility', 'visible');
                    $('#agentCompany'+i).css('border-color', '#FF4949');
                    alert('请填写代理公司名');
                    agentNameArr=[];
                    agentTimeSArr=[];
                    agentTimeEArr=[];
                    return;
                }
                if($('#agentTimeStart'+i).val()==''&&$('#agentTimeEnd'+i).val()!=''){
                    $('#agentTimeStart'+i).css('border-color', '#FF4949');
                    alert('请填写代理开始时间');
                    agentNameArr=[];
                    agentTimeSArr=[];
                    agentTimeEArr=[];
                    return;
                }
                if($('#agentTimeEnd'+i).val()==''&&$('#agentTimeStart'+i).val()!=''){
                    $('#agentTimeEnd'+i).css('border-color', '#FF4949');
                    alert('请填写代理结束时间');
                    agentNameArr=[];
                    agentTimeSArr=[];
                    agentTimeEArr=[];
                    return;
                }
                if($('#agentCompany'+i).val()!=undefined){
                    agentNameArr.push($('#agentCompany'+i).val());
                    agentTimeSArr.push($('#agentTimeStart'+i).val());
                    agentTimeEArr.push($('#agentTimeEnd'+i).val());
                }else{
                    continue;
                }
            }
        }
        //判断项目联系人是多个还是一个
        if($('#tbl>tbody>tr').size()==1){
            if ($('#job .job').html() == '请选择') {
                $('td>.jobTip').css('visibility', 'visible');
                $('td.tipControl').css('padding-bottom', '20px');
                $('#job').css('border-color', '#FF4949');
                alert('请选择联系人职称');
                return;
            }
            if ($('#LinkName').val() == '') {
                $('#LinkName').css('border-color', '#FF4949');
                $('td.tipControl').css('padding-bottom', '20px');
                $('td>.nameTip').css('visibility', 'visible');
                alert('请填写联系人姓名');
                return;
            }
            if ($('#LinkPhone').val() == '') {
                $('#LinkPhone').css('border-color', '#FF4949');
                $('td.tipControl').css('padding-bottom', '20px');
                $('td>.phoneTip').css('visibility', 'visible');
                alert('请填写联系人电话');
                return;
            }
            thisPosition=$('#jobMenu>li.active').index()+1;
            thisLinkname=$('#LinkName').val();
            thisTelephone=$('#LinkPhone').val();
        }else{
            thisPosition=jobArr.join(',');
            thisLinkname=nameArr.join(',');
            thisTelephone=phoneArr.join(',');
        }
        thisPartySupport=supportIndex.join(',');//甲方支持
        thisAgencyName=agentNameArr.join(',');//代理公司
        thisFristAgentTime=agentTimeSArr.join(',');//代理
        thisEndAgentTime=agentTimeEArr.join(',');//代理

        $('#addLand').show();
        $('#cooprate').hide();
    });
//4上一步
    $('#addLand>footer>span:last-child').click(function () {
        agentNameArr=[];
        agentTimeSArr=[];
        agentTimeEArr=[];
        $('#addLand').hide();
        $('#cooprate').show();
    });
    //4提交
    $('#submit').click(function(){
        addSubmit();
    });
});