import React, { useEffect, useState } from "react";
import axios from "axios";
import { TableData } from "../types/TableDataTypes";
import { Table } from "antd";

interface DataItem {
	month: string;
	revenue: string;
	revenue_rate: string;
}

//转换数据格式函数
function transformData(data: DataItem[]) {
	const months: { [key: string]: string }[] = [];
	const revenues: { [key: string]: string }[] = [];
	const revenueRates: { [key: string]: string }[] = [];

	data.forEach((item, index) => {
		const monthKey = `month_${index + 1}`;
		const revenueKey = `revenue_${index + 1}`;
		const revenueRateKey = `revenue_rate_${index + 1}`;

		months.push({ [monthKey]: item.month });
		revenues.push({ [revenueKey]: item.revenue });
		revenueRates.push({ [revenueRateKey]: item.revenue_rate });
	});

	return [
		Object.assign({}, ...months),
		Object.assign({}, ...revenues),
		Object.assign({}, ...revenueRates),
	];
}

const columns = [
	{
		title: "年度月份",
		dataIndex: "month",
	},
	{
		title: "每月营收",
		dataIndex: "revenue",
	},
	{
		title: "单月营收年增率",
		dataIndex: "revenue_rate",
	},
];

const MonthlyRevenueTable = () => {
	const [transformedData, setTransformedData] = useState<
		{ [key: string]: string }[][]
	>([]);

	useEffect(() => {
		try {
			fetch("http://localhost:5000/TableData")
				.then((res) => res.json())
				.then((data) => {
					const transformed = transformData(data as DataItem[]);
					setTransformedData(transformed);
				});
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}, []);

	const columns = [
		{
			title: "年度月份",
			dataIndex: "month",
		},
		{
			title: "每月营收",
			dataIndex: "revenue",
		},
		{
			title: "单月营收年增率",
			dataIndex: "revenue_rate",
		},
	];

	return (
		<div style={{ overflowX: "auto", width: "750px" }}>
			<table style={{ borderCollapse: "collapse", width: "100%" }}>
				{/* <thead>
        <tr>
          <th>年度月份</th>
          <th>每月营收</th>
          <th>单月营收年增率</th>
        </tr>
      </thead> */}
				<tbody>
					<tr>
						<td
							style={{
								border: "1px solid #ddd",
								padding: "8px",
								backgroundColor: "#e5edf6",
							}}
						>
							年度月份
						</td>
						{transformedData[0] &&
							Object.values(transformedData[0]).map(
								(value, index) => (
									<td
										style={{
											border: "1px solid #ddd",
											padding: "8px",
											backgroundColor: "#e5edf6",
										}}
										key={index}
									>
										{value.toString()}
									</td>
								)
							)}
					</tr>
					<tr>
						<td
							style={{
								border: "1px solid #ddd",
								padding: "8px",
								backgroundColor: "white",
							}}
						>
							每月营收
						</td>
						{transformedData[1] &&
							Object.values(transformedData[1]).map(
								(value, index) => (
									<td
										style={{
											border: "1px solid #ddd",
											padding: "8px",
											backgroundColor: "white",
										}}
										key={index}
									>
										{value.toString()}
									</td>
								)
							)}
					</tr>
					<tr>
						<td
							style={{
								border: "1px solid #ddd",
								padding: "8px",
								backgroundColor: "#e5edf6",
							}}
						>
							单月营收年增率(%)
						</td>
						{transformedData[2] &&
							Object.values(transformedData[2]).map(
								(value, index) => (
									<td
										style={{
											border: "1px solid #ddd",
											padding: "8px",
											backgroundColor: "#e5edf6",
										}}
										key={index}
									>
										{value.toString()}
									</td>
								)
							)}
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default MonthlyRevenueTable;
