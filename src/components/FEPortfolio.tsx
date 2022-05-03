import React from 'react'
import { useReadFromDB } from '../shared/DBApi'
import { pathToServer } from '../shared/PathToServer'
import { portfolioStock, Stock} from '../types/Stock'
import Portfolio from './Portfolio'
import Total from './Total'

interface Props{
  onSellStock: (stock:portfolioStock) => void
  portfolio:portfolioStock[]
}

export default function FEPortfolio(props:Props) {

  
  const [stockList, setStocks] = useReadFromDB(pathToServer.getStockList,true)
  // const [portfolio, setPortfolio] = useReadFromDB(pathToServer.getPortfolio,false)

  //  if (!portfolio) {
  //     console.log('Guard waiting portfolio');
  //     return <p>Lade</p>;
  // }

  if (!stockList || stockList.length===0) {
    console.log('Guard waiting stocklist');
    return <p>Lade</p>;
}
  return (
    <React.Fragment>

      <Portfolio onSellStock ={props.onSellStock} portfolio={props.portfolio} stockList={stockList} />
      <Total portfolio={props.portfolio} stockList={stockList} />
    </React.Fragment>
  )
}
