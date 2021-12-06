import React, { useState, useEffect, useCallback } from 'react';
import { ICrypt } from '../../types/types';
import CryptoListItem from './CryptoListItem';
import throttle from 'lodash.throttle';



interface CryptoListBodyProps {
	crypts: ICrypt[];
	sortedList: ICrypt[];
}

const CryptoListBody: React.FC<CryptoListBodyProps> = ({ crypts, sortedList }) => {

	const [maxItemsCount, setMaxItemsCount] = useState<number>(20)


	// Функция, отвечающая за пагинацию, обернута в throttle
	// Чтобы она не вызывалась на каждое движение скролла
	// И игнорировать последующие вызовы, пока не прошло 180 мс
	const scrollHandler = useCallback(
		throttle(() => {  

			const isEnd = document.documentElement.scrollHeight - document.documentElement.scrollTop - 180 <= document.documentElement.clientHeight

			if (isEnd) {
				setMaxItemsCount(maxItems => maxItems + 1)
			}

		}, 170),
		[]
	)

	// Подписываемся на событие, отвечающее за пагинацию 
	useEffect(() => {

		document.addEventListener('scroll', scrollHandler)

		return () => {
			document.removeEventListener('scroll', scrollHandler)
		}

	}, [scrollHandler])

	// Отписываемся от обработчика, если все валюты отображены
	useEffect(() => {

		if (maxItemsCount >= crypts.length) {
			document.removeEventListener('scroll', scrollHandler)
		}

	}, [scrollHandler, maxItemsCount, crypts.length])



	return (
		<tbody className="crypto-list-table-body">
			{
				(sortedList.length && sortedList ? sortedList : crypts)  // Если массив отсортирован ,то отображаем его 
					.slice(0, maxItemsCount) // Пагинация						// иначе отображаем массив, полученный с сервера
					.map(item => {
						return (
							<CryptoListItem
								crypt={item}
								key={item.rank}
							/>
						)
					})
			}
		</tbody>
	)
}

export default CryptoListBody;