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
import { MultiEditorPlayback } from '../components/MultiEditorPlayback';

interface FullPlayerPageProps {
  recordingData: Recording;
}

const recording = {
  title: 'Javascript Functions Explained Pt. 2',
  description:
    'Today we will continue our lesson to dive deeper into Javascript functions! 🔥🔥 We will cover different types of loops and different methods of reaching a solution. If you enjoy my series of videos please subscribe to my channel 😀 ',
  creator: 'Michael ',
  subs: '2.3K',
};

const JavaScriptSnippet = `
// Simple addition function
function add(a, b) {
    return a + b;
}

// Simple subtraction function
function subtract(a, b) {
    return a - b;
}

// Simple multiplication function
function multiply(a, b) {
    return a * b;
}

// Simple division function
function divide(a, b) {
    if(b != 0) {
        return a / b;
    } else {
        console.log("Error: Division by zero is undefined");
        return null;
    }
}

// Function to calculate the factorial of a number
function factorial(n) {
    if(n &lt; 0) {
        console.log("Error: Factorial for negative numbers is undefined");
        return null;
    } else if(n == 0) {
        return 1;
    } else {
        let result = 1;
        for(let i = 1; i &lt;= n; i++) {
            result = result * i;
        }
        return result;
    }
}

// Function to calculate the square of a number
function square(n) {
    return n * n;
}

// Function to calculate the cube of a number
function cube(n) {
    return n * n * n;
}

// Function to calculate the square root of a number
function sqrt(n) {
    if(n &lt; 0) {
        console.log("Error: Square root of negative numbers is undefined in real numbers");
        return null;
    } else {
        return Math.sqrt(n);
    }
}

// Function to calculate the cube root of a number
function cbrt(n) {
    return Math.cbrt(n);
}

// Function to calculate power of a number
function power(base, exponent) {
    return Math.pow(base, exponent);
}


`;

const FullPlayerPage: React.FC<FullPlayerPageProps> = ({ recordingData }) => {
  return (
    <div className="min-h-screen bg-bg-pri min-w-[720px]">
      <div>
        <TopNavBar />

        <div className="bg-bg-pri relative flex justify-center items-center overflow-y-scroll overflow-x-hidden ">
          <div className=" bg-bg-pri border-solid mx-2 pt-4 top-[20px] mb-20 pb-0 overflow-y-scroll border border-gray-600  rounded-2xl">
            {/* className="border border-bg-pri rounded-xl pt-2 */}
            <PlaybackEditor recordingData={recordingData} />

            <div className="w-full bg-bg-pri h-auto mt-[15px] mx-auto ">
              <div className="bg-bg-pri mx-4 pt-2 -mt-10">
                <div className="">
                  {/* title */}

                  <div className="text-gray-200 text-4xl text-left pb-6 mx-2 mt-2 ">
                    {recording.title}
                  </div>
                  <div className="bg-bg-pri flex flex-row">
                    <div className="flex flex-row bg-bg-pri w-full h-[250px]">
                      {/* ---------Left Card */}
                      <div className=" mx-2 min-w-[200px] max-w-[20vw] px-10 h-56  border border-gray-700 rounded-xl shadow bg-bg-pri">
                        {/* <div className="flex justify-end px-4 pt-4"></div> */}
                        <div className="flex flex-col items-center">
                          <img
                            className="w-20 h-20 !min-w-20 mb-3 rounded-xl shadow-lg"
                            src="./../../public/avatar.webp"
                            alt=""
                          />
                          <h5 className=" text-xl font-medium text-white">
                            {recording.creator}
                          </h5>
                          <Chip
                            className=" !text-gray-300 !text-sm  !min-w-[140px] w-full"
                            label={`${recording.subs} Subscribers `}
                          />
                          <div className="flex space-x-3 mt-2">
                            <Button
                              variant="outlined"
                              size="small"
                              className="!rounded-xl !bg-bg-muigrey !border-gray-700 !min-w-[120px] !text-gray-100 whitespace-nowrap h-1/2 align-middle active:ring-1 active:ring-bg-alt hover:!bg-gray-700"
                            >
                              <AddIcon />
                              Subscribe
                            </Button>
                          </div>
                        </div>
                      </div>
                      {/* Middle Card -----------------------------------   */}

                      <div className="flex-col mx-2 w-full py-4 h-56 text-left  border rounded-xl shadow bg-bg-pri border-gray-700 overflow-hidden text-white">
                        <div className="flex justify-end px-4 pt-4 h-28 md:h-full overflow-y-scroll">
                          <p className="overflow-ellipsis ">
                            {recording.description}
                          </p>
                        </div>
                        <div className="py-8 md:hidden">
                          <Stack
                            className="mx-auto max-w-sm"
                            direction="row"
                            spacing={2}
                          >
                            <Button
                              variant="outlined"
                              size="small"
                              className="!rounded-xl !bg-bg-muigrey !border-gray-700 !min-w-[120px] !text-gray-100 whitespace-nowrap h-1/2 align-middle active:ring-1 active:ring-bg-alt hover:!bg-gray-700"
                            >
                              <ReplyIcon className="transform scale-x-[-1]" />
                              share
                            </Button>

                            <Button
                              variant="outlined"
                              size="small"
                              className="!rounded-xl !bg-bg-muigrey !border-gray-700 !min-w-[120px] !text-gray-100 whitespace-nowrap h-1/2 align-middle active:ring-1 active:ring-bg-alt hover:!bg-gray-700"
                            >
                              <AddIcon />
                              add to list
                            </Button>
                          </Stack>
                        </div>
                      </div>

                      {/* ------Right Side Card */}

                      <div className="hidden md:block mx-2 min-w-[150px] lg:min-w-[200px] w-[20vw] max-w-[20vw] md:px-10 sm:px-auto h-56 border rounded-xl shadow bg-bg-pri border-gray-700">
                        <div className="flex py-5 sm:px-0 justify-center items-center h-full">
                          <Stack
                            className="mx-auto max-w-sm"
                            direction="column"
                            spacing={2}
                          >
                            <Button
                              variant="outlined"
                              size="small"
                              className="!rounded-xl !bg-bg-muigrey !border-gray-700 !min-w-[120px] !text-gray-100 whitespace-nowrap h-1/2 align-middle active:ring-1 active:ring-bg-alt hover:!bg-gray-700"
                            >
                              <ReplyIcon className="transform scale-x-[-1]" />
                              share
                            </Button>

                            <Button
                              variant="outlined"
                              size="small"
                              className="!rounded-xl !bg-bg-muigrey !border-gray-700 !min-w-[120px] !text-gray-100 whitespace-nowrap h-1/2 align-middle active:ring-1 active:ring-bg-alt hover:!bg-gray-700"
                            >
                              <AddIcon />
                              add to list
                            </Button>
                          </Stack>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex  w-1/4 text-left mx-2  bg-bg-pri  text-3xl text-gray-200">
                    <div className="flex justify-end pb-4">
                      Code
                      <p className="overflow-ellipsis "></p>
                    </div>
                  </div>
                  {/* code block------ */}
                  <div className="flex max-w-full mx-2 px-2 mb-6 h-full text-left  border rounded-xl shadow bg-bg-pri border-gray-700 overflow-hidden overflow-y-scroll overflow-x-scroll text-white">
                    <div className="flex justify-end mx-2 pt-4">
                      <p className="overflow-ellipsis ">
                        <div>
                          <pre>
                            <code>{JavaScriptSnippet}</code>
                          </pre>
                        </div>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-row"></div>

                <div className="ml-6 bg-bg-pri ">
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
