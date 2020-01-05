
//페이지 로드 이벤트
document.addEventListener('DOMContentLoaded',
	function () {
		// 블랙리스트에 추가
		if (localStorage["enabled"] !== "false") {
			document.getElementById('enabled').checked = true;
		} else {
			var checked = !document.getElementById('enabled').checked;
			document.getElementById('blacklist').disabled = checked;
		}

		var bl = localStorage["blacklist"];
		document.getElementById('blacklist').value = bl ? bl : "";

		
		document.getElementById('blacklist').addEventListener('keyup',
			function () {
				var blacklist = document.getElementById('blacklist').value;
				localStorage["blacklist"] = blacklist;
			});

		document.getElementById('enabled').addEventListener('click',
			function() {
				var checked = document.getElementById('enabled').checked;
				document.getElementById('blacklist').disabled = !checked;
				localStorage["enabled"] = checked;
			});
	});
