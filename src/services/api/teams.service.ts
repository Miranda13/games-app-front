import axios from 'axios'
import { ITeam } from '../../models/teams.model'

const apiUrl = 'http://localhost:8080/teams'

const TeamsServices = {
  getGames: async (): Promise<ITeam[]> => {
    try {
      const response = await axios.get(`${apiUrl}/`)
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
      throw new Error('Error')
    }
  },

};

export default TeamsServices
