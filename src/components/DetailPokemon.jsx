import { Link } from 'react-router-dom'
import Description from './Description'
import Image from './Image'

export default function DetailPokemon ({ pokemon }) {
  return (
    <main className='absolute h-screen pt-24 w-full px-2 py-2   overflow-auto sm:flex sm:items-center sm:justify-center sm:pt-16' style={{ backgroundColor: pokemon.color }}>
      <div className='absolute bg-white bg-opacity-10 top-0 bottom-0 left-0 right-0 md:bg-opacity-25' />

      <section className='flex flex-col items-center  h-[180px] z-10 sm:h-auto'>
        <figure className='w-56 absolute left-1/2  z-20 transform -translate-x-1/2 sm:relative sm:w-full '>
         <Image url={pokemon.image} />
        </figure>
      </section>

      <section className='relative min-h-[calc(100%-180px)] px-2 pb-4 pt-12 w-full md:w-1/2 rounded-t-md bg-white text-center overflow-auto sm:pt-8 sm:rounded-md'>
        <h1 className='font-bold text-slate-700 first-letter:uppercase text-4xl sm:text-5xl'>{pokemon.name}</h1>
        <div className='grid grid-cols-4 mt-4 gap-0 justify-between w-full'>
          <div className=''>
            <p className='flex flex-col text-slate-700 font-semibold text-lg'>{pokemon.weight}kg<span className='uppercase font-normal text-sm text-slate-600'>Peso</span></p>
          </div>
          <div className='flex flex-wrap gap-1 items-center justify-center border-x-2  border-x-slate-300  col-span-2'>
            {pokemon.types.map((type, index) => <span key={index} className={`text-white font-semibold ${type.name} px-2 py-1text-sm  rounded-lg  `}>{type.es}</span>)}
          </div>
          <div className=''>
            <p className='flex flex-col text-slate-700 font-semibold text-lg'>0.{pokemon.height}m<span className='uppercase font-normal text-sm text-slate-600'>altura</span></p>
          </div>
        </div>
        <div className='w-full  mt-4 text-slate-700 overflow-auto'>
          <Description descriptions={pokemon.descriptions} />
        </div>
        <section>
          <p className='font-semibold tracking-wider text-center text-lg my-2' style={{ color: pokemon.color === 'white' ? 'black' : pokemon.color }}>Evoluciones</p>
          <div className='flex gap-3 w-full justify-center items-center'>
            {
              pokemon.evolutions?.map((evo, index) => {
                return (
                  <Link to={`/pokemon/${evo.id}`} key={evo.id} className='text-center w-40 group '>
                    <figure
                      className={' overflow-hidden relative'}
                    >
                      <Image url={evo.image} />
                    </figure>
                    <p className='text-slate-800 font-semibold first-letter:uppercase text-xl mt-1 py-1 group-hover:scale-105 group-hover:bg-opacity-40'>{evo.name}</p>
                  </Link>
                )
              })
            }
          </div>
        </section>
      </section>
    </main >
  )
}
