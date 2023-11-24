import { render, screen } from '@testing-library/react';

import Index from '@/pages/index';

describe('Index page', () => {
  describe('Render method', () => {
    it('should have h1 tag', () => {
      render(<Index />);

      const heading = screen.getByRole('heading', {
        name: /쉽게 사용하는 식습관 관리의 첫걸음/i,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
