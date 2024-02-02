'use client';

import { Candidate } from '@/types';

import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@/components/ui';

export type CandidateListProps = {
  data: Candidate[];
};

export const CandidateList = ({ data }: CandidateListProps) => {
  return (
    <div className="max-w-4xl rounded-md border">
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Job</Th>
            <Th>Date apply</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((candidate) => (
            <Tr key={candidate.id}>
              <Td className="font-medium">{candidate.name}</Td>
              <Td>{candidate.jobTitle}</Td>
              <Td>{candidate.dateAplly}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={2}>Lorem ipsum</Td>
            <Td className="text-right">dono</Td>
          </Tr>
        </Tfoot>
      </Table>
    </div>
  );
};
