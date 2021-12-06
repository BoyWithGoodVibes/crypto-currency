import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CryptsContext } from '../../App';
import './Nav.scss';

interface NavSearchListProps {
	inputValue: string
}

const NavSearchList: React.FC<NavSearchListProps> = ({ inputValue }) => {

	const crypts = useContext(CryptsContext)

	return inputValue ?
	(
			<div className="navigation-search-list">
				{
						(
							crypts       								// Поиск по названию валюты или его символу
								.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()) || item.symbol.toLowerCase().includes(inputValue.toLowerCase()))
								.map(item => {
									return (
										<Link
											to={'/assets/' + item.name.toLowerCase()}
											className="navigation-search-list-item"
											key={item.rank}
										>
											<img className="navigation-search-list-item-icon" src={item.icon} alt="" />
											<div className="navigation-search-list-item-title-wrapper">
												<p className="navigation-search-list-item-name">
													{item.name}
												</p>
												<p className="navigation-search-list-item-symbol">
													{item.symbol}
												</p>
											</div>
										</Link>
									)
								})
						)
				}
			</div>
	)
	:
	(
		null
	)
}

export default NavSearchList