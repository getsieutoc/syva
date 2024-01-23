import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './label';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Label> = {
  title: 'Label',
  component: Label,
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  parameters: {
    controls: { exclude: ['placeholder'] },
  },

  render: (args) => {
    return <Label htmlFor="terms">Accept terms and conditions</Label>;
  },
};
