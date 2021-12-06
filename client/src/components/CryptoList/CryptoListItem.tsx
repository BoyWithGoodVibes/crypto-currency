import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ICrypt } from '../../types/types';
import { numConverter } from '../../utils/numConverter';
import DropDown from './DropDown/DropDown';
import { Link } from 'react-router-dom';
import './CryptoList.scss';


interface CryptoListItemProps {
	crypt: ICrypt;
	price?: string;
}


const CryptoListItem = React.memo<CryptoListItemProps>(({ crypt }) => {

	const myRef = useRef<HTMLTableRowElement | null>(null);						// Ссылка на <tr> для изменения добавления анимации при изменении
	const [isClose, setIsClose] = useState<boolean>(true);
	const [price, setPrice] = useState<string>('')
	const prev = usePrevious(Number(price) || Number(crypt.priceUsd));		// Кастомный хук для хранения предыдущего значения


	function usePrevious<T>(value: T): T | undefined {
		const ref = useRef<T>();
		useEffect(() => {
			ref.current = value;
		});
		return ref.current;
	}


	// Открываем webSocket только для тех валют 
	// Которые присутствуют в приложении
	useEffect(() => {
		const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${crypt.id}`)

		pricesWs.onmessage = (msg) => {
			if (msg) {
				let coin = Object.values<string>(JSON.parse(msg.data))[0]
				setPrice(coin)
			}
		}

		return () => {
			pricesWs.close()
		}

	}, [crypt])

	// Созданы две функции удаления компонента, т.к. одна принимает event
	// И используеться для обработки события на HTML Document
	// А другая для удаления компонента из дочернего компонента (DropDown)

	const toCloseDropdown = (e: any): void => {
		if (!isClose && e.target.classList.contains('crypto-list-table-body-item' || 'crypto-list-table-header-item')) {
			setIsClose(true)
		}
	}

	const toCloseInChildren = useCallback(
		(): void => {
			setIsClose(true)
		},
		[]
	)


	// Срванение предыдущей цены и нынешней
	// И добавление класса / удаление класса через 600мс (т.к. анимация длится 600мс)
	useEffect(() => {

		const { current } = myRef

		if (current && prev) {
			if (prev > Number(price)) {
				current.classList.add('decrease')
				setTimeout(() => {
					current.classList.remove('decrease')
				}, 500)
			}
			else if (prev < Number(price)) {
				current.classList.add('increase')
				setTimeout(() => {
					current.classList.remove('increase')
				}, 500)
			}
		}


	}, [price, prev])


	useEffect(() => {


		document.addEventListener('click', toCloseDropdown)

		return () => {
			document.removeEventListener('click', toCloseDropdown)
		}

	}, [toCloseDropdown])



	return (

		<>

			<tr
				className="crypto-list-table-body-row"
				onClick={() => setIsClose(!isClose)}
				ref={myRef}
			>


				<td className="crypto-list-table-body-item center-aligned">
					{crypt.rank}
				</td>

				<td
					className="crypto-list-table-body-item left-aligned"
					colSpan={2}
				>
					<img className="table-icon" src={crypt.icon} alt="" />

					<Link
						className="table-name"
						to={'/assets/' + crypt.name.toLowerCase()}
					>
						<p className="table-name-title">
							{crypt.name}
						</p>
						<p className="table-name-symbol">
							{crypt.symbol}
						</p>
					</Link>

				</td>

				<td
					//ref={myRef}
					className="crypto-list-table-body-item"
				>
					${price ? Number(price).toFixed(2) : numConverter(crypt.priceUsd)}
				</td>

				<td
					className="crypto-list-table-body-item"
				>
					${numConverter(crypt.marketCapUsd)}
				</td>

				<td
					className="crypto-list-table-body-item"
				>
					${numConverter(crypt.vwap24Hr)}
				</td>

				<td
					className="crypto-list-table-body-item"
				>
					{numConverter(crypt.supply)}
				</td>

				<td
					className="crypto-list-table-body-item"
				>
					${numConverter(crypt.volumeUsd24Hr)}
				</td>

				<td 														// Отображение цвета в зависимости от значения 
					className={`crypto-list-table-body-item 	
						${Number(crypt.changePercent24Hr) > 0 ? 'crypto-list-green-text' :
							Number(crypt.changePercent24Hr) < 0 ? 'crypto-list-red-text' :
								null
						}
					`}
				>
					{Number(crypt.changePercent24Hr).toFixed(2)}%
				</td>


			</tr>


			{
				!isClose && <DropDown
					crypt={crypt}
					toCloseDropdown={toCloseInChildren}
				/>
			}



		</>
	)
})

export default CryptoListItem;
