import ex, { Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromRGB(64, 63, 76)
        // Carregar o Mapa
        let tiledMap = Resources.Mapa

        // Definir offset para renderizar o mapa
        let offsetx = 138
        let offsety = 100

        // Adicionar Mapa da cena
        tiledMap.addToScene(this, {
            pos: vec(offsetx, offsety)
        })

        // Definir zoom da camera da cena
        this.camera.zoom = 1.3

        // Criação e configuração do player
        let jogador = new Player()

        // Define z-index do player
        jogador.z = 4

        // Adiciona o Player na cena
        this.add(jogador)
    }
}