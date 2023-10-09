import { useState } from 'react'
const INITIAL_VERSION = 'x'
export default function Description ({ descriptions }) {
  const [version, setVersion] = useState(INITIAL_VERSION)
  const description = descriptions.find(d => d.version.name === version)

  const changeVersionDescription = (e) => {
    setVersion(e.target.id)
  }

  return (
    <>
      <section>
        <p className='text-left'>Versiones de la descripción</p>
        <div className='flex gap-1 overflow-x-scroll  rounded-md  sm:overflow-auto md:flex-wrap'>
          {
            descriptions?.map((des, index) => (
              <button className={`block text-white py-0.5 ${des.version.name === version ? 'bg-blue-700' : 'bg-gray-700'} px-2 my-1  rounded-md whitespace-nowrap hover:bg-blue-800`} id={des.version.name} key={index} onClick={changeVersionDescription}>{des.version.name}</button>
            ))
          }
        </div>
      </section>
      <div>
        <p className='font-semibold text-2xl text-left pb-1 mb-2 border-b-[1px] border-b-slate-400'>Descripción <span className='font-normal text-sm text-gray-400'>version {version}</span></p>
        <p className='text-left font-normal min-h-[100px]  overflow-auto py-0.5'>{description?.flavor_text}</p>
      </div>
    </>
  )
}
