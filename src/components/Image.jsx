export default function Image ({ url }) {
  return (
    <div>
      <div
        className=' filter brightness-0  absolute top-[2px] left-[2px] w-full h-full  group-hover:scale-105'
        style={{
          backgroundImage: `url(${url})`, // Utiliza la misma imagen para la silueta
          backgroundSize: 'cover'
        }}
      >
      </div>
      <img
        loading='lazy'
        className='object-cover h-full w-full relative group-hover:scale-105'
        src={url} />
    </div>
  )
}
