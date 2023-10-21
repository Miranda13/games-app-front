import axios from 'axios'
import { ITeam } from '../../models/teams.model'

const apiUrl = 'http://localhost:8080/teams'

const TeamsServices = {
  getTeams: async (): Promise<ITeam[]> => {
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

};

export default TeamsServices
