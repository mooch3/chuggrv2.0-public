import { useEffect, useState } from "react";
import classes from "./Videos.module.css";
import Video from "./Video";
import firebase from "firebase/app";
import "firebase/storage";

export const Videos = ({ betID }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const tempVideos = [];
    firebase
      .firestore()
      .collection("videos")
      .doc(betID)
      .onSnapshot((doc) => {
        if (doc.exists) {
          doc.data().videos.forEach((video) => {
            tempVideos.push({ ...video });
          });
        }
        setVideos(tempVideos);
      });

      return () => setVideos([]);
  }, []);

  return (
    <>
      {videos.map((video, index) => (
        <div className={classes["video-container"]} key={index + video.url}>
          <Video url={video.url} userName={video.userName} />
        </div>
      ))}
    </>
  );
};
