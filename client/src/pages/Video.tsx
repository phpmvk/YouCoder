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


interface VideoPageProps {}


const recording = {title: 'Javascript Functions Explained Pt. 2',
description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
creator: 'Someones Long Name',
subs: '2.3K'};
 

const VideoPage: React.FC<VideoPageProps> = ({}) => {
  return (
    <div className="min-h-screen bg-bg-pri">
  <div>
    <TopNavBar />
    




    <div className="bg-bg-pri relative flex justify-center items-center overflow-y-scroll">
      <div className=" bg-bg-gptdark scale-85 border-solid p-2 mx-auto  top-[20px] mb-1 rounded-lg overflow-y-scroll pb-[10px]">
        <PlaybackEditor />
        
        <div className="w-full bg-bg-gpt-dark h-[400px] bottom-[20px] mt-[10px] rounded-lg">















          <div className="bg-yellow-200 flex flex-col md:flex-row h-full md:min-w-full">
            
              



              <div className="flex md:flex-row">
              <div className="bg-green-400 w-[200px] h-[400px] rounded-lg ml-2">
              <div className="h-[100px] w-[100px] flex-shrink-0 mt-1 ml-[50px] rounded-full border-2 border-bg-alt bg-cover bg-center bg-red-900" style={{ backgroundImage: `url(./../../public/avatar.webp)` }}></div>
                <div className=" h-[40px] p-3 w-full flex-shrink-0 rounded-lg text-white text-xl whitespace-nowrap flex justify-center items-center">
                  {recording.creator}
                </div>
                <Stack direction="column" spacing={2}>

      
                <Button variant="outlined" size="small" className="!rounded-full !border-bg-alt !text-white">
            <AddIcon />
            Subscribe
          </Button>
      <Chip className="!bg-white/10 !text-white !text-sm !stroke-white !rounded-sm" label={`${recording.subs} Subscribers `} />
    </Stack>       
      </div>




<div className="bg-orange-300 p-8 md:hidden w-full ">
        <Stack direction="column" spacing={1}>
          <Button variant="outlined" size="small" className="!rounded-full !border-bg-alt !text-white whitespace-nowrap">
            <FaceIcon />
            button
          </Button>
          <Button variant="outlined" size="small" className="!rounded-full !border-bg-alt !text-white whitespace-nowrap">
            <ReplyIcon className="transform scale-x-[-1]"/>
            share
          </Button>
          <Button variant="outlined" size="small" className="!rounded-full !border-bg-alt !text-white whitespace-nowrap">
            <AddIcon />
            add to list
          </Button>
        </Stack>
        </div>
</div>



           
            <div className="ml-6 bg-red-300 ">
  <div className="flex flex-col w-full">
    <div className="flex justify-between items-start">
      <div className="flex flex-col">
        <div className="text-white lg:text-4xl sm:text-2xl md:text-2xl  whitespace-nowrap p-4">{recording.title}</div>
      </div>


      <div className="bg-orange-300 p-4 hidden md:flex md:items-center">
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small" className="!rounded-full !border-bg-alt !text-white whitespace-nowrap">
            <FaceIcon />
            button
          </Button>
          <Button variant="outlined" size="small" className="!rounded-full !border-bg-alt !text-white whitespace-nowrap">
            <ReplyIcon className="transform scale-x-[-1]"/>
            share
          </Button>
          <Button variant="outlined" size="small" className="!rounded-full !border-bg-alt !text-white whitespace-nowrap">
            <AddIcon />
            add to list
          </Button>
        </Stack>
      </div>
</div>

    </div>

     <div>
    <div className="bg-bg-gptdark text-gray-200 text-l p-4 w-full">{recording.description}</div>
    <div className="h-[50px] w-1/3 rounded-lg p-2"></div>
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

export default VideoPage;
