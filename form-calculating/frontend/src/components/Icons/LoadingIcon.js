import React from 'react';

function LoadingIcon({ className }) {
  return (
    <svg
      width='50px'
      height='50px'
      xmlns='http://www.w3.org/2000/svg'
      style={{ margin: 'auto', background: 'transparent', display: 'block', shapeRendering: 'auto' }}
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
      className={className}>
      <circle cx='50' cy='50' r='0' fill='none' stroke='#fff' strokeWidth='2'>
        <animate
          attributeName='r'
          repeatCount='indefinite'
          dur='1s'
          values='0;40'
          keyTimes='0;1'
          keySplines='0 0.2 0.8 1'
          calcMode='spline'
          begin='0s'></animate>
        <animate
          attributeName='opacity'
          repeatCount='indefinite'
          dur='1s'
          values='1;0'
          keyTimes='0;1'
          keySplines='0.2 0 0.8 1'
          calcMode='spline'
          begin='0s'></animate>
      </circle>
      <circle cx='50' cy='50' r='0' fill='none' stroke='#667395' strokeWidth='2'>
        <animate
          attributeName='r'
          repeatCount='indefinite'
          dur='1s'
          values='0;40'
          keyTimes='0;1'
          keySplines='0 0.2 0.8 1'
          calcMode='spline'
          begin='-0.5s'></animate>
        <animate
          attributeName='opacity'
          repeatCount='indefinite'
          dur='1s'
          values='1;0'
          keyTimes='0;1'
          keySplines='0.2 0 0.8 1'
          calcMode='spline'
          begin='-0.5s'></animate>
      </circle>
    </svg>
  );
}

export default LoadingIcon;
