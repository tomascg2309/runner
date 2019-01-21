import Player from '../GameObject/Player.js'
import HudManager from '../Scenario/HudManager.js'
import BackgroundManager from '../Scenario/BackgroundManager.js'
import PlatformManager from '../Scenario/PlatformManager.js'
import ObstacleManager from '../GameObject/ObstacleManager.js'
import CollectibleManager from '../GameObject/CollectibleManager.js'

class Setup {
    
    constructor(lvl,canvas) {
        this.lvl = 'lvl-'+ lvl.toString();
        this.canvas = canvas;
    }

    getEnvironment() {
        let speed;
        let goal;
        let map_size;

        switch(this.lvl) {
            case 'lvl-1': 
                speed = {x:-8,y:0}; 
                goal = 0;
                map_size = 2200;
                break;
            case 'lvl-2':
                speed = {x:-6,y:0}; 
                goal = 3;
                map_size = 2200;
                break;
            case 'lvl-3':
                speed = {x:-8,y:0}; 
                goal = 0;
                map_size = 2200;
                break;
        }

        let environment = {
            jump: false,
            gravity: {x:0,y:0.25},    
            lvl: this.lvl,
            speed: Object.assign({},speed),
            inmortality: false,
            goal: goal,
            map_size: map_size,
            playerMovesOnScreen: false,
            time: 0,
            frames: 0
        };

        return environment;
    }

    getPersistentEnvironment() {
        let persistentEnvironment = {
            best: 0 
        }

        return persistentEnvironment;
    }

    getHudManager() {
        let hud_options = {
            position: {x:0,y:0}
        }
        
        let hudManager = new HudManager(hud_options);
        
        switch(this.lvl) {
            case 'lvl-1': hudManager.addHud({id:this.lvl,image_source:'src/assets/img/screen/screen-level-1.png'}); break;
            case 'lvl-2': hudManager.addHud({id:this.lvl,image_source:'src/assets/img/screen/screen-level-2.png'}); break;
            case 'lvl-3': hudManager.addHud({id:this.lvl,image_source:'src/assets/img/screen/screen-level-3.png'}); break;
        } 

        return hudManager;
    }

    getBackgroundManager() {
        let background_options = {
            position: {x:0,y:64}
        }
        
        let backgroundManager = new BackgroundManager(background_options);
        
        switch(this.lvl) {
            case 'lvl-1': backgroundManager.addBackground({id:this.lvl,image_source:'src/assets/img/background/bg-green.png'}); break;
            case 'lvl-2': backgroundManager.addBackground({id:this.lvl,image_source:'src/assets/img/background/bg-purple.png'}); break;
            case 'lvl-3': backgroundManager.addBackground({id:this.lvl,image_source:'src/assets/img/background/bg-red.png'}); break;
        }

        return backgroundManager;
    }

    getPlatformManager() {
        let platform_initial_state = {
            position: {x:0,y:this.canvas.height-65},
            height:65,
            width:this.canvas.width
        }
        
        let platformManager = new PlatformManager(platform_initial_state);

        return platformManager;
    }

    getPlayer() {
        let player_initial_state = {
            position: {x:100,y:120}, // y: 235,
            speed: {x:0,y:0},
            acceleration: this.getEnvironment().gravity,
            gravity: this.getEnvironment().gravity,
            affectedByGravity: true,
            action: "hover",
            frame_impulse: 0,
            frame_impulse_limit: 15,
            jumps: 1,
            jump_limit: 1,
            jump_speed: -6,
            movesOnScreen: this.getEnvironment().playerMovesOnScreen,
            life: 1
        };
        
        let player = new Player (player_initial_state);
        
        player.addSkin({id:'hover',image_source:'src/assets/img/player/player-hover.png'});
        player.addSkin({id:'jump',image_source:'src/assets/img/player/player-jump.png'});

        return player;
    }

    getObstacleManager() {
        let obstacleManager = new ObstacleManager();

        // Choosing specific obstacles depending on the game level
        switch(this.lvl) {
            case 'lvl-1': 
                obstacleManager.addObstacleImage({id:'column',image_source:'src/assets/img/obstacles/column.png'});
                obstacleManager.addObstacleImage({id:'rock',image_source:'src/assets/img/obstacles/rock.png'});    
                break;
            case 'lvl-2': 
                obstacleManager.addObstacleImage({id:'column',image_source:'src/assets/img/obstacles/column.png'});
                obstacleManager.addObstacleImage({id:'rock',image_source:'src/assets/img/obstacles/rock.png'});    
                break;
            case 'lvl-3': 
                obstacleManager.addObstacleImage({id:'column',image_source:'src/assets/img/obstacles/column.png'});
                obstacleManager.addObstacleImage({id:'rock',image_source:'src/assets/img/obstacles/rock.png'});    
                break;
        }
        
        // Obstacle distribution depending on game level
        switch(this.lvl) {
            case 'lvl-1': 
                break;
            case 'lvl-2': 
                obstacleManager.addObstacleToGame({id:'rock',position:{x:500,y:250},collidable:!this.getEnvironment().inmortality});
                obstacleManager.addObstacleToGame({id:'column',position:{x:600,y:180},collidable:!this.getEnvironment().inmortality});
                obstacleManager.addObstacleToGame({id:'column',position:{x:700,y:180},collidable:!this.getEnvironment().inmortality});
                break;
            case 'lvl-3': 
                break;
        }
        
        return obstacleManager;
    }

    getCollectibleManager() {
        let collectibleManager = new CollectibleManager();

        // Choosing specific collectibles depending on the game level
        switch(this.lvl) {
            case 'lvl-1': 
                collectibleManager.addCollectibleImage({id:'clue-1',image_source:'src/assets/img/clues/clue-1.png'});
                break;
            case 'lvl-2': 
                collectibleManager.addCollectibleImage({id:'clue-2',image_source:'src/assets/img/clues/clue-2.png'});
                break;
            case 'lvl-3': 
                collectibleManager.addCollectibleImage({id:'clue-3',image_source:'src/assets/img/clues/clue-3.png'});
                break;
        }

        // Collectibles distribution depending on game level
        switch(this.lvl) {
            case 'lvl-1': break;
            case 'lvl-2': 
                collectibleManager.addCollectibleToGame({id:'clue-2',position:{x:1200,y:240},value:1});
                collectibleManager.addCollectibleToGame({id:'clue-2',position:{x:1600,y:180},value:1});
                collectibleManager.addCollectibleToGame({id:'clue-2',position:{x:2000,y:240},value:1});
                break;
            case 'lvl-3': break;
        }
        
        return collectibleManager;
    }

    getSetupConfiguration() {
        let configuration = { 
            environment: this.getEnvironment(),
            hudManager: this.getHudManager(),
            backgroundManager: this.getBackgroundManager(),
            player: this.getPlayer(),
            platformManager: this.getPlatformManager(),
            obstacleManager: this.getObstacleManager(),
            collectibleManager: this.getCollectibleManager(),
            canvas: this.canvas
        }
        return configuration;
    }
    
}

export default Setup;