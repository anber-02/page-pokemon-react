import Search from './Search'

export default function Navbar () {
  return (
    <nav className="fixed z-50 top-0 left-0 right-0 bg-slate-800">
      <div className='max-w-7xl mx-auto px-2 py-2 flex flex-col gap-1 items-center justify-between sm:flex-row'>
        <a href="/" className="text-3xl tracking-wider shadow-text">Pokemon</a>
        <Search />
      </div>
    </nav>
  )
}
