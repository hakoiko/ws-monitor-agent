import _ from 'lodash';

function component () {
	const john = 'John';
	var element = document.createElement('div');
	
	/* lodash is required for the next line to work */
	element.innerHTML = _.join(['Hello','webpack', john], ' ');
	
	return element;
}
document.body.appendChild(component());