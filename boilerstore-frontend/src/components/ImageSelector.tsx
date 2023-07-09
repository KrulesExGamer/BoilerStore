import { useState } from 'react';
import './ImageSelector.css';
import { CoolImage } from '../utils/types';


const ImageSelector = (props : {
    images : CoolImage[],
}) => {
    let [imgIndex, setImgIndex] = useState(0);

    console.log('ImageSelector:');
    console.log(props.images);

    return (
        <div className='ImageSelector'>
            <div className='ImageSelector-img-shower'>
                <img 
                    alt={props.images[imgIndex]?.static.alt ?? ''}
                    src={props.images[imgIndex]?.static.img ?? ''}
                />
            </div>
            <div className='ImageSelector-img-picker'>
                {/* TODO: Implement  */}
            </div>
        </div>
    );
}

export default ImageSelector;