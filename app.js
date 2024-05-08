// console.log('working')



const getPokemonData = async (pokemonName) => {
  try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      return null;
  }
};

const getPokemonStats = async (pokemonName) => {
  try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      return response.data.stats;
  } catch (error) {
      console.error('Error fetching Pokémon stats:', error);
      return null;
  }
};


const searchButton = document.querySelector("#searchButton");
const pokemonInput = document.querySelector("#inputBar");
const pokemonNameElement = document.querySelector("#pokemonName");
const pokemonImageElement = document.querySelector("#pokemonImage");
const pokemonStatsElement = document.querySelector("#pokemonStats");

searchButton.addEventListener('click', async () => {
  const pokemonName = pokemonInput.value.trim().toLowerCase();
  if (pokemonName) {
      const pokemonData = await getPokemonData(pokemonName);
      if (pokemonData) {
          pokemonNameElement.textContent = pokemonData.name;
          pokemonImageElement.src = pokemonData.sprites.front_default;

          // Fetch and display Pokémon stats
          const pokemonStats = await getPokemonStats(pokemonName);
          if (pokemonStats) {
              pokemonStatsElement.innerHTML = ''; // Clear existing content
              pokemonStats.forEach(stat => {
                  const statElement = document.createElement('div');
                  statElement.textContent = `${stat.stat.name}: ${stat.base_stat}`;
                  pokemonStatsElement.appendChild(statElement);
              });
          } else {
              pokemonStatsElement.textContent = 'Stats not found';
          }
      } else {
          pokemonNameElement.textContent = "Pokémon not found";
          pokemonImageElement.src = ""; // Clear the image
          pokemonStatsElement.textContent = ''; // Clear the stats
      }
  } else {
      console.log('Please enter a Pokémon name');
  }
});
