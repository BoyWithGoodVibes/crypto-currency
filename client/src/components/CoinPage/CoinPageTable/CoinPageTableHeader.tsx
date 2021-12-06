import React from 'react';
import { IMarket, IMarketListSort } from '../../../types/types';
import './CoinPageTable.scss';


interface CoinPageTableHeaderProps {
	sortedBy: IMarketListSort
	sort: (sortKey: keyof IMarket) => void
}



interface ICoinPageTableHeaders {
	name: string;
	class: string;
	sortKey?: keyof IMarket;
	colSpan?: number
}


const tableHeaders: ICoinPageTableHeaders[] = [
	{ name: 'Exchange', class: 'left-aligned coinpage-table-header-item', sortKey: 'exchangeId', colSpan: 2 },
	{ name: 'Pair', class: 'right-aligned coinpage-table-header-item' },
	{ name: 'Price', class: 'right-aligned coinpage-table-header-item', sortKey: 'priceUsd' },
	{ name: 'Volume (24h)', class: 'right-aligned coinpage-table-header-item', sortKey: 'volumeUsd24Hr' },
	{ name: 'Volume (%)', class: 'right-aligned coinpage-table-header-item', sortKey: 'volumePercent' },
]


const CoinPageTableHeader: React.FC<CoinPageTableHeaderProps> = ({ sortedBy, sort }) => {
	return (
		<thead className="coinpage-table-header">
			<tr className="coinpage-table-header-row">
				{
					tableHeaders.map(item => {
						return (
							<th
								className={item.class}
								colSpan={item.colSpan ? item.colSpan : 1}
								key={item.name}
								onClick={item.sortKey ? () => sort(item.sortKey!) : () => {}}
							>
								{item.name}
								{  																			// Отображение значка сортировки
									sortedBy.key === item.sortKey &&
									<i className="tiny material-icons header-icon">
										{sortedBy.isDescending === true ? 'arrow_drop_down' : 'arrow_drop_up'}
									</i>
								}
							</th>
						)
					})
				}
			</tr>
		</thead>
	)
}

export default CoinPageTableHeader;