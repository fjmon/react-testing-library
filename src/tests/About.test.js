import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('se a página contém as informações sobre a Pokédex', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const textAbout = screen.getByText(/this application simulates a pokédex/i);
  expect(textAbout).toBeInTheDocument();
});

it('se a página contém um heading h2 com o texto About Pokédex', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const textAbout = screen.getByRole('heading', { name: /about pokédex/i });
  expect(textAbout).toBeInTheDocument();
});

it('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
  const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
});

it('se a página contém a imagem de uma Pokédex', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const URL_IMG = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const img = screen.getByAltText(/Pokédex/i);
  expect(img.src).toContain(URL_IMG);
});
