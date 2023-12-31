import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

export default function renderWithRouter(component) {
  const customHistory = createMemoryHistory();

  const returnRender = render(
    <Router history={ customHistory }>
      { component }
    </Router>,
  );

  return { history: customHistory, ...returnRender };
}