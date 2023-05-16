export default function Page404() {
  return (
    <div className='bg-bg-pri overflow-y:hidden flex p-10 flex-grow'>
      <div className='text-5xl bg-bg-gptdark text-white flex-col py-20 px-20 font-title'>
        <p className='mb-10'>404</p>
        <p>The page you are looking for could not be found.</p>
        <iframe
          src='http://localhost:5173/player/e77140cd6c2bd389b902b538a4127ecb450e?embed=true&title=true&cover=true&theme=light'
          width='900'
          height='480'
          allowFullScreen
          title='the end of the world'
        />
      </div>
    </div>
  );
}
