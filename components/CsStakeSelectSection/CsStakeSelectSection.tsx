import { AppLayout, Form, Pagination } from 'components';
import React from 'react';
import { CitizenScientist } from 'types/citizenScientist';
import { useStake } from 'hooks';
import { CsOption } from './CsOption';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const CsStakeSelectSection = ({}: Props) => {
  const [page, setPage] = React.useState(1);

  const {
    data: { unstakedCs },
  } = useStake();

  return (
    <AppLayout.Section className='mt-11' label='PLEASE SELECT Citizen scientist to stake'>
      <Form.CheckboxGroup name='selectedCs'>
        <div className='grid grid-cols-6 gap-3'>
          {unstakedCs.slice((page - 1) * 18, page * 18).map((cs: CitizenScientist) => (
            <CsOption data={cs} key={cs.id} />
          ))}
        </div>
      </Form.CheckboxGroup>
      <Pagination
        onChange={setPage}
        page={page}
        totalRecordCount={unstakedCs.length}
        className='flex justify-center mt-12'
        perPage={18}
      />
    </AppLayout.Section>
  );
};
