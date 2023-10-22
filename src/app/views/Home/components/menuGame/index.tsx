import { useEffect, useState } from 'react'

import { ILocation } from '../../../../../models/locations.model'
import { ITeam } from '../../../../../models/teams.model'
import LocationsServices from '../../../../../services/api/locations.service';
import TeamsServices from '../../../../../services/api/teams.service';
import Form from '../form';

interface FilterGames {
  hour: string;
  date: string;
  location: string;
  team: string
}

const objectValues: FilterGames = {
  hour: '',
  date: '',
  location: '',
  team: ''
}

type PropsMenuGame = {
  setActionCreate: (change: boolean) => void
}

const MenuGame = (props: PropsMenuGame) => {

  const { setActionCreate } = props

  const [isLoadingTeams, setIsLoadingTeams] = useState(true)
  const [isLoadingLocations, setIsLoadingLocations] = useState(true)
  const [values, setValues] = useState({ ...objectValues })
  const [modalCreate, setModalCreate] = useState(false)

  const [teams, setTeams] = useState<ITeam[]>([])
  const [locations, setLocations] = useState<ILocation[]>([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
        ...values,
        [name]: value
    })
  }

  useEffect(() => {
    TeamsServices.getTeams()
      .then( ( data: ITeam[]) => {
        if (data) {      
          setIsLoadingTeams(false)
        }
        setTeams(data)
      })
    
    LocationsServices.getLocations()
      .then( ( data: ILocation[]) => {
        if (data) {
          setIsLoadingLocations(false)
        }
        setLocations(data)
      })
  }, [])

  useEffect(()=>{}, [isLoadingLocations, isLoadingTeams])

  const handleCreateGame = () => {
    setModalCreate(true)
  }

  return (
    <>
      <menu className='flex justify-center flex-wrap gap-6 p-6 lg:px-8' aria-label='Global'> 
        <form className='flex flex-wrap gap-6'>
          <select 
            name='teamB' 
            id='teamB' 
            onChange={handleChange}
            defaultValue=''
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:border-l-gray-700 border-1 focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
            >
            <option value='' disabled> { isLoadingTeams ? 'Cargando...' : 'Equipos' } </option>
            {
              !isLoadingTeams && teams.map((team : ITeam) => (
              <option className='flex' key={`teamB${team.team_id}`} value={team.team_id}>
                {team.name} 
              </option>
              ))
            }
          </select>
          <select
            name='location'
            id='locations'
            onChange={handleChange}
            defaultValue=''
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:border-l-gray-700 border-1 focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
            <option value='' disabled> { isLoadingLocations ? 'Cargando...': 'Estadios'} </option>
            {
              !isLoadingLocations && locations.map((location : ILocation) => (
              <option className='flex' key={`location${location.location_id}`} value={location.location_id}>
                {location.name_stadium}, {location.city} 
              </option>
              ))
            }
          </select>
          <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'> 
            Filtrar juegos 
          </button>
        </form>

        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'> 
          Limpiar filtros 
        </button>

        <button onClick={handleCreateGame} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'> 
          Agregar nuevo juego 
        </button>
      </menu>
      {
        modalCreate && 
          <Form
            action={'create'}
            setModal={setModalCreate}
            setActionCreate={setActionCreate}
          />
      }
    </>
  )
}

export default MenuGame