import { ClockIcon } from '@heroicons/react/24/outline'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon } from '@heroicons/react/24/outline'

import TeamPresentation from '../teamPresentation'
import DeleteGame from '../deleteGame'
import Form from '../form'
import { IGame } from '../../../../../models/games.model'
import { Team } from '../../../../../models/teams.model'
import { useState } from 'react'

type PropsCardGame = {
  data: IGame,
  setActionUpdate: (change: boolean) => void,
  setActionDelete: (change: boolean) => void
}

const CardGame = (props: PropsCardGame) => {

  const { data, setActionUpdate, setActionDelete } = props

  const [modalDelete, setModalDelete] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  
  const handleDelete = () => {
    setModalDelete(true)
  }

  const handleUpdate = () => {
    setModalUpdate(true)
  }

  return ( 
    <>
      <article className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 flex flex-col m-2'>
        <div className='flex gap-10 flex-wrap justify-center'>
          {
            data.teams.map((team: Team) => 
              <TeamPresentation
                key={`team${team.team_id}`}
                name={team.name}
                url_flag_image={team.url_flag_image}
                score={team.score}
                team_id={team.team_id}
              />
            )
          }
        </div>

        <p className='text-m text-gray-800 dark:text-gray-400 pt-4 flex justify-center'>
          <MapPinIcon className='w-6 p-1' />
          {data.location?.name_stadium}, {data.location?.city} 
        </p>
        <p className='text-sm text-gray-800 dark:text-gray-400 pt-1 flex justify-center'> 
          <CalendarIcon className='w-5 p-1' />
          {data.date}, 
          <ClockIcon className='w-5 p-1' />
          {data.hour} 
        </p>

        <div className='flex justify-end mt-4'>
          <button onClick={handleDelete}>
            <TrashIcon className='w-6 text-red-500 p-1' />
          </button>
          <button onClick={handleUpdate}>
            <PencilSquareIcon className='w-6 text-blue-500 p-1' />
          </button>
        </div>
      </article>
      {
        modalDelete && 
        <DeleteGame
          setActionDelete={setActionDelete}
          setModalDelete={setModalDelete}
          game_id={data.game_id}
        />
      }
      {
        modalUpdate && 
        <Form 
          action='update'
          dataUpdate={data}
          setModal={setModalUpdate}
          setActionUpdate={setActionUpdate} 
        />
      }
    </>
    )
  }
  
  export default CardGame
  