import React from "react";
import { PlaybackEditor } from "../components/PlaybackEditor";
import TopNavBar from "../components/HomePageComponents/TopNavBar";
import YouCoderHeading from "../components/YouCoderHeading";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Chip } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { Recording } from "../types/Creator";
import ButtonGroup from "@mui/material";

interface FullPlayerPageProps {
  recordingData: Recording;
}

const recording = {
  title: "Javascript Functions Explained Pt. 2",
  description:
    "Today we will continue our lesson to dive deeper into Javascript functions! 🔥🔥 We will cover different types of loops and different methods of reaching a solution. If you enjoy my series of videos please subscribe to my channel 😀",
  creator: "Michael ",
  subs: "2.3K",
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
              <div className="bg-bg-pri ml-5 pt-4 -mt-10 pl">
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

                      <div className="my-auto justify-end pl-10">
                        <Stack className="mx-10" direction="row" spacing={3}>
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
                        </Stack>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[150px] bg-bg-gptdark">
                    <div className=" bg-bg-pri text-gray-200 text-l text-left p-4 pl-10  pb-10 mt-4 rounded-b-xl">
                      {recording.description}
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-row"></div>

                <div className="ml-6 bg-bg-gptdark ">
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col"></div>
                    </div>
                  </div>

                  <div></div>
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
