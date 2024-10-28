import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { PokemonContextProvider } from './context/PokemonContext'
import { DetailPage, SearchPage, Home } from './pages'
import { PwaPrompt } from './components/PwaPrompt'

function App () {
  return (

    <PokemonContextProvider>
      <Navbar />
      <PwaPrompt />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/pokemon/:id' element={<DetailPage />} />
        <Route path='/search/:keyword' element={<SearchPage />} />
        <Route path='*' element={<h1 className='mt-12'>Pagina no encontrada</h1>} />
      </Routes>
    </PokemonContextProvider>
  )
}

export default App
