import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReusableTable = ({ data, columns }) => {
  const [tableData, setTableData] = useState(data);
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
    const sortedData = [...tableData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
    //   if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    //   if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    //   return 0;
    if (key === 'name' || key === 'city' || key === 'gender') {
        return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });
    setTableData(sortedData);
  };

  const handleSearch = (key, value) => {
    setSearchText(value);
    const filteredData = data.filter(
      item => String(item[key]).toLowerCase().includes(value.toLowerCase())
    );
    setTableData(filteredData);
  };

  const handleColumnToggle = key => {
    setHiddenColumns(prevHiddenColumns => {
      if (prevHiddenColumns.includes(key)) {
        return prevHiddenColumns.filter(column => column !== key);
      } else {
        return [...prevHiddenColumns, key];
      }
    });
  };

//   const handlePageChange = page => {
    // setCurrentPage(page);
//   };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = tableData.slice(startIndex, endIndex);

  return (
    <div className='container mt-5'>
      <table className='table table-striped' >
        <thead className="table-dark">
          <tr >
            {getVisibleColumns().map(column => (
              <th key={column.key} onClick={() => handleSort(column.key)}>
                {column.label}

              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleData.map((row, index) => (
            <tr key={index} >
              {getVisibleColumns().map(column => (
                <td key={column.key} >{row[column.key] }</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className='input-group-prepend' >
      <label style={{margin:'35px', fontSize:'25px', fontFamily:'sans-serif'}}>Search by ID : </label> 
        <input
          type="number" placeholder='Enter ID to search'
          value={searchText}
          onChange={e => handleSearch(getVisibleColumns()[0].key, e.target.value)}
        />
      </div> <br /> 
      <h3 style={{fontFamily:'monospace'}}>Uncheck to hide columns in bellow</h3>
      <div style={{margin:'35px', fontSize:'20px'}} className="input-group-text">
   
        <label  className='form-check' style={{fontFamily:'fantasy'}}> Columns: </label>
        {columns.map(column => (
          <label key={column.key}>
            <input  style={{marginLeft:'35px', marginRight:'10px'}}
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
