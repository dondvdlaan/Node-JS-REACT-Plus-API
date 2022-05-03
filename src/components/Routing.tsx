import React from 'react'
import { Routes, Route } from "react-router-dom";
import BEWertpapieren from "./BEWertpapieren";
import FEWertpapieren from './FEWertpapieren';
import FEStockList from './FEStockList';
import Trending from './Trending';
import FEPortfolio from './FEPortfolio';
import StockDetails from './StockDetails';

/**
 * Standard REACT Routing
 */
export default function Routing() {
    return (
        <Routes>
            <Route path="/fe" element={<FEWertpapieren />} />
            <Route path="/stocks" element={<FEStockList />} />
            <Route path="/portfolio" element={<FEPortfolio />} />
            <Route path="/be" element={<BEWertpapieren />} />
            {/* <Route path="/trending" element={<Trending />} /> */}
            <Route path="/trending/:ticker" element={<Trending />} />

        </Routes>

    )
}
