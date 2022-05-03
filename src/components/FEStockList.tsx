import React, { useState } from 'react'
import { useReadFromDB } from '../shared/DBApi'
import { pathToServer } from '../shared/PathToServer'
import StockDetails from './StockDetails'
import StockList from './StockList'
import { Stock} from '../types/Stock'

interface Props{
    onTransferToPortfolio : (stock:Stock,quantity:number) => void
}

export default function FEStockList(props:Props) {

     // ------------------ Konstanten / Variabelen ------------------
  const initialStateStock={name:'noName',ticker:'noTicker',trend:[0]}
 
  const [stock, setStock] = useState<Stock>(initialStateStock)

  const [stockList, setStocks] = useReadFromDB(pathToServer.getStockList,true)


 // Von StockList nach Detailanzeige
 const onBuyStock = (e: React.MouseEvent<HTMLTableRowElement>) => {
    let selection = e.currentTarget
    let selectedStock=initialStateStock
    for (const currentStock of stockList) {
        if(currentStock.ticker===selection.id)selectedStock = currentStock;
    }
    setStock(selectedStock)
}

if (!stockList || stockList.length===0) {
    console.log('Guard waiting stocklist');
    return <p>Lade</p>;
}
  return (
    <React.Fragment>
        <StockList onBuyStock={onBuyStock} />
        <StockDetails onTransferToPortfolio = {props.onTransferToPortfolio} stock={stock}/>
    </React.Fragment>
    
  )
}
