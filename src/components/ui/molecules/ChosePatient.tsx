import { Patient } from 'interfaces/interfaces';
import { Error } from '../atoms/Error';
import { Label } from '../atoms/Label';
import { Select } from '../atoms/Select';
import { Patients } from '../Patients';

interface Props {
  register: any; //didn t find the type
  defaultSelect: string;
  titleLabel: string;
  patientsList: [Patient];
  error: string;
}
export const ChosePatient = ({
  register,
  titleLabel,
  defaultSelect,
  patientsList,
  error,
}: Props) => {
  const displayPatients = (list: [Patient]) => <Patients patients={list} />;

  return (
    <div className="wrapperCol" data-testid="patientSelect">
      <Label title={titleLabel}>
        {error && <Error title="Mandatory Field*" />}
      </Label>
      <Select register={register} defaultSelect={defaultSelect}>
        {patientsList && displayPatients(patientsList)}
      </Select>
    </div>
  );
};
