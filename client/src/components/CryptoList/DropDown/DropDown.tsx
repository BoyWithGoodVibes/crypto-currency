import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICoinPriceHistory, ICrypt } from '../../../types/types';
import Loader from '../../UI/Loader';
import СhartComponent from '../../СhartComponent/СhartComponent';
import ChartInfoComponent from '../../ChartInfoComponent/ChartInfoComponent';
import './DropDown.scss';
import '../CryptoList.scss';
// @ts-ignore
import { store } from 'react-notifications-component';
import {notificationConfig} from '../../../utils/notificationConfig';


interface DropDownProps {
	crypt: ICrypt;
	toCloseDropdown: () => void
}



const DropDown = React.memo<DropDownProps>(({ crypt, toCloseDropdown }) => {

	const [coinPriceHistory, setCoinPriceHistory] = useState<ICoinPriceHistory[]>([]);

	useEffect(() => {
		axios.get<ICoinPriceHistory[]>(`/api/chart?period=3m&coinId=${crypt.id}`, {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			}
		})
			.then(response => setCoinPriceHistory(response.data))
			.catch(e => {
				store.addNotification({  // Уведомляем пользователя об ошибке
					...notificationConfig,
					message: e.response?.data?.message,
				})

				toCloseDropdown() 		// Автоматически удаляем компонент
			})

	}, [crypt.id, toCloseDropdown])



	return coinPriceHistory.length && coinPriceHistory ?
		(
			<tr
				className="crypto-list-dropdown"
			>
				<td className="crypto-list-dropdown-td" colSpan={9}>

					<ChartInfoComponent
						crypt={crypt}
						coinPriceHistory={coinPriceHistory}
					/>

					<СhartComponent
						coinPriceHistory={coinPriceHistory}
					/>

				</td>
			</tr>
		)
		:
		(
			<Loader
				position={'fixed'}
			/>
		)
})

export default DropDown;