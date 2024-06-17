import { Engine, FadeInOut } from "excalibur";
import { welcomeScene } from "./scenes/welcomeScene";
import { loader } from "./resources";
import { historyScene } from "./scenes/historyScene";
import { gamificationScene } from "./scenes/gamificationScene";
import { expoScene } from "./scenes/expoScene";
import { caseScene }  from "./scenes/caseScene";


const game = new Engine({
  width: 1200,
  height: 800,
  canvasElementId: "jogo",
  // Otimização
  pixelArt: true
})

game.addScene("welcomeScene", new welcomeScene())
game.addScene("Historia", new historyScene())
game.addScene("Gamification", new gamificationScene())
game.addScene("Exposicao", new expoScene())
game.addScene("Case", new caseScene())

game.start(loader).then(() => {
  game.goToScene("Exposicao", {
    sourceOut: new FadeInOut({ duration: 1000 })
  })
})

