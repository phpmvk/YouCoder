import TopNavBar from '../components/HomePageComponents/TopNavBar';
import Footer from '../components/HomePageComponents/Footer';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



interface DocsPageProps {}

const DocsPage: React.FC<DocsPageProps> = ({}) => {
  return (
    <div className="bg-bg-pri min-h-screen">
    <TopNavBar/>
      <div className=" h-min-screen text-white flex flex-col items-start ">
        <div className="!font-title text-6xl ml-20 my-10 pb-10 flex items-center bg-gradient-to-r from-bg-sec via-white to-bg-alt text-transparent bg-clip-text">Getting Started</div>
        <div className="mx-20 !stroke-gray-200 !stroke-2 !text-gray-200">
          <Accordion
          className="!bg-bg-gptdark/60 mb-5 !rounded-sm"
          >
            <AccordionSummary
            className="!bg-bg-gptdark !rounded-sm"
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="!text-2xl text-gray-200 h-20 flex items-center">Using the Recorder</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography className="!font-title !font-medium">
              
  <div className="bg-bg-muidark p-1"><p className="mt-4 font-bold text-gray-200">
    · Users must be signed in to create a recording.</p><p className="text-gray-200"><br />
    · Sign in with one click using your GitHub or Google account
    and you&apos;ll be redirected to your dashboard.
  </p></div><br/>

  <div className="bg-bg-gptdark/80 p-1"><h2 className="text-2xl text-gray-200 my-6">Navigating to Your Dashboard</h2>
  <p className="text-gray-200">
    Once you&apos;ve signed in, you&apos;ll land on your dashboard page. Here, you&apos;ll find a variety of options and features. Your dashboard is essentially your control panel, providing access to all the app&apos;s main features.
  </p>
  <p className="text-gray-200">
    The dashboard is designed to provide a simple, intuitive user interface. You&apos;ll see options to create a new recording, edit existing recordings, and links to publish, share or embed your recordings.
  </p></div>

  <h2 className="text-2xl text-gray-200 my-6">Creating a New Recording</h2>
  <p className="text-gray-200">Follow these steps to create a new recording:</p><br />
  <ul>
    <li className="text-gray-200">Navigate to the Recording Screen: On your dashboard, tap on the &apos;New Recording&apos; button. This will take you to the recording screen.</li><br />
    <li className="text-gray-200">Start Recording: Tap on the &apos;Record&apos; button to start recording. You can pause or stop the recording at any time by pressing the respective buttons.</li><br />
    <li className="text-gray-200">Save Recording: Once you&apos;re done, tap on the &apos;Stop&apos; button, then the &apos;Save&apos; button. Give your recording a name and a description then tap &apos;Save&apos; again. Your recording will be saved and appear in your list of recordings on your dashboard. All recordings are saved as .YCR file format.</li>
  </ul><br/>

  <div className="!bg-bg-gptdark/80 p-1"><h2 className="text-2xl text-gray-200 my-6">Editing Existing Recordings</h2>
  <p className="text-gray-200">To edit an existing recording:</p><br />
  <ul>
    <li className="text-gray-200">Navigate to Your Recordings: On your dashboard, you&apos;ll see a list of your saved recordings.</li><br />
    <li className="text-gray-200">Select a Recording: Tap on the recording you wish to edit. This will open the recording in an editing interface.</li><br />
    <li className="text-gray-200">Edit Your Recording: Use the provided tools to edit your recording. You can edit the title, description, and cover image.</li><br />
    <li className="text-gray-200">Save Changes: Once you&apos;re satisfied with your edits, tap on the &apos;Save&apos; button. You&apos;ll be asked if you want to sve your changes.</li>
  </ul></div>
</Typography>

            </AccordionDetails>
            {/* /----------------------------------------------------------------------------------------------/ */}
          </Accordion>
          
          <Accordion
          className="!bg-bg-gptdark/60 mb-5 !rounded-sm"
          >
            <AccordionSummary
            className="!bg-bg-gptdark !rounded-sm"
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="!text-2xl text-gray-200 h-20 flex items-center">Immersive Playback Experience</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography className="!font-title !font-medium">
  <br/>



  <div className="bg-bg-gptdark/80 p-1">
  <h2 className="text-2xl text-gray-200 my-6">Interactive Playback Experience</h2>
  <p className="text-gray-200">
    YouCoder provides an interactive coding lessons player where you can not only watch but also participate in the coding process. You have the ability to edit the code and view the changes to the output in real time.
  </p>
  <p className="text-gray-200">
    This feature is designed to provide a hands-on learning experience, enhancing your understanding of the coding lessons and allowing you to learn at your own pace.
  </p>
</div>

<h2 className="text-2xl text-gray-200 my-6">Using the Interactive Player</h2>
<p className="text-gray-200">Follow these steps to use the interactive player:</p><br />
<ul>
  <li className="text-gray-200">Select a Lesson: Browse through the available coding lessons and select one that you wish to view.</li><br />
  <li className="text-gray-200">Watch and Code: As you watch the lesson, you can also edit the code in real time and see the changes to the output instantly.</li><br />
  <li className="text-gray-200">Save Your Progress: If you need to pause and continue later, you can save your progress. When you&apos;re ready, you can pick up right where you left off.</li>
</ul>

<div className="!bg-bg-gptdark/80 pt-0 p-1">
  <h2 className="text-2xl text-gray-200 my-6">Continuing a Saved Lesson</h2>
  <p className="text-gray-200">To continue a saved lesson:</p><br />
  <ul>
    <li className="text-gray-200">Navigate to Your Saved Lessons: On your dashboard, you&apos;ll see a list of your saved lessons.</li><br />
    <li className="text-gray-200">Select a Lesson: Tap on the lesson you wish to continue. This will open the lesson in the interactive player.</li><br />
    <li className="text-gray-200">Continue Coding: Pick up right where you left off. You can continue to edit the code and view the changes in real time.</li><br />
    <li className="text-gray-200">Save Changes: Once you&apos;re done for the day, remember to save your progress again. The next time you return, you can start right where you stopped.</li>
  </ul>
</div>



</Typography>

            </AccordionDetails>
          </Accordion>

        </div>
      </div>
      <div className=" mt-24 px-96 pt-12">
      <Footer/>
    </div>
</div>



  );
};

export default DocsPage;
