//Create variables here
var dog, happyDog, database, foodLS, foodStock,foodStockref;

function preload()
{
  //load images here
  happyDog = loadImage("happydog.png");
  dog1 = loadImage("Dog1.png");
  
}

function setup() {
  createCanvas(500,500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage("normal",dog1);
  dog.scale = 0.3;

  database = firebase.database();
  
  foodStock = database.ref('Food')
  foodStock.on("value",readStock);

  /*foodEaten = database.ref('EatenFood');
  foodEaten.on("value", readStock2);*/
}


function draw() { 
  background(46, 139, 87); 

  if(keyWentDown(UP_ARROW) && foodLS !== undefined){
    dog.addImage(happyDog);
    writeStock(foodLS);
    //eatenFood(foodES);
  }

  dbreadStock();

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke("black");
  text("Note : Press Up_Arrow to feed the Dog",75,30);

  if(foodLS != undefined){
  text("Food Left to eat = "+ foodLS,100,430);
  //text("Food already eaten = " ,100,460);
   }

}
async function dbreadStock(){
  foodStockref = await database.ref('Food')
  foodStock.on("value",(data) =>{
    foodLS = data.val();
  })
  /*if(foodStockref.exists()){
    foodLS = foodStockref.val();
  }
  foodStock.once("value", (data)=>{
  foodLS = data.val();
  });*/
}
 function readStock(data){
  foodLS = data.val();
}
/*function readStock2(data){
  foodES = data.val();
}*/

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  database.ref('/').update({
    Food : x
  })
}

/*function eatenFood(x){
  if(x>=20){
    x = 20;
  }else{
    x = x+1;
  }
  database.ref('/').update({
    Food : x
  })
}*/
