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
import { tacticMidRound1 } from "./strats/midRound";

export const mirageData: MapData = {
  id: "mirage",
  name: "Mirage",
  sideFavor: "Balanced",
  description: "Mirage es el mapa más jugado del pool competitivo. El control de mid es fundamental; quien domina mid puede splitear A (ramp + CT) o apoyar B.",
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
    tacticMidRound1
  ],
};

export default mirageData;
