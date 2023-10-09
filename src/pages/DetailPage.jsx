import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPokemonById } from '../services/api'
import { Spinner } from '../components/Spinner'
import DetailPokemon from '../components/DetailPokemon'

export function DetailPage () {
  const navigate = useNavigate()
  const { id } = useParams() // id de la url
  const [pokemon, setPokemon] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    setLoading(true)
    getPokemonById({ id })
      .then(pokemon => {
        return (
          setPokemon(pokemon),
          setLoading(false))
      }).catch(_err => {
        console.log(_err)
        navigate('/404')
      })
  }, [id])

  return (
    loading ? <Spinner /> : <DetailPokemon pokemon={pokemon} />
  )
}
