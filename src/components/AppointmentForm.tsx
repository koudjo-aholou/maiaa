import { useState } from 'react';
import { useForm } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';
import useSWR, { useSWRConfig } from 'swr';

import {
  Appointment,
  AppointmentDTO,
  Availabilities,
  DTOPostAppointment,
} from 'interfaces/interfaces';

import { ChosePatient } from './ui/molecules/ChosePatient';
import { ChosePractitioner } from './ui/molecules/ChosePractitioner';
import { ChosePractAvailabilities } from './ui/molecules/ChosePractAvailabilities';
import { fetcher, isUniqueStartDate } from 'utils/module';

const AppointmentForm = ({
  patientsList,
  practitionersList,
  handleRefresh,
}) => {
  const [startCalendar, setStartCalendar] = useState(null);

  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { data: availabilities, error: _errAvail } = useSWR<[Availabilities]>(
    watch('practitionerId')
      ? `/api/availabilities?practitionerId=${watch('practitionerId')}`
      : null,
    fetcher,
  );

  const { data: appointments } = useSWR<[Appointment]>('/api/appointments');

  const onSubmit = async (dataSubmitForm: AppointmentDTO) => {
    const newAppointment: Appointment = DTOPostAppointment(dataSubmitForm);
    if (isUniqueStartDate(newAppointment, appointments)) {
      handleRefresh(true);
      mutate('/api/appointments', [...appointments, newAppointment], false);
      await fetch('/api/appointments', {
        method: 'POST',
        body: JSON.stringify(newAppointment),
      });
      handleRefresh(false);
    } else {
      alert('Something wrong, the availability is not available');
      handleRefresh(false);
    }
  };

  const handleChangeDate = (date: Date) => {
    setStartCalendar(date);
  };

  return (
    <article className="container">
      <h2>Book a consultation for a patient</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="appointmentFormWrapper"
      >
        <ChosePatient
          titleLabel="Patient Name* :"
          register={register('patientId', { required: true })}
          defaultSelect="Select a patient"
          patientsList={patientsList}
          error={errors?.patientId}
        />
        <ChosePractitioner
          titleLabel="Practionner Name* :"
          register={register('practitionerId', { required: true })}
          defaultSelect="Select a practitioner"
          practitionersList={practitionersList}
          error={errors?.practitionerId}
        />

        {watch('practitionerId') && (
          <>
            <ChosePractAvailabilities
              availabilities={availabilities}
              titleLabel="Practicioner's Availabilities* :"
              placeholderText="Click to select a date*"
              dateFormat="MMMM d, yyyy"
              practitionersList={practitionersList}
              monthsShown={4}
              handleChangeDate={handleChangeDate}
              startCalendar={startCalendar}
              register={register('availableHour', { required: true })}
              handleClickQuickAppointment={() =>
                setStartCalendar(new Date(availabilities[0].startDate))
              }
              error={errors?.availableHour}
            />
          </>
        )}
        <div className="centerWrapper">
          <input
            className="space submitBtnn"
            type="submit"
            value="Send"
            data-testid="submitForm"
          />
        </div>
      </form>
    </article>
  );
};

export default AppointmentForm;
