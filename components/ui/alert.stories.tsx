import type { Meta, StoryObj } from '@storybook/react';
import { Terminal, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';

const meta: Meta<typeof Alert> = {
  title: 'Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  parameters: {
    variant: { include: ['default', 'destructive'] },
  },

  args: {
    variant: 'default',
  },

  render: ({ variant }) => {
    const isDefault = variant === 'default';
    return (
      <Alert variant={variant}>
        {isDefault ? (
          <Terminal className="h-4 w-4" />
        ) : (
          <AlertCircle className="h-4 w-4" />
        )}
        <AlertTitle>{isDefault ? `Heads up!` : `Error`}</AlertTitle>
        <AlertDescription>
          {isDefault
            ? `You can add components to your app using the cli.`
            : `Your session has expired. Please log in again.`}
        </AlertDescription>
      </Alert>
    );
  },
};
