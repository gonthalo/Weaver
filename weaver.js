var lienzo = document.getElementById("lienzo");
var pluma = lienzo.getContext("2d");
var a = 5;
var b = 5;
var matrix = [];
var cola = [];
var colb = [];
var sola = [];
var solb = [];

function prod(lis, k){
	for (var ii=0; ii<3; ii++){
		lis[ii] = parseInt(lis[ii]*k);
	}
	return lis;
}

function randcol(){
	return [parseInt(Math.random()*4)*85, parseInt(Math.random()*4)*85, parseInt(Math.random()*4)*85];
}

function rgbstr(lis){
	return "rgb(" + lis[0] + "," + lis[1] + "," + lis[2] + ")";
}

function pix(p, q, c){
	pluma.fillStyle = c;
	pluma.fillRect(p, q, 2, 1);
}

function rese(){
	for (var ii=0; ii<a; ii++){
		matrix[ii]=[];
		for (var jj=0; jj<b; jj++){
			matrix[ii][jj] = false;
		}
	}
}

function rhomb(cx, cy, d, lis){
	pluma.fillStyle = rgbstr(lis);
	for (var ii=0; ii<=d; ii++){
		pluma.fillRect(cx + d - ii, cy + ii, 1, 1);
		pluma.fillRect(cx - ii, cy + d - ii, 1, 1);
		pluma.fillRect(cx + ii, cy - d + ii, 1, 1);
		pluma.fillRect(cx - d + ii, cy - ii, 1, 1);
	}
}

function rhombit(cx, cy, d, lis){
	for (var tt=0; tt<6; tt++){
		rhomb(cx, cy, d - tt, prod([lis[0], lis[1], lis[2]], (tt*(32 - 3*tt))/85));
	}
	for (var tt=0; tt<25; tt++){
		rhomb(cx, cy, tt, lis);
	}
}

function resetcol(){
	for (var ii=0; ii<a; ii++){
		cola[ii] = randcol();
		rhombit(50*(b + ii + 2), 50*(ii + 1), 30, cola[ii]);
	}
	for (var ii=0; ii<b; ii++){
		colb[ii] = randcol();
		rhombit(50*(b - ii), 50*(ii + 1), 30, colb[ii]);
	}
}

function resetsol(){
	solb = [];
	sola = [];
	for (var jj=0; jj<b; jj++){
		solb[jj] = jj;
	}
	for (var ii=0; ii<a; ii++){
		var c = b + ii;
		for (var jj=0; jj<b; jj++){
			if (Math.random()*2 > 1){
				var aux = c;
				c = solb[jj];
				solb[jj] = aux;
			}
		}
		sola[ii] = c;
	}
	console.log(sola, solb);
	var color1 = [];
	for (var ii=0; ii<a; ii++){
		if (sola[ii] < b){
			color1 = colb[sola[ii]];
		} else {
			color1 = cola[sola[ii] - b];
		}
		rhombit(50*(ii + 1), 50*(b + ii + 2), 30, color1);
	}
	for (var ii=0; ii<b; ii++){
		if (solb[ii] < b){
			color1 = colb[solb[ii]];
		} else {
			color1 = cola[solb[ii] - b];
		}
		rhombit(50*(b + a - ii + 1), 50*(a + ii + 2), 30, color1);
	}
}

function eq(l1, l2){
	if (l1.length!=l2.length){
		return false;
	}
	for (var ii=0; ii<l1.length; ii++){
		if (l1[ii]!=l2[ii]){
			return false;
		}
	}
	return true;
}
function draw(){
	var checkwin = true;
	var lis = [];
	for (var ii=0; ii<b; ii++){
		lis[ii]=colb[ii];
	}
	for (var ii=0; ii<a; ii++){
		c = cola[ii];
		for (var jj=0; jj<b; jj++){
			if (matrix[ii][jj]){
				twista(50*(b + ii - jj), 50*(1 + ii + jj), lis[jj][0], lis[jj][1], lis[jj][2]);
				twysta(50*(b + ii - jj), 50*(1 + ii + jj), c[0], c[1], c[2]);
				for (var kk=20; kk<80; kk++){
					pix(50*(1 + b + ii - jj), 50*(1 + ii + jj) + kk, [0,0,0]);
				}
				var aux = c;
				c = lis[jj];
				lis[jj] = aux;
			} else {
				if ((ii + jj)%2){
					tira(50*(b + ii - jj), 50*(1 + ii + jj), c[0], c[1], c[2], 50);
					tirb(50*(b + ii - jj), 50*(1 + ii + jj), lis[jj][0], lis[jj][1], lis[jj][2], 50);
				} else {
					tirb(50*(b + ii - jj), 50*(1 + ii + jj), lis[jj][0], lis[jj][1], lis[jj][2], 50);
					tira(50*(b + ii - jj), 50*(1 + ii + jj), c[0], c[1], c[2], 50);
				}
			}
		}
		if (checkwin){
			if (sola[ii] < b){
				if (!eq(colb[sola[ii]], c)){
					checkwin = false;
				}
			} else {
				if (!eq(cola[sola[ii] - b], c)){
					checkwin = false;
				}
			}
		}
	}
	if (checkwin){
		for (var ii=0; ii<b; ii++){
			if (solb[ii] < b){
				if (!eq(colb[solb[ii]], lis[ii])){
					checkwin = false;
				}
			} else {
				if (!eq(cola[solb[ii] - b], lis[ii])){
					checkwin = false;
				}
			}
		}
	}
	if (checkwin){
		console.log("You win. Yay!");
		pluma.font = "50px Times";
		pluma.strokeText("Victoria", 10, 60);
	}
}

