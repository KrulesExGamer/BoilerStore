import { useContext, useEffect, useState } from 'react';
import './AssetPage.css';
import '../shared_styles/common.css';

import { Asset, ImgData, Result, SlideList } from '../utils/types';
import { useLocation } from 'react-router-dom';
import { fetchAsset, fetchAssetImages } from '../utils/apiCalls';
import { STATUS_MSG_100_YET_TO_SENT } from '../utils/appConstants';
import TwinLayout from './TwinLayout';
import ImageSelector from '../components/ImageSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../Context';


// Custom hook to manage the asset key passed by the url
const useAssetKey = (): string => {
    const location = useLocation();
    let [assetKey, setAssetKey] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setAssetKey(searchParams.get('asset') ?? '');
    }, [location]);

    return assetKey;
}

const useAssetData = (assetKey: string) => {
    const [assetData, setAssetData] = useState<Result<Asset>>({
        ok: false,
        content: STATUS_MSG_100_YET_TO_SENT,
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAsset(assetKey);
            console.log('got to component, assetKey is:');
            console.log(assetKey);
            setAssetData(data);
        };

        fetchData();
    }, [assetKey]);

    return assetData;
};

const useAssetImages = (assetData: Result<Asset>) => {
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (assetData.ok) {
                const images = await fetchAssetImages(assetData.content as Asset);
                setImages(images);
            } else {
                setImages([]);
            }
        };

        fetchData();
    }, [assetData]);

    return images;
};

const AssetPageContents = (props: {
    assetData: Asset,
    assetImgs: ImgData[] | null,
}) => {
    const {userState, setUserState} = useContext(UserContext)
    const debbug_is_adming = false;

    const assetImgs = props.assetImgs ?? [{
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_521061.png&f=1&nofb=1&ipt=f161d9fa1c208cc5d1126fbaf6be445c4fb82a64a8cbbedad0c422893d2f4200&ipo=images',
        description: 'A BUG!!! This is just an example Image.',
    }];

    return (
        <TwinLayout
            left={(<>
                <ImageSelector images={assetImgs} />
            </>)}
            right={(
                <div className='right-side-asset-data'>
                    <h2 className='round-line-div'>{props.assetData.title}</h2>

                    <div style={{display: 'flex'}}>
                        <button className='assetpage-button'> 
                            {'--->'} Add to cart  <FontAwesomeIcon icon={faCartShopping} /> {'<---'} 
                        </button>
                        { (userState?.isAdmin || debbug_is_adming) && (
                            <button className='assetpage-button'>  
                                Edit  <FontAwesomeIcon icon={faCartShopping} /> 
                            </button>
                        )}
                    </div>

                    <div className='asset-description round-line-div'>
                        <p>{props.assetData.description}</p>
                    </div>

                    <div className='asset-tags-div'>
                        <p className='asset-tags-label '>Tags:</p>
                        <ul className='asset-tags-list'>
                            {props.assetData.tags.map((tag) => (
                                <li> {`#${tag} `} </li>
                            ))}
                        </ul>
                    </div>

                    <br></br>
                        
                    <div style={{display: 'flex'}}>
                        <p className='round-line-div' style={{marginRight: '20px'}}>
                            Seller:
                        </p>
                        <p className='round-line-div'>
                            {props.assetData.seller}
                        </p>
                    </div>
                </div>
            )}
        />
    );
}

const AssetNotFound = () => {
    return (
        <>
            <h1>Asset Not Found</h1>
            <p>Ops! We couldn't find this asset :( </p>
        </>
    );
}

const Loading = () => {
    return (
        <>
            <h1>Loading</h1>
        </>
    );
}

const useAssetPageBody = (assetData: Result<Asset>) => {
    let [assetPageBody, setAssetPageBody] = useState(<Loading />);

    useEffect(() => {
        if (assetData.ok) {
            setAssetPageBody(<AssetPageContents
                assetData={assetData.content as Asset}
                assetImgs={null}
            />);
        } else if (assetData.content !== STATUS_MSG_100_YET_TO_SENT) {
            setAssetPageBody(<AssetNotFound />);
        }
    }, [assetData]);

    return assetPageBody;
};


const AssetPage = () => {
    let assetKey = useAssetKey();
    let assetData = useAssetData(assetKey);
    let assetImages = useAssetImages(assetData);
    let assetPageBody = useAssetPageBody(assetData);

    return (
        <section className='AssetSection'>
            <div className='AssetPage'>
                {assetPageBody}
            </div>
        </section>
    );
}

export default AssetPage;