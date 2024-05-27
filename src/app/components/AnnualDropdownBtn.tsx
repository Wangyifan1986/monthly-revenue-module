import React, { useState } from "react";
import { Dropdown, Menu, Button } from "antd";

interface AnnualSelectOption {
	key: string;
	label: string;
}

interface AnnualDropdownBtnProps {
	onYearSelect: (year: string | number) => void;
}

const annualSelectOptions: AnnualSelectOption[] = [
	{ key: "0", label: "近3年" },
	{ key: "1", label: "近5年" },
];

const AnnualDropdownBtn: React.FC<AnnualDropdownBtnProps> = ({
	onYearSelect,
}) => {
	const [selectedOption, setSelectedOption] = useState<AnnualSelectOption>(
		annualSelectOptions[0]
	);

	const handleYearSelect = (year: AnnualSelectOption) => {
		console.log("handleYearSelect", year);
		// onYearSelect(year);
		onYearSelect(year.key as string);
	};

	const menu = (
		<Menu>
			{annualSelectOptions.map((option) => (
				<Menu.Item
					key={option.key}
					onClick={() => {
						setSelectedOption(option);
						handleYearSelect(option);
					}}
				>
					{option.label}
				</Menu.Item>
			))}
		</Menu>
	);

	return (
		<Dropdown overlay={menu} trigger={["click"]}>
			<Button className="annual-dropdown-btn">
				{selectedOption.label}
			</Button>
		</Dropdown>
	);
};

export default AnnualDropdownBtn;
