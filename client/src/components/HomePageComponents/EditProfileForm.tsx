import { FC, useState, ChangeEvent } from 'react';
import { FaGithub, FaYoutube, FaTwitter } from 'react-icons/fa';
import { useAppSelector } from '../../redux/hooks';
import { Creator, CreatorUpdate, Socials } from '../../types/Creator';

interface UserProfileProps {
  save: (details: CreatorUpdate, blob?: Blob) => void;
  cancel: () => void;
}

export const UserProfile: FC<UserProfileProps> = ({ save, cancel }) => {
  const user = useAppSelector((state) => state.user);
  const [blob, setBlob] = useState<Blob | null>(null);

  const [userDetails, setUserDetails] = useState<CreatorUpdate>({
    display_name: user.display_name || '',
    picture: user.picture || '',
    socials: user.socials || {},
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSocialLinkChange = (
    event: ChangeEvent<HTMLInputElement>,
    platform: keyof Socials
  ) => {
    setUserDetails({
      ...userDetails,
      socials: {
        ...userDetails.socials,
        [platform]: event.target.value,
      },
    });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setBlob(event.target.files[0]);
      setUserDetails({
        ...userDetails,
        picture: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const placeholderAvatar = 'https://robohash.org/mail@ashallendesign.co.uk';

  return (
    <div className='p-4 font-console grid grid-cols-3 gap-4 text-lg'>
  <label htmlFor='fileInput' className='col-span-3 text-center'>
    <img
      className='h-24 w-24 rounded-full cursor-pointer'
      src={userDetails.picture || placeholderAvatar}
      alt={userDetails.display_name}
    />
    <input
      id='fileInput'
      className='hidden'
      type='file'
      accept='image/*'
      onChange={handleImageChange}
    />
  </label>

  <label className='flex items-center'>Name:</label>
  <input
    className='col-span-2 p-2 border rounded-md'
    type='text'
    name='display_name'
    value={userDetails.display_name}
    onChange={handleInputChange}
  />

  <label className='flex items-center'><FaGithub /> GitHub:</label>
  <input
    className='col-span-2 p-2 border rounded-md'
    type='text'
    value={userDetails.socials!.github || ''}
    onChange={(e) => handleSocialLinkChange(e, 'github')}
  />

  <label className='flex items-center'><FaYoutube /> YouTube:</label>
  <input
    className='col-span-2 p-2 border rounded-md'
    type='text'
    value={userDetails.socials!.youtube || ''}
    onChange={(e) => handleSocialLinkChange(e, 'youtube')}
  />

  <label className='flex items-center'><FaTwitter /> Twitter:</label>
  <input
    className='col-span-2 p-2 border rounded-md'
    type='text'
    value={userDetails.socials!.twitter || ''}
    onChange={(e) => handleSocialLinkChange(e, 'twitter')}
  />

  <button
    className='col-span-3 mt-4 p-2 bg-bg-sec text-white rounded-md uppercase'
    onClick={() => save(userDetails, blob ? blob : undefined)}
  >
    Save Profile
  </button>

  <button
    className='col-span-3 mt-4 p-2 bg-bg-pri text-white outline outline-white rounded-md uppercase'
    onClick={cancel}
  >
    cancel
  </button>
</div>

  );
};
