import { useState, useEffect } from 'react'

import CardsGame from './components/cardsGame'
import GameService from '../../../services/api/games.service'
import MenuGame from './components/menuGame'
import { IGame } from '../../../models/games.model'

const Home = () => {

  const [games, setGames] = useState<IGame[]>([])
  const [actionDelete, setActionDelete] = useState(false)
  const [actionUpdate, setActionUpdate] = useState(false)
  const [actionCreate, setActionCreate] = useState(false)

  useEffect(() => {
    GameService.getGames()
      .then((data) => {
        setGames(data)
        setActionCreate(false)
        setActionDelete(false)
        setActionUpdate(false)
      })
  }, [actionDelete, actionUpdate, actionCreate])

  return (
    <main>
      <MenuGame
        setActionCreate={setActionCreate} />
      <CardsGame 
        data={games} 
        setActionDelete={setActionDelete}
        setActionUpdate={setActionUpdate}
      />
    </main>
  )
}

export default Home
