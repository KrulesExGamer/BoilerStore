import { useEffect, useState } from 'react';
import './AssetPage.css';
import '../shared_styles/common.css';

import { Asset, Result, SlideList } from '../utils/types';
import { useLocation } from 'react-router-dom';
import { fetchAsset } from '../utils/apiCalls';
import { STATUS_MSG_100_YET_TO_SENT } from '../utils/appConstants';


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

const AssetPageContents = (props: {
    assetData: Asset,
    assetImgs: SlideList | null,
}) => {
    return (
        <>
            <p>Hello World!</p>
            <div className='AssetPage-rightside'></div>
            <div className='AssetPage-leftside'>
                <h2 className='round-line-div'>{props.assetData.title}</h2>
                <p className='round-line-div'>{props.assetData.description}</p>
            </div>
        </>
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