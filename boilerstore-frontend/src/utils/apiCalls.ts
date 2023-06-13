import { BACKEND_URL, ERROR_400_NOT_AN_ASSET, ERROR_404, USING_MOCKUP } from "./constants";
import { LISTS_OF_CONTENTS, userAccounts } from "./mockupData";
import { AssetType, AssetTypeData, GameGenre, GameGenreData, Asset, createDynamicImg, Result, isAsset, fetchApiResult, UserState } from "./types";
import fetch from 'node-fetch';
import { types } from "util";



// Example of query: 'api/asset/cool-model
export async function fetchApi(query: string): Promise<fetchApiResult> {
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

    try {
        const queryComponents = query.split('/');
        const listOfContent = LISTS_OF_CONTENTS[queryComponents[1]];
        const fetchedData = listOfContent.find((el: any) => el.key === queryComponents[2]);

        if (undefined === fetchedData || null === fetchedData) throw ERROR_404;

        return fetchedData;
    } catch (err) {
        throw err;
    }
}



export async function fetchImage(url: string): Promise<String> {
    // return USING_MOCKUP
    //     ? LISTS_OF_CONTENTS[url.replace(BACKEND_URL, '')]
    //     : fetch(url);
    return LISTS_OF_CONTENTS[url.replace(BACKEND_URL, '')];
}

export async function fetchAsset(assetKey: string) : Promise<any> {
    try {
        const result = fetchApi(`api/asset/${assetKey}`);
        if (isAsset(result)) throw ERROR_400_NOT_AN_ASSET;
        return result;
    } catch (err) {
        throw err;
    }
}

export async function fetchGameGenre(gameGenreKey: string) {
    try {
        return fetchApi(`api/game-genre/${gameGenreKey}`);
    } catch (err) {
        throw err;
    }
}

export async function fetchAssetType(assetTypeKey: string) {
    try {
        return fetchApi(`api/asset-type/${assetTypeKey}`);
    } catch (err) {
        throw err;
    }

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


export function validateLogin(name : string, password : string) {
    const none : UserState = {isLoggedIn: false};
    
    for (let account of userAccounts)
        // More secure algorythm will be used in later implementations
        if ((account.userName === name || account.email === name) && account.password === password)
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

export function validateAccount({ task = "", name = "", email = "", password = "" }) {
    if (task === "signup") {
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
