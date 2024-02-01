import { CandidateList } from './components';
import candidates from './candidates';

export default function CandidateListPage() {
  return (
    <div className="max-h-full overflow-auto bg-red-200">
      <CandidateList data={candidates} />
    </div>
  );
}
