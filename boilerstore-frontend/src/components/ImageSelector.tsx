import { useState } from 'react';
import './ImageSelector.css';
import { ImgData } from '../utils/types';


const ImageSelector = (props : {
    images : ImgData[],
}) => {
    let [imgIndex, setImgIndex] = useState(0);

    return (
        <div className='ImageSelector'>
            <div className='ImageSelector-img-shower'>
                <img 
                    alt={props.images[imgIndex].description}
                    src={props.images[imgIndex].url}
                />
            </div>
            <div className='ImageSelector-img-picker'>
                {/* TODO: Implement  */}
            </div>
        </div>
    );
}

export default ImageSelector;