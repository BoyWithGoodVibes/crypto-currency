export interface ICrypt {
	id: string;
	rank: string;
	symbol: string;
	name: string;
	supply: string;
	marketCapUsd: string;
	volumeUsd24Hr: string;
	priceUsd: string;
	changePercent24Hr: string;
	vwap24Hr: string;
	icon: string;
}

export interface ICryptoListSort {
	key: keyof ICrypt;
	isDescending: boolean
}

export interface ICoinPriceHistory {
	date: number;
	price: number;
}

export interface IMarket {
	exchangeId: string
	baseSymbol: string
	quoteSymbol: string
	volumeUsd24Hr: string
	priceUsd: string
	volumePercent: string
}

export interface IMarketListSort {
	key: keyof IMarket
	isDescending: boolean
}


