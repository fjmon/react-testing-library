import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pok = '/pokemons/25';

describe('se as informações do pokémon selecionado são mostradas na tela', () => {
  it('A página deve conter um texto onde <name> é o nome do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pok);
    const details = screen.getByText(/Pikachu Details/i);
    expect(details).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pok);
    const heading = screen.getByRole('heading', { name: /Summary/i });
    expect(heading).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pok);
    const TEXT = /This intelligent Pokémon roasts hard berries with electricity to make/i;
    const parag = screen.getByText(TEXT);
    expect(parag).toBeInTheDocument();
  });
});

describe('se existe na página seção com mapas contendo localizações do pokémon', () => {
  it('seção de detalhes haverá um heading h2 com texto Game Locations of <name>', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pok);
    const locText = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i });
    expect(locText).toBeInTheDocument();
  });

  it('A imagem da localização deve ter um atributo src com a URL da localização', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pok);
    const URL = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const locImg = screen.getAllByAltText(/Pikachu location/i);
    expect(locImg[0].src).toBe(URL);
  });
});

it('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
  const { history } = renderWithRouter(<App />);
  history.push(pok);
  const favPokemon = screen.getByText(/Pokémon favoritado/i);
  expect(favPokemon).toBeInTheDocument();
});
