import React from 'react';
import { ICrypt } from '../../types/types';
import { numConverter } from '../../utils/numConverter';
import './CoinPage.scss'

interface CoinPageHeaderProps {
	crypt: ICrypt
}

const CoinPageHeader: React.FC<CoinPageHeaderProps> = ({ crypt }) => {
	return crypt ?
		(
			<div className="coin-header">

				<div className="coin-header-base-wrapper">
					<img className="coin-header-base-icon" src={crypt.icon} alt="" />
					<div className="coin-header-base">
						<p className="coin-header-base-name">
							{crypt.name}&nbsp;({crypt.symbol})
						</p>
						<p className="coin-header-base-price">
							${numConverter(crypt.priceUsd)}&nbsp;
							<span className={`${   // Цвет текста в зависимости от значения
									Number(crypt.changePercent24Hr) > 0 ? 'coin-green-text' : 
									Number(crypt.changePercent24Hr) < 0 ? 'coin-red-text' :
									null
								}`}
							>
								{Number(crypt.changePercent24Hr).toFixed(2)}%
								{  						// Значок в зависимости от значения
									Number(crypt.changePercent24Hr) > 0 ? <i className="material-icons coinpage-icon">arrow_drop_up</i> :
									Number(crypt.changePercent24Hr) < 0 ? <i className="material-icons coinpage-icon">arrow_drop_down</i> :
									null
								}
							</span>
						</p>
					</div>
				</div>

				<div className="coin-header-block">
					<p className="coin-header-block-title">
						Market cap
					</p>
					<p className="coin-header-block-value">
						{numConverter(crypt.marketCapUsd)}
					</p>
				</div>

				<div className="coin-header-block">
					<p className="coin-header-block-title">
						Supply
					</p>
					<p className="coin-header-block-value">
						{numConverter(crypt.supply)}
					</p>
				</div>

				<div className="coin-header-block">
					<p className="coin-header-block-title">
						Volume (24h)
					</p>
					<p className="coin-header-block-value">
						{numConverter(crypt.volumeUsd24Hr)}
					</p>
				</div>

			</div>
		)
		:
		(
			null
		)
}

export default CoinPageHeader