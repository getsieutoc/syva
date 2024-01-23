import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';

const meta = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Input type="email" placeholder="Email" />,
};
