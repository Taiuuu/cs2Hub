import { MapData } from "@/types";
import { philosophy } from "./philosophy";
import { callouts } from "./callouts";
import { fundamentals } from "./fundamentals";
import { tacticDefault1 } from "./defaults";
import { tacticProtocol1, tacticProtocol2 } from "./protocols";
import { tacticRetake1, tacticRetake2 } from "./retakes";
import { tacticPistol1, tacticPistol2 } from "./strats/pistol";
import { tacticEco1 } from "./strats/eco";
import { tacticForce1 } from "./strats/force";
import { tacticBuy1 } from "./strats/buy";
import { tacticAntiEco1 } from "./antiEco";
import { tacticReaggression1 } from "./reaggressions";
import { tacticMidRound1 } from "./strats/midRound";

export const trainData: MapData = {
  id: "train",
  name: "Train",
  sideFavor: "CT-sided",
  description: "Train es un mapa de vagones con dos sitios complejos. A site tiene múltiples ángulos difíciles de limpiar; B site es más compacto pero con rutas de rotación cortas para la CT.",
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
    tacticEco1,
    tacticForce1,
    tacticBuy1,
    tacticAntiEco1,
    tacticReaggression1,
    tacticMidRound1
  ],
};

export default trainData;
