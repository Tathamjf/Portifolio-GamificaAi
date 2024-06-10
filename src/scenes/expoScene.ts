import { Color, Engine, FadeInOut, Scene, Transition } from "excalibur";
import { Resources } from "../resources";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        // Carregar o Mapa
        let tiledMap = Resources.Mapa

        // Adicionar Mapa da cena
        tiledMap.addToScene(this)
    }
}