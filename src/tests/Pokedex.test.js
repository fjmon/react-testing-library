import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('se a página contém um heading h2 com o texto Encountered pokémons', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );
    const head = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(head).toBeInTheDocument();
  });

  it('se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );
    const proxBot = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(proxBot).toBeInTheDocument();
    const pokemonsName = [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu'];

    pokemonsName.forEach((pokemon) => {
      userEvent.click(proxBot);
      const pokName = screen.getByText(pokemon);
      expect(pokName).toBeInTheDocument();
    });
  });

  it('se é mostrado apenas um pokémon por vez', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );
    const proxBot = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(proxBot).toBeInTheDocument();
    const poksName = pokemons.map(({ name }) => name);
    poksName.forEach((pokemon, index, array) => {
      const pokName = screen.getByText(pokemon);
      expect(pokName).toBeInTheDocument();
      const altIndex = index === 0 ? 1 : index - 1;
      const altPokemon = screen.queryByText(array[altIndex]);
      expect(altPokemon).not.toBeInTheDocument();
      userEvent.click(proxBot);
    });
  });

  describe('se a Pokédex tem os botões de filtro', () => {
    it('Deve existir botão de filtragem para cada tipo de pokémon, sem repetição', () => {
      render(
        <MemoryRouter><App /></MemoryRouter>,
      );
      const pokTypes = ['All', ...pokemons.map(({ type }) => type)];
      const BOT_TYPES = 7;
      const botId = screen.getAllByTestId('pokemon-type-button');
      expect(botId.length).toBe(BOT_TYPES);
      pokTypes.forEach((pokemonType) => {
        const botType = screen.getByRole('button', { name: pokemonType });
        expect(botType).toBeInTheDocument();
      });
    });

    it('A partir da seleção de botão Pokédex deve circular pokémons daquele tipo', () => {
      render(
        <MemoryRouter><App /></MemoryRouter>,
      );
      const pokTypes = ['All', ...pokemons.map(({ type }) => type)];
      const proxBot = screen.getByRole('button', { name: /Próximo pokémon/i });
      const buttonAll = screen.getByRole('button', { name: /All/i });
      pokTypes.forEach((pokemonType) => {
        const botType = screen.getByRole('button', { name: pokemonType });
        expect(buttonAll).toBeInTheDocument();
        expect(botType).toBeInTheDocument();
        userEvent.click(botType);
        const poksNameTypes = pokemonType === 'All'
          ? pokemons.map(({ name }) => name)
          : pokemons.filter(({ type }) => type === pokemonType).map(({ name }) => name);
        poksNameTypes.forEach((pokName) => {
          const nameText = screen.getByText(pokName);
          expect(nameText).toBeInTheDocument();
          userEvent.click(proxBot);
        });
      });
    });
  });

  it('Teste se a Pokédex contém um botão "All" para resetar o filtro', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );
    const buttonAll = screen.getByRole('button', { name: /All/i });
    const proxBot = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    const poksNames = pokemons.map(({ name }) => name);
    poksNames.forEach((pokemon) => {
      const textPokName = screen.getByText(pokemon);
      expect(textPokName).toBeInTheDocument();
      userEvent.click(proxBot);
    });
  });
});
