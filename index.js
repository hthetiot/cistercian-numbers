// https://www.dcode.fr/cistercian-numbers

const xmlns = "http://www.w3.org/2000/svg";
const createElementNS = document.createElementNS.bind(document);

const numbersToCoordonates = [
	// 0
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	// 1
	[
		[.5, 0, .75, 0],
		[.5, 0, .25, 0],
		[.5, 1, .75, 1],
		[.5, 1, .25, 1],
	],
	// 2
	[
		[.5, .33, .75, .33],
		[.5, .33, .25, .33],
		[.5, .66, .75, .66],
		[.5, .66, .25, .66],
	],
	// 3
	[
		[.5, 0, .75, .33],
		[.5, 0, .25, .33],
		[.5, 1, .25, .66],
		[.5, 1, .75, .66],
	],
	// 4
	[
		[.5, .33, .75, 0],
		[.5, .33, .25, 0],
		[.5, .66, .25, 1],
		[.5, .66, .75, 1],
	],
	// 5
	[
		[.5, 0, .75, 0, .5, .33],
		[.5, 0, .25, 0, .5, .33],
		[.5, 1, .75, 1, .5, .66],
		[.5, 1, .25, 1, .5, .66],
	],
	// 6
	[
		[1, 0, 1, .33],
		[0, 0, 0, .33],
		[0, 1, 0, .66],
		[1, 1, 1, .66],
	],
	// 7
	[
		[.5, 0, .75, 0, .75, .33],
		[.5, 0, .25, 0, .25, .33],
		[.5, 1, .75, 1, .75, .66],
		[.5, 1, .25, 1, .25, .66],
	],
	// 8
	[
		[.5, .33, .75, .33, .75, 0],
		[.5, .33, .25, .33, .25, 0],
		[.5, .66, .75, .66, .75, 1],
		[.5, .66, .25, .66, .25, 1],
	],
	// 9
	[
		[.5, .33, .75, .33, .75, 0, .5, 0],
		[.5, .33, .25, .33, .25, 0, .5, 0],
		[.5, .66, .75, .66, .75, 1, .5, 1],
		[.5, .66, .25, .66, .25, 1, .5, 1],
	],
];


function renderNumber(number, el) {

	const fontSize = parseFloat(window.getComputedStyle(el, null).getPropertyValue('font-size'), 10);
	const fontColor = window.getComputedStyle(el, null).getPropertyValue('color');
	const style = `stroke:${fontColor};stroke-width:2;fill:transparent;`;

	const config = {
		size: fontSize,
		color: fontColor,
		style: style
	};

	let svgEl = createElementNS(xmlns, 'svg');
	svgEl.setAttributeNS(null, 'height', config.size);
	svgEl.setAttributeNS(null, 'width', config.size);
	svgEl.setAttributeNS(null, 'preserveAspectRatio', 'xMinYMin');
	svgEl.setAttributeNS(null, 'viewBox', "0 0 100 100");


	let zeroEl = createElementNS(xmlns, 'line');
	zeroEl.setAttribute('x1', config.size / 2);
	zeroEl.setAttribute('y1', 0);
	zeroEl.setAttribute('x2', config.size / 2);
	zeroEl.setAttribute('y2', config.size);
	zeroEl.setAttribute('style', config.style);
	svgEl.appendChild(zeroEl);

	String(number).split('').reverse().forEach(function (digit, position) {
		renderDigit(digit, position, svgEl, config);
	});

	el.appendChild(svgEl);
}

function renderDigit(digit, position, svgEl, config) {

	let coordonates = numbersToCoordonates[digit][position];
	let numberEl = createElementNS(xmlns, 'path');

	coordonates = coordonates.map(function (i) { return i * config.size;  });
	coordonates.unshift('m');
	coordonates.splice(3, 0, 'L');

	numberEl.setAttribute('d', coordonates.join(' '));
	numberEl.setAttribute('style', config.style.replace('rgb(255, 0, 0)', 'blue'));
	svgEl.appendChild(numberEl);
}

var container = document.getElementById("container");
renderNumber("9875", container);

class cistercianNumber extends HTMLElement {
	constructor() {
		super();
		var number = this.innerText;
		this.innerText = '';
		return renderNumber(number, this);
	}
};

window.customElements.define('cistercian-number', cistercianNumber);

