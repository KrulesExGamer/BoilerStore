import { BACKEND_URL, ERROR_MSG_400_NOT_AN_ASSET, ERROR_MSG_400_NOT_IMPLEMENTED, USING_MOCKUP } from "./appConstants";
import { fetchMockupData, userAccounts } from "./mockupData";
import { Asset, FetchApiResponse, Result, isAsset } from "./types";



// Example of query: 'api/asset/cool-model
export async function fetchApi(query: string): Promise<Result<FetchApiResponse>> {
    if (USING_MOCKUP) {
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



// export async function fetchImage(url: string): Promise<String> {
//     // return USING_MOCKUP
//     //     ? LISTS_OF_CONTENTS[url.replace(BACKEND_URL, '')]
//     //     : fetch(url);
//     return LISTS_OF_CONTENTS[url.replace(BACKEND_URL, '')];
// }

export async function fetchAsset(assetKey: string): Promise<Result<Asset>> {
    const fetchedData = await fetchApi(`api/asset/${assetKey}`);
    console.log('got to fetchAsset');

    if (fetchedData.ok && !isAsset(fetchedData.content)) {
        return {
            ok: false,
            content: ERROR_MSG_400_NOT_AN_ASSET,
        };
    }

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


export function validateAccount({ task = "", name = "", email = "", password = "" }) {
    if (task === "login") {
        for (let account of userAccounts)
            // More secure algorythm will be used in later implementations
            if ((account.userName === name || account.email === name) && account.password === password)
                return true

        return false;
    }

    else if (task === "signup") {
        for (let account of userAccounts)
            // More secure algorythm will be used in later implementations
            if (account.userName === name || account.email === email)
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

export { BACKEND_URL };
