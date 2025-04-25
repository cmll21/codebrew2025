import { useState, useEffect } from "react";
import { RestService } from "../api";
import "../styles/Home.css";
import Carousel from "../components/Carousel";
import SeasonalProduceHeader from "../components/SeasonalProduceHeader";
import ProductCard from "../components/ProductCard";
import SeasonalProduceCard from "../components/SeasonalProduceCard";

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
          <SeasonalProduceCard />
          <SeasonalProduceCard />
          <SeasonalProduceCard />
          <SeasonalProduceCard />
          <SeasonalProduceCard />
        </div>
      </div>

      {/* NOTE: The next line intentionally contains an error for testing frontend errors in Sentry. */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {showBugComponent && (showBugComponent as any).field.notexist}
    </>
  );
};

export default Home;
