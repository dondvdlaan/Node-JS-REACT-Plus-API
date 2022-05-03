import React, { useEffect, useState } from 'react'
import { Line } from '@ant-design/plots';
import css from './Trending.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { Stock } from '../types/Stock'
import { setDate } from '../shared/StockApi';
import { useReadFromDB } from '../shared/DBApi';
import { pathToServer } from '../shared/PathToServer';

/**
 * Trending Funktion von AntD plot library
 */
export default function Trend() {

  // Aufruf über URL in browser
  const ticker = useParams<{ ticker: string }>().ticker;
  const navigate = useNavigate();

  console.log('ticker',ticker);

  // const initialStateStock={name:'noName',ticker:'noTicker',trend:[0]}
  // const initialStateStockList=[{name:'noName',ticker:'noTicker',trend:[0]}]

  const [stockList, setStocks] = useReadFromDB<Stock>(pathToServer.getStockList,true)

  if (!stockList || stockList.length===0) {
    console.log('Guard waiting stocklist');
    return <p>Lade</p>;
}
        
        console.log('tockList',stockList);
        
        // Aktie aus Aktienliste filtern
        let stock=stockList.filter(s=>s.ticker===ticker)[0]
        
        console.log('tock',stock);

        // Zurück nach Übersicht
        const onGoToFE=()=>{
          navigate("/fe")
        }


// Datenquelle aufbereiten nach Beispiel hierunter
const data = stock.trend.map((tv:number,index:number)=>
({day: setDate(index,0), value: tv}))
 
// const data = [
   //   { year: '1992', value: 4 },
  //   { year: '1993', value: 3.5 },
  // ];

  const config = {
    data,
    margin:10,
    xField: 'day',
    yField: 'value',
    // color: ['#1979C9', '#D62A0D', '#FAA219'],
    color: '#D62A0D',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  return (
    <>
    <section className={css.secPart1}>

    </section>

    <div className={css.flexcontainer} >
      <section className={css.secStockList}>

      </section>
      <section className={css.secTrending}>
        <br />
        FIRMA:  {stock.name}
         <Line {...config} />
         <button onClick={onGoToFE} >
         Zurück zur Übersicht
        </button>
      </section>

    </div>
    </>
  )

}
