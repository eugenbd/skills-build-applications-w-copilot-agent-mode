import DataTableCard from './DataTableCard';

function Users() {
  return (
    <DataTableCard
      title="Users"
      subtitle="User records from the backend REST API."
      resourceName="users"
      filterPlaceholder="Filter users..."
      detailsTitle="User Details"
    />
  );
}

export default Users;
