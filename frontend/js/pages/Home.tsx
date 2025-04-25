import { useState, useEffect } from "react";
import { RestService } from "../api";
import "../styles/Home.css";
import Carousel from "../components/Carousel";
import SeasonalProduceHeader from "../components/SeasonalProduceHeader";
import ProduceCard from "../components/ProduceCard";

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);
  const [restCheck, setRestCheck] =
    useState<Awaited<ReturnType<typeof RestService.restRestCheckRetrieve>>>();

  useEffect(() => {
    async function onFetchRestCheck() {
      setRestCheck(await RestService.restRestCheckRetrieve());
    }
    onFetchRestCheck();
  }, []);

  return (
    <>
      <Carousel />
      <div className="seasonal-produce-section">
        <SeasonalProduceHeader />
        <div className="seasonal-produce-grid">
          <ProduceCard name={"Test"} cardColour={"#E9B44C"} />
          <ProduceCard name={"Test"} cardColour={"#E9B44C"} />
          <ProduceCard name={"Test"} cardColour={"#E9B44C"} />
          <ProduceCard name={"Test"} cardColour={"#E9B44C"} />
          <ProduceCard name={"Test"} cardColour={"#E9B44C"} />
        </div>
      </div>

      <div className="home-section-container">
        <div className="home-section">
          <div className="left-subsection">
            <h1>Help us defeat food wastage and support Australian farmers!</h1>
          </div>
          <div className="right-subsection"></div>
        </div>
      </div>

      {/* NOTE: The next line intentionally contains an error for testing frontend errors in Sentry. */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {showBugComponent && (showBugComponent as any).field.notexist}
    </>
  );
};

export default Home;
