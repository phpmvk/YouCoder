export default function Page500() {
  return (
    <div className='bg-bg-pri h-screen w-full overflow-y:hidden flex p-10 fixed'>
      <div className='text-5xl bg-slate-500 text-white w-full flex-col py-20 px-20 font-title'>
        {/* <div className='text-5xl bg-bg-gptdark text-white w-full flex-col py-20 px-20 font-title'> */}
        <p className='mb-10'>Oops...</p>
        <p>Something happened. Maybe it&apos;s you, maybe it&apos;s us. </p>
        <p className='mt-20'>We will look into it</p>
        {/* <iframe
          src='http://localhost:5173/player/ca185fb8-e3aa-4bdd-a8a9-975818511981?embed=true'
          width='1000'
          height='480'
          allowFullScreen
          title='Youcoder Recording'
        /> */}
      </div>
    </div>
  );
}
