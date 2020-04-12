
//engine: static-style object
const engine = {  
  //settings to be used if not otherwise specified
  defaultSettings: {
    //...
  },    
  
  //New game object "constructor", container for scenes and 
  // references to engine utility functions for easy access
  newGame: function(settings){
    //create game object
    let game = {
      settings: [],
      scenes: [],
      currentScene: {},
      //create new scene and link it to game
      newScene: function(){
        //call engine's newscene constructor, append to scenes, and return
        let scene = engine.newScene();
        game.scenes.push(scene);
        scene.parent = game;
        return scene;
      },//game.newScene()
      //iterate through active scenes and call their update function
      start: function(){
        //schedule game.update to be called at interval specified in settings (framerate)
        //...
      },//game.start()
      update: function(){
        for(let s in game.scenes){
          if(game.scenes[s].active){
            game.scenes[s].update();
          };
        };
      },//game.update()
    };
    //Fill in settings and initialize
    //...
    //return game object
    return game;
  },//engine.newScene()

  //scene "constructor", a container for entities
  //engine calls updates only for entities in a currently active scene
  newScene: function(){
    //create new scene 
    let scene = {
      active: false,
      entities: [],
      //set scene active
      //set scene active; game.update() will act on it
      activate: function(){
        scene.active = true;
      },
      //set scene inactive; game.update() will not act on it
      deactivate: function(){
        scene.active = false;
      },
      //create new entity and link it to scene
      newEntity: function(...args){
        //call engine's entity constructor, append to scene, and return
        let entity = engine.newEntity(...args);
        scene.entities.push(entity);
        entity.parent = scene;    //! <--- might call this property "scene" instead, because an entity can move to new scenes.
        return entity;
      },
      update: function(){
        //iterate through active systems, calling their update function
        //...
      },
    };
    //return scene
    return scene;
  },//engine.newScene()

  //entity "constructor", a container for components and coordinates
  newEntity: function(x, y, z){
    //create new entity  
    let entity = {
      x: x || 0, y: y || 0, z: z || 0,
      components: [],  //! might not use this
      add: function(parameters){
        //identify system and call it's newComponent() function from engine
        //create reference property (e.g. entity.render = engine.render.newComponent() )  //! <---- is this bad?
        //return component
      },
    };//entity
    //return entity
    return entity;
  },//engine.newEntity()

  //Misc engine methods
  //...

  //Systems:
  //this is only an example
  genericSystem1: {
    //this system's component "constructor"
    newComponent: function(data){
      //create new component
      let component = {};
      //...
      //return component
      return component;
    },//engine.genericSystem1.newComponent()

    //Misc system methods
    //...

    update: function(collection){
      for(let c in collection){
        //Call above system method on collection[c]
      };
    },//engine.genericSystem1.update()
  },//engine.genericSystem1

  //other systems- assets, render, animation, input, collision
  //...

};//engine

//-------------
//example game file

//optionally create settings object that contains values that overrite defaults
let settings = {
  //...
};
//create game object to store data
let game1 = engine.newGame(settings);
//create first scene to store entities
let scene1 = game1.newScene();
//set scene active to allow it to update
scene1.activate();

//create assets
//  background image
let backgroundImageEntity = scene1.newEntity(0, 0, -1);
let backgroundImageAsset = backgroundImageEntity.add("imageAsset", "background1.png");
backgroundImageEntity.add("render", backgroundImageAsset.asset);
//  player entity and graphics
let player1 = scene1.newEntity(20, 300, 1);
let playerSpriteSheet = player1.add("spritesheet", "playerSpriteSheet.png", 16, 16);
player1.add("render", playerSpriteSheet.asset);
//the above line is basically the same as;
//  player.render = engine.render.newComponent(playerSpriteSheet.asset)
//  player.render.parent = player;

//...

//main game loop
game1.loop = function(){
  //this is called every frame
  //specify game-specific actions here
  //...
};//game1.loop()

//start game
game1.start();