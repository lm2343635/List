var LEFT_SPLIT_STR="${";
var RIGHT_SPLIT_STR="}$";
//模板类名称
var MEGULAR_TEMPLATE_CLASS="mengular-template";

/**
 * 模板是固定的，使用数据数组去填充数据
 * @param  {数据数组}
 * @param  {选择器}
 * @return {none}
 */
function mengular1(data,selector) {
	var templateHtml=$(selector).html();
	//console.log(templateHtml);
	var htmlArray=templateHtml.split(LEFT_SPLIT_STR);
	var attributeNames=new Array();
	for(var i=1;i<htmlArray.length;i++) 
		attributeNames[i-1]=htmlArray[i].split(RIGHT_SPLIT_STR)[0];
	//console.log(attributeNames);
	$(selector).empty();
	for(var i in data) {
		var thisNodeHtml=templateHtml;
		var object=data[i];
		for(var j in attributeNames) 
			thisNodeHtml=thisNodeHtml.replace(LEFT_SPLIT_STR+attributeNames[j]+RIGHT_SPLIT_STR,eval("object."+attributeNames[j]));
		//console.log(thisNodeHtml);
		$(selector).append(thisNodeHtml);
	}
}

/**
 * 模板有很多个可供选择，但每次只能调用一个模板，因此传入的数据线不是数据数组，而只是其中一项的json对象
 * @param  {数据项数据}
 * @param  {选择器}
 * @param  {模板类名称}
 * @return {none}
 */
function mengular2(item,selector,templateClass) {
	$(selector+" ."+MEGULAR_TEMPLATE_CLASS).each(function(index){
		if($(this).hasClass(templateClass)) {
			var templateHtml=$(this).prop("outerHTML");
			//console.log(templateHtml);
			var htmlArray=templateHtml.split(LEFT_SPLIT_STR);
			var attributeNames=new Array();
			for(var i=1;i<htmlArray.length;i++) 
				attributeNames[i-1]=htmlArray[i].split(RIGHT_SPLIT_STR)[0];
			//console.log(attributeNames);
			for(var j in attributeNames) 
				templateHtml=templateHtml.replace(LEFT_SPLIT_STR+attributeNames[j]+RIGHT_SPLIT_STR,eval("item."+attributeNames[j]));
			templateHtml=$(templateHtml).removeClass(MEGULAR_TEMPLATE_CLASS).prop("outerHTML");
			//console.log(templateHtml);
			$(selector).append(templateHtml);
			return;
		}	
	});
}

