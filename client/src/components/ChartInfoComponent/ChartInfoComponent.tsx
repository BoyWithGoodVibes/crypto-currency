import React from 'react';
import { ICoinPriceHistory, ICrypt } from '../../types/types';
import { chartInfoComponentDate } from '../../utils/dateConverter';
import { minValue, maxValue, avgValue } from '../../utils/numConverter';
import './ChartInfoComponent.scss';


interface ChartInfoComponentProp {
	crypt: ICrypt,
	coinPriceHistory: ICoinPriceHistory[]
}


const ChartInfoComponent: React.FC<ChartInfoComponentProp> = ({ crypt, coinPriceHistory }) => {


	return (
		<div
			className="chart-info"
		>
			<div className="chart-info-wrapper">
				<img className="chart-info-icon" src={crypt.icon} alt="" />
				<div className="chart-info-name">
					<p className="chart-info-name-title">
						{crypt.name}
					</p>
					<p className="chart-info-name-symbol">
						{crypt.symbol}
					</p>
					<p className="chart-info-name-date">
						{chartInfoComponentDate(new Date().valueOf())}
					</p>
				</div>
			</div>

			<div className="chart-info-wrapper">
				<div className="chart-info-statistics">
					<p><span>HIGH</span>&nbsp;&nbsp; {maxValue(coinPriceHistory)}</p>
					<p><span>LOW</span>&nbsp;&nbsp;&nbsp; {minValue(coinPriceHistory)}</p>
					<p><span>AVG</span>&nbsp;&nbsp;&nbsp;&nbsp; {avgValue(coinPriceHistory)}</p>
				</div>
			</div>

		</div>
	)
}

export default ChartInfoComponent;