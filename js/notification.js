//알람시간 Select가 변경될때 이벤트

$("#notification").change(function() {
    var target = document.getElementById("notification");
	
	// 알람시간 설정에서 선택한 값 가져옴
	var selectNotice =	target.options[target.selectedIndex].value
	
	//설정한 알람시간을 1초간 출력 후 사라지게 함
    $("#alert").html("알림을 "+target.options[target.selectedIndex].text+ "으로 설정했습니다.");
    $("#alert").fadeIn().delay(1000).fadeOut();	
	
	// 로컬스토리지에 userNotice라는 키로 저장
	localStorage.setItem('userNotice',selectNotice);
});

$(function(){
	
		//select에 1-12월 1-31일 0-23시 0-60분 추가
		var notiSelected = localStorage.getItem('userNotice');
		$('#notification').val(notiSelected);
		
		var Noti_month = document.getElementById("Noti_month");
		var Noti_day = document.getElementById("Noti_day");
		var Noti_hour = document.getElementById("Noti_hour");
		var Noti_minute = document.getElementById("Noti_minute");
		
		for(var i=1; i<13; i++){
			var option = document.createElement("option");
			var k=i;
			if(k<10)
				k="0"+i;
			else
				k=i;
			option.text = k;
			Noti_month.add(option);
		}
		
		for(var i=1; i<32; i++){
			var option = document.createElement("option");
			var k=i;
			if(k<10)
				k="0"+i;
			else
				k=i;
			option.text = k;
			Noti_day.add(option);
		}
		
		for(var i=0; i<24; i++){
			var option = document.createElement("option");
			var k=i;
			if(k<10)
				k="0"+i;
			else
				k=i;
			option.text = k;
			Noti_hour.add(option);
		}
		
		for(var i=0; i<61; i++){
			var option = document.createElement("option");
			var k=i;
			if(k<10)
				k="0"+i;
			else
				k=i;
			option.text = k;
			Noti_minute.add(option);
		}
});





