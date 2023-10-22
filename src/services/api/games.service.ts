import axios from 'axios'
import { Game, IGame } from '../../models/games.model'

const apiUrl= `${import.meta.env.BASE_URL}/games`

const GameService = {
  getGames: async (): Promise<IGame[]> => {
    try {
      const response = await axios.get(`${apiUrl}/`)
      if (response.status >= 200 && response.status < 300 ) {
        return response.data
      }
      return []
    } catch (error) {
      throw new Error('Error')
    }
  },

  getGame: async (id: number): Promise<IGame> => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Error')
    }
  },

  createGame: async (game: Game) => {
    try {
      const response = await axios.post(`${apiUrl}/`, game)
      return response
    } catch (error) {
      throw new Error('Error')
    }
  },

  updateGame: async (game: IGame) => {
    try {
      const response = await axios.put(`${apiUrl}/${game.game_id}`, game)
      return response
    } catch (error) {
      throw new Error('Error')
    }
  },

  deleteGame: async (id: number) => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`)
      return response
    } catch (error) {
      throw new Error('Error')
    }
  }
};

export default GameService
