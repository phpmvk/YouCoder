import TopNavBar from "../components/HomePageComponents/TopNavBar";
import Footer from "../components/HomePageComponents/Footer";
const NotFoundPage = () => {
  return (
    <>
    <div className="bg-bg-pri h-screen overflow-y-hidden p-10">
      <TopNavBar/>
      <div className="flex items-start justify-center h-full">
        <div className="text-5xl bg-bg-gptdark text-white flex-col py-20 px-10 font-title">
          <p className="mb-10">404</p>
          <p>The page you are looking for could not be found.</p>
        </div>
      </div>
    </div>
</>

  );
};

export default NotFoundPage;
