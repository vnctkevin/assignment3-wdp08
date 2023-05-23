const base_url = 'https://covid-193.p.rapidapi.com';
const config = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c2186f1a43mshae85dd0ac049cdfp18a3a0jsn9ae3c85a850f',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
	}
};

async function getCountries(){
    const response = await fetch(`${base_url}/countries/`, config);
    const data = await response.json();
    return data;
}

async function getHistoryCountry(country, date){
    const response = await fetch(`${base_url}/history?country=${country}&day=${date}`, config);
    const data = await response.json();
    return data;
}

export { getCountries, getHistoryCountry };