import { useContext, useEffect, useRef, useState } from 'react';
import './AssetPage.css';
import '../shared_styles/common.css';

import { Asset, CoolImage, Result, UserState } from '../utils/types';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { fetchAsset, fetchAssetImages, saveToCart } from '../utils/apiCalls';
import { STATUS_MSG_100_YET_TO_SENT } from '../utils/appConstants';
import TwinLayout from './TwinLayout';
import ImageSelector from '../components/ImageSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCancel,
	faCartShopping,
	faCheck,
	faPenToSquare,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../Context';
import { ensure } from '../utils/funcs';

// Custom hook to manage the asset key passed by the url
const useAssetKey = (): string => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	let [assetKey, setAssetKey] = useState(searchParams.get('asset') ?? '');

	const updateAssetKey = () => {
		const searchParams = new URLSearchParams(location.search);
		setAssetKey(searchParams.get('asset') ?? '');
		console.log(`Asset key is now: '${searchParams.get('asset')}'`);
	};

	useEffect(updateAssetKey, [location]);

	return assetKey;
};

const useAssetData = (args: { assetKey: string; refetch: boolean }) => {
	const assetKey = args.assetKey;
	const [assetData, setAssetData] = useState<Result<Asset>>({
		ok: false,
		content: STATUS_MSG_100_YET_TO_SENT,
	});

	useEffect(() => {
		const fetchData = async () => {
			//if ('' === assetKey) return;
			const data = await fetchAsset(assetKey);
			console.log('got to component, assetKey is:');
			console.log(assetKey);
			setAssetData(data);
			console.log('Asset data is:');
			console.log(data);
		};

		fetchData();
	}, [assetKey, args.refetch]);

	return assetData;
};

const addToCart = (
	userState: UserState | undefined,
	assetKey: string,
	navigate: NavigateFunction,
) => {
	if (userState?.isLoggedIn) {
		saveToCart([assetKey], userState.username || '');
	} else {
		navigate('/login');
	}
};

