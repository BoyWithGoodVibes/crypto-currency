import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICrypt, IMarket, IMarketListSort } from '../../../types/types';
import CoinPageTableHeader from './CoinPageTableHeader';
import './CoinPageTable.scss'
import CoinPageTableBody from './CoinPageTableBody';


interface CoinPageTableProps {
	crypt: ICrypt
}

const CoinPageTable: React.FC<CoinPageTableProps> = ({ crypt }) => {

	const [list, setList] = useState<IMarket[]>([])
	const [sortedBy, setSortedBy] = useState<IMarketListSort>({ key: 'volumeUsd24Hr', isDescending: true })


	useEffect(() => {
		axios.get<IMarket[]>(`/api/market/${crypt.id}`, {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			}
		})
			.then(response => setList(response.data))
			.catch(e => {
				console.log(e.response?.data?.message)
			})

	}, [crypt.id])


	const sort = (sortKey: keyof IMarket): void => {

		let copy = list.map(a => a)

		// Равно ли предыдущее значение ключа сортировки выбранному, при учете того,
		// Что оно находилось в значении убывания
		if (sortedBy.key === sortKey && sortedBy.isDescending) {
			// Ключ "exchangeId" является единственным ,
			// При которых сортируются символы строкового типа
			if (sortKey === 'exchangeId') {
				copy.sort((a: IMarket, b: IMarket) => a[sortKey].localeCompare(b[sortKey]))
			} else {
				copy.sort((a: IMarket, b: IMarket) => Number(a[sortKey]) - Number(b[sortKey]))
			}
			setSortedBy({ key: sortKey, isDescending: false })
		} else {  // Предыдущее значение либо не равняется выбранному, либо оно находилось в значении возрастания
			if (sortKey === 'exchangeId') {
				copy.sort((a: IMarket, b: IMarket) => b[sortKey].localeCompare(a[sortKey]))
			} else {
				copy.sort((a: IMarket, b: IMarket) => Number(b[sortKey]) - Number(a[sortKey]))
			}
			setSortedBy({ key: sortKey, isDescending: true })
		}


		setList(copy)

	}


	return list && list.length ?
		(
			<table className="coinpage-table">

				<CoinPageTableHeader
					sortedBy={sortedBy}
					sort={sort}
				/>

				<CoinPageTableBody
					list={list}
				/>

			</table>
		)
		:
		(
			null
		)
}

export default CoinPageTable