import type { PolicyStatus } from '../types';

type StatusFilter = PolicyStatus | 'All';

interface PoliciesToolbarProps {
  search: string;
  status: PolicyStatus | 'All';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onNewCase: () => void;
};

export const PoliciesToolbar = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onNewCase,
}: PoliciesToolbarProps) => {
  return (
    <div className='policies-toolbar' >
      <input
        type='text'
        placeholder='Search by name or policy'
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label='Search policies'
      />
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as PolicyStatus | 'All')}
          aria-label='Filter by status'
        >
          <option value='All'>All</option>
          <option value='Active'>Active</option>
          <option value='Pending'>Pending</option>
          <option value='Lapsed'>Lapsed</option>
      </select>
      
      <button type='button' onClick={onNewCase} >New Case</button>
    </div>
  )
}