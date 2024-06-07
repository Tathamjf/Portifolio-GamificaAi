import { Engine, FadeInOut, Scene } from "excalibur";
import { welcomeScene } from "./scenes/welcomeScene";
import { loader } from "./resources";
import { historyScene } from "./scenes/historyScene";
import { gamificationScene } from "./scenes/gamificationScene";
import { expoScene } from "./scenes/expoScene";


const game = new Engine({
  width: 1200,
  height: 800,
  canvasElementId: "jogo"
})

game.addScene("welcomeScene", new welcomeScene())
game.addScene("Historia", new historyScene())
game.addScene("Gamification", new gamificationScene())
game.addScene("Exposicao", new expoScene())

game.start(loader).then(() => {
  game.goToScene("Gamification", {
    sourceOut: new FadeInOut({ duration: 1000 })
  })
})

