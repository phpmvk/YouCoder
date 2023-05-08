import React from 'react'

const ListItem = () => {
  return (
    <div className=" bg-transparent h-[30vh] flex items-center justify-center p-4 ">
  <img src='./../../../public/tailwindcss.svg' alt="" className="bg-white w-2/5 h-[29vh] z-10 mr-1 rounded-md "></img>
  <div className="bg-bg-pri w-3/5 h-[29vh] z-10 ml-1  text-white">
    Hello
  </div>
</div>
  )
}

export default ListItem