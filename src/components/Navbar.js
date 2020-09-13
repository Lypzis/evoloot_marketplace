import React, {
	Fragment,
	memo,
	useContext,
	useEffect,
	useCallback,
	useState,
} from 'react';
import { NavLink } from 'react-router-dom';

import { ClientContext } from '../context/clientContext';

const Navbar = props => {
	const [navTitles, setNavTitles] = useState([]);
	const clientContext = useContext(ClientContext);
	const { collections } = clientContext;

	const getCollections = useCallback(async () => {
		if (collections) {
			const navTitles = collections
				.map(col => {
					return { title: col.title, handle: col.handle };
				})
				.reverse();

			setNavTitles(navTitles);
		}
	}, [collections]);

	useEffect(() => {
		getCollections();
	}, [clientContext, getCollections]);

	return (
		<Fragment>
			<span className='navbar-line'></span>
			{navTitles.length > 0 && (
				<nav className='navbar'>
					<ul className='navbar__list'>
						{navTitles.map((navTitle, index) => (
							<li className='navbar__list-item' key={index}>
								<NavLink
									to={`/collection/${navTitle.handle}`}
									className='paragraph navbar__link'
									activeClassName='navbar__link--active'>
									{navTitle.title}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			)}
		</Fragment>
	);
};

export default memo(Navbar);
