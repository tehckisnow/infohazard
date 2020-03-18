//Objective: 
//  Write a "nestable" (recursive?) menu system for my game engine that is not 
//    super dumb.

//conventions:
  //!  <-- indicates a point I am particularly interested in your perspective on
  //...  <-- lots of stuff you are probably even less interested in

  /*
//-----------
main menu:
  -new game:
  -load:
  -settings:
  -quit:
//-----------
expanded;

main menu:
  -new game:
    character select menu:
      -Jimmy:
      -The Furries:
        battle:
          -fight:
          -spell:
            magic missile
            heal
            bedazzle
          -item:
            potion
            megapotion
            lousypotion
          -run:
  -load:
    save game 1
    save game 2
    save game 3
  -settings:
    audio:
      -volume:
        ...
      -sfx:
        ...
    video:
      -resolution:
        ...
      ....
  -quit:
    yes
    no


  */

//Unsafe Assumptions:
//  -A menu is a data structure (as opposed to- ?)
//  -menus are 1-dimensional(for now)

//-------------------------------
//menu system

const engine2 = {
  
  //...

  //menu system
  menu: {

    theme: {
      default: {
        //x, y, height, width, bgColor, border, borderColor, font, fontSize, fontColor, leftMargin, topMargin, verticalSpacing, headerSpace, lines, characterWidth
      },
    },//engine2.menu.theme

    //menu manager "constructor"
    newManager: function(){
      let manager = {
        //container for active menus
        menus: [],
        //menu "constructor"
        newTheme: function(...args){engine2.menu.newTheme(...args)},
        newMenu: function(...args){
          let menu = engine2.menu.newMenu(...args);
          manager.menus.push(menu);
          return menu;
        },
        //manager.open() etc. called by input system
        //  and acts on manager.menus[manager.menus.length - 1]
        open: function(){
          engine2.menu.open(manager.menus[manager.menus.length - 1]);
        },
        close: function(){
          engine2.menu.close(manager.menus[manager.menus.length - 1]);
        },
        next: function(){
          engine2.menu.next(manager.menus[manager.menus.length - 1]);
        },
        prev: function(){
          engine2.menu.prev(manager.menus[manager.menus.length - 1]);
        },
        select: function(){
          engine2.menu.select(manager.menus[manager.menus.length - 1]);
        },

        //manager.update() called by main game loop
        update: function(){
          for(let m in manager.menus){
            engine2.menu.draw(manager.menus[m]);
          };
        },//manager.update()
      };//manager
      return manager;
    },//engine2.menu.newManager()

    newMenu: function(heading, options, theme, themeMods){
      let menu = {
        heading: heading,
        options: [],
        currentOption: 0,
        theme: {},
      };//menu
      for(let t in themeMods){
        //themeMods[t] overrides menu.theme
      };
      //calculate option positions and call option constructor
      //...
      return menu;
    },//engine2.menu.newMenu()
    newOption: function(xOffset, yOffset, text, effect){
      let option = {
        x: xOffset || 0,
        y: yOffset || 0,
        text: text || "-missing text-",
        effect: effect || function(){},
      };
      return option;
    },//engine2.menu.newOption()
    newTheme: function(settings){
      let theme = {};
      for(let q in engine2.menu.theme.default){
        theme[q] = engine2.menu.theme.default[q];
      };
      for(let s in settings){
        theme[s] = settings[s];
      };
      return theme;
    },//engine2.menu.newTheme()
    draw: function(menu){
      //tell render system how to draw menu
      //
    },//engine2.menu.drawMenu()
    open: function(menu){
      //append menu to manager.menus
      //
    },//engine2.menu.open()
    close: function(menu){
      //remove menu from manager.menus
      //
    },//engine2.menu.close()
    //increment menu's currentOption
    next: function(menu){
      menu.currentOption++;
      if(menu.currentOption > menu.options.length -1){
        menu.currentOption = 0;
      };
    },//engine2.menu.next()
    //decrement menu's currentOption
    prev: function(menu){
      menu.currentOption--;
      if(menu.currentOption < 0){
        menu.currentOption = menu.options.length -1;
      };
    },//engine2.menu.prev()
    //call menu's currently selected option's effect method
    select: function(menu){
      menu.options[menu.currentOption].effect();
    },//engine2.menu.select()
    //tell render system to draw menu
    update: function(menu){
      engine2.menu.draw(menu);
    },//engine2.menu.close()
  },//engine2.menu

};//engine2

