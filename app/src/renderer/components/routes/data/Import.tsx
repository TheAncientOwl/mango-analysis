import React from 'react';

import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useCache } from '@renderer/hooks/useCache';
import { useSnackbar } from '@renderer/hooks/useSnackbar';
import { useSwitch } from '@renderer/hooks/useSwitch';
import { useRequest, RequestState } from '@renderer/hooks/useRequest';

import { DoubleCheck } from '@renderer/components/DoubleCheck';
import { CircularPendingRequest } from '@renderer/components/CircularPendingRequest';

export const Import: React.FC = () => {
  const [importPath, setImportPath] = useCache<string | null>('import-path', null);
  const [doubleCheckSwitch, toggleDoubleCheck] = useSwitch(false);
  const dataRequest = useRequest();

  const snackbar = useSnackbar({
    title: 'Success',
    message: 'Data deleted!',
    severity: 'success',
    variant: 'filled',
  });

  const importData = async () => {
    const filePath = await window.electronAPI.showOpenCsvDialog();

    if (filePath === null) return;

    dataRequest.execute({ method: 'get', url: `/data/import/csv/${filePath}` }, () => {
      setImportPath(filePath);

      snackbar.setMessage('Data loaded!');
      snackbar.open();
    });
  };

  const cancelDeleteData = () => {
    toggleDoubleCheck();
  };

  const deleteData = () => {
    dataRequest.execute({ method: 'get', url: '/data/delete' }, () => {
      setImportPath(null);

      snackbar.setMessage('Data deleted!');
      snackbar.open();
    });
    toggleDoubleCheck();
  };

  return (
    <React.Fragment>
      <DoubleCheck
        open={doubleCheckSwitch}
        title='Double check'
        text={
          <React.Fragment>
            This action will{' '}
            <Box component='span' sx={{ color: 'error.main' }}>
              delete
            </Box>{' '}
            the data imported from <Box component='span' sx={{ color: 'info.main' }}>{`"${importPath}"`}</Box>
            <br />
            Are you sure?
          </React.Fragment>
        }
        onAccept={{
          title: 'Delete',
          execute: deleteData,
          buttonColor: 'error',
        }}
        onReject={{
          title: 'Cancel',
          execute: cancelDeleteData,
          buttonColor: 'info',
        }}
      />

      <Box sx={{ display: 'flex' }}>
        <Button
          onClick={importData}
          sx={{ mb: 2, mr: 2, display: 'block' }}
          variant='contained'
          size='medium'
          disableElevation>
          Search
        </Button>
        {dataRequest.state === RequestState.Pending && <CircularPendingRequest />}
      </Box>

      {importPath !== null && (
        <Stack direction='row' alignItems='center' spacing={1}>
          <IconButton sx={{ color: 'error.main' }} onClick={toggleDoubleCheck}>
            <DeleteIcon />
          </IconButton>
          <Typography variant='body2'>{importPath}</Typography>
        </Stack>
      )}

      {snackbar.element}

      <Box
        sx={{
          outline: '1px solid red',
          overflow: 'auto',
        }}>
        <Typography
          sx={{
            width: '1000px',
            // display: 'none',
          }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe tempora quidem magni, dolores distinctio fugit
          a ipsa! Iure repudiandae modi exercitationem molestias, vitae excepturi quaerat pariatur veniam. Fugiat
          nesciunt ab a repellendus deserunt, commodi labore pariatur voluptatibus molestiae ipsa ipsum rerum autem,
          facilis, officia corrupti reiciendis nemo numquam expedita atque optio libero id sunt. Ex labore quisquam, id
          voluptas accusantium earum. Repellat, cumque saepe! Adipisci neque, optio ex doloribus quo accusamus beatae
          ea? Nihil voluptates, rerum ea aspernatur nemo dignissimos odit iste deleniti? Necessitatibus, eos. Tempora
          unde architecto, aliquam blanditiis vel minus alias! Sapiente fugit vel assumenda veniam excepturi animi rerum
          dolorem exercitationem commodi fuga? Illum, accusamus rerum pariatur unde laboriosam expedita saepe, sequi
          voluptates distinctio eaque tenetur corrupti voluptatem iusto ducimus? Praesentium, aliquid iste. Itaque velit
          similique nam ut ex. Beatae aspernatur praesentium dicta illo inventore fugiat et ipsum maxime laboriosam
          similique libero cumque, nemo, vel consequuntur eligendi sed hic quos nihil in totam? Aut eaque commodi,
          doloremque, distinctio ducimus dicta a eveniet mollitia pariatur nulla minus iure dolore ratione, fuga ex
          minima incidunt nobis. Sit explicabo dolor dolorem totam tempora blanditiis magni vel, molestiae laborum.
          Voluptatibus neque repudiandae aspernatur nam cumque, quam saepe pariatur amet sunt, optio dicta dolorem sit
          officia. Quia, similique provident dolor explicabo excepturi rerum at amet, laudantium dignissimos nisi
          consequuntur culpa deserunt officia qui eligendi fugiat? Praesentium officiis repellendus sunt ratione non
          sint. Blanditiis natus, nulla suscipit doloribus temporibus odit eius vitae praesentium architecto sint maxime
          fugit, sit quae consequuntur magni eaque illum tenetur non. Eveniet enim molestias, assumenda iure sint
          minima? Earum doloremque quam reprehenderit ducimus ex porro culpa fugit animi, quae, eius sapiente eveniet
          officia, dolore neque corrupti! Iste, nulla minima? Sit laborum itaque ipsa amet, velit corporis quasi!
          Mollitia harum quisquam itaque consequatur pariatur quos explicabo saepe magnam quis! Quia natus placeat
          repudiandae provident quas molestias nesciunt, sed debitis illum itaque voluptatum facere optio suscipit
          accusamus, nemo voluptatem distinctio atque eaque quod repellat possimus vero vitae velit est. Eum nesciunt
          mollitia quos repudiandae modi voluptatibus? Commodi distinctio impedit nulla architecto, dolorem suscipit eum
          aperiam voluptate, nihil tempore repudiandae ipsam iure deserunt modi! Earum accusantium, quae molestiae quia
          praesentium omnis eveniet atque ratione corrupti, animi tenetur nihil, aliquid neque! Praesentium dolorum
          distinctio ipsum magnam eum enim at alias illum. Ullam, laboriosam. Et, repudiandae! Hic tempora impedit eius
          eligendi vel et necessitatibus, inventore reiciendis debitis quo ducimus atque possimus nostrum amet excepturi
          dicta quasi vitae omnis deserunt accusantium exercitationem veritatis nihil dolorem? Sunt voluptatibus
          architecto placeat, quibusdam dolores harum aliquam fuga, exercitationem, deserunt ullam distinctio. Incidunt
          aut ipsa eveniet sit quo error sed sapiente illum cum sunt et repellat, voluptatum eius accusamus debitis nam
          in officiis velit consectetur sequi asperiores libero dolorum. Repudiandae aliquid ut doloribus rerum. Ullam
          saepe distinctio cum dolorum at obcaecati consequuntur nihil, sit porro adipisci eius aspernatur minima
          excepturi magnam numquam voluptates. Deserunt accusamus consectetur nostrum libero illum fugiat mollitia qui
          culpa. At voluptate excepturi dolor dolores corrupti temporibus, minima, minus laboriosam amet velit ea
          corporis iusto. Repudiandae nihil similique incidunt dolor asperiores praesentium eum corporis quidem
          reiciendis ullam consectetur magni enim, ad soluta doloribus aliquid sunt atque quo mollitia eius quaerat
          porro reprehenderit. Aliquam at iure, magni culpa molestiae repudiandae hic animi facilis? Laudantium
          nesciunt, totam libero ipsum laboriosam ipsam quia. Nulla necessitatibus, facilis inventore dolores unde earum
          similique ipsum voluptate reprehenderit vero, adipisci sunt nam ratione minus, iste quod magnam. Eos iure est
          quasi, eaque quos doloribus quibusdam delectus earum laboriosam sint mollitia quo, nihil odit harum animi modi
          dolore accusamus reprehenderit maiores nam aspernatur magnam. Impedit nostrum quasi quisquam culpa, sit
          excepturi saepe quia aperiam, reiciendis, magnam nihil recusandae. Mollitia similique molestiae fugiat veniam
          natus, nihil eius quo consectetur explicabo laudantium consequatur iure quasi quae id laborum atque
          exercitationem ad? Reprehenderit libero quam iure ex esse possimus iste aliquam cupiditate vero asperiores,
          commodi cumque omnis vitae, quas deserunt ut dolorum ratione dicta sequi sint? Quis quidem aut minima animi
          asperiores soluta adipisci natus eligendi harum rerum, illum sapiente atque, consequuntur quaerat cumque iure
          voluptate accusamus ad ipsam eos? Nulla nam assumenda, tenetur aperiam, praesentium voluptatem et magnam
          asperiores repellendus cum corporis culpa debitis sapiente incidunt vero impedit quisquam fugit officiis qui
          atque illum omnis quo dolor minima? Facilis consectetur doloremque excepturi libero voluptate dignissimos
          repudiandae exercitationem nesciunt, blanditiis nostrum, minus rerum perspiciatis deleniti, tenetur corrupti
          nihil nisi ab dolorem reiciendis quasi iusto quam culpa voluptates molestiae. Dicta est dolorum quis esse
          facere laudantium quam saepe quia corporis cum harum eum, in odio natus, nostrum fugiat qui error laboriosam,
          illum accusantium! Hic vel, accusantium quisquam, iusto accusamus laboriosam voluptas odit sapiente ratione
          nemo reiciendis sunt velit minima nostrum beatae recusandae tenetur voluptatum. Eius fuga non omnis id, sint,
          deleniti sed nobis architecto, corporis ab voluptatibus. Unde obcaecati odit perferendis, eos earum natus vero
          quos consectetur eaque asperiores libero minus, laboriosam placeat ratione nostrum, maiores expedita. At porro
          quasi quaerat sed ad aliquid iusto suscipit labore. Ab hic molestias ad recusandae eos natus error sint sed
          dolorum sequi distinctio sapiente impedit, nisi tempore quis, illo aut autem officia? Sequi expedita sit saepe
          in ullam, nam iure quia nobis consequuntur repellat minima quis possimus obcaecati vel consequatur tempora.
          Fugit veritatis dolorem maiores voluptatem placeat dolorum laboriosam, corporis libero necessitatibus expedita
          architecto facilis enim laudantium magni, eum cupiditate eius vitae itaque eaque iure reiciendis eligendi
          adipisci. Incidunt nihil eveniet quas aut magni sequi tempora quos nemo. Harum nobis ipsam hic delectus enim
          sunt aperiam ad omnis temporibus perspiciatis aut consectetur eligendi dolorem consequatur debitis similique
          ea, vel deserunt fugiat. Aliquam vitae, ullam veniam laboriosam iste consectetur, blanditiis atque aut esse
          ipsa quisquam unde quod aperiam id molestias placeat deleniti. Non sunt dicta pariatur corrupti in tempora
          incidunt cupiditate similique neque, eum optio doloribus aspernatur itaque laboriosam a, delectus magni,
          exercitationem maiores perferendis. Excepturi temporibus inventore magnam a dolore. Deleniti quos sapiente non
          iusto obcaecati nulla et ea, excepturi laboriosam quasi? Molestiae mollitia labore odit ullam, quidem numquam
          praesentium nemo eaque esse doloremque voluptatibus perferendis culpa assumenda hic dolore, a consectetur?
        </Typography>
      </Box>
    </React.Fragment>
  );
};
