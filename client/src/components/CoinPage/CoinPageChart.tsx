import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ICoinPriceHistory, ICrypt } from '../../types/types';
import ChartInfoComponent from '../ChartInfoComponent/ChartInfoComponent';
import Loader from '../UI/Loader';
import ChartComponent from '../СhartComponent/СhartComponent';
// @ts-ignore
import { store } from 'react-notifications-component';
import { notificationConfig } from '../../utils/notificationConfig';

interface CoinPageChartProps {
	crypt: ICrypt
}

type periodType = '1m' | '3m' | '6m' | '1y' | 'all'

const CoinPageChart: React.FC<CoinPageChartProps> = ({ crypt }) => {

	const [coinPriceHistory, setCoinPriceHistory] = useState<ICoinPriceHistory[]>([]);

	const fetchData = (period: periodType): void => {

		setCoinPriceHistory([])

		axios.get<ICoinPriceHistory[]>(`/api/chart?period=${period}&coinId=${crypt.id}`, {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			}
		})
			.then(response => {
				setCoinPriceHistory(response.data)
			})
			.catch(e => {
				store.addNotification({
					...notificationConfig,
					message: e.response?.data?.message,
				})
			})
	}

	useEffect(() => {

		fetchData('3m')

	}, [])

	return coinPriceHistory && coinPriceHistory.length ?
		(
			<>

				<ChartInfoComponent
					crypt={crypt}
					coinPriceHistory={coinPriceHistory}
				/>

				<ChartComponent
					coinPriceHistory={coinPriceHistory}
				/>

				<div className="coin-chart-buttons-wrapper">
					<button
						className="coin-chart-button"
						onClick={() => fetchData('1m')}
					>
						1M
					</button>
					<button
						className="coin-chart-button"
						onClick={() => fetchData('3m')}
					>
						3M
					</button>
					<button
						className="coin-chart-button"
						onClick={() => fetchData('6m')}
					>
						6M
					</button>
					<button
						className="coin-chart-button"
						onClick={() => fetchData('1y')}
					>
						1Y
					</button>
					<button
						className="coin-chart-button"
						onClick={() => fetchData('all')}
					>
						ALL
					</button>
				</div>

			</>
		)
		:
		(
			<div style={{ height: 659, position: 'relative' }}>
				<Loader
					position={'absolute'}
				/>
			</div>
		)
}

export default CoinPageChart