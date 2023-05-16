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
import { toast } from 'react-toastify';

interface FullPlayerPageProps {
  recordingData: Recording;
}

const recording = {
  // title: 'Javascript Functions Explained Pt. 2',
  description:
    'Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson Today we will continue our lesson ',
  creator: 'Michael ',
  subs: '2.3K',
};



const FullPlayerPage: React.FC<FullPlayerPageProps> = ({ recordingData }) => {
  return (
    <div className='min-h-screen bg-bg-pri min-w-[720px] px-20 flex flex-col justify-center items-center'>
      <div>
        <TopNavBar />

        <div className='bg-bg-pri relative flex justify-center items-center overflow-y-scroll overflow-x-hidden hide-scrollbar pt-4 max-w-[1600px]'>
          <div className=' bg-bg-pri border-solid mx-2 pt-4 top-[20px] mb-20 pb-0 overflow-y-scroll border border-gray-600  rounded-2xl hide-scrollbar'>
            {/* className="border border-bg-pri rounded-xl pt-2 */}
            <PlaybackEditor theme='dark' recordingData={recordingData} />

            <div className='w-full bg-bg-pri h-auto mt-[15px] mx-auto '>
              <div className='bg-bg-pri mx-4 pt-2 -mt-10'>
                <div className=''>
                  {/* title */}

                  <div className='text-gray-200 text-4xl text-left pb-6 mx-2 mt-2 '>
                    {recordingData.title}
                  </div>
                  <div className='bg-bg-pri flex flex-row'>
                    <div className='flex flex-row bg-bg-pri w-full h-[250px]'>
                      {/* ---------Left Card */}
                      <div className='flex flex-col items-center mx-1 min-w-36 max-w-[20vw] '>
  <div className='h-36 w-36 border border-gray-700 rounded-xl shadow bg-bg-pri flex items-center justify-center mb-7'>
    <div className='flex flex-col items-center'>
      <img
        className='w-20 h-20 !min-w-20 mb-3 rounded-full shadow-lg'
        src={recordingData.creator!.picture}
        alt=''
      />
      <h5 className=' text-xl font-medium text-white'>
        {recordingData.display_name}
      </h5>
    </div>
  </div>
  <Button
    variant='outlined'
    size='small'
    onClick={(e) => {
      navigator.clipboard.writeText(recordingData.full_link);
      toast.success('Link copied to clipboard');
    }}
    className='!rounded-lg !bg-bg-muigrey !border-gray-700 w-36 !text-gray-100 whitespace-nowrap h-8 align-middle active:ring-1 active:ring-bg-alt hover:!bg-gray-700 mt-4'
  >
    {/* <ReplyIcon className='transform scale-x-[-1]' /> */}
    copy link
  </Button>
</div>



                      {/* Middle Card -----------------------------------   */}

                      <div className='flex-col mx-1 min-w-[60vw] max-w-[1000px] w-full py-4 ml-4 h-56 text-left  border rounded-xl shadow bg-bg-pri border-gray-700 overflow-hidden text-white'>
                        <div className='flex justify-start px-5 pt-1  md:h-full overflow-y-scroll scrollbar-hide'>
                          <p>
                            {recordingData.description}
                          </p>
                        </div>
                        {/* <div className='py-8 md:hidden'>
                          <Stack
                            className='mx-auto max-w-sm'
                            direction='row'
                            spacing={2}
                          >
                            <Button
                              variant='outlined'
                              size='small'
                              className='!rounded-xl !bg-bg-muigrey !border-gray-700 !min-w-[120px] !text-gray-100 whitespace-nowrap h-1/2 align-middle active:ring-1 active:ring-bg-alt hover:!bg-gray-700'
                            >
                              <ReplyIcon className='transform scale-x-[-1]' />
                              share
                            </Button>

                            <Button
                              variant='outlined'
                              size='small'
                              className='!rounded-xl !bg-bg-muigrey !border-gray-700 !min-w-[120px] !text-gray-100 whitespace-nowrap h-1/2 align-middle active:ring-1 active:ring-bg-alt hover:!bg-gray-700'
                            >
                              <AddIcon />
                              add to list
                            </Button>
                          </Stack>
                        </div> */}
                      </div>

                      {/* ------Right Side Card */}

                      {/* <div className='hidden md:block mx-2 min-w-[150px] lg:min-w-[200px] w-[20vw] max-w-[20vw] md:px-10 sm:px-auto h-56 border rounded-xl shadow bg-bg-pri border-gray-700'>
                        <div className='flex py-5 sm:px-0 justify-center items-center h-full'>
                          <Stack
                            className='mx-auto max-w-sm'
                            direction='column'
                            spacing={2}
                          >
                            <Button
                              variant='outlined'
                              size='small'
                              className='!rounded-xl !bg-bg-muigrey !border-gray-700 !min-w-[120px] !text-gray-100 whitespace-nowrap h-1/2 align-middle active:ring-1 active:ring-bg-alt hover:!bg-gray-700'
                            >
                              <ReplyIcon className='transform scale-x-[-1]' />
                              share
                            </Button> */}

                            {/* <Button
                              variant='outlined'
                              size='small'
                              className='!rounded-xl !bg-bg-muigrey !border-gray-700 !min-w-[120px] !text-gray-100 whitespace-nowrap h-1/2 align-middle active:ring-1 active:ring-bg-alt hover:!bg-gray-700'
                            >
                              <AddIcon />
                              add to list
                            </Button> */}
                          {/* </Stack>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  {/* <div className='flex  w-1/4 text-left mx-2  bg-bg-pri  text-3xl text-gray-200'>
                    <div className='flex justify-end pb-4'>
                      Code
                      <p className='overflow-ellipsis '></p>
                    </div>
                  </div> */}
                  {/* code block------ */}
                  {/* <div className='flex max-w-full mx-2 px-2 mb-6 h-full text-left  border rounded-xl shadow bg-bg-pri border-gray-700 overflow-hidden overflow-y-scroll overflow-x-scroll text-white'>
                    <div className='flex justify-end mx-2 pt-4'>
                      <p className='overflow-ellipsis '>
                        <div>
                          <pre>
                            <code>{JavaScriptSnippet}</code>
                          </pre>
                        </div>
                      </p>
                    </div>
                  </div> */}
                </div>

                <div className='flex md:flex-row'></div>

                <div className='ml-6 bg-bg-pri '>
                  <div className='flex flex-col w-full'>
                    <div className='flex justify-between items-start'>
                      <div className='flex flex-col'></div>
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
