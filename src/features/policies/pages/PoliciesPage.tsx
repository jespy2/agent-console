import { useMemo, useState } from "react"
import type { PolicyStatus } from "../types";
import { PoliciesToolbar } from "../components/PoliciesToolbar";
import { PoliciesTable } from "../components/PoliciesTable";

import '../policies.css';
import { MOCK_POLICIES } from "../mockPolicies";

export const PoliciesPage = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<PolicyStatus | 'All'>('All')

  const filtered = useMemo(() => {
    return MOCK_POLICIES.filter((p) => {
      const matchesSearch =
        p.holderName.toLowerCase().includes(search.toLowerCase()) ||
        p.policyNumber.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = status === 'All' || p.status === status;

      return matchesSearch && matchesStatus;
    })
  }, [search, status])

  return (
    <section>
      <h1>Policies</h1>

      <PoliciesToolbar
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onNewCase={() => console.log('New Case')}
      />

      <PoliciesTable
        policies={filtered}
        onSelect={(id) => console.log('Selected', id)}
      />
    </section>
  )
}