import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

it('se a página contém um heading h2 com o texto Page requested not found', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/coringa');
  const pageNotFound = screen.getByRole('heading', { name: /page requested not found/i });
  expect(pageNotFound).toBeInTheDocument();
});

it('se a página mostra a imagem', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/qualquerlugar');
  const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const img = screen
    .getByAltText(/Pikachu crying because the page requested was not found/i);
  expect(img.src).toContain(imageUrl);
});
