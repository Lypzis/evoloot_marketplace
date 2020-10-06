import React, { memo } from 'react';

import Layout from '../../hoc/Layout';

const Refunds = props => {
	return (
		<Layout>
			<div className='home__featured-section'>
				<h2 className='heading-secondary heading-secondary--dark'>
					Refunds
				</h2>

				<div className='home__featured'>
					<p className='paragraph paragraph--black'>
						Returns Our policy lasts 14 days from the time of
						delivery. If 14 days have gone by since your purchase,
						unfortunately we can’t offer you a refund or exchange.
						To be eligible for a return, your item must be unused
						and in the same condition that you received it. It must
						also be in the original packaging. Gift Cards are
						non-refundable. Sorry for the inconvenience. To complete
						your return, we require a receipt or proof of purchase.
						Please do not send your purchase back to the
						manufacturer. Once your return is received and
						inspected, we will send you an email to notify you that
						we have received your returned item. We will also notify
						you of the approval or rejection of your refund. If you
						are approved, then your refund will be processed, and a
						credit will automatically be applied to your credit card
						or original method of payment, within a certain amount
						of days. Late or missing refunds (if applicable) If you
						haven’t received a refund yet, first check your bank
						account again. Then contact your credit card company, it
						may take some time before your refund is officially
						posted. Next contact your bank. There is often some
						processing time before a refund is posted. If you’ve
						done all of this and you still have not received your
						refund yet, please contact us at store@evoloot.com. Sale
						items (if applicable) Only regular priced items may be
						refunded, unfortunately sale items cannot be refunded.
						Exchanges (if applicable) We only replace items if they
						are defective or damaged. If you need to exchange it for
						the same item, send us an email at store@evoloot.com.
						Gifts If the item was marked as a gift when purchased
						and shipped directly to you, you’ll receive a gift
						credit for the value of your return. Once the returned
						item is received, a gift certificate will be mailed to
						you. If the item wasn’t marked as a gift when purchased,
						or the gift giver had the order shipped to themselves to
						give to you later, we will send a refund to the gift
						giver and he will find out about your return. Shipping
						To return your product, you should mail your product to:
						PO Box 49023 7740-18 St SE, Calgary, AB, T2C3W5, Canada
						You will be responsible for paying for your own shipping
						costs for returning your item. Shipping costs are
						non-refundable. If you receive a refund for a damaged or
						defective product, the cost of return shipping will be
						added to your refund. In the case of an approved
						exchange, you are responsible for all shipping expenses.
						Depending on where you live, the time it may take for
						your exchanged product to reach you, may vary. If you
						are shipping an item over $75, you should consider using
						a trackable shipping service or purchasing shipping
						insurance. We don’t guarantee untracked items.
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default memo(Refunds);
