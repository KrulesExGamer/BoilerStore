import { Asset, CartItem, UserAccount } from '../utils/types';
import '../img/zelda-like.png';
import '../img/bullet-hell.jpeg';
import './Cart.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	delApi,
	fetchApi,
	fetchAssetImages,
	fetchCartAsset,
} from '../utils/apiCalls';
import { useContext, useEffect, useState } from 'react';
import notFoundJPG from '../img/notfound.jpg';
import { UserContext } from '../Context';
import { ensure } from '../utils/funcs';

const notFoundImage = {
	img: notFoundJPG,
	alt: 'Not Found',
};

const cart: CartItem[] = [
	{
		assetId: '3d-red-ford-car',
	},
];

const _CartItem = (item: Asset) => {
	const image = item.images.length ? item.images[0].static : notFoundImage;

	return (
		<li key={item.slug} className="cart-li cart-items-container">
			<div>
				<img src={image.img} alt={image.alt} />
				<h3>{item.title}</h3>
				<h3>{item.price}</h3>
			</div>
		</li>
	);
};

// Cart page layout
const Cart = () => {
	const location = useLocation();

	const [updateIndex, setUpdateIndex] = useState(0);
	const forceUpdate = () => setUpdateIndex(updateIndex + 1);

	const [buyFlag, setBuyFlag] = useState(false);
	const [cartList, setCartList] = useState<Asset[]>([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalDiscount, setTotalDiscount] = useState(0);

	const { userState } = useContext(UserContext);
	const [user, setUser] = useState<UserAccount>();

	const navigate = useNavigate();

	useEffect(() => {
		if (!ensure(userState?.username)) return;
		fetchApi(`api/users/${userState?.username}`)
			.then((res) => res.content as any as UserAccount)
			.then((u) => setUser(u))
			.catch((err) => console.log(err));
	}, [userState]);

	useEffect(() => {
		const updateGameList = async () => {
			if (!user?.cart) return;

			const tempAssetList = await Promise.all(
				user?.cart.map(async (a: string) => {
					const res = await fetchApi(`api/assets/${a}`);
					const asset = res.content as any as Asset;
					asset.images = await fetchAssetImages(asset);
					return asset;
				}),
			);

			setCartList(tempAssetList);
		};

		updateGameList();
	}, [user]);

	useEffect(() => {
		let t = 0;

		for (const game of cartList) {
			t += game.price;
		}

		setTotalPrice(t);

		console.log(cartList);
	}, [cartList]);

	const [errorMsg, setErrorMsg] = useState<string[]>([]);
	useEffect(() => {
		if (!buyFlag) return;

		cartList.forEach((a) => {
			if (a.amount === 0)
				setErrorMsg(errorMsg.concat([`'${a.title}' is out of stock!`]));
		});

		if (errorMsg.length) return;

		const f = async () => {
			await Promise.all(
				cartList.map(async (a) => {
					await fetchApi(`api/buy/assets/${a.slug}`);
				}),
			);

			await delApi(`api/users/cart/${user?.username}`);
		};

		f();
		setBuyFlag(false);
		navigate('/');
	}, [buyFlag]);

	const performPurchase = () => {};

	return (
		<div className="cart">
			{/* Por alguma razão, não consigo fazer os produtos aparecerem sem quebrar o resto do código */}
			<ul className="cart-items-container">
				{cartList.map((item: Asset) => _CartItem(item))}
			</ul>
			<div className="buyBox">
				<div className="upper_buyBox">
					<div className="ubB_text">
						<p> Preço Total</p>
					</div>
					{totalDiscount != 0 ? (
						<div className="pricing">
							<p className="totalPrice">
								{' '}
								${totalPrice.toFixed(2)}
							</p>
							<p className="totalDiscount">
								{' '}
								${totalDiscount.toFixed(2)}
							</p>
						</div>
					) : (
						<div className="pricing">
							<p className="totalDiscount">
								{' '}
								${totalPrice.toFixed(2)}
							</p>
						</div>
					)}
				</div>
				<div className="lower_buyBox">
					<Link to="/">
						<button className="back">Voltar</button>
					</Link>
					<button className="buy" onClick={() => setBuyFlag(true)}>
						Comprar
					</button>
				</div>
				{errorMsg.length > 0 && (
					<div>
						{errorMsg.map((e) => {
							return <p>{e}</p>;
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
