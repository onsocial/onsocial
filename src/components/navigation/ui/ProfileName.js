import React, { useState, useEffect } from 'react';

const ProfileName = (props) => {
  const { accountId: propsAccountId } = props;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use props.accountId or fallback to context.accountId
  const accountId = propsAccountId ?? context.accountId;

  useEffect(() => {
    if (!accountId) {
      setError("No account ID");
      setLoading(false);
      return;
    }

    // Fetch profile data from Near SocialDB contract
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://free.rpc.fastnear.com`, // Near RPC endpoint
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: 'dontcare',
              method: 'query',
              params: {
                request_type: 'call_function',
                account_id: 'social.near', // SocialDB contract
                method_name: 'get',
                args_base64: btoa(
                  JSON.stringify({
                    keys: [`${accountId}/profile/**`],
                  })
                ),
                finality: 'optimistic',
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error.message);
        }

        // Decode the response (base64 encoded)
        const result = JSON.parse(
          new TextDecoder().decode(new Uint8Array(data.result.result))
        );

        // Extract profile data
        const profileData = result[accountId]?.profile;
        if (profileData) {
          setProfile(profileData);
        } else {
          throw new Error("Profile not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [accountId]);

  // If no accountId is found, return an error message
  if (!accountId) {
    return "No account ID";
  }

  // If loading, return a loading message
  if (loading) {
    return "Loading...";
  }

  // If there's an error, return the error message
  if (error) {
    return `Error: ${error}`;
  }

  // If the profile doesn't have a name, return a fallback message
  if (!profile?.name) {
    return "No profile name found";
  }

  // Render the profile name
  return <div className="profile-name">{profile.name}</div>;
};

export default ProfileName;