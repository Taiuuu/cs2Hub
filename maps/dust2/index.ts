import { MapData } from "@/types";
import { philosophy } from "./philosophy";
import { callouts } from "./callouts";
import { fundamentals } from "./fundamentals";
import { tacticDefault1 } from "./defaults";
import { tacticProtocol1 } from "./protocols";
import { tacticRetake1, tacticRetake2 } from "./retakes";
import { tacticAntiEco1 } from "./antiEco";
import { tacticPistol1, tacticPistol2 } from "./strats/pistol";
import { tacticEco1 } from "./strats/eco";
import { tacticForce1 } from "./strats/force";
import { tacticBuy1 } from "./strats/buy";
import { tacticMidRound1 } from "./strats/midRound";

export const dust2Data: MapData = {
  id: "dust2",
  name: "Dust 2",
  sideFavor: "CT-sided",
  description: "Dust 2 es el mapa más icónico de CS. La CT tiene ventaja estructural por el control de largo y el mid.",
  philosophy,
  callouts,
  fundamentals,
  tactics: [
    tacticDefault1,
    tacticProtocol1,
    tacticRetake1,
    tacticRetake2,
    tacticPistol1,
    tacticPistol2,
    tacticEco1,
    tacticForce1,
    tacticBuy1,
    tacticAntiEco1,
    tacticMidRound1,
  ],
};

export default dust2Data;