import { XMarkIcon } from '@heroicons/react/24/outline'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

import GameService from '../../../../../services/api/games.service'

type PropsDeleteGame = {
  game_id: number;
  setActionDelete: (change: boolean) => void,
  setModalDelete: (change: boolean) => void
}

const DeleteGame = (props: PropsDeleteGame) => {

  const { setActionDelete, setModalDelete, game_id } = props

  const handleClose = () => {
    setModalDelete(false)
  }

  const handleDelete = () => {
    GameService.deleteGame(game_id)
      .then((res) => {
        if (res.request.status === 200) {
          setActionDelete(true)
          setModalDelete(false)
        }
      })
  }

  return(
    <section className='fixed top-[20%] sm:left-[10%] md:left-[20%] lg:left-[30%] w-full max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 flex flex-col m-2'>
      <button onClick={handleClose} type='button' className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white' data-modal-hide='popup-modal'>
        <XMarkIcon className='w-4'/>
        <span className='sr-only'>Close modal</span>
      </button>
        <div className='p-6 text-center'>
          <ExclamationCircleIcon className='w-12 ml-[40%]' />
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>Estas seguro de borrar el juego?</h3>
          <button onClick={handleDelete} data-modal-hide='popup-modal' type='button' className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'>
            Borrar
          </button>
          <button onClick={handleClose} data-modal-hide='popup-modal' type='button' className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10'>
            Cancelar
          </button>
        </div>
    </section>
  )
}

export default DeleteGame