import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	useGetPolicyQuery,
	useUpdatePolicyStatusMutation,
} from "../api/policiesApi";
import type { PolicyStatus } from "../types";
import { Modal } from "@/shared/components/Ui/Modal";
import type { ApiError } from "@/shared/api/types";

export const PolicyDetailPage = () => {
	const { policyId } = useParams<{ policyId: string }>();

	const { data, isLoading, error, refetch } = useGetPolicyQuery(
		policyId ?? "",
		{
			skip: !policyId,
		},
	);

	const [
		updatePolicyStatus,
		{ isLoading: isSaving, error: saveError, isSuccess },
	] = useUpdatePolicyStatusMutation();

	const [status, setStatus] = useState<PolicyStatus>("Active");
	const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);

	const openCaseBtnRef = useRef<HTMLButtonElement | null>(null);

	const openModal = () => setIsCaseModalOpen(true);
	const closeModal = () => {
		setIsCaseModalOpen(false);
		//restore focus back to the trigger
		openCaseBtnRef.current?.focus();
	};

	useEffect(() => {
		if (data) setStatus(data.status);
	}, [data]);

	// disable 'save' after success for a moment
	useEffect(() => {
		if (isSuccess) {
			const t = setTimeout(() => { }, 1000);
			return () => clearTimeout(t);
		}
	}, [isSuccess])

	if (!policyId) {
		return (
			<section>
				<h1>Policy</h1>
				<p>Missing policy id.</p>
				<Link to='/policies'>Back to Policies</Link>
			</section>
		);
	}

	if (isLoading) {
		return (
			<section>
				<h1>Policy</h1>
				<p>Loading policy...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section>
				<h1>Policy</h1>
				<div role='alert'>
					<p>We couldn't load this policy.</p>
					<p>{(error as ApiError).message}</p>
					<button type='button' onClick={() => refetch()}>
						Retry
					</button>
				</div>
				<Link to='/policies'>Back to Policies</Link>
			</section>
		);
	}

	if (!data) {
		return (
			<section>
				<h1>Policy</h1>
				<p>Policy not found.</p>
				<Link to='/policies'>Back to Policies</Link>
			</section>
		);
	}

	return (
		<section>
			<p className='breadcrumb'>
				<Link to='/policies'>Policies</Link> / {data.policyNumber}
			</p>

			<h1>Policy {data.policyNumber}</h1>

			<div className='card'>
				<div>
					<strong>Holder</strong>
					<div>{data.holderName}</div>
				</div>

				<div>
					<strong>Status</strong>
					<div>{data.status}</div>
				</div>

				<div>
					<strong>Last Updated</strong>
					<div>{new Date(data.lastUpdated).toLocaleString()}</div>
				</div>

				<div>
					<strong>Status</strong>
					<div>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value as PolicyStatus)}
							disabled={isSaving}
							aria-label='Policy status'
						>
							<option value='Active'>Active</option>
							<option value='Pending'>Pending</option>
							<option value='Lapsed'>Lapsed</option>
						</select>
					</div>
				</div>
				<button
					type='button'
					onClick={() => updatePolicyStatus({ id: data.id, status })}
					disabled={isSaving || status === data.status}
				>
					{isSaving ? "Saving..." : "Save"}
				</button>

				{isSuccess && <p>Status updated.</p>}

				{saveError && <p role='alert'>Could not update status.</p>}
			</div>
			<button type='button' ref={openCaseBtnRef} onClick={openModal}>
				Open Case
			</button>
			<Modal isOpen={isCaseModalOpen} title='Open Case' onClose={closeModal}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						closeModal();
					}}
					style={{ display: "grid", gap: 12 }}
				>
					<div style={{ display: "grid", gap: 6 }}>
						<label htmlFor='caseType'>
							<strong>Case Type</strong>
						</label>
						<select id='caseType' name='caseType' defaultValue='Billing'>
							<option value='Billing'>Billing</option>
							<option value='Coverage'>Coverage</option>
							<option value='Claims'>Claims</option>
							<option value='Other'>Other</option>
						</select>
					</div>

					<div style={{ display: "grid", gap: 6 }}>
						<label htmlFor='notes'>
							<strong>Notes</strong>
						</label>
						<textarea id='notes' name='notes' rows={4} />
					</div>

					<div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
						<button type='button' onClick={closeModal}>
							Cancel
						</button>
						<button type='submit'>Create Case</button>
					</div>
				</form>
			</Modal>
		</section>
	);
};
