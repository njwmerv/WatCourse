import {UW_API_KEY, UW_API_URL} from './constants.js';

export function queryCourses(termCode){
	fetch(`${UW_API_URL}Courses/${termCode}/006878`,{headers:
			{'x-api-key': UW_API_KEY}})
		.then((response) => JSON.stringify((response.json())))
		.catch(error => console.error('Error:', error));
}