export default function Page500() {
  return (
    <div className='bg-bg-pri h-screen w-full overflow-y:hidden flex p-10 fixed'>
      <div className='text-5xl bg-bg-gptdark/40 text-white flex-col py-10 px-20 font-title flex-grow'>
        <p className='mb-10'>Oops...</p>
        <p>Something happened. Maybe it&apos;s you, maybe it&apos;s us. </p>
        <p className='mt-20'>We will look into it</p>
      </div>
    </div>
  );
}
