import axios from 'axios'
import { Game, IGame } from '../../models/games.model'

const apiUrl = 'http://localhost:8080/games'

const GameService = {
  getGames: async (): Promise<IGame[]> => {
    try {
      const response = await axios.get(`${apiUrl}/`)
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
      throw new Error('Error')
    }
  },

  getGame: async (id: number): Promise<IGame> => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`)
      console.log(response)
      return response.data
    } catch (error) {
      throw new Error('Error')
    }
  },

  createGame: async (game: Game) => {
    try {
      const response = await axios.post(`${apiUrl}/`, game)
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
      throw new Error('Error al crear un usuario en la API')
    }
  },

  updateGame: async (game: IGame) => {
    try {
      const response = await axios.put(`${apiUrl}/${game.game_id}`, game)
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
      throw new Error('Error al crear un usuario en la API')
    }
  },

  deleteGame: async (id: number): Promise<number> => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`)
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
      throw new Error('Error')
    }
  }
};

export default GameService
