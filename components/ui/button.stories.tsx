import type { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonProps } from './button';

const variantOptions: ButtonProps['variant'][] = ['solid', 'outline', 'ghost'];
const sizeOptions: ButtonProps['size'][] = ['xs', 'sm', 'md', 'lg'];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      options: variantOptions,
    },
    size: {
      options: sizeOptions,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  parameters: {
    controls: { exclude: ['variant'] },
  },

  args: {
    size: 'md',
  },

  render: (args) => (
    <div style={{ display: 'flex', gap: '10px' }}>
      {variantOptions.map((opt) => {
        const { size } = args;

        return (
          <Button key={opt} variant={opt} size={size}>
            Button
          </Button>
        );
      })}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { exclude: ['size'] },
  },

  args: {
    variant: 'solid',
  },

  render: (args) => (
    <div style={{ display: 'flex', gap: '10px' }}>
      {sizeOptions.map((opt) => {
        const { variant } = args;

        return (
          <Button key={opt} variant={variant} size={opt}>
            Button
          </Button>
        );
      })}
    </div>
  ),
};
