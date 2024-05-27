"use client";

import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import MonthlyRevenueTable from "./components/MonthlyRevenueTable";
import MonthlyRevenueChart from "./components/MonthlyRevenueChart";
import StockSelectionCom from "./components/StockSelectionCom";
import AnnualDropdownBtn from "./components/AnnualDropdownBtn";
import StockInfoCom from "./components/StockInfoCom";

// import "./styles/common.scss";

const App: React.FC = () => {
	const [selectedYear, setSelectedYear] = useState<string | number | null>(
		null
	);

	const [selectedStock, setSelectedStock] = useState<any>(null);
	const [defaultValue, setDefaultValue] = useState<
		string | number | undefined
	>(undefined);

	const handleStockSelect = (stock: any) => {
		setSelectedStock(stock);
	};

	const handleDefaultValue = (value: string | number | undefined) => {
		console.log("value", value);
		setDefaultValue(value);
	};

	const handleYearSelect = (year: string | number) => {
		console.log("handleYearSelect===1=134");
		setSelectedYear(year);
		fetchChartData(year); // 根据选中年份获取图表数据
	};

	const fetchChartData = (year: string | number) => {
		try {
			console.log("year", year);
			// const response = await fetch(`/api/chart-data?year=${year}`);
			// const data = await response.json();
			// setChartData(data); // 更新图表数据
		} catch (error) {
			console.error("Error fetching chart data:", error);
		}
	};

	return (
		<div className="container">
			<div className="stock-selection-com">
				<StockSelectionCom
					onStockSelect={handleStockSelect}
					defaultValue={defaultValue}
					onDefaultValueChange={handleDefaultValue}
				></StockSelectionCom>
			</div>
			<div className="stock-info-com item">
				<StockInfoCom
					selectedStock={selectedStock}
					defaultValue={defaultValue}
				></StockInfoCom>
			</div>
			<Card
				className="revenue-chart-div item"
				title={
					<div className="revenue-card-title-container">
						<div className="revenue-card-title">每月营收</div>
						<div className="revenue-card-title-avatar">
							<AnnualDropdownBtn
								onYearSelect={handleYearSelect}
							/>
						</div>
					</div>
				}
			>
				<MonthlyRevenueChart
					selectedYear={selectedYear}
					onYearSelect={handleYearSelect}
				/>
			</Card>
			<Card className="revenue-table-div item" title="详细数据">
				<MonthlyRevenueTable />
			</Card>
		</div>
	);
};

export default App;
