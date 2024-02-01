import { CandidateList } from './components';
import candidates from './candidates';

export default function CandidateListPage() {
  return <CandidateList data={candidates} />;
}
