import React from 'react'
import { Stock, portfolioStock } from '../types/Stock'

interface Props{
  onBuyStock:(e: React.MouseEvent<HTMLTableRowElement>) => void,
  onTransferToPortfolio : (stock:Stock,quantity:number) => void,
  onSellStock: (stock:portfolioStock) => void
}
/**
 * Nur einen grossen Titel, kann man auch auf versichten
 */
export default function HeaderText(props:Props) {
  return (
    <header>
        <div id="divHeaderText">
            <h2>Wertpapieren Portfolio</h2>
        </div>
    </header>
  )
}
