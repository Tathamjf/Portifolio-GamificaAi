import { Actor, Animation, Collider, CollisionContact, CollisionType, Color, Engine, Keys, Side, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
    // Propriedades do player
    private velocidade: number = 180
    private ultimaDirecao: string = "down"

    private temobjetoProximo: boolean = false
    private ultimoColisor?: Collider

    // Configuração do Player
    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 30,
            height: 50,
            name: "Jogador",
            color: Color.Red,
            collisionType: CollisionType.Active
        })
    }

    onInitialize(engine: Engine<any>): void {
        // Configurar sprite do player
        const playerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 64,
                columns: 56,
                rows: 20
            },
            spacing: {
                originOffset: {
                    y: 1.5
                }
            }
        })

        // teste!!!
        let imagemPlayer = playerSpriteSheet.getSprite(3, 0)
        this.graphics.add(imagemPlayer)

        // Criar animações
        const duracaoFrameAnimacao = 70

        // Animaçóes Idle
        // Animação para a esquerda -> parada
        const leftIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(12, 1) },
                { graphic: playerSpriteSheet.getSprite(13, 1) },
                { graphic: playerSpriteSheet.getSprite(14, 1) },
                { graphic: playerSpriteSheet.getSprite(15, 1) },
                { graphic: playerSpriteSheet.getSprite(16, 1) },
                { graphic: playerSpriteSheet.getSprite(17, 1) }
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("left-idle", leftIdle)
        this.graphics.use("left-idle")


        // Animação para a direita -> parada
        const rightIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(0, 1) },
                { graphic: playerSpriteSheet.getSprite(1, 1) },
                { graphic: playerSpriteSheet.getSprite(2, 1) },
                { graphic: playerSpriteSheet.getSprite(3, 1) },
                { graphic: playerSpriteSheet.getSprite(4, 1) },
                { graphic: playerSpriteSheet.getSprite(5, 1) }
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("right-idle", rightIdle)


        // Animação para cima -> parada
        const upIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(6, 1) },
                { graphic: playerSpriteSheet.getSprite(7, 1) },
                { graphic: playerSpriteSheet.getSprite(8, 1) },
                { graphic: playerSpriteSheet.getSprite(9, 1) },
                { graphic: playerSpriteSheet.getSprite(10, 1) },
                { graphic: playerSpriteSheet.getSprite(11, 1) }
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("up-idle", upIdle)


        // Animação para baixo -> parada
        const downIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(19, 1) },
                { graphic: playerSpriteSheet.getSprite(20, 1) },
                { graphic: playerSpriteSheet.getSprite(21, 1) },
                { graphic: playerSpriteSheet.getSprite(22, 1) },
                { graphic: playerSpriteSheet.getSprite(23, 1) }
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("down-idle", downIdle)

        // Definir animação inicial do player
        this.graphics.use("down-idle")
        // Definir o zoom
        



        // Animações Walk
        // Animação para a esquerda -> Walk
        const leftWalk = new Animation({
            frames: [
                // { graphic: playerSpriteSheet.getSprite(12, 2) },
                { graphic: playerSpriteSheet.getSprite(13, 2) },
                { graphic: playerSpriteSheet.getSprite(14, 2) },
                { graphic: playerSpriteSheet.getSprite(15, 2) },
                { graphic: playerSpriteSheet.getSprite(16, 2) },
                { graphic: playerSpriteSheet.getSprite(17, 2) }
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("left-walk", leftWalk)
        this.graphics.use("left-walk")


        // Animação para a direita -> Walk
        const rightWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(0, 2) },
                { graphic: playerSpriteSheet.getSprite(1, 2) },
                { graphic: playerSpriteSheet.getSprite(2, 2) },
                { graphic: playerSpriteSheet.getSprite(3, 2) },
                { graphic: playerSpriteSheet.getSprite(4, 2) },
                { graphic: playerSpriteSheet.getSprite(5, 2) }
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("right-walk", rightWalk)


        // Animação para cima -> Walk
        const upWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(6, 2) },
                { graphic: playerSpriteSheet.getSprite(7, 2) },
                // { graphic: playerSpriteSheet.getSprite(8, 2) },
                { graphic: playerSpriteSheet.getSprite(9, 2) },
                { graphic: playerSpriteSheet.getSprite(10, 2) },
                { graphic: playerSpriteSheet.getSprite(11, 2) }
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("up-walk", upWalk)


        // Animação para baixo -> Walk
        const downWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(19, 2) },
                { graphic: playerSpriteSheet.getSprite(20, 2) },
                { graphic: playerSpriteSheet.getSprite(21, 2) },
                { graphic: playerSpriteSheet.getSprite(22, 2) },
                { graphic: playerSpriteSheet.getSprite(23, 2) }
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("down-walk", downWalk)
        


        // Configurar player para monitorar evento "hold" -> segurar tecla
        engine.input.keyboard.on("hold", (event) => {
            // Detectar qual tecla está pressionada
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    // Mover para a esquerda
                    // Velocidade em x negativo muda a direcao para a direita
                    this.vel.x = -this.velocidade

                    // Definir animação
                    this.graphics.use("left-walk")

                     // Guarda ultima direção
                    this.ultimaDirecao = "left"

                    break;
                    
                case Keys.Right:
                case Keys.D:
                    this.vel.x = this.velocidade
                    this.graphics.use("right-walk")
                    this.ultimaDirecao = "right"


                    break;

                case Keys.Up:
                case Keys.W:
                    this.vel.y = -this.velocidade
                    this.graphics.use("up-walk")
                    this.ultimaDirecao = "up"


                    break;

                case Keys.Down:
                case Keys.S:
                    this.vel.y = this.velocidade
                    this.graphics.use("down-walk")
                    this.ultimaDirecao = "down"


                    break;

                default:
                    // Zera a velocidade do player, PARA a movimentação
                    this.vel.x = 0
                    this.vel.y = 0
                    break;
            }
        })

        // Configura o player para monitorar evento "release" -> soltar
        engine.input.keyboard.on("release", (event) => {
            // Faxer o player para ao soltar as teclas de movimentação lateral/horizontal
            if (
                event.key == Keys.A ||
                event.key == Keys.Left ||
                event.key == Keys.D ||
                event.key == Keys.Right
            ) {
                // Zerar velocidade horizontal
                this.vel.x = 0
            }

            if (
                event.key == Keys.W ||
                event.key == Keys.Up ||
                event.key == Keys.S ||
                event.key == Keys.Down
            ) {
                // Zerar velociade vertical
                this.vel.y = 0
            }

            // Ao para o player, definir animacao idle da ultima direção
            if (this.vel.x == 0 && this.vel.y == 0) {
                this.graphics.use(this.ultimaDirecao + "-idle")
                this.graphics.current!

            }
        })

        // Configurar o player para mobitorar evento "press" -> pressionar
        engine.input.keyboard.on("press", (event) => {
            if (event.key == Keys.F && this.temobjetoProximo) {
                // identificar o alvo da interação
                if (this.ultimoColisor?.owner.name == "mesa_stand_a") {
                    console.log("Essa é amesa A")

                    // Vai para a cena passando qual o objeto da interação
                    engine.goToScene("Case", {
                        sceneActivationData: {
                            nomeDoActor: this.ultimoColisor?.owner.name
                        }
                    })
                }

            if (this.ultimoColisor?.owner.name == "mesa_stand_b") {
                console.log("Essa é a mesa B")

                engine.goToScene("Case", {
                    sceneActivationData: {
                        nomeDoActor: this.ultimoColisor?.owner.name
                    }
                })
            }

            if (this.ultimoColisor?.owner.name == "mesa_stand_c") {
                console.log("Essa é a mesa c")

                engine.goToScene("Case", {
                    sceneActivationData: {
                        nomeDoActor: this.ultimoColisor?.owner.name
                    }
                })
            }
            }
        })
    }

    onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        // Indicar que tem um objeto proximo
        this.temobjetoProximo = true

        // Registrar o ultim onjeto colidido
        this.ultimoColisor = other
    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
        // Detectar se o player esta distante do ultimo objeto
        if (this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos) > 40) {
            // Marcar que o objeto nao esta proximo
            this.temobjetoProximo = false

            // console.log("Está longe");
        }
    }

    // this.graphics.current!.scale = vec(0.5, 0.5)

}