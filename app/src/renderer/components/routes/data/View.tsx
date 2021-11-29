import React, { useEffect, useRef, useState } from 'react';

import { Box } from '@mui/material';
// eslint-disable-next-line import/named
import { DataGrid, GridColDef, GridRowModel } from '@mui/x-data-grid';

import { useLocalStorage } from '@renderer/hooks/useLocalStorage';
import { RequestState, useRequest } from '@renderer/hooks/useRequest';

interface Data {
  columns: GridColDef[];
  rows: GridRowModel[];
}

export const View: React.FC = () => {
  const [pageIndex, setPageIndex] = useLocalStorage('data-page-index', 1);
  const [pageSize, setPageSize] = useLocalStorage('data-page-size', 25);
  const request = useRequest();
  const [data, setData] = useState<Data>({ columns: [], rows: [] });
  const rowsCountRef = useRef<number>(0);

  useEffect(() => {
    request.execute({ method: 'get', url: '/data/rows-count' }, res => {
      rowsCountRef.current = res.data.rowscount;
    });
  }, []);

  useEffect(() => {
    let active = true;

    request.execute({ method: 'get', url: `/data/page/${pageIndex}/page-size/${pageSize}` }, res => {
      if ('dataframe' in res.data) {
        if (!active) return;

        const dataFrame = JSON.parse(res.data.dataframe);
        setData({
          columns: (dataFrame.columns as string[]).map(column => ({ field: column })),
          rows: dataFrame.rows,
        });
      }
    });

    return () => {
      active = false;
    };
  }, [pageIndex, pageSize]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <DataGrid
        rows={data.rows}
        columns={data.columns}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[25, 50, 75, 100]}
        rowCount={rowsCountRef.current}
        paginationMode='server'
        onPageChange={newPage => setPageIndex(newPage + 1)}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        loading={request.state === RequestState.Pending}
      />
    </Box>
  );
};
