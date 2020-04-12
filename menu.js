
let engine = {

  //
  defaultSettings: {
    width: 200,
    height: 150,
  },

  newGame: function(settings){
    let game = {

    };
    //assign default settings template
    game.settings = Object.assign({}, engine.defaultSettings);
    //assign custom settings from settings object
    Object.assign(game.settings, settings);
    return game;
  },//engine.newGame()

  shallowCopy: function(obj){

  },//engine.shallowCopy

  menu: {
    defaultTheme: {},

    newManager: function(defaultTheme){
      let manager = {
        theme: defaultTheme || engine.menu.defaultTheme,
        menus: [],

        update: function(){},//manager.update(),
      };//manager

      return manager
    },//engine.menu.newManager()

    newTheme: function(settings){},//engine.menu.newTheme()

    newMenu: function(options, effects, heading, theme, themeMods, callbackFunct){},//engine.menu.newMenu()

  },//engine.menu

};//engine

let settings = {
  width: 3000
};
let game = engine.newGame(settings);

let gameDefaultMenuTheme = engine.menu.newTheme({});
let mainMenuTheme = engine.menu.newTheme();
let mainMenu = engine.menu.newMenu();
