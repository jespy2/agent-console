export const PageSkeleton = ({ title }: { title: string }) => {
  return (
    <section aria-busy="true">
      <h1>{title}</h1>
      <p>Loading…</p>
    </section>
  );
};