import { useEffect, useState } from "react";
import classes from "./Videos.module.css";
import Video from "./Video";
import firebase from "firebase";
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
            tempVideos.push({ ...video, id: `${video.timestamp}-${video.uid}` });
          });
        }
        setVideos(tempVideos);
      });

      return () => setVideos([]);
  }, []);

  return (
    <>
      {videos.map((video) => (
        <div className={classes["video-container"]}>
          <Video url={video.url} key={video.id} userName={video.userName} />
        </div>
      ))}
    </>
  );
};
