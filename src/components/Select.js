import React, { useState, useEffect, useCallback } from 'react';

const Select = props => {
	const [showList, toggleShowList] = useState(false);

	const [selected, setSelected] = useState(
		<span role='img' aria-label={'flag'}>
			&#127482;&#127480; USD
		</span>
	);

	const onButtonClick = () => {
		toggleShowList(prevState => !prevState);
	};

	const changeSelection = useCallback(identifier => {
		switch (identifier) {
			case 'USD':
				setSelected(
					<span role='img' aria-label={'flag'}>
						&#127482;&#127480; USD
					</span>
				);
				break;
			case 'CAD':
				setSelected(
					<span role='img' aria-label={'Canadian flag'}>
						&#127464;&#127462; CAD
					</span>
				);
				break;
			case 'EUR':
				setSelected(
					<span role='img' aria-label={'EU flag'}>
						&#127466;&#127482; EUR
					</span>
				);
				break;
			case 'GBP':
				setSelected(
					<span role='img' aria-label={'UK flag'}>
						&#127468;&#127463; GBP
					</span>
				);
				break;
			default:
				break;
		}
	}, []);

	useEffect(() => {
		changeSelection(props.currentOption);
	}, [changeSelection, props.currentOption]);

	return (
		<div className='input__select-header-container'>
			<input
				checked={showList}
				readOnly
				type='checkbox'
				className='input__select-checkbox'
				id='select-toggle'
			/>
			<label
				htmlFor='select-toggle'
				className='input input--black input__select input__select--header'
				onClick={onButtonClick}>
				{selected}
			</label>
			<ul className='input__selection-list'>
				<li
					className='paragraph input__selection-list-item'
					onClick={() => {
						onButtonClick();
						changeSelection('USD');
						props.onOptionClick('USD');
					}}>
					<span role='img' aria-label={'USA flag'}>
						&#127482;&#127480; USD
					</span>
				</li>
				<li
					className='paragraph input__selection-list-item'
					onClick={() => {
						onButtonClick();
						changeSelection('CAD');
						props.onOptionClick('CAD');
					}}>
					<span role='img' aria-label={'Canadian flag'}>
						&#127464;&#127462; CAD
					</span>
				</li>
				<li
					className='paragraph input__selection-list-item'
					onClick={() => {
						onButtonClick();
						changeSelection('EUR');
						props.onOptionClick('EUR');
					}}>
					<span role='img' aria-label={'EU flag'}>
						&#127466;&#127482; EUR
					</span>
				</li>
				<li
					className='paragraph input__selection-list-item'
					onClick={() => {
						onButtonClick();
						changeSelection('GBP');
						props.onOptionClick('GBP');
					}}>
					<span role='img' aria-label={'UK flag'}>
						&#127468;&#127463; GBP
					</span>
				</li>
			</ul>
		</div>
	);
};

export default Select;
