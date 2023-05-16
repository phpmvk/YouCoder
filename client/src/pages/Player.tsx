import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import http from '../services/recordingApi';
import Page404 from '../components/404';
import Page500 from '../components/500';
import { PlaybackEditor } from '../components/PlaybackEditor';
import FullPlayerPage from './FullPlayer';
import { MultiEditorPlayback } from '../components/MultiEditorPlayback';
import { BiPlayCircle } from 'react-icons/bi';

interface PlayerPageProps {}

const PlayerPage: FC<PlayerPageProps> = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const embed = Boolean(searchParams.get('embed') === 'true');
  const showMultiEditor = Boolean(searchParams.get('multi') === 'true');
  const showTitle = Boolean(searchParams.get('title') === 'true');
  const showCover = Boolean(searchParams.get('cover') === 'true');
  const [toRender, setToRender] = useState<JSX.Element | null>(null);
  const [displayCover, setDisplayCover] = useState<boolean>(
    showCover || showTitle ? true : false
  );

  console.log('showCover: ', showCover);
  console.log('showTitle: ', showTitle);
  console.log('displayCover: ', displayCover);

  const [coverClicked, setCoverClicked] = useState<boolean>(
    !showCover && !showTitle
  );

  useEffect(() => {
    if (!id) {
      navigate('/');
    } else {
      getRecording(id);
    }
  }, [id, navigate, coverClicked]);

  const hiderecordingCover = () => {
    setCoverClicked(true);
    setDisplayCover(false);
  };

  useEffect(() => {
    console.log(displayCover && !coverClicked);
  }, [displayCover, coverClicked]);

  const getRecording = useCallback(
    (id: string) => {
      console.log('hello');
      http
        .getRecording(id)
        .then((response) => {
          console.log('recording: ', response.data);
          if (embed) {
            setCoverClicked(false);

            // show the embed player
            setToRender(
              <>
                {displayCover && !coverClicked ? (
                  <div
                    className='cursor-pointer h-[480px] overflow-hidden flex items-center justify-center w-full bg-bg-pri'
                    onClick={hiderecordingCover}
                  >
                    {response.data.thumbnail_link && showCover && (
                      <img
                        className='object-cover w-full h-[480px]'
                        src={response.data.thumbnail_link}
                        alt={response.data.title}
                      />
                    )}
                    {showTitle && !showCover && (
                      <div className='my-auto text-white/90 text-7xl capitalize line-clamp-3 leading-tight mx-10 text-center'>
                        {response.data.title}
                      </div>
                    )}
                    <div className='absolute w-full h-full opacity-0 hover:opacity-100 flex items-center justify-around'>
                      <BiPlayCircle className='text-7xl text-white/30 z-10 ' />
                    </div>
                  </div>
                ) : (
                  <PlaybackEditor
                    autoplay={true}
                    recordingData={response.data}
                  />
                )}
              </>
            );
          } else {
            // show the full player
            setToRender(<FullPlayerPage recordingData={response.data} />);
          }
        })
        .catch((error) => {
          if (embed) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);

              switch (error.response.status) {
                case 400:
                  setToRender(<Page404 />);
                case 403:
                  setToRender(<Page404 />);
                case 404:
                  setToRender(<Page404 />);
                case 500:
                  setToRender(<Page500 />);
                default:
                  setToRender(<Page500 />);
              }
            } else if (error.request) {
              console.log(error.request);
              setToRender(<Page500 />);
            } else {
              console.log('Error', error.message);
              setToRender(<Page500 />);
            }
          } else {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);

              switch (error.response.status) {
                case 400:
                  navigate('/404');
                  break;
                case 403:
                  navigate('/404');
                  break;
                case 404:
                  navigate('/404');
                  break;
                case 500:
                  navigate('/oops');
                  break;
                default:
                  navigate('/oops');
              }
            } else if (error.request) {
              console.log('Request Error: ', error.request);
              navigate('/oops');
            } else {
              console.log('Other Error', error.message);
              navigate('/oops');
            }
          }
        });
    },
    [displayCover, coverClicked]
  );
  return <>{toRender}</>;
};

export default PlayerPage;
