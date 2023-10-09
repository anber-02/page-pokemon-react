import PokemonList from '../components/PokemonList'
import { usePokemon } from '../hooks/usePokemon'

export function Home () {
  const { pokemon, loading, setPage } = usePokemon()

  // Actualizamos el estado con una función, ya que en setPage no sabemos cual es la pagina actual
  // asi que utilizamos el estado anterior mas uno
  const handleNextPage = () => setPage(prevPage => prevPage + 1)

  return (
    <div className='pt-18 pb-2'>
      <PokemonList pokemon={pokemon} loading={loading} />
      <button className='bg-blue-500 w-full text-lg font-bold tracking-wider rounded-md mt-4 py-2 hover:bg-blue-600' onClick={handleNextPage}>Cargar más</button>
    </div>
  )
}
