import React, { useState, useEffect } from "react";

const ProfileImage = ({
  accountId,
  className = "profile-image d-inline-block",
  style = { width: "3em", height: "3em" },
  imageStyle = { objectFit: "cover" },
  imageClassName = "rounded-circle w-100 h-100",
  thumbnail = "thumbnail",
  profile,
  title,
  tooltip = false,
}) => {
  const fallbackUrl =
    "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm";

  const [stateImageUrl, setStateImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Image URL logic
  useEffect(() => {
    if (accountId) {
      const imageUrl = `https://i.near.social/magic/${thumbnail || "large"}/https://near.social/magic/img/account/${accountId}`;
      console.log('Generated Image URL:', imageUrl); // Debugging URL
      setStateImageUrl(imageUrl);
    }
  }, [accountId, thumbnail]);

  const handleImageLoad = () => {
    console.log("Image loaded successfully!"); // Debugging load success
    setLoading(false);
  };

  const handleError = () => {
    console.log("Image loading failed, using fallback URL");
    setStateImageUrl(fallbackUrl);
  };

  const name = profile?.name || "No-name profile";
  const image = profile?.image;
  const finalTitle = title || `${name} @${accountId}`;

  const inner = (
    <div className={className} style={style}>
      {loading && <div>Loading...</div>} {/* Loading placeholder */}
      <img
        className={imageClassName}
        style={imageStyle}
        src={stateImageUrl || fallbackUrl}
        alt={finalTitle}
        onLoad={handleImageLoad}
        onError={handleError}
      />
    </div>
  );

  return tooltip ? (
    <ProfileOverlayTrigger accountId={accountId} tooltip={finalTitle}>
      {inner}
    </ProfileOverlayTrigger>
  ) : (
    inner
  );
};

export default ProfileImage;
