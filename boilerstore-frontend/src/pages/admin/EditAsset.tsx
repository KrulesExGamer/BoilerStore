import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Asset } from '../../utils/types';
import { useParam } from '../../utils/customHooks';
import { fetchApi, fetchAsset, updateApi } from '../../utils/apiCalls';
import { useNavigate } from 'react-router-dom';
import './EditAsset.css';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/appConstants';

const EditAssetPage = () => {
	const navigate = useNavigate();

	const slug = useParam('asset');
	const isNew = useParam('isNew');

	const [asset, setAsset] = useState<Asset>({
		title: '',
		description: '',
		assetType: [],
		tags: [],
		slug: '',
		images: [
			{
				static: { img: '', alt: 'Text example.' },
			},
		],
		price: 0,
	});

	const [imageUrl, setImageUrl] = useState('');
	const [dynImageUrl, setDynImageUrl] = useState('');
	const [active, setActive] = useState(true);

	useEffect(() => {
		if (isNew) return;

		fetchAsset(slug ?? '')
			.then((res) => res.content as any as Asset)
			.then((data) => {
				setAsset(data);
				if (data.images.length) setImageUrl(data.images[0].static.img);
			})
			.catch((err) =>
				console.log('[ERROR] Could not fetch asset data.', err),
			);
	}, [slug]);

	//const [formData, setFormData] = useState(asset);
	const formData = asset;
	const setFormData = setAsset;

	const [update, setUpdate] = useState(false);

	useEffect(() => {
		if (!update) return;
		if (0 > formData.price) throw Error('[ERROR] Ops! Price is invalid!');
		if (0 > (formData.amount ?? -1)) formData.amount = undefined;

		if (!Array.isArray(formData.tags))
			formData.tags = (formData.tags as string).split(',');
		if (!Array.isArray(formData.assetType))
			formData.assetType = (formData.assetType as string).split(',');

		formData.images = [
			{
				static: { img: imageUrl, alt: 'Text example.' },
			},
		];

		console.log('formdata is', formData);

		// fetch(`http://localhost:3001/api/assets`, {method: 'POST' , body: JSON.stringify(formData)}).catch((err) =>
		// 	console.log('[ERROR] Could not update asset data.', err),
		// );

		if (isNew) {
			axios
				.post(`${BACKEND_URL}/api/assets`, formData)
				.catch((err) =>
					console.log('[ERROR] Could not update asset data.', err),
				).then(()=>navigate('/admin/more'));
		} else {
			axios
				.put(`${BACKEND_URL}/api/assets/${slug}`, formData)
				.catch((err) =>
					console.log('[ERROR] Could not update asset data.', err),
				).then(()=>navigate('/admin/more'));
		}
	}, [update]);

	// const handleInputChange = (e: any) => {
	// 	const name : string = e.target.name;
	// 	const value : any = e.target.value;
	// 	let data : Asset = structuredClone(formData);

	// 	data[name as any] as any = value as any;

	// 	setFormData((prevFormData) => ({
	// 		...prevFormData,
	// 		[name]: value,
	// 	}));
	// };

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: checked,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Handle form submission and update asset data
		setUpdate(true);
		console.log(formData);
	};

	return (
		<div className="EditAssetPage">
			<h2>{isNew ? 'New Asset' : 'Edit Asset'}</h2>
			<form onSubmit={handleSubmit}>
				<div className="EditAssetPage-formgroup">
					<label htmlFor="slug">Slug:</label>
					<input
						type="text"
						id="slug"
						name="slug"
						value={formData.slug}
						onChange={(e) => {
							let temp = structuredClone(formData);
							temp.slug = e.target.value;
							setFormData(temp);
						}}
						required
					/>
				</div>
				<div className="EditAssetPage-formgroup">
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						id="title"
						name="title"
						value={formData.title}
						onChange={(e) => {
							let temp = structuredClone(formData);
							temp.title = e.target.value;
							setFormData(temp);
						}}
						required
					/>
				</div>
				<div className="EditAssetPage-formgroup">
					<label htmlFor="description">Description:</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={(e) => {
							let temp = structuredClone(formData);
							temp.description = e.target.value;
							setFormData(temp);
						}}
						required
					/>
				</div>
				<div className="EditAssetPage-formgroup">
					<label htmlFor="seller">Seller:</label>
					<input
						type="text"
						id="seller"
						name="seller"
						value={formData.seller}
						onChange={(e) => {
							let temp = structuredClone(formData);
							temp.seller = e.target.value;
							setFormData(temp);
						}}
						required
					/>
				</div>
				<div className="EditAssetPage-formgroup">
					<label htmlFor="price">Price:</label>
					<input
						type="number"
						id="price"
						name="price"
						value={formData.price}
						onChange={(e) => {
							let temp = structuredClone(formData);
							temp.price = parseFloat(e.target.value);
							setFormData(temp);
						}}
						required
					/>
				</div>
				<div className="EditAssetPage-formgroup">
					<label htmlFor="discount">Discount:</label>
					<input
						type="number"
						id="discount"
						name="discount"
						value={formData.discount}
						onChange={(e) => {
							let temp = structuredClone(formData);
							temp.discount = parseFloat(e.target.value);
							setFormData(temp);
						}}
					/>
				</div>
				<div className="EditAssetPage-formgroup">
					<label htmlFor="amount">Amount:</label>
					<input
						type="number"
						id="amount"
						name="amount"
						value={formData.amount}
						onChange={(e) => {
							let temp = structuredClone(formData);
							temp.amount = parseInt(e.target.value);
							setFormData(temp);
						}}
					/>
				</div>
				<div className="EditAssetPage-formgroup">
					<label htmlFor="imageUrl">Image Url:</label>
					<input
						type="text"
						id="imageUrl"
						name="imageUrl"
						value={imageUrl}
						onChange={(e) => {
							setImageUrl(e.target.value);
						}}
					/>
				</div>
				<div className="EditAssetPage-formgroup">
					<label htmlFor="dynUrl">Dynamic Image Url:</label>
					<input
						type="text"
						id="dynUrl"
						name="dynUrl"
						value={dynImageUrl}
						onChange={(e) => {
							setDynImageUrl(e.target.value);
						}}
					/>
				</div>
				<div>
					<label className="active-ck-box-label isadmin-checkbox-label">
						<input
							type="checkbox"
							checked={active}
							onChange={(e) => {
								setActive(!active);
							}}
						/>
						<span className="active-ck-box-custom isadmin-checkbox-custom"></span>
						Active:
					</label>
				</div>

				{/* <div className='EditAssetPage-formgroup'>
          <label htmlFor="active">Is :</label>
          <input
            type="checkbox"
            id="active"
            name="active"
            checked={formData.active}
            onChange={handleCheckboxChange}
          />
        </div> */}
				<div className="EditAssetPage-formgroup">
					<label htmlFor="assetType">Asset Type:</label>
					<input
						type="text"
						id="assetType"
						name="assetType"
						value={formData.assetType}
						onChange={(e) => {
							let temp = structuredClone(formData);
							temp.assetType = e.target.value
								.split(',')
								.map((i) => i.trim());
							setFormData(temp);
						}}
						required
					/>
				</div>

				<div className="EditAssetPage-formgroup">
					<label htmlFor="tags">Tags:</label>
					<input
						type="text"
						id="tags"
						name="tags"
						value={formData.tags}
						onChange={(e) => {
							let temp = structuredClone(formData);
							temp.tags = e.target.value
								.split(',')
								.map((i) => i.trim());
							setFormData(temp);
						}}
						required
					/>
				</div>
				<div className="EditAssetPage-buttongroup">
					<button type="submit" className="EditAssetPage-save-button">
						<FontAwesomeIcon icon={faSave} />
						Save
					</button>
					<button
						type="button"
						className="EditAssetPage-cancelButton"
					>
						<FontAwesomeIcon icon={faTimes} />
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditAssetPage;
