import { useReadFromDB } from '../shared/DBApi'
import { pathToServer } from '../shared/PathToServer'
import { setDate } from '../shared/StockApi'
import { Stock, portfolioStock } from '../types/Stock'
import FEStockList from './FEStockList'
import FEPortfolio from './FEPortfolio'

/**
 * Hauptfunktion der Anwendung. Koppelpunkt wo alle Komponenten zusammenkommen. Hat selbst keine
 * UI.
 */
export default function FEWertpapieren() {

  // ------------------ Konstanten / Variabelen ------------------
//   const initialStateStock={name:'noName',ticker:'noTicker',trend:[0]}
//  const initialStateStockList=[{name:'noName',ticker:'noTicker',trend:[0]}]
//   const initialStatePortfolio=[{name:'noName',ticker:'noTicker',trend:[0],buyingDate:"",quantity:0,id:""}]


  const [portfolio, setPortfolio] = useReadFromDB(pathToServer.getPortfolio,false)

   if (!portfolio) {
      console.log('Guard waiting portfolio');
      return <p>Lade</p>;
  }
 console.log('FEW portfolio', portfolio);
 

 //------------------ OnClicks ------------------

  // Von Detailanzeige nach Portfolio
  const onTransferToPortfolio=(stock:Stock, quantity:number)=>{
    let stockPortfolio ={...stock, buyingDate:setDate(0,0), quantity, id:(portfolio.length+1).toString()}
    console.log('stockPortfolio in FEW',stockPortfolio) 
    setPortfolio(portfolio=>[...portfolio,stockPortfolio]);
    
  }

  // Von Portfolio ins Papierkorb
  const onSellStock =(portfolioStockToDelete:portfolioStock)=>{
    setPortfolio(portfolio=>portfolio.filter(ps=>!(ps.id===portfolioStockToDelete.id)))
  }

  return (
    <>
      <FEStockList onTransferToPortfolio={onTransferToPortfolio} />
      <FEPortfolio onSellStock={onSellStock} portfolio={portfolio} />
    </>
  )
}
