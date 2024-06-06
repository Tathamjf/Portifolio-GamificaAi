import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class gamificationScene extends Scene {
    elementoTexto?: HTMLElement

    // Método para esmaecer um elemento HTML 
    fadeOutElement(elementoTexto: HTMLElement) {
        let opacidade = parseFloat(elementoTexto.style.opacity)

        // Abre portas para gambiarra!!
        // Repetir diminuição da opacidade
        setInterval(() => {

            // Se o elemento está visivel
            if (opacidade > 0) {
                // Diminuir opacidade
                opacidade = opacidade - 0.01

                // Atualizar a opacidade do elemento
                elementoTexto.style.opacity = opacidade.toString()

            }
        }, 10)

    }

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromRGB(64, 63, 76)

        this.elementoTexto = document.createElement("div") as HTMLElement
        this.elementoTexto.style.opacity = "1"

        let containerGame = document.querySelector(".container-game") as HTMLAreaElement
        containerGame.appendChild(this.elementoTexto)

        this.elementoTexto.classList.add("sobre-gamificacao")

        // Adicionar titulo e conteudo
        this.elementoTexto.innerHTML = `<h2>O que é gamificação?</h2>
        <p>Gamificação é a aplicação de elementos típicos de jogos em contextos não lúdicos, com o objetivo de engajar e motivar indivíduos a atingir determinados objetivos. Esta abordagem se utiliza de componentes como pontuação, níveis, recompensas, desafios, e feedback imediato, visando promover comportamentos desejados e aumentar a participação e o comprometimento dos participantes.</p>`
        

        let actorGamificacao = new Actor({
            pos: vec(engine.drawWidth - 930, engine.halfDrawHeight),
        })


        // Imagem do logo vertical
        let gamificacao = Resources.gamificacao.toSprite()
        gamificacao.scale = vec(0.9, 0.9)

        actorGamificacao.graphics.add(gamificacao)

        this.add(actorGamificacao)

        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter, Keys.Space) {
                // Criar transição suave do elemento 
                this.fadeOutElement(this.elementoTexto!)
            }
        })
    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        // Remover elemento texto da tela
        this.elementoTexto?.remove()
    }
}
