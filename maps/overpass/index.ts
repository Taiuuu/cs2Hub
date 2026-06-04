import { MapData } from "@/types";
import { philosophy } from "./philosophy";
import { callouts } from "./callouts";
import { fundamentals } from "./fundamentals";
import { tacticDefault1 } from "./defaults";
import { tacticProtocol1, tacticProtocol2 } from "./protocols";
import { tacticRetake1, tacticRetake2 } from "./retakes";
import { tacticReaggression1 } from "./reaggressions";
import { tacticAntiEco1 } from "./antiEco";
import { tacticPistol1, tacticPistol2 } from "./strats/pistol";
import { tacticEco1 } from "./strats/eco";
import { tacticForce1 } from "./strats/force";
import { tacticBuy1 } from "./strats/buy";
import { tacticMidRound1 } from "./strats/midRound";

export const overpassData: MapData = {
  id: "overpass",
  name: "Overpass",
  sideFavor: "CT-sided",
  description: "Overpass es un mapa grande con rutas largas. El control de agua es clave para el T.",
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
    tacticMidRound1,
  ],
};

export default overpassData;