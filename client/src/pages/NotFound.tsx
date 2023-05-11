import TopNavBar from "../components/HomePageComponents/TopNavBar";
import Footer from "../components/HomePageComponents/Footer";
const NotFoundPage = () => {
  return (
    <>
    <div className="bg-bg-pri h-screen overflow-y:hidden flex  p-10">
      <TopNavBar/>
    <div className="text-5xl bg-bg-gptdark text-white flex-col py-20 px-20 font-title">
      <p className="mb-10">404</p>
      <p>The page you are looking for could not be found.</p>
    </div>
    </div>
     </>
  );
};

export default NotFoundPage;
