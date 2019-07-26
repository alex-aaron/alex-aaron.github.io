var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:600,y:groundY},
                {type: 'sawblade',x:900,y:groundY - 25},
                {type: 'sawblade',x:1200,y:groundY - 75},
                {type: 'sawblade',x:1400,y:groundY - 100},
                {type: 'sawblade',x:1600,y:groundY - 50},
                {type: 'sawblade',x:1800,y:groundY- 200},
                {type: 'street-light',x:200,y:groundY},
                {type: 'street-light',x:1000,y:groundY},
                {type: 'street-light',x:1600,y:groundY}
                
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
        myObstacle.x = 400;
        myObstacle.y = 400;
        game.addGameItem(myObstacle); 
        var obstacleImage = draw.bitmap('img/sawblade.png');
        myObstacle.addChild(obstacleImage);
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        
        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle); 
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        createSawBlade(600, 350);
        createSawBlade(100, 450);
        
        for (var i=0; i<levelData.gameItems.length; i++) {
            createSawBlade(levelData.gameItems[i].x, levelData.gameItems[i].y);
        }
        
        function createAsteroid(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle); 
            var obstacleImage = draw.bitmap('img/street-light.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        createAsteroid(300, 400);
        for (var i=0; i < levelData.gameItems.length; i++) {
            if (levelData.gameItems[i].type === 'street-light') 
            createAsteroid(levelData.gameItems[i].x, levelData.gameItems[i].y);
        }
        
        var enemy =  game.createGameItem('enemy',25);
        var redSquare = draw.rect(50,50,'red');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = 400;
        enemy.y = groundY-50;
        game.addGameItem(enemy);
        enemy.velocityX = -1;
        enemy.rotationalVelocity = 10;
        
        enemy.onPlayerCollision = function () {
            game.changeIntegrity(-10);
            enemy.fadeOut();
            console.log('The enemy has hit Halle');
        }
        
        enemy.onProjectileCollision = function () {
            game.increaseScore(100);
            enemy.flyTo(0,0);
            console.log('Halle has shot enemy');
        }
        
        function createEnemy (x,y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10;
        
            enemy.onPlayerCollision = function () {
                game.changeIntegrity(-10);
                enemy.fadeOut();
                console.log('The enemy has hit Halle');
            }
            
            enemy.onProjectileCollision = function () {
                game.increaseScore(100);
                enemy.flyTo(0,0);
                console.log('Halle has shot enemy');
            }
            
        
        }
        
        createEnemy(400,groundY-10);
        createEnemy(800,groundY-100);
        createEnemy(1200,groundY-50);
        
        function createReward (x,y) {
            var enemy =  game.createGameItem('enemy',25);
            var blackSquare = draw.rect(50,50,'black');
            blackSquare.x = -25;
            blackSquare.y = -25;
            enemy.addChild(blackSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10;
        
            enemy.onPlayerCollision = function () {
                game.changeIntegrity(10);
                game.increaseScore(100);
                enemy.flyTo(100,100);
                console.log('The enemy has hit Halle');
            }
            
            
            
        }
        
        createReward(200, 400);
        createReward(400, 300);
        createReward(800, 500);
        createReward(1000,350);
    }
    
        
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}