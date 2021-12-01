import React, { useEffect, useRef, useState } from 'react';

import { Box } from '@mui/material';
import { DataFrame, DataConfig } from '@renderer/components/DataFrame';

import { useCache } from '@renderer/hooks/useCache';
import { RequestState, useRequest } from '@renderer/hooks/useRequest';

export const View: React.FC = () => {
  const [pageIndex, setPageIndex] = useCache('data-page-index', 1);
  const [pageSize, setPageSize] = useCache('data-page-size', 25);
  const request = useRequest();
  const [data, setData] = useState<DataConfig>({ columns: [], rows: [], totalRows: 0 });

  useEffect(() => {
    let active = true;

    request.execute({ method: 'get', url: `/data/page/${pageIndex}/page-size/${pageSize}` }, res => {
      if (!active) return;

      if ('dataframe' in res.data) {
        const dataFrame = res.data.dataframe;
        setData(dataFrame);
      }
    });

    return () => {
      active = false;
    };
  }, [pageIndex, pageSize]);

  return (
    <Box sx={{ height: '75vh' }}>
      <DataFrame
        loading={request.state === RequestState.Pending}
        currentData={data}
        currentPage={pageIndex}
        rowsPerPage={pageSize}
        onPageChange={newPageIndex => setPageIndex(newPageIndex)}
        onPageSizeChange={newPageSize => {
          setPageSize(newPageSize);
          setPageIndex(0);
        }}
      />
    </Box>
  );
};
