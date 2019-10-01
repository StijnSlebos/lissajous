var lissajous;
var imageOffset, imageSquare, imageCenter;
var blocks = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(60);
	noStroke();
	imageSquare = min(windowHeight, windowWidth);
	imageOffset = imageSquare * 0.2; //pixels
	imageCenter = createVector(windowWidth/2, windowHeight/2);

	for(var i = 0; i< 5; i++){
		blocks[i] = [];
		for(var j = 0; j< 5; j++){
			blocks[i][j] = new Block(i+1,j+1);
		}
	}


	lissajous = new shape();
}


function draw() {
background(30,30,100,10);
lissajous.update();

noStroke();
lissajous.drawshape();
stroke(1);
for(var i = 0; i< 5; i++){
	for(var j = 0; j< 5; j++){
		blocks[i][j].update();
		blocks[i][j].drawBlock();
	}
}

for(var i = 0; i< 5; i++){
	for(var j = 0; j< 5; j++){
		if(blocks[i][j].isInBlock(mouseX, mouseY)){
			if(lissajous.alpha.x != i+1 || lissajous.alpha.y != j+1){
				background(30,30,100);
				lissajous.alpha.x = i+1;
				lissajous.alpha.y = j+1;
			}
			break;
		}
	}
}
}

function mousePressed(){
}

function shape(){
this.position = createVector(1,0);
this.alpha = createVector(1,1);
this.pixelPosition = createVector(0,0);
this.time = 0;
}

shape.prototype.drawshape = function(){
	fill(255);
	ellipse(this.pixelPosition.x, this.pixelPosition.y, 15,15);
}

shape.prototype.update = function(){
this.position.x = sin(this.alpha.x * this.time);
this.position.y = cos(this.alpha.y * this.time);
	
this.pixelPosition.x = map(this.position.x, -1, 1, imageCenter.x-imageSquare/2+imageOffset, imageCenter.x+imageSquare/2-imageOffset);
this.pixelPosition.y = map(this.position.y, -1, 1,  imageCenter.y-imageSquare/2+imageOffset, imageCenter.y+imageSquare/2-imageOffset);

this.time += 0.02;
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	imageSquare = min(windowHeight, windowWidth);
	imageOffset = imageSquare * 0.2; //pixels
	imageCenter = createVector(windowWidth/2, windowHeight/2);

}

function Block(x,y){
this.x = x;
this.y = y;
this.position = createVector(x,y);
this.blockSize = createVector(windowWidth/5,windowHeight/5);
this.pixelPosition = createVector((x-1)*this.blockSize.x, (y-1)*this.blockSize.y);

}

Block.prototype.drawBlock = function(){
	line(this.pixelPosition.x, this.pixelPosition.y,this.pixelPosition.x+this.blockSize.x, this.pixelPosition.y);
	line(this.pixelPosition.x, this.pixelPosition.y,this.pixelPosition.x, this.pixelPosition.y + this.blockSize.y);
	line(this.pixelPosition.x+this.blockSize.x, this.pixelPosition.y,this.pixelPosition.x+this.blockSize.x, this.pixelPosition.y + this.blockSize.y);
	line(this.pixelPosition.x, this.pixelPosition.y+this.blockSize.y,this.pixelPosition.x+this.blockSize.x, this.pixelPosition.y + this.blockSize.y);
}

Block.prototype.update = function(){
this.blockSize = createVector(windowWidth/5,windowHeight/5);
this.pixelPosition = createVector((this.x-1)*this.blockSize.x, (this.y-1)*this.blockSize.y);
}

Block.prototype.isInBlock = function(x,y){

if(x > this.pixelPosition.x && x < this.pixelPosition.x + this.blockSize.x && y > this.pixelPosition.y && y < this.pixelPosition.y + this.blockSize.y ){
	return true;
}else return false;

}







