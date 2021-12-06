import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CoinPage from './CoinPage/CoinPage';
import CryptoList from './CryptoList/CryptoList';
import '../App.scss'

const AppRoutes: React.FC = () => {
	return (
		<main className="app main-wrapper">
			<Routes>
				<Route path="/" element={<CryptoList />} />
				<Route path="/assets/:id" element={<CoinPage />} />
			</Routes>
		</main>
	)
}

export default AppRoutes;