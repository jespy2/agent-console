import { baseQuery } from "@/shared/api/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Policy, PolicyStatus } from "../types";
import type { RootState } from "@/app/store";

export interface GetPoliciesArgs {
	search: string;
	status: PolicyStatus | "All";
	page: number;
	limit: number;
}

export interface PaginationPolicies {
	items: Policy[];
	total: number;
	page: number;
	limit: number;
}

export const policiesApi = createApi({
	reducerPath: "policiesApi",
	baseQuery,
	tagTypes: ["Policies", "Policy"],
	endpoints: (builder) => ({
		getPolicies: builder.query<PaginationPolicies, GetPoliciesArgs>({
			query: ({ search, status, page, limit }) => ({
				url: "/policies",
				params: {
					_page: page,
					_limit: limit,
					q: search.trim() || undefined,
					status: status === "All" ? undefined : status,
				},
			}),
			transformResponse: (items: Policy[], meta, arg) => {
				const totalHeader = meta?.response?.headers?.get("x-total-count");
				const total = totalHeader ? Number(totalHeader) : items.length;

				return {
					items,
					total,
					page: arg.page,
					limit: arg.limit,
				};
			},
			providesTags: (result) =>
				result
					? [
							{ type: "Policies", id: "List" },
							...result.items.map((p) => ({
								type: "Policy" as const,
								id: p.id,
							})),
						]
					: [{ type: "Policies", id: "List" }],
		}),

		getPolicy: builder.query<Policy, string>({
			query: (id) => `/policies/${id}`,
			providesTags: (_result, _err, id) => [{ type: "Policy", id }],
		}),

		updatePolicyStatus: builder.mutation<
			Policy,
			{ id: string; status: PolicyStatus }
		>({
			query: ({ id, status }) => ({
				url: `/policies/${id}`,
				method: "PATCH",
				body: { status, lastUpdated: new Date().toISOString() },
			}),

			async onQueryStarted({ id, status }, { dispatch, getState, queryFulfilled }) {
				const state = getState() as RootState;
				const { search, status: filterStatus, page, limit } = state.policiesUi;

				const listArgs = {
					search,
					status: filterStatus,
					page,
					limit,
				};

				const now = new Date().toISOString();

				// Optimistically update the detail query cache
				const patchDetail = dispatch(
					policiesApi.util.updateQueryData("getPolicy", id, (draft) => {
						draft.status = status;
						draft.lastUpdated = now;
					}),
				);

				// Optimistically update the list cache for the active query args.
				// RTK Query caches queries per argument set, so we patch the currently visible list.

				const patchList = dispatch(
					policiesApi.util.updateQueryData(
						"getPolicies",
						listArgs,
						(draft) => {
							const item = draft.items.find((p) => p.id === id);
							if (item) {
								item.status = status;
								item.lastUpdated = now;
							}
						},
					),
				);

				try {
					// If request succeeds, optionally let server response win
					const { data } = await queryFulfilled;


					// Reconcile caches with the server response.
					dispatch(
						policiesApi.util.updateQueryData(
							"getPolicy",
							id,
							(draft) => {
								Object.assign(draft, data);
							},
						),
					);

					dispatch(
						policiesApi.util.updateQueryData(
							"getPolicies",
							listArgs,
							(draft) => {
								const item = draft.items.find((p) => p.id === id);
								if (item) Object.assign(item, data);
							},
						),
					);
				} catch {
					// Roll back optimistic updates on failure
					patchDetail.undo();
					patchList.undo();
				}
			},

			// Insure any other cached lists refetch later
			invalidatesTags: (_result, _err, { id }) => [
				{ type: "Policy", id },
				{ type: "Policies", id: "List" },
			],
		}),
	}),
});

export const {
	useGetPoliciesQuery,
	useGetPolicyQuery,
	useUpdatePolicyStatusMutation,
} = policiesApi;
