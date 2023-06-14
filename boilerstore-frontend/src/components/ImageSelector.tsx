import { useState } from 'react';
import './ImageSelector.css';
import { ImageTagData, ImgData } from '../utils/types';


const ImageSelector = (props : {
    images : ImageTagData[],
}) => {
    let [imgIndex, setImgIndex] = useState(0);

    console.log('ImageSelector:');
    console.log(props.images);

    return (
        <div className='ImageSelector'>
            <div className='ImageSelector-img-shower'>
                <img 
                    alt={props.images[imgIndex]?.alt ?? ''}
                    src={props.images[imgIndex]?.src ?? ''}
                />
            </div>
            <div className='ImageSelector-img-picker'>
                {/* TODO: Implement  */}
            </div>
        </div>
    );
}

export default ImageSelector;