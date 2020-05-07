let darts = [], num = 0;

$(document).ready(function() {
	$("#target").click(function(event) {
		let w = $(this).innerWidth(), h = $(this).innerHeight();
		let x = event.pageX - 10 - $(this).position().left, y = event.pageY - 18 - $(this).position().top;
		let px = x / w * 100, py = y / h * 100;
		let dart = null;
		if(darts[num] == null) {
			dart = document.createElement("div");
			$("#target").append(dart);
			dart.className = "dart";
			dart.id = "n" + num;
			dart.innerHTML = "x";
			$("#n" + num).css("position", "absolute");
		}
		else {
			dart = darts[num].dart;
		}
		$("#n" + num).css("left", px + "%");
		$("#n" + num).css("top", py + "%");
		darts[num] = {x: px, y: py, dart: dart};
		console.log(darts);
		if(num == 4) num = 0;
		else num++;
	});
});