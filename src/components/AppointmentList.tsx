import {
  Appointment,
  Dictionary,
  Patient,
  Practitioner,
} from 'interfaces/interfaces';
import { generateDictionary } from 'utils/module';
import { Appointments } from './ui/Appointments';

const AppointmentList = ({
  patientsList,
  practitionersList,
  appointmentList,
}) => {
  const displayAppointmentList = (appointments: [Appointment]) => {
    const practDico: Dictionary<Practitioner> = generateDictionary(
      practitionersList,
    ); // Need to be improve ok with a small list: lack of performance; add relational link in schema.prisma model
    const patientDico: Dictionary<Patient> = generateDictionary(patientsList); // Need to be improve ok with a small list : lack of performance; add relational link in schema.prisma model
    return (
      <Appointments
        appointments={appointments}
        practDico={practDico}
        patientDico={patientDico}
      />
    );
  };

  return (
    <article className="wrapperAppointmentList">
      {displayAppointmentList(appointmentList)}{' '}
    </article>
  );
};

export default AppointmentList;