//---------------------------------------------
//menu system potential usage sample
let menuManager = engine2.menu.newManager();
let theme1 = menuManager.newTheme({width: 300});
let mainMenu = menuManager.newMenu(
  "title!", 
  [
    {text: "new game", effect: function(){newGame()}},
    {text: "load game", effect: function(){loadGame()}},
    {text: "exit", effect: function(){quit()}},
  ], 
  theme1, {x: 20, y: 40});

//when the "up" key is pressed, call menuManager.prev();
//can alternatively call mainMenu.prev();

//-------------------------------------------
//OPTIONAL- if the above doesn't make sense, or if you have too much free time

  //context:
//  high level overview of current engine's structure 
//    (very open to criticism on any of this as well)

//issues:
//  including references to engine methods causes 
//
//  dependency on other systems (render, textbox)
//  repeated code
//  method property hints are obfuscated due to intermediary method
//------------------------------------------

//pattern
/* 

const staticObject = {

  topic1: {
    topic1Constructor: function(){
      let container = {
        things: [],
        thing: function(){},//container.thing()
        update: function(){
          for(let i in container.things){
            //do stuff to container.things[i];
          };
        },//container.thing()
      };//container
      //set up thing
      return thing;
    },//staticObject.topic1.topic1Constructor()
  },//topic1

};//staticObject

*/


//this is only added for simplification of this demonstration, pls ignore
let debug = false;

