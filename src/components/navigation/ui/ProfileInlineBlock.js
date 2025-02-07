import React, { useState, useEffect } from "react";
import ProfileImage from "./ProfileImage"; // Assuming ProfileImage is already a React component
import Checkmark from "./Checkmark"; // Assuming Checkmark is already a React component

const ProfileInlineBlock = (props) => {
  // Extract properties with fallback values
  const accountId = props.accountId ?? context.accountId;
  const [profile, setProfile] = useState(props.profile ?? {});
  const fast = props.fast ?? !props.profile;

  // Fetch the profile if not passed as a prop
  useEffect(() => {
    if (!props.profile) {
      // Assuming `Social.getr` is an async function that fetches profile data
      const fetchProfile = async () => {
        const profileData = await Social.getr(`${accountId}/profile`);
        setProfile(profileData);
      };
      fetchProfile();
    }
  }, [accountId, props.profile]);

  // Extract profile details
  const { name, description, tags = [] } = profile;

  // Styles
  const imgWrapperStyle = { height: "3em", width: "3em" };
  const fontStyle = { fontFamily: "'Open Sans', sans-serif" };
  const accountNameStyle = {
    fontFamily: "'Open Sans', sans-serif",
    color: "#58606F",
  };
  const textMutedStyle = { color: "#58606F", fontSize: "14px" }; // Smaller text for description and tags
  const tagStyle = { fontSize: "11px", backgroundColor: "transparent" };

  return (
    <div className="d-flex flex-row" style={fontStyle}>
      {/* Profile Image */}
      <div className="me-2">
        <ProfileImage
          loading={<div style={imgWrapperStyle} />}
          fast={fast}
          profile={profile}
          accountId={accountId}
          style={imgWrapperStyle}
          imageClassName="rounded-circle w-100 h-100"
        />
      </div>

      {/* Profile Information */}
      <div className="text-truncate">
        {/* Name and Checkmark */}
        <div className="text-truncate">
          <span
            className="fw-semibold"
            style={{
              fontSize: "15px",
              fontWeight: 600,
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            {name}
          </span>{" "}
          <Checkmark loading="" accountId={accountId} />
        </div>

        {/* Account ID */}
        <small>
          <span
            className="text-truncate"
            style={{
              ...accountNameStyle,
              marginTop: "-0.1em",
              display: "block",
            }}
          >
            @{accountId}
          </span>
        </small>

        {/* Description and Tags */}
        <div className="text-truncate" style={textMutedStyle}>
          {tags.length > 0 && (
            <>
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="me-1 fw-light badge border border-muted text-muted"
                  style={tagStyle}
                >
                  {tag}
                </span>
              ))}
            </>
          )}
          {!props.hideDescription && <span>{description}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProfileInlineBlock;
