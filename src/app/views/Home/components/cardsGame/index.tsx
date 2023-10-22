import { IGame } from '../../../../../models/games.model'
import CardGame from '../cardGame'

type CardsGameProps = {
  data: IGame[],
  setActionDelete: (change: boolean) => void,
  setActionUpdate: (change: boolean) => void
}

const CardsGame = (props: CardsGameProps) => {

  const { data, setActionDelete, setActionUpdate } = props

  return (
    <section className='flex flex-wrap w-100 justify-center m-6'>
      {
        data.length > 0 ?
        data.map((game: IGame) => 
          <CardGame key={`game${game.game_id}`} 
            setActionUpdate={setActionUpdate}
            setActionDelete={setActionDelete}
            data={game} />
        ) :
        <p> No hay juegos registrados </p>
      }
    </section>
  )
}

export default CardsGame