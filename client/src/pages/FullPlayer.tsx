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

interface FullPlayerPageProps {}

const recording = {
  title: 'Javascript Functions Explained Longer Again AGAIN Pt. 2',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  creator: 'Michael ',
  subs: '2.3K',
};

const FullPlayerPage: React.FC<FullPlayerPageProps> = ({}) => {
  return (
    <div className='min-h-screen bg-bg-pri min-w-[720px]'>
      <div>
        <TopNavBar />

        <div className='bg-bg-pri relative flex justify-center items-center overflow-y-scroll overflow-x-hidden '>
          <div className=' bg-bg-gptdark border-solid p-2 mx-auto  pt-20 top-[20px] mb-1 rounded-lg overflow-y-scroll pb-[10px]'>
            <PlaybackEditor />

            <div className='w-full bg-bg-gpt-dark h-[400px] bottom-[20px] mt-[10px] rounded-lg'>
              <div className='bg-bg-gptdark flex flex-col md:flex-row h-full md:min-w-full text-center'>
                {/* small title */}
                <div className='text-white text-3xl text-left pb-2 pt-4 px-6 mx-auto md:hidden '>
                  {recording.title}
                </div>
                {/* <div className="text-white text-3xl whitespace-nowrap pb-2 pt-4 max-w-[30ch] text-ellipsis overflow-hidden mx-auto md:hidden">{recording.title}</div> */}
                <div className='flex md:flex-row'>
                  <div className='bg-bg-gptdark w-[200px] md:min-h-[400px] rounded-lg ml-2 sm:h-[250px]'>
                    <div
                      className='h-[100px] w-[100px] flex-shrink-0 mt-1 md:ml-[50px] sm:ml-[25px] rounded-full border-2 border-bg-alt bg-cover bg-center bg-red-900'
                      style={{
                        backgroundImage: `url(./../../public/avatar.webp)`,
                      }}
                    ></div>
                    <div className=' h-fit p-3 py-4 w-full flex-shrink-0 rounded-lg text-white text-xl  flex justify-center items-center'>
                      {recording.creator}
                    </div>
                    <Stack
                      className='px-auto'
                      direction='column'
                      spacing={2}
                    >
                      <Button
                        variant='outlined'
                        size='small'
                        className='!rounded-full !border-bg-alt !text-white'
                      >
                        <AddIcon />
                        Subscribe
                      </Button>
                      <Chip
                        className='!bg-white/10 !text-white !text-sm !stroke-white !rounded-sm'
                        label={`${recording.subs} Subscribers `}
                      />
                    </Stack>

                    <div className='bg-bg-gptdark mt-6 mx-auto xl:hidden max-720:hidden max-md:hidden w-full max-h-[200px] '>
                      <Stack
                        direction='column'
                        spacing={1}
                      >
                        <Button
                          variant='outlined'
                          size='small'
                          className='!rounded-full !border-bg-alt !text-white whitespace-nowrap'
                        >
                          <FaceIcon />
                          button
                        </Button>
                        <Button
                          variant='outlined'
                          size='small'
                          className='!rounded-full !border-bg-alt !text-white whitespace-nowrap'
                        >
                          <ReplyIcon className='transform scale-x-[-1]' />
                          share
                        </Button>
                        <Button
                          variant='outlined'
                          size='small'
                          className='!rounded-full !border-bg-alt !text-white whitespace-nowrap'
                        >
                          <AddIcon />
                          add to list
                        </Button>
                      </Stack>
                    </div>
                  </div>

                  <div className='bg-bg-gptdark px-4 pt-2 md:hidden w-full  '>
                    <Stack
                      className='px-8'
                      direction='row'
                      spacing={1}
                    >
                      <Button
                        variant='outlined'
                        size='small'
                        className='!rounded-full !border-bg-alt !text-white whitespace-nowrap'
                      >
                        <FaceIcon />
                        button
                      </Button>
                      <Button
                        variant='outlined'
                        size='small'
                        className='!rounded-full !border-bg-alt !text-white whitespace-nowrap'
                      >
                        <ReplyIcon className='transform scale-x-[-1]' />
                        share
                      </Button>
                      <Button
                        variant='outlined'
                        size='small'
                        className='!rounded-full !border-bg-alt !text-white whitespace-nowrap'
                      >
                        <AddIcon />
                        add to list
                      </Button>
                    </Stack>
                    <div className='bg-bg-gptdark text-gray-200 text-l text-left pt-6 px-6 w-full'>
                      {recording.description}
                    </div>
                  </div>
                </div>

                <div className='ml-6 bg-bg-gptdark '>
                  <div className='flex flex-col w-full'>
                    <div className='flex justify-between items-start'>
                      <div className='flex flex-col'>
                        <div className='text-white lg:text-4xl md:text-3xl max-sm:hidden max-md:hidden  whitespace-nowrap p-4 max-w-[30ch] text-ellipsis overflow-hidden text-center'>
                          {recording.title}
                        </div>
                      </div>

                      <div className='bg-bg-gptdark p-4 hidden xl:flex xl:items-center'>
                        <Stack
                          direction='row'
                          spacing={1}
                        >
                          <Button
                            variant='outlined'
                            size='small'
                            className='!rounded-full !border-bg-alt !text-white whitespace-nowrap'
                          >
                            <FaceIcon />
                            button
                          </Button>
                          <Button
                            variant='outlined'
                            size='small'
                            className='!rounded-full !border-bg-alt !text-white whitespace-nowrap'
                          >
                            <ReplyIcon className='transform scale-x-[-1]' />
                            share
                          </Button>
                          <Button
                            variant='outlined'
                            size='small'
                            className='!rounded-full !border-bg-alt !text-white whitespace-nowrap'
                          >
                            <AddIcon />
                            add to list
                          </Button>
                        </Stack>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className='max-md:hidden bg-bg-gptdark text-gray-200 text-l text-left p-4 w-full'>
                      {recording.description}
                    </div>
                    <div className='h-[50px] w-1/3 rounded-lg p-2'></div>
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
