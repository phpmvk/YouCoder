import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import http from '../services/recordingApi';
import Page404 from '../components/404';
import Page500 from '../components/500';
import { PlaybackEditor } from '../components/PlaybackEditor';
import FullPlayerPage from './FullPlayer';

interface PlayerPageProps {}

const PlayerPage: React.FC<PlayerPageProps> = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const embed = searchParams.get('embed');
  const [toRender, setToRender] = useState<JSX.Element | null>(null)


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
          setToRender(<PlaybackEditor />);
        } else {
          // show the full player
          setToRender(<FullPlayerPage />);
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
                return <Page404 />;
              case 403:
                return <Page404 />;
              case 500:
                return <Page500 />;
              default:
                return <Page500 />;
            }
          } else if (error.request) {
            console.log(error.request);
            return <Page500 />;
          } else {
            console.log('Error', error.message);
            return <Page500 />;
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
