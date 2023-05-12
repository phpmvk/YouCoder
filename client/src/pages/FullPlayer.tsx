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
          <div className=" bg-bg-pri border-solid mx-2 pt-4 top-[20px] overflow-y-scroll border border-gray-600  rounded-2xl">
            {/* className="border border-bg-pri rounded-xl pt-2 */}
            <PlaybackEditor recordingData={recordingData} />

            <div className="w-full bg-bg-pri bottom-[20px] mt-[10px] rounded-lg mx-auto px-5 pr-10">
              <div className="bg-bg-pri ml-5 pt-4 -mt-10 pl">
                <div className="text-center">
                  {/* small title */}

                  <div className="text-gray-200 text-4xl text-left pb-6 px-4 mx-5 mt-5 ">
                    {recording.title}
                  </div>
                  <div className="bg-bg-pri flex flex-row">
                    <div className="flex flex-row bg-bg-pri w-full h-[250px]">




                    <div className=" mx-2 w-[20vw] px-10 h-56 max-w-sm bg-white border border-gray-200 rounded-xl shadow dark:bg-bg-pri dark:border-gray-700">
    <div className="flex justify-end px-4 pt-4">
        
        
      
    </div>
    <div className="flex flex-col items-center pb-10">
        <img className="w-20 h-20 mb-3 rounded-xl shadow-lg" src="./../../public/avatar.webp" alt=""/>
        <h5 className=" text-xl font-medium text-gray-900 dark:text-white">{recording.creator}</h5>
        <Chip
                          className="!bg-white/10 !text-gray-200 !text-sm !stroke-white !rounded-none w-full"
                          label={`${recording.subs} Subscribers `}
                        />
        <div className="flex space-x-3 mt-2">
        <Button
                          variant="outlined"
                          size="small"
                          className="!rounded-xl !border-bg-alt !text-gray-200 align-middle h-1/2"
                        >
                          <AddIcon />
                          Subscribe
                        </Button>
            
        </div>
    </div>
</div>
{/* second -----------------------------------   */}

<div className="flex mx-2 w-full py-4 h-56 left bg-white border border-gray-200 rounded-xl shadow dark:bg-bg-pri dark:border-gray-700 overflow-hidden text-white">
    <div className="flex justify-end px-4 pt-4">
        <p className="overflow-ellipsis ">{recording.description}{recording.description}</p>
    </div>
</div>

{/* ------third */}

<div className=" mx-2 w-[20vw] px-10 h-56 max-w-sm bg-white border border-gray-200 rounded-xl shadow dark:bg-bg-pri dark:border-gray-700">
    <div className="flex py-5">
        
    
                        <Stack className="mx-auto" direction="column" spacing={2}>
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
                          <Button
                            variant="outlined"
                            size="small"
                            className="!rounded-xl !border-bg-alt !text-gray-200 whitespace-nowrap h-1/2"
                          >
                            <AddIcon />
                            add to list
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


{/* <div className=" mx-10 w-full px-10 h-56 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-red-800 dark:border-gray-700">
    <div className="flex justify-end px-4 pt-4">
        
        
      
    </div>
    <div className="flex flex-col items-center pb-10">
        <img className="w-20 h-20 mb-3 rounded-xl shadow-lg" src="./../../public/avatar.webp" alt=""/>
        <h5 className=" text-xl font-medium text-gray-900 dark:text-white">{recording.creator}</h5>
        <Chip
                          className="!bg-white/10 !text-gray-200 !text-sm !stroke-white !rounded-none"
                          label={`${recording.subs} Subscribers `}
                        />
        <div className="flex space-x-3 mt-2">
        <Button
                          variant="outlined"
                          size="small"
                          className="!rounded-xl !border-bg-alt !text-gray-200 align-middle h-1/2"
                        >
                          <AddIcon />
                          Subscribe
                        </Button>
            
        </div>
    </div>
</div> */}


{/* <div className=" bg-bg-sec text-gray-200 text-l text-left p-4  pb-10 mt-4 rounded-b-xl w-full">
                      {recording.description}
                    </div> */}









                      {/* <div
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
                      </div> */}






                      

                      {/* <div className="my-auto justify-end pl-10">
                        <Stack className="mx-10" direction="column" spacing={3}>
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
                      </div> */}
                    </div>
                    
                  </div>
                  <div className="flex  w-full  px-4 text-left  bg-bg-pri  overflow-hidden overflow-y-scroll text-3xl text-gray-200">
    <div className="flex justify-end px-4 py-2">Code
        <p className="overflow-ellipsis ">


       





          
        </p>
    </div>
</div>
{/* code block------ */}
                  <div className="flex  w-4/5 mx-2  h-full text-left bg-white border border-gray-200 rounded-xl shadow dark:bg-bg-pri dark:border-gray-700 overflow-hidden overflow-y-scroll text-white">
    <div className="flex justify-end px-4 pt-4">
        <p className="overflow-ellipsis ">


        <div>
      <pre>
        <code>{JavaScriptSnippet}</code>
      </pre>
    </div>





          
        </p>
    </div>
</div>
                  <div className="w-full h-[150px] bg-bg-pri">
                    {/* <div className="w-full bg-bg-sec text-gray-200 text-l text-left p-4 pl-10  pb-10 mt-4 rounded-b-xl">
                      {recording.description}
                    </div> */}
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
