import React from 'react'
import { Stock, portfolioStock } from '../types/Stock'

// ----------------- Konstaten und Variabelen -----------------
const CURRENCY = 'USD'
let totalPurchaseValue=0;
let totalMarketValue=0;
let portfolioYield = 0;

interface Props{
    stockList : Stock[],
    portfolio : portfolioStock[]
}

/**
 * Funktion um das Total und Ergebnis des Portfoios anzuzeigen
 */
export default function Total(props:Props) {
    
    if (!props.portfolio) {
        console.log('Guard waiting portfolio');
        return <p>Lade</p>;
    }
    const pNotEmpty = props.portfolio.length>0;
    
if(pNotEmpty){

// Kaufwert Portfolio

totalPurchaseValue = (props.portfolio.reduce((sum,ps)=>sum + ps.trend[0] * ps.quantity,0))

//Marktwert Portfolio

for (const pStock of props.portfolio) {
    for (const stock of props.stockList) {
        if(pStock.ticker === stock.ticker) totalMarketValue += pStock.quantity*stock.trend[0]
    }
}

//Ergebnis Portfolio

 portfolioYield = ((totalMarketValue - totalPurchaseValue) / totalPurchaseValue);
 
 console.log('M: ',totalMarketValue,'P: ',totalPurchaseValue,'Y: ',portfolioYield  );
 
}
return (
        <section id="secTotal">
            <div id="divTotal">
                <div className="grid-container">

                <label htmlFor="total">Gesamtresultat:</label>
                <label id="totalPortfolio">{totalMarketValue.toFixed(2)}</label>
                <label htmlFor="yield">Rendite [%]:</label>
                <label id="yield">{portfolioYield.toFixed(2)}</label>
                <label htmlFor="currency">Währung:</label>
                <label id="currency">{CURRENCY}</label>

                </div>
            </div>
        </section>
    )
}
