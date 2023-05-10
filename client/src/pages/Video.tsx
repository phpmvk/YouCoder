import React from 'react';
import { PlaybackEditor } from '../components/PlaybackEditor';
import TopNavBar from '../components/HomePageComponents/TopNavBar';
import YouCoderHeading from '../components/YouCoderHeading';


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
      <div className=" bg-white scale-85 border-solid p-2 mx-auto top-[20px] mb-1 rounded-lg overflow-y-scroll pb-[250px]">
        <PlaybackEditor />
        <div className="w-full bg-gray-800 h-[120px] bottom-[20px] mt-[10px] rounded-lg">
          <div className="flex h-full">
            <div className="flex justify-center items-center">
              {/* Black div wrapper */}
              <div className="bg-gray-800 w-[200px] h-[120px] rounded-lg ">
                <img className="fixed bg-green-500 h-[80px] p-4 w-[80px] flex-shrink-0 mt-1 ml-[60px] rounded-full border-2 border-bg-alt"></img>
                <div className="bg-gray-700 h-[40px] p-3 w-full flex-shrink-0 mt-20 rounded-lg text-gray-200 text-xl flex justify-center items-center">
                  {recording.creator}
                </div>
              </div>
              {/* End of black div wrapper */}
            </div>
            <div className="flex flex-col justify-between w-11/12">
              <div className="text-white text-4xl p-4">{recording.title}</div>
              <div className="text-white text-xl p-4">{recording.description}</div>
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
