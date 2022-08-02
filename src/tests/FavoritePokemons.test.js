import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

it('se é exibida na tela a mensagem No favorite pokemon found', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/favorites');
  const textFavorite = screen.getByText(/No favorite pokemon found/i);
  expect(textFavorite).toBeInTheDocument();
});

it('se são exibidos todos os cards de pokémons favoritados.', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const details = screen.getByRole('link', { name: /More details/i });
  userEvent.click(details);
  const favoriteCheckBox = screen.getByLabelText(/Pokémon favoritado/i);
  userEvent.click(favoriteCheckBox);
  const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
  userEvent.click(favoriteLink);

  const favoritPokemon = screen.getByText(/Pikachu/i);
  expect(favoritPokemon).toBeInTheDocument();
});
