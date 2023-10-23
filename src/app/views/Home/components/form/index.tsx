import { MapPinIcon } from '@heroicons/react/24/outline'
import { FormEventHandler, useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import TeamsServices from '../../../../../services/api/teams.service'
import { ITeam } from '../../../../../models/teams.model'
import LocationsServices from '../../../../../services/api/locations.service'
import { ILocation } from '../../../../../models/locations.model'
import GameService from '../../../../../services/api/games.service'
import { Game, IGame } from '../../../../../models/games.model'
import { formatDate } from '../../../../../utils'

interface NewGame {
  hour: string;
  date: string;
  teamA: number;
  scoreA: number;
  teamB: number;
  scoreB: number;
  location: number;
  played: boolean
}

type PropsForm = {
  action: string,
  dataUpdate?: IGame,
  setModal: (change: boolean) => void,
  setActionUpdate?: (change: boolean) => void
  setActionCreate?: (change: boolean) => void
}

const Form = (props: PropsForm) => {

  const { action, dataUpdate, setModal } = props

  const objectValues: NewGame = {
    hour: dataUpdate?.hour? dataUpdate?.hour: '',
    date: dataUpdate?.date? formatDate(dataUpdate?.date) : '',
    teamA: dataUpdate?.teams[0].team_id ? dataUpdate?.teams[0].team_id: 0,
    scoreA: dataUpdate?.teams[0].score ? dataUpdate?.teams[0].score: 0,
    teamB: dataUpdate?.teams[1].team_id ? dataUpdate?.teams[1].team_id: 0,
    scoreB: dataUpdate?.teams[1].score ? dataUpdate?.teams[1].score: 0,
    location: dataUpdate?.location?.location_id ? dataUpdate?.location.location_id : 0,
    played: true
  }

  const [teams, setTeams ] = useState<ITeam[]>([])
  const [locations, setLocations ] = useState<ILocation[]>([])
  const [isLoadingTeams, setIsLoadingTeams ] = useState(true)
  const [isLoadingLocations, setIsLoadingLocations ] = useState(true)
  const [values, setValues] = useState({ ...objectValues })
  const [errors, setErrors] = useState<string[]>([])

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

  useEffect(() => {}, [values, errors, isLoadingLocations, isLoadingTeams])

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    if(validateForm(values)) {
      if (action === 'create') {
        const newGame: Game = {
          hour: values.hour,
          date: values.date,
          teams: [
            {
              score: +values.scoreA,
              team_id: +values.teamA
            },
            {
              score: +values.scoreB,
              team_id: +values.teamB
            }
          ],
          location_id: +values.location,
          played: true
        }
        GameService.createGame(newGame)
          .then((res) => {
            if(res.request.status === 201) {
              props?.setActionCreate && props.setActionCreate(true)
              setModal(false)
            }
          })
      }
      if (action === 'update') {
        const updateGame: IGame = {
          game_id: dataUpdate?.game_id || 0,
          hour: values.hour,
          date: values.date,
          teams: [
            {
              score: +values.scoreA,
              team_id: +values.teamA,
              score_id: dataUpdate?.teams[0].score_id
            },
            {
              score: +values.scoreB,
              team_id: +values.teamB,
              score_id: dataUpdate?.teams[1].score_id
            }
          ],
          location_id: +values.location,
          played: true
        }
        GameService.updateGame(updateGame)
          .then((res) => {
            if(res.request.status === 200) {
              props?.setActionUpdate && props.setActionUpdate(true)
              setModal(false)
            }
          })
      }
    }
  }

  interface CommonEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: CommonEvent) => {
    const { name, value } = e.target
    setValues({
        ...values,
        [name]: value
    })
  }

  const validateForm = (values: NewGame) => {
    const err = []

    if (!values.teamA || !values.teamB) {
      err.push('Elige dos equipos')
    }

    if (!values.location) {
      err.push('Elige una ubicacion')
    }

    if (values.teamA === values.teamB) {
      err.push('Los equipos deben ser diferentes')
    }

    if (+values.scoreB > 500 || +values.scoreA > 500 || +values.scoreB < 0 || +values.scoreA < 0) {
      err.push('El rango de goles permitido es de 0 a 500')
    }

    setErrors(err)

    return err.length === 0
  }

  const handleClose = () => {
    setModal(false)
  }

  return (
    <section className='fixed inset-0 bg-black bg-opacity-50'>
      <article className='relative mt-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 flex flex-col mx-auto max-w-md'>
        <button onClick={handleClose} type='button' className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white' data-modal-hide='authentication-modal'>
          <XMarkIcon className='w-5'/>
          <span className='sr-only'>Close modal</span>
        </button>
        <h3 className='text-lg font-medium text-center mb-4'> { action === 'create' ? 'Agregar nuevo juego' : 'Actualizar juego'} </h3>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-wrap gap-x-10 justify-center'>
            <div className='flex flex-col w-[40%] items-center'>
              <label htmlFor='teams' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'> Elige el primer equipo </label>
              <select
                name='teamA' 
                id='teams' 
                onChange={handleChange}
                value={values.teamA}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:border-l-gray-700 border-1 focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                <option value={0} disabled> { isLoadingTeams ? 'Cargando...' : 'Equipos' } </option>
                {
                  !isLoadingTeams && teams.map((team : ITeam) => (
                  <option className='flex' key={`teamA${team.team_id}`} value={team.team_id}>
                    {team.name}
                  </option>
                  ))
                }
              </select>
              <label className='my-2 text-sm font-medium' htmlFor='score_one'> Goles </label>
              <input
                name='scoreA'
                type='number'
                id='score_one'
                onChange={handleChange}
                value={values.scoreA}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='0'
                required
              />
            </div>
            
            <div className='flex flex-col items-center'>
              <label htmlFor='teamB' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'> Elige el segundo equipo </label>
              <select 
                name='teamB' 
                id='teamB' 
                onChange={handleChange}
                value={values.teamB}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:border-l-gray-700 border-1 focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                >
                <option value={0} disabled> { isLoadingTeams ? 'Cargando...' : 'Equipos' } </option>
                {
                  !isLoadingTeams && teams.map((team : ITeam) => (
                  <option className='flex' key={`teamB${team.team_id}`} value={team.team_id}>
                    {team.name} 
                  </option>
                  ))
                }
              </select>
              <label className='my-2 text-sm font-medium' htmlFor='score_two'> Goles </label>
              <input 
                name='scoreB'
                type='number'
                id='score_two'
                onChange={handleChange}
                value={values.scoreB}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='0'
                required
              />
            </div>
          </div>
          
          <p className='mt-4 text-sm font-medium text-center'> En donde es el partido? </p>
          
          <div className='flex flex-col justify-center'>
            <div className='text-m text-gray-800 dark:text-gray-400 pt-4 flex justify-center'>
              <MapPinIcon className='w-6 p-1' />
              <select 
                name='location'
                id='locations'
                onChange={handleChange}
                value={values.location}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:border-l-gray-700 border-1 focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                <option value={0} disabled> { isLoadingLocations ? 'Cargando...': 'Estadios'} </option>
                {
                  !isLoadingLocations && locations.map((location : ILocation) => (
                  <option className='flex' key={`location${location.location_id}`} value={location.location_id}>
                    {location.name_stadium}, {location.city} 
                  </option>
                  ))
                }
              </select>
            </div>
            <p className='my-2 text-sm font-medium text-center'> Que dia y a que hora es el partido? </p>
            <div className='text-sm text-gray-800 dark:text-gray-400 pt-1 flex justify-center gap-2'> 
              <input 
                name='date' 
                type='date' 
                onChange={handleChange}
                value={values.date}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                required
              /> 
              <input 
                name='hour'
                type='time'
                onChange={handleChange}
                value={values.hour}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                required
              />
            </div>
            <div className='p-2'>
              {
                errors.length !== 0 && errors.map((error) => <p className='text-red-500 text-xs'> {error} </p>)
              }
            </div>
            <div className='flex gap-5 mt-6'>
              <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'> 
                Guardar 
              </button>
              <button onClick={handleClose} data-modal-hide='popup-modal' type='button' className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10'>
                Cancelar
              </button>
            </div>  
          </div>
        </form>  
      </article>
    </section>
  )
}

export default Form
