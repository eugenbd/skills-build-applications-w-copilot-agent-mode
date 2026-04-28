import DataTableCard from './DataTableCard';

function Leaderboard() {
  return (
    <DataTableCard
      title="Leaderboard"
      subtitle="Track score and ranking data from the backend API."
      resourceName="leaderboard"
      filterPlaceholder="Filter leaderboard..."
      detailsTitle="Leaderboard Details"
    />
  );
}

export default Leaderboard;
