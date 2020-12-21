import React, {
	memo,
	useContext,
	useEffect,
	useCallback,
	useState,
} from 'react';

import Layout from '../hoc/Layout';
import { ClientContext } from '../context/clientContext';
import Collection from '../components/Collection';
import LoadingBar from '../components/LoadingBar';
import BannerCarousel from '../components/BannerCarousel';

const Home = props => {
	const [homeCollections, setHomeCollections] = useState();
	const [loading, setLoading] = useState(true);
	const clientContext = useContext(ClientContext);
	const { collections } = clientContext;

	const getFeaturedProducts = useCallback(() => {
		if (collections) {
			setHomeCollections([...collections]);
			setLoading(false);
		}
	}, [collections]);

	useEffect(() => {
		getFeaturedProducts();
	}, [getFeaturedProducts]);

	const renderHomeCollections = useCallback(() => {
		return homeCollections.map(collection => (
			<Collection
				key={collection.id}
				collection={collection}
				featured={true}
			/>
		));
	}, [homeCollections]);

	return (
		<Layout>
			{homeCollections ? (
				<section className='home'>
					{<BannerCarousel />}
					{renderHomeCollections()}
				</section>
			) : (
				<LoadingBar loading={loading} marginTop={'18rem'} />
			)}
		</Layout>
	);
};

export default memo(Home);
