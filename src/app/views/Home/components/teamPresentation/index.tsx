import { Team } from '../../../../../models/teams.model'

const TeamPresentation = (props: Team) => {

  const { url_flag_image, name, score } = props

  return (
    <div className='flex flex-col items-center'>
      <img className='w-12 mb-3' src={url_flag_image} alt=''/>
      <h5 className='mb-1 text-lg font-normal text-gray-900 dark:text-white'>{name}</h5>
      <span className='text-sm text-gray-500 dark:text-gray-400'>Goles: {score}</span>
    </div>
  )
}

export default TeamPresentation
