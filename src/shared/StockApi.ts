import { useEffect, useState } from "react";
import { Stock } from "../types/Stock";
import tickers from "../types/tickers";

//-------------- Konstanten /Variablen --------------

const path = 'https://api.polygon.io/v2/aggs/ticker/';


/**
 * Diese Funktion passt das Format an an Angabe Broker, sprich YYYY-MM-DD
 */
export const setDate=(daysBack:number, monthsBack:number):string=> {
    const date = new Date;

    let month = (date.getMonth() + 1 - monthsBack).toString();
    if (month.length < 2) month = '0' + month;

    let day = (date.getDate() - daysBack).toString();
    if (day.length < 2) day = '0' + day;

    return `${date.getFullYear()}-${month}-${day}`;
}

/**
 * Custom HOOK um jede Aktie bei Broker abzufragen. Nach Empfang werden die Aktien 
 * gesammelt in Stocklist und das Downloadverfahren abgebrochen mit useState
 * stockListReady
 */
export const useStockApi = (counter: number): [boolean, Stock[]] => {
    
    const [stockList, setStocks] = useState<Stock[]>([]);
    const [stockListReady, setStockListReady] = useState<boolean>(false);
    
    useEffect(() => {
        let config = getPath(tickers[counter]);
        
        fetch(config)
        .then(response => response.json()
        )
        .then(rawStock => {
            
            // Aktie aufbereiten
            let stock = prepareData(rawStock, tickers[counter]);
            
            // Aktie an Aktienlist zufügen
            stockList.push(stock);
            setStocks(stockList)
            
            console.log('In useStockApi: ', counter);
            
            if(counter===0)setStockListReady(true);
        })
        .catch(err => console.log(err));
    }, [counter])
    
    return [stockListReady,stockList];
}

/**
 * Anfragezeile an Broker zusammenbauen; Nur Tageswerten sind verfügbar umsonst
 */
const startTrendDate = setDate(0, 1);
const endTrendDate = setDate(1, 0);

const range1day = '/range/1/day/';
const separator = '/'
const rangeRemainder = '?adjusted=true&sort=desc&limit=4999&apiKey='
const timeRange = range1day + startTrendDate + separator + endTrendDate + rangeRemainder;
const key = 'O9kATVs3lDQndKLjOAij59qAl5zgKzID'

type Ticker =
    { name: string, ticker: string }

// Tatsächliche Funktion um die Anfragezeile zusammenzustllen
const getPath = (ticker: Ticker) => {
    return path + ticker.ticker + timeRange + key;
}

/**
 * Funktion um die Aktie nach Empfang aufzubereiten mit Name und zusammenzufügen mit die
 * Trendwerten
 * rawStock : empfangene Aktie von Broker
 * ticker : name und ticker für Aktie
 * return => stock : aufbereite Aktie
 */
const prepareData = (rawStock:any, ticker: Ticker):Stock => {
    
    const stock = {
        name: ticker.name,
        ticker: rawStock.ticker,

        // Nur Aktiewert am Ende des Tages brauchen wir (closing)
        
        trend: rawStock.results.map((el:any) => el.c)
    };

    return stock;
}

