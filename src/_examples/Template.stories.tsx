import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { Template } from './Template';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Template',
  component: Template,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Template>;

export default meta;
type Story = StoryObj<typeof Template>;

export const TemplateWithReactComponent = {
  args: {},
} satisfies Story;

export const TemplateWithString = {
  args: {},
} satisfies Story;

// More on interaction testing: https://storybook.js.org/docs/7.0/react/writing-tests/interaction-testing
export const TemplateWithHomeLink: Story = {
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole('link', {
      name: /Home/i,
    });

    await userEvent.click(loginButton);
  },
} satisfies Story;
