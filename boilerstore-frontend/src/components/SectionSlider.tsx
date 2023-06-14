import React, { useState, useRef, useEffect } from 'react';
import './SectionSlider.css'
import ItemWindow, { Slide, WindowData } from '../components/ItemWindow';
import { Circle } from '@react-three/drei';
import CircleIcon from '../components/CircleIcon';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../components/IconButton';
import { useWindowResize } from '../utils/customHooks';
import { Link } from 'react-router-dom';


const UNUSABLE_SPACE = 20 + 60 + 60 + 20 + 30; // padding + arrow + arrow + padding + magic number (idk)


const SectionSlider = (props: {
    list: WindowData[], 
    colors : [string, string]

    itemQuery : string,
    searchQuery : string,

    windowWidth : string | null,
    windowHeight : string | null,

    displayPrice : boolean | null,
}) => {
    const { width } = useWindowResize();
    const listContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (factor: number) => {
        if (listContainerRef.current) {
            listContainerRef.current.scrollLeft += factor * (width - UNUSABLE_SPACE); // Adjust the scroll amount as needed
        }
    };

    let keiIndex = 0;


    const [hasScrollbar, setHasScrollbar] = useState(false);

    useEffect(() => {
        const checkScrollbar = () => {
            if (listContainerRef.current) {
                const hasScrollbar = listContainerRef.current.scrollWidth > listContainerRef.current.clientWidth;
                setHasScrollbar(hasScrollbar);
            }
        };

        window.addEventListener('resize', checkScrollbar);
        checkScrollbar();

        return () => {
            window.removeEventListener('resize', checkScrollbar);
        };
    }, []);

    return (
        <div className='SectionSlider' >

            {/* ----------//    Left Arrow    //---------- */}
            {hasScrollbar && (
                <button onClick={() => scroll(-1)}>
                    <div className='arrow-left'>
                        <IconButton icon={faArrowCircleLeft} size='4x' />
                    </div>
                </button>
            )}

            {/* ----------//    List    //---------- */}
            <div className='list-container' ref={listContainerRef} >
                <ul>
                    {/* HOT FIX: Not entirely shure why, but this place holder is vital.
                            although it has no content, without it, the list breaks.
                    */}
                    <li key='_placeHolder'><div className='placeHolder'></div></li>

                    {
                        props.list.map(
                            (item) => { return (
                                <Link to={ props.itemQuery.replace('__PLACEHOLDER__', item.key) }>
                                    <li key={item.key}>
                                        <ItemWindow windowData={item} colors={props.colors} displayPrice={props.displayPrice} />
                                    </li>
                                </Link>
                            ); }
                        )
                    }
                </ul>
            </div>

            {/* ----------//    Right Arrow    //---------- */}
            {hasScrollbar && (
                <button onClick={() => scroll(1)}>
                    <div className='arrow-right'>
                        <IconButton icon={faArrowCircleRight} size='4x' />
                    </div>
                </button>
            )}

        </div>
    );
};

SectionSlider.defaultProps = {
    windowWidth: null,
    windowHeight: null,
    displayPrice: null,
};

export type { Slide, WindowData };
export default SectionSlider;