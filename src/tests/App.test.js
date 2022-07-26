import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

const renderScreen = <BrowserRouter><App /></BrowserRouter>;
describe('Teste se contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    render(renderScreen);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About', () => {
    render(renderScreen);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();
  });
  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    render(renderScreen);

    const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorites).toBeInTheDocument();
  });
});
