import { Asset, CartItem } from '../utils/types';
import '../img/zelda-like.png';
import '../img/bullet-hell.jpeg';
import './Cart.css';
import { Link, useLocation } from 'react-router-dom';
import { fetchCartAsset } from '../utils/apiCalls';
import { useEffect, useState } from 'react';

const cart: CartItem[] = [
	{
		assetId: '3d-red-ford-car',
	},
];

// Cart page layout
const Cart = () => {
	const location = useLocation();

	const [cartList, setCartList] = useState<Asset[]>([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalDiscount, setTotalDiscount] = useState(0);

	useEffect(() => {
		const updateGameList = async () => {
			let tempAssetList: Asset[] = [];

			for (const game of cart) {
				const assetItem: Asset | undefined = await fetchCartAsset(
					game.assetId,
				);
				if (
					assetItem !== undefined &&
					!tempAssetList.includes(assetItem)
				)
					tempAssetList.push(assetItem);
			}

			setCartList(tempAssetList);
		};

		updateGameList();
	}, [cart]);

	useEffect(() => {
		let t = 0;
        
		for (const game of cartList) {
			t += game.price;
		}

		setTotalPrice(t);

		console.log(cartList);
	}, [cartList]);

	const performPurchase = () => {};

	return (
		<div className="cart">
			{/* Por alguma razão, não consigo fazer os produtos aparecerem sem quebrar o resto do código */}

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
						<button className="back">Voltar a comprar</button>
					</Link>
					<button className="buy">Comprar</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
