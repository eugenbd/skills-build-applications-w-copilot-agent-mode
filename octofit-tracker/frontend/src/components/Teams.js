import DataTableCard from './DataTableCard';

function Teams() {
  return (
    <DataTableCard
      title="Teams"
      subtitle="Team data loaded from the backend REST API."
      resourceName="teams"
      filterPlaceholder="Filter teams..."
      detailsTitle="Team Details"
    />
  );
}

export default Teams;
