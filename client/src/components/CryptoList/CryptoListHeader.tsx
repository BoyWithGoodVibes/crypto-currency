import React from 'react';
import { ICrypt, ICryptoListSort } from '../../types/types';

interface CryptoListHeaderProps {
	sortedBy: ICryptoListSort;
	sort: (sortKey: keyof ICrypt) => void
}

interface ICryptoListTableHeader {
	name: string;
	sortKey: keyof ICrypt;
	class: string;
	colSpan?: number
}

const tableHeaders: ICryptoListTableHeader[] = [
	{ name: 'Rank', sortKey: 'rank', class: 'center-aligned crypto-list-table-header-item' },
	{ name: 'Name', sortKey: 'name', class: 'left-aligned crypto-list-table-header-item', colSpan: 2 },
	{ name: 'Price', sortKey: 'priceUsd', class: 'right-aligned crypto-list-table-header-item' },
	{ name: 'Market cap', sortKey: 'marketCapUsd', class: 'right-aligned crypto-list-table-header-item' },
	{ name: 'VWAP (24h)', sortKey: 'vwap24Hr', class: 'right-aligned crypto-list-table-header-item' },
	{ name: 'Supply', sortKey: 'supply', class: 'right-aligned crypto-list-table-header-item' },
	{ name: 'Volume (24h)', sortKey: 'volumeUsd24Hr', class: 'right-aligned crypto-list-table-header-item' },
	{ name: 'Change (24h)', sortKey: 'changePercent24Hr', class: 'right-aligned crypto-list-table-header-item' },
];



const CryptoListHeader: React.FC<CryptoListHeaderProps> = ({ sortedBy, sort }) => {

	return (
		<thead className="crypto-list-table-header">
			<tr className="crypto-list-table-header-row">
				{tableHeaders.map(item => {
					return (
						<th
							className={item.class}
							colSpan={item.colSpan ? item.colSpan : 1}
							onClick={() => sort(item.sortKey)}
							key={item.name}
						>
							{item.name}
							{ 											// Отображение значка сортировки
								sortedBy.key === item.sortKey &&
									<i className="material-icons header-icon">
										{sortedBy.isDescending === true ? 'arrow_drop_down' : 'arrow_drop_up'}
									</i>
							}

						</th>
					)
				})}
			</tr>
		</thead>
	)
}

export default CryptoListHeader;