const AssetPageContents = (props: {
	assetData: Asset;
	assetImgs: CoolImage[] | null;
	refetch: () => void;
}) => {
	let [editing, setEditing] = useState(false);

	const [title, setTitle] = useState(props.assetData.title);
	const [description, setDescription] = useState(props.assetData.description);
	const [tags, setTags] = useState(props.assetData.tags);
	const [seller, setSeller] = useState(props.assetData.seller);
	const [amout, setAmount] = useState(props.assetData.amount);

	useEffect(() => {
		setTitle(props.assetData.title);
		setDescription(props.assetData.description);
		setTags(props.assetData.tags);
		setSeller(props.assetData.seller);
		setAmount(props.assetData.amount);
	}, [props.assetData])

	const { userState, setUserState } = useContext(UserContext);
	const navigate = useNavigate();
	const debbug_is_adming = false;

	const assetImgs: CoolImage[] = props.assetImgs ?? [
		{
			static: {
				img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_521061.png&f=1&nofb=1&ipt=f161d9fa1c208cc5d1126fbaf6be445c4fb82a64a8cbbedad0c422893d2f4200&ipo=images',
				alt: 'A BUG!!! This is just an example Image.',
			},
		},
	];

	const _AddToCart = (
		<button
			className="assetpage-button"
			onClick={() => addToCart(userState, props.assetData.slug, navigate)}
		>
			{'--->'} Add to cart <FontAwesomeIcon icon={faCartShopping} />{' '}
			{'<---'}
		</button>
	);

	const _AdminEdit_Structure = (
		<button
			className="assetpage-button"
			onClick={() => {
				navigate(`/admin/edit-asset?asset=${props.assetData.slug}`);
				setEditing(true);
			}}
		>
			Edit <FontAwesomeIcon icon={faPenToSquare} />
		</button>
	);

	const _AdminEdit = (
		<>
			{(userState?.isAdmin || debbug_is_adming) &&
				!editing &&
				_AdminEdit_Structure}
		</>
	);

	const _CancelChanges = (
		<button
			className="assetpage-button"
			onClick={() => {
				setEditing(false);
				props.refetch();
			}}
		>
			Cancel Changes
			<FontAwesomeIcon icon={faCancel} />
		</button>
	);

	const _ConfirmChanges = (
		<button
			className="assetpage-button"
			onClick={() => {
				setEditing(false);
			}}
		>
			Confirm Changes
			<FontAwesomeIcon icon={faCheck} />
		</button>
	);

	const _ConfirmOrCancel = (
		<>
			{(userState?.isAdmin || debbug_is_adming) && editing && (
				<>
					{_CancelChanges}
					{_ConfirmChanges}
				</>
			)}
		</>
	);

	const _Title = <h2 className="round-line-div">{props.assetData.title}</h2>;
	const _Buttons = (
		<div style={{ display: 'flex' }}>
			{_AddToCart}
			{_AdminEdit}
			{_ConfirmOrCancel}
		</div>
	);

	const _Description = (
		<div className="asset-description round-line-div">
			<p contentEditable={editing}>{props.assetData.description}</p>
		</div>
	);

	const _One_Tag = (tag: string) => {
		return (
			<li contentEditable={editing}>
				{`#${tag} `}
				{editing && (
					<button
						className='del-tag-button'
						onClick={() => {
							const index = props.assetData.tags.indexOf(tag);
							if (index > -1) {
								// only splice array when item is found
								props.assetData.tags.splice(index, 1); // 2nd parameter means remove one item only
							}
						}}
					>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				)}
			</li>
		);
	};

	const _Tags_Structure = (
		<div className="asset-tags-div">
			<p className="asset-tags-label ">Tags:</p>
			<ul className="asset-tags-list">
				{props.assetData.tags.map((tag) => _One_Tag(tag))}
			</ul>
		</div>
	);

	const _Tags = <>{ensure(props.assetData.tags) && _Tags_Structure}</>;

	const _Seller = (
		<div style={{ display: 'flex' }}>
			<p className="round-line-div" style={{ marginRight: '20px' }}>
				Seller:
			</p>
			<p className="round-line-div">
				{props.assetData.seller ?? 'BoilerStore Official'}
			</p>
		</div>
	);

	const _Amount_Structure = (
		<div style={{ display: 'flex' }}>
			<p className="round-line-div" style={{ marginRight: '20px' }}>
				Amount in stock:
			</p>
			<p className="round-line-div">{props.assetData.amount}</p>
		</div>
	);

	const _Amount = <>{ensure(props.assetData.amount) && _Amount_Structure}</>;

	return (
		<TwinLayout
			left={<ImageSelector images={assetImgs} />}
			right={
				<div className="right-side-asset-data">
					{_Title}
					{_Buttons}
					{_Description}
					{_Tags}

					<br></br>

					{_Seller}
					{_Amount}
				</div>
			}
		/>
	);
};

const AssetNotFound = () => {
	return (
		<>
			<h1>Asset Not Found</h1>
			<p>Ops! We couldn't find this asset :( </p>
		</>
	);
};

const Loading = () => {
	return (
		<>
			<h1>Loading</h1>
		</>
	);
};

const useAssetPageBody = (args: {
	assetData: Result<Asset>;
	assetImages: CoolImage[];
	refetch: () => void;
}) => {
	let [assetPageBody, setAssetPageBody] = useState(<Loading />);

	useEffect(() => {
		if (args.assetData.ok) {
			setAssetPageBody(
				<AssetPageContents
					assetData={args.assetData.content as Asset}
					assetImgs={args.assetImages}
					refetch={args.refetch}
				/>,
			);
		} else if (args.assetData.content !== STATUS_MSG_100_YET_TO_SENT) {
			setAssetPageBody(<AssetNotFound />);
		}
	}, [args.assetData, args.assetImages]);

	return assetPageBody;
};

const AssetPage = () => {
	let [update, setUpdate] = useState(false);
	let refetch = () => {
		console.log('refetch   ');
		setUpdate(!update);
	};

	let assetKey = useAssetKey();
	let assetData = useAssetData({ assetKey: assetKey, refetch: update });
	const [assetImages, setAssetImages] = useState<CoolImage[]>([]);
	//let assetImages = useAssetImages(assetData);
	let assetPageBody = useAssetPageBody({
		assetData: assetData,
		assetImages: assetImages,
		refetch: refetch,
	});

	useEffect(() => {
		const fetchData = async () => {
			if (assetData.ok) {
				const images = await fetchAssetImages(
					assetData.content as Asset,
				);

				setAssetImages(images);

				console.log('Got Some Images');
				console.log(images);
			}
		};

		fetchData();
	}, [assetData]);

	return (
		<section className="AssetSection">
			<div className="AssetPage">{assetPageBody}</div>
		</section>
	);
};

export default AssetPage;
