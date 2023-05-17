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
    socials: user.socials || {
      twitter: '',
      github: '',
      youtube: '',
    },
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
    <div className='p-4'>
      <label htmlFor='fileInput'>
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

      <div className='mt-4'>
        <label>
          Name:
          <input
            className='ml-2 p-2 border rounded-md'
            type='text'
            name='display_name'
            value={userDetails.display_name}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className='mt-4'>
        <label>
          <FaGithub />
          GitHub:
          <input
            className='ml-2 p-2 border rounded-md'
            type='text'
            value={userDetails.socials!.github || ''}
            onChange={(e) => handleSocialLinkChange(e, 'github')}
          />
        </label>
      </div>

      <div className='mt-4'>
        <label>
          <FaYoutube />
          YouTube:
          <input
            className='ml-2 p-2 border rounded-md'
            type='text'
            value={userDetails.socials!.youtube || ''}
            onChange={(e) => handleSocialLinkChange(e, 'youtube')}
          />
        </label>
      </div>

      <div className='mt-4'>
        <label>
          <FaTwitter />
          Twitter:
          <input
            className='ml-2 p-2 border rounded-md'
            type='text'
            value={userDetails.socials!.twitter || ''}
            onChange={(e) => handleSocialLinkChange(e, 'twitter')}
          />
        </label>
      </div>
      <button
        className='mt-4 p-2 bg-blue-500 text-white rounded-md'
        onClick={() => save(userDetails, blob ? blob : undefined)}
      >
        Save Profile
      </button>
      <button
        className='mt-4 p-2 bg-blue-500 text-white rounded-md'
        onClick={cancel}
      >
        cancel
      </button>
    </div>
  );
};
