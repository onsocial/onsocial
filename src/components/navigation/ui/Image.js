import React, { useState, useEffect } from "react";
import NftImage from './NftImage'; // Make sure to import your custom NftImage component

const ImageComponent = ({
  image,
  className,
  style,
  alt,
  fallbackUrl,
  thumbnail,
}) => {
  const [stateImageUrl, setStateImageUrl] = useState(null);

  // Initialize image in the state
  useEffect(() => {
    setStateImageUrl(image);
  }, [image]);

  const toUrl = (image) => {
    return (
      (image.ipfs_cid ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}` : image.url) ||
      fallbackUrl
    );
  };

  const thumb = (imageUrl) =>
    thumbnail && imageUrl && !imageUrl.startsWith("data:image/")
      ? `https://i.near.social/${thumbnail}/${imageUrl}`
      : imageUrl;

  // Handle NFT Image logic
  if (image.nft?.contractId && image.nft?.tokenId) {
    return (
      <NftImage
        className={className}
        style={style}
        alt={alt}
        nft={image.nft}
        thumbnail={thumbnail}
        fallbackUrl={fallbackUrl}
      />
    );
  }

  // Default image handling logic
  return (
    <img
      className={className}
      style={style}
      src={stateImageUrl ? thumb(stateImageUrl) : thumb(toUrl(image))}
      alt={alt}
      onError={() => {
        if (stateImageUrl !== fallbackUrl) {
          setStateImageUrl(fallbackUrl); // Set the fallback URL in case of an error
        }
      }}
    />
  );
};

export default ImageComponent;
