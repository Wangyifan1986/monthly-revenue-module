import React, { useState, useEffect } from "react";
import { StockSelData } from "../types/TableDataTypes";

interface StockInfoComponentProps {
	selectedStock: StockSelData | null;
	defaultValue: string | number | undefined;
}

const StockInfoCom: React.FC<StockInfoComponentProps> = ({
	selectedStock,
	defaultValue,
}) => {
	console.log("selectedStock", selectedStock, defaultValue);
	return (
		<div>
			{selectedStock ? (
				<div className="stock-info">{selectedStock.toString()}</div>
			) : (
				<div className="stock-info">
					{defaultValue ? `${defaultValue}` : "台积电(2330)"}
				</div>
			)}
		</div>
	);
};

export default StockInfoCom;
