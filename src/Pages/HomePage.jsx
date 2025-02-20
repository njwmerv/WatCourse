import Select from 'react-select';
import {useState} from 'react';
import {testQuery} from '../Utility/helpers.js';
import {TERM_OPTIONS} from '../Utility/constants.js';

export default function HomePage(){

	// Instance Variables

	const [term, setTerm] = useState(TERM_OPTIONS[0]);

	// Methods

	const updateTerm = (selectedTerm) => {
		if(!selectedTerm || !selectedTerm.value || term.value === selectedTerm.value) return null;
		setTerm(selectedTerm);
		// RESET COURSE SELECTIONS
	}

	// Render

	return (
		<div>
			<div className="left">

			</div>

			<div className="right">
				<Select name="term-select"
				        value={term}
				        options={TERM_OPTIONS}
				        onChange={updateTerm}
				        className="term-select"
				/>
			</div>
		</div>
	);
}