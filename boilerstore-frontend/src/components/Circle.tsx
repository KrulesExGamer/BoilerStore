import React, {ReactNode} from 'react';

const Circle = (props : { diameter : string | undefined, color : string | undefined, children : ReactNode | undefined}) => {
  const circleStyle = {
    width: props.diameter,
    height: props.diameter,
    backgroundColor: props.color,
  };

  return <div className='Circle' style={circleStyle}>{props.children}</div>;
};

Circle.defaultProps = {
    diameter: undefined,
    color: undefined,
    children: undefined,
};

export default Circle;
