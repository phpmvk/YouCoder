import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import http from '../services/recordingApi';
import Page404 from '../components/404';
import Page500 from '../components/500';
import { PlaybackEditor } from '../components/PlaybackEditor';
import FullPlayerPage from './FullPlayer';
import { MultiEditorPlayback } from '../components/MultiEditorPlayback';

interface PlayerPageProps {}

const PlayerPage: FC<PlayerPageProps> = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const embed = searchParams.get('embed');
  const showMultiEditor = searchParams.get('multi');
  const showTitle = searchParams.get('title');
  const showCover = searchParams.get('cover');
  const [toRender, setToRender] = useState<JSX.Element | null>(null);
  const [displayCover, setDisplayCover] = useState<boolean>(
    showCover === 'true' || showTitle === 'true' ? true : false
  );

  const [coverClicked, setCoverClicked] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      navigate('/');
    } else {
      getRecording(id);
    }
  }, [id, navigate]);

  function getRecording(id: string) {
    http
      .getRecording(id)
      .then((response) => {
        console.log('recording: ', response.data);
        if (embed && embed === 'true') {
          // show the embed player
          setToRender(
            <>
              {displayCover && !coverClicked ? (
                <div
                  className='cursor-pointer flex justify-center items-center w-full h-full'
                  onClick={() => setCoverClicked(true)}
                >
                  {response.data.thumbnail_link && (
                    <img
                      className='object-cover w-full h-auto'
                      src={response.data.thumbnail_link}
                      alt={response.data.title}
                    />
                  )}
                  {showTitle && <h1>{response.data.title}</h1>}
                </div>
              ) : (
                <PlaybackEditor recordingData={response.data} />
              )}
            </>
          );
        } else {
          // show the full player
          setToRender(<FullPlayerPage recordingData={response.data} />);
        }
      })
      .catch((error) => {
        if (embed && embed === 'true') {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            switch (error.response.status) {
              case 400:
                setToRender(<Page404 />);
              case 403:
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
  }
  return <>{toRender}</>;
};

export default PlayerPage;
