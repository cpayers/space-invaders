var p;
var e = [];
var drops;

function setup() {
    createCanvas (600, 600);
    p = new Player();
    drops = new Drop;
    for(var i = 0; i < 8; i++){
        e[i] = new Enemy(i*40 + 40, 40);
    }

}

window.setup = setup;

function draw() {
    background(0);
    p.drawPlayer();
    p.movePlayer();
    drops.drawDrop();
    drops.fireDrop();
    for(var i = 0; i < 8; i++) {
        e[i].moveEnemy();
        e[i].drawEnemy();
        e[i].playerHit();
    }
    endGame();
    checkDropHitEnemy();
    
}

function Player() {
        this.x = 275;
        this.y = 550;
        this.w = 50;
        this.h = 20;
        
        this.drawPlayer = function(){
            fill(255);
            noStroke();
            rect(this.x, this.y, this.w, this.h);
        }
        
    this.movePlayer = function(){
        this.x = mouseX - this.w/2;
    }
    }

function Enemy(x, y){
    this.x = x;
    this.y = y;
    this.r = 30;
    this.speedX = 6;
    this.beenHit = false;
    
    this.drawEnemy = function(){
        if(this.beenHit == false){
        fill(255, 0, 0);
        noStroke();
        ellipse(this.x, this.y, this.r, this.r);
    } // end drawEnemy
    }
    
    this.moveEnemy = function(){
        if(this.beenHit == false){
        this.x += this.speedX;
        if(this.x > width || this.x < 0){
            this.y += 40;
            this.speedX *= -1;
        }
        }
    } 
//end moveEnemy
    
    this.playerHit = function(){
        if(this.beenHit == false){
            if(this.x > p.x && this.x < p.x + p.w && this.y > p.y){
                p.playerHit = true;
                this.speedX = 0;
        }
     }
   }
}
    
   function endGame(){
       if(p.playerHit) {
           background(255, 0, 0);
           p.x = 255;
           fill(255);
           noStroke();
           textSize(32);
           text("GAME OVER MAN", 170, 250);
           
       }
   }

function Drop(){
    this.x = p.x + p.w/2;
    this.y = p.y;
    this.r = 20;
    this.fired = false;

    this.drawDrop = function(){
        this.x = p.x + p.w/2;
        fill(0, 0, 255);
        noStroke();
        ellipse(this.x, this.y, this.r, this.r);
    }
    
    this.fireDrop = function(){
        if(this.fired){
            this.y -= 20;
        }
        if(this.y < 0){
            this.fired = false;
        }
        if(this.fired == false){
            this.y = p.y;
        }
    }
}

function mousePressed(){
    drops.fired = true
}

function checkDropHitEnemy(){
    for(var i = 0; i < e.length; i++){
        if(drops.x - drops.r/2 > e[i].x - e[i].r && drops.x + drops.r/2 < e[i].x + e[i].r && drops.y - drops.r/2 > e[i].y - e[i].r && drops.y + drops.r/2 < e[i].y + e[i].r){
            e[i].beenHit = true;
            drops.fired = false;
        }
    }
}
