function calculate(x, y) {
	let r = Math.pow(x * x + y * y, 0.5);
	let s = 0;
	for(let i = 0; i < ss.length; i++) {
		if(Math.abs(r) <= ss[i]) s++;
		else break;
	}
	let d = Math.atan2(y, x) / Math.PI * 180;
	if(d < 0) d += 360;
	return {x: (x * 100).toFixed(2), y: (y * 100).toFixed(2), r: (r * 100).toFixed(2), s: s, d: d.toFixed(2)};
}

function statistics() {
	$("#statistics").empty();
	let x = 0, y = 0;
	for(let i = day * 25; i < (day + 1) * 25; i++) {
		if(darts[i] == null) break;
		x += darts[i].x;
		y += darts[i].y;
		if(i % 5 == 4) {
			let c = Math.floor(i / 5);
			dis[c] = {ux: x / 5, uy: y / 5};
			$("#statistics").append('<div class = "dartCenter" id = "c' + c + '"></div>');
			$("#c" + c).css("position", "absolute");
			$("#c" + c).css("left", x * 20 + 48.8 + "%");
			$("#c" + c).css("top", y * 20 + 49 + "%");
			$("#c" + c).css("background-color", colors[c - day * 5]);
			stv(c);
			x = 0;
			y = 0;
		}
	}
}

function stv(i) {
	let x = 0, y = 0;
	for(let j = i * 5; j < (i + 1) * 5; j++) {
		let a = darts[j].x - dis[i].ux;
		let b = darts[j].y - dis[i].uy;
		x += a * a;
		y += b * b;
	}
	dis[i].sx = Math.pow(x / 4 ,0.5);
	dis[i].sy = Math.pow(y / 4 ,0.5);
}

function generateFile() {
	let tx = 0, ty = 0;
	for(let i = day * 25; i < (day + 1) * 25; i++) {
		tx += darts[i].x;
		ty += darts[i].y;
	}
	let aux = tx / 25, auy = ty / 25;
	for(let i = day * 25; i < (day + 1) * 25; i++) {
		let a = darts[i].x - aux;
		let b = darts[i].y - auy;
		tx += a * a;
		ty += b * b;
	}
	let asx = Math.pow(tx / 24 ,0.5), asy = Math.pow(ty / 24 ,0.5);
	let content = ",score,x,y,r,degree\n";
	for(let i = day * 25; i < (day + 1) * 25; i++) {
		let result = calculate(darts[i].x, -darts[i].y);
		let text = (i + 1) + "," + result.s + "," + result.x + "," + result.y + "," + result.r + "," + result.d + "\n";
		if(i % 5 == 4) {
			let j = Math.floor(i / 5);
			result = calculate(dis[j].ux, -dis[j].uy);
			text += "m" + (j - day * 5 + 1) + ",," + result.x + "," + result.y + "," + result.r + "," + result.d + "\n";
			text += "s" + (j - day * 5 + 1) + ",," + (dis[j].sx * 100).toFixed(2) + "," + (dis[j].sy * 100).toFixed(2) + "\n";

		}
		content += text;
	}
	let result = calculate(aux, -auy);
	content += "mA" + ",," + result.x + "," + result.y + "," + result.r + "," + result.d + "\n";
	content += "sA" + ",," + (asx * 100).toFixed(2) + "," + (asy * 100).toFixed(2);
	let filename = $("#subject").children("input")[0].value + "-" + ($("#dayDisplay").text().replace(/\//g, "")) + ".csv";
	download(filename, content);
}

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}