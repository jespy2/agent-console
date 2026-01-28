import type { Policy } from '../types';

interface PoliciesTableProps {
  policies: Policy[];
  onSelect: (policyId: string) => void;
};

export const PoliciesTable = ({ policies, onSelect }: PoliciesTableProps) => {
  if (policies.length === 0) {
    return <div>No policies found</div>
  }

  return (
    <table className='policies-table'>
      <thead>
        <tr>
          <th>Policy Holder</th>
          <th>Policy</th>
          <th>Status</th>
          <th>Last Updated</th>
        </tr>
      </thead>

      <tbody>
        {policies.map((policy) => (
          <tr
            key={policy.id}
            tabIndex={0}
            onClick={() => onSelect(policy.id)}
          >
            <td>{policy.holderName}</td>
            <td>{policy.policyNumber}</td>
            <td>
              <span className={`status-badge status-${policy.status.toLowerCase()}`} >
                {policy.status}
              </span>
            </td>
            <td>
              {new Date(policy.lastUpdated).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
 };