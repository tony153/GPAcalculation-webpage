// JavaScript Document
let GPAList=new Array();
let Correspondence_table=new Array();
let numOfrow=0;

//==default==
$("table tr:first").hide(0);
$(".button_list").hide(0);
addItem();

Correspondence_table["A"]=4.0;
Correspondence_table["A-"]=3.7;
Correspondence_table["B+"]=3.3;
Correspondence_table["B"]=3.0;
Correspondence_table["B-"]=2.7;
Correspondence_table["C+"]=2.3;
Correspondence_table["C"]=2.0;
Correspondence_table["C-"]=1.7;
Correspondence_table["D+"]=1.3;
Correspondence_table["D"]=1.0;
Correspondence_table["F"]=0;
//-----------

function readTabledata(row_index){
	let course_code=$("tr:eq("+row_index+") th:eq(0) input").val();
	let credits=$("tr:eq("+row_index+") th:eq(1) input").val();
	let grade=$("tr:eq("+row_index+") th:eq(2) input").val();
	checkData_GPAList(row_index,credits,grade)
//	if(checkData_GPAList(row_index,credits,grade)){
		GPAList[row_index-2]={
			Course_Code : course_code,
			Credits : credits,
			Letter_grades:grade,
			Grade_points : Correspondence_table[grade],
		}
//	}
}

$("table").on("focusout","input" ,function(){
	let row_index=$(this).closest("tr").index();
	readTabledata(row_index);
	calculation();
});

function checkData_GPAList(row_index,user_credits,user_grade){
	let Grade=Object.keys(Correspondence_table);
	let gread_check=false;
	
	for(let i=0;i<Grade.length;i++){
		if(user_grade==Grade[i]){
			$("tr:eq("+row_index+") th:eq(2) input").css("border","");
			gread_check=true;
			break;
		}
		if(i==Grade.length-1&&user_grade.length!=""){
			$("tr:eq("+row_index+") th:eq(2) input").css("border","2px solid red");
		}
	}
	if(isNaN(user_credits)){
//		if($("tr:eq("+row_index+") th:eq(1) error").html()!="!"){
//			$("tr:eq("+row_index+") th:eq(1)").append("<error>!</error>");
//		}
		$("tr:eq("+row_index+") th:eq(1) input").css("border","2px solid red");
		
	}else{
//		$("tr:eq("+row_index+") th:eq(1) error").remove();
		$("tr:eq("+row_index+") th:eq(1) input").css("border","");
	}
	
	if(!isNaN(user_credits)&&gread_check){
		return true;
	}
	return false;
}

$("#test").on("click",function(){
	console.log(GPAList);
	console.log("Cumulative GPA :"+calculation());
	//console.log(Correspondence_table);
	//console.log(Object.keys(Correspondence_table));
});


function calculation(){
	let product_grade_credits=0;
	let total_credits=0;
	for(let i=0;i<GPAList.length;i++){
		total_credits+=parseInt(GPAList[i].Credits);
		product_grade_credits+=GPAList[i].Credits*GPAList[i].Grade_points;
	}
	let result=product_grade_credits/total_credits;
	
	if(isNaN(total_credits)){
	    $("#result total_credits").html("~");
	}else{
		$("#result total_credits").html(total_credits);	
	}
	
	if(isNaN(result)){				
		$("#result Cumulative_GPA").html("~");
	}else{
		$("#result Cumulative_GPA").html(result);
	}
//	console.log("total_credits: "+total_credits);
//	console.log("result: "+result);
	return result;
}

//==table effect==
$("table").on("mouseover","th:not(th:has(#del_item_button))",function(){
	$(this).closest($("tr:gt(1)")).css("background-color", "#DBDBDB");
});
$("table").on("mouseout","th:not(th:has(#del_item_button))",function(){
	$(this).closest($("tr:gt(1)")).css("background-color", "transparent");
});



var save_button_timeID;
$("#save_button").hover(function(){
	$(".button_list").fadeIn(500);
},function(){
	save_button_timeID=setTimeout(function(){$(".button_list").fadeOut(500);},1000);
});

$(".button_list").mouseenter(function(){
	clearTimeout(save_button_timeID);
    $(".button_list").fadeIn(0);
}).mouseleave(function(){
            $(".button_list").fadeOut("slow");    
});



let old_version=0;
$("#old_version").on("click",function(){
	if(old_version===0){
		old_version=1;
	     $("#old_version a").fadeIn(500);
	   }else{
		 old_version=0;
	     $("#old_version a").fadeOut(500);
	   }
})

$("#how_to_use_QIN").hover(function(){
	$(this).html("¿");
},function(){
	$(this).html("?");
});
$("#how_to_use_QIN").on("click",function(){
	window.open("./img/quick_input_how_to_use.gif", "HOW TO USE ???",  config="height=600,width=850");
})
//----------------

//==warnting==
function showWarning(warning){
	$(".warning").show(0);
	$("#warning").show(500);
	$("#warning").html(warning);
	setTimeout(function(){
		$("#warning").hide(0);
		$(".warning").hide(0);
	},5500);
}

let d4f_Es8=0;
$(".warning2").find("div").on("click",function(){
	d4f_Es8++;
	if(d4f_Es8==5){
	   $(".warning2").css("display","none");
	}
})
//------------

