export default function Page404() {
  return (
    <div className='bg-bg-pri h-screen overflow-y:hidden flex p-10 fixed'>
      <div className='text-5xl bg-bg-gptdark text-white flex-col py-20 px-20 font-title'>
        <p className='mb-10'>404</p>
        <p>The page you are looking for could not be found.</p>
        <iframe
          src='http://localhost:5173/player/6b143ea3998b7379bf7820afd2a9a2b8f05a?embed=true&title=false&cover=true'
          width='900'
          height='480'
          allowFullScreen
          title='the end of the world'
        />
      </div>
    </div>
  );
}
