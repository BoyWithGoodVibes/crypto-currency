import React, { useContext, useState } from 'react';
import './CryptoList.scss';
import '../../App.scss';
import { ICrypt, ICryptoListSort } from '../../types/types';
import Loader from '../UI/Loader';
import CryptoListHeader from './CryptoListHeader';
import CryptoListBody from './CryptoListBody';
import { CryptsContext } from '../../App';



const CryptoList: React.FC = () => {

	const crypts = useContext(CryptsContext)

	const [sortedList, setSortedList] = useState<ICrypt[]>([]);
	const [sortedBy, setSortedBy] = useState<ICryptoListSort>({ key: 'rank', isDescending: false });


	const sort = (sortKey: keyof ICrypt): void => {

		let copy = crypts.map(a => a);

		// Равно ли предыдущее значение ключа сортировки выбранному, при учете того,
		// Что оно находилось в значении убывания
		if (sortedBy.key === sortKey && sortedBy.isDescending) {
			// Ключ "exchangeId" является единственным ,
			// При которых сортируются символы строкового типа
			if (sortKey === 'name') {
				copy.sort((a: ICrypt, b: ICrypt) => a[sortKey].localeCompare(b[sortKey]))
			} else {
				copy.sort((a: ICrypt, b: ICrypt) => Number(a[sortKey]) - Number(b[sortKey]))
			}
			setSortedBy({ key: sortKey, isDescending: false })
		} else {  // Предыдущее значение либо не равняется выбранному, либо оно находилось в значении возрастания
			if (sortKey === 'name') {
				copy.sort((a: ICrypt, b: ICrypt) => b[sortKey].localeCompare(a[sortKey]))
			} else {
				copy.sort((a: ICrypt, b: ICrypt) => Number(b[sortKey]) - Number(a[sortKey]))
			}
			setSortedBy({ key: sortKey, isDescending: true })
		}

		setSortedList(copy);

	}


	return crypts && crypts.length ?
		(
			<section className="crypto-list">

				<table className="crypto-list-table">
					{/*Table header*/}
					<CryptoListHeader 
						sortedBy={sortedBy}
						sort={sort}
					/>

					{/* Table body */}
					<CryptoListBody
						sortedList={sortedList}
						crypts={crypts}
					/>

				</table>

			</section>
		)
		:
		(
			<Loader 
				position={'fixed'}
			/>
		)
}

export default CryptoList;