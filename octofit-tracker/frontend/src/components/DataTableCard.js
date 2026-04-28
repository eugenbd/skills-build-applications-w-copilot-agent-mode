import React, { useEffect, useMemo, useState } from 'react';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'REACT_APP_CODESPACE_NAME_NOT_SET';

function buildEndpoint(resourceName) {
  return `https://${codespaceName}-8000.app.github.dev/api/${resourceName}/`;
}

function normalizeResponseData(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (data?.results) return [data.results];
  if (data) return [data];
  return [];
}

function DataTableCard({ title, subtitle, resourceName, filterPlaceholder, detailsTitle }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const endpoint = useMemo(() => buildEndpoint(resourceName), [resourceName]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    console.log(`${title} endpoint:`, endpoint);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`${title} fetch failed: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log(`${title} fetched data:`, data);
      setItems(normalizeResponseData(data));
    } catch (fetchError) {
      console.error(`${title} fetch error:`, fetchError);
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const filteredItems = useMemo(() => {
    if (!filter.trim()) return items;
    const lower = filter.toLowerCase();
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(lower));
  }, [filter, items]);

  const headers = useMemo(() => {
    const keys = new Set();
    filteredItems.forEach((item) => {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        Object.keys(item).forEach((key) => keys.add(key));
      }
    });
    return Array.from(keys);
  }, [filteredItems]);

  const showDetail = (item) => setSelectedItem(item);
  const hideDetail = () => setSelectedItem(null);

  return (
    <div className="data-card card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h2 className="h4">{title}</h2>
            <p className="text-muted mb-1">{subtitle}</p>
            <p className="mb-2">
              <small className="text-secondary">
                Endpoint: <a href={endpoint} target="_blank" rel="noreferrer" className="link-secondary">{endpoint}</a>
              </small>
            </p>
            <p className="mb-0">
              <small className="text-secondary">{filteredItems.length} record{filteredItems.length === 1 ? '' : 's'} shown</small>
            </p>
          </div>
          <button className="btn btn-primary" type="button" onClick={fetchData} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        <form className="row g-2 align-items-center filter-form mb-3" onSubmit={(e) => e.preventDefault()}>
          <div className="col-sm-8 col-md-6">
            <label htmlFor={`${resourceName}Filter`} className="form-label visually-hidden">
              {filterPlaceholder}
            </label>
            <input
              id={`${resourceName}Filter`}
              type="search"
              className="form-control"
              placeholder={filterPlaceholder}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                {headers.map((header) => (
                  <th scope="col" key={header}>
                    {header}
                  </th>
                ))}
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={headers.length + 2} className="text-center py-4">
                    {loading ? `Loading ${title.toLowerCase()}...` : `No ${title.toLowerCase()} found.`}
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, index) => (
                  <tr key={item.id ?? index}>
                    <th scope="row">{index + 1}</th>
                    {headers.map((header) => {
                      const value = item && typeof item === 'object' ? item[header] : item;
                      return (
                        <td key={`${item.id ?? index}-${header}`}>
                          {value === null || value === undefined
                            ? '-'
                            : typeof value === 'object'
                            ? JSON.stringify(value)
                            : value}
                        </td>
                      );
                    })}
                    <td>
                      <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => showDetail(item)}>
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {selectedItem && (
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{detailsTitle}</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={hideDetail} />
                </div>
                <div className="modal-body">
                  <pre>{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={hideDetail}>
                    Close
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show" />
          </div>
        )}
      </div>
    </div>
  );
}

export default DataTableCard;
