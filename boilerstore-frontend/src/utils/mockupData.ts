import {
	BACKEND_URL,
	ERROR_MSG_400_INVALID_PATH,
	ERROR_MSG_404,
} from './appConstants';
import {
	AssetType,
	GameGenre,
	Asset,
	Result,
	UserAccount,
	FetchApiResponse,
} from './types';

import boilerstoreLogo from '../img/boilerstore-logo.svg';
import bottle from '../img/bottle.png';
import bottleRemovebgPreview from '../img/bottle-removebg-preview.png';
import bulletHell from '../img/bullet-hell.jpeg';
import enterTheGungeon from '../img/enter-the-gungeon.gif';
import fps from '../img/fps.jpeg';
import porsche from '../img/porsche.png';
import zeldaLike from '../img/zelda-like.png';

export const images: { [key: string]: string } = {
	'boilerstore-logo.svg': boilerstoreLogo,
	'bottle.png': bottle,
	'bottle-removebg-preview.png': bottleRemovebgPreview,
	'bullet-hell.jpeg': bulletHell,
	'enter-the-gungeon.gif': enterTheGungeon,
	'fps.jpeg': fps,
	'porsche.png': porsche,
	'zelda-like.png': zeldaLike,
};

export const assetsTypes: AssetType[] = [
	{
		title: '3D Model',
		slug: 'image',
		description: 'aaaa',
		icon: '',
		examples: ['fps'],
	},
];

export const gameGenres: GameGenre[] = [
	{
		title: 'First Person Shoter',
		slug: 'fps',
		icon: '',
		description: 'aaaa',
		examples: ['fps'],
	},
];

export const assets: Asset[] = [
	{
		title: 'Firts Person Shoter',
		description: 'A fi',
		assetType: ['image'],
		tags: ['a', 'b'],
		slug: 'fps',
		seller: 'Aaa',
		images: [
			{
				static: { img: BACKEND_URL + '/' + 'fps.jpeg', alt: '' },
			},
		],
		price: 1.87,
		discount: 0.05,
	},
	{
		title: 'Bullet Hell',
		description: 'A fi',
		assetType: ['image'],
		tags: ['a', 'b'],
		slug: 'bullet-hell',
		seller: 'Aaa',
		images: [
			{
				static: {
					img: BACKEND_URL + '/' + 'bullet-hell.jpeg',
					dark: true,
					alt: '',
				},
				dynamic: {
					img: BACKEND_URL + '/' + 'enter-the-gungeon.gif',
					alt: '',
					dark: true,
				},
			},
		],
		price: 12.87,
		discount: 0.05,
	},
	{
		title: 'Zelda Like',
		description: 'A fi',
		seller: 'Aaa',
		assetType: ['image'],
		tags: ['a', 'b'],
		slug: 'zelda-like',
		images: [
			{
				static: { img: BACKEND_URL + '/' + 'zelda-like.png', alt: '' },
			},
		],

		price: 1.87,
		discount: 0.05,
	},
];

export const LISTS_OF_CONTENTS: {
	[key: string]: AssetType[] | GameGenre[] | Asset[];
} = {
	'asset-type': assetsTypes,
	'game-genre': gameGenres,
	asset: assets,
};

export const userAccounts: UserAccount[] = [
	{
		username: 'john_doe',
		password: 'password123',
		email: 'john.doe@example.com',
		role: 'user',
		firstName: 'John',
		lastName: 'Doe',
		createdAt: '2022-01-01',
	},
	{
		username: 'jane_smith',
		password: 'secret456',
		email: 'jane.smith@example.com',
		role: 'admin',
		firstName: 'Jane',
		lastName: 'Smith',
		createdAt: '2022-02-15',
	},
	// Add more user accounts here
];

export async function fetchMockupData(
	query: string,
): Promise<Result<FetchApiResponse>> {
	const queryComponents = query.split('/');
	const listOfContent = LISTS_OF_CONTENTS[queryComponents[1]]; //as (AssetTypeData[] | GameGenreData[] | Asset[] | null | undefined);
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
		console.log(el.slug);
		if (0 === el.slug.localeCompare(queryComponents[2])) {
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

export async function fetchMockupImg(url: string) {
	const imgKey: string = url.replace(BACKEND_URL + '/', '');
	const img = images[imgKey];
	const errorResult = {
		ok: false,
		content: ERROR_MSG_404,
	};

	return undefined === img
		? errorResult
		: {
				ok: true,
				content: img,
		  };
}
