import { Author } from "./userType";

export interface poketmonType {
  id: number;
  en_name: string;
  ko_name: string;
  en_type: string;
  ko_type: string;
  card_url: string;
  motion_url: string;
  stats: {};
  credit: number;
  have_poke: havePokeType[];
}

interface pokeType {
  poke_id: number;
  id: number;
}
interface havePokeType {
  id: number;
  poke_id: number;
  user_id: number;
  author: Author[];
  poke: pokeType[];
}
