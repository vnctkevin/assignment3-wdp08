import { getCountries, getHistoryCountry } from "./api.js";
import { format_date, formatRibuan, loader } from "./utils.js";

const loading = document.getElementById('loader')
loading.innerHTML = loader();
const date = new Date();
const today = document.getElementById('today')
today.innerHTML = format_date(date)

const countries = await getCountries();
const dataCountries = countries.response;
const selectCountries = document.getElementById('countries');
const country = document.getElementById('country')

// number total
const activecase = document.getElementById('active-case');
const newcase = document.getElementById('new-case');
const recoveredcase = document.getElementById('recovered-case');
const totalcases = document.getElementById('total-cases');
const totaldeaths =document.getElementById('total-deaths');
const totaltests = document.getElementById('total-tests');
const populasi = document.getElementById('populasi');


loading.innerHTML = '';
dataCountries.forEach(element => {
    selectCountries.innerHTML += `
        <option value="${element}">${element}</option>
    `
});



const searchRequest = document.getElementById('search-request');
searchRequest.addEventListener('submit', async function(e){
    e.preventDefault()

    activecase.innerHTML = 'Loading...';
    newcase.innerHTML = 'Loading...';
    recoveredcase.innerHTML = 'Loading...';
    totalcases.innerHTML = 'Loading...';
    totaldeaths.innerHTML = 'Loading...';
    totaltests.innerHTML = 'Loading...';
    populasi.innerHTML = 'Loading...'

    const countryselect = selectCountries.value
    country.innerHTML = `- ${countryselect}`
    const today = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
    const result = await getHistoryCountry(countryselect, today);
    
    const history_country = result.response[0];
    const caseCountry = history_country.cases;
    const deathsCountry = history_country.deaths;
    const testsCountry = history_country.tests;

    activecase.innerHTML = (caseCountry.active) ? formatRibuan(caseCountry.active.toString()) : 0;
    newcase.innerHTML = (caseCountry.new) ? caseCountry.new : 0;
    recoveredcase.innerHTML = (caseCountry.recovered) ? formatRibuan(caseCountry.recovered.toString()): 0;
    totalcases.innerHTML = (caseCountry.total) ? formatRibuan(caseCountry.total.toString()) : 0;
    totaldeaths.innerHTML = `${(deathsCountry.total) ? formatRibuan(deathsCountry.total.toString()) : 0} (${(deathsCountry.new)? deathsCountry.new : 0})`;
    totaltests.innerHTML = (testsCountry.total) ? formatRibuan(testsCountry.total.toString()) : 0;
    populasi.innerHTML = (history_country.population) ? formatRibuan(history_country.population.toString()) : 0;
    
})