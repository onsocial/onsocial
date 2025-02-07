import React, { useEffect, useState } from "react";
import Markdown from "react-markdown"; // Assuming you are using react-markdown for rendering markdown content
import styled from "styled-components";
import ProfileInlineBlock from "./ProfileInlineBlock"; // Import your ProfileInlineBlock component
import FollowStats from "./FollowStats"; // Import your FollowStats component
import FollowsYouBadge from "./FollowsYouBadge"; // Import your FollowsYouBadge component
import FollowButton from "./FollowButton"; // Import your FollowButton component
import PokeButton from "./PokeButton"; // Import your PokeButton component

const Description = styled.div`
  max-height: 8rem;
  position: relative;
  overflow: hidden;
  font-family: 'Open Sans', sans-serif;
  font-size: 14.5px;
  overflow: hidden;
  box-sizing: border-box;
  word-wrap: break-word;
  word-break: break-word;

  h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
    font-size: 14.5px;
    margin: 0;
    word-wrap: break-word;
    word-break: break-word;
  }

  p {
    margin: 0;
    font-size: 14.5px;
    word-wrap: break-word;
    word-break: break-word;
  }

  :after {
    content  : "";
    position : absolute;
    z-index  : 1;
    top   : 4rem;
    left     : 0;
    pointer-events   : none;
    background-image : linear-gradient(to bottom, 
                      rgba(255,255,255, 0), 
                      rgba(255,255,255, 1) 90%);
    width    : 100%;
    height   : 4rem;
  }

  @media (max-width: 767px) {
    width: 90%;
    margin: 0 auto;
  }

  @media (max-width: 1024px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const ProfileDetails = ({ accountId }) => {
  if (!accountId) {
    return <div>Requires accountID prop</div>;
  }

  // State to hold the description
  const [description, setDescription] = useState("");

  // Assuming Social.get is an asynchronous function, we'll use useEffect to fetch the description
  useEffect(() => {
    // Simulating a Social.get function. Replace this with your actual API call.
    const fetchDescription = async () => {
      // Fetch description based on accountId
      const result = await Social.get(`${accountId}/profile/description`);
      setDescription(result || "No description available");
    };

    fetchDescription();
  }, [accountId]);

  return (
    <div className="d-flex flex-column gap-1" style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
      <a href={`#/onsocial.near/widget/ProfilePage?accountId=${accountId}`} className="link-dark text-truncate">
        <ProfileInlineBlock accountId={accountId} hideDescription={true} style={{ wordWrap: "break-word", wordBreak: "break-word", width: "70%" }} />
      </a>

      <Description>
        <Markdown>{description}</Markdown>
      </Description>

      <div className="d-flex" style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
        <div className="me-3">
          <FollowStats accountId={accountId} />
        </div>
        <FollowsYouBadge accountId={accountId} />
      </div>

      <div className="d-flex gap-2" style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
        <FollowButton accountId={accountId} />
        <PokeButton accountId={accountId} />
      </div>
    </div>
  );
};

export default ProfileDetails;
