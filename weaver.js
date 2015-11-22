var lienzo = document.getElementById("lienzo");
var pluma = lienzo.getContext("2d");
var a = 5;
var b = 5;
var matrix = [];
var cola = [];
var colb = [];

function rese(){
	for (var ii=0; ii<a; ii++){
		matrix[ii]=[];
		for (var jj=0; jj<b; jj++){
			matrix[ii][jj] = false;
		}
	}
}

function resetcol(){
	for (var ii=0; ii<a; ii++){
		cola[ii] = randcol();
	}
	for (var ii=0; ii<b; ii++){
		colb[ii] = randcol();
	}
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

function draw(){
	var lis = [];
	for (var ii=0; ii<b; ii++){
		lis[ii]=colb[ii];
	}
	for (var ii=0; ii<a; ii++){
		c = cola[ii];
		for (var jj=0; jj<b; jj++){
			if (matrix[ii][jj]){

			} else {
				if ((ii + jj)%2){
					tira(50*(b + ii - jj), 50*(1 + ii + jj), c[0], c[1], c[2]);
					tirb(50*(b + ii - jj), 50*(1 + ii + jj), lis[jj][0], lis[jj][1], lis[jj][2]);
				} else {
					tirb(50*(b + ii - jj), 50*(1 + ii + jj), lis[jj][0], lis[jj][1], lis[jj][2]);
					tira(50*(b + ii - jj), 50*(1 + ii + jj), c[0], c[1], c[2]);
				}
			}
		}
	}
}

function prod(lis, k){
	for (var ii=0; ii<3; ii++){
		lis[ii] = parseInt(lis[ii]*k);
	}
	return lis;
}

function tira(x0, y0, r, g, b){
	for (var jj=0; jj<50; jj++){
		for (var ii=0; ii<6; ii++){
			pix(x0 + 60 + ii - jj, y0 + jj + ii + 10, rgbstr(prod([r, g, b], 1 - (((16 - 3*ii)*(16 - 3*ii) - 1)/255))));
		}
		for (var ii=6; ii<24; ii++){
			pix(x0 + 60 + ii - jj, y0 + jj + ii + 10, rgbstr([r, g, b]));
		}
		for (var ii=0; ii<6; ii++){
			pix(x0 + 84 + ii - jj, y0 + jj + 34 + ii, rgbstr(prod([r, g, b], 1 - (((3*ii + 1)*(3*ii + 1) - 1)/255))));
		}
	}
}

function tirb(x0, y0, r, g, b){
	for (var jj=0; jj<50; jj++){
		for (var ii=0; ii<6; ii++){
			pix(x0 + 40 - ii + jj, y0 + jj + ii + 10, rgbstr(prod([r, g, b], 1 - (((16 - 3*ii)*(16 - 3*ii) - 1)/255))));
		}
		for (var ii=6; ii<24; ii++){
			pix(x0 + 40 - ii + jj, y0 + jj + ii + 10, rgbstr([r, g, b]));
		}
		for (var ii=0; ii<6; ii++){
			pix(x0 + 16 - ii + jj, y0 + jj + 34 + ii, rgbstr(prod([r, g, b], 1 - (((3*ii + 1)*(3*ii + 1) - 1)/255))));
		}
	}
}

function start(){
	rese();
	resetcol();
	draw();
}

start();
