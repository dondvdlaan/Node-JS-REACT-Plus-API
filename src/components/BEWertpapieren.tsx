import { ReactElement, useCallback, useEffect } from "react";
import { useInterval } from "../hooks/UseInterval";
import { useStockApi } from "../shared/StockApi";
import{useStockApiDB} from "../shared/DBApi"
import tickers from "../types/tickers";

/**
 * Nach Angabe des Brokers, können maximal 5 Anrufen / min ackzeptiert werden,
 * also diese Funktion ruft die getStockData Funktion jede >12 s auf
 */
export default function BEWertpapieren() {

  // -------------------- Konstankten / Variabelen -------------------- 
  const downloadDuration = 25;

  let nrOfStockToDownload = tickers.length - 1;
  // let nrOfStockToDownload = 2;

  console.log('nrOfStockToDownload ', nrOfStockToDownload);


  const stockCounter = useInterval(nrOfStockToDownload, downloadDuration)

  const [stockListReady, stockList] = useStockApi(stockCounter)

  console.log('stockList generated:', stockList);

  useStockApiDB(stockListReady, stockList)


  return (
    <>

      <header>
        <h2>
          BE Warenpapieren Portfolio
        </h2>
      </header>

      <section id="secUpdateStocks">

        <div>
          <h3>
            Update Stocklist FE
          </h3>

          <input id="stockName" type="text" placeholder="Name Aktie" />
          <input id="stockTicker" type="text" placeholder="Ticker Aktie" />
          <button id="stockConfirmation">Bestätigen</button>
        </div>

      </section>

      <section id="secMaintenance">

        <div>
          <h3>Maintenace</h3>

          <button id="requestStock" >Abfrage Aktien</button>
          <button id="storeStock">Speichern Aktien</button>
          <button id="exportDB">Exportieren DB</button>
          <button id="backUpPortfolio">Portfolio Sichern</button>
        </div>

      </section>
    </>
  )

}
