import React from 'react'

const getRandomPercentage = () => `${Math.floor(Math.random() * 100)}%`;

const Team = () => {
  const teamMembers = [
    { name: "Member 1", role: "Role 1", img: "path/to/image1.jpg" },
    { name: "Member 2", role: "Role 2", img: "path/to/image2.jpg" },
    { name: "Member 3", role: "Role 3", img: "path/to/image3.jpg" },
    { name: "Member 4", role: "Role 4", img: "path/to/image4.jpg" },
  ];

  return (
    <>
      <div className="h-screen w-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-bg-pri via-slate-900 to-bg-pri z-1 flex justify-center items-center text-gray-200">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className={`absolute w-3 h-3 rounded-full animate-pulse ${index % 2 === 0 ? 'bg-gradient-to-r from-black to-red-500' : 'bg-gradient-to-r from-black to-white'} opacity-50`}
            style={{top: getRandomPercentage(), left: getRandomPercentage()}}
          />
        ))}

        <h1 className="text-5xl font-bold mb-10 pr-16 text-white">Our Team</h1>

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
                  className="h-24 w-24 object-cover rounded-full mb-4"
                />
                <h2 className="text-2xl font-bold text-white">{member.name}</h2>
                <p className="text-xl text-white">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Team;
