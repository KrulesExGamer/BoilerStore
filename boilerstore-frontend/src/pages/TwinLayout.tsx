import React, { ReactNode } from 'react';
import './TwinLayout.css';

const TwinLayout = (props: {
    nameClass? : string,
    left: ReactNode,
    right: ReactNode,
}) => {
    let someExtraNameClass : string = props.nameClass ?? '';
    someExtraNameClass = '' === someExtraNameClass ? '' : ' ' + someExtraNameClass;

    return (
        <div className={'TwinLayout-container' + someExtraNameClass}>
            <div className='TwinLayout-leftContent'>
                {props.left}
            </div>
            <div className='TwinLayout-rightContent'>
                {props.right}
            </div>
        </div>
    );
};

export default TwinLayout;