function tira(x0, y0, r, g, b, leng){
	for (var jj=0; jj<leng; jj++){
		for (var ii=0; ii<6; ii++){
			pix(x0 + 60 + ii - jj, y0 + jj + ii + 10, rgbstr(prod([r, g, b], (ii*(32 - 3*ii))/85)));
		}
		for (var ii=6; ii<24; ii++){
			pix(x0 + 60 + ii - jj, y0 + jj + ii + 10, rgbstr([r, g, b]));
		}
		for (var ii=0; ii<6; ii++){
			pix(x0 + 84 + ii - jj, y0 + jj + 34 + ii, rgbstr(prod([r, g, b], 1 - (((3*ii + 1)*(3*ii + 1) - 1)/255))));
		}
	}
}

function tirb(x0, y0, r, g, b, leng){
	for (var jj=0; jj<leng; jj++){
		for (var ii=0; ii<6; ii++){
			pix(x0 + 40 - ii + jj, y0 + jj + ii + 10, rgbstr(prod([r, g, b], (ii*(32 - 3*ii))/85)));
		}
		for (var ii=6; ii<24; ii++){
			pix(x0 + 40 - ii + jj, y0 + jj + ii + 10, rgbstr([r, g, b]));
		}
		for (var ii=0; ii<6; ii++){
			pix(x0 + 16 - ii + jj, y0 + jj + 34 + ii, rgbstr(prod([r, g, b], 1 - (((3*ii + 1)*(3*ii + 1) - 1)/255))));
		}
	}
}

function twista(x0, y0, r, g, b){
	for (var jj=0; jj<40; jj++){
		for (var ii=0; ii<6; ii++){
			if (ii > jj - 10){
				pix(x0 + 40 - ii + jj, y0 + jj + ii + 10, rgbstr(prod([r, g, b], (ii*(32 - 3*ii))/85)));
			}
		}
		for (var ii=6; ii<24; ii++){
			if (ii > jj - 10){
				pix(x0 + 40 - ii + jj, y0 + jj + ii + 10, rgbstr([r, g, b]));
			}
		}
		for (var ii=24; ii<30; ii++){
			if (ii > jj - 10){
				pix(x0 + 40 - ii + jj, y0 + jj + ii + 10, rgbstr(prod([r, g, b], 1 - (((3*(ii - 24) + 1)*(3*(ii - 24) + 1) - 1)/255))));
			}
		}
	}
	tira(x0 - 40, y0 + 40, r, g, b, 10);
}

function twysta(x0, y0, r, g, b){
	for (var jj=0; jj<40; jj++){
		for (var ii=0; ii<6; ii++){
			if (ii > jj - 10){
				pix(x0 + 60 + ii - jj, y0 - jj - ii + 88, rgbstr(prod([r, g, b], (ii*(32 - 3*ii))/85)));
			}
		}
		for (var ii=6; ii<24; ii++){
			if (ii > jj - 10){
				pix(x0 + 60 + ii - jj, y0 - jj - ii + 88, rgbstr([r, g, b]));
			}
		}
		for (var ii=24; ii<30; ii++){
			if (ii > jj - 10){
				pix(x0 + 60 + ii - jj, y0 - jj - ii + 88, rgbstr(prod([r, g, b], 1 - (((3*(ii - 24) + 1)*(3*(ii - 24) + 1) - 1)/255))));
			}
		}
	}
	tira(x0, y0, r, g, b, 10);
}

function twistb(x0, y0, r, g, b){
	for (var jj=0; jj<40; jj++){
		for (var ii=0; ii<6; ii++){
			if (ii > jj - 10){
				pix(x0 + 40 - ii + jj, y0 + jj + ii + 10, rgbstr(prod([r, g, b], (ii*(32 - 3*ii))/85)));
			}
		}
		for (var ii=6; ii<24; ii++){
			if (ii > jj - 10){
				pix(x0 + 40 - ii + jj, y0 + jj + ii + 10, rgbstr([r, g, b]));
			}
		}
		for (var ii=24; ii<30; ii++){
			if (ii > jj - 10){
				pix(x0 + 40 - ii + jj, y0 + jj + ii + 10, rgbstr(prod([r, g, b], 1 - (((3*(ii - 24) + 1)*(3*(ii - 24) + 1) - 1)/255))));
			}
		}
	}
	tirb(x0, y0, r, g, b, 10);
}

function change(xn, yn){
	matrix[xn][yn] = !matrix[xn][yn];
}

function ro(num){
	n = parseInt(num + 0.5);
	if ((num - n)*(num - n) <= 0.09){
		return n;
	}
	return -1;
}

lienzo.addEventListener("click", function (e){
	var x;
	var y;
	if (e.pageX || e.pageY) {
		x = e.pageX;
		y = e.pageY;
	} else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= lienzo.offsetLeft;
	y -= lienzo.offsetTop;
	console.log(x, y);
	x = x/50.0;
	y = y/50.0;
	var xx = ro((x + y - b - 3)/2);
	var yy = ro((y - x + b - 1)/2);
	console.log(xx, yy);
	if (xx>=0 && xx<a && yy>=0 && yy<b){
		change(xx, yy);
		draw();
	}
}, false);

function start(){
	matrix = [];
	cola = [];
	colb = [];
	sola = [];
	solb = [];
	rese();
	resetcol();
	resetsol();
	draw();
}

function swap(){
	a = parseInt(document.getElementById("an").value);
	b = parseInt(document.getElementById("bn").value);
	pluma.fillStyle = "white";
	pluma.fillRect(0, 0, 600, 600);
	start();
}

start();
