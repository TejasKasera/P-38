//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock;
var feed;
var addFood;
var play;
var playInPark;
var sleep;
var wash;


function preload()
{
  //load images here
  dogImg = loadImage("images/Garden.png");
  playing = loadImage("images/runningLeft.png");
  washing = loadImage("images/Wash Room.png");
  playingInPark = loadImage("images/playDog.jpg");
  sleeping = loadImage("images/Bed Room.png");
}

function setup() {
  createCanvas(550, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(260,325,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  feed=createButton("Feed the dog");
  feed.position(400,125);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(570,125);
  addFood.mousePressed(addFoods);

  wash=createButton("I want to take bath");
  wash.position(400,175);
  wash.mousePressed(bathroom);

  play=createButton("Let's play");
  play.position(740,125);
  play.mousePressed(playroom);


  playInPark=createButton("Let's play in park");
  playInPark.position(570,170);
  playInPark.mousePressed(parkroom);

  sleep=createButton("I am very sleepy");
  sleep.position(740,170);
  sleep.mousePressed(sleeproom);

}


function draw() {  
  background("green");
  if(foodS!== undefined){
    textSize(20);    
    fill("darkBlack");    
    text("Long Press up arrow key to feed your pet Dog Muku", 50,50);
    text("I am your Puppy Muku I am Hungry ", 120,180);
    text("Milk Bottles Remaining: "+ foodS, 150,480);


    drawSprites();
  }
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val();
}




//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



function bathroom(){
   dog.addImage(washing);
}


function playroom(){
  dog.addImage(playing);
}


function parkroom(){
  dog.addImage(playingInPark);
}

function sleeproom(){
  dog.addImage(sleeping);
}




//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
