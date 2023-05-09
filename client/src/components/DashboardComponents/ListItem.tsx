import React from 'react'
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const ListItem = () => {


  return (
    <div className="bg-bg-gptdark h-[45vh] flex flex-col items-center justify-center p-4 rounded-md">
    <div className="w-full flex items-center">
    <div className="relative w-4/12 h-[27vh] bg-bg-pri bg-cover bg-center mr-1 rounded-md" style={{ backgroundImage: "url('./../../../public/matrixgif.gif')" }}>
  <div className="bg-gray-900 w-10 h-10 z-20 absolute top-2 right-2 rounded"><IconButton aria-label="edit image">
  <EditIcon className="stroke-white"/></IconButton></div>
</div>




      <div className=" w-7/12 h-[27vh] z-10 ml-1 text-white rounded-md flex flex-col justify-start relative">
        <div className="text-4xl w-full mx-4">Introduction to React</div>
        <div className="text-base text-slate-300 w-full m-4">Get started with React in this crash course. We will be building a task tracker app and look at components, props, state, hooks, working with an API and more.</div>
        <div className="text-1xl text-slate-300 w-full mx-4 absolute bottom-0 lef ">3 Weeks Ago</div>
      </div>

      <div className=" w-1/12 h-[27vh] z-10 ml-1 text-white rounded-md flex flex-col justify-start">
        <div>
        <IconButton aria-label="edit image">
  <EditIcon className="stroke-white"/></IconButton>
        </div>
        <div className="h-2"></div>
        <div><IconButton aria-label="edit image">
  <EditIcon className="stroke-white"/></IconButton></div>
      </div>
      
    </div>
    <div className="w-full mt-auto">
      <div className="flex">
        <div className="w-2/12 h-[5vh] z-10 m-1 rounded-md flex items-center justify-center"><Button variant="outlined" className="w-[100%] h-[100%] !border-bg-alt !text-white">COPY EMBED</Button></div>
        <div className="bg-bg-pri w-10/12 h-[5vh] z-10 m-1 rounded-md flex items-center justify-center "></div>

        
      </div>
      <div className="flex">
      <div className="w-2/12 h-[5vh] z-10 m-1 rounded-md flex items-center justify-center"><Button variant="outlined" className="w-[100%] h-[100%] !border-bg-sec !text-white">COPY LINK</Button></div>
        <div className="bg-bg-pri w-10/12 h-[5vh] z-10 m-1 rounded-md flex items-center justify-center"></div>

      </div>
    </div>
  </div>
  )
}

export default ListItem