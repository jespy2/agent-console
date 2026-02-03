import { http, HttpResponse } from 'msw';

const API = 'http://localhost:5174';

type PolicyStatus = 'Active' | 'Pending' | 'Lapsed';

const makePolicy = (n: number) => {
  const status: PolicyStatus =
    n % 3 === 0 ? 'Active' : n % 3 === 1 ? 'Pending' : 'Lapsed';
  
  return {
    id: `pol_${n}`,
    policyNumber: `P-${String(1000000 + n)}`,
    holderName: `User ${n}`,
    status,
    lastUpdated: new Date('2026-01-01T12:00:00.000Z').toISOString(),
  };
};

export const handlers = [
  // GET /policies?_page&_limit&q&status
  http.get(`${API}/policies`, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('_page') ?? '1');
    const limit = Number(url.searchParams.get('_limit') ?? '10');
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
    const status = url.searchParams.get('status') as PolicyStatus || null;

    const total = 42;

    let items = Array.from({ length: total }, (_, i) => makePolicy(i + 1));

    if (status) items = items.filter((p) => p.status === status);

    if (q) {
      items = items.filter(
        (p) =>
          p.holderName.toLowerCase().includes(q) ||
          p.policyNumber.toLowerCase().includes(q)
      );
    };

    const start = (page - 1) * limit;
    const paged = items.slice(start, start + limit);

    return HttpResponse.json(paged, {
      headers: { 'X-Total-Count': String(items.length) },
    });
  }),

  // GET /policies/:id
  http.get(`${API}/policies/:id`, ({ params }) => {
    const id = String(params.id);

    // return a consistent policy for tests
    return HttpResponse.json({
      id,
      policyNumber: 'P-100234',
      holderName: 'John Smith',
      status: 'Active',
      lastUpdated: new Date('2026-01-01T12:00:00.000Z').toISOString(),
    });
  }),

  // PATCH /polices/:id
  http.patch(`${API}/policies/:id`, async ({ params, request }) => {
    const id = String(params.id);
    const body = (await request.json()) as Partial<{
      status: PolicyStatus;
      lastUpdated: string;
    }>;

    return HttpResponse.json({
      id,
      policyNumber: 'P-100234',
      holderName: 'John Smith',
      status: body.status ?? 'Active',
      lastUpdated: body.lastUpdated ?? new Date().toISOString(),
    });
  }),
];
