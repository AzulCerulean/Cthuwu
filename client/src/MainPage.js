import { useEffect, useState } from "react";
import Loading from "./Loading";

const MainPage = () => {
  const [feeds, setFeeds] = useState([]);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("/api/feeds")
      .then(async (res) => res.json())
      .then((data) => {
        setFeeds(data.feeds);
        setLoaded(true);
      })
      .catch((e) => console.log(e));
  }, []);

  if (!loaded) {
    return <Loading />
  }

  return (
    <>
      <h2>main page here with all the feeds stuff</h2>
    </>
  );
};

export default MainPage;
