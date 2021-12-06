import { ICoinPriceHistory } from '../types/types'

export const numConverter = (num: string | number): string | undefined => {


	if (!num) return

	num = String(num)

	// Если число < 1
	if (num[0] === '0') {
		for (let i = 2; i < num.length; i++) {
			if (num[i] !== '0') {
				return Number(num).toFixed(i)
			}
		}
	}

	let numberLength = (Number(num).toFixed(0)).length

	// Если число >= 1 trillion
	if (numberLength > 12) {
		return Number(num).toFixed(0).slice(0, -12) + '.' + Number(num).toFixed(0).slice(-12, -10) + 't'
	}
	// Если число >= 1 billion
	if (numberLength > 9) {
		return Number(num).toFixed(0).slice(0, -9) + '.' + Number(num).toFixed(0).slice(-9, -7) + 'b'
	}
	// Если число >= 1 million
	if (numberLength > 6) {
		return Number(num).toFixed(0).slice(0, -6) + '.' + Number(num).toFixed(0).slice(-6, -4) + 'm'
	}
	// Если 1 < number < 1 million
	return Number(num).toFixed(2);

}

export const maxValue = (arr: ICoinPriceHistory[]): string => {

	const max = arr.reduce((acc, value) => acc > value.price ? acc : value.price , arr[0].price);

	return '$' + numConverter(max);

}

export const minValue = (arr: ICoinPriceHistory[]): string => {

	const min = arr.reduce((acc, value) => acc < value.price ? acc : value.price , arr[0].price);

	return '$' + numConverter(min);

}

export const avgValue = (arr: ICoinPriceHistory[]): string => {


	const sum = arr.reduce((acc, value) => acc + value.price, 0);

	return '$' + numConverter(sum / arr.length);

}