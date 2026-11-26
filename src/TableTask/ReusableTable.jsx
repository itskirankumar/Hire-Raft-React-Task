import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReusableTable = ({ data, columns }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchText, setSearchText] = useState('');
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const getVisibleColumns = () => {
    return columns.filter(column => !hiddenColumns.includes(column.key));
  };

  const handleSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleSearch = value => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleColumnToggle = key => {
    setHiddenColumns(prevHiddenColumns => {
      if (prevHiddenColumns.includes(key)) {
        return prevHiddenColumns.filter(column => column !== key);
      }
      return [...prevHiddenColumns, key];
    });
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  // 1) Filter by ID (first column in the columns list)
  const searchKey = columns[0].key;
  const filteredData = data.filter(item =>
    String(item[searchKey]).toLowerCase().includes(searchText.toLowerCase())
  );

  // 2) Sort the filtered data
  const sortedData = [...filteredData];
  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      let result;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        result = aValue - bValue;
      } else {
        result = String(aValue).localeCompare(String(bValue));
      }
      return sortConfig.direction === 'asc' ? result : -result;
    });
  }

  // 3) Paginate
  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = sortedData.slice(startIndex, endIndex);

  return (
    <div className="container mt-5">
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            {getVisibleColumns().map(column => (
              <th
                key={column.key}
                onClick={() => handleSort(column.key)}
                style={{ cursor: 'pointer' }}
              >
                {column.label}
                {sortConfig.key === column.key
                  ? sortConfig.direction === 'asc'
                    ? ' ▲'
                    : ' ▼'
                  : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleData.map((row, index) => (
            <tr key={row.id !== undefined ? row.id : index}>
              {getVisibleColumns().map(column => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
          {visibleData.length === 0 && (
            <tr>
              <td colSpan={getVisibleColumns().length || 1} className="text-center">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex gap-3 align-items-center mb-3">
        <button
          className="btn btn-outline-dark btn-sm"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-dark btn-sm"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <div className="input-group-prepend">
        <label style={{ margin: '35px', fontSize: '25px', fontFamily: 'sans-serif' }}>
          Search by ID :
        </label>
        <input
          type="number"
          placeholder="Enter ID to search"
          value={searchText}
          onChange={e => handleSearch(e.target.value)}
        />
      </div>
      <br />

      <h3 style={{ fontFamily: 'monospace' }}>Uncheck to hide columns in below</h3>
      <div style={{ margin: '35px', fontSize: '20px' }} className="input-group-text">
        <label className="form-check" style={{ fontFamily: 'fantasy' }}>
          Columns:
        </label>
        {columns.map(column => (
          <label key={column.key}>
            <input
              style={{ marginLeft: '35px', marginRight: '10px' }}
              type="checkbox"
              checked={!hiddenColumns.includes(column.key)}
              onChange={() => handleColumnToggle(column.key)}
            />
            {column.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ReusableTable;