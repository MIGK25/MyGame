var sky, skyImg;
var plane, planeImg;
var enemy, enemyImg, enemyGroup;
var bird, birdImg;
var smoke, smokeImg;
var thunderImg;
var blastImg;
var gameState = "play";
var restart, restartImg;

function preload() {
  skyImg = loadImage("Imagees/sky2.jpg");
  planeImg = loadImage("Imagees/Plane.png");
  enemyImg = loadImage("Imagees/Plane2.png");
  birdImg = loadImage("Imagees/bird.png");
  smokeImg = loadImage("Imagees/smoke.png");
  thunderImg = loadImage("Imagees/thunder.png");
  blastImg = loadImage("Imagees/blast.png");
  restartImg = loadImage("Imagees/restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  sky = createSprite(width/2, height/2, width, height);
  sky.addImage("sky", skyImg);
  sky.scale = 4.3;

  plane = createSprite(200, 150);
  plane.addImage("plane", planeImg);
  plane.setCollider("rectangle", 0, 0, 500, 200);
  //plane.debug = true;
  plane.scale = 0.3;

  smoke = createSprite(100, 100);
  smoke.addImage("smoke", smokeImg);
  smoke.scale = 0.8;

  enemyGroup = new Group();
}

function draw() {
  background("blue");

  smoke.x = plane.x - 158;
  smoke.y = plane.y - 10;

  if(gameState === "play") {
    sky.velocityX = -7;

     //infinitely Scrolling Screen
    if(sky.x < 200) {
     sky.x = sky.width/2;
    }
  
    if(plane.y <= 85) {
      plane.y = 85;
    }

    if(plane.y >= height - 85) {
      plane.y = height - 85;
    }

    if(plane.x >= width - 135) {
      plane.x = 180;
    }

    if(keyDown(RIGHT_ARROW)) {
      plane.x += 9;
    }

    if(keyDown(UP_ARROW)) {
      plane.y -= 4;
    }

    if(keyDown(DOWN_ARROW)) {
      plane.y += 4;
    }
    Obstacles();

    if(enemyGroup.isTouching(plane)) {
      gameState = "end";

    }
  }
 
  else if(gameState === "end"){
    sky.velocityX = 0;
    plane.velocityX = 0;
    enemyGroup.setVelocityXEach(0);
    plane.addImage("blast", blastImg);
    smoke.destroy();
    restart = createSprite(width - 100, 100);
    restart.addImage("restart", restartImg);
    restart.scale = 0.4;
    
  }
  if(mousePressedOver(restart)) {
    reset();
  }
  drawSprites();
}

function Obstacles() {
  if(frameCount % 60 === 0) {
    enemy = createSprite(width - 160, 150);
    enemy.velocityX = -7;
    enemy.y = Math.round(random(50, height - 100));
    var rand = Math.round(random(1, 3));
    switch(rand) {
      case 1:  
                
                  enemy.addImage("enemy", enemyImg);
                  enemy.scale = 0.4;
                  
                  break;
  
      case 2:    
           
                  enemy.addImage("bird", birdImg);
                  enemy.scale = 0.5;
                  
                  break;
               
      case 3: 
      
                  enemy.addImage("thunder", thunderImg);
                  enemy.scale = 0.4;

                  break;

    }
    enemy.lifetime = width/7;
    enemyGroup.add(enemy);
  }
}

function reset() {
  gameState = "play";
  
  plane.changeImage("plane", planeImg);
}