//==add_item_button==
$("#add_item_button").on("mouseover",function(){
	$("#add_item_button").css("background-color","#00C3FF","color");
	$("#add_item_button").css("color","#FFFFFF");
});
$("#add_item_button").on("mouseout",function(){
	$("#add_item_button").css("background-color","");
	$("#add_item_button").css("color","#000000");
});
$("#add_item_button").on("click",addItem);

function addItem(){
	$("tbody").append($("tr:nth(0)").clone());
	$("table tr:last-child").show(500);
	numOfrow++;
}
//-------------------

//==del_item_button==
$("body").on("mouseover","#del_item_button",function(){
	$(this).closest("tr").css("background-color", "red");
	$(this).closest("div").find("img[src='./img/trash_open.png']").css("display","block");
	$(this).closest("div").find("img[src='./img/trash_close.png']").css("display","none");
});
$("body").on("mouseout","#del_item_button",function(){
	$(this).closest("tr").css("background-color", "transparent");
	$(this).closest("div").find("img[src='./img/trash_close.png']").css("display","block");
	$(this).closest("div").find("img[src='./img/trash_open.png']").css("display","none");
});
$("body").on("click",".trash_button",function(){
	if(numOfrow>1){
		$(this).closest("tr").remove();
		GPAList.splice($(this).closest("tr").index(),1);
		numOfrow--;
	}else{
		//alert("There is only one line,so cannot be deleted");
		showWarning("There is only one line,so cannot be deleted");
	}
	
});
function delItem(i){
	GPAList.splice(i,1);
	$("tr:eq("+i+")").remove();
	numOfrow--;
}
//-------------------


$("#Qinput").on("click",function(){
	$("#save_data").show();
	$("#sohw_data").show();
	$("#remove_data").show();
	
	$("#GPAtable table").show();
	$("#GPAtable .add_hr").show();
	$("#GPAtable #add_item_button").show();
	$("#GPAtable #Quick_input_box").hide();
	
	let str = $("textarea").val();
    let rowStrArray = str.split("\n");
	let thStrArray= new Array();
//	thStrArray[0]=rowStrArray[0].split(" ")
//	alert(thStrArray[0][0]);
	for(let i=0;i<rowStrArray.length;i++){
		thStrArray[i]=rowStrArray[i].split('\t');
	}
	
	let temp_numOfrow=numOfrow;	
	for(let i=0;i<temp_numOfrow;i++){
		delItem(2);
	}
	for(let i=0;i<rowStrArray.length;i++){
		addItem();
	}
	
	
	for(let row=0;row<rowStrArray.length;row++){
		for(let col=0;col<thStrArray[row].length;col++){
			
			$("tr:eq("+(row+2)+") th:eq("+col+") input").val(thStrArray[row][col]);
		}
		readTabledata(row+2);
	}
	calculation();
})

let Quick_input=0;
$("#Quick_input").on("click",function(){
	if(Quick_input===0){
		Quick_input=1;
		$("#save_data").hide();
		$("#sohw_data").hide();
		$("#remove_data").hide();

		$("#GPAtable table").hide();
		$("#GPAtable .add_hr").hide();
		$("#GPAtable #add_item_button").hide();
		$("#GPAtable #Quick_input_box").show();
	}else{
		Quick_input=0;
		$("#save_data").show();
		$("#sohw_data").show();
		$("#remove_data").show();

		$("#GPAtable table").show();
		$("#GPAtable .add_hr").show();
		$("#GPAtable #add_item_button").show();
		$("#GPAtable #Quick_input_box").hide();
	}
});


//==cookie 1==
/*use cookie to storage GPAList*/
$("#sohw_data").on("click",function(){
	let user = prompt("Please enter your name:","");
	
	if(user.trim()==""){
		
	}else if(!IsJsonString($.cookie(user))){
		//alert("no user data.");
		showWarning("no user data.");
	}else{
		$("#username").html(user);
		showWarning("success");	
		
		//==recover==
		let data=JSON.parse($.cookie(user));
		console.log(data);
	
		let temp_numOfrow=numOfrow;	
		for(let i=0;i<temp_numOfrow;i++){
			delItem(2);
		}
		for(let i=0;i<data.length;i++){
			addItem();
		}
		
			
		for(let i=0;i<data.length;i++){
			$("tr:eq("+(i+2)+") th:eq(0) input").val(data[i].Course_Code);
			$("tr:eq("+(i+2)+") th:eq(1) input").val(data[i].Credits);
			$("tr:eq("+(i+2)+") th:eq(2) input").val(data[i].Letter_grades);
		}
		GPAList=data;
		calculation();
		//-----------
	}
});
$("#save_data").on("click",function(){
	let user = prompt("Please enter your name:","");	
	let data=JSON.stringify(GPAList);
	let check=1;
	
	if(user.trim()!=""){
		try {
			$.cookie(user,data,{ expires: 7 });
		} catch(e){
			check=0;
			alert(e);
		}
		if(check==1){
			$("#username").html(user);
			showWarning("success,Temporary storage for 7 days");
		}
	}
});
$("#remove_data").on("click",function(){
	let user = prompt("Please enter your name:","");
	if(user.trim()!=""){
		if($.removeCookie(user)){
			showWarning("success");
		}else{
			showWarning("user data not exist");
		}
	}
});
//------------

//==JSON==
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
//--------