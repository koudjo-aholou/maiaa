import {
  Appointment,
  Dictionary,
  Patient,
  Practitioner,
} from 'interfaces/interfaces';
import { formatYearsMonthDate } from 'utils/date';
import { Paragraph } from './atoms/Paragraph';
import { Section } from './Section';

interface AppointmentsProps {
  appointments: [Appointment];
  patientDico: Dictionary<Patient>;
  practDico: Dictionary<Practitioner>;
}
export const Appointments = ({
  appointments,
  practDico,
  patientDico,
}: AppointmentsProps) => {
  return (
    <div data-testid="appointmentList">
      {appointments &&
        appointments
          ?.reverse()
          ?.map(({ startDate, endDate, patientId, practitionerId }) => (
            <Section key={`${practitionerId}-${startDate} `}>
              <div className="wrapperBlock">
                <Paragraph
                  className="label"
                  titleInfo={practDico[practitionerId]?.speciality}
                  dataTestid="appointmentListPractSpe"
                />
                <Paragraph
                  className="label"
                  titleInfo={`${practDico[practitionerId]?.firstName} ${practDico[practitionerId]?.lastName}`}
                  dataTestid="appointmentListPractName"
                />
              </div>
              <div className="wrapperBlock">
                <Paragraph
                  titleInfo="Date of appointment :"
                  valueInfo={formatYearsMonthDate(startDate)}
                  dataTestid="appointmentListDate"
                />

                <Paragraph
                  titleInfo="Hours :"
                  valueInfo={`${formatYearsMonthDate(
                    startDate,
                    'HHMM',
                  )} - ${formatYearsMonthDate(endDate, 'HHMM')}`}
                  dataTestid="appointmentListHours"
                />
              </div>

              <div className="wrapperBlock space">
                <Paragraph
                  titleInfo="Patient :"
                  valueInfo={`${patientDico[patientId]?.firstName} ${patientDico[patientId]?.lastName}`}
                  dataTestid="appointmentListPatientName"
                />
              </div>
            </Section>
          ))}
    </div>
  );
};
