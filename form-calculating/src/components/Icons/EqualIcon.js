import React from 'react';

function EqualIcon({ className, ariaLabel, title }) {
  return (
    <svg
      width='16'
      height='16'
      aria-label={ariaLabel}
      aria-hidden='true'
      focusable='false'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 448 512'
      className={className}
      title={title}>
      <path
        fill='currentColor'
        d='M416 304H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32zm0-192H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z'></path>
    </svg>
  );
}

export default EqualIcon;
