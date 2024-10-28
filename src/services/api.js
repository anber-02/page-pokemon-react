export function searchPokemon ({ q }) {
  return fetch(`${import.meta.env.VITE_API_URL}/pokemon?limit=100000&offset=0`)
    .then(res => res.json())
    .then(res => {
      const { results } = res
      const data = results.filter(res => {
        return res.name.toLowerCase().includes(q.toLowerCase())
      })
      return data
    })
    .catch(err => console.log(err))
}

export function getPokemons ({ limit = 10, page = 0 } = {}) {
  return fetch(`${import.meta.env.VITE_API_URL}/pokemon?limit=${limit}&offset=${page * limit}`)
    .then(res => res.json())
    .then(res => {
      const { results } = res
      return getDetailPokemons({ pokemons: results })
    })
    .catch(err => console.log(err))
}

export async function getDetailPokemons ({ pokemons }) {
  // creando el arreglo de url de pokemones que vamos a atacar con un promise all
  const dataPromise = pokemons.map(pokemon => fetch(pokemon.url).then(res => res.json()))
  const dataAll = await Promise.all(dataPromise)
  // Generamos un arreglos de tipos que tienen los pokemones y eliminamos los repetidos para no hacer muchas peticiones repetidas a la api
  const typesUrl = dataAll.map(pokemon => pokemon.types.map(type => type.type)).flat()
    .reduce((acc, curr) => {
      const exists = acc.some((obj) => obj.name === curr.name)
      if (!exists) acc.push(curr)
      return acc
    }, [])
  // Obtenemos los tipos de los pokemones, para poder asignarlos a los pokemones correspondientes
  const types = await getTypesInSpanish({ types: typesUrl })
  // obtener los tipos en espaniol pero solo de los requeridos
  for (let i = 0; i < dataAll.length; i++) {
    const pokemon = dataAll[i]
    const spanishTypes = pokemon.types.map(type => {
      const a = types.find(t => t.name === type.type.name)
      return a
    })
    pokemon.types = spanishTypes
  }

  // mapear los datos de pokemon para no depender del contrato de la api en mi aplicacion
  const pokemonsMap = dataAll.map(pokemon => {
    const { id, name, types, ...rest } = pokemon
    return {
      id,
      name,
      types,
      image: pokemon.sprites?.other?.dream_world.front_default || pokemon.sprites?.other?.home.front_default,
      ...rest
    }
  })

  return pokemonsMap
}

export async function getPokemonById ({ id }) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/pokemon/${id}`)
  const pokemon = await res.json()
  const species = await getSpecie({ url: pokemon.species.url })
  const evolutions = await getEvolutions({ url: species.evolution })
  const types = pokemon.types.map(type => type.type)
  const spanishTypes = await getTypesInSpanish({ types })

  const data = {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    types: spanishTypes,
    color: species.color,
    image: pokemon.sprites?.other?.home.front_default || pokemon.sprites.front_default,
    descriptions: species.descriptions,
    evolutions
  }
  return data
}

async function getEvolutions ({ url }) {
  const res = await fetch(url)
  const evolutions = await res.json()
  const evolutionStages = []
  let currentEvol = evolutions.chain

  while (currentEvol) {
    evolutionStages.push({
      name: currentEvol.species.name,
      trigger: currentEvol.evolution_details[0]?.trigger?.name
    })
    currentEvol = currentEvol.evolves_to[0] // Siguiente etapa de evolución
  }

  const evolutionRequests = evolutionStages.map((stage) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${stage.name}`).then(res => res.json())
  })

  const data = await Promise.all(evolutionRequests)
    .then(data => {
      return evolutionStages.map((stage, index) => ({
        name: stage.name,
        trigger: stage.trigger,
        id: data[index].id,
        image: data[index].sprites?.other?.home.front_default || data[index].sprites.front_default
      }))
    })
  return data
}

async function getSpecie ({ url }) {
  const res = await fetch(url)
  const species = await res.json()
  const descriptions = species?.flavor_text_entries.filter((entry) => entry.language.name === 'es')

  return {
    descriptions,
    color: species.color.name,
    evolution: species.evolution_chain.url
  }
}
async function getTypesInSpanish ({ types } = { types: [] }) {
  const typesLocalStorage = JSON.parse(localStorage.getItem('typesPokemon') || '[]')

  const data = types.map(type => {
    const typeEncontrado = typesLocalStorage.find(t => t.name === type.name)
    return typeEncontrado || type
  })
  const typedNotFound = data.filter(type => type?.url !== undefined)
  const typesFound = data.filter(type => type?.url === undefined)

  if (typedNotFound < 1) return typesFound // Si encontró todos los tipos en el local pues ya no llama a la api

  const promiseTypes = typedNotFound.map(type => fetch(type.url).then(res => res.json()))
  const responseData = await Promise.all(promiseTypes)

  const typesDataES = responseData.map(type => {
    const es = type.names.find(name => name.language.name === 'es')
    return {
      name: type.name,
      es: es.name
    }
  })

  // almacenar en el localStorage los tipos de datos que faltan
  localStorage.setItem('typesPokemon', JSON.stringify([...typesLocalStorage, ...typesDataES]))
  const newData = [...typesFound, ...typesDataES]
  return newData
}
