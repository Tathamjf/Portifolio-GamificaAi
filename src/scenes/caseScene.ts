import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Sprite, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    private objetoInteracao: any
    private elementoTexto?: HTMLElement
    private actorFuncionario?: Actor
    private listaImagens?: Sprite[]

    private textoDaCena: string = ""

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    fadeOutElement(elementoTexto: HTMLElement) {
        let opacidade = parseFloat(elementoTexto.style.opacity)

        setInterval(() => {
            if (opacidade > 0) {
                opacidade = opacidade - 0.01
                elementoTexto.style.opacity = opacidade.toString()
            }
        }, 10)
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        // Conteudo dos cases
        this.elementoTexto = document.createElement("div") as HTMLElement
        this.elementoTexto.classList.add("texto-case")

        let containerGame = document.querySelector(".container-game") as HTMLAreaElement
        containerGame.appendChild(this.elementoTexto)

        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.R) {
                this.fadeOutElement(this.elementoTexto!)
                this.engine.goToScene("Exposicao")
            }
        })

        // Criar Actor para as imagens
        this.actorFuncionario = new Actor ({
            pos: vec(engine.drawWidth - 280, engine.halfCanvasWidth - 350)
        })

        // Carregar imagens
        let imagemFuncionarioA = Resources.NpcA.toSprite()
        let imagemFuncionarioB = Resources.NpcB.toSprite()
        let imagemFuncionarioC = Resources.NpcC.toSprite()

        this.listaImagens = [imagemFuncionarioA, imagemFuncionarioB, imagemFuncionarioC]
    }

    onActivate(context: SceneActivationContext<unknown>): void {
        // Pegar dados vindos da cena passada
        this.objetoInteracao = context.data
        this.elementoTexto!.style.opacity = "1"

        // Se for a mesa A
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_a") {
            this.textoDaCena = "Essa é a descrição do case a"

            this.elementoTexto!.innerHTML = `<h2>XYZ Tech</h2>
            <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores, usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente, desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`
           
        // Inserir o sprite do Actor
        this.actorFuncionario?.graphics.add(this.listaImagens![0])

        // Mudar o zoom da imagem
        this.actorFuncionario!.graphics.current!.scale = vec(1.9, 1.9)
        

        }

        if (this.objetoInteracao.nomeDoActor == "mesa_stand_b") {
            this.textoDaCena = "Essa é a descrição do case b"

            this.elementoTexto!.innerHTML = `<h2>ABC Finance</h2>
            <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores, usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`
       
            this.actorFuncionario?.graphics.add(this.listaImagens![1])
            this.actorFuncionario!.graphics.current!.scale = vec(1.9, 1.9)

        }

        if (this.objetoInteracao.nomeDoActor == "mesa_stand_c") {
            this.textoDaCena = "Essa é a descrição do case c"
       
            this.elementoTexto!.innerHTML = `<h2>FastMart</h2>
            <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores, usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`

            this.actorFuncionario?.graphics.add(this.listaImagens![2])
            this.actorFuncionario!.graphics.current!.scale = vec(1.9, 1.9)
        }

        this.add(this.actorFuncionario!)

    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.elementoTexto!.style.opacity = "0"
    }
}
