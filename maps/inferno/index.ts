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

export const infernoData: MapData = {
  id: "inferno",
  name: "Inferno",
  sideFavor: "Balanced",
  description: "Inferno gira en torno al control de banana. Si los T toman banana libre, tienen presión suficiente para ejecutar B o crear el fake para A.",
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

export default infernoData;