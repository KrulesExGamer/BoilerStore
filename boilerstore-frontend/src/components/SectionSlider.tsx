import React, { useState, useRef, useEffect } from 'react';
import './SectionSlider.css'
import ItemWindow, { Slide, WindowData } from '../components/ItemWindow';
import { Circle } from '@react-three/drei';
import CircleIcon from '../components/CircleIcon';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../components/IconButton';
import { useWindowResize } from '../utils/windowSize';
import { Link } from 'react-router-dom';


const ITEM_WINDOW_WIDTH_CONSERVATIVE = 20 + 290 + 20;
const ITEM_WINDOW_WIDTH = 20 + 290 + 20 + 30; // margin + width + margin + magic number (idk)
const UNUSABLE_SPACE = 20 + 60 + 60 + 20 + 30; // padding + arrow + arrow + padding + magic number (idk)


const SectionSlider = (props: { list: WindowData[], colors : [string, string] }) => {
    let [index, setIndex] = useState(0);

    const { width } = useWindowResize();

    const len = props.list.length;
    let slots = Math.floor((width - UNUSABLE_SPACE) / (ITEM_WINDOW_WIDTH));

    if (slots > len) slots = len;

    const list = props.list;//(1 >= slots) ? [props.list[index]] : props.list.slice(index, index + slots);


    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToElement = (elementIndex: number) => {
        if (containerRef.current) {
            const element = containerRef.current.children[elementIndex] as HTMLElement;
            if (element) {
                containerRef.current.scrollLeft = element.offsetLeft;
            }
        }
    };

    const nextIndex = (i: number) => (index + i + len) % len;

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
                    <li key={keiIndex++}><div className='placeHolder'></div></li>

                    {
                        list.map(
                            (genre) => { return (
                                <Link to={`/search?genre=${genre.key}`}>
                                    <li key={genre.key}><ItemWindow windowData={genre} colors={props.colors}/></li>
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

export type { Slide, WindowData };
export default SectionSlider;