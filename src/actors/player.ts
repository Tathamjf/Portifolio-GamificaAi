import { Actor, Color, Engine, Keys, vec } from "excalibur";

export class Player extends Actor {
    // Propriedades do player
    private velocidade: number = 180

    // Configuração do Player
    constructor() {
        super({
            pos: vec(600, 500),
            width: 32,
            height: 32,
            name: "Jogador",
            color: Color.Red
        })
    }

    onInitialize(engine: Engine<any>): void {
        // Configurar player para monitorar evento "hold" -> segurar tecla
        engine.input.keyboard.on("hold", (event) => {
            // Detectar qual tecla está pressionada
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                        // Mover para a esquerda
                        // Velocidade em x negativo muda a direcao para a direita
                        this.vel.x = -this.velocidade
                    break;

                case Keys.Right:
                    case Keys.D:
                        this.vel.x = this.velocidade
                    break;
                
                case Keys.Up:
                    case Keys.W:
                        this.vel.y = -this.velocidade
                    break;

                case Keys.Down:
                    case Keys.S:
                        this.vel.y = this.velocidade
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
            if(
                event.key == Keys.A ||
                event.key == Keys.Left ||
                event.key == Keys.D ||
                event.key == Keys.Right
            ) {
                // Zerar velocidade horizontal
                this.vel.x = 0
            }

            if(
                event.key == Keys.W ||
                event.key == Keys.Up ||
                event.key == Keys.S ||
                event.key == Keys.Down
            ){
                // Zerar velociade vertical
                this.vel.y = 0
            }
        })
    }
    
}