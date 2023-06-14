import { BACKEND_URL, ERROR_MSG_400, ERROR_MSG_400_NOT_AN_ASSET, ERROR_MSG_400_NOT_IMPLEMENTED, USING_MOCKUP } from "./appConstants";
import { fetchMockupData, fetchMockupImg, userAccounts } from "./mockupData";
import { Asset, DynamicImg, FetchApiResponse, ImageTagData, ImgData, Result, isAsset, UserState } from "./types";


// Example of query: 'api/asset/cool-model
export async function fetchApi(query: string): Promise<Result<FetchApiResponse>> {
    if (USING_MOCKUP) { // Calls an API from the list of valid APIs
        return fetchMockupData(query);
    }

    return {
        ok: false,
        content: ERROR_MSG_400_NOT_IMPLEMENTED,
    };

    // TODO: Implement real api calls.
    // if (USING_MOCKUP) {
    //     try {
    //         const response = await fetch(`${BACKEND_URL}/${query}`);
    //         const resultData = await response.json();
    //         return {
    //             ok: true,
    //             value: resultData,
    //         };
    //     } catch (error) {
    //         console.log('Error:', error);
    //         return {
    //             ok: false,
    //             value: error,
    //         };
    //     }
    // }
}

// Requests an image
export async function fetchImage(url: string): Promise<Result<any>> {
    if (USING_MOCKUP) {
        return fetchMockupImg(url);
    }

    return {
        ok: false,
        content: ERROR_MSG_400_NOT_IMPLEMENTED,
    };
}

export async function fetchAssetImages(asset: Asset): Promise<ImageTagData[]> {
    let promises = asset.slides.slides.map(async (item) => {
        if ((item as ImgData)?.url) {
            const response = await fetchImage((item as ImgData)?.url);

            const result: ImageTagData = {
                ok: response.ok,
                src: response.ok ? response.content : '',
                err: response.ok ? '' : response.content,
                alt: (item as ImgData)?.description,
            };

            return result;
        }

        if ((item as DynamicImg)?.static) {
            const response = await fetchImage((item as DynamicImg)?.static.url);

            const result: ImageTagData = {
                ok: response.ok,
                src: response.ok ? response.content : '',
                err: response.ok ? '' : response.content,
                alt: (item as DynamicImg)?.static.description,
            };

            return result;
        }

        return { ok: false, err: ERROR_MSG_400, src: '', alt: '' };
    });

    let results = [];

    console.log('Results of Fetch Image');
    for (let p of promises) {
        let result = await p;
        results.push(result);
        console.log(result);
    }

    return results;
}

// Request an asset
export async function fetchAsset(assetKey: string): Promise<Result<Asset>> {
    const fetchedData = await fetchApi(`api/asset/${assetKey}`);
    console.log('got to fetchAsset');

    // NOTE: isAsset function is not working properly
    // TODO: fix isAsset
    // if (fetchedData.ok && !isAsset(fetchedData.content)) {
    //     return {
    //         ok: false,
    //         content: ERROR_MSG_400_NOT_AN_ASSET,
    //     };
    // }

    return fetchedData as Result<Asset>;
}

export async function fetchGameGenre(gameGenreKey: string) {
    try {
        return fetchApi(`api/game-genre/${gameGenreKey}`);
    } catch (err) {
        throw err;
    }
}

// export async function fetchAssetType(assetTypeKey: string) {
//     try {
//         return fetchApi(`api/asset-type/${assetTypeKey}`);
//     } catch (err) {
//         throw err;
//     }

// }

// // TODO : implement searchAssets
// export async function searchAssets(args: {
//     query: string,
//     assetTypes: AssetType[],
//     tags: string[],
//     author: string,
//     dateRange: [string, string],
//     priceRange: [number, number],
// }) {
//     return new Promise(() => '');
// }

// // TODO : implement updateAsset
// export async function updateAsset(args: {
//     assetKey: string,
//     newAsset: Asset,
//     credentials: string,
// }) {
//     return { status: 'Sucess' };
// }

// Validates a login request
export function validateLogin(name : string, password : string) {
    const none : UserState = {isLoggedIn: false};
    
    for (let account of userAccounts)
        // More secure algorythm will be used in later implementations
        if ((account.userName.toLocaleLowerCase() === name.toLocaleLowerCase() 
            || account.email.toLocaleLowerCase() === name.toLocaleLowerCase()) 
                && account.password === password)
        {    
            const login : UserState = {
                isLoggedIn: true, 
                userName: account.userName, 
                email: account.email, 
                isAdmin: account.isAdmin
            }

            return login;
        }

    return none;
}

// Validates a sign in or recovery request
export function validateAccount({ task = "", name = "", email = "", password = "" }) {
    if (task === "signup") {
        for (let account of userAccounts)
            // More secure algorythm will be used in later implementations
            if (account.userName.toLocaleLowerCase() === name.toLocaleLowerCase() 
                || account.email.toLocaleLowerCase() === email.toLocaleLowerCase())
                return false

        return true;
    }

    else if (task === "recovery") {
        for (let account of userAccounts)
            // More secure algorythm will be used in later implementations
            if (account.email === email)
                return true

        return false;
    }

    else
        return false;
}
