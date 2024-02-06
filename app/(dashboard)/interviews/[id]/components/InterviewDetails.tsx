'use client';

import {
  Avatar,
  AvatarImage,
  Button,
  Input,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui';
import { Chatbox } from '@/components/client';
import { InterviewWithPayload, HttpMethod } from '@/types';
import { useChat, useLoading, useLocalStorage, useState } from '@/hooks';
import { fetcher } from '@/lib/fetcher';
import { AddNewLinkDialog } from './AddLinkDialog';

export type SingleCandidatePageProps = {
  interview: InterviewWithPayload;
};

export const InterviewDetails = ({ interview }: SingleCandidatePageProps) => {
  console.log('### interview: ', { interview });

  const { isLoading, startLoading, stopLoading } = useLoading();

  const [audioUrl, setAudioUrl] = useLocalStorage(interview.candidate.id, '');

  const [audioStartFrom, setStartFrom] = useLocalStorage('audio-start-from', 0);

  const [audioEndAt, setEndAt] = useLocalStorage('audio-end-at', 5);

  const [response, setResponse] = useState<object | null>(null);

  const bindChat = useChat({ body: { audioUrl } });

  const handleAnalyzeAudio = async () => {
    startLoading();

    const res = await fetcher<object>('/api/analyze', {
      method: HttpMethod.POST,
      body: JSON.stringify({
        audioUrl,
        audioStartFrom,
        audioEndAt,
      }),
    });

    stopLoading();

    setResponse(res);
  };

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={70}
        className="flex flex-col gap-2 overflow-hidden p-6"
      >
        <div className="min-w-[800px]">
          <AddNewLinkDialog interviewId={interview.id} />

          <div className="flex items-center gap-2">
            <Input
              onChange={(e) => setStartFrom(parseInt(e.target.value, 10))}
              value={audioStartFrom}
              type="number"
            />
            <Input
              onChange={(e) => setEndAt(parseInt(e.target.value, 10))}
              value={audioEndAt}
              type="number"
            />
          </div>
          <div className="flex w-full justify-end gap-2">
            <Button onClick={handleAnalyzeAudio} isLoading={isLoading}>
              Analyze interview
            </Button>
          </div>

          {response && (
            <div className="flex-auto overflow-auto rounded-md border p-2 text-xs">
              <p>{JSON.stringify(response)}</p>
            </div>
          )}
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={30}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={15}>
            <div className="flex h-full items-center justify-center">
              <Avatar size="md">
                <AvatarImage
                  alt={interview.candidate?.name ?? ''}
                  src={interview.candidate?.image ?? ''}
                />
              </Avatar>
              <h2 className="text-lg font-bold">{interview.candidate?.name}</h2>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={85}>
            <Chatbox {...bindChat} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
