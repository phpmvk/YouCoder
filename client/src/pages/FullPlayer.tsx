import React from 'react';
import { PlaybackEditor } from '../components/PlaybackEditor';
import TopNavBar from '../components/HomePageComponents/TopNavBar';
import YouCoderHeading from '../components/YouCoderHeading';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Chip } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { Recording } from '../types/Creator';
import ButtonGroup from '@mui/material';

interface FullPlayerPageProps {
  recordingData: Recording;
}

const recording = {
  title: 'Javascript Functions Explained Pt. 2',
  description:
    'Today we will continue our lesson to dive deeper into Javascript functions! 🔥🔥 We will cover different types of loops and different methods of reaching a solution. If you enjoy my series of videos please subscribe to my channel 😀',
  creator: 'Michael ',
  subs: '2.3K',
};

const FullPlayerPage: React.FC<FullPlayerPageProps> = ({ recordingData }) => {
  return (
    
    <div className="min-h-screen bg-bg-pri min-w-[720px]">
      
      <div>
        <TopNavBar />

        <div className="bg-bg-pri relative flex justify-center items-center overflow-y-scroll overflow-x-hidden ">
          <div className=" bg-bg-gptdark border-solid mx-2 pt-4 top-[20px] overflow-y-scroll border border-gray-600  rounded-2xl">
            
            {/* className="border border-bg-pri rounded-xl pt-2 */}
            <PlaybackEditor recordingData={recordingData} />
            
            <div className="w-full bg-bg-gptdark bottom-[20px] mt-[10px] rounded-lg mx-auto px-5 pr-10">
              <div className="bg-bg-pri ml-5 py-4 -mt-10 pl">
              <div className="text-center">
                {/* small title */}
               
                <div className="text-gray-200 text-4xl text-left pb-6 px-4 mx-5 mt-5 ">
                  {recording.title}
                </div>
                 <div className="bg-gpt-dark flex flex-row">
                  
                 
                    
                    


                   

                    

                      <div className="flex flex-row bg-bg-pri w-[500px]">

<div
                      className="ml-16 mr-5 pic h-[80px] w-[80px] flex-shrink-0 rounded-3xl border-2 border-bg-alt bg-cover bg-center bg-red-900"
                      style={{
                        backgroundImage: `url(./../../public/avatar.webp)`,
                      }}
                    ></div>

<div className=" h-fit py-1 flex-shrink-0 rounded-lg text-gray-200 text-xl  flex flex-col justify-left  align-middle mx-5">
                      {recording.creator}
<Chip
                        className="!bg-white/10 !text-gray-200 !text-sm !stroke-white !rounded-sm"
                        label={`${recording.subs} Subscribers `}
                      />
                    </div>

<div className="my-auto">







                      <Button
                        variant="outlined"
                        size="small"
                        className="!rounded-xl !border-bg-alt !text-gray-200 align-middle h-1/2"
                      >
                        <AddIcon />
                        Subscribe
                      </Button>
                      </div>


<div className="my-auto justify-end ml-20">
  

<div className="inline-flex rounded-md shadow-sm whitespace-nowrap" role="group">
  <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
  <ReplyIcon className="transform scale-x-[-1] mx-2" />
    SHARE
  </button>
  <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
  <AddIcon />
    ADD TO LIST
  </button>
  <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
    <svg aria-hidden="true" className="w-4 h-4 mr-2 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z" clipRule="evenodd"></path></svg>
    Downloads
  </button>
</div>

                    {/* <Stack className="" direction="row" spacing={3}>

                      <Button
                        variant="outlined"
                        size="small"
                        className="!rounded-xl !border-bg-alt !text-gray-200 whitespace-nowrap h-1/2 align-middle"
                      >
                        <ReplyIcon className="transform scale-x-[-1]" />
                        share
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        className="!rounded-xl !border-bg-alt !text-gray-200 whitespace-nowrap h-1/2 align-middle"
                      >
                        <ReplyIcon className="transform scale-x-[-1]" />
                        share
                      </Button>
                      
                      <Button
                        variant="outlined"
                        size="small"
                        className="!rounded-xl !border-bg-alt !text-gray-200 whitespace-nowrap h-1/2"
                      >
                        <AddIcon />
                        add to list
                      </Button>
</Stack> */}








                      {/* <Button
                        variant="outlined"
                        size="small"
                        className="!rounded-full !border-bg-alt !text-gray-200 whitespace-nowrap h-1/2"
                      >
                        <AddIcon />
                        X Button ❤️
                      </Button> */}
                      {/* <button className="whitespace-nowrap relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-bg-sec to-bg-alt group-hover:bg-bg-sec hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-bg-alt">
  <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Purple to blue
  </span>
</button> */}
                    
                    </div>


                    </div>
                    







                 {/* <div className="bg-bg-gptdark px-4 pt-2 md:hidden w-full  ">
                    <Stack className="px-8" direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        className="!rounded-full !border-bg-alt !text-gray-200 whitespace-nowrap"
                      >
                        <ReplyIcon className="transform scale-x-[-1]" />
                        share
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        className="!rounded-full !border-bg-alt !text-gray-200 whitespace-nowrap"
                      >
                        <AddIcon />
                        add to list
                      </Button>
                    </Stack>
                    <div className="bg-bg-gptdark text-gray-200 text-l text-left pt-6 px-6 w-full">
                      {recording.description}
                    </div>
                  </div> */}
                 </div>
<div className="w-full h-[200px] bg-bg-gptdark">

<div className=" bg-bg-pri text-gray-200 text-l text-left p-4 pl-10  pb-10 mt-4 rounded-b-xl">
                      {recording.description}
                    </div>




</div>




</div>



                 
                {/* <div className="text-gray-200 text-3xl whitespace-nowrap pb-2 pt-4 max-w-[30ch] text-ellipsis overflow-hidden mx-auto md:hidden">{recording.title}</div> */}
                <div className="flex md:flex-row">
                  {/* <div className="bg-bg-gptdark w-[200px] md:min-h-[400px] rounded-lg ml-2 sm:h-[250px]"> */}
                    

                    {/* <Stack className="mx-8" direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        size="small"
                        className="!rounded-full !border-bg-alt !text-gray-200"
                      >
                        <AddIcon />
                        Subscribe
                      </Button>
                      <Chip
                        className="!bg-white/10 !text-gray-200 !text-sm !stroke-white !rounded-sm"
                        label={`${recording.subs} Subscribers `}
                      />
                    </Stack>
                    <div className=" h-fit p-3 py-4 w-full flex-shrink-0 rounded-lg text-gray-200 text-xl  flex justify-center items-center">
                      {recording.creator}
                    </div> */}
                    

                    {/* <div className="bg-bg-gptdark mt-6 mx-8 xl:hidden max-720:hidden max-md:hidden  max-h-[200px] ">
                      <Stack direction="column" spacing={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          className="!rounded-full !border-bg-alt !text-gray-200 whitespace-nowrap"
                        >
                          <ReplyIcon className="transform scale-x-[-1]" />
                          share
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          className="!rounded-full !border-bg-alt !text-gray-200 whitespace-nowrap"
                        >
                          <AddIcon />
                          add to list
                        </Button>
                      </Stack>
                    </div> */}
                  {/* </div> */}

                  {/* <div className="bg-bg-gptdark px-4 pt-2 md:hidden w-full  ">
                    <Stack className="px-8" direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        className="!rounded-full !border-bg-alt !text-gray-200 whitespace-nowrap"
                      >
                        <ReplyIcon className="transform scale-x-[-1]" />
                        share
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        className="!rounded-full !border-bg-alt !text-gray-200 whitespace-nowrap"
                      >
                        <AddIcon />
                        add to list
                      </Button>
                    </Stack>
                    <div className="bg-bg-gptdark text-gray-200 text-l text-left pt-6 px-6 w-full">
                      {recording.description}
                    </div>
                  </div> */}
                </div>

                <div className="ml-6 bg-bg-gptdark ">
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        {/* <div className="text-gray-200 lg:text-4xl md:text-3xl max-sm:hidden max-md:hidden  whitespace-nowrap p- max-w-[30ch] text-ellipsis overflow-hidden text-center">
                          {recording.title}
                        </div> */}
                      </div>
{/* largest size */}
                      {/* <div className="bg-bg-gptdark p-4 hidden xl:flex xl:items-center">
                        <Stack direction="row" spacing={1}>
                         
                          <Button
                            variant="outlined"
                            size="small"
                            className="!rounded-full !border-bg-alt !text-gray-200 whitespace-nowrap"
                          >
                            <ReplyIcon className="transform scale-x-[-1]" />
                            share
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            className="!rounded-full !border-bg-alt !text-gray-200 whitespace-nowrap"
                          >
                            <AddIcon />
                            add to list
                          </Button>
                        </Stack>
                      </div> */}
                    </div>
                  </div>

                  <div>
                    {/* <div className="max-md:hidden bg-bg-gptdark text-gray-200 text-l text-left p-4 w-full">
                      {recording.description}
                    </div> */}
                    {/* <div className="h-[50px] w-1/3 rounded-lg p-2"></div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPlayerPage;
