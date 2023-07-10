import { Asset, CartItem } from '../utils/types';
import "../img/zelda-like.png";
import "../img/bullet-hell.jpeg" ;
import './Cart.css'
import { Link } from 'react-router-dom';
import { fetchCartAsset } from '../utils/apiCalls';
import { useEffect, useState } from 'react';


const cart : CartItem[] = [
    {
        assetId: '3d-red-ford-car',
        quantity: 2,
    },
]

// Cart page layout
const Cart = () => {
    // let totalPrice = 0;
    // let totalDiscount = 0;

    const [cartList, setCartList] : [Asset[], CallableFunction] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    useEffect(() => {
        const updateGameList = async () => {
            let tempList : Asset[] = [];
            cart.forEach(async (game) => {
                const assetItem : Asset | undefined = await fetchCartAsset(game.assetId);
                if (assetItem !== undefined && !tempList.includes(assetItem))
                    tempList.push(assetItem);
            })

            setCartList(tempList)
            
            let t = 0;
            
            cartList.forEach((game) => {
                t += game.price;
            }) 

            setTotalPrice(t);

            console.log(cartList)
        }

        updateGameList();

    }, [cart])

    // const updatePrices = () => {
    //     cartList.forEach((game) => {
    //         totalPrice += game.price;
    //         console.log(totalPrice);
    //     })
    // }
    

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