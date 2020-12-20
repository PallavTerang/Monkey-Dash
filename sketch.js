var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running , monkey_stop;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var score, survivalTime;

function preload(){
  
  
  monkey_running =                  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stop = loadImage("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup(){
  
  createCanvas(600, 400);
  
  monkey = createSprite(80, 315, 10, 10);
  monkey.addAnimation("monk_key", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
  
  score = 0;
  survivalTime = 0;
  
}

function draw() {
  
  background(180);
  


  stroke("white");
  textSize(20);
  fill("white");
  text("Score : "+ score, 500, 50);
  

  
  if(gameState === PLAY){
    
    if(ground.x < 150){
      ground.x = ground.width/2;
    }
    
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = survivalTime + Math.round(frameRate()/60);
  text("Survial Time : "+ survivalTime, 100, 50);
    
    if(keyDown("space")&& monkey.y >= 310) {
        monkey.velocityY = -12;
    }
    if (FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach()
      score = score + 2;
    }
    
   
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
    
  }
  else if (gameState === END) {
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
    text("press R to reset" ,220,160);
    
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);  
     if (keyDown("r")){
       reset()
     }
    
   }
  
  
  
  monkey.collide(ground);
  
  food();
  obstacles();
  drawSprites();
}  

function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  score = 0;
  survivalTime = 0;
  
}

function food(){
  if (frameCount % 80 === 0){
    banana = createSprite(700, 400, 10, 10);
    banana.scale = 0.1;
    banana.addImage("yummy", bananaImage);
    banana.y = Math.round(random(195 , 225));
    banana.velocityX = -8;
    banana.lifetime = 85;
    
    FoodGroup.add(banana);
    
  }
}

function obstacles(){
 if (frameCount % 300 === 0){
   obstacle = createSprite(700,315,10,40);
   obstacle.velocityX = -6;
   obstacle.setCollider("circle",0,5,120);
   
   obstacle.addImage("oof", obstaceImage);
   
   obstacle.scale = 0.15;
   obstacle.lifetime = 120;
   
   obstaclesGroup.add(obstacle);
 }
}