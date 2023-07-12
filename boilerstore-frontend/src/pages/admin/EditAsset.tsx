import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Asset } from '../../utils/types';
import { useParam } from '../../utils/customHooks';
import { fetchApi, fetchAsset, updateApi } from '../../utils/apiCalls';
import { useNavigate } from 'react-router-dom';
import './EditAsset.css';

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
				static: { img: '', alt: '' },
			},
		],
		price: 0,
	});

	const [imageUrl, setImageUrl] = useState('');
	const [active, setActive] = useState(true);

	useEffect(() => {
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
				static: { img: imageUrl, alt: '' },
			},
		];

		updateApi(`api/assets/${slug}`, formData).catch((err) =>
			console.log('[ERROR] Could not update asset data.', err),
		);

		navigate('/admin/more');
	}, [update]);

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

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
			<h2>Edit Asset</h2>
			<form onSubmit={handleSubmit}>
				<div className="EditAssetPage-formgroup">
					<label htmlFor="slug">Slug:</label>
					<input
						type="text"
						id="slug"
						name="slug"
						value={formData.slug}
						onChange={handleInputChange}
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
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="EditAssetPage-formgroup">
					<label htmlFor="description">Description:</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleInputChange}
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
						onChange={handleInputChange}
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
						onChange={handleInputChange}
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
						onChange={handleInputChange}
					/>
				</div>
				<div className="EditAssetPage-formgroup">
					<label htmlFor="amount">Amount:</label>
					<input
						type="number"
						id="amount"
						name="amount"
						value={formData.amount}
						onChange={handleInputChange}
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
				<div>
					<label className="active-ck-box-label isadmin-checkbox-label">
						<input
							type="checkbox"
							checked={active}
							onChange={(e) => {setActive(!active);}}
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
						onChange={handleInputChange}
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
						onChange={handleInputChange}
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
