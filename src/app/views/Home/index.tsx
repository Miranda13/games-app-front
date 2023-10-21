import { useState, useEffect } from 'react'

import CardsGame from './components/cardsGame'
import GameService from '../../../services/api/games.service'
import MenuGame from './components/menuGame'

const Home = () => {

  const [games, setGames] = useState([])
  const [actionDelete, setActionDelete] = useState(false)
  const [actionUpdate, setActionUpdate] = useState(false)
  const [actionCreate, setActionCreate] = useState(false)

  useEffect(() => {
    GameService.getGames()
      .then((data) => {
        setGames(data)
      })
    setActionDelete(false)
    setActionUpdate(false)
    setActionCreate(false)
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
