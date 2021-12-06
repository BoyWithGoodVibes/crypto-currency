import React from 'react';
import { Datum, Line } from '@ant-design/charts';
import { ICoinPriceHistory } from '../../types/types';
import { chartDate } from '../../utils/dateConverter';
import { numConverter } from '../../utils/numConverter';
import './ChartComponent.scss';


interface DropDownСhartProps {
	coinPriceHistory: ICoinPriceHistory[]
}

const СhartComponent: React.FC<DropDownСhartProps> = ({ coinPriceHistory }) => {

	const config = {
		data: coinPriceHistory.map(item => {
			return {
				date: chartDate(item.date * 1000),
				price: Number(numConverter(item.price))
			}
		}),
		xField: 'date',
		yField: 'price',
		theme: {
			defaultColor: 'red'
		},
		lineStyle: {
			stroke: 'red',
			lineWidth: 4
		},
		smooth: true,
		tooltip: {
			formatter: (datum: Datum) => {
				return { name: datum.date, value: '$' + datum.price };
			},
			showTitle: false
		}
	};

	return (
		<div className="crypto-chart">
			<Line {...config} />
		</div>
	)


}

export default СhartComponent;