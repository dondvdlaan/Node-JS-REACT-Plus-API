import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { portfolioStock, Stock } from '../types/Stock';
import { pathToServer } from './PathToServer';
import { setDate } from './StockApi';

// const [portfolio, setPortfolio] = useState<portfolioStock[]>([])
// const [stockList, setStocks] = useState<Stock[]>()

type V = portfolioStock[] | Stock[]
// local utility type
type SetState<T> = Dispatch<SetStateAction<T>>;

/**
 * 
 */
export function useReadFromDB(path:string,isStock:boolean ) {

  const [data, setData] = useState([]);

  useEffect(() => {
  
    fromDBApi(path,setData,isStock);

  }, [path,isStock])
console.log('data:',data);

 return [data,setData]
}

/**
 * Custom Hook um empfangene Aktienliste nach Datenbank zu senden
 * stockListReady : Auslöser um Speicherung nach DB anzufangen
 */
 export function useStockApiDB(stockListReady: boolean, stockList: Stock[]): void {

  let logMessage = 'Server DB storage: '

  console.log('In useStockApiDB ', stockListReady);

  useEffect(() => {

      // Aktienliste mit Datum versehen
      let stockListToStore = {
          date: setDate(1, 0),
          stockList
      };

      // Keine leere Datei nach DB
      if (stockListToStore.stockList.length > 0) {
        
        toDBApi(pathToServer.storeStock, stockListToStore, logMessage)
      }

  }, [stockListReady])

}
/**
 * Portfolio wird nach Server geschickt um draufhin gespeichert auf Festplatte
 */
 export function usePortfolioToDB(portfolio: portfolioStock[]): void {

   let logMessage = 'Server says about portfolio: '

  useEffect(() => {

    // Keine leere Datei nach DB
    if (portfolio.length > 0) {
      
    toDBApi(pathToServer.backUpPortfolio, portfolio, logMessage)
    }
  }, [portfolio])

}

function toDBApi<T>(
  path: string,
  data:T,
  logMessage: string
): void {

  console.log('data>',data);
  
  axios({
    method: 'post',
    url: path,
    headers: { 'content-type': 'application/json' },
    data,
    }).then((response: AxiosResponse) => console.log(logMessage, response));
}

function fromDBApi(
  path: string,
  callback: (d) => void,
  isStock:boolean,
  data = {}
): void {

  axios({
    method: 'post',
    url: path,
    headers: { 'content-type': 'application/json' },
    data,
    })
    .then((response: AxiosResponse) => isStock ? response.data[0].stockList : response.data)
    .then((response: any) => callback(response))
    // .then((response: any) => console.log('response' ,response))
    // .then((response: AxiosResponse) => console.log('isStock', isStock,'path', path, 'response', response.data[0].stockList));

}

