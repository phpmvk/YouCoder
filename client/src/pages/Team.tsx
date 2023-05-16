import React from 'react'
import TopNavBar from '../components/HomePageComponents/TopNavBar';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';

const getRandomPercentage = () => `${Math.floor(Math.random() * 100)}%`;

const Team = () => {
  const teamMembers = [
    { name: "Idar Nigatu", img: "https://avatars.githubusercontent.com/u/61595151?v=4", gh: "https://github.com/IdarDev"  },
    { name: "Michael Epelboim", img: "https://avatars.githubusercontent.com/u/67226592?v=4", gh: "https://github.com/michaelito80us" },
    { name: "Philip von Koss", img: "https://avatars.githubusercontent.com/u/123027089?v=4", gh: "https://github.com/phpmvk"},
    { name: "Jordan Rollins", img: "https://avatars.githubusercontent.com/u/116223808?v=4", gh: "https://github.com/0xjcr" },
  ];

  
  

  return (
    <>
    <TopNavBar/>
      <div className="h-screen w-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-bg-pri via-white/10 to-bg-pri z-1 flex justify-center items-center text-gray-200">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className={`absolute w-3 h-3 rounded-full z-0 ${index % 2 === 0 ? 'bg-gradient-to-r from-black to-red-500' : 'bg-gradient-to-r from-black to-white'} opacity-50`}
            style={{top: getRandomPercentage(), left: getRandomPercentage()}}
          />
        ))}
        <div className="flex flex-col items-center">
        <img src="/Layer-1.svg" alt="logo" className="w-[10vw]" />
  <h1 className="text-2xl font-bold mb-10 p-16 my-10 text-grey-200 font-title z-10">The Team Behind YouCoder</h1>
</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="h-[30vw] w-[30vw] md:h-[20vw] md:w-[20vw] backdrop-blur bg-black/30 rounded-lg flex items-center justify-center p-5"
            >
              <div className="flex items-center text-left flex-col">
                <img
                  src={member.img}
                  alt={member.name}
                  className="h-20 w-20 object-cover rounded-full mb-4"
                />
                <h2 className=" sm:text-sm md:text-md text-lg text-white whitespace-nowrap z-10">{member.name}</h2>
                <div>
                  <a href={member.gh} target="_blank" rel="noopener noreferrer">
                    <IconButton className="!text-white">
                      <GitHubIcon/>
                    </IconButton>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default Team;
