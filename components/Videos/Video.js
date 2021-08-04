export const Video = ({ url, userName }) => {
  return (
    <>
      <h3>{userName}</h3>
      <video width="300" height="300" controls>
        <source src={url} type="video/mp4" />
        <source src={url} type="video/webm" />
        <source src={url} type="video/ogg" />
        Sorry, you browser does not support the format of this video.
      </video>
    </>
  );
};

export default Video;
