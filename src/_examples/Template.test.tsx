import { render, screen } from '@testing-library/react';

import { Template } from './Template';

describe('Template template', () => {
  describe('Render method', () => {
    it('should have 1 menu items', () => {
      render(<Template>{null}</Template>);

      const menuItemList = screen.getByRole('link');

      expect(menuItemList).toBeInTheDocument();
    });
  });
});
