import CardPokemon from './CardPokemon'
import { Spinner } from './Spinner'

export default function PokemonList ({ pokemon, loading } = { pokemon: [] }) {
  if (loading) {
    return <Spinner />
  }
  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 '>
      {
        pokemon.map((pokemon, index) => <CardPokemon key={index} pokemon={pokemon} />)
      }
    </div>
  )
}
