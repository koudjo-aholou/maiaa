import { Practitioner } from 'interfaces/interfaces';
import { Error } from '../atoms/Error';
import { Label } from '../atoms/Label';
import { Select } from '../atoms/Select';
import { Practionners } from '../Practitioners';

interface Props {
  register: any; // didn t fin the type
  defaultSelect: string;
  titleLabel: string;
  practitionersList: [Practitioner];
  error: string;
}
export const ChosePractitioner = ({
  register,
  titleLabel,
  defaultSelect,
  practitionersList,
  error,
}: Props) => {
  const displayPractitioners = (list: [Practitioner]) => (
    <Practionners practitioners={list} />
  );

  return (
    <div className="wrapperCol" data-testid="practitionerSelect">
      <Label title={titleLabel}>
        <Select register={register} defaultSelect={defaultSelect}>
          {practitionersList && displayPractitioners(practitionersList)}
        </Select>
        {error && <Error title="Mandatory Field*" />}
      </Label>
    </div>
  );
};
