var myItems = new Array();
var bellEnable=0;

// 시작할때 월,일,시,분 선택목록을 감춤
$('.Noti_setTime').hide();

// input text(#item)의 키입력 이벤트
$("#item").keydown(function(key) {
		//엔터키를 누르면
	if (key.keyCode == 13) {
		
		//#item의 입력값을 가져옴
		item = document.querySelector('#item');
		var getText = $("#item").val();
		
		//month는 선택한 월의 값
		var monthValue = document.getElementById("Noti_month");
		var month = monthValue.options[monthValue.selectedIndex].text;
		
		//day는 선택한 일의 값
		var dayValue = document.getElementById("Noti_day");
		var day = dayValue.options[dayValue.selectedIndex].text;
		
		//hour는 선택한 시의 값
		var hourValue = document.getElementById("Noti_hour");
		var hour = hourValue.options[hourValue.selectedIndex].text;
		
		//minute는 선택한 분의 값
		var minuteValue = document.getElementById("Noti_minute");
		var minute = minuteValue.options[minuteValue.selectedIndex].text;
		
		//중복체크를 위해 localstorage에 저장된 'ToDoList'를 가져옴
		var students = JSON.parse(localStorage.getItem('ToDoList'));
		
		//중복체크 시작 localstorage에 ToDoList라는 key가 존재 한다면(에러방지)
		if("ToDoList" in localStorage)
		{	
			//'ToDoList' 안에 text키를 가진 값들을 가져옴
			var ListValue =  JSON.parse(localStorage.getItem('ToDoList'));
			var myList = ListValue.map((o)=>o.text);
			var objLength = (Object.keys(myList).length);
			//'ToDoList' 안에 있는 text값과 입력값을 비교 한 후 같다면 메시지 출력 후 이벤트 종료
			for(var i=0; i<objLength;i++)
			{
				if(getText==myList[i])
					{
						$("#alert").html("이미 입력한 항목입니다.");
						$("#alert").fadeIn().delay(500).fadeOut();	
						item.value = "";
						preventdefault()
					}
			}
		}
		
		// 월 일 시 분 중 하나라도 설정하지 않았다면 모두 정의하지 않음
		if(bellEnable==0 || month=="월" || day=="일" || hour=="시" || minute=="분")
		{
			month=undefined; day=undefined; hour=undefined; minute=undefined;
		}
		
		//최초 입력시 로컬스토리지에  추가하는 부분 ('ToDoList'가 비어있을 경우 오류가 생기기 때문에 만듬)
		if (localStorage.getItem("ToDoList") === null && getText != "") {
			
			myItems.push({text:getText,month:month,day:day,hour:hour,minute:minute});		
			localStorage.setItem("ToDoList", JSON.stringify(myItems));		
			item.value = "";
			AddList();
		}
		//2번째 입력부터 로컬스토리지에 추가하는 부분
		else if(getText != ""){
			
			var data={text:getText,month:month,day:day,hour:hour,minute:minute};
			SaveDataToLocalStorage(data);
			localStorage.setItem("ToDoList", JSON.stringify(myItems));
			item.value = "";
			AddList();
		}
	}
});

// 로컬스토리지에 추가함
function SaveDataToLocalStorage(data)
{  
  myItems = JSON.parse(localStorage.getItem('ToDoList'));
  myItems.push(data);
}

// 입력한 항목 #list에 추가
function AddList()
{
	//'ToDoList'를 가져온 후 text, 월, 일, 시, 분으로 나눔
	var ListValue =  JSON.parse(localStorage.getItem('ToDoList'));
	var myList = ListValue.map((o)=>o.text);
	var myMonth = ListValue.map((o)=>o.month);
	var myDay = ListValue.map((o)=>o.day);
	var myHour = ListValue.map((o)=>o.hour);
	var myMinute = ListValue.map((o)=>o.minute);

	var objLength = (Object.keys(myList).length);
	//월 일 시 분이 존재 한다면 타이틀에 날짜를 추가
	if(myMonth[objLength-1] != undefined)
	{
	$('#list').append(
		'<li title='+ myMonth[objLength-1] + "월" + myDay[objLength-1] +"일&nbsp;&nbsp;" + myHour[objLength-1] +"시"+ myMinute[objLength-1] +"분&nbsp;&nbsp;&nbsp;&nbsp;" +'>'+myList[objLength-1]+'</li>'
		);
	}
	//없다면 타이틀 없이 추가
	else
	{
		$('#list').append('<li>'+myList[objLength-1]+'</li>');
	}
}

// 벨 이미지 (알림설정) 클릭 이벤트
    $("#btn_showNotification").click(function(){	
		
		//벨 클릭하면 알림 select문 보여줌
		if(bellEnable==0) {
			$('.Noti_setTime').show(); bellEnable=1;}
		//다시 한번 클릭하면 사라지게 한 후 월, 일, 시, 분의 선택값 초기화
		else	{
			$('.Noti_setTime').hide(); bellEnable=0;
			$(".Noti_setTime").val("default");
		}   
   });

// 리스트 클릭시 삭제
	list.addEventListener('click',function(e){
			var t = e.target;
			
			//리스트 목록에서 삭제
			t.parentNode.removeChild(t);
			var removeItem = $(event.target).text()

			var ListValue =  JSON.parse(localStorage.getItem('ToDoList'));
			var myList = ListValue.map((o)=>o.text);
			var objLength = (Object.keys(myList).length);

			for(var i=0; i<=objLength;i++)
			{
				if(removeItem==myList[i])
				{
					//'ToDoList'의 text와 클릭한 리스트의 text가 일치하면 ToDoList의 해당부분을 삭제
					var currentItem = JSON.parse(localStorage.getItem('ToDoList'));
					currentItem = currentItem.filter(a => {return a.text!==removeItem})
					localStorage.setItem("ToDoList", JSON.stringify(currentItem));				
				}
					
			}   
	},false)
	
	// 페이지 로드시 리스트목록에 localStorage 값 추가
	document.addEventListener("DOMContentLoaded", function(event) {
		var ListValue =  JSON.parse(localStorage.getItem('ToDoList'));
		var myList = ListValue.map((o)=>o.text);
		var myMonth = ListValue.map((o)=>o.month);
		var myDay = ListValue.map((o)=>o.day);
		var myHour = ListValue.map((o)=>o.hour);
		var myMinute = ListValue.map((o)=>o.minute);

		var objLength = (Object.keys(myList).length);

			//ToDoList에 저장된 값들을 모두 리스트에 추가
			for(var i=0;i<=objLength-1;i++)
			{	
				//월 일 시 분이 존재 한다면 타이틀에 날짜를 추가
				if(myMonth[i] != undefined){
					$('#list').append('<li title='+ myMonth[i] + "월" + myDay[i] +"일&nbsp;&nbsp;" + myHour[i] +"시"+ myMinute[i] +"분&nbsp;&nbsp;&nbsp;&nbsp;" +'>'+myList[i]+'</li>');
				}
				// 없다면 타이틀 제외하고 추가
				else{
					$('#list').append('<li>'+myList[i]+'</li>');
				}
			}
		
	});

	// 초기화 이벤트
	$("#copyright").click(function(){	
		
		//localstorage의 'ToDoList'와 'userNotice(알림설정시간)'을 초기화 후 새로고침
		localStorage.removeItem('ToDoList');
		localStorage.removeItem('userNotice');
		location.reload();
		
		});


