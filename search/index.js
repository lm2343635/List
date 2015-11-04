var DATA_URL="http://61.183.239.66:8081/notice/noticeserver/noticeserver.ashx";
var JSONP_API_URL="http://api.fczm.pw/JsonpServlet";

var NOTICE_TYPE=["所有类型公告","挂牌公告","招标公告","中标公告","成交公告","遗失公告","竞价公告","指标成交公告"];

var noticeType;
var listData;

$(document).ready(function(){

	$("#start-date, #end-date").datetimepicker({
		weekStart: 1,
	    todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
	    showMeridian: 1420074000,
        language: 'zh-CN'
    });

    $("#search-button").click(function(){
    	var startDate=$("#start-date").val();
    	var endDate=$("#end-date").val();
    	var type=$("#type").val();
    	var city=$("#city").val();
    	var validate=true;
    	if(startDate==""||startDate==null) {
    		validate=false;
    		$("#start-date").parent().addClass("has-error");
    	} else {
    		$("#start-date").parent().removeClass("has-error");
    	}
    	if(endDate==""||endDate==null) {
    		validate=false;
    		$("#end-date").parent().addClass("has-error");
    	} else {
    		$("#end-date").parent().removeClass("has-error");
    	}
    	if(type==""||type==null) {
    		validate=false;
    		$("#type").parent().addClass("has-error");
    	} else {
    		$("#type").parent().removeClass("has-error");
    	}
    	if(city==""||city==null) {
    		validate=false;
    		$("#city").parent().addClass("has-error");
    	} else {
    		$("#city").parent().removeClass("has-error");
    	}
    	if(validate) {
            noticeType=type;
    		var start=get_unix_time(startDate);
    		var end=get_unix_time(endDate);
    		var md5=$.md5(start+end+city+type+"city_circle_2014").toUpperCase();
    		var url=DATA_URL+"?strartdate="+start+"&enddate="+end+"&citycode="+city+"&noticetype="+type+"&sign="+md5;
            $.ajax({
                url: JSONP_API_URL,
                dataType: "jsonp",
                data: {url: url},
                success: function(data) {
                    listData=data;
                    mengularClear("#data-list tbody");
                    for(var i in listData.rows) {
                        var item=listData.rows[i];
                        mengular2({
                            ProjectCode: item.ProjectCode,
                            NoticeTittle: item.NoticeTittle,
                            NoticeType: NOTICE_TYPE[item.NoticeType],
                            ListPrice: item.content[0].ListPrice,
                            UpdateDate: item.content[0].UpdateDate
                        }, "#data-list tbody", "data-template");
                        $("#"+item.ProjectCode).click(function(){
                            var item=findItemFormListData($(this).attr("id"));
                            if(noticeType==1) {
                                $("#notice-type-1").show();
                                if(item.content[0].IsDeal==0)
                                    item.content[0].IsDeal="未成交";
                                else 
                                    item.content[0].IsDeal="已成交";
                                mengular3({
                                    NoticeTittle: item.NoticeTittle,
                                    ProjectCode1: item.ProjectCode,
                                    TransVariety1: item.TransVariety,
                                    StartDate1: item.content[0].StartDate,
                                    EndDate1: item.content[0].EndDate,
                                    Transferor1: item.content[0].Transferor,
                                    LocatArea1: item.content[0].LocatArea,
                                    RollOutArea1: item.content[0].RollOutArea,
                                    RollOutMode1: item.content[0].RollOutMode,
                                    RollOutYear1: item.content[0].RollOutYear,
                                    ListPrice1: item.content[0].ListPrice,
                                    IsDeal1: item.content[0].IsDeal,
                                });
                            } else if(noticeType==4) {
                                $("#notice-type-4").show();
                                mengular3({
                                    NoticeTittle: item.NoticeTittle,
                                    ProjectCode4: item.ProjectCode,
                                    TransVariety4: item.TransVariety,
                                    Transferor4: item.content[0].Transferor,
                                    Transferee4: item.content[0].Transferee,
                                    BiddingDate4: item.content[0].BiddingDate,
                                    RollOutArea4: item.content[0].RollOutArea,
                                    RollOutYear4: item.content[0].RollOutYear,
                                    ListPrice4: item.content[0].ListPrice,
                                    RollOutMode4: item.content[0].RollOutMode,
                                    LocatArea4: item.content[0].LocatArea,
                                    RollOutUse4: item.content[0].RollOutUse
                                });
                            }
                            
                            $(".panel").hide();
                            $("#item-panel").fadeIn();
                        });
                    }
                }
            });
        }
    });

    $("#item-panel-back").click(function(){
        $(".panel").hide();
        $("#search-panel").fadeIn();
        $("#item-panel .panel-body .row").hide();
    });
});

function get_unix_time(dateStr) {
    var newstr = dateStr.replace(/-/g,'/'); 
    var date =  new Date(newstr); 
    var time_str = date.getTime().toString();
    return time_str.substr(0, 10);
}

function findItemFormListData(projectCode) {
    for(var i in listData.rows) 
        if(listData.rows[i].ProjectCode==projectCode)
            return listData.rows[i];
}