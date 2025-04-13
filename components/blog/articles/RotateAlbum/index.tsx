import React from "react";
import "./index.css";
const RotateAlbum = () => {
  const photos = [
    {
      src: "/imgs/pic1.webp",
      className: "out-div out-front",
    },
    {
      src: "/imgs/pic2.webp",
      className: "out-div out-back",
    },
    {
      src: "/imgs/pic3.webp",
      className: "out-div out-left",
    },
    {
      src: "/imgs/pic4.webp",
      className: "out-div out-right",
    },
    {
      src: "/imgs/pic5.webp",
      className: "out-div out-top",
    },
    {
      src: "/imgs/pic6.webp",
      className: "out-div out-bottom",
    },
    {
      src: "/imgs/pic7.webp",
      className: "in-div in-front",
    },
    {
      src: "/imgs/pic8.webp",
      className: "in-div in-back",
    },
    {
      src: "/imgs/pic9.webp",
      className: "in-div in-left",
    },
    {
      src: "/imgs/pic10.webp",
      className: "in-div in-right",
    },
    {
      src: "/imgs/pic11.webp",
      className: "in-div in-top",
    },
    {
      src: "/imgs/pic12.webp",
      className: "in-div in-bottom",
    },
  ];
  return (
    <div className="album_background">
      <div className="album_container">
        <div className="box">
          {photos.map((photo, index) => (
            <img key={index} src={photo.src} className={photo.className} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RotateAlbum;
