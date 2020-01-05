//사이트 접속시 도메인이 블랙리스트에 추가된 목록과 같으면 차단
chrome.webRequest.onBeforeRequest.addListener(
	function(info) {
		var blacklist = localStorage["blacklist"].split('\n');

		if (localStorage["enabled"] === "false" || !blacklist) {
			return;
		}

		for (var match in blacklist) {
			var str = blacklist[match];
			if (str !== "" && info.url.match(new RegExp(str))) {
				chrome.tabs.update({url: "main.html"});
				alert('차단목록에 추가한 사이트입니다');
				return {cancel: true};
			}
		}

		return;
	},
	{urls: ["http://*/*", "https://*/*"]},
	["blocking"]);

// Chrome의 새탭을 'main.html'로 변경
chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "main.html";
    chrome.tabs.create({ url: newURL });
});


// 알림함수
function showNotification() {
	
	//로컬 스토리지의 ToDoList를 Object형으로 읽어온 후 text,month,day,hour,minute의 값을 String으로 바꿈
	var ListValue =  JSON.parse(localStorage.getItem('ToDoList'));
	var myList = ListValue.map((o)=>o.text);
	var myMonth = ListValue.map((o)=>o.month);
	var myDay = ListValue.map((o)=>o.day);
	var myHour = ListValue.map((o)=>o.hour);
	var myMinute = ListValue.map((o)=>o.minute);
	var objLength = (Object.keys(myList).length);

	//momnet 라이브러리를 사용해 현재날짜를 '월-일-시-분'으로 가져옴
	var currentDate=moment().format('MM-DD-HH-mm');
	//유저가 설정한 알림시기를 가져옴
	var UserTime = localStorage.getItem('userNotice');
	
	//하루 전이면 현재 day를 +1, 한시간전이면 현재 hour을 +1, 30분전이면 현재 minute를 +30......
	if(UserTime=="Noti_day1")
			currentDate=moment(new Date()).add(+1, 'days').format('MM-DD-HH-mm');
	if(UserTime=="Noti_h1")
			currentDate=moment(new Date()).add(+1, 'hours').format('MM-DD-HH-mm');
	if(UserTime=="Noti_m30")
			currentDate=moment(new Date()).add(+30, 'minutes').format('MM-DD-HH-mm');
	if(UserTime=="Noti_m10")
			currentDate=moment(new Date()).add(+10, 'minutes').format('MM-DD-HH-mm');
	if(UserTime=="Noti_m5")
			currentDate=moment(new Date()).add(+5, 'minutes').format('MM-DD-HH-mm');
	
	//ToDoList의 값을 처음부터 끝까지 검사해서 currentDate(현재날짜)와 selecteDate(설정날짜)가 같으면 알림전송
	for(var i=0;i<=objLength-1;i++)
	{
		var selecteDate = myMonth[i] + "-" + myDay[i] + "-" + myHour[i] + "-" + myMinute[i];
		if(currentDate==selecteDate)
		{	
			var opt = {
				type: "basic", //기본
				title: myList[i], //해당 텍스트값
				message: myMonth[i] + "월" + myDay[i] + "일 " + myHour[i] + "시" + myMinute[i] + "분",
				iconUrl: 'images/notification.png'
			};
			//알림 생성
			chrome.notifications.create('id', opt, function(id) {});
			
		}
	}

 };
 
 // 1초마다 현재시간의 초를 검사한 후 0초가 되면 
 playAlert = setInterval(function() {
	 
	var d = new Date();
	var cuurentSecond=d.getSeconds()

	if(cuurentSecond==0)
	{
		//showNotification 이벤트 실행
		showNotification()
	}
	 
 }, 1000);



 