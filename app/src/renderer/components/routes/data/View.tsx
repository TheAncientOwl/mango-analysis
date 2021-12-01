import React, { useEffect, useRef, useState } from 'react';

import { Box } from '@mui/material';
import { DataFrame, DataConfig } from '@renderer/components/DataFrame';

import { useLocalStorage } from '@renderer/hooks/useLocalStorage';
import { useRequest } from '@renderer/hooks/useRequest';

export const View: React.FC = () => {
  const [pageIndex, setPageIndex] = useLocalStorage('data-page-index', 1);
  const [pageSize, setPageSize] = useLocalStorage('data-page-size', 25);
  const request = useRequest();
  const [data, setData] = useState<DataConfig>({ columns: [], rows: [] });
  const rowsCountRef = useRef<number>(0);

  useEffect(() => {
    request.execute({ method: 'get', url: '/data/rows-count' }, res => {
      rowsCountRef.current = res.data.rowscount;
    });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    let active = true;

    request.execute({ method: 'get', url: `/data/page/${pageIndex}/page-size/${pageSize}` }, res => {
      if (!active) return;

      if ('dataframe' in res.data) {
        const dataFrame = res.data.dataframe;
        // console.log(dataFrame);
        setData(dataFrame);
        // const dataFrame = JSON.parse(res.data.dataframe);
        // console.log(dataFrame);
        // setData({
        //   columns: (dataFrame.columns as string[]).map(column => ({ label: column })),
        //   rows: dataFrame.rows,
        // });
      }
    });

    return () => {
      active = false;
    };
  }, [pageIndex, pageSize]);

  return (
    <Box sx={{ height: '75vh' }}>
      <DataFrame data={data} />
    </Box>
  );
};
