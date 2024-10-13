//Move the catcher with the left and right arrow keys to catch the falling objects. 
// Doc link https://p5play.org/learn/sprite.html

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let backgroundImage,basket,apple,tree,banana,carrot,rand,start,fruitBasket, heart1, heart2, heart3, heart, emptyHeart;
let started = false;
let lives = 3;

/* PRELOAD LOADS FILES */
function preload(){
  backgroundImage = loadImage("assets/backgroundImage.png");
  basket = loadImage("assets/basket.png");
  apple = loadImage("assets/apple.png");
  tree = loadImage("assets/tree.png");
  banana = loadImage("assets/banana.png");
  carrot = loadImage("assets/carrot.png");
  fruitBasket = loadImage("assets/fruitbasket.png");
  heart = loadImage("assets/heart.png");
  emptyHeart = loadImage("assets/emptyheart.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  //homescreen set up
  background(248, 242, 224);
    textSize(23);
  text("Bin There, Done That", width/2-100,height/2 -100);
  image(fruitBasket, width/2-50,height/2 -90,100,100);

  textSize(15);
  text("Move the basket with the left and right arrow keys to \ncatch the falling items. Every time an item is missed,\n you will lose a life. Be careful, you only have 3 lives!", 25,height/2 + 50);


//start button
start = new Sprite(width/2,height/2+135);

//resize images
  backgroundImage.resize(650,0);
  basket.resize(80,0);
  apple.resize(40,0);
  tree.resize(50,0);
  banana.resize(40,0);
  carrot.resize(60,0);
  heart.resize(20,0);
  emptyHeart.resize(20,0);
  //Create catcher 
  catcher = new Sprite(basket,200,380,100,20,"k");
  catcher.visible = false;
  //create hearts
  heart1 = new Sprite(heart,332,20,50,50,"n");
  heart1.visible = false;
  heart2 = new Sprite(heart,356,20,50,50,"n");
  heart2.visible = false;
  heart3 = new Sprite(heart,380,20,50,50,"n");
  heart3.visible = false;
  //Create falling object
  fallingObject = new Sprite(tree,100,0,10);
  fallingObject.vel.y = 0;
  fallingObject.visible = false;

}

function draw() {
  start.width = 100;
  start.height = 40;
  start.collider = "k";
  start.color = color(206, 218, 237);
  start.text ="Start";
  start.textSize = 30;

  if(started == false && start.mouse.presses()){
    print("pressed");
    started = true;
    fallingObject.vel.y = 2;
    fallingObject.visible = true;
    catcher.visible = true;
    heart1.visible = true;
    heart2.visible = true;
    heart3.visible = true;

  }

  if (started&& lives !=0){
    catcherChecking();
    drawScreen1();
    drawFallingObject();
  }

  if (lives == 0){
    fallingObject.visible = false;
    catcher.visible = false;
    heart1.visible = false;
    heart2.visible = false;
    heart3.visible = false;
    background(225,225,225);
    textSize(40);
    text("Game Over!",width/2-100,100);
    textSize(25);
    text("Your score: "+score,width/2-80,300);
  }
}

function catcherChecking(){
  //move catcher
  if (kb.pressing("left")){
    catcher.vel.x = -3;
  } else if (kb.pressing("right")){
    catcher.vel.x = 3;
  } else{
    catcher.vel.x=0;
}

//stop catcher at edges of screen
  if (catcher.x < 50){
    catcher.x=50;
  }else if (catcher.x>350){
    catcher.x = 350;
  }

}
function drawFallingObject(){

  //If fallingObject reaches bottom, move back to random position at top
  if(fallingObject.y >= height){
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1,5);
     newFruit();
    if (lives == 3){
      heart1.image = emptyHeart;
    }else if (lives == 2){
      heart2.image = emptyHeart;
    }else if (lives ==1){
      heart3.image=emptyHeart;
    }
    lives--;
    if (score>=1){
          score--;
    }
  }


  //if fallingObject collides with the catcher. move back to random position at top
  if (fallingObject.collides(catcher)){
    score++;
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1,5);
    fallingObject.direction = "down";
    fallingObject.rotateTo(0,0)
     newFruit();

  }
}
function drawScreen1(){
    //draw background image
  background(200,200,200);
  image(backgroundImage,0,0);
  print("done");
  //remove homescreen elements
  start.x = -100;
  start.y= -100;
  // Draw directions to screen
  fill(0);
  textSize(12);
  text("Score: " + score,10,20);
}

function newFruit(){
  rand = random(0,4);  
  if(rand <1){
    fallingObject.image = apple;
  }else if (rand <=2){
    fallingObject.image = tree;
  } else if (rand <= 3){
    fallingObject.image = carrot;
  } else if (rand <= 4){
    fallingObject.image = banana;
  }
}