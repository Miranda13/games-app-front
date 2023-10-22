import axios from 'axios'
import { ILocation } from '../../models/locations.model'

const apiUrl = `${import.meta.env.VITE_BASE_URL}/locations`

const LocationsServices = {
  getLocations: async (): Promise<ILocation[]> => {
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

export default LocationsServices
