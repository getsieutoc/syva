'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { InterviewWithPayload } from '@/types';
import { Chatbox } from '@/components/client';
import { useChat } from '@/hooks';

import { AddNewLinkDialog } from './AddLinkDialog';
import { LinkList } from './LinkList';

export type SingleCandidatePageProps = {
  interview: InterviewWithPayload;
};

export const InterviewDetails = ({ interview }: SingleCandidatePageProps) => {
  const bindChat = useChat({ body: { interviewId: interview.id } });

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={70}
        className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden p-6"
      >
        <div className="min-w-[800px]">
          <Tabs defaultValue="general" className="w-full">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="settings">
              <div className="flex flex-col">
                <AddNewLinkDialog interviewId={interview.id} />
                <LinkList links={interview.links} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={30}>
        <Chatbox {...bindChat} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
