import ex, { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";
import { npc } from "../actors/npc";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        // Ativar o modo de Debug
        engine.toggleDebug()


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

        // Carregar o spawn point do Player
        let spawnPoint = tiledMap.getObjectsByName("player_spawn")[0]

        // Criação e configuração do player
        let jogador = new Player(vec(spawnPoint.x + offsetx, spawnPoint.y + offsety))

        // Define z-index do player
        jogador.z = 3

        // Adiciona o Player na cena
        this.add(jogador)

        // Add npcs
        let npcSpawnPointA = tiledMap.getObjectsByName("npc_a")[0]
        let npcSpawnPointB = tiledMap.getObjectsByName("npc_b")[0]
        let npcSpawnPointC = tiledMap.getObjectsByName("npc_c")[0]

        // Configurar os npcs
        let npcA = new npc(
            vec(npcSpawnPointA.x + offsetx, npcSpawnPointA.y + offsety),
            Color.Blue,
            "NpcA"
        )

        let npcB = new npc(
            vec(npcSpawnPointB.x + offsetx, npcSpawnPointB.y + offsety),
            Color.Azure,
            "NpcB"
        )

        let npcC = new npc(
            vec(npcSpawnPointC.x + offsetx, npcSpawnPointC.y + offsety),
            Color.Viridian,
            "NpcC"
        )

        this.add(npcA)
        this.add(npcB)
        this.add(npcC)

        // Configurar a camera para focar no player
        this.camera.strategy.lockToActor(jogador)
        this.camera.zoom = 2


        // Adicionar colisão com cada objeto
        // Pegar a camda de ObjetosColisores

        let CamadaObjetosColisores = tiledMap.getObjectLayers("ObjetosColisores")[0]
            // console.log(CamadaObjetosColisores) -> verificação do array com os objetos do Tile

            // Percorrer objetos com foreach e para cada objeto, renderizar um actor
            CamadaObjetosColisores.objects.forEach(objeto => {
                // Configurar o actor
                const objetoAtual = new Actor({
                    name: objeto.name,
                    x: objeto.x + offsetx + (objeto.tiledObject.width! / 2),
                    y: objeto.y + offsety + (objeto.tiledObject.height! / 2),
                    width: objeto.tiledObject.width,
                    height: objeto.tiledObject.height,
                    collisionType: CollisionType.Fixed
                })

                // Add colisor
                this.add(objetoAtual)
            })


    }

}
