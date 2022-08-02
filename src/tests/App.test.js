import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Teste se contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );

    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );

    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );

    const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorites).toBeInTheDocument();
  });
});

describe('Teste de redirecionamentos', () => {
  it('Se aplicação é redirecionada para a página inicial ao clicar no link Home', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );

    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const headerHome = screen.getByRole('heading', { name: /pokédex/i });
    expect(headerHome).toBeInTheDocument();
  });

  it('se aplicação é redirecionada para a página de Aboutao clicar no link About', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const headerAbout = screen.getByRole('heading', { name: /about pokédex/i });
    expect(headerAbout).toBeInTheDocument();
  });

  it('se é redirecionada para Favoritos ao clicar no Favorite Pokémons', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );

    const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavorite).toBeInTheDocument();

    userEvent.click(linkFavorite);

    const headerFavorite = screen.getByRole('heading', { name: /favorite pokémons/i });
    expect(headerFavorite).toBeInTheDocument();
  });
});

it('se aplicação é redirecionada para Not Found ao entrar em URL desconhecida', () => {
  const history = createMemoryHistory();
  history.push('/nada');
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const NotFound = screen.getByRole('heading', { name: /page requested not found/i });
  expect(NotFound).toBeInTheDocument();
});
