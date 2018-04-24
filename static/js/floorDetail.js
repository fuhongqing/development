$(function(){
    var floorId=35;//location.search.slice(1).split('=')[1];//楼盘id
    var attributeId='';//体量id
    var salesinformationId='';//销售id
    var cooperationId='';//合作id
    var landId='';//土地id
    var detailId='';//详情id
    var departmentType='大客户服务部';//部门类型
    var weihuId='';//维护人id
    var isstats=1;//是否公盘 1公盘
    var weihuName='';//维护人姓名
    //模态框
    function modifyMol(mdId,myMolId){
        $(mdId).click(function(){
            $('#cover').show();
            $(myMolId).show().css({
                'opacity':'1',
                'top':'15%'
            });
        });
        $(myMolId).on('click','.cancel',function(){
            $('#cover').hide();
            $(myMolId).hide();
        });
    }
    //基本信息
    modifyMol('#md1','#myModal1');
    //新增项目联系人
    modifyMol('#md2','#myModal2');
    //设置维护人
    modifyMol('#md3','#myModal3');
    //体量修改
    modifyMol('#md4','#myModal4');
    //销售信息修改
    modifyMol('#md5','#myModal5');
    //合作情况修改
    modifyMol('#md6','#myModal6');
    //土地情况修改
    modifyMol('#md7','#myModal7');
    //楼盘详情修改
    modifyMol('#md8','#myModal8');
    //详情
    var developShort='',//开发商简称
        developFull='',//开发商全称
        proName='',//项目名
        soldStatus='',//在售
        buildTVal='',//建筑类型
        propertyAdd='',//小区地址
        cityVal='',//城市
        broghVal='',//区域
        progressVal='',//进度
        mIndex='',//抵押
        isLimitIndex='',//限签
        loadIndex='',//贷款
        aMoney='',//总货值
        keshou='',//可售货值
        salesA='',//可售面积
        allA='',    //总面积
        salesH='',//可售套数
        allHou='',//总套数
        minPr='',//房屋总价最小值
        maxPr='',//房屋总价最大值
        minPrR='',//单价最小的价格
        priceRan='',//单价最大
        minunder='',//最低的低价
        maxunder='',//最高的低价
        minFiling='',//最小的备案价
        maxFiling='',//最大的备案价
        saleVali='',//许可证有效期
        saleVa='',//预售证
        basicExperience='',//体验初值
        opentime='',//开盘时间
        curIndex='',//目前销售类型
        acceptIndex='',//可接受销售类型
        suppIndex='',//甲方支持
        urgentIndex='',//紧急程度
        gropeIndex='',//团购
        followIndex='',//后续效应
        cIndex='',//佣金
        bondIndex='',//保证金
        competitive='',//竞得日期
        plotRa='',//容积率(土地)
        landTypeStart='',//用地性质
        startPri='',//起始价
        buildingAr='',//建筑用地面积
        competitivePr='',//竞得价
        floorPr='',//楼面价
        propertyRight='',//产权年限
        plotRat='',//容积率
        propertyC='',//物业公司
        planning='',//规划户
        prType='',//物业类型
        parking='',//车位数
        storiedBu='',//楼栋总数
        coversA='',//占地面积
        businessCir='',//周边商圈
        completionT='',//竣工时间
        checkRo='',//最早交房
        afforestation='',//绿化率
        propertyManage='',//物业费用
        decorateIndex='',//装修
        completeVal='',//配套设施
        constructionA='';    //建筑面积
    var buildInitArr=[],supportInitArr=[],soldInitIndex=0,progressInit=0,mInitIndex=0,isLimitInit=0,
    loadInitIndex=0,experienceInit=0,curInitIndex=0,acceptInitIndex=0,urgentInitIndex=0,gropeInitIndex=0,
        followInitIndex=0,cInitIndex=0,bondInitIndex=0,landTypeInit=0,prTypeInit=0,decorateInit=0,
        agentNameArr=[],agentStartArr=[],agentEndArr=[],agentNameInit='',agentStartInit='',agentEndInit='';
    function floorDetail(){
        $.ajax({
            type:'get',
            url:floorUrl+'api/property/v1/propertyInfo',
            data:{
                propertyId:floorId//	是	Integer	楼盘项目ID
            },
            success(data){
                if(data.status=='success'){
                    //基础信息
                    if(data.data.status_jc==1){
                        var basicData=data.data.property_jc;
                        weihuName=basicData.maintainerName;
                        $('#contacts>li:last-child>span.name').html(weihuName);
                        if(weihuName!=''){
                            isstats=0;
                        }
                        if(!basicData.propertyAdress){
                            basicData.propertyAdress='';
                        }
                        thisCityId=basicData.cityId;
                        thisAreaId=basicData.cityId;
                        developShort=basicData.shortName;//开发商简称
                        developFull=basicData.fullShortName;//开发商全称
                        proName=basicData.propertyName;//项目名
                        soldStatus=basicData.saleStatus;//在售
                        buildTVal=basicData.buildingType;//建筑类型
                        propertyAdd=basicData.propertyAdress;//小区地址
                        cityVal=basicData.cityName;//城市
                        broghVal=basicData.boroughName;//区域
                        progressVal=basicData.constructionProgress;//进度
                        mIndex=basicData.mortgagePledge;//抵押
                        isLimitIndex=basicData.isSign;//限签
                        loadIndex=basicData.isLoan;//贷款
                        switch (soldStatus){
                            case '待售':
                                soldInitIndex=1;
                                break;
                            case '在售':
                                soldInitIndex=2;
                                break;
                            case '售罄':
                                soldInitIndex=3;
                                break;
                            default :
                                break;
                        }
                        switch (progressVal){
                            case '打桩':
                                progressInit=1;
                                break;
                            case '浇筑':
                                progressInit=2;
                                break;
                            case '封顶':
                                progressInit=3;
                                break;
                            case '竣工':
                                progressInit=4;
                                break;
                            default :
                                break;
                        }
                        switch (mIndex){
                            case '有抵押':
                                mInitIndex=1;
                                break;
                            case '无抵押':
                                mInitIndex=2;
                                break;
                            default :
                                break;
                        }
                        switch (isLimitIndex){
                            case '否':
                                isLimitInit=1;
                                break;
                            case '是':
                                isLimitInit=2;
                                break;
                            default :
                                break;
                        }
                        switch (loadIndex){
                            case '否':
                                loadInitIndex=1;
                                break;
                            case '是':
                                loadInitIndex=2;
                                break;
                            default :
                                break;
                        }
                        var thisBuildTVal=buildTVal.split('、');
                        for(var i=0;i<thisBuildTVal.length;i++){
                            if(thisBuildTVal[i]=='别墅'){
                                buildInitArr.push('1');
                            }else if(thisBuildTVal[i]=='住宅'){
                                buildInitArr.push('2');
                            }else if(thisBuildTVal[i]=='商业'){
                                buildInitArr.push('3');
                            }else{
                                buildInitArr.push('4');
                            }
                        }
                        $('#projectName').val(proName);
                        $('#cityName').val(cityVal);
                        $('#boroughDrop>a>span').html(broghVal);
                        $('#projectAddr').val(propertyAdd);
                        $('#buildingType').html(thisBuildTVal.join(','));
                        $('#saleStatus>a>span').html(soldStatus);
                        $('#mortgage>a>span').html(mIndex);
                        $('#buildProgress>a>span').html(progressVal);
                        $('#isLoan>a>span').html(loadIndex);
                        $('#isSign>a>span').html(isLimitIndex);
                        $('#developer').val(developFull);
                        $('#abbreviation').val(developShort);
                        var buildValHtml='';
                        if(thisBuildTVal.length>0){
                            $.each(thisBuildTVal,function(i){
                                if(thisBuildTVal[i]!=''){
                                    buildValHtml+=`
                                    <span class="buildType">${thisBuildTVal[i]}</span>
                                    `;
                                }
                            });
                        }
                        var soldHtml=`
                        <span class="name">${proName}</span><span class="soldState">${soldStatus}</span>
                        `;
                        var basicHtml=`
                        <li id="stateLi">

                        </li>
                        <li class="addrLi firstRowLi">
                            <img id="${basicData.longitude}" class="${basicData.latitude} gt" src="../static/img/map-a.png" alt=""/>
                            <span class="key">项目地址</span>
                            <span>${cityVal+ broghVal+ propertyAdd}</span>
                        </li>
                        <li>
                            <span class="key">开发商</span>
                            <span>${developFull}(${developShort})</span>
                        </li>
                        `;
                        $('#basicInfo>ul.firstUl').html(basicHtml);
                        $('#stateLi').html(soldHtml+buildValHtml);
                        var secondHtml=`
                            <li class="firstRowLi">
                                <span class="key">工程进度</span>
                                <span>${progressVal}</span>
                            </li>
                            <li>
                                <span class="key">抵押情况</span>
                                <span>${mIndex}</span>
                            </li>
                        `;
                        $('#basicInfo>ul.second').html(secondHtml);
                        var lastHtml=`
                            <li class="firstRowLi">
                                <span class="key">是否可以贷款</span>
                                <span>${loadIndex}</span>
                            </li>
                            <li>
                                <span class="key">可否限签</span>
                                <span>${isLimitIndex}</span>
                            </li>
                        `;
                        $('#basicInfo>ul.last').html(lastHtml);
                        var thisHeight=$('#basicInfo .addrLi').height();
                        $('#basicInfo .firstRowLi').height(thisHeight);
                    }else{
                        var basicHtml=`
                        <li>
                        <span class="name"></span>
                        </li>
                        <li class="addrLi firstRowLi">
                            <span class="key">项目地址</span>
                            <span></span>
                        </li>
                        <li>
                            <span class="key">开发商</span>
                            <span></span>
                        </li>
                        `;
                        $('#basicInfo>ul.firstUl').html(basicHtml);
                        var secondHtml=`
                            <li class="firstRowLi">
                                <span class="key">工程进度</span>
                                <span></span>
                            </li>
                            <li>
                                <span class="key">抵押情况</span>
                                <span></span>
                            </li>
                        `;
                        $('#basicInfo>ul.second').html(secondHtml);
                        var lastHtml=`
                            <li class="firstRowLi">
                                <span class="key">是否可以贷款</span>
                                <span></span>
                            </li>
                            <li>
                                <span class="key">可否限签</span>
                                <span></span>
                            </li>
                        `;
                        $('#basicInfo>ul.last').html(lastHtml);
                    }
                    //体量
                    if(data.data.status_tl==1){
                        var countData=data.data.property_tl;
                            attributeId=countData.attributeId;
                            aMoney=countData.totalValue;//总货值
                            keshou=countData.saleValue;//可售货值
                            salesA=countData.saleArea;//可售面积
                            allA=countData.totalArea;    //总面积
                            salesH=countData.saleHouse;//可售套数
                            allHou=countData.totalHouse;//总套数
                        $('#totalPrice').val(aMoney);
                        $('#availablePrice').val(keshou);
                        $('#totalArea').val(allA);
                        $('#availableArea').val(salesA);
                        $('#totalSet').val(allHou);
                        $('#availableSet').val(salesH);
                        var leftHtml=`
                            <li>
                                <span>总货值</span><span>${aMoney}亿</span>
                            </li>
                            <li>
                                <span>总套数</span><span>${allHou}套</span>
                            </li>
                            <li>
                                <span>总面积</span><span>${allA}m²</span>
                            </li>
                        `;
                        var rightHtml=`
                            <li>
                                <span>可售货值</span><span>${keshou}亿</span>
                            </li>
                            <li>
                                <span>可售套数</span><span>${salesH}套</span>
                            </li>
                            <li>
                                <span>可售面积</span><span>${salesA}m²</span>
                            </li>
                        `;
                        $('#countSection>ul.lf').html(leftHtml);
                        $('#countSection>ul.rightUl').html(rightHtml);
                    }else{
                        var leftHtml=`
                        <li>
                            <span>总货值</span><span></span>
                        </li>
                        <li>
                            <span>总套数</span><span></span>
                        </li>
                        <li>
                            <span>总面积</span><span></span>
                        </li>
                        `;
                        var rightHtml=`
                        <li>
                            <span>可售货值</span><span></span>
                        </li>
                        <li>
                            <span>可售套数</span><span></span>
                        </li>
                        <li>
                            <span>可售面积</span><span></span>
                        </li>
                        `;
                        $('#countSection>ul.lf').html(leftHtml);
                        $('#countSection>ul.rightUl').html(rightHtml);
                    }
                    //销售信息
                    if(data.data.status_xs==1){
                        var saleData=data.data.property_xs;
                        salesinformationId=saleData.salesinformationId;
                            minPr=saleData.minAllPrice;//房屋总价最小值
                            maxPr=saleData.maxAllPrice;//房屋总价最大值
                            minPrR=saleData.minPrice;//单价最小的价格
                            priceRan=saleData.maxPrice;//单价最大
                            minunder=saleData.minFloorPrice;//最低的低价
                            maxunder=saleData.maxFloorPrice;//最高的低价
                            minFiling=saleData.minRecordPrice;//最小的备案价
                            maxFiling=saleData.maxRecordPrice;//最大的备案价
                            saleVali=saleData.termofValidity;//许可证有效期
                            saleVa=saleData.permitForpresale;//预售证
                            basicExperience=saleData.experience;//体验初值
                            opentime=saleData.openPropertyDate;//开盘时间
                        switch (basicExperience){
                            case '不需要保装':
                                experienceInit=1;
                                break;
                            case '部分保装':
                                experienceInit=2;
                                break;
                            case '整体重新保装':
                                experienceInit=3;
                                break;
                            case '烂尾楼':
                                experienceInit=4;
                                break;
                            default :
                                break;
                        }
                        $('#lowPrice').val(minPrR);
                        $('#highPrice').val(priceRan);
                        $('#lowTotalPrice').val(minPr);
                        $('#highTotalPrice').val(maxPr);
                        $('#lowRecordPrice').val(minFiling);
                        $('#highRecordPrice').val(maxFiling);
                        $('#bottomLowPrice').val(minunder);
                        $('#bottomHighPrice').val(maxunder);
                        $('#openTime').val(opentime);
                        $('#experience>a>span').html(basicExperience);
                        $('#permitCode').val(saleVa);
                        $('#permitTime').val(saleVali);
                        var leftHtml=`
                        <li>
                            <span>单价区间</span><span>${minPrR} - ${priceRan}元/m²</span>
                        </li>
                        <li>
                            <span>备案价</span><span>${minFiling} - ${maxFiling}元/m²</span>
                        </li>
                        <li>
                            <span>首次开盘时间</span><span>${opentime}</span>
                        </li>
                        <li>
                            <span>预售许可证</span><span>${saleVa}</span>
                        </li>
                        `;
                        var rightHtml=`
                        <li>
                            <span>总价区间</span><span>${minPr}万-${maxPr}万/套</span>
                        </li>
                        <li>
                            <span>底价区间</span><span>${minunder}-${maxunder}元/m²</span>
                        </li>
                        <li>
                            <span>体验情况</span><span>${basicExperience}</span>
                        </li>
                        <li>
                            <span>许可证有效期</span><span>${saleVali}</span>
                        </li>
                        `;
                        $('#saleSection>ul.lf').html(leftHtml);
                        $('#saleSection>ul.rightUl').html(rightHtml);
                    }else{
                        var leftHtml=`
                        <li>
                            <span>单价区间</span><span></span>
                        </li>
                        <li>
                            <span>备案价</span><span></span>
                        </li>
                        <li>
                            <span>首次开盘时间</span><span></span>
                        </li>
                        <li>
                            <span>预售许可证</span><span></span>
                        </li>
                        `;
                        var rightHtml=`
                        <li>
                            <span>总价区间</span><span></span>
                        </li>
                        <li>
                            <span>底价区间</span><span></span>
                        </li>
                        <li>
                            <span>体验情况</span><span></span>
                        </li>
                        <li>
                            <span>许可证有效期</span><span></span>
                        </li>
                        `;
                        $('#saleSection>ul.lf').html(leftHtml);
                        $('#saleSection>ul.rightUl').html(rightHtml);
                    }
                    //合作
                    if(data.data.status_hz==1){
                        var cooperateData=data.data.property_hz;
                        var agentData=cooperateData.agencyList;//代理
                            cooperationId=cooperateData.cooperationId;
                            curIndex=cooperateData.saleType;//目前销售类型
                            acceptIndex=cooperateData.acceptSaleType;//可接受销售类型
                            suppIndex=cooperateData.partySupport;//甲方支持
                            urgentIndex=cooperateData.emergencyDegree;//紧急程度
                            gropeIndex=cooperateData.groupPurchase;//团购
                            followIndex=cooperateData.followEffect;//后续效应
                            cIndex=cooperateData.commissionMethod;//佣金
                            bondIndex=cooperateData.bond;//保证金
                        switch (curIndex){
                            case '独家代理':
                                curInitIndex=1;
                                break;
                            case '自销':
                                curInitIndex=2;
                                break;
                            case '联合代理':
                                curInitIndex=3;
                                break;
                            default :
                                break;
                        }
                        switch (acceptIndex){
                            case '接受代理目前无代理':
                                acceptInitIndex=1;
                                break;
                            case '独家代理':
                                acceptInitIndex=2;
                                break;
                            case '自销':
                                acceptInitIndex=3;
                                break;
                            case '联合代理':
                                acceptInitIndex=4;
                                break;
                            case '只做案场':
                                acceptInitIndex=5;
                                break;
                            case '只做联动':
                                acceptInitIndex=6;
                                break;
                            default :
                                break;
                        }
                        switch (urgentIndex){
                            case '不紧急':
                                urgentInitIndex=1;
                                break;
                            case '一般':
                                urgentInitIndex=2;
                                break;
                            case '需要马上进场':
                                urgentInitIndex=3;
                                break;
                            default :
                                break;
                        }
                        switch (gropeIndex){
                            case '甲方收':
                                gropeInitIndex=1;
                                break;
                            case '代理收':
                                gropeInitIndex=2;
                                break;
                            default :
                                break;
                        }
                        switch (followIndex){
                            case '后续合作机会':
                                followInitIndex=1;
                                break;
                            case '提高知名度':
                                followInitIndex=2;
                                break;
                            default :
                                break;
                        }
                        switch (cIndex){
                            case '固定':
                                cInitIndex=1;
                                break;
                            case '跳点':
                                cInitIndex=2;
                                break;
                            case '报销':
                                cInitIndex=3;
                                break;
                            default :
                                break;
                        }
                        switch (bondIndex){
                            case '0-50万':
                                bondInitIndex=1;
                                break;
                            case '50万-100万':
                                bondInitIndex=2;
                                break;
                            case '100万-200万':
                                bondInitIndex=3;
                                break;
                            case '200万 -300万':
                                bondInitIndex=4;
                                break;
                            case '500万以上':
                                bondInitIndex=5;
                                break;
                            default :
                                break;
                        }
                        var thisSuppIndex=suppIndex.split('、');
                        $.each(thisSuppIndex,function(i){
                            switch (thisSuppIndex[i]){
                                case '班车':
                                    supportInitArr.push('1');
                                    break;
                                case '样板房':
                                    supportInitArr.push('2');
                                    break;
                                case '物料':
                                    supportInitArr.push('3');
                                    break;
                                case '饭盒':
                                    supportInitArr.push('4');
                                    break;
                                default :
                                    break;
                            }
                        });
                        $('#saleModel>a>span').html(curIndex);
                        $('#followUp>a>span').html(followIndex);
                        $('#acceptSaleType>a>span').html(acceptIndex);
                        $('#commissionMethod>a>span').html(cIndex);
                        $('#support').html(thisSuppIndex.join(','));
                        $('#promise>a>span').html(bondIndex);
                        $('#groupSituation>a>span').html(gropeIndex);
                        $('#urgency>a>span').html(urgentIndex);
                        var agentCount = 0;//记录代理公司新增个数
                        var agentTimeHtml='',agentNameHtml='',agentModalHtml='';
                        var leftHtml=`
                            <li id="agentNameLi">
                                <span>目前销售类型</span><span>${curIndex}</span>
                            </li>

                            <li>
                                <span>可接受销售类型</span><span>${acceptIndex}</span>
                            </li>
                            <li>
                                <span>甲方支持</span><span>${thisSuppIndex.join(',')}</span>
                            </li>
                            <li>
                                <span>团购情况</span><span>${gropeIndex}</span>
                            </li>
                            <li>
                                <span>后续效应</span><span>${followIndex}</span>
                            </li>
                        `;
                        var rightHtml=`
                            <li id="agentTimeLi">
                               <span></span><span></span>
                            </li>

                            <li>
                                <span>佣金方式</span><span>${cIndex}</span>
                            </li>
                            <li>
                                <span>保证金</span><span>${bondIndex}</span>
                            </li>
                            <li>
                                <span>紧急程度</span><span>${urgentIndex}</span>
                            </li>
                        `;
                        $('#cooperateSection>ul.lf').html(leftHtml);
                        $('#cooperateSection>ul.rightUl').html(rightHtml);
                        var agentCountInit=agentData.length;
                        $.each(agentData,function(i){
                            agentNameArr.push(agentData[i].propertyAgencyName);
                            agentStartArr.push(agentData[i].fristAgentTime);
                            agentEndArr.push(agentData[i].endAgentTime);
                            agentNameInit=agentNameArr.join(',');
                            agentStartInit=agentStartArr.join(',');
                            agentEndInit=agentEndArr.join(',');
                            agentTimeHtml+=`
                                <li class="agentTime"><span>代理时间段</span><span>${agentData[i].fristAgentTime}至${agentData[i].endAgentTime}</span></li>
                                `;
                            agentNameHtml+=`
                                <li class="agentName"><span>代理公司名</span><span>${agentData[i].propertyAgencyName}</span></li>
                                `;
                            agentModalHtml+=`
                                <div id="${agentData[i].propertyAgencyId}" class="agentRow sui-row-fluid">
                                    <div class="span6">
                                        <form class="sui-form form-horizontal">
                                            <div class="control-group">
                                                <label class="control-label">代理公司名</label>
                                                <div class="controls">
                                                    <input type="text" value="${agentData[i].propertyAgencyName}" id="agentCompany${i+1}" placeholder="请输入内容"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="span6">
                                        <form class="sui-form form-horizontal">
                                            <div data-toggle="datepicker" class="control-group input-daterange">
                                                <label class="control-label">代理时间段</label>
                                                <div class="controls">
                                                    <input type="text" value="${agentData[i].fristAgentTime}" id="agentTimeStart${i+1}" class="fromTo date input-medium" placeholder="请选择"/>
                                                    <img class="agentDate" src="../static/img/date.png" alt=""/>
                                                    <span class="to">至</span>
                                                    <input type="text" value="${agentData[i].endAgentTime}" id="agentTimeEnd${i+1}" class="fromTo date dateEnd input-medium" placeholder="请选择"/>
                                                    <img class="agentDate end" src="../static/img/date.png" alt=""/>
                                                    <img class="add reduce" src="../static/img/reduce.png" alt=""/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            `;
                        });
                        $('#agentTimeLi').after(agentTimeHtml);
                        $('#agentNameLi').after(agentNameHtml);
                        $('#agentRows').html(agentModalHtml);
                        if($.trim(curIndex)=='独家代理'){
                            $('.agentName,.agentTime,#agent0').show();
                            $('#agentCompany0').val('');
                            $('#agentTimeStart0').val('');
                            $('#agentTimeEnd0').val('');
                        }else{
                            $('.agentName,.agentTime,#agent0').hide();
                        }
                        //代理公司，代理时间
                        $('#agent0').on('click', 'img.add', function (e) {
                            e.stopPropagation();
                            var nameVal=$('#agentCompany0').val();
                            var startVal=$('#agentTimeStart0').val();
                            var endVal=$('#agentTimeEnd0').val();
                            console.log(nameVal);
                            agentCount+= 1;
                            agentCountInit+=1;
                            if(agentCount>=5){
                                agentCount=5;
                                alert('最多只能添加5条');
                                return;
                            }else{
                                var agentHtml = `
                                    <div id="" class="agentRow sui-row-fluid">
                                            <div class="span6 tipControl">
                                                <form class="sui-form form-horizontal">
                                                    <div class="control-group">
                                                        <label class="control-label">代理公司名</label>
                                                        <div class="controls">
                                                            <input type="text" id="agentCompany${agentCountInit}" value="${nameVal}" placeholder="请输入内容"/>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="span6">
                                                <form class="sui-form form-horizontal">
                                                    <div data-toggle="datepicker" class="control-group input-daterange">
                                                        <label class="control-label">代理时间段</label>
                                                        <div class="controls">
                                                            <input value="${startVal}" id="agentTimeStart${agentCountInit}" type="text" class="fromTo date input-medium" placeholder="请选择"/>
                                                            <img class="agentDate" src="../static/img/date.png" alt=""/>
                                                            <span class="to">至</span>
                                                            <input value="${endVal}" id="agentTimeEnd${agentCountInit}" type="text" class="fromTo date dateEnd input-medium" placeholder="请选择"/>
                                                            <img class="agentDate end" src="../static/img/date.png" alt=""/>
                                                            <img class="add reduce" src="../static/img/reduce.png" alt=""/>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    `;
                                $('#agent0Rows').html(agentHtml);
                            }
                        });
                        //删除行
                        $('#myModal6').on('click','img.reduce',function(e){
                            e.stopPropagation();
                            agentCount-=1;
                            $(e.target).parent().parent().parent().parent().parent().remove();
                        });
                    }else{
                        var leftHtml=`
                           <li>
                                <span>目前销售类型</span><span></span>
                            </li>
                            <li>
                                <span>可接受销售类型</span><span></span>
                            </li>
                            <li>
                                <span>甲方支持</span><span></span>
                            </li>
                            <li>
                                <span>团购情况</span><span></span>
                            </li>
                            <li>
                                <span>后续效应</span><span></span>
                            </li>
                        `;
                        var rightHtml=`
                            <li>
                                <span></span><span></span>
                            </li>
                            <li>
                                <span>佣金方式</span><span></span>
                            </li>
                            <li>
                                <span>保证金</span><span></span>
                            </li>
                            <li>
                                <span>紧急程度</span><span></span>
                            </li>
                        `;
                        $('#cooperateSection>ul.lf').html(leftHtml);
                        $('#cooperateSection>ul.rightUl').html(rightHtml);
                    }
                    //土地
                    if(data.data.status_td==1){
                        var landData=data.data.property_td;
                        landId=landData.landId;
                            competitive=landData.competeDate;//竞得日期
                            plotRa=landData.volumetricRate;//容积率(土地)
                            landTypeStart=landData.landNature;//用地性质
                            startPri=landData.startingPrice;//起始价
                            buildingAr=landData.landArea;//建筑用地面积
                            competitivePr=landData.bidPrice;//竞得价
                            floorPr=landData.floorPrice;//楼面价
                            propertyRight=landData.propertyRightLife;//产权年限
                        switch (landTypeStart){
                            case '住宅':
                                landTypeInit=1;
                                break;
                            case '商业/办公':
                                landTypeInit=2;
                                break;
                            case '工业':
                                landTypeInit=3;
                                break;
                            case '其他':
                                landTypeInit=4;
                                break;
                            default :
                                break;
                        }
                        $('#competitiveDate').val(competitive);
                        $('#buildingArea').val(buildingAr);
                        $('#startingPrice').val(startPri);
                        $('#competitivePrice').val(competitivePr);
                        $('#landType>a>span').html(landTypeStart);
                        $('#rightYears').val(propertyRight);
                        $('#plotRatioStart').val(plotRa);
                        $('#floorPrice').val(floorPr);
                        var leftHtml=`
                        <li>
                            <span>竞得日期</span><span>${competitive}</span>
                        </li>
                        <li>
                            <span>起始价</span><span>${startPri}万</span>
                        </li>
                        <li>
                            <span>容积率</span><span>${plotRa}</span>
                        </li>
                        <li>
                            <span>用地性质</span><span>${landTypeStart}</span>
                        </li>
                        `;
                        var rightHtml=`
                        <li>
                            <span>建筑用地面积</span><span>${buildingAr}m²</span>
                        </li>
                        <li>
                            <span>竞得价</span><span>${competitivePr}万</span>
                        </li>
                        <li>
                            <span>楼面价</span><span>${floorPr}元/m²</span>
                        </li>
                        <li>
                            <span>产权年限</span><span>${propertyRight}年</span>
                        </li>
                        `;
                        $('#landSection>ul.lf').html(leftHtml);
                        $('#landSection>ul.rightUl').html(rightHtml);
                    }else{
                        var leftHtml=`
                        <li>
                            <span>竞得日期</span><span></span>
                        </li>
                        <li>
                            <span>起始价</span><span></span>
                        </li>
                        <li>
                            <span>容积率</span><span></span>
                        </li>
                        <li>
                            <span>用地性质</span><span></span>
                        </li>
                        `;
                        var rightHtml=`
                        <li>
                            <span>建筑用地面积</span><span></span>
                        </li>
                        <li>
                            <span>竞得价</span><span></span>
                        </li>
                        <li>
                            <span>楼面价</span><span></span>
                        </li>
                        <li>
                            <span>产权年限</span><span></span>
                        </li>
                        `;
                        $('#landSection>ul.lf').html(leftHtml);
                        $('#landSection>ul.rightUl').html(rightHtml);
                    }
                    //详情
                    if(data.data.status_xq==1){
                        var detailData=data.data.property_xq;
                        detailId=detailData.detailId;
                        plotRat=detailData.plotRatio;//容积率
                            propertyC=detailData.managmentCompany;//物业公司
                            planning=detailData.planHouseholds;//规划户
                            prType=detailData.propertyType;//物业类型
                            parking=detailData.parkingNumber;//车位数
                            storiedBu=detailData.buildingNumber;//楼栋总数
                            coversA=detailData.floorArea;//占地面积
                            businessCir=detailData.businessCircle;//周边商圈
                            completionT=detailData.completionTime;//竣工时间
                            checkRo=detailData.earliestProvide;//最早交房
                            afforestation=detailData.greeningRatio;//绿化率
                            propertyManage=detailData.propertyFee;//物业费用
                            decorateIndex=detailData.decorationStatus;//装修
                            completeVal=detailData.supportingFacilities;//配套设施
                            constructionA=detailData.structureArea;    //建筑面积
                        switch (prType){
                            case '别墅':
                                prTypeInit=1;
                                break;
                            case '住宅':
                                prTypeInit=2;
                                break;
                            case '商铺':
                                prTypeInit=3;
                                break;
                            case '商住':
                                prTypeInit=4;
                                break;
                            default :
                                break;
                        }
                        switch (decorateIndex){
                            case '毛坯':
                                decorateInit=1;
                                break;
                            case '简装修':
                                decorateInit=2;
                                break;
                            case '精装修':
                                decorateInit=3;
                                break;
                            default :
                                break;
                        }
                        $('#propertyCompany').val(propertyC);
                        $('#propertyType>a>span').html(prType);
                        $('#plotRatio').val(plotRat);
                        $('#planningHouse').val(planning);
                        $('#parkingSpace').val(parking);
                        $('#storiedBuilding').val(storiedBu);
                        $('#coversArea').val(coversA);
                        $('#businessCircle').val(businessCir);
                        $('#completionTime').val(completionT);
                        $('#checkRoom').val(checkRo);
                        $('#afforestationRate').val(afforestation);
                        $('#floorManagement').val(propertyManage);
                        $('#decorate>a>span').html(decorateIndex);
                        $('#completeSet').val(completeVal);
                        $('#constructionArea').val(constructionA);
                        var leftHtml=`
                        <li>
                            <span>物业公司</span><span>${propertyC}</span>
                        </li>
                        <li>
                            <span>物业类型</span><span>${prType}</span>
                        </li>
                        <li>
                            <span>容积率</span><span>${plotRat}</span>
                        </li>
                        <li>
                            <span>规划户数</span><span>${planning}</span>
                        </li>
                        <li>
                            <span>车位数</span><span>${parking}</span>
                        </li>
                        <li>
                            <span>楼栋总数</span><span>${storiedBu}</span>
                        </li>
                        <li>
                            <span>占地面积</span><span>${coversA}m²</span>
                        </li>
                        <li>
                            <span>周边商圈</span><span>${businessCir}</span>
                        </li>
                        `;
                        var rightHtml=`
                        <li>
                            <span>竣工时间</span><span>${completionT}</span>
                        </li>
                        <li>
                            <span>最早交房</span><span>${checkRo}</span>
                        </li>
                        <li>
                            <span>绿化率</span><span>${afforestation}</span>
                        </li>
                        <li>
                            <span>物业费</span><span>${propertyManage}元/月</span>
                        </li>
                        <li>
                            <span>装修情况</span><span>${decorateIndex}</span>
                        </li>
                        <li>
                            <span>配套设施</span><span>${completeVal}</span>
                        </li>
                        <li>
                            <span>建筑面积</span><span>${constructionA}m²</span>
                        </li>
                        <li><span></span><span></span></li>
                        `;
                        $('#detailSection>ul.lf').html(leftHtml);
                        $('#detailSection>ul.rightUl').html(rightHtml);
                    }else{
                        var leftHtml=`
                        <li>
                            <span>物业公司</span><span></span>
                        </li>
                        <li>
                            <span>物业类型</span><span></span>
                        </li>
                        <li>
                            <span>容积率</span><span></span>
                        </li>
                        <li>
                            <span>规划户数</span><span></span>
                        </li>
                        <li>
                            <span>车位数</span><span></span>
                        </li>
                        <li>
                            <span>楼栋总数</span><span></span>
                        </li>
                        <li>
                            <span>占地面积</span><span></span>
                        </li>
                        <li>
                            <span>周边商圈</span><span></span>
                        </li>
                        `;
                        var rightHtml=`
                        <li>
                            <span>竣工时间</span><span></span>
                        </li>
                        <li>
                            <span>最早交房</span><span></span>
                        </li>
                        <li>
                            <span>绿化率</span><span></span>
                        </li>
                        <li>
                            <span>物业费</span><span></span>
                        </li>
                        <li>
                            <span>装修情况</span><span></span>
                        </li>
                        <li>
                            <span>配套设施</span><span></span>
                        </li>
                        <li>
                            <span>建筑面积</span><span></span>
                        </li>
                        <li><span></span><span></span></li>
                        `;
                        $('#detailSection>ul.lf').html(leftHtml);
                        $('#detailSection>ul.rightUl').html(rightHtml);
                    }
                    //联系人
                    if(data.data.status_lx>0){
                        var contactData=data.data.property_lx;
                        if(contactData.length>0){
                            var contactHtml='';
                            $.each(contactData,function(i){//
                                var thisPhoneNum=contactData[i].contactPhone;
                                var hidePhoneNum=thisPhoneNum.slice(0,3)+'****'+thisPhoneNum.slice(-4);
                                contactHtml+=`
                            <li class="clear">
                            <div>${contactData[i].position}</div>
                            <a class="gt">查看</a>
                            <span class="linkName">${contactData[i].contactName}</span><span id="${thisPhoneNum}" class="linkPhone">${hidePhoneNum}</span>
                            </li>
                            `;
                            });
                            $('#contactList').html(contactHtml);
                        }
                    }
                    //维护人
                }else{
                    alert(data.info||'获得楼盘详情失败');
                }
            },
            error(){
                console.log('获取楼盘详情网络错误');
            }
        });
    }
    floorDetail();
    //维护人列表
    $('#md3').on('click',function(){
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
                        $('#weihurenMenu').html(weihurenHtml);
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
    $('#weihurenMenu').on('click','li',function(){
        weihuId=$(this).attr('id');
        weihuName=$(this).children('a').html();
    });
    //设置维护人
    $('#myModal3').on('click','.modify',function(){
        $.ajax({
            type:'post',
            url:floorUrl+'api/property/v1/setPropertyMaintainer',
            data:{
                userId:createUserid,//	是	Integer	//用户id
                id:floorId,//	是	Integer	// 项目开发楼盘id
                maintainerId:weihuId//	是	Integer	// 维护人id
            },
            success(data){
                if(data.status=='success'){
                    alert('设置维护人成功!');
                    $('#myModal3').hide();
                    $('#cover').hide();
                    floorDetail();
                }else{
                    alert('设置维护人失败!');
                }
            },
            error(){
                console.log('设置维护人网络错误');
            }
        });
    })
        .on('click','.cancel',function(){
            $('#weihuren>a>span').html('请选择');
        });
    //新增项目联系人
    $('#myModal2').on('click','.modify',function(){
          var linkJob=$('#job>a>span').html();
          var linkJobIndex=$('#jobMenu>li.active').index()+1;
          var linkName=$('#LinkName').val();
          var linkPhone=$('#LinkPhone').val();
        if(linkJob=='请选择'){
            alert("请选择联系人职位");
            return;
        }
        if(linkName==''){
            alert("请填写联系人姓名");
            return;
        }
        if(linkPhone==''){
            alert("请填写联系人电话");
            return;
        }
        if(!(/^1[3456789]\d{9}$/.test(linkPhone))){
            alert("手机号无效");
            return;
        }
        $.ajax({
            type:'post',
            url:floorUrl+'api/property/v1/addLinkPserson',
            data:{
                name:linkName,//	是	string	用户名
                telephone:linkPhone,//	是	string	电话
                id:createUserid,//	是	Integer	登录人id
                propertyId:floorId,//	是	Integer	楼盘id
                level:linkJobIndex,//	是	Integer	1销售员2销售经理3营销总4项目总经理5股东6董事长7其他
                stats:isstats//	是	string	是否为公盘 1为公盘0为私盘（无维护人则为公盘）
            },
            success(data){
                if(data.status=='success'){
                    alert('新增联系人成功');
                    $('#myModal2').hide();
                    $('#cover').hide();
                    $('#job>a>span').html('请选择');
                    $('#LinkName').val('');
                    $('#LinkPhone').val('');
                    floorDetail();
                }else{
                    alert('新增联系人失败');
                }
            },
            error(){
                console.log('新增联系人网络错误');
            }
        });
    })
    .on('click','.cancel',function(){
            $('#job>a>span').html('请选择');
            $('#LinkName').val('');
            $('#LinkPhone').val('');
        });
    //查看联系人电话
    $('#contactList').on('click','a',function(e){
        $(e.target).next().next().html($(e.target).next().next().attr('id'));
    });
    var fileUrl,fileName='附件';
    //判断是否已提报，显示或隐藏上传附件按钮
    $('#followProgressMenu>li').on('click','a',function(e){
        var stateVal=$(e.target).html();
        if(stateVal=='已提报'){
            $('#upLoad').css('visibility','visible');
        }else{
            $('#upLoad').css('visibility','hidden');
        }
    });
//上传附件按钮的点击事件，实现文件选择
    $('#upLoad').on('click',function(){
        $('#btn-file').click();
    });
//文件上传
    $('#btn-file').change(function(e){
        if($(e.target).val()==''){
            alert('文件不能为空');
        }
        var files=$(e.target).prop('files');//获取文件列表
        var formData = new FormData();
        $.each(files, function(i) {
            if (files[i].size > 5 * 1024 * 1024) {
                alert("单个文件大小不可超过5M");
                return;
            }
            formData.append('files', files[i]);
        });
        $.ajax({
            url: 'http://www.ehaofang.com:8888/publicshow/qiniuUtil/fileToQiniu',
            type: 'POST',
            data: formData,
            contentType: false, // 注意这里应设为false
            processData: false,
            cache: false,
            async:false,
            success: function(data) {
                fileUrl=data.pathUrls;//文件路径
                //fileName=data.fileNames;//文件名
                if(data.statas=='true'){
                    alert(data.message);
                }else if(data.statas=='false'){
                    alert(data.message);
                }
            },
            error: function (jqXHR) {
                console.log(JSON.stringify(jqXHR));
            }
        })
    });
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
    //城市查询区域
    var thisAreaId=0,thisCityId=0;
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
    });
    $('#boroughDrop').on('click',function(){
        $('#boroughMenu').show().css('top','34px');
    });
    $('#boroughMenu').on('click','li',function(e){
        e.stopPropagation();
        $('#boroughDrop>a>span').html($(this).children('a').html());
        thisAreaId=$(this).attr('class');//区域id
        $('#boroughMenu').hide();
    });
    //跳转地图
    $('#basicInfo').on('click','.addrLi',function(){
        $(location).attr('href','/propertyMap?'+thisstate+'&'+createUserid+'&'+thisCityId+'&'+proName+'&'+propertyAdd);//? +  state  +&+ userID +&+ cityID +&+ propertyName +&+address
    });
    //基础信息修改
    $('#myModal1').on('click','.modify',function(){
        var thisLongitude=$('#basicInfo .addrLi>img').attr('id');
        var thisLatitude=parseFloat($('#basicInfo .addrLi>img').attr('class'));
        var basicFollowArr=[];
        var developShortModal=$('#abbreviation').val(),//开发商简称
            developFullModal=$('#developer').val(),//开发商全称
            proNameModal=$('#projectName').val(),//项目名
            soldStatusModal=$('#saleStatusMenu>li.active').index()==-1?soldInitIndex:$('#saleStatusMenu>li.active').index()+1,//在售
            buildTValModal=buildIndex.join(',')==''?buildInitArr.join(','):buildIndex.join(','),//建筑类型
            propertyAddModal=$('#projectAddr').val(),//小区地址
            progressValModal=$('#buildProgressMenu>li.active').index()==-1?progressInit:$('#buildProgressMenu>li.active').index()+1,//进度
            mIndexModal=$('#mortgageMenu>li.active').index()==-1?mInitIndex:$('#mortgageMenu>li.active').index()+1,//抵押
            isLimitIndexModal=$('#isSignMenu>li.active').index()==-1?isLimitInit:$('#isSignMenu>li.active').index()+1,//限签
            loadIndexModal=$('#isLoanMenu>li.active').index()==-1?loadInitIndex:$('#isLoanMenu>li.active').index()+1;//贷款
        if(developShortModal!=developShort){
            basicFollowArr.push('开发商简称由'+developShort+'变更为'+developShortModal);
        }
        if(developFullModal!=developFull){
            basicFollowArr.push('开发商全称由'+developFull+'变更为'+developFullModal);
        }
        if(proNameModal!=proName){
            basicFollowArr.push('项目名由'+proName+'变更为'+proNameModal);
        }
        if($('#saleStatus>a>span').html()!=soldStatus){
            basicFollowArr.push('在售状态由'+soldStatus+'变更为'+$('#saleStatus>a>span').html());
        }

        if(buildIndex.length>0){
            basicFollowArr.push('建筑类型由'+buildTVal+'变更为'+buildArr.join('、'));
        }
        if(propertyAddModal!=propertyAdd){
            basicFollowArr.push('项目地址由'+propertyAdd+'变更为'+propertyAddModal);
        }
        if($('#cityName').val()!=cityVal){
            basicFollowArr.push('城市由'+cityVal+'变更为'+$('#cityName').val());
        }
        if($('#boroughDrop>a>span').html()!=broghVal){
            basicFollowArr.push('区域由'+broghVal+'变更为'+$('#boroughDrop>a>span').html());
        }
        if($('#buildProgress>a>span').html()!=progressVal){
            basicFollowArr.push('建设进度由'+progressVal+'变更为'+$('#buildProgress>a>span').html());
        }
        if($('#mortgage>a>span').html()!=mIndex){
            basicFollowArr.push('抵押情况由'+mIndex+'变更为'+$('#mortgage>a>span').html());
        }
        if($('#isSign>a>span').html()!=isLimitIndex){
            basicFollowArr.push('可否限签由'+isLimitIndex+'变更为'+$('#isSign>a>span').html());
        }
        if($('#isLoan>a>span').html()!=loadIndex){
            basicFollowArr.push('可否贷款由'+loadIndex+'变更为'+$('#isLoan>a>span').html());
        }
        $.ajax({
            type:'PUT',
            url:floorUrl+'api/property/v1/updateProperty',
            data:{
                name:proNameModal,//	是	string	用户名
                cityId:thisCityId,//	是	Integer	城市id
                areaId:thisAreaId,//	是	Integer	区域id
                adressDetail:propertyAddModal,//	是	string	楼盘详细地址
                developerFullName:developFullModal,//	是	string	开发商全称
                developerShortName:developShortModal,//	是	string	开发商简称
                buildingType:buildTValModal,//	是	string	//建筑类型 (此字段可多选 存储例如为 0,1,2)1别墅 2住宅 3商业 4其他
                    saleStatus:soldStatusModal,//	是	Integer	//在售状态 0 待售 1 在售 2 售罄
                mortgagePledge:mIndexModal,//	否	Integer	//抵押情况 0 有抵押 1无抵押
                    constructionProgress:progressValModal,//	否	Integer	//建筑进度 0 打桩 1 浇筑 2封顶 3 竣工
                isLoan:loadIndexModal,//	否	Integer	//是否可贷款 0 否 1 是
                    isSign:isLimitIndexModal,//	否	Integer	//是否限签 0 否 1是
                maintainerId:createUserid,//	是	Integer	//维护人id
                    longitude:thisLongitude,//	是	Double	//经度
                latitude:thisLatitude,//	是	Double	//纬度
                    updateUserId:createUserid,//	是	Integer	// 更新人id
                id:floorId,//	是	Integer	// 项目开发楼盘id
                    content:basicFollowArr.join(',')//	是	string	//修改内容详细
            },
            success(data){
                if(data.status=='success'){
                    alert('修改成功!');
                    $('#basicModal').before('');
                    $('#basicInfo').append('');
                    floorDetail();
                    followLists();
                    buildInitArr=[];
                }else{
                    alert('修改失败!');
                }
            },
            error(){
                console.log('基本信息修改网络错误');
            }
        });
        $('#myModal1').hide();
        $('#cover').hide();
    });
    //体量修改
    //验证数字类型
    $('input.mustNum').blur(function(e){
        if(!/^[0-9]*$/.test($.trim($(e.target).val()))){
            alert('请输入合法数值');
            return;
        }
    });
    $('#myModal4').on('click','.modify',function(){
        var countFollowArr=[];
        var aMoneyModal=$('#totalPrice').val(),//总货值
            keshouModal=$('#availablePrice').val(),//可售货值
            salesAModal=$('#availableArea').val(),//可售面积
            allAModal=$('#totalArea').val(),    //总面积
            salesHModal=$('#availableSet').val(),//可售套数
            allHouModal=$('#totalSet').val();//总套数
        if(aMoneyModal!=aMoney){
            countFollowArr.push('总货值由'+aMoney+'变更为'+aMoneyModal);
        }
        if(keshouModal!=keshou){
            countFollowArr.push('可售货值由'+keshou+'变更为'+keshouModal);
        }
        if(salesAModal!=salesA){
            countFollowArr.push('可售面积由'+salesA+'变更为'+salesAModal);
        }
        if(allAModal!=allA){
            countFollowArr.push('总面积由'+allA+'变更为'+allAModal);
        }
        if(salesHModal!=salesH){
            countFollowArr.push('可售套数由'+salesH+'变更为'+salesHModal);
        }
        if(allHouModal!=allHou){
            countFollowArr.push('总套数由'+allHou+'变更为'+allHouModal);
        }
        $.ajax({
            type:'PUT',
            url:floorUrl+'api/property/v1/updatePropertyAttribute',
            data:{
                totalValue:aMoneyModal,//	否	Double	//总货值
                    saleValue:keshouModal,//	否	Double	//可售货值
                totalArea:allAModal,//	否	Double	//总面积
                    saleArea:salesAModal,//	否	Double	//可售面积
                totalHouse:allHouModal,//	否	Integer	//总套数
                    saleHouse:salesHModal,//	否	Integer	//可售套数
                updateUserId:createUserid,//	是	Integer	//更新人id
                    attributeId:attributeId,//	是	Integer	//项目开发楼盘体量id
                id:floorId,//	是	Integer	// 项目开发楼盘id
                    content:countFollowArr.join(',')//	是	string	//修改内容详细
            },
            success(data){
                if(data.status=='success'){
                    alert('修改成功!');
                    floorDetail();
                    followLists();
                }else{
                    alert('修改失败!');
                }
            },
            error(){
                console.log('体量信息修改网络错误');
            }
        });
        $('#myModal4').hide();
        $('#cover').hide();
    });
    //销售修改
    $('#myModal5').on('click','.modify',function(){
        var saleFollowArr=[];
        var minPrModal=$('#lowTotalPrice').val(),//房屋总价最小值
            maxPrModal=$('#highTotalPrice').val(),//房屋总价最大值
            minPrRModal=$('#lowPrice').val(),//单价最小的价格
            priceRanModal=$('#highPrice').val(),//单价最大
            minunderModal=$('#bottomLowPrice').val(),//最低的低价
            maxunderModal=$('#bottomHighPrice').val(),//最高的低价
            minFilingModal=$('#lowRecordPrice').val(),//最小的备案价
            maxFilingModal=$('#highRecordPrice').val(),//最大的备案价
            saleValiModal=$.trim($('#permitTime').val()),//许可证有效期
            saleVaModal=$('#permitCode').val(),//预售证
            basicExperienceModal=$('#experienceMenu>li.active').index()==-1?experienceInit:$('#experienceMenu>li.active').index()+1,//体验初值
            opentimeModal=$.trim($('#openTime').val());//开盘时间
            if(minPrModal!=minPr){
                saleFollowArr.push('总价最小由'+minPr+'变更为'+minPrModal);
        }
        if(maxPrModal!=maxPr){
            saleFollowArr.push('总价最大由'+maxPr+'变更为'+maxPrModal);
        }
        if(minPrRModal!=minPrR){
            saleFollowArr.push('单价最小由'+minPrR+'变更为'+minPrRModal);
        }
        if(priceRanModal!=priceRan){
            saleFollowArr.push('单价最大由'+priceRan+'变更为'+priceRanModal);
        }
        if(minunderModal!=minunder){
            saleFollowArr.push('最底低价由'+minunder+'变更为'+minunderModal);
        }
        if(maxunderModal!=maxunder){
            saleFollowArr.push('最高低价由'+maxunder+'变更为'+maxunderModal);
        }
        if(minFilingModal!=minFiling){
            saleFollowArr.push('最小备案价由'+minFiling+'变更为'+minFilingModal);
        }
        if(maxFilingModal!=maxFiling){
            saleFollowArr.push('最大备案价由'+maxFiling+'变更为'+maxFilingModal);
        }
        if(saleValiModal!=saleVali){
            saleFollowArr.push('许可证有效期由'+saleVali+'变更为'+saleValiModal);
        }
        if(saleVaModal!=saleVa){
            saleFollowArr.push('预售许可证由'+saleVa+'变更为'+saleVaModal);
        }
        if($('#experience>a>span').html()!=basicExperience){
            saleFollowArr.push('体验情况由'+basicExperience+'变更为'+$('#experience>a>span').html());
        }
        if(opentimeModal!=opentime){
            saleFollowArr.push('开盘时间由'+opentime+'变更为'+opentimeModal);
        }
        $.ajax({
            type:'PUT',
            url:floorUrl+'api/property/v1/updatePropertySalesinformation',
            data:{
                minPrice:minPrRModal,//	否	Date	//最低单价
                    maxPrice:priceRanModal,//	否	Double	//最高单价
                minAllPrice:minPrModal,//	否	Double	//最低总价
                    maxAllPrice:maxPrModal,//	否	Double	//
                minRecordPrice:minFilingModal,//	否	Double	//最低备案价
                    maxRecordPrice:maxFilingModal,//	否	Double	//最高备案价
                minFloorPrice:minunderModal,//	否	Double	//最低低价
                    maxFloorPrice:maxunderModal,//	否	Double	//最高低价
                experience:basicExperienceModal,//	否	Double	//体验情况(1不需要保装2部分保装3整体重新保装4烂尾楼)
                    permitForpresale:saleVaModal,//	否	String	//预售许可证
                termofValidity:saleValiModal,//	否	Date	//许可证有效期
                    openPropertyDate:opentimeModal,//	否	Date	//首次开盘时间
                updateUserId:createUserid,//	是	Integer	//更新人id
                    salesinformationId:salesinformationId,//	是	Integer	// 项目开发楼盘销售信息id
                id:floorId,//	是	Integer	// 项目开发楼盘id
                    content:saleFollowArr.join(',')//	是	string	//修改内容详细
            },
            success(data){
                if(data.status=='success'){
                    alert('修改成功!');
                    floorDetail();
                    followLists();
                }else{
                    alert('修改失败!');
                }
            },
            error(){
                console.log('销售信息修改网络错误');
            }
        });
        $('#myModal5').hide();
        $('#cover').hide();
    });
    //合作修改
    $('#saleModelMenu').on('click','a',function(e){
        if($(e.target).html()=='独家代理'){
             $('#agent0').show();
        }else{
            $('#agent0').hide();
        }
    });
    $('#myModal6').on('click','.modify',function(){
        var coopFollowArr=[];
        var curIndexModal=$('#saleModelMenu>li.active').index()==-1?curInitIndex:$('#saleModelMenu>li.active').index()+1,//目前销售类型
            acceptIndexModal=$('#acceptSaleTypeMenu>li.active').index()==-1?acceptInitIndex:$('#acceptSaleTypeMenu>li.active').index()+1,//可接受销售类型
            suppIndexModal=supportIndex.join(',')==''?supportInitArr.join(','):supportIndex.join(','),//甲方支持
            urgentIndexModal=$('#urgencyMenu>li.active').index()==-1?urgentInitIndex:$('#urgencyMenu>li.active').index()+1,//紧急程度
            gropeIndexModal=$('#groupSituationMenu>li.active').index()==-1?gropeInitIndex:$('#groupSituationMenu>li.active').index()+1,//团购
            followIndexModal=$('#followUpMenu>li.active').index()==-1?followInitIndex:$('#followUpMenu>li.active').index()+1,//后续效应
            cIndexModal=$('#commissionMethodMenu>li.active').index()==-1?cInitIndex:$('#commissionMethodMenu>li.active').index()+1,//佣金
            bondIndexModal=$('#promiseMenu>li.active').index()==-1?bondInitIndex:$('#promiseMenu>li.active').index()+1;//保证金
        var agentNameMArr=[],agentStartMArr=[],agentEndMArr=[],agentNameModal='',agentStartModal=''
            ,agentEndModal='',agentIdMArr=[],agentIdModal='';
        var agentCount=$('.agentRow').size();
        if($('#saleModel>a>span').html()=='独家代理'){
            for (var i = 1; i <agentCount; i++) {
                var thisId=$('#agentCompany'+i).parent().parent().parent().parent().parent().attr('id');
                if(isNaN(parseFloat(thisId))){
                    thisId='';
                }
                agentIdMArr.push(thisId);
                agentNameMArr.push($('#agentCompany'+i).val());
                agentStartMArr.push($('#agentTimeStart'+i).val());
                agentEndMArr.push($('#agentTimeEnd'+i).val());
            }
            agentIdModal=agentIdMArr.join(',');
            agentNameModal=agentNameMArr.join(',');
            agentStartModal=agentStartMArr.join(',');
            agentEndModal=agentEndMArr.join(',');
        }
        if(agentNameArr.length!=agentNameMArr.length){
            coopFollowArr.push('代理公司名由'+agentNameArr.join('、')+'变更为'+agentNameMArr.join('、'));
        }
        if(agentStartArr.length!=agentStartMArr.length){
            coopFollowArr.push('代理开始时间由'+agentStartArr.join('、')+'变更为'+agentStartMArr.join('、'));
        }
        if(agentEndArr.length!=agentEndMArr.length){
            coopFollowArr.push('代理结束时间由'+agentEndArr.join('、')+'变更为'+agentEndMArr.join('、'));
        }
        if(curIndexModal!=curInitIndex){
            coopFollowArr.push('目前销售模式由'+curIndex+'变更为'+$('#saleModel>a>span').html());
        }
        if(acceptIndexModal!=acceptInitIndex){
            coopFollowArr.push('可接受销售类型由'+acceptIndex+'变更为'+$('#acceptSaleType>a>span').html());
        }
        if(supportIndex.length>0){
            coopFollowArr.push('甲方支持由'+suppIndex+'变更为'+supportArr.join('、'));
        }
        if(urgentIndexModal!=urgentInitIndex){
            coopFollowArr.push('紧急程度由'+urgentIndex+'变更为'+$('#urgency>a>span').html());
        }
        if(gropeIndexModal!=gropeInitIndex){
            coopFollowArr.push('团购收取由'+gropeIndex+'变更为'+$('#groupSituation>a>span').html());
        }
        if(followIndexModal!=followInitIndex){
            coopFollowArr.push('后续效应由'+followIndex+'变更为'+$('#followUp>a>span').html());
        }
        if(cIndexModal!=cInitIndex){
            coopFollowArr.push('佣金方式由'+cIndex+'变更为'+$('#commissionMethod>a>span').html());
        }
        if(bondIndexModal!=bondInitIndex){
            coopFollowArr.push('保证金由'+bondIndex+'变更为'+$('#promise>a>span').html());
        }
        $.ajax({
            type:'PUT',
            url:floorUrl+'api/property/v1/updatePropertyCooperation',
            data:{
                agencyId:agentIdModal,//	否	string	//代理公司id(多个公司id以‘,’拼接) saleType为独家代理时为必填字段
                    agencyName:agentNameModal,//	否	string	//代理公司名(多个公司以‘,’拼接) saleType为独家代理时为必填字段
                saleType:curIndexModal,//	否	Integer	//目前销售类型(1独家代理2自销3联合代理)
                    fristAgentTime:agentStartModal,//	否	string	//代理时间开始(多个时间以‘,’拼接) saleType为独家代理时为必填字段
                endAgentTime:agentEndModal,//	否	Integer	//代理时间结束(多个时间以‘,’拼接) saleType为独家代理时为必填字段
                    acceptSaleType:acceptIndexModal,//	否	Integer	//可接受销售类型(1接受代理目前无代理2独家代理3自销4联合代理5只做案场6只做联动)
                partySupport:suppIndexModal,//	否	Integer	//甲方支持(1班车2样板房3物料4饭盒)
                    bond:bondIndexModal,//	否	Integer	//保证金(1. 0-50万 2 50万-100万 3 100万-200万 4 200万 -300万 5 500万以上 )
                groupPurchase:gropeIndexModal,//	否	Integer	//团购收取(1.甲方收2代理收)
                    emergencyDegree:urgentIndexModal,//	否	Integer	//紧急程度(1不紧急2一般3需要马上进场)
                followEffect:followIndexModal,//	否	Integer	//后续效应(1后续合作机会2提高知名度)
                    updateUserId:createUserid,//	是	Integer	//更新人id
                    id:floorId,//	是	Integer	// 项目开发楼盘id
                cooperationId:cooperationId,//	是	Integer	//项目开发楼盘id
                content:coopFollowArr.join(','),//	是	string	//修改内容详细
                    commissionMethod:cIndexModal//	否	Integer	//佣金方式(1.固定2.调点3.报销)
            },
            success(data){
                if(data.status=='success'){
                    alert('修改成功!');
                    $('#agent0Rows').html('');
                    floorDetail();
                    followLists();
                    supportInitArr=[];
                    agentNameArr=[];
                    agentStartArr=[];
                    agentEndArr=[];
                }else{
                    alert('修改失败!');
                }
            },
            error(){
                console.log('合作信息修改网络错误');
            }
        });
        $('#myModal6').hide();
        $('#cover').hide();
    });
    //土地修改
    $('#myModal7').on('click','.modify',function(){
        var landFollowArr=[];
        var competitiveModal=$.trim($('#competitiveDate').val()),//竞得日期
            plotRaModal=$('#plotRatioStart').val(),//容积率(土地)
            landTypeStartModal=$('#landTypeMenu>li.active').index()==-1?landTypeInit:$('#landTypeMenu>li.active').index()+1,//用地性质
            startPriModal=$('#startingPrice').val(),//起始价
            buildingArModal=$('#buildingArea').val(),//建筑用地面积
            competitivePrModal=$('#competitivePrice').val(),//竞得价
            floorPrModal=$('#floorPrice').val(),//楼面价
            propertyRightModal=$('#rightYears').val();//产权年限
        if(competitiveModal!=competitive){
            landFollowArr.push('竞得日期由'+competitive+'变更为'+competitiveModal);
        }
        if(plotRaModal!=plotRa){
            landFollowArr.push('容积率由'+plotRa+'变更为'+plotRaModal);
        }
        if(startPriModal!=startPri){
            landFollowArr.push('起始价由'+startPri+'变更为'+startPriModal);
        }
        if(buildingArModal!=buildingAr){
            landFollowArr.push('建筑用地面积由'+buildingAr+'变更为'+buildingArModal);
        }
        if(competitivePrModal!=competitivePr){
            landFollowArr.push('竞得价由'+competitivePr+'变更为'+competitivePrModal);
        }
        if(floorPrModal!=floorPr){
            landFollowArr.push('楼面价由'+floorPr+'变更为'+floorPrModal);
        }
        if(propertyRightModal!=propertyRight){
            landFollowArr.push('产权年限由'+propertyRight+'变更为'+propertyRightModal);
        }
        if($('#landType>a>span').html()!=landTypeStart){
            landFollowArr.push('用地性质由'+landTypeStart+'变更为'+$('#landType>a>span').html());
        }
        $.ajax({
            type:'PUT',
            url:floorUrl+'api/property/v1/updatePropertyLand',
            data:{
                competeDate:competitiveModal,//	否	Date	//竞得日期
                    landArea:buildingArModal,//	否	Double	//土地面积
                startingPrice:startPriModal,//	否	Double	//起始价
                    bidPrice:competitivePrModal,//	否	Double	//竞得价
                volumetricRate:plotRaModal,//	否	Double	//容积率
                    floorPrice:floorPrModal,//	否	Double	//楼面价
                landNature:landTypeStartModal,//	否	Integer	//用地性质(1住宅2商业/办公3工业4其他)
                    propertyRightLife:propertyRightModal,//	否	Integer	//产权年限
                updateUserId:createUserid,//	是	Integer	//更新人id
                    landId:landId,//	是	Integer	// 项目开发楼盘土地信息id
                id:floorId,//	是	Integer	// 项目开发楼盘id
                    content:landFollowArr.join(',')//	是	string	//修改内容详细
            },
            success(data){
                if(data.status=='success'){
                    alert('修改成功!');
                    floorDetail();
                    followLists();
                }else{
                    alert('修改失败!');
                }
            },
            error(){
                console.log('土地信息修改网络错误');
            }
        });
        $('#myModal7').hide();
        $('#cover').hide();
    });
    //详情修改
    $('#myModal8').on('click','.modify',function(){
        var detailFollowArr=[];
        var plotRatModal=$('#plotRatio').val(),//容积率
            propertyCModal=$('#propertyCompany').val(),//物业公司
            planningModal=$('#planningHouse').val(),//规划户
            prTypeModal=$('#propertyTypeMenu>li.active').index()==-1?prTypeInit:$('#propertyTypeMenu>li.active').index()+1,//物业类型
            parkingModal=$('#parkingSpace').val(),//车位数
            storiedBuModal=$('#storiedBuilding').val(),//楼栋总数
            coversAModal=$('#coversArea').val(),//占地面积
            businessCirModal=$('#businessCircle').val(),//周边商圈
            completionTModal=$.trim($('#completionTime').val()),//竣工时间
            checkRoModal=$.trim($('#checkRoom').val()),//最早交房
            afforestationModal=$('#afforestationRate').val(),//绿化率
            propertyManageModal=$('#floorManagement').val(),//物业费用
            decorateIndexModal=$('#decorateMenu>li.active').index()==-1?decorateInit:$('#decorateMenu>li.active').index()+1,//装修
            completeValModal=$('#completeSet').val(),//配套设施
            constructionAModal=$('#constructionArea').val();    //建筑面积
        if(plotRatModal!=plotRat){
            detailFollowArr.push('容积率由'+plotRat+'变更为'+plotRatModal);
        }
        if(propertyCModal!=propertyC){
            detailFollowArr.push('物业公司由'+propertyC+'变更为'+propertyCModal);
        }
        if(planningModal!=planning){
            detailFollowArr.push('规划户数由'+planning+'变更为'+planningModal);
        }
        if(prTypeModal!=prTypeInit){
            detailFollowArr.push('物业类型由'+prType+'变更为'+$('#propertyType>a>span').html());
        }
        if(parkingModal!=parking){
            detailFollowArr.push('车位数由'+parking+'变更为'+parkingModal);
        }
        if(storiedBuModal!=storiedBu){
            detailFollowArr.push('楼栋总数由'+storiedBu+'变更为'+storiedBuModal);
        }
        if(coversAModal!=coversA){
            detailFollowArr.push('占地面积由'+coversA+'变更为'+coversAModal);
        }
        if(businessCirModal!=businessCir){
            detailFollowArr.push('周边商圈由'+businessCir+'变更为'+businessCirModal);
        }
        if(completionTModal!=completionT){
            detailFollowArr.push('竣工时间由'+completionT+'变更为'+completionTModal);
        }
        if(checkRoModal!=checkRo){
            detailFollowArr.push('最早交房由'+checkRo+'变更为'+checkRoModal);
        }
        if(afforestationModal!=afforestation){
            detailFollowArr.push('绿化率由'+afforestation+'变更为'+afforestationModal);
        }
        if(propertyManageModal!=propertyManage){
            detailFollowArr.push('物业费用由'+propertyManage+'变更为'+propertyManageModal);
        }
        if(decorateIndexModal!=decorateInit){
            detailFollowArr.push('装修情况由'+decorateIndex+'变更为'+$('#decorate>a>span').html());
        }
        if(completeValModal!=completeVal){
            detailFollowArr.push('配套设施由'+completeVal+'变更为'+completeValModal);
        }
        if(constructionAModal!=constructionA){
            detailFollowArr.push('建筑面积由'+constructionA+'变更为'+constructionAModal);
        }
        $.ajax({
            type:'PUT',
            url:floorUrl+'api/property/v1/updatePropertyDetail',
            data:{
                managmentCompany:propertyCModal,//	否	string	//物业公司
                    completionTime:completionTModal,//	否	Date	//竣工时间
                propertyType:prTypeModal,//	否	Integer	//物业类型 1 别墅 2住宅 3商业
                    earliestProvide:checkRoModal,//	否	Date	//最早交房时间
                plotRatio:plotRatModal,//	否	string	//容积率
                    greeningRatio:afforestationModal,//	否	string	//绿化率
                planHouseholds:planningModal,//	否	Integer	//规划户数
                    propertyFee:propertyManageModal,//	否	Double	//物业费
                parkingNumber:parkingModal,//	否	Integer	//车位数
                    decorationStatus:decorateIndexModal,//	否	Integer	//装修情况 1 毛坯 2 简装修 3 精装修
                buildingNumber:storiedBuModal,//	否	Integer	//楼栋总数
                    supportingFacilities:completeValModal,//	否	string	//配套设施
                structureArea:constructionAModal,//	否	Double	//建筑面积
                    floorArea:coversAModal,//	否	Double	//占地面积
                businessCircle:businessCirModal,//	否	string	//周边商圈
                    updateUserId:createUserid,//	是	Integer	// 更新人id
                id:floorId,//	是	Integer	// 项目开发楼盘id
                    propertyDetailId:detailId,//	是	Integer	// 项目开发楼盘详情id
                content:detailFollowArr.join(',')//	是	string	//修改内容详细
            },
            success(data){
                if(data.status=='success'){
                    alert('修改成功!');
                    floorDetail();
                    followLists();
                }else{
                    alert('修改失败!');
                }
            },
            error(){
                console.log('土地信息修改网络错误');
            }
        });
        $('#myModal8').hide();
        $('#cover').hide();
    });
    function followRecord(t){
        var followValHtml='';
        if(t!=''){
            var followVal=t.split(',');
            for(var i=0;i<followVal.length;i++){
                followValHtml+=`
            <li>${i+1}、${followVal[i]}</li>
            `;
            }
        }
        return followValHtml;
    }
    //跟进列表
    var thispageNum=1,thispageSize=10,
        followStatusIndex=0,
        followTargetIndex=0;
    var followListCount,pageSize;//列表条数
    function followLists(){
        $.ajax({
            type:'get',
            url:floorUrl+'api/property/v1/property_gjPage',
            data:{
                propertyId:floorId,//	是	Integer	楼盘项目ID
                pageNum:thispageNum,//	否	Integer	页码(默认第1页)
                pageSize:thispageSize,//	否	Integer	页长(默认每页10条)
                followStatus:followStatusIndex,//	否	Integer	检索条件(跟进形式 :0 其他 1 面谈 2 拜访 3 电话 4微信)
                followTarget:followTargetIndex//	否	Integer	检索条件(跟进对象:0无 1 其他 2 销售员 3 销售经理 4 营销总 5 项目总经理 6 股东 7 董事长)
            },
            success(data){
                if(data.status=='success'){
                    var followData=data.data.data;
                    followListCount=data.data.dataCount;
                    pageSize=Math.ceil(followListCount/10);//获取页码最大值
                    if(followListCount==0){
                        $('#pageNum').html('');
                    }
                    var followHtml='';
                //    <li class="photoLi">
                //<img src="../static/img/photo.png" alt=""/><a href="#" class="photo">dashboard__achievements.png</a>
                //        </li>
                    if(followData.length>0) {
                        $.each(followData, function (i) {
                            var fProgressHtml='',fTypeHtml='',fObjHtml='',hasAttachHtml='';
                            if(followData[i].followPhase){
                                fProgressHtml=`<span class="fProgress">${followData[i].followPhase}</span>`;
                            }
                            if(followData[i].followStatus){
                                fTypeHtml=`<span class="fType">${followData[i].followStatus}</span>`;
                            }
                            if(followData[i].followTarget){
                                fObjHtml=`<span class="fObj">${followData[i].followTarget}</span>`;
                            }
                            if(followData[i].followAttach!=''){
                                hasAttachHtml=`
                                <li class="fileLi clear">
                                    <a href="http://images.ehaofang.com/${followData[i].followAttach}" class="gt downLoad">下载</a><img src="../static/img/file.png" alt=""/><span class="file">${fileName}</span>
                                </li>
                                `;
                            }
                            followHtml += `
                            <ul class="gt">
                                ${hasAttachHtml}
                                <li class="timeLi clear">
                                    <span class="gt time">${followData[i].followTime}</span><img src="../static/img/time.png" alt=""/>
                                </li>
                            </ul>
                            <ul class="lists">
                                <li>
                                    <b>${followData[i].followName}</b>${fProgressHtml+fTypeHtml+fObjHtml}
                                </li>
                                <li>
                                    <ul id="followLists">
                                    ${followRecord(followData[i].followUpdate)}
                                    </ul>
                                </li>
                                <li>${followData[i].followRemark}</li>
                            </ul>
                            `;
                        });
                        $('#followMenu').html(followHtml);
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
                        $('#pageNum>li>a.'+thispageNum).parent().addClass('active');
                    }
                }else{
                    alert('获取跟进列表失败');
                }
            },
            error(){
                console.log('获取跟进记录网络错误');
            }
        });
    }
    followLists();//
    //跟进形式筛选
    $('#followTypeMenu>li').click(function(){
        followStatusIndex=$('#followTypeMenu>li.active').index()+1;
        followLists();
    });
    //跟进对象筛选
    $('#followObjMenu>li').click(function(){
        followTargetIndex=$('#followObjMenu>li.active').index()+1;
        followLists();
    });
    //写跟进
    $('#followSelect').on('click','.modifyBtn',function(){
        $('#followEdit').show();
    });
    var followProIndex,followEditIndex,followObjEditIndex,followText;
    function followEdit(){
        $.ajax({
            type:'post',
            url:floorUrl+'api/property/v1/addPropetyFollow',
            data:{
                followStatus:followEditIndex,//	是	Integer	//跟进形式 0 其他 1 面谈 2 拜访 3 电话 4微信
                followPhase:followProIndex,//	否	Integer	//项目跟进阶段 1 了解基本情况 2 关系维护 3 准备提报 4 已提报 5 商务谈判 6 合同签订 7 无效盘
                followRemark:followText,//	否	String	//跟进备注
                followAttach:fileUrl,//	否	String	//跟进附件路径
                followTarget:followObjEditIndex,//	否	Integer	//跟进对象 0无 1 其他 2 销售员 3 销售经理 4 营销总 5 项目总经理 6 股东 7 董事长
                userId:createUserid,//	否	Integer	//用户id
                id:floorId//	否	Integer	// 项目开发楼盘id
            },
            success(data){
                if(data.status=='success'){
                    alert('新增成功!');
                    followLists();
                    $('#followProgress>a>span').html('请选择');
                    $('#followTypeEdit>a>span').html('请选择');
                    $('#followObjEdit>a>span').html('请选择');
                    $('#followText').val('');
                }else{
                    alert('新增失败!');
                }
            },
            error(){
                console.log('提交跟进网络错误');
            }
        });
    }
    $('#submit').on('click',function(){
        followProIndex=$('#followProgressMenu>li.active').index()+1;
        followEditIndex=$('#followTypeEditMenu>li.active').index()+1;
        followObjEditIndex=$('#followObjEditMenu>li.active').index()+1;
        followText=$('#followText').val();
        followEdit();
    });
    //页码数的点击事件
    $('#pageNum').on('click','li:not(.more)>a',function(e){
        $(e.target).parent().addClass('active').siblings().removeClass('active');
        thispageNum=$(e.target).html();//获取当前页码
        followLists();
        if(thispageNum<=4){
            $('#pageNum>li.nextMore').hide();
            $('#pageNum>li.gtFour').hide();
        }
        if(thispageNum>=followListCount){
            $('#pageNum>li.nextMore').hide();
            $('#pageNum>li.gtFour').hide();
        }
        if(thispageNum==1){
            $('#pages>ul>li.prev').addClass('disabled').siblings().removeClass('disabled');
        }else{
            $('#pages>ul>li.prev').removeClass('disabled');
        }
        if(thispageNum==followListCount){
            $('#pages>ul>li.next').addClass('disabled').siblings().removeClass('disabled');
        }else{
            $('#pages>ul>li.next').removeClass('disabled');
        }
    });
//向前翻页按钮的点击事件
    $('#pages>ul>li.next').on('click','a',function(e){
        thispageNum++;
        followLists();
        $('#pages>ul>li.prev').removeClass('disabled');
        if(thispageNum<=4){
            $('#pageNum>li.active').removeClass('active').next().addClass('active');//为下一页加.active
        }
    });
//向后翻页的点击事件
    $('#pages>ul>li.prev').on('click','a',function(e){
        thispageNum--;
        followLists();
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