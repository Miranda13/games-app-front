import axios from 'axios'
import { ILocation } from '../../models/locations.model'

const apiUrl = 'http://localhost:8080/locations'

const LocationsServices = {
  getGames: async (): Promise<ILocation[]> => {
    try {
      const response = await axios.get(`${apiUrl}/`)
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error('Error')
    }
  },

};

export default LocationsServices