//-engine.js
//  a simplified pseudocode description of the current paradigm of my engine
const engine = {

  //-settings used if not specified by settings passed to game object
  //must contain no objects so as to remain useful with shallow copy
  defaultSettings: {
    debug: true,
    frameRate: 10,
    //...

  },//engine.defaultSettings

  //schedule main game loop to be called on interval
  start: function(game){
    setInterval(game.frame, 1000 / game.settings.frameRate);
  },//engine.start()

  //-game "constructor" (but not a real constructor because I am not using 
  //    javascript's "class" system)
  //a game object contains game data in the form of;
  //    -scenes,
  //    -the canvas (HTML) output, and 
  //    -reference to useful engine methods for convenience //!
  newGame: function(settings){
    engine.log("building game");
    let game = {
      settings: {},
      global: {},
      scenes: [],
      activeScenes: [],
      systems: [],
      canvas: undefined,
      frame: function(){
        engine.log("Error: game.frame() not defined");
      },
      //-scene "constructor"
      //! is this bad?
      newScene: function(){
        let scene = engine.newScene();
        scene.game = game;
        scene.parent = game;
        game.scenes.push(scene);
        return scene;
      },
      //initiates main game loop
      start: function(){
        engine.start(game);
      },//game.start()
      //update game state each frame
      update: function(){
        engine.debugMsg("game.update()");
        game.frame();
        for(let s in game.activeScenes){
          game.activeScenes[s].update();
        };
      },//game.update()
    };//game
    //populate settings;
    //  -default
    for(let d in engine.defaultSettings){
      game.settings[d] = engine.defaultSettings[d];
    };
    //  -customized
    for(let s in settings){
      game.settings[s] = settings[s];
    };
    //game init and element setup,
    game.canvas = engine.newCanvas(game.settings);
    //append canvas to page if settings permit
    //...
    return game;
  },//engine.newGame()

  log: function(text){console.log("[ENGINE]: " + text)},//engine.log
  debugMsg: function(text){
    if(debug){
      engine.log(text);
    };
  },//debugMsg

  //-creates a new html canvas element and context object
  //used as game output
  newCanvas: function(settings){
    engine.log("building canvas");
    //handles HTML setup
    //...
  },//engine.newCanvas()

  //-scene "constructor"
  //  a scene is a container that holds entities and 
  //    a reference to the engine's entity "constructor"
  newScene: function(){
    engine.debugMsg("building scene");
    let scene = {
      game: undefined,
      parent: undefined,
      entities: [],
      nextId: 0,
      active: false,
      setActive: function(){
        if(!scene.active){
          scene.parent.activeScenes.push(scene);
        };
      },//scene.setActive()
      newEntity: function(...args){
        let entity = engine.newEntity(...args);
        entity.parent = scene;
        entity.id = scene.nextId++;
        scene.entities.push(entity);
        return entity;
      },//scene.newEntity()
      update: function(){
        engine.debugMsg("scene.update()");
        //iterate through all active systems in system order
        //engine.animation.update(scene.entities);
        //...

      },//scene.update()
    };//scene
    return scene;
  },//engine.newScene()

  //-entity "constructor"
  newEntity: function(x, y, z){
    engine.log("building entity");
    let entity = {
      x: x || 0,
      y: y || 0,
      z: z || 0,
      id: undefined,
      parent: undefined,
      ////components: [],
      //...
      add: {
        //each component type is listed here
        render: function(type, ...args){
          let component = engine.render.new(type, ...args);
          entity.render = component;
          component.parent = entity;
          return component;
        },//entity.add.render()
        //animation()
        //collision()
        //...

      },//entity.add
    };//entity
    return entity;
  },//engine.newEntity()

  //assets
  asset: {
    image: function(file, width, height){},//engine.asset.image()
    sprite: function(file, spriteWidth, spriteHeight){},//engine.asset.sprite()
    spriteSheet: function(){},//engine.asset.spriteSheet()
    tileMap: function(){},//engine.asset.tileMap()
    audio: function(file, loop){},//engine.asset.audio()
  },//engine.asset

  //-systems;

  //  -render system
  render: {
    //component "constructor"
    new: function(type, ...args){
      engine.debugMsg("building render component");
      let component;
      //check type and call appropriate "constructor"
      switch(type){
        case "image":
          component = engine.render.image(...args);
          break;
        case "spr":
        case "sprite":
          component = engine.render.sprite(...args);
          break;
        //...
        default:
          engine.log("Error: render component type not found");
      };

      //...
      return component;
    },//engine.render.newComponent()
    image: function(file, xOffset, yOffset, width, height){
      let image = {};
      return image;
    },//engine.render.image()
    sprite: function(asset, sprite, xOffset, yOffset){
      let spr = {};
      return spr;
    },//engine.render.sprite()
    //misc rendering methods
    //...

    camera: {},//camera
    update: function(collection){
      engine.debugMsg("render.update()");
      for(let c in collection){
        //find type of item collection[c]
        //...
        //call appropriate render function
        //...

      };
    },//engine.render.update()
  },//engine.render
  
  //  -animation system
  //animation: {
    //new: function(){},//engine.animation.new()
    //update: function(){},//engine.animation.update()
  //},//engine.animation

  //  -collision system
  //  -physics system
  //  -timer system
  //  -event system
  //  -input system
  //  -UI
  //    --textbox
  //    --menu
  //    --overlay
  //    --effects
  //  -save system
  //  -audio system

  //update
  update: function(scenes){
    for(let s in scenes){
      scenes[s].update();
    };
  }//engine.update()

};//engine

//------------------------------------------

//-game.js
//sample game file

//  -init
let settings = {
  //...
};//settings

let game1 = engine.newGame(settings);
let scene1 = game1.newScene();
scene1.setActive();

//  -assets
let bg1 = engine.asset.image("bg1.png", 200, 300);
let playerSpriteAsset1 = engine.asset.spriteSheet("spr1.png", 16, 16);

//entities and adding components
let backgroundEntity1 = scene1.newEntity(0, 0, -1);
backgroundEntity1.add.render("image", bg1);

let playerEntity1 = scene1.newEntity(100, 200);
playerEntity1.add.render("sprite", playerSpriteAsset1, 0);

//  -game loop
game1.frame = function(){
  game1.update();
};//game1.frame()

//game1.start();

//------------------------------------------

