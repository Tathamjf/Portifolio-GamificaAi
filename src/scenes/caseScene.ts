import { Actor, Color, Engine, FadeInOut, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { npc } from "../actors/npc";

export class caseScene extends Scene {
    elementoTexto?: HTMLElement
    private objetoInteracao: any

    private textoDaCena: string = ""

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray
    }

    onActivate(context: SceneActivationContext<unknown>): void {
        // Pegar dados vindos da cena passada
        this.objetoInteracao = context.data
        
        console.log(this.objetoInteracao)

        // Se for a mesa A
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_a") {
            this.textoDaCena = "Essa é a descrição do case a"

        // Conteudo do case A
        this.backgroundColor = Color.fromRGB(64,63,76)
        this.elementoTexto = document.createElement("div") as HTMLElement
        this.elementoTexto.style.opacity = "1"
        let containerGame = document.querySelector(".container-game") as HTMLAreaElement
        containerGame.appendChild(this.elementoTexto)
        this.elementoTexto.classList.add("sobre-gamifica")

        this.elementoTexto.innerHTML = `<h2>Case Escola!</h2>
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram aexperiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`       
        } 
        
        let npcSprite = new Actor({
            pos: vec(this.engine.drawWidth - 300, this.engine.halfDrawHeight),
        })

        let imagemNpcA = Resources.NpcA.toSprite()
        imagemNpcA.scale = vec(1.9, 1.9)
    
        npcSprite.graphics.add(imagemNpcA)
    
        this.add(npcSprite)



        if (this.objetoInteracao.nomeDoActor == "mesa_stand_b") {
            this.textoDaCena = "Essa é a descrição do case b"
            
        }

        if (this.objetoInteracao.nomeDoActor == "mesa_stand_c") {
            this.textoDaCena = "Essa é a descrição do case c"
        }
    }
}
