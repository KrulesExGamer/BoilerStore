import React, { useState } from 'react';
import './ItemWindow.css'
import IconButton from './IconButton';
import Circle from './Circle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type Slide = { staticImage: string, dynamicImage: string | undefined, description: string, darkImage: boolean | undefined };
export type WindowData = { title: string, description: string, slides: Slide[], icon: any, key: string | undefined };

const ItemWindow = (props: { windowData: WindowData, colors: [string, string] }) => {
    const [mouseOver, setMouseOver] = useState(false); // initiate it at false
    const [boxShadow, setBoxShadow] = useState(`2px 2px 4px ${props.colors[0]}`);
    let imgIndex = 0;

    const slides = props.windowData.slides;

    // TODO: It might be a good idea to rewrite this into a more readble way.
    const pickImg = (i: number) =>
        mouseOver
            ? (
                slides[i].dynamicImage
                    ? slides[i].dynamicImage
                    : slides[i].staticImage
            )
            : slides[i].staticImage;

    return (
        <article className='ItemWindow'>

            <div
                className='ItemWindow-container'
                onMouseEnter={(event) => {
                    setMouseOver(true);
                    setBoxShadow(`4px 4px 8px ${props.colors[1]}`);
                }}
                onMouseLeave={() => {
                    setMouseOver(false);
                    setBoxShadow(`2px 2px 4px ${props.colors[0]}`);
                }}
                style={{
                    boxShadow: boxShadow,
                }}
            >
                <div className='ItemWindow-subcontainer' >
                    {props.windowData.icon && (
                        <div className='ItemWindow-type ItemWindow-stackItem' >
                            <Circle color='white' diameter='50px'>
                                <FontAwesomeIcon icon={props.windowData.icon} />
                            </Circle>
                        </div>
                    )}
                    <h3
                        style={{
                            color: slides[imgIndex].darkImage ? 'white' : 'black',
                            background:
                                slides[imgIndex].darkImage
                                    ? 'linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))'
                                    : 'linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
                        }}
                    >
                        {props.windowData.title}
                    </h3>
                    <img className='ItemWindow-img ItemWindow-stackItem' src={pickImg(imgIndex)} alt={slides[imgIndex].description} />

                </div>
            </div>
        </article>
    );
};

export default ItemWindow;
