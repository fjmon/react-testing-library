import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('se é renderizado um card com as informações de determinado pokémon', () => {
  it('nome correto do pokémon deve ser mostrado na tela', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );
    const pokName = screen.getByText(/Pikachu/i);
    expect(pokName).toBeInTheDocument();
  });

  it('tipo correto do pokémon deve ser mostrado na tela', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );
    const pokType = screen.getByTestId('pokemon-type');
    const text = within(pokType).getByText(/Electric/i);
    expect(text).toBeInTheDocument();
  });

  it('peso médio do pokémon deve ser exibido', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );
    const pokWeigth = screen.getByTestId('pokemon-weight');
    expect(pokWeigth).toBeInTheDocument();
  });

  it('imagem do pokémon deve ser exibida', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );
    const LINK = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokImg = screen.getByAltText(/Pikachu sprite/i);
    expect(pokImg.src).toBe(LINK);
  });
});

it('se card pokémon indicado contém link navegação para exibir detalhes', () => {
  render(
    <MemoryRouter><App /></MemoryRouter>,
  );
  const linkNav = screen.getByRole('link', { name: /More details/i });
  const HREF = 'http://localhost/pokemons/25';
  expect(linkNav.href).toBe(HREF);
});

it('se ao clicar há o redirecionamento e se existe ícone estrela em favoritados', () => {
  render(
    <MemoryRouter><App /></MemoryRouter>,
  );
  const details = screen.getByRole('link', { name: /More details/i });
  userEvent.click(details);
  const heading = screen.getByRole('heading', { name: /Pikachu Details/i });
  expect(heading).toBeInTheDocument();
  const favPokemon = screen.getByText(/Pokémon favoritado/i);
  userEvent.click(favPokemon);
  const favText = screen.getByAltText(/Pikachu is marked as favorite/i);
  const SRC = 'http://localhost/star-icon.svg';
  expect(favText.src).toBe(SRC);
  expect(favText).toBeInTheDocument();
});
