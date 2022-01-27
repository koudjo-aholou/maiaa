import { Practitioner } from 'interfaces/interfaces';

interface PractitionerProps {
  practitioners: [Practitioner];
}
export const Practionners = ({ practitioners }: PractitionerProps) => {
  return (
    <>
      {!practitioners ? (
        <option value="">No value</option>
      ) : (
        practitioners?.map(({ id, lastName, firstName, speciality }) => (
          <option
            value={id}
            key={id}
          >{`${firstName} ${lastName} - ${speciality}`}</option>
        ))
      )}
    </>
  );
};
