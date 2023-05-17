import TopNavBar from '../components/HomePageComponents/TopNavBar';
import Footer from '../components/HomePageComponents/Footer';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';

interface DocsPageProps {}

const DocsPage: React.FC<DocsPageProps> = ({}) => {
  const teamMembers = [
    {
      name: 'Idar Nigatu',
      img: 'https://avatars.githubusercontent.com/u/61595151?v=4',
      gh: 'https://github.com/IdarDev',
    },
    {
      name: 'Michael Epelboim',
      img: 'https://avatars.githubusercontent.com/u/67226592?v=4',
      gh: 'https://github.com/michaelito80us',
    },
    {
      name: 'Philip von Koss',
      img: 'https://avatars.githubusercontent.com/u/123027089?v=4',
      gh: 'https://github.com/phpmvk',
    },
    {
      name: 'Jordan Rollins',
      img: 'https://avatars.githubusercontent.com/u/116223808?v=4',
      gh: 'https://github.com/0xjcr',
    },
  ];

  return (
    <div className='bg-bg-pri min-h-screen'>
      <TopNavBar showDashboard={true} showSearch={true}/>
      <div className=' h-min-screen text-white flex flex-col items-start max-w-[1600px]'>
        <div className='!font-title text-6xl ml-20 my-10 pb-10 flex items-center bg-gradient-to-r from-bg-sec via-white to-bg-alt text-transparent bg-clip-text'>
          F.A.Q.
        </div>
        <div className='mx-auto max-w-[80vw] !stroke-gray-200 !stroke-2 !text-gray-200'>
          <Accordion className='!bg-bg-gptdark/60 mb-5 !rounded-sm !font-console'>
            <AccordionSummary
              className='!bg-bg-gptdark !rounded-sm'
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className='!text-2xl text-gray-200 h-20 flex items-center !font-console'>
                About YouCoder
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='!font-title !font-medium'>
                <div className=' p-1'>
                  <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                    What is YouCoder?
                  </h2>
                  <p className='text-gray-200 !font-console'>
                    YouCoder is a cutting-edge application that enables users to
                    effortlessly record, replay, and share their keystrokes
                    within an integrated development environment (IDE). With a
                    focus on enhancing coding education and fostering
                    collaboration, YouCoder empowers users to engage with
                    pre-recorded coding sessions, facilitating interactive
                    learning experiences and accelerating knowledge acquisition.
                  </p>
                </div>
              </Typography>
            </AccordionDetails>
            {/* /----------------------------------------------------------------------------------------------/ */}
          </Accordion>

          <Accordion className='!bg-bg-gptdark/60 mb-5 !rounded-sm'>
            <AccordionSummary
              className='!bg-bg-gptdark !rounded-sm'
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className='!text-2xl text-gray-200 h-20 flex items-center !font-console'>
                Features and Capabilities
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='!font-title !font-medium'>
                <br />
                <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                  What can I do with YouCoder?
                </h2>
                <p className='text-gray-200 !font-console'>
                  YouCoder provides a myriad of possibilities. Capture and share
                  your coding sessions while incorporating your thoughts and
                  teachings. Seamlessly embed the provided iFrame into your
                  website or share the link to a player hosted on YouCoder.io,
                  allowing others to replay your sessions step-by-step as if
                  they were actively collaborating with you. Keep recordings
                  private until you are ready to share them, code in multiple
                  languages from our expanding suite, and conveniently track the
                  popularity of your videos.
                </p>

                <br />

                <div className='! p-1'>
                  <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                    How do I embed a recording?
                  </h2>
                  <p className='text-gray-200 !font-console'>
                    Embedding a recording is effortless with YouCoder. Simply
                    copy and paste the provided embed code into compatible
                    websites or platforms. This seamless integration ensures a
                    visually appealing presentation of your coding sessions.
                  </p>
                  <br />
                </div>
                <div className='! p-1'>
                  <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                    Can YouCoder be used for teaching coding in a classroom
                    setting?
                  </h2>
                  <p className='text-gray-200 !font-console'>
                    Absolutely! YouCoder is an invaluable tool for teaching
                    coding in a classroom environment. Educators can record
                    coding sessions, effortlessly share them with students, and
                    promote real-time collaboration, providing an immersive and
                    engaging educational experience.
                  </p>
                  <br />
                </div>
                <div className='! p-1'>
                  <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                    Does YouCoder support code syntax highlighting?
                  </h2>
                  <p className='text-gray-200 !font-console'>
                    YouCoder currently supports syntax highlighting for
                    JavaScript, TypeScript, HTML, and CSS, ensuring improved
                    code readability and comprehension.
                  </p>
                  <br />
                </div>
                <div className='! p-1'>
                  <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                    Can I collaborate with others in real-time while using
                    YouCoder?
                  </h2>
                  <p className='text-gray-200 !font-console'>
                    While YouCoder does not currently support real-time coding
                    collaboration, users can interact with recorded sessions as
                    if they were live, pausing playback and executing any code
                    they write whenever desired.
                  </p>
                  <br />
                </div>
                <div className='! p-1'>
                  <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                    How do I embed a recording?
                  </h2>
                  <p className='text-gray-200 !font-console'>
                    Embedding a recording is effortless with YouCoder. Simply
                    copy and paste the provided embed code into compatible
                    websites or platforms. This seamless integration ensures a
                    visually appealing presentation of your coding sessions.
                  </p>
                  <br />
                </div>
                <div className='! p-1'>
                  <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                  Can I personalise the embedded recording?
                  </h2>
                  <p className='text-gray-200 !font-console'>
                  Yes! You can chose to display either the Title or the thumbnail provided during the recording creation. In addition, you can also toggle between a &apos;light&apos; and &apos;dark&apos;. Just edit the fields in the provided iFrame link. Keep in mind that the cover takes precedence over the title.
                  </p>
                  <br />
                  
                  
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* //--------------------------------------------------------------------------------- */}
          <Accordion className='!bg-bg-gptdark/60 mb-5 !rounded-sm'>
            <AccordionSummary
              className='!bg-bg-gptdark !rounded-sm'
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className='!text-2xl text-gray-200 h-20 flex items-center !font-console'>
                Recording and Playback
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='!font-title !font-medium'>
                <br />
                <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                  How do I create a new recording
                </h2>
                <p className='text-gray-200 !font-console'>
                  Creating a new recording in YouCoder is a seamless process.
                  Visit youcoder.io, click on &apos;Sign In,&apos; and select
                  your preferred authentication method. Once logged in, navigate
                  to the &apos;Create a Recording&apos; button, which will
                  direct you to the YouCoder IDE. Choose your desired coding
                  language, click &apos;Record,&apos; and YouCoder will capture
                  all your keystrokes, including the time and output of code
                  execution. After finishing your session, click &apos;End
                  Recording,&apos; provide a title, description, thumbnail, and
                  click &apos;Save.&apos; In your dashboard, you can access your
                  recording, obtain its link and/or embed code, edit details,
                  publish, or delete it.
                </p>

                <br />

                <div className='! p-1'>
                  <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                    Where can I see all my recordings?
                  </h2>
                  <p className='text-gray-200 !font-console'>
                    Upon logging in, your recordings are conveniently accessible
                    in the &apos;Dashboard&apos; section of YouCoder. This
                    centralized view enables effortless management and replay of
                    your recorded coding sessions.
                  </p>
                  <br />
                </div>
                <div className='! p-1'>
                  <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                    Is there a limit to the size or duration of the recordings
                    in YouCoder?
                  </h2>
                  <p className='text-gray-200 !font-console'>
                    YouCoder does not impose strict limits on recording size or
                    duration. However, extremely large recordings may
                    necessitate additional storage space and require more time
                    to process and upload. Your patience is appreciated.
                  </p>
                  <br />
                </div>
                <div className='! p-1'>
                  <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                    Can I export my recordings as video files or share them on
                    social media platforms?
                  </h2>
                  <p className='text-gray-200 !font-console'>
                    You can easily share your recordings by providing the link
                    or embedding a player into your website. Exporting
                    recordings as video files is not currently supported.
                  </p>
                  <br />
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* //------------------------------------------- */}
          <Accordion className='!bg-bg-gptdark/60 mb-5 !rounded-sm'>
            <AccordionSummary
              className='!bg-bg-gptdark !rounded-sm'
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className='!text-2xl text-gray-200 h-20 flex items-center !font-console'>
                Usage and Accessibility
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='!font-title !font-medium'>
                <br />
                <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                  Who can use YouCoder?
                </h2>
                <p className='text-gray-200 !font-console'>
                  YouCoder caters to a broad user base, including students,
                  educators, professional programmers, and coding enthusiasts.
                  Whether you are a beginner or an experienced individual
                  seeking to enhance your coding skills and collaborate with
                  others, YouCoder is designed to meet your needs.
                </p>

                <br />

                <div className='! p-1'>
                  <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                    Who uses YouCoder?
                  </h2>
                  <p className='text-gray-200 !font-console'>
                    YouCoder is utilized by a diverse community of learners,
                    educators, coding bootcamps, and professionals. It serves as
                    a valuable tool for coding education, code review,
                    collaboration, and improving coding efficiency.
                  </p>
                  <br />
                </div>
                <div className='! p-1'>
                  <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                    Can I keep recordings private?
                  </h2>
                  <p className='text-gray-200 !font-console'>
                    Yes, YouCoder provides privacy settings that allow you to
                    keep your recordings private. You have full control over who
                    can access and view your recordings, ensuring complete
                    privacy and control over your content.
                  </p>
                  <br />
                </div>
                <div className='! p-1'>
                  <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                    Is there a mobile app available for YouCoder?
                  </h2>
                  <p className='text-gray-200 !font-console'>
                    Currently, YouCoder does not have a dedicated mobile app.
                  </p>
                  <br />
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* //-------------------------------------------------------- */}
          <Accordion className='!bg-bg-gptdark/60 mb-5 !rounded-sm'>
            <AccordionSummary
              className='!bg-bg-gptdark !rounded-sm'
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className='!text-2xl text-gray-200 h-20 flex items-center !font-console'>
                Support and Contact
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='!font-title !font-medium'>
                <br />
                <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                  How can I get in touch with the YouCoder team?
                </h2>
                <p className='text-gray-200 !font-console'>
                  For any inquiries, support, or feedback, you can get in touch
                  with the YouCoder team through our dedicated support channels.
                  Reach out to us via email at youcoder.bcn@gmail.com or visit
                  our community Q&A forum at
                  https://github.com/phpmvk/YouCoder/discussions/109 to connect
                  with our team and community members.
                </p>

                <br />

                <div className='! p-10'>
                  <h2 className='text-2xl text-gray-200 my-6 !font-console'>
                    Who is the YouCoder team?
                  </h2>
                  <div className='text-gray-200'>
                  <div className="flex grid-cols-1 gap-2 justify-items-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}

              className="h-[30vw] w-[30vw] md:h-[20vw] md:w-[20vw] flex items-center justify-center p-5"

            >
              <div className="flex items-center text-left flex-col">
                <img
                  src={member.img}
                  alt={member.name}

                  className="h-[8vw] w-[8vw] object-cover rounded-full mb-4"

                />
                <h2 className=" sm:text-sm md:text-md text-lg text-white whitespace-nowrap z-10">{member.name}</h2>
                <div>
                  <a href={member.gh} target="_blank" rel="noopener noreferrer">

                    <IconButton className="!text-white !stroke-none scale-150">

                      <GitHubIcon/>
                    </IconButton>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
                  </div>
                  <br />
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className=' mt-24 px-96 pt-12'></div>
    </div>
  );
};

export default DocsPage;
