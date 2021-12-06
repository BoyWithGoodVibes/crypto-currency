import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavSearchList from './NavSearchList';
import { CSSTransition } from 'react-transition-group'
import './Nav.scss';
import '../../App.scss';


const Nav: React.FC = () => {

	const [isSearchClose, setIsSearchClose] = useState<boolean>(true)
	const [inputValue, setInputValue] = useState<string>('')


	const toCloseSearch = (e: any): void => {
		// Если клик был на любой элемент приложения кроме иконки поиска, кнопки в которой она находится и инпута, при учете того, что инпут отрисован
		if (!isSearchClose && !e.target.classList.contains('navigation-list-item-icon') && !e.target.classList.contains('navigation-list-item-input') && !e.target.classList.contains('navigation-list-item-button')) {
			setIsSearchClose(true)
			setInputValue('')
		}
	}


	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setInputValue(e.target.value)
	}


	useEffect(() => {

		document.addEventListener('click', toCloseSearch)

		return () => {
			document.removeEventListener('click', toCloseSearch)
		}

	}, [toCloseSearch])

	return (
		<nav className="navigation app">
			<ul className="navigation-list">
				<li className="navigation-list-item">
					<NavLink
						className="navigation-list-item-link"
						to="/"
					>
						<i className="material-icons navigation-list-item-icon">
							home
						</i>
					</NavLink>
				</li>
				<li className="navigation-list-item">
					<div className="navigation-list-item-input-wrapper">
						<CSSTransition		    								// Анимация отрисовки / удаления инпута
							in={!isSearchClose}
							timeout={300}
							unmountOnExit
							mountOnEnter
							classNames="input-animation"
						>
							<input
								className="navigation-list-item-input"
								type="text"
								autoFocus={true}
								onChange={onChangeHandler}
								value={inputValue}
							/>
						</CSSTransition>
						<button
							className="navigation-list-item-button"
							onClick={() => setIsSearchClose(!isSearchClose)}
						>
							<i className="material-icons navigation-list-item-icon">
								search
							</i>
						</button>
					</div>
				</li>
			</ul>

			{
				isSearchClose ?
					null
					:
					<NavSearchList
						inputValue={inputValue}
					/>
			}


		</nav>
	)
}

export default Nav;