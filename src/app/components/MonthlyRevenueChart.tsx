import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChartData } from "../types/TableDataTypes";
import { Line, Bar } from "react-chartjs-2";
import SkeletonChart from "./SkeletonChart";

import { ChartOptions, plugins, scales } from "chart.js";
import { ChartData as ChartJSChartData } from "chart.js";

type ChartData<TType extends "bar" | "line", TData, TLabel> = ChartJSChartData<
	TType,
	TData,
	TLabel
>;

interface ChartDataItem {
	month: string;
	revenue: number;
	revenue_rate: number;
}

interface DatasetConfig {
	label: string;
	data: number[];
	yAxisID: string;
	fill?: boolean;
	backgroundColor: string;
	borderColor?: string;
	type: "bar" | "line";
	borderWidth?: number;
}

interface MonthlyRevenueChartProps {
	selectedYear: string | number | null;
	onYearSelect: (year: string | number) => void;
}

const options = {
	responsive: true,
	scales: {
		y: {
			type: "linear" as "linear",
			scaleLabel: {
				display: true,
				labelString: "千元", // 单位文本
				position: "top", // 将单位显示在 Y 轴顶部
			},
			title: {
				display: true,
				text: "千克",
				position: "top",
			},
		},
		"y-axis-2": {
			type: "linear" as "linear",
			position: "right" as "right",
			gridLines: {
				display: false, // 仅在右侧绘制网格线
			},
			title: {
				display: true,
				text: "%",
				position: "bottom",
			},
		},
	},
	plugins: {
		legend: {
			position: "top" as "top",
		},
	},
};

const MonthlyRevenueChart: React.FC<MonthlyRevenueChartProps> = ({
	selectedYear,
	onYearSelect,
}) => {
	const [ChartJSChartData, setChartDatas] = useState<
		ChartJSChartData<"bar" | "line", number[], string>
	>({
		labels: [],
		datasets: [
			{
				label: "单月营收年增率(%)",
				data: [],
				yAxisID: "y-axis-2",
				fill: false,
				backgroundColor: "rgba(207,29, 29, 1)",
				borderColor: "rgba(207,29, 29, 1)",
				type: "line",
			},
			{
				label: "每月营收",
				data: [],
				yAxisID: "y",
				backgroundColor: "rgba(162,169, 29, 1)",
				borderWidth: 1,
				type: "bar",
			},
		],
	});

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const year =
			typeof selectedYear === "number"
				? selectedYear
				: selectedYear
				? Number(selectedYear)
				: 0;
		fetchChartData(year);
		// if (selectedYear) {
		//   fetchChartData(selectedYear.key);
		// }
	}, [selectedYear]);

	const fetchChartData = (year: string | number) => {
		console.log("year===", year);

		try {
			// fetch(`http://localhost:5000/LineChartData_${year}`)
			setIsLoading(true);
			fetch("http://localhost:5000/LineChartData")
				.then((res) => res.json())
				.then((data) => {
					setIsLoading(false);
					console.log("data==", data[0]);
					const labels = (data[year] as ChartDataItem[]).map(
						(item: ChartDataItem) => item.month
					);
					const revenues = (data[year] as ChartDataItem[]).map(
						(item: ChartDataItem) => item.revenue
					);
					const revenue_rate = (data[year] as ChartDataItem[]).map(
						(item: ChartDataItem) => item.revenue_rate
					);

					setChartDatas({
						labels,
						datasets: [
							{
								label: "单月营收年增率(%)",
								data: revenue_rate,
								yAxisID: "y-axis-2",
								// gridLines: {
								//   display: false, // 仅在右侧绘制网格线
								// },
								fill: false,
								backgroundColor: "rgba(207,29, 29, 1)",
								borderColor: "rgba(207,29, 29, 1)",
								type: "line",
							},
							{
								label: "每月营收",
								data: revenues,
								yAxisID: "y",
								backgroundColor: "rgba(162,169, 29, 1)",
								// borderColor: 'rgba(75,192,192,1)',
								borderWidth: 1,
								type: "bar",
							},
						],
					});
				});
		} catch (error) {
			console.error("Error fetching data:", error);
			setIsLoading(false);
		}
	};

	return isLoading ? (
		<SkeletonChart />
	) : (
		<Bar
			className="monthly-revenue-chart"
			data={ChartJSChartData as ChartData<"bar", number[], string>}
			options={options}
		></Bar>
	);
};

export default MonthlyRevenueChart;
