import { createAutocomplete } from '@algolia/autocomplete-core'
import { useMemo, useRef, useState } from 'react'
import { searchPokemon } from '../services/api'
import { Link, useNavigate } from 'react-router-dom'
export default function Search () {
  const navigate = useNavigate()
  const [autocompleteState, setAutoCompleteState] = useState({
    collections: [],
    isOpen: false
  })

  const autocomplete = useMemo(() => {
    return createAutocomplete({
      placeholder: 'search',
      onStateChange: ({ state }) => setAutoCompleteState(state),
      getSources: () => [
        {
          sourceId: 'pokemon',
          getItems: ({ query }) => {
            if (query) {
              return searchPokemon({ q: query })
            }
          }
        }
      ],
      onSubmit: ({ state }) => {
        setAutoCompleteState({ isOpen: false })
        const { query, collections } = state
        const results = collections[0].items
        navigate(`/search/${query}`, { state: results })
      }
    })
  }, [])

  const handleResultClick = () => { setAutoCompleteState({ isOpen: false }) }

  const formRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current
  })
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current
  })

  return (
    <div className='relative'>
      <form ref={formRef} className="relative flex items-center max-w-md mx-auto bg-white rounded-lg " {...formProps} >
        <div className="w-full">
          <input ref={inputRef} type="search" className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none bg-white "
            {...inputProps} />
        </div>
        <div>
          <button type="submit" className="flex items-center bg-blue-500 justify-center w-8 h-8 text-white rounded-r-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </form>
      {
        autocompleteState.isOpen && (
          <div ref={panelRef} {...autocomplete.getPanelProps()} className='absolute left-0 right-0 bg-white rounded-lg mt-2 overflow-hidden'>
            {
              autocompleteState.collections.map((collection, index) => {
                const { items } = collection
                return (
                  <section key={index} className='text-left max-h-80 overflow-auto'>
                    <ul {...autocomplete.getListProps()}>
                      {
                        items.map((res, index) => (
                          <li key={index} className='' >
                            <Link to={`pokemon/${res.name}`} onClick={handleResultClick} className='block text-black px-4 hover:bg-gray-200'>
                              {res.name}
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                  </section>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}
