import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    const fetchAllCoin = async () => {
        try {
            const options = {
                method: 'GET',
                headers: { 
                    accept: 'application/json', 
                    'x-cg-demo-api-key': 'CG-HYySVYHbKft44x5UDS6kuLMh' 
                }
            };
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
            const data = await response.json();
            setAllCoin(data);
        } catch (err) {
            console.error('Error fetching coins:', err);
        }
    };

    useEffect(() => {
        fetchAllCoin();
    }, [currency.name]); // Correct dependency

    const contextValue = {
        allCoin, 
        currency, 
        setCurrency
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
