import DataTableCard from './DataTableCard';

function Workouts() {
  return (
    <DataTableCard
      title="Workouts"
      subtitle="Workout entries loaded from the backend API."
      resourceName="workouts"
      filterPlaceholder="Filter workouts..."
      detailsTitle="Workout Details"
    />
  );
}

export default Workouts;
