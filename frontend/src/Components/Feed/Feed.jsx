import { useState } from "react";
import { useEffect } from "react";
import "./Feed.css";

const Feed = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>

      <div className={`feed ${loaded ? "fade-in" : ""}`}>
        <h1>Feed</h1>
      </div>
    </>
  );
};

export default Feed;
