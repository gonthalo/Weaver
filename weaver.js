var lienzo = document.getElementById("lienzo");
var pluma = lienzo.getContext("2d");
var an = document.getElementById("an");
var bn = document.getElementById("bn");
var a = 5;
var b = 5;
an.max = a - 1;
bn.max = b - 1;
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
		pluma.fillStyle = rgbstr(cola[ii]);
		pluma.fillRect(50*(b + ii + 1), 50*(ii + 1), 50, 50);
	}
	for (var ii=0; ii<b; ii++){
		colb[ii] = randcol();
		pluma.fillStyle = rgbstr(colb[ii]);
		pluma.fillRect(50*(b - ii), 50*(ii + 1), 50, 50);
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
	}
}

function prod(lis, k){
	for (var ii=0; ii<3; ii++){
		lis[ii] = parseInt(lis[ii]*k);
	}
	return lis;
}

function tira(x0, y0, r, g, b, leng){
	for (var jj=0; jj<leng; jj++){
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

function tirb(x0, y0, r, g, b, leng){
	for (var jj=0; jj<leng; jj++){
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

function twista(x0, y0, r, g, b){
	for (var jj=0; jj<40; jj++){
		for (var ii=0; ii<6; ii++){
			if (ii > jj - 10){
				pix(x0 + 40 - ii + jj, y0 + jj + ii + 10, rgbstr(prod([r, g, b], 1 - (((16 - 3*ii)*(16 - 3*ii) - 1)/255))));
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
				pix(x0 + 60 + ii - jj, y0 - jj - ii + 88, rgbstr(prod([r, g, b], 1 - (((16 - 3*ii)*(16 - 3*ii) - 1)/255))));
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

function swap(){
	matrix[an.value][bn.value] = !matrix[an.value][bn.value];
	draw();
}

function start(){
	rese();
	resetcol();
	draw();
}

start();

