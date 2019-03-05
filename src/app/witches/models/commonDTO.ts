import { WitchDTO } from "./witchDTO";
import { SupremeDTO } from "./supremeDTO";

export class CommonDTO extends WitchDTO {
  regionOrigin: string;
  flyBroom: boolean;
  supremeWitch: SupremeDTO = new SupremeDTO();
}
