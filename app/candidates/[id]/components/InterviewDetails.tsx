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
import { Candidate, HttpMethod } from '@/types';
import { useChat, useLoading, useLocalStorage, useState } from '@/hooks';
import { fetcher } from '@/lib/fetcher';

export type SingleCandidatePageProps = {
  candidate: Candidate;
};

export const InterviewDetails = ({ candidate }: SingleCandidatePageProps) => {
  const bindChat = useChat();

  const { isLoading, startLoading, stopLoading } = useLoading();

  const [audioUrl, setAudioUrl] = useLocalStorage(candidate.id, '');

  const [audioStartFrom, setStartFrom] = useLocalStorage('audio-start-from', 0);

  const [audioEndAt, setEndAt] = useLocalStorage('audio-end-at', 5);

  const [response, setResponse] = useState<object | null>(null);

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
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={15}>
            <div className="flex h-full items-center justify-center p-2">
              <Avatar size="md">
                <AvatarImage alt={candidate?.name} src={candidate?.avatar} />
              </Avatar>
              <h2 className="text-lg font-bold">{candidate?.name}</h2>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={85}>
            <div className="flex h-full items-center justify-center p-2">
              <Chatbox {...bindChat} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={50} className="flex flex-col gap-2 p-6">
        <div className="flex items-center justify-center gap-2">
          <Input
            onChange={(e) => setAudioUrl(e.target.value)}
            value={audioUrl}
          />
        </div>
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
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
