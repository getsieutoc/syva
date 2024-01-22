import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from './textarea';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Textarea> = {
  title: 'Textarea',
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Placeholder: Story = {
  parameters: {
    controls: { exclude: ['placeholder'] },
  },
  args: {
    placeholder: 'Type your message here.',
  },
  argTypes: {
    rows: {
      description: 'input size row',
      type: 'number',
      defaultValue: 3,
    },
  },
  render: (args) => {
    return <Textarea placeholder={args.placeholder} rows={args.rows} />;
  },
};
export const Rows: Story = {
  parameters: {
    controls: { exclude: ['rows'] },
  },

  render: (args) => {
    return (
      <div>
        <div>rows: default</div>
        <Textarea />
        <div>rows: 4</div>
        <Textarea rows={4} />
        <div>rows: 5</div>
        <Textarea rows={5} />
        <div>rows: 6</div>
        <Textarea rows={6} />
      </div>
    );
  },
};
export const Disabled: Story = {
  render: (args) => {
    return <Textarea disabled placeholder="disabled={true}" />;
  },
};
