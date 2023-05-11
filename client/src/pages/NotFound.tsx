import TopNavBar from '../components/HomePageComponents/TopNavBar';
import Page404 from '../components/404';
import Page500 from '../components/500';

interface NotFoundPageProps {
  type: string;
}
const NotFoundPage = ({ type }: NotFoundPageProps) => {
  return (
    <>
      <TopNavBar />
      {type === '404' ? <Page404 /> : <Page500 />}
    </>
  );
};

export default NotFoundPage;
