import { Patient } from 'interfaces/interfaces';

interface PatientsProps {
  patients: [Patient];
}
export const Patients = ({ patients }: PatientsProps) => {
  return (
    <>
      {!patients ? (
        <option value="">No value</option>
      ) : (
        patients?.map(({ id, lastName, firstName }) => (
          <option value={id} key={id}>{`${firstName} ${lastName}`}</option>
        ))
      )}
    </>
  );
};
