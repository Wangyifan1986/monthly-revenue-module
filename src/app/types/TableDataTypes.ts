export interface TableData {
	id: number;
	month: string;
	revenue: string;
	revenue_rate: string;
}

export interface LineChartData {
	id: number;
	month: string;
	revenue: string;
	revenue_rate: string;
}

export interface StockSelData {
	label: string;
	value: string | number;
}
