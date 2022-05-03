import React from 'react'
import { usePortfolioToDB } from '../shared/DBApi';
import { Stock, portfolioStock } from '../types/Stock'

// ----------------- Konstaten und Variabelen -----------------
// Uebrschrift Table
const STOCK_NAME = 'Aktien';
const STOCK_TICKER = 'Symbol';
const STOCK_BUYING_VALUE = 'Kaufwert';
const STOCK_BUYING_DATE = 'Kaufdatum';
const STOCK_VALUE = 'Marktwert';
const STOCK_YIELD_SYMBOL = '  %  ';
const STOCK_TOTAL = 'Gesamtwert';
const STOCK_SELLING = 'Verkaufen';
const STOCK_SELLING_SYMBOL = 'V';

interface Props{
    portfolio : portfolioStock[],
    stockList: Stock[],
    onSellStock: (stock:portfolioStock) => void
}
/**
 * Funktion um das Portfolio darzustellen
 * props : Portfolio und Stocklist datein von FEWertpapieren
 */
export default function Portfolio(props:Props) {

    
    console.log('portfolio',props.portfolio);
    console.log('stocklist',props.stockList);
    
    // Speichern Portfolio auf Festplatte
    usePortfolioToDB(props.portfolio);
    
    if (!props.portfolio) {
        console.log('Guard waiting portfolio');
        return <p>Lade</p>;
    }
    
    return (
        <section id="secPortfolio">
            <div id="divDisplayPortfolio">
                <table id="tblDisplayPortfolio">
                    <thead>
                        <tr>
                            <th>{STOCK_NAME}</th>
                            <th>{STOCK_TICKER}</th>
                            <th>{STOCK_BUYING_VALUE}</th>
                            <th>{STOCK_BUYING_DATE}</th>
                            <th>{STOCK_VALUE}</th>
                            <th>{STOCK_TOTAL}</th>
                            <th>{STOCK_YIELD_SYMBOL}</th>
                            <th>{STOCK_SELLING}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.portfolio.length>0 && (props.portfolio.map(pStock =>{
                            const stock = props.stockList.filter(ls=>ls.ticker===pStock.ticker) 
                            console.log('pStock',pStock,'stock',stock);
                        
                        return(<tr key={pStock.id} >
                            <td>{pStock.name}</td>
                            <td>{pStock.ticker}</td>
                            <td>{pStock.trend[0]}</td>
                            <td>{pStock.buyingDate}</td>
                            <td>{stock[0].trend[0]}</td>
                            <td>{(pStock.trend[0] * pStock.quantity).toFixed(2)}</td>
                            <td>{(((stock[0].trend[0] - pStock.trend[0]) / pStock.trend[0]) *100).toFixed(2)}</td>
                            <td className="sellColor" 
                            id={pStock.id} 
                            onClick={()=>props.onSellStock(pStock)} >
                                {STOCK_SELLING_SYMBOL}</td>
                            </tr>
                    )}))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
