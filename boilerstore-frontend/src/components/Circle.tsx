import React, { ReactNode } from 'react';
import './Circle.css'

const Circle = (props: { diameter: string | undefined, color: string | undefined, children: ReactNode | undefined }) => {
  return (
    <div
      className='Circle'
      style={{
        width: props.diameter,
        height: props.diameter,
        backgroundColor: props.color,
      }}
    >
      {props.children}
    </div>
  );
};

Circle.defaultProps = {
  diameter: undefined,
  color: undefined,
  children: undefined,
};

export default Circle;
