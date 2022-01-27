export interface Dictionary<T> {
  [Key: string]: T;
}
export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
}

export interface Practitioner {
  id: number;
  firstName: string;
  lastName: string;
  speciality: string;
}

export interface AvailableHourForm {
  startDate: string;
  endDate: string;
}

export interface Availabilities {
  id: number;
  practitionerId: number;
  startDate: Date;
  endDate: Date;
}

export interface Appointment {
  patientId: string;
  id?: number;
  practitionerId: string;
  startDate: Date;
  endDate: Date;
}

export interface AppointmentDTO {
  patientId: string;
  practitionerId: string;
  availableHour: string;
}

export const DTOPostAppointment = ({
  availableHour,
  patientId,
  practitionerId,
}: AppointmentDTO) => {
  const { startDate, endDate } = JSON.parse(availableHour);
  return {
    patientId: patientId,
    practitionerId: practitionerId,
    startDate,
    endDate,
  };
};
