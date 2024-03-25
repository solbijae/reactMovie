import { useState, useEffect } from 'react';

function Coin() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([])
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers").then(response => response.json()).then((json) => {
            console.log(json)
            setCoins(json);
            setLoading(false);
        });
    }, []);
    const [amount, setAmount] = useState('');
    const insertInput = event => setAmount(event.target.value);

    const [selectedCoin, setselectedCoin] = useState('');
    const selectCoin = (e) => {
        const selected = e.target.value;
        const regex = /[^-.0-9]/g;
        const result = selected.replace(regex, "");
        setselectedCoin(result);
    };

    return (
        <div>
            <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
            {loading ? 
                (<strong>Loading...</strong>) : 
                (
                <div>
                    <div style={{padding:'20px'}}>Select Coin Type : 
                        <select onChange={selectCoin}>
                            {coins.map((coin) => 
                            <option >
                                {coin.name} ({coin.symbol}): {coin.quotes.USD.price.toFixed(2)} USD
                            </option>)}
                        </select>
                    </div>
                    <div style={{padding:'20px'}}>
                        <input value={amount} onChange={insertInput} placeholder='Amount in USD'></input>
                        =Result : {amount/selectedCoin}
                    </div>
                </div>
                )}
        </div>
    )
}


// branch test 2
export default Coin;