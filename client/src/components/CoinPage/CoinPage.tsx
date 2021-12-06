import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { CryptsContext } from '../../App';
import './CoinPage.scss';
import CoinPageChart from './CoinPageChart';
import CoinPageHeader from './CoinPageHeader';
import CoinPageTable from './CoinPageTable/CoinPageTable';

const CoinPage: React.FC = () => {

	const { id } = useParams()

	const cryptList = useContext(CryptsContext)
	const crypt = cryptList.find(item => item.name.toLocaleLowerCase() === id)!


	return (
		<section className="coin">
			
			<CoinPageHeader 
				crypt={crypt}
			/>

			<CoinPageChart 
				crypt={crypt}
			/>

			<CoinPageTable
				crypt={crypt}
			/>

		</section>
	)
}

export default CoinPage;