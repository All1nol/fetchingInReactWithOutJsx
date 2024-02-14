import React, {useEffect,useState} from 'react';
import { ReactDOM, createElement } from 'react';

const PokeComponent = () => {
  const [pokemonData, setPokemonData] = useState(null);

const getRandomPokemonId = () => {
  return Math.floor(Math.random() * 10 )+1;
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const randomPokemonId= getRandomPokemonId();
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
    fetchData();
  }, []);

  const divElement = createElement('div', null,
    createElement('h1', null, 'Pokemon Data:'),
    pokemonData && React.createElement('h1', null, pokemonData.name),
    pokemonData && React.createElement('img', {src: pokemonData.sprites.front_default, alt: 'Pokemon image'})
  );
  return divElement;
};
export default PokeComponent;
