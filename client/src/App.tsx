import React, { createContext, useEffect, useState } from 'react';
import Nav from './components/Nav/Nav';
import axios from 'axios';
import { ICrypt } from './types/types';
import Loader from './components/UI/Loader';
import AppRoutes from './components/AppRoutes';
import './App.scss';
// @ts-ignore
import ReactNotification from 'react-notifications-component'
// @ts-ignore
import { store } from 'react-notifications-component';
import {notificationConfig} from './utils/notificationConfig'
import 'react-notifications-component/dist/theme.css'




export const CryptsContext = createContext<ICrypt[]>([])


const App: React.FC = () => {

	const [crypts, setCrypts] = useState<ICrypt[]>([]);

	useEffect(() => {
		fetchCrypts();
	}, [])

	const fetchCrypts = () => {

		axios.get<ICrypt[]>('/api/assets/', {
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		})
			.then(response => setCrypts(response.data))
			.catch(e => store.addNotification({
				...notificationConfig,
				message: e.response?.data?.message,
			}))

	}


	return crypts && crypts.length ?
		(
			<CryptsContext.Provider
				value={crypts}
			>
				<ReactNotification isMobile={true} />

				<Nav />

				<AppRoutes />


			</CryptsContext.Provider>
		)
		:
		(
			<Loader 
				position={'fixed'}
			/>
		)
}

export default App;
