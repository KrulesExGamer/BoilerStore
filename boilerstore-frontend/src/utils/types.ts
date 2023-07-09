export interface ImageData {
	img: string;
	alt: string;
	dark?: boolean;
}

export interface CoolImage {
	static: ImageData;
	dynamic?: ImageData;
}

export interface GameGenre {
	title: string;
	slug: string;
	icon: string;
	description: string;
	examples: string[];
}

export interface AssetType {
	title: string;
	slug: string;
	icon: string;
	description: string;
	examples: string[];
}

export interface Asset {
	title: string;
	description: string;
	seller: string;

	slug: string;
	type: string[];
	tags: string[];

	images: CoolImage[];

	price: number;
	discount?: number;
	amount?: number;
}

export interface CartItem {
	assetId: string;
	quantity: number;
}

export interface UserAccount {
	userName: string;
	password: string;
	email: string;
	role: string;
	firstName: string;
	lastName: string;
	createdAt: string;
}

export interface UserState {
	isLoggedIn: boolean;

	userName?: string;
	email?: string;
	isAdmin?: boolean;
}

export type FetchApiResponse = null | Asset | AssetType | GameGenre;

export interface Result<T = any> {
	ok: boolean;
	content: T | string;
}

export interface ImageTagData {
	ok: boolean;
	src: any;
	alt: string;
	err: string;
}
