import React from 'react';
import { AgGridReact } from 'ag-grid-react';

// styles
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './Table.css';
import Loading from '../../common/Loading/Loading';

function Table({ className, title, rowData, columnDefs, paginationPageSize, children }) {
  const hasData = rowData.length > 0;
  return (
    <div className={className}>
      <header className="Table__header">
        <h3 className="Table__title Title">{title}</h3>
        {children}
      </header>
      {hasData ? (
        <div className="ag-theme-balham">
          <AgGridReact
            pagination={true}
            paginationPageSize={paginationPageSize}
            suppressPaginationPanel={false}
            columnDefs={columnDefs}
            rowData={rowData}
          />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Table;
