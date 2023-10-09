import { useLocation, useParams } from 'react-router-dom'
import PokemonList from '../components/PokemonList'
import { usePokemon } from '../hooks/usePokemon'

export function SearchPage () {
  const { keyword } = useParams() // por si cambia el link a mano
  const { state } = useLocation() // por si busca desde el buscador
  const { pokemon: pokemons, loading } = usePokemon({ keyword, state })

  return (
    <div className='pt-18'>
      <PokemonList pokemon={pokemons} loading={loading} />
    </div>
  )
}
