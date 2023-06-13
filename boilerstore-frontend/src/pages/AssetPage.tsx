import { useEffect, useState } from 'react';
import { Asset, SlideList } from '../utils/types';
import './AssetPage.css';
import { useLocation } from 'react-router-dom';
import { fetchAsset } from '../utils/apiCalls';


//

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
    const [assetData, setAssetData] = useState<Asset | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data : any = await fetchAsset(assetKey);
                console.log('got to component, assetKey is:');
                console.log(assetKey);
                setAssetData(data);
            } catch (error) {
                // Handle error, e.g., show an error message or fallback content
                console.error('Error fetching asset:', error);
            }
        };

        fetchData();
    }, [assetKey]);

    return assetData;
};

const AssetPageContents = (props: {
    assetData: Asset | null | any,
    assetImgs: SlideList | null,
}) => {
    return (
        <p>Hello World!</p>
    );
};

const AssetPage = () => {
    let assetKey = useAssetKey();
    let assetData = fetchAsset(assetKey);

    return (
        <section className='AssetSection'>
            <div className='AssetPage'>
                <AssetPageContents
                    assetData={assetData}
                    assetImgs={null}
                />
            </div>
        </section>
    );
}

export default AssetPage;