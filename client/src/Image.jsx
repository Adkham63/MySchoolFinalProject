import React from "react";

const Image = ({ src, ...rest }) => {
  if (src && !src.startsWith("http") && !src.startsWith("/uploads/")) {
    src = "http://localhost:4000/uploads/" + src;
  }
  return <img {...rest} src={src} alt="" />;
};

export default Image;
