import { Asset, CartItem } from '../utils/types';
import "../img/zelda-like.png";
import "../img/bullet-hell.jpeg" ;
import './Cart.css'
import { Link, useLocation } from 'react-router-dom';
import { fetchCartAsset } from '../utils/apiCalls';
import { useEffect, useState } from 'react';


const cart : CartItem[] = [
    {
        assetId: '3d-red-ford-car',
    },
]

// Cart page layout
const Cart = () => {
    const location = useLocation();

    const [cartList, setCartList] = useState<Asset[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    const updateCartPage = (tempList : Asset[]) => {
        setCartList(tempList)

        let t = 0;
        cartList.forEach((game) => {
            t += game.price;
        }) 

        setTotalPrice(t);
    }

    useEffect(() => {
        const updateGameList = async () => { 
            let tempList : Asset[] = [];
            cart.forEach(async (game) => {
                const assetItem : Asset | undefined = await fetchCartAsset(game.assetId);
                if (assetItem !== undefined && !tempList.includes(assetItem))
                    tempList.push(assetItem);
            })

            updateCartPage(tempList)
            
            


            console.log(cartList)
        }

        updateGameList();

    }, [cart])

    const performPurchase = () => {

    }

    return (
        <div className='cart'>
            {/* Por alguma razão, não consigo fazer os produtos aparecerem sem quebrar o resto do código */}
            
            <div className='buyBox'>
                <div className="upper_buyBox">
                    <div className="ubB_text">
                        <p> Preço Total</p>
                    </div>
                    {(totalDiscount != 0) ?
                        (<div className="pricing">
                            <p className="totalPrice"> ${totalPrice.toFixed(2)}</p>
                            <p className="totalDiscount"> ${totalDiscount.toFixed(2)}</p>
                        </div>) :
                        (<div className="pricing">
                            <p className="totalDiscount"> ${totalPrice.toFixed(2)}</p>
                        </div>)
                    }
                </div>
                <div className="lower_buyBox">
                    <Link to='/'><button className="back">Voltar a comprar</button></Link>
                    <button className="buy">Comprar</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;