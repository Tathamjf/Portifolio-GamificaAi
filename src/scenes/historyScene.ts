import { Actor, Color, Engine, FadeInOut, Keys, Resource, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class historyScene extends Scene {
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
        this.backgroundColor = Color.fromRGB(64,63,76)

        // Criar elemento com a descrição da empresa
        this.elementoTexto = document.createElement("div") as HTMLElement

        // Definir a opacidade do elemento para 1 = visivel
        this.elementoTexto.style.opacity = "1"

        // Inserir elementoTexto no container-game
        let containerGame = document.querySelector(".container-game") as HTMLAreaElement
        containerGame.appendChild(this.elementoTexto)

        // Adicionar a classe da div criada (elementoTexto)
        this.elementoTexto.classList.add("sobre-gamifica")

        // Adicionar titulo e conteudo
        this.elementoTexto.innerHTML = `<h2>Sobre o GamificaAi</h2>
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`

        let actorLogo = new Actor({
            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight),
        })


        // Imagem do logo vertical
        let imagemLogoVertical = Resources.LogoVertical.toSprite()
        imagemLogoVertical.scale = vec(0.7, 0.7)

        actorLogo.graphics.add(imagemLogoVertical)

        this.add(actorLogo)

        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter, Keys.Space) {
                // Criar transição suave do elemento 
                this.fadeOutElement(this.elementoTexto!)

                engine.goToScene("Gamification", {
                    sourceOut: new FadeInOut({ duration: 1000 })
                  })
            } 
        })
    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        // Remover elemento texto da tela
        this.elementoTexto?.remove()
    }
}