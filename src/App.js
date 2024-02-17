import React, { useEffect, useState } from 'react';

const PokeComponent = () => {
  const [pokemonData, setPokemonData] = useState(null);

  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  const fetchData = async () => {
    try {
      const randomPokemonId = getRandomPokemonId();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
      
      if (response.ok) {
        const data = await response.json();
        setPokemonData(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderClick = () => {
    fetchData();
  }

  const divElement = (
    <div>
      <h1>Pokemon Data:</h1>
      {pokemonData && <h1>{pokemonData.name}</h1>}
      {pokemonData && <img onClick={renderClick} src={pokemonData.sprites.front_default} alt="Pokemon image" />}
    </div>
  );

  return divElement;
};

export default PokeComponent;
