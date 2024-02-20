import React, { useEffect, useState } from 'react';

const PokeComponent = () => {
  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonId, setPokemonId] = useState(getRandomPokemonId());

  const generateId = () => {
    const newPokemonId = getRandomPokemonId();
    setPokemonId(newPokemonId);
    window.location.hash = `#${newPokemonId}`;
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

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
    const hashed = window.location.hash.substring(1);
    if (hashed) {
      setPokemonId(parseInt(hashed,10));
      fetchData();
    }
  }, []);

  return (
    <div>
      <h1>Pokemon Data:</h1>
      {pokemonData && (
        <div>
          <h1>{pokemonData.name}</h1>
          <img onClick={generateId} src={pokemonData.sprites.front_default} alt="Pokemon image" />
        </div>
      )}
    </div>
  );
};

export default PokeComponent;
