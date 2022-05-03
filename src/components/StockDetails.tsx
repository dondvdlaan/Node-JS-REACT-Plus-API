import React, { useState } from 'react'
import { Stock } from '../types/Stock'

interface Props{
  stock : Stock,
  onTransferToPortfolio : (stock:Stock,quantity:number) => void
}

/**
 * Funktion um Aktiedetails anzuzeigen
 * props : Aktie von FEWertpapieren
 */
export default function StockDetails(props:Props):JSX.Element {

  // useState für Totalberechnung
  const [quantity, setQuantity] = useState(1)

      return (
    <section id="secDetails">
        <div id="detailsText">
            <div className="grid-container">

                <label htmlFor="stock">Aktien:</label>
                <label id="stock" >{props.stock.name}</label>
                <label htmlFor="ticker">Symbol:</label>
                <label id="ticker">{props.stock.ticker}</label>
                <label htmlFor="value">Wert:</label>
                <label id="value">{props.stock.trend[0]}</label>
                <label htmlFor="quantity">Menge:</label>
                <input 
                type="number"
                min="1"
                value={quantity} 
                id="quantity" 
                name="quantity" 
                onChange={(e:any)=>setQuantity(e.target.value)}
                />
                <label htmlFor="total">Total:</label>
                <label id="total">{(Math.floor(quantity) * props.stock.trend[0]).toFixed(2) }</label>

                <label htmlFor="confirmation"></label>
                <button id="confirmation" 
                onClick={()=>props.onTransferToPortfolio(props.stock,quantity)}
                >Kaufen</button>
            </div>
        </div>
    </section>
  )
}
