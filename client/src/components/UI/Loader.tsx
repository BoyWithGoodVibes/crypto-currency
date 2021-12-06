import React from 'react';
import './Loader.scss';

interface LoaderProps {
	position: 'fixed' | 'absolute'
}

const Loader: React.FC<LoaderProps> = ({ position }) => {
	return (
		<div className="loader-wrapper" style={{ position: `${position}` }}>
			<div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
		</div>
	)
}

export default Loader;