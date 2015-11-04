var testData=[
	{
		"id":"38dhe73d8d3en8e8n3duc3",
		"number":"20111234",
		"name":"Tom",
		"classname":"Computer Science and Technology 1",
		"hometown":{
			"country":"China",
			"province":"Hubei",
			"city":"Jingmen"
		},
		"birthday":"May, 15th, 1994"
	},{
		"id":"njww8jx8dy88xxxuixiwnw",
		"number":"20111235",
		"name":"Tim",
		"classname":"Computer Science and Technology 2",
		"hometown":{
			"country":"Japan",
			"province":"Kanagawa",
			"city":"Yokohama"
		},
		"birthday":"September, 20th, 1994"
	},{
		"id":"399dix38zj28x9xwiwjs8x",
		"number":"20111236",
		"name":"Jack",
		"classname":"Computer Science and Technology 3",
		"hometown":{
			"country":"USA",
			"province":"CA",
			"city":"San Francisco"
		},
		"birthday":"March, 14th, 1993"
	},
];

$(document).ready(function() {
	megularFunction1();

	megularFucntion2();
});

function megularFunction1() {
	mengular1(testData,"#student-table1 tbody");
}

function megularFucntion2() {
	var selector="#student-table2 tbody";
	for(var i in testData) {
		if(i>0) 
			mengular2(testData[i],selector,"templateClass1");
		else
			mengular2(testData[i],selector,"templateClass2");
		console.log($("#"+testData[i].id+"").html());
		// $("#"+testData[i].id).click(function(){
		// 	console.log(i);
		// });

	}
}