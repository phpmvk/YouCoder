import React from 'react';
import { PlaybackEditor } from '../components/PlaybackEditor';
import TopNavBar from '../components/HomePageComponents/TopNavBar';
import YouCoderHeading from '../components/YouCoderHeading';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface VideoPageProps {}


const recording = {title: 'Javascript Functions',
description: 'Follow me as I explain all-things JavaScript',
creator: 'Someones Name',};
 

const VideoPage: React.FC<VideoPageProps> = ({}) => {
  return (
    <div className="min-h-screen bg-bg-pri">
  <div>
    <TopNavBar />
    

    <div className="bg-bg-pri relative flex justify-center items-center p-5 overflow-y-scroll">
      <div className=" bg-gray-600 scale-85 border-solid p-2 mx-auto top-[20px] mb-1 rounded-lg overflow-y-scroll pb-[10px]">
        <PlaybackEditor />
        <div className="w-full bg-gray-700 h-[400px] bottom-[20px] mt-[10px] rounded-lg">
          <div className="flex h-full">
            <div className="flex justify-center items-center">
              {/* Black div wrapper */}
              <div className="bg-gray-600 w-[200px] h-[400px] rounded-l-lg ">
              <div className="h-[100px] w-[100px] flex-shrink-0 mt-1 ml-[50px] rounded-full border-2 border-bg-alt bg-cover bg-center bg-red-900" style={{ backgroundImage: `url(./../../public/avatar.webp)` }}></div>
                <div className=" h-[40px] p-3 w-full flex-shrink-0 rounded-lg text-white text-xl flex justify-center items-center">
                  {recording.creator}
                </div>
              </div>
              {/* End of black div wrapper */}
            </div>
            
            <div className="flex flex-col w-11/12">
              <div className="text-white text-4xl p-4">{recording.title}</div>
              <div className="text-gray-200 text-l p-4 mt-8">{recording.description}</div>
              
            </div>
            <div className="h-[50px] w-1/3 rounded-lg p-2 ">

            
            <Stack direction="row" spacing={1}>
<Button variant="contained" size="small" className="!rounded-full !bg-gray-800"><FaceIcon />button</Button>
<Button variant="contained" size="small" className="!rounded-full !bg-gray-800"><FaceIcon />button</Button>
<Button variant="contained" size="small" className="!rounded-full !bg-gray-800"><AddIcon />button</Button>
      {/* <Chip sx={{background:'lightgray', color:'black'}} icon={<FaceIcon />} label="With Icon" />
      <Chip icon={<FaceIcon />} label="With Icon" variant="outlined" />
      <Chip icon={<FaceIcon />} label="With Icon" /> */}
    </Stack> 


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
