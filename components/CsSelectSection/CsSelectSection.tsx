import { AppLayout, Form, Pagination } from 'components';
import React from 'react';
import { CitizenScientist } from 'types/citizenScientist';
import { useStake } from 'hooks';
import { CsOption } from './CsOption';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { label: string; cs: CitizenScientist[] };

// eslint-disable-next-line no-empty-pattern
export const CsSelectSection = ({ label, cs }: Props) => {
  const [page, setPage] = React.useState(1);

  return (
    <AppLayout.Section className='mt-11' label={label}>
      <Form.CheckboxGroup name='selectedCs'>
        <div className='grid grid-cols-6 gap-3'>
          {cs.slice((page - 1) * 18, page * 18).map((cs: CitizenScientist) => (
            <CsOption data={cs} key={cs.id} />
          ))}
        </div>
      </Form.CheckboxGroup>
      <Pagination
        onChange={setPage}
        page={page}
        totalRecordCount={cs.length}
        className='flex justify-center mt-12'
        perPage={18}
      />
    </AppLayout.Section>
  );
};
