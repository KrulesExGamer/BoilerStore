import axios from 'axios';
import {
	BACKEND_URL,
	ERROR_MSG_400,
	ERROR_MSG_400_NOT_AN_ASSET,
	ERROR_MSG_400_NOT_IMPLEMENTED,
	USING_MOCKUP,
} from './appConstants';
import { fetchMockupData, fetchMockupImg, userAccounts } from './mockupData';
import {
	Asset,
	CoolImage,
	FetchApiResponse,
	ImageTagData,
	Result,
	UserAccount,
	UserState,
} from './types';

// Example of query: 'api/asset/cool-model
export async function fetchApi(
	query: string,
): Promise<Result<FetchApiResponse>> {
	if (USING_MOCKUP) {
		return fetchMockupData(query);
	}

	try {
		const response = await axios.get(`${BACKEND_URL}/${query}`);
		return {
			ok: true,
			content: response.data,
		};
	} catch (error: any) {
		console.log('Error:', error);
		return {
			ok: false,
			content: error.message,
		};
	}
}

// Requests an image
export async function fetchImage(url: string): Promise<Result<string>> {
	if (USING_MOCKUP) {
		return fetchMockupImg(url);
	}

	try {
		// Make a GET request to the backend endpoint that serves the image data
		const response = await fetch(`${BACKEND_URL}/api/images/${url}`);

		if (response.ok) {
			// If the response is successful, convert the response data to a Blob
			const blob = await response.blob();
			// Create a temporary URL for the image blob
			const imageUrl = URL.createObjectURL(blob);
			return {
				ok: true,
				content: imageUrl,
			};
		} else {
			console.log('Error:', response.status);
			return {
				ok: false,
				content: `${response.status}: ${response.text}`,
			};
		}
	} catch (error: any) {
		console.log('Error:', error);
		return {
			ok: false,
			content: error.message,
		};
	}
}

export async function fetchAssetImages(asset: Asset): Promise<CoolImage[]> {
	const promises = asset.images.map(async (item: CoolImage) => {
		let fetched = await fetchImage(item.static.img);
		let fetchedContent = fetched.ok ? fetched.content : '';

		let result: CoolImage = {
			static: { img: fetchedContent, alt: item.static.alt },
		};

		if (item.dynamic) {
			let fetched = await fetchImage(item.dynamic.img);
			let fetchedContent = fetched.ok ? fetched.content : '';

			result.dynamic = {
				img: fetchedContent,
				alt: item.dynamic.alt,
			};
		}

		return result;
	});

	const results = await Promise.all(promises);
	console.log('Results of Fetch Image', results);
	return results;
}

// Request an asset
export async function fetchAsset(assetKey: string): Promise<Result<Asset>> {
	if ('' === assetKey) throw Error('Asset must have an id');
	const fetchedData = await fetchApi(`api/assets/${assetKey}`);
	console.log('got to fetchAsset');

	if (!fetchedData.ok) {
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

export async function validateLogin(username: string, password: string) {
	const none: UserState = { isLoggedIn: false };

	if (USING_MOCKUP) {
		for (const account of userAccounts) {
			if (
				(account.username.toLowerCase() === username.toLowerCase() ||
					account.email.toLowerCase() === username.toLowerCase()) &&
				account.password === password
			) {
				const login: UserState = {
					isLoggedIn: true,
					userName: account.username,
					email: account.email,
					isAdmin: account.role === 'admin',
				};

				return login;
			}
		}

		return none;
	}

	try {
		username = username.trim().toLowerCase();
		const res = await fetchApi(`api/users/${username}`);
		// console.log("TESTE: ",res)
		// const user = res.content as UserAccount;

		if (res.ok) {
			if (res.content === undefined)
				return none;

			const content = res.content as any as UserAccount;

			let adm = false;
			if (content.role === 'admin')
				adm = true;

			const login : UserState = {
				isLoggedIn: true, 
				userName: content.username, 
				email: content.email, 
				isAdmin: adm
			};
			
			return login;
		}

		else {
			const login : UserState = {isLoggedIn: false};
			return login;
		}

	} catch (err : any) {
		return none;
	}
	
}

export function validateAccount({
	task = '',
	name = '',
	email = '',
	password = '',
}) {
	if (USING_MOCKUP) {
		if (task === 'signup') {
			for (const account of userAccounts) {
				if (
					account.username.toLowerCase() === name.toLowerCase() ||
					account.email.toLowerCase() === email.toLowerCase()
				) {
					return false;
				}
			}
			return true;
		} else if (task === 'recovery') {
			for (const account of userAccounts) {
				if (account.email === email) {
					return true;
				}
			}
			return false;
		} else {
			return false;
		}
	}
}
