import React, { useState, useEffect } from "react";
import { Select, Skeleton } from "antd";
import type { SelectProps } from "antd";

import axios from "axios";

import { StockSelData } from "../types/TableDataTypes";

interface StockSelectionComProps {
	onStockSelect: (stock: any) => void;
	defaultValue: string | number | undefined;
	onDefaultValueChange: (value: string | number | undefined) => void;
}

const { Option } = Select;

const StockSelectionCom: React.FC<StockSelectionComProps> = ({
	onStockSelect,
}) => {
	const [stockSelData, setStockSelData] = useState<StockSelData[]>([]);
	const [defaultValue, setDefaultValue] = useState<
		string | number | undefined
	>(undefined);
	const [isLoading, setIsLoading] = useState(true);

	const handleChange = (value: string | number | undefined) => {
		onStockSelect(value);
	};

	const handleFilter = (input: any, option: any) => {
		return option.value.toLowerCase().includes(input.toLowerCase());
	};

	useEffect(() => {
		setIsLoading(true); //开始加载时设置isLoading为true

		fetch("http://localhost:5000/StockSelData")
			.then((response) => response.json())
			.then((data) => {
				console.log("data====", data[0].value);
				const options = (data as StockSelData[]).map((item) => ({
					value: item.value,
					label: item.label,
				}));
				setStockSelData(options);
				if (data.length > 0) {
					setDefaultValue(data[0].value); //设置默认选中第一项
				}
				setIsLoading(false); //数据加载完成后设置isLoading为false
			})
			.catch((error) => {
				console.error("Error fetching options:", error);
				setIsLoading(false);
			});
	}, []);

	return isLoading ? (
		<Skeleton.Input active />
	) : (
		<Select
			className="stock-selection"
			placeholder="输入台/美股代号，查看公司价值"
			showSearch
			defaultValue={defaultValue}
			filterOption={handleFilter}
			onChange={handleChange}
			options={stockSelData}
		/>
	);
};

export default StockSelectionCom;
