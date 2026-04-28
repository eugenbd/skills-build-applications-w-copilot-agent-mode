import DataTableCard from './DataTableCard';

function Activities() {
  return (
    <DataTableCard
      title="Activities"
      subtitle="Pulling data from the backend API for activities."
      resourceName="activities"
      filterPlaceholder="Filter activities..."
      detailsTitle="Activity Details"
    />
  );
}

export default Activities;
