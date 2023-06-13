import { BACKEND_URL, ERROR_MSG_400, ERROR_MSG_400_INVALID_PATH, ERROR_MSG_404 } from "./appConstants";
import { AssetType, AssetTypeData, GameGenre, GameGenreData, Asset, createDynamicImg, Result, UserAccount, FetchApiResponse } from "./types";

import boilerstoreLogo from '../boilerstore_logo.svg';



export const assetsTypes: AssetTypeData[] = [
    {
        name: '3D Model',
        key: AssetType.Image,
        description: 'aaaa',
        icon: '',
        examples: [
            'fps',
        ],
    },
];

export const gameGenres: GameGenreData[] = [
    {
        name: 'First Person Shoter',
        key: GameGenre.FPS,
        icon: '',
        description: 'aaaa',
        examples: [
            'fps',
        ],
    },
];

export const assets: Asset[] = [
    {
        title: 'Firts Person Shoter',
        description: 'A fi',
        type: [AssetType.Image],
        tags: ['a', 'b'],
        key: 'fps',
        seller: 'Aaa',
        slides: {
            slides: [
                createDynamicImg({
                    staticUrl: BACKEND_URL + '/' + 'fps.jpeg',
                    staticDescription: ''
                }),
            ],
        },
        price: 1.87,
        discount: 0.05,
    },
    {
        title: 'Bullet Hell',
        description: 'A fi',
        type: [AssetType.Image],
        tags: ['a', 'b'],
        key: 'bullet-hell',
        seller: 'Aaa',
        slides: {
            slides: [
                createDynamicImg({
                    staticUrl: BACKEND_URL + '/' + 'bullet_hell.jpeg',
                    staticDarkImage: true,
                    staticDescription: BACKEND_URL + '/' + 'enterTheGungeon.gif',
                    dynamicDarkImage: true,
                }),
            ],
        },
        price: 12.87,
        discount: 0.05,
    },
    {
        title: 'Zelda Like',
        description: 'A fi',
        seller: 'Aaa',
        type: [AssetType.Image],
        tags: ['a', 'b'],
        key: 'zelda-like',
        slides: {
            slides: [
                createDynamicImg({
                    staticUrl: BACKEND_URL + '/' + 'zelda_like.png',
                    staticDescription: '',
                }),
            ],
        },
        price: 1.87,
        discount: 0.05,
    },
];


export const LISTS_OF_CONTENTS: {
    [key: string]: AssetTypeData[] | GameGenreData[] | Asset[]
} = {
    'asset-type': assetsTypes,
    'game-genre': gameGenres,
    'asset': assets,
};

export const userAccounts: UserAccount[] = [
    { userName: "Jorge", email: "jorge@mail.com", password: "123", isAdmin: false, },
    { userName: "Ademir", email: "admin@mail.com", password: "admin", isAdmin: true, },
];

export async function fetchMockupData(query: string): Promise<Result<FetchApiResponse>> {
    const queryComponents = query.split('/');
    const listOfContent = LISTS_OF_CONTENTS[queryComponents[1]];//as (AssetTypeData[] | GameGenreData[] | Asset[] | null | undefined);
    //const fetchedData = listOfContent.find((el: any) => el.key === queryComponents[2]) 

    if (null === listOfContent || undefined === listOfContent) {
        return {
            ok: false,
            content: ERROR_MSG_400_INVALID_PATH,
        };
    }

    console.log('request');
    console.log(queryComponents[2]);

    let fetchedData: null | FetchApiResponse = null;

    for (const el of listOfContent) {
        console.log(el.key);
        if (0 === el.key.localeCompare(queryComponents[2])) {
            fetchedData = el as FetchApiResponse;
            break;
        }
    }

    if (null === fetchedData || undefined === fetchedData) {
        return {
            ok: false,
            content: ERROR_MSG_404,
        };
    }

    console.log('got here A');
    let result = fetchedData;
    console.log('Result is');
    console.log(result);

    return {
        ok: true,
        content: fetchedData,
    };
}
