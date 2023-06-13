import { BACKEND_URL } from "./constants";
import { AssetType, AssetTypeData, GameGenre, GameGenreData, Asset, createDynamicImg, Result, UserAccount } from "./types";


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

export let assets: Asset[] = [
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
        key: 'bullet-hell',
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



export const LISTS_OF_CONTENTS: any = {
    'AssetsType': assetsTypes,
    'GameGenres': gameGenres,
    'Assets': assets,
};

export const userAccounts: UserAccount[] = [
    { userName: "Jorge", email: "jorge@mail.com", password: "123", isAdmin: false, },
    { userName: "Ademir", email: "admin@mail.com", password: "admin", isAdmin: true, },
];

export async function fetchMockupData(query: string): Promise<Result> {
    const queryComponents = query.split('/');
    const listOfContent = LISTS_OF_CONTENTS[queryComponents[1]];
    const fetchedData = listOfContent.find((el: any) => el.key === queryComponents[2]);

    return { ok: fetchedData !== undefined, value: fetchedData };
}
