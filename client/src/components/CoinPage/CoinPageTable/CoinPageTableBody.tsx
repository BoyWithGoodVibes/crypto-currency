import React, { useState } from 'react';
import { IMarket } from '../../../types/types';
import { numConverter } from '../../../utils/numConverter';
import './CoinPageTable.scss'


interface CoinPageTableBodyProps {
	list: IMarket[]
}

const CoinPageTableBody: React.FC<CoinPageTableBodyProps> = ({ list }) => {

	const [maxItemsCount, setMaxItemsCount] = useState<number>(15)

	const clickHandler = (): void => {
		setMaxItemsCount(maxItems => maxItems + 15)
	}

	return (
		<tbody className="coinpage-table-body">
			{
				list
					.slice(0, maxItemsCount) // Пагинация
					.map(item => {
						return (
							<tr
								key={Number(item.priceUsd) * Math.random()}
								className="coinpage-table-body-row"
							>

								<td
									className="coinpage-table-body-item  left-aligned"
									colSpan={2}
								>
									{item.exchangeId}
								</td>

								<td
									className="coinpage-table-body-item right-aligned"
								>
									{item.quoteSymbol}/{item.baseSymbol}
								</td>

								<td
									className="coinpage-table-body-item right-aligned"
								>
									${numConverter(item.priceUsd)}
								</td>

								<td
									className="coinpage-table-body-item right-aligned"
								>
									${numConverter(item.volumeUsd24Hr)}
								</td>

								<td
									className="coinpage-table-body-item right-aligned"
								>
									{Number(item.volumePercent).toFixed(2)}%
								</td>

							</tr>
						)
					})
			}

			<tr className="coinpage-table-body-row-button">
				<td
					colSpan={6}
				>
					{
						maxItemsCount >= list.length ? // Элементов больше не осталось
							(
								<span>NO MORE</span>
							)
							:
							(
								<button
									className="coinpage-button"
									onClick={clickHandler}
								>
									SHOW MORE
								</button>
							)
					}
				</td>
			</tr>

		</tbody>
	)
}

export default CoinPageTableBody