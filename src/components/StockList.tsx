import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useReadFromDB } from '../shared/DBApi';
import { pathToServer } from '../shared/PathToServer';
import { Stock } from '../types/Stock';

// ----------------- Konstaten und Variabelen -----------------
// Uebrschrift Table
const STOCK_NAME = 'Aktien';
const STOCK_TICKER = 'Symbol';
const STOCK_VALUE = 'Marktwert';

interface Props{
    onBuyStock:(e: React.MouseEvent<HTMLTableRowElement>) => void,
}

/**
 * Funktion um die Aktienliste anzuzeigen
 * props : AktienListe von FEWertpapieren
 */
export default function StockList(props:Props):JSX.Element {

  const [stockList, setStocks] = useReadFromDB(pathToServer.getStockList,true)

    
    return (
        <section id="secStockList">
            <div id="divDisplay">
                <table id="tblDisplay">
                    <thead>
                        <tr>
                            <th>{STOCK_NAME}</th>
                            <th>{STOCK_TICKER}</th>
                            <th>{STOCK_VALUE}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockList.map(stock =>
                            <tr key={stock.ticker} id={stock.ticker} onMouseOver={(e) => props.onBuyStock(e)}>
                                <td>{stock.name}</td>
                                <td>{stock.ticker}</td>
                                <td>{stock.trend[0]}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
