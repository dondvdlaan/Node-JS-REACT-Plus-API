import React from 'react'
import { Link } from "react-router-dom";
import { Stock } from '../types/Stock'

interface Props{
    stock:Stock
}
/**
 * Funktion nur um Trendbildoberfläche abzurufen
 */
export default function TrendLaunch(props:Props) {
  return (
      <section id="secTrendLaunch">

        <button >
            <Link to={`/trending/${props.stock.ticker}`}>Trend</Link>
        </button>
      </section>
  )
}

