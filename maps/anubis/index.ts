import { MapData } from "@/types";
import { philosophy } from "./philosophy";
import { callouts } from "./callouts";
import { fundamentals } from "./fundamentals";
import { tacticDefault1 } from "./defaults";
import { tacticProtocol1, tacticProtocol2 } from "./protocols";
import { tacticRetake1, tacticRetake2 } from "./retakes";
import { tacticAntiEco1 } from "./antiEco";
import { tacticPistol1, tacticPistol2, tacticPistol3 } from "./strats/pistol";
import { tacticEco1 } from "./strats/eco";
import { tacticForce1 } from "./strats/force";
import { tacticBuy1 } from "./strats/buy";
import { tacticMidRound1 } from "./strats/midRound";

export const anubisData: MapData = {
  id: "anubis",
  name: "Anubis",
  sideFavor: "Balanced",
  description: "Anubis es el mapa más nuevo del pool activo. El T tiene rutas cortas hacia ambos sites.",
  philosophy,
  callouts,
  fundamentals,
  tactics: [
    tacticDefault1,
    tacticProtocol1,
    tacticProtocol2,
    tacticRetake1,
    tacticRetake2,
    tacticPistol1,
    tacticPistol2,
    tacticPistol3,
    tacticEco1,
    tacticForce1,
    tacticBuy1,
    tacticAntiEco1,
    tacticMidRound1,
  ],
};

export default anubisData;