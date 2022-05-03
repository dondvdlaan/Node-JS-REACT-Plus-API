import { useEffect, useState } from "react";

/**
 * setInterval Funktion in useEffect, die setInterval auch wieder aufräumt nach Gebrauch
 * downloads : Menge der Aktien zu abfragen
 * downloadDuration : Zeit in s zwischen jede Abfrage
 */
export function useInterval(downloads: number, downloadDuration: number): number {

  // -------------------- Konstankten / Variabelen -------------------- 
  let counter = downloads;

  const [stockToDownload, setStockToDownload] = useState(downloads);


  useEffect(() => {

    const countDownloads = () => {
      counter--;
      if (counter >= 0) setStockToDownload(counter)
    }

    const intervalId = window.setInterval(countDownloads, downloadDuration * 1000);
    
    return () => {
      window.clearInterval(intervalId);
    };
  }, [downloadDuration]);

  return stockToDownload;
}
