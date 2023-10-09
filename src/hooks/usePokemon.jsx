import { useContext, useEffect, useState } from 'react'
import pokemonContext from '../context/PokemonContext'
import { getDetailPokemons, getPokemons, searchPokemon } from '../services/api'

const INITIAL_PAGE = 0
export function usePokemon ({ limit = 20, keyword = '', state = null } = {}) {
  // <----------------------
  const [loading, setLoading] = useState(false)
  const { pokemon, setPokemon } = useContext(pokemonContext)
  const [page, setPage] = useState(INITIAL_PAGE)

  useEffect(function () {
    if (keyword !== '') return
    // se ejecuta cada vez que se rendering
    // use effect recibe dos parámetros, primero la función a ejecutar
    // el segundo son las dependencias que tiene el efecto, osea las variables
    // o información que si cambia se tiene que ejecutar el efecto
    setLoading(true)
    getPokemons()
      .then(pokemons => {
        // mapeo de los datos
        // const pokemon = pokemons.map((pokemon) => {
        // })
        console.log({ pokemons })
        return (
          setPokemon(pokemons),
          setLoading(false)
        )
      })
  }, [])
  // si este objeto no tiene dependencias asi que se ejecuta una sola vez
  // en caso contrario cada que cambie el valor de la dependencia que tiene
  // se va a ejecutar el efecto
  // <-----------------------------
  useEffect(function () {
    if (page === INITIAL_PAGE) return
    console.log('hola busco mas pokemones')
    getPokemons({ limit, page })
      .then(nextPokemons => {
        setPokemon(prevPokemons => prevPokemons.concat(nextPokemons))
      })
  }, [page])

  // por si lleva la keyword
  useEffect(function () {
    if (state !== null) {
      setLoading(true)
      getDetailPokemons({ pokemons: state })
        .then(data => {
          return (setPokemon(data), setLoading(false))
        })
    }
    if (keyword !== '' && state === null) {
      setLoading(true)
      searchPokemon({ q: keyword })
        .then(pokemons => {
          getDetailPokemons({ pokemons }).then(data => {
            return (setPokemon(data), setLoading(false))
          })
        })
    }
  }, [keyword])

  return { loading, pokemon, setPage }
}
