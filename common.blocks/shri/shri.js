/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */
var requests = ['/countries', '/cities', '/populations'],
	responses = {},
	successfulRequests= [], //Merge assignments into one var declaration and put it at the start of the scope
	i, j, url;

/**
 * Return array of item names by url.
 * @example
 * getItems('/countries', ['Africa', 'Oceania', 'North America', 'Asia', 'Europe']);
 * @param {string} url One of '/countries', '/cities', '/populations'.
 * @param {array} [parents] Array of items' parent names.
 * @returns {array} Array of items names.
 */
function getItems(url, parents) {
	var allItems = responses[url],
		filteredNames = allItems.map(function (item) { return item.name; }),//Get array all items name by url.
		selectedNames,
		maps = {
			'/countries': {
				parentKey: 'continent',
				msg: 'Выберите из списка одну или несколько стран через \',\' или оставьте поле пустым: ',
				placeholder: ''
			},
			'/cities': {
				parentKey: 'country',
				msg: 'Выберите из списка один или несколько городов через \',\' или оставьте поле пустым: ',
				placeholder: ''
			}
		};
	/**
	 * Ask a user to enter one, several or no items names to accept full list.
	 * @returns {array} Array of items names.
	 */
	function askUser() {
		selectedNames = window.prompt(
			maps[url].msg +	filteredNames.join(', '), maps[url].placeholder);
		if (!selectedNames) { return filteredNames; }
		selectedNames = selectedNames.trim().replace(/\s*\,\s*/g, ',').split(',');
		return selectedNames;
	}

	if (!parents) { return askUser(); }

	//If array of parent names is provided, than filter items names available for a user.
	filteredNames = [];
	for (i = 0; i < allItems.length; i++) {
		for (j = 0; j < parents.length; j++) {
			if (allItems[i][maps[url].parentKey] === parents[j]) {
				filteredNames.push(allItems[i].name);
			}
		}
	}

	return askUser();
}

/**
 * Ask a user to provide countries and/or cities names and return overall population for selected cities.
 * @returns {number}
 */
function getPopulations() /**Number*/ {
	if (successfulRequests.length < 3) {
		return console.warn("Not enough data to perform calculations. Some api requests failed. Responses: ", responses);
	}
	var continents = ['Africa', 'Oceania', 'North America', 'Asia', 'Europe'],
		countries = getItems('/countries', continents),
		cities = getItems('/cities', countries),
		key = '/populations',
		population = 0;

	for (i = 0; i < responses[key].length; i++) {
		for (j = 0; j < cities.length; j++) {
			if (responses[key][i].name === cities[j]) {
				population += responses[key][i].count;
			}
		}
	}

	console.log('Население в выбранных городах (%s): ', cities.join(), population);

	return population;
}

/**
 * Wrap request logic into function 'request' to create closure to have separate scope for each request.
 * It helps us to save urls between requests.
 *
 * Request data by url and save to responses variable.
 * @param {string} url One of '/countries', '/cities', '/populations'.
 */
function request (url) {

	var callback = function (error, result) {
		if (error) {
			return console.error("Error occurred when requesting for %s:", url, error);
		}

		responses[url] = result;
		successfulRequests.push(url);

		//Uncomment next line if you want to try to count populations after each performed request.
		//getPopulations();
	};

	getData(url, callback);
}

for (i = 0; i < 3; i++) {
  url = requests[i];
  request(url);
}