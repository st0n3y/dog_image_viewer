const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
	return fetch(url)
			.then(checkStatus)
		   	.then(res => res.json())
			.catch(err => console.error("Looks like there was a problem!", err));
}

Promise.all([
	fetchData('https://dog.ceo/api/breeds/list'),
	fetchData('https://dog.ceo/api/breeds/image/random')
])
.then(data => {
	const breedList = data[0].message;
	const randomImage = data[1].message;

	generateOptions(breedList);
	generateImage(randomImage);
});

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function generateOptions(data) {
	const options = data.map(item => `
		<option value='${item}'>${item}</option>
	`).join('');

	select.innerHTML = options;
}

function generateImage(data) {
	const html = `
		<img src='${data}' alt />
		<p>Click to view images of ${select.value.replace(/^\w/, c => c.toUpperCase())}s</p>
	`;

	card.innerHTML = html;
}

function fetchBreedImage() {
	const breed = select.value;
	const img = card.querySelector('img');
	const p = card.querySelector('p');

	fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
		.then(data => {
			img.src = data.message;
			img.alt = breed;
			p.textContent = `Click to view more ${breed.replace(/^\w/, c => c.toUpperCase())}s`
		});
}

function checkStatus(response) {
	if(response.ok) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);


// ------------------------------------------
//  POST DATA
// ------------------------------------------

