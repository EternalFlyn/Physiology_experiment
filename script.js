let darts = [], num = 0, ss = [0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05, 0.015];

$(document).ready(function() {
	$("#target").click(function(event) {
		let w = $(this).innerWidth(), h = $(this).innerHeight();
		let x = event.pageX - $(this).position().left, y = event.pageY - $(this).position().top;
		let px = (x - 0.5 * w) / h, py = (y - 0.5 * h) / h;
		let dart = null;
		if(darts[num] == null || darts[num].dart == null) {
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
		if(darts[num] == null) createNewRow();
		$("#n" + num).css("left", (x - 13) / w * 100 + "%");
		$("#n" + num).css("top", (y - 40) / h * 100 + "%");
		darts[num] = {x: px, y: py, dart: dart};
		addDataInTable();
		console.log(darts);
		if(num == 4) num = 0;
		else num++;
	});
	$(".reset").mousedown(function() {
		$(this).css("box-shadow", "0 0 5px #E12");
		console.log("a");
	});
	$(".reset").mouseup(function() {
		$(this).css("box-shadow", "");
	});
});

function createNewRow() {
	$("#title tbody").append('<tr class = "Num' + num + '"></tr>');
	$(".Num" + num).append('<th scope = "row">' + (num + 1) + '</th>');
	$(".Num" + num).append('<td class = "score"></td>');
	$(".Num" + num).append('<td class = "x"></td>');
	$(".Num" + num).append('<td class = "y"></td>');
	$(".Num" + num).append('<td class = "r"></td>');
	$(".Num" + num).append('<td class = "degree"></td>');
	$(".Num" + num).append('<td><div class = "reset">Reset</div></td>');
	resetEvent(num);
}

function addDataInTable() {
	let x = darts[num].x, y = -darts[num].y;
	let r = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
	let s = 0;
	for(let i = 0; i < ss.length; i++) {
		if(Math.abs(r) <= ss[i]) s++;
		else break;
	}
	let d = Math.atan2(y, x) / Math.PI * 180;
	if(d < 0) d += 360;
	$(".Num" + num + " .score").text(s);
	$(".Num" + num + " .x").text((x * 100).toFixed(2) + "%");
	$(".Num" + num + " .y").text((y * 100).toFixed(2) + "%");
	$(".Num" + num + " .r").text((r * 100).toFixed(2) + "%");
	$(".Num" + num + " .degree").text(d.toFixed(2));
}

function resetEvent(i) {
	$(".Num" + num + " .reset").mousedown(function() {
		$(this).css("box-shadow", "0 0 10px #E12");
	});
	$(".Num" + num + " .reset").mouseup(function() {
		$(this).css("box-shadow", "");
		if(num != i) {
			num = i;
			darts[num].dart = null;
			$("#n" + num).remove();
			$(".Num" + num + " .score").text("");
			$(".Num" + num + " .x").text("");
			$(".Num" + num + " .y").text("");
			$(".Num" + num + " .r").text("");
			$(".Num" + num + " .degree").text("");
			console.log(i);
		}
	});
	$(".Num" + num + " .reset").mouseleave(function() {
		$(this).css("box-shadow", "");
	});
}