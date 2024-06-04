import { Actor, Color, Engine, FadeInOut, Font, Keys, Label, Repeat, Scene, TextAlign, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { historyScene } from "./historyScene";

export class welcomeScene extends Scene {

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Black

        // Configura objeto para ser a fazer de Bem-vindo

        let frasebemvindo = new Label({
            text: "Bem vindo ao Portifolio",
            width: 400,
            height: 50,
            pos: vec(engine.drawWidth / 2, 300),
            font: new Font({
                color: Color.White,
                size: 40,
                textAlign: TextAlign.Center,
                family: "Anta"
            })
        })

        // Adiciona a frase na cena, tela
        this.add(frasebemvindo)

        // Configurar Actor do jogo
        let actorLogo = new Actor({
            pos: vec(engine.drawWidth / 2, 430),
        })

        // Utilizar imagem do Logo
        let imagemLogo = Resources.Logo.toSprite()

        // Aplicar zoom na imagem
        imagemLogo.scale = vec(0.4, 0.4)

        // Configurar o Actor para usar a imagem
        actorLogo.graphics.add(imagemLogo)

        // Adiciona Actor Logo na tela
        this.add(actorLogo)

        // Acionando a frase "Pressione "Enter" para iniciar..."
        let frasePressioneEnter = new Label({
            text: "Pressione \"Enter\" para iniciar...",
            width: 400,
            height: 50,
            pos: vec(engine.drawWidth / 2, 600),
            font: new Font({
                color: Color.White,
                size: 20,
                textAlign: TextAlign.Center,
                family: "Anta"
            })
        })

        this.add(frasePressioneEnter)

        frasePressioneEnter.actions.repeatForever((repeat) => {
            repeat.fade(0, 500)
            repeat.fade(1, 500)
        })

        // Monitora o evento de tecla pressionada
        this.input.keyboard.on("press", (event) => {
            // Caso a tecla pressionada for "Enter" deve ir para a próxima cena
            if (event.key == Keys.Enter, Keys.Space) {
                // Direciona para a próxima cena
                engine.goToScene("Historia", {
                    sourceOut: new FadeInOut({ duration: 1000 })
                  })
            } 
        })

    }
}