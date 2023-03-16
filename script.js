// Get references to the DOM elements
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const heroStats = document.querySelector('#hero-stats');
const heroName = document.querySelector('#hero-name');
const heroImage = document.querySelector('#hero-image');
const intelligence = document.querySelector('#intelligence');
const strength = document.querySelector('#strength');
const speed = document.querySelector('#speed');
const durability = document.querySelector('#durability');
const power = document.querySelector('#power');
const combat = document.querySelector('#combat');

// Define API endpoint URL and API key
const apiKey = '233822212510782';

// Add event listener to form to handle submission
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Get the value of the search input and construct API endpoint URL
  const searchTerm = searchInput.value.trim();
  const endpointUrl = `https://www.superheroapi.com/api.php/233822212510782/search/${searchTerm}`;

  try {
    // Make API request to retrieve data for the superhero with the given name
    const response = await fetch(endpointUrl);
    const data = await response.json();

    // Check if there are any results for the search term
    if (data.response === 'error') {
      throw new Error(data.error);
    } else if (data.results.length === 0) {
      throw new Error(`No results found for ${searchTerm}`);
    }

    // Get the first result from the API response and extract the relevant stats
    const result = data.results[0];
    const name = result.name;
    const image = result.image.url;
    const stats = result.powerstats;

    // Update the DOM with the retrieved stats
    heroName.textContent = name;
    heroImage.src = image;
    intelligence.textContent = stats.intelligence;
    strength.textContent = stats.strength;
    speed.textContent = stats.speed;
    durability.textContent = stats.durability;
    power.textContent = stats.power;
    combat.textContent = stats.combat;
    heroStats.classList.remove('hidden');
  } catch (error) {
    // Display error message if there was an error with the API request
    alert(error.message);
  }
});
