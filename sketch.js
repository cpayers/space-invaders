var p;
var e = [];
var drops;
var enemyLeft;
var boss;

function setup() {
    createCanvas (600, 600);
    p = new Player();
    drops = new Drop;
    for(var i = 0; i < 13; i++){
        e[i] = new Enemy(i*40 + 40, 40);
    }
    enemyLeft = e.length;
    boss = new Boss();
}

window.setup = setup;

function draw() {
    background(0);
    p.drawPlayer();
    p.movePlayer();
    drops.drawDrop();
    drops.fireDrop();
    boss.drawBoss();
    boss.moveBoss();
    boss.fireWeapon();
    for(var i = 0; i < 13; i++) {
        e[i].moveEnemy();
        e[i].drawEnemy();
        e[i].playerHit();
    }
    endGame();
    checkDropHitEnemy();
    textSize(12);
    fill(255);
    text("Enemy Left: " +enemyLeft, 510, 585);
    winGame();   
}

function Player() {
        this.x = 275;
        this.y = 550;
        this.w = 50;
        this.h = 20;
        this.playerHit = false;
        
        this.drawPlayer = function(){
            fill(0, 0, 255);
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
    this.speedX = 3;
    this.beenHit = false;
    
    this.drawEnemy = function(){
        if(this.beenHit == false){
        fill(0, 255, 0);
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
           text("GAME OVER MAN", 175, 250);
           
       }
   }

function Drop(){
    this.x = p.x + p.w/2;
    this.y = p.y;
    this.r = 30;
    this.fired = false;

    this.drawDrop = function(){
        this.x = p.x + p.w/2;
        fill(255, 255, 0);
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
        if(p.playerHit == false){
        if(e[i].beenHit == false){
        if(drops.x > e[i].x - e[i].r/2 && drops.x < e[i].x + e[i].r/2 && drops.y > e[i].y - e[i].r/2 && drops.y < e[i].y + e[i].r/2){
            e[i].beenHit = true;
            drops.fired = false;
            enemyLeft--;
        }
    }
}
}
}

function winGame(){
    if(enemyLeft == 0){
    background(0, 255, 0);
    p.x = 255;
    fill(255);
    noStroke();
    textSize(32);
    text("You've Won, Bitch!", 180, 250);
}
}

function Boss(){
    this.x = 275;
    this.y = 0;
    this.w = 50;
    this.h = 20;
    this.wX = this.x + this.w/2;
    this.wY = this.y + this.h;
    this.wR = 15;
    this.wSpeed = 10;
    
    this.drawBoss = function(){
        fill(255, 0, 0);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
        ellipse(this.wX, this.wY, this.wR, this.wR);
    }
    
    this.moveBoss = function(){
        if(this.x + this.w/2 < p.x + p.w/2){
            this.x += 4;
        }
        if(this.x + this.w/2 > p.x + p.w/2){
            this.x -= 4;
    }
        this.wX = this.x + this.w/2;

    this.fireWeapon = function(){
        this.wY += 7;
        if(this.wY > height){
            this.wY = this.y;
        }
    }
        
        if(this.wX > p.x && this.wX < p.x + p.w && this.wY > p.y && this.wY < p.y + p.h){
            p.playerHit = true;
            this.wSpeed = 0;
        }
    }
    
}

