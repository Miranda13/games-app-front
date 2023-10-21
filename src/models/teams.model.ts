export interface ITeam {
  team_id: number;
  name: string;
  url_flag_image: string;
}

export interface Team {
  team_id: number;
  name?: string;
  url_flag_image?: string;
  score: number;
  score_id?: number; 
}

