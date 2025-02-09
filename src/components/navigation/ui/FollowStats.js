import React, { useState, useEffect } from "react";

const FollowStats = ({ accountId }) => {
  const [numFollowing, setNumFollowing] = useState(null);
  const [numFollowers, setNumFollowers] = useState(null);

  useEffect(() => {
    if (!accountId) {
      return;
    }

    const fetchProfileStats = async () => {
      // Fetch following data
      const following = await Social.keys(`${accountId}/graph/follow/*`, "final", {
        return_type: "BlockHeight",
        values_only: true,
      });

      // Fetch followers data
      const followers = await Social.keys(`*/graph/follow/${accountId}`, "final", {
        return_type: "BlockHeight",
        values_only: true,
      });

      // Process following count
      const followingCount = following
        ? Object.keys(following[accountId].graph.follow || {}).length
        : null;
      setNumFollowing(followingCount);

      // Process followers count
      const followersCount = followers ? Object.keys(followers || {}).length : null;
      setNumFollowers(followersCount);
    };

    fetchProfileStats();
  }, [accountId]); // This will run when accountId changes

  return (
    <div>
      {accountId && (
        <div className="d-flex flex-row">
          <div className="me-4">
            <a
              href={`#/onsocial.near/widget/ProfilePage?accountId=${accountId}&tab=following`}
              className="text-dark"
              style={{
                color: "#232528",
                fontFamily: "Open Sans",
                fontSize: "15px",
              }}
            >
              {numFollowing !== null ? (
                <span style={{ fontWeight: "600" }}>{numFollowing}</span>
              ) : (
                "?" // Placeholder while loading
              )}{" "}
              <span className="text-muted" style={{ color: "#58606F" }}>
                Following
              </span>
            </a>
          </div>
          <div>
            <a
              href={`#/onsocial.near/widget/ProfilePage?accountId=${accountId}&tab=followers`}
              className="text-dark"
              style={{
                color: "#232528",
                fontFamily: "Open Sans",
                fontSize: "15px",
              }}
            >
              {numFollowers !== null ? (
                <span style={{ fontWeight: "600" }}>{numFollowers}</span>
              ) : (
                "?" // Placeholder while loading
              )}{" "}
              <span className="text-muted" style={{ color: "#58606F" }}>
                Follower{numFollowers !== 1 && "s"}
              </span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowStats;