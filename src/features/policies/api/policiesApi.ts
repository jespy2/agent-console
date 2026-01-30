import { baseQuery } from "@/shared/api/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { MOCK_POLICIES } from "../mockPolicies";
import type { Policy, PolicyStatus } from "../types";

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
		// getPolicies: builder.query<PaginationPolicies, GetPoliciesArgs>({
		// 	query: ({ search, status, page, limit }) => ({
		// 		url: "/policies",
		// 		params: {
		// 			search,
		// 			status: status === "All" ? undefined : status,
		// 			page,
		// 			limit,
		// 		},
		// 	}),
		// 	providesTags: (result) =>
		// 		result
		// 			? [
		// 					{ type: "Policies", id: "List" },
		// 					...result.items.map((p) => ({
		// 						type: "Policy" as const,
		// 						id: p.id,
		// 					})),
		// 				]
		// 			: [{ type: "Policies", id: "List" }],
		// }),

		// Temp for mock data
		getPolicies: builder.query<PaginationPolicies, GetPoliciesArgs>({
			queryFn: async ({ search, status, page, limit }) => {
				let items = MOCK_POLICIES;

				const s = search.trim().toLowerCase();

				if (status !== "All") {
					items = items.filter((p) => p.status === status);
				}

				if (s) {
					items = items.filter(
						(p) =>
							p.holderName.toLowerCase().includes(s) ||
							p.policyNumber.toLowerCase().includes(s),
					);
				}

				const total = items.length;
				const start = (page - 1) * limit;
				const paged = items.slice(start, start + limit);

				return {
					data: {
						items: paged,
						total,
						page,
						limit,
					},
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

		// getPolicy: builder.query<Policy, string>({
		// 	query: (id) => `/policies/${id}`,
		// 	providesTags: (_result, _err, id) => [{ type: "Policy", id }],
		// }),

		// Temp for mockdata
		getPolicy: builder.query<Policy, string>({
			queryFn: async (id) => {
				const policy = MOCK_POLICIES.find((p) => p.id === id);

				if (!policy) {
					return {
						error: {
							status: 404,
							data: { message: "Policy not found" },
						} as any,
					};
				}

				return { data: policy };
			},
			providesTags: (_result, _err, id) => [{ type: "Policy", id }],
		}),

		// updatePolicyStatus: builder.mutation<
		// 	Policy,
		// 	{ id: string; status: PolicyStatus }
		// >({
		// 	query: ({ id, status }) => ({
		// 		url: `/policies/${id}`,
		// 		method: "PATCH",
		// 		body: { status },
		// 	}),
		// 	invalidatesTags: (_result, _err, { id }) => [
		// 		{ type: "Policy", id },
		// 		{ type: "Policies", id: "List" },
		// 	],
		// }),

		// Temp for mock data
		updatePolicyStatus: builder.mutation<
			Policy,
			{ id: string; status: PolicyStatus }
		>({
			queryFn: async ({ id, status }) => {
				const idx = MOCK_POLICIES.findIndex((p) => p.id === id);

				if (idx === -1) {
					return {
						error: {
							status: 404,
							data: { message: "Policy not found" },
						} as any,
					};
				}

				// update in place for interview prep realism
				MOCK_POLICIES[idx] = {
					...MOCK_POLICIES[idx],
					status,
					lastUpdated: new Date().toISOString(),
				};

				return { data: MOCK_POLICIES[idx] };
			},

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
