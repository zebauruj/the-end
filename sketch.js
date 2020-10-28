//Global Variables
var PLAY = 0;
var LOST = 1;
var WIN = 2;
var gameState = PLAY;
var wall;
var monkey;
var player_running;
var bananaImage, banana, bananaGroup;
var bg, bgImage;
var jungle, jungleImage;
var score = 0;
var invisible;
var stone, stoneImage, stoneGroup;

function preload() {

  bananaImage = loadImage("Banana.png");
  jungleImage = loadImage("jungle2.jpg");
  stoneImage = loadImage("stone.png");
  player_running = loadAnimation(
    "Monkey_01.png", "Monkey_02.png",
    "Monkey_03.png", "Monkey_04.png",
    "Monkey_05.png", "Monkey_06.png",
    "Monkey_07.png", "Monkey_08.png",
    "Monkey_09.png", "Monkey_10.png");
}


function setup() {
    createCanvas(displayWidth, displayHeight);

    

    monkey = createSprite(displayWidth/2-550,displayHeight/2+180, 600, 500);
    monkey.addAnimation("running", player_running);
    monkey.scale = 0.2;
    //monkey.debug=true;
    

    invisible = createSprite(displayWidth/2, displayHeight/2+200, 10000000, 20);
    invisible.scale = 0.1;
    invisible.visible = false;

    bananaGroup = createGroup();
    stoneGroup = createGroup();
    
}


function draw() {

    background(0);
    image(jungleImage,0,0,displayWidth*7,displayHeight);
    camera.position.x = monkey.x;

    if(keyWentDown(RIGHT_ARROW)){
      monkey.x+=50;
    }
  
    if (gameState === PLAY) {

          if (keyDown("space") && monkey.y >= 345) {
            monkey.velocityY = -15;
          }
      
        //spawning the bananas and the stones
        spawnBanana();
        spawnStone();
        
        for (var i = 0; i < bananaGroup.length; i++) {
          if (bananaGroup.get(i).isTouching(monkey)) {
              bananaGroup.get(i).destroy();
              score+=20; 
          }
        }

        //applying gravity to the monkey
        monkey.velocityY+=1;

        monkey.collide(invisible);

        if (stoneGroup.isTouching(monkey)) {
          score-=10;
        }
      if(score<0){
        gameState=LOST;
      }
      if(score>200){
        gameState=WIN;
      }
   }

  //losing the game
 
  //condition for losing the game
  else if (gameState === LOST) {
    textSize(30);
    fill("red");
    text("Game Over", camera.position.x - 50, 250);
    text("Reload your page to play again", camera.position.x - 250, 290);
    end();
  }

  //condition for winning the game
  if (gameState === WIN) {
    textSize(30);
    fill(255);
    text("YOU WIN!!", camera.position.x - 50, 200);
    text("Reload your page to play again", camera.position.x - 250, 250);
    end();
  }
  
  drawSprites();

  //writeing some text on the screen
  stroke("white");
  fill("black");
  textSize(25);
  text("Press right arrow to move faster", monkey.x- 100, 250);
  //displaying score
  fill("white");
  textSize(40);
  text("Score : " + score, monkey.x, 200);

}

//funciton for ending the game
function end() {
  bg.visible = false;
  monkey.visible = false;

  bananaGroup.destroyEach();
  stoneGroup.destroyEach();
}

//function for spawning bananas
function spawnBanana() {
  if (frameCount % 80 === 0) {
    banana = createSprite(monkey.x+500, 250, 600, 500);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(displayHeight/2-300,displayHeight/2+100));
    banana.scale = 0.1;
    banana.lifetime = 1000;
    banana.velocityX=-4;
    bananaGroup.add(banana);

  }
}

//function for spawning stones
function spawnStone() {
  if (frameCount % 200 === 0) {
    stone = createSprite(monkey.x+700, displayHeight/2+150);
    stone.addImage(stoneImage);
    stone.scale = 0.2;
    //stone.debug=true;
    stone.setCollider("circle",0,0,150);
    stone.lifetime = 1000;
    stone.velocityX=-4;
    stoneGroup.add(stone);
  }
}

