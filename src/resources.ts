import { ImageFiltering, ImageSource, Loader, Sound } from "excalibur";
import sword from "./images/sword.png";
import logo from "./images/logo.png";
import logoVertical from "./images/logo-vertical.png";
import gamificacao from "./images/gamification.png";
import npcA from "./images/npcA.png";
import npcB from "./images/npcB.png";
import npcC from "./images/npcC.png";
import { TiledResource } from "@excaliburjs/plugin-tiled";


import pngTilesetPath from "./maps/Room_Builder_32x32.png?url"

import tsxParedesPath from "./maps/tileset_paredes.tsx?url"
import tsxGenericPath from "./maps/tileset_generic.tsx?url"
import tsxEstoquePath from "./maps/tileset_estoque.tsx?url"
import tsxBibliotecaPath from "./maps/tileset_bibilioteca.tsx?url"

import tmxMapaPath from "./maps/showroom_map.tmx?url"

import playerSpritePath from "./sprites/player.png"

import ritimada from "./sound/ritmada_zelda.mp3"
import classica from "./sound/zelda.mp3"

export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  PlayerSpriteSheet: new ImageSource(playerSpritePath, {filtering: ImageFiltering.Pixel}),
  LogoVertical: new ImageSource(logoVertical),
  gamificacao: new ImageSource(gamificacao),
  RitimadaBGM: new Sound(ritimada),
  ClassicoBGM: new Sound(classica),
  Mapa: new TiledResource(tmxMapaPath, {
    pathMap: [
      {path: "showroom_map.tmx", output: tmxMapaPath},
      {path: "Room_Builder_32x32.png", output: pngTilesetPath},
      {path: "tileset_paredes.tsx", output: tsxParedesPath},
      {path: "tileset_generic.tsx", output: tsxGenericPath},
      {path: "tileset_estoque.tsx", output: tsxEstoquePath},
      {path: "tileset_bibilioteca.tsx", output: tsxBibliotecaPath}
    ]
  }),
  NpcA: new ImageSource(npcA),
  NpcB: new ImageSource(npcB),
  NpcC: new ImageSource(npcC),
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
