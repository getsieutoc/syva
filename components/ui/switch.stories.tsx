import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';
import { Label } from '.';

// const switchSizes: SwitchTypes['size'][] = ['xs', 'sm', 'md', 'lg'];
const meta = {
  title: 'Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  //   argTypes: {
  //     size: {
  //       options: switchSizes,
  //     },
  //   },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};
