import React from 'react';
import { Link } from 'react-router-dom';

const OrderCard = props => {
	const { order } = props;

	return (
		<div className='order'>
			<div className='order__header'>
				<h3 className='heading-tertiary heading-tertiary--dark'>
					Order {order.name}
				</h3>
				<span>
					<p className='paragraph paragraph--black order__status order__status--pending'>
						Pending
					</p>
				</span>
			</div>
			<p className='paragraph paragraph--black'>
				Placed on{' '}
				{new Date(order.processedAt).toLocaleDateString('en', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}{' '}
				at {new Date(order.processedAt).toLocaleTimeString('en')}
			</p>
			<div className='order__content'>
				<div>
					{order.lineItems.map(lineItem => (
						<div
							key={lineItem.variant.product.handle}
							className='order__table-row'>
							<div className='order__table-data'>
								<h4 className='heading-fourtiary heading-fourtiary--dark'>
									Product
								</h4>
								<Link
									className='card__link order__link'
									to={`/product/${lineItem.variant.product.handle}`}>
									{/* <div className='card__image-box '>
										<img
											className='card__image'
											src={
												lineItem.variant.image
													.originalSrc
											}
											alt={
												lineItem.variant.image.altText
													? lineItem.variant.image
															.altText
													: lineItem.title
											}
										/>
									</div> */}
									<p className='paragraph paragraph--black order__product-title'>
										{lineItem.title}
									</p>
								</Link>
							</div>
							<div className='order__table-data'>
								<h4 className='heading-fourtiary heading-fourtiary--dark'>
									SKU
								</h4>
								<p className='paragraph paragraph--black'>
									{lineItem.variant.sku}
								</p>
							</div>
							<div className='order__table-data'>
								<h4 className='heading-fourtiary heading-fourtiary--dark'>
									Price
								</h4>
								<p className='paragraph paragraph--black'>
									{lineItem.variant.priceV2.currencyCode}${' '}
									{lineItem.variant.priceV2.amount}
								</p>
							</div>
							<div className='order__table-data'>
								<h4 className='heading-fourtiary heading-fourtiary--dark'>
									Quantity
								</h4>
								<p className='paragraph paragraph--black'>
									{lineItem.quantity}
								</p>
							</div>
							<div className='order__table-data'>
								<h4 className='heading-fourtiary heading-fourtiary--dark'>
									Total
								</h4>
								<p className='paragraph paragraph--black'>
									{lineItem.variant.priceV2.currencyCode}${' '}
									{(
										lineItem.variant.priceV2.amount *
										lineItem.quantity
									).toFixed(2)}
								</p>
							</div>
							<span className='navbar-line order__line'></span>
						</div>
					))}
				</div>
				<div className='order__table-foot'>
					<div className='order__table-data'>
						<h4 className='heading-fourtiary heading-fourtiary--dark'>
							Subtotal
						</h4>
						<p className='paragraph paragraph--black'>
							{order.subtotalPriceV2.currencyCode}${' '}
							{order.subtotalPriceV2.amount}
						</p>
					</div>
					<div className='order__table-data'>
						<h4 className='heading-fourtiary heading-fourtiary--dark'>
							Shipping
						</h4>
						<p className='paragraph paragraph--black'>
							{order.totalShippingPriceV2.currencyCode}${' '}
							{order.totalShippingPriceV2.amount}
						</p>
					</div>
					<div className='order__table-data'>
						<h4 className='heading-fourtiary heading-fourtiary--dark'>
							Total
						</h4>
						<p className='paragraph paragraph--black'>
							{order.totalPriceV2.currencyCode}${' '}
							{order.totalPriceV2.amount}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderCard;
