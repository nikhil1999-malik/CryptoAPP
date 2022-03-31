import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('');

  useEffect(() => {
    setInterval(() => {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false')
        .then((res) => {
          setCoins(res.data);
          console.log(res.data)
        })
        .catch((e) => {
          alert(`You have an error ${e}`);

        })
    }, 5000)
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredChange = coins.filter((coin) => (
    coin.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  ))

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a Currency</h1>

        <form>
          <input type='text' placeholder='Get Your Crypto' className='coin-input' onChange={handleChange} />
        </form>
      </div>

      {
        filteredChange.map((coin) => (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            price={coin.current_price}
            volume={coin.total_volume}
            priceChange={coin.price_change_24h}
            marketcap={coin.market_cap}
          />
        ))
      }
    </div>
  )
}

export default App