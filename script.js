let day = 0, num = 0, isReset = false, tempNum = 0;
let darts = [], dis = [];
let colors = ["pink", "orange", "blue", "cyan", "purple"], ss = [0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05, 0.015];
let dayLebel = ["2020/04/20", "2020/04/21", "2020/04/22", "2020/04/24", "2020/04/27", "2020/04/28", "2020/04/29", "2020/05/01", "2020/05/04", "2020/05/05", "2020/05/06", "2020/05/08", "2020/05/11", "2020/05/12", "2020/05/13"];

$(document).ready(function() {
	darts = Array(375);
	$("#target").click(function(event) {
		if(num < 25) {
			let w = $(this).width(), h = $(this).height();
			let x = event.pageX - $(this).position().left, y = event.pageY - $(this).position().top;
			let px = (x - 0.5 * w) / w, py = (y - 0.5 * h) / h;
			let r = Math.pow(px * px + py * py, 0.5);
			if(r > 0.45) {
				px *= 0.5 / r;
				py *= 0.5 / r;
			}

			let dart = document.createElement("div");
			let dartId = day * 25 + num;
			$("#dartContainer").append(dart);
			dart.className = "dart";
			dart.id = "n" + dartId;
			dart.innerHTML = "x";
			$("#n" + dartId).css("position", "absolute");
			$("#n" + dartId).css("left", (x - 13) / w * 100 + "%");
			$("#n" + dartId).css("top", (y - 40) / h * 100 + "%");
			$("#n" + dartId).css("color", colors[Math.floor(num / 5)]);
			if(!isReset) createNewRow(dartId);
			darts[dartId] = {x: px, y: py, dart: dart};
			addDataInTable(dartId);
			statistics();
			if(isReset) num = tempNum;
			else num++;
			isReset = false;
		}
	});
	$("#preDay").click(function() {
		if(day > 0 && !isReset) {
			day--;
			settingTable();
		}
	});
	$("#nextDay").click(function() {
		if(day < 14 && !isReset) {
			day++;
			settingTable();
		}
	});
	$("#download").click(function() {
		let isFilled = true;
		for(let i = day * 25; i < (day + 1) * 25; i++) {
			if(darts[i] == null) {
				isFilled = false;
				break;
			}
		}
		if(isFilled) generateFile();
	});
});

function settingTable() {
	num = 0;
	$("#dartContainer").empty();
	$("#title tbody").empty();
	$("#dayDisplay").text(dayLebel[day]);
	for(let i = day * 25; i < (day + 1) * 25; i++) {
		if(darts[i] == null) break;
		$("#dartContainer").append(darts[i].dart)
		createNewRow(i);
		addDataInTable(i);
		num++;
	}
	statistics();
}

function createNewRow(i) {
	$("#title tbody").append('<tr id = "Num' + i + '"></tr>');
	$("#Num" + i).append('<th scope="row">' + (i + 1) + '</th>');
	$("#Num" + i).append('<td class = "score"></td>');
	$("#Num" + i).append('<td class = "x"></td>');
	$("#Num" + i).append('<td class = "y"></td>');
	$("#Num" + i).append('<td class = "r"></td>');
	$("#Num" + i).append('<td class = "degree"></td>');
	$("#Num" + i).append('<td><div class = "reset button">Reset</div></td>');
	resetEvent(i);
}

function addDataInTable(i) {
	let result = calculate(darts[i].x, -darts[i].y);
	$("#Num" + i + " .score").text(result.s);
	$("#Num" + i + " .x").text(result.x + "%");
	$("#Num" + i + " .y").text(result.y + "%");
	$("#Num" + i + " .r").text(result.r + "%");
	$("#Num" + i + " .degree").text(result.d);
}

function resetEvent(i) {
	$("#Num" + i + " .reset").mousedown(function() {
		$(this).css("box-shadow", "0 0 10px #E12");
	});
	$("#Num" + i + " .reset").mouseup(function() {
		if(!isReset) {
			isReset = true;
			tempNum = num;
			num = i % 25;
			$(this).css("box-shadow", "");
			darts[i] = null;
			$("#n" + i).remove();
			$("#Num" + i + " .score").text("");
			$("#Num" + i + " .x").text("");
			$("#Num" + i + " .y").text("");
			$("#Num" + i + " .r").text("");
			$("#Num" + i + " .degree").text("");
		}
	});
	$("#Num" + i + " .reset").mouseleave(function() {
		$(this).css("box-shadow", "");
	});
}
