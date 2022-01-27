import AppointmentForm from 'components/AppointmentForm';
import AppointmentList from 'components/AppointmentList';
import { LoadingImg } from 'components/ui/atoms/Loading';
import { Appointment, Patient, Practitioner } from 'interfaces/interfaces';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from 'utils/module';

const TechnicalTest = () => {
  const [loading, setLoading] = useState(true);
  const { data: patientsList, error: _errPat } = useSWR<[Patient]>(
    '/api/patients',
    fetcher,
  );
  const { data: practitionersList, error: _errPract } = useSWR<[Practitioner]>(
    '/api/practitioners',
    fetcher,
  );

  const { data: appointmentList, error: _errAppointmentList } = useSWR<
    [Appointment]
  >('/api/appointments', fetcher);

  const freeze = () =>
    setTimeout(() => {
      setLoading(false);
    }, 500);

  useEffect(() => {
    freeze();
  }, [loading]);

  const handleRefresh = () => {
    setLoading(true);
  };
  useEffect(() => {
    if (loading) {
      mutate('/api/appointments'); // refreshList Appointment
    }
  }, [loading]);

  return (
    <main className="container">
      {!patientsList || !practitionersList || !appointmentList || loading ? (
        <LoadingImg src="https://www.maiia.com/static/images/og-image.jpg" />
      ) : (
        <>
          <article className="leftWrapper">
            <AppointmentForm
              patientsList={patientsList}
              practitionersList={practitionersList}
              handleRefresh={handleRefresh}
            />
          </article>
          <aside className="appointmentContainer">
            <AppointmentList
              patientsList={patientsList}
              practitionersList={practitionersList}
              appointmentList={appointmentList}
            />
          </aside>
        </>
      )}
    </main>
  );
};

TechnicalTest.pageTitle = 'Technical test - Koudjo AHOLOU';

export default TechnicalTest;
