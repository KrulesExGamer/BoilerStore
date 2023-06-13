import { BACKEND_URL, USING_MOCKUP } from "./constants";
import { LISTS_OF_CONTENTS, userAccounts } from "./mockupData";
import { AssetType, AssetTypeData, GameGenre, GameGenreData, Asset, createDynamicImg, Result } from "./types";
import fetch from 'node-fetch';


// Example of query: 'api/assets/cool-model
export async function fetchApi(query: string): Promise<Result> {
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

    const queryComponents = query.split('/');
    const listOfContent = LISTS_OF_CONTENTS[queryComponents[1]];
    const fetchedData = listOfContent.find((el: any) => el.key === queryComponents[2]);

    return { ok: fetchedData !== undefined, value: fetchedData };
}

export async function fetchImage(url: string): Promise<String> {
    // return USING_MOCKUP
    //     ? LISTS_OF_CONTENTS[url.replace(BACKEND_URL, '')]
    //     : fetch(url);
    return LISTS_OF_CONTENTS[url.replace(BACKEND_URL, '')];
}

export async function fetchAsset(assetKey: string) {
    return fetchApi(`api/asset/${assetKey}`);
}

export async function fetchGameGenres(gameGenreKey: string) {
    return fetchApi(`api/game-genre/${gameGenreKey}`);
}

export async function fetchAssetTypes(assetTypeKey: string) {
    return fetchApi(`api/asset-type/${assetTypeKey}`);
}

// TODO : implement searchAssets
export async function searchAssets(args: {
    query: string,
    assetTypes: AssetType[],
    tags: string[],
    author: string,
    dateRange: [string, string],
    priceRange: [number, number],
}) {
    return new Promise(() => '');
}

// TODO : implement updateAsset
export async function updateAsset(args: {
    assetKey: string,
    newAsset: Asset,
    credentials: string,
}) {
    return { status: 'Sucess' };
}


export function validateAccount({task = "", name = "", email = "", password = ""}) {
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
