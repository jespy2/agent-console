import { PoliciesTable } from "../components/PoliciesTable";
import { PoliciesToolbar } from "../components/PoliciesToolbar";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useGetPoliciesQuery } from "../api/policiesApi";
import "../policies.css";
import { setPage, setSearch, setStatus } from "../state/policiesUiSlice";
import { selectPoliciesFilters } from "../state/selectors";

export const PoliciesPage = () => {
	const dispatch = useAppDispatch();
	const { search, status, page, limit } = useAppSelector(selectPoliciesFilters);

	const { data, isLoading, error, refetch } = useGetPoliciesQuery({
		search,
		status,
		page,
		limit,
	});

	return (
		<section>
			<h1>Policies</h1>

			<PoliciesToolbar
				search={search}
				status={status}
				onSearchChange={(value) => dispatch(setSearch(value))}
				onStatusChange={(value) => dispatch(setStatus(value))}
				onNewCase={() => console.log("New Case")}
			/>

			{isLoading && <div>Loading policies...</div>}

			{error && (
				<div>
					<p>Something went wrong loading policies.</p>
					<button type='button' onClick={() => refetch()}>
						Retry
					</button>
				</div>
			)}

			{!isLoading && !error && (
				<>
					<PoliciesTable
						policies={data?.items ?? []}
						onSelect={(id) => console.log("Selected", id)}
          />
          
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button
              type='button'
              onClick={() => dispatch(setPage(Math.max(1, page - 1)))}
              disabled={page <= 1}
            >
              Prev
            </button>
            
            <span>Page {page}</span>
            
            <button
              type='button'
              onClick={() => dispatch(setPage(page + 1))}
              disabled={!!data && page * limit >= data.total}
            >
              Next
            </button>
          </div>
				</>
			)}
		</section>
	);
};
