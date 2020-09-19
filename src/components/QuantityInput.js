import React from 'react';

const QuantityInput = props => {
	let { productQuantity, setQuantity } = props;

	const inputSize = props.small ? 'input input--small' : 'input';
	const labelSize = props.small
		? 'paragraph input__container-paragraph-small'
		: 'paragraph';

	const inputContainer = props.small
		? 'input__container input__container--small'
		: 'input__container';

	const inputContainerBig = props.big ? 'input__container--big' : '';

	const inputContainerFinal = [
		...inputContainer.split(' '),
		inputContainerBig,
	].join(' ');

	const addToQuantity = () => {
		setQuantity(++productQuantity);
	};

	const subtractFromQuantity = () => {
		if (productQuantity > 1) setQuantity(--productQuantity);
	};

	const addFromTextInput = event => {
		validateNumber(event.target.value) &&
			setQuantity(Math.floor(event.target.value) * 1);
	};

	const validateNumber = number => {
		if (number.trim() === '') return true;

		if (isNaN(number)) return false;

		if (number.trim() <= 0) return false;

		return true;
	};

	return (
		<div className={inputContainerFinal}>
			<p className={labelSize}>Quantity:</p>

			<div className='input__quantity-buttons'>
				<button
					className={`button ${inputSize} input__quantity input__quantity--left`}
					onClick={subtractFromQuantity}>
					<p className='paragraph'>-</p>
				</button>
				<input
					className={`${inputSize} input__quantity`}
					type='text'
					onChange={addFromTextInput}
					value={productQuantity}
				/>
				<button
					className={`button ${inputSize} input__quantity input__quantity--right`}
					onClick={addToQuantity}>
					<p className='paragraph'>+</p>
				</button>
			</div>
		</div>
	);
};

export default QuantityInput;
