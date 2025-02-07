import React from 'react';
import NCommonOverlayTrigger from './NCommonOverlayTrigger'; // Import the previously created component
import ProfilePopover from './ProfilePopover'; // Import your Profile.Popover component

const ProfileOverlayTrigger = (props) => {
  const { accountId, children, ...restProps } = props;

  return (
    <NCommonOverlayTrigger
      popup={<ProfilePopover accountId={accountId} />}
      {...restProps} // Spread other props if needed
    >
      {children}
    </NCommonOverlayTrigger>
  );
};

export default ProfileOverlayTrigger;
