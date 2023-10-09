import { Link } from 'react-router-dom'

export default function CardPokemon ({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className='relative flex flex-col justify-between items-center h-full min-h-[120px] py-4 bg-white text-black rounded-md bg-opacity-20 overflow-hidden cursor-pointer hover:bg-opacity-40  hover:shadow-yellow-300 hover:shadow-sm group' >
      <span className='absolute top-0 right-2 font-bold text-white'>{pokemon.id}</span>
      <figure className='w-full h-auto overflow-hidden  transition-transform transform group-hover:scale-110 flex justify-center '>
        <img loading='lazy' alt={`pokemon-${pokemon.name}`} className='block object-contain h-auto w-2/5 ' src={pokemon.image} />
      </figure>
      <div className='h-auto'>
        <h1 className='text-center text-2xl first-letter:uppercase font-semibold tracking-wide text-slate-900 pb-1' >{pokemon.name}</h1>
        <div className='flex gap-2 items-center justify-center'>
          {pokemon.types.map((type, index) => <span key={index} className={`text-white font-bold ${type.name} px-2 py-0.5 text-xs  rounded-lg  `}>{type.es}</span>)}
        </div>
      </div>
    </Link>
  )
}
