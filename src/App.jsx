import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Main } from './components/Main'

export default function App() {
  const [pokeList, setPokeList] = useState([])
  const [initialCount, setInitialCount] = useState(1)
  const [finalCount, setFinalCount] = useState(10)

  async function getPokemons() {
    try {
      const listData = []
      
      for (let i = initialCount; i <= finalCount; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const data = await response.json()
        listData.push(data)
      }
      
      setPokeList((pokeList) => [ ...pokeList, ...listData ])
    } catch (error) {
      console.error(error)
    }
  }

  function handleGetPokemonClick() {
    setInitialCount(finalCount + 1)
    setFinalCount((finalCount) => finalCount + 10)
  }

  useEffect(() => {
    getPokemons()
  }, [initialCount])
  
  return (
    <>
      <Header />
      <Main list={pokeList} />
      <button onClick={handleGetPokemonClick} className='button'>Ver mais</button>
      <footer>
        <p>&copy; Todos os direitos reservados</p>
      </footer>
    </>
  )
}