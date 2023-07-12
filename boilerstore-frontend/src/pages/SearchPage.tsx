import React, { useEffect, useState } from 'react';
import { fetchApi, fetchAsset, fetchAssetImages } from '../utils/apiCalls';
import ItemWindow, { Slide } from '../components/ItemWindow';
import { useParam } from '../utils/customHooks';
import { Asset, CoolImage } from '../utils/types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './SearchPage.css';

function imgToSlides(imgs: CoolImage[]): Slide[] {
	return imgs.map((i) => {
		return {
			staticImage: i.static.img,
			dynamicImage: i.dynamic?.img,
			description: i.static.alt,
			darkImage: i.static.dark,
		};
	});
}

const AssetGridPage = () => {
	const [assets, setAssets] = useState<Asset[]>([]);
	const searchQuery = useParam('search_query');
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const s = (searchQuery ?? '').trim().toLowerCase();
		fetchApi('api/all/assets')
			.then((res) => res.content as any as any[])
			.then((data) => {
				console.log('ASSETS', data);

				let result = data.filter((asset) => {
					console.log('data', asset);
					if ('' === s) return true;
					return (
						asset.title
							.trim()
							.toLowerCase()
							.includes(s) ||
						asset.slug.trim().toLowerCase().includes(s)
					);
				});
				console.log('RESULT', result);
				return result;
			})
			.then((data) => {
				return data as any as Asset[];
			})
			.then((data) => {
				return Promise.all(
					data.map(async (a) => {
						a.images = await fetchAssetImages(a);
						return a;
					}),
				);
			})
			.then((data) => {
				setAssets(data);
			})
			.catch((error) => console.log('Error fetching assets:', error));
	}, [location]);

	return (
		<div className="AssetGridPage">
			<h1>Search Results:</h1>
			<div className="asset-grid">
				{assets.map((asset) => (
					<Link to={`/asset?asset=${asset.slug}`}>
						<ItemWindow
							key={asset.slug}
							windowData={{
								title: asset.title,
								description: asset.description,
								slides: imgToSlides(asset.images),
								key: asset.slug,
								price: asset.price,
								icon: null,
								discount: asset?.discount ?? 0,
							}}
							colors={['#ddd', '#999']}
							displayType={false}
							displayPrice={true}
							addToCart={() => {return null;}}
						/>
					</Link>
				))}
			</div>
		</div>
	);
};

export default AssetGridPage;
