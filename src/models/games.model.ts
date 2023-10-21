import { ILocation } from './locations.model';
import { Team } from './teams.model'

export interface Game {
  hour: string;
  date: string;
  teams: [
    Team,
    Team
  ];
  location_id: number;
  played: boolean
}

export interface IGame {
  game_id: number;
  hour: string;
  date: string;
  teams: [
    Team,
    Team
  ];
  location?: ILocation;
  location_id?: number;
  played: boolean;
}
