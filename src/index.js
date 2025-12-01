// Imports dataset and stylesheet.

import './styles/index.scss';
import cars from './car-dataset.json'; 

// Grabs DOM elements
const yearSelect = document.getElementById('year');
const makeSelect = document.getElementById('make');
const modelSelect = document.getElementById('model');

// --- Helper Functions ---

// Capitalize with specific overrides for bad data from the JSON dataset
const capitalize = (str) => {
  if (!str) return '';
  
  // 1. Handle specific misspellings or acronyms
  const lower = str.toString().toLowerCase();
  if (lower === 'hyundi') return 'Hyundai';
  if (lower === 'bmw') return 'BMW';
  if (lower === 'vw') return 'Volkswagen'; 
  if (lower === 'mercedes-benz') return 'Mercedes-Benz';
  
  // Capitalizes the first letter
  return str.toString().charAt(0).toUpperCase() + str.toString().slice(1);
};

// Sets up initial Years
const init = () => {
  // Gets all years, removes duplicates, and sorts newest to oldest
  const years = [...new Set(cars.map(car => car.year))].sort((a, b) => b - a);
  
  years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });
};

// --- Event Listeners ---

// Handles Year Selection -> Populates MAKES
yearSelect.addEventListener('change', (e) => {
  const selectedYear = parseInt(e.target.value);

  // Resets Make and Model
  makeSelect.innerHTML = '<option value="">Make</option>';
  modelSelect.innerHTML = '<option value="">Model</option>';
  modelSelect.disabled = true;

  if (selectedYear) {
    makeSelect.disabled = false;
    
    // Filters cars by Year
    const availableMakes = cars
      .filter(car => car.year === selectedYear)
      .map(car => car.Manufacturer);

    // Removes duplicates
    const uniqueMakes = [...new Set(availableMakes)].sort();

    uniqueMakes.forEach(make => {
      const option = document.createElement('option');
      option.value = make;
      option.textContent = capitalize(make);
      makeSelect.appendChild(option);
    });
  } else {
    makeSelect.disabled = true;
  }
});

// Handles Make Selection -> Populates MODELS
makeSelect.addEventListener('change', (e) => {
  const selectedYear = parseInt(yearSelect.value);
  const selectedMake = e.target.value;

  // Resets Model
  modelSelect.innerHTML = '<option value="">Model</option>';

  if (selectedMake) {
    modelSelect.disabled = false;

    // Filters cars by Year AND Make
    const availableModels = cars
      .filter(car => car.year === selectedYear && car.Manufacturer === selectedMake)
      .map(car => car.model);

    // Removes duplicates
    const uniqueModels = [...new Set(availableModels)].sort();

    uniqueModels.forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = capitalize(model); 
      modelSelect.appendChild(option);
    });
  } else {
    modelSelect.disabled = true;
  }
});

// Handles Model Selection
modelSelect.addEventListener('change', (e) => {
  const year = parseInt(yearSelect.value);
  const make = makeSelect.value;
  const model = e.target.value;

  if (year && make && model) {
    const result = cars.find(car => 
      car.year === year && 
      car.Manufacturer === make && 
      car.model === model
    );
    
    console.log('--- Car Details Found ---');
    console.log(result);
  }
});

// Starts the app
init();