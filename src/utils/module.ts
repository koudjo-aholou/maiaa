import {
  Availabilities,
  Practitioner,
  Patient,
  Appointment,
} from 'interfaces/interfaces';
import isEqual from 'date-fns/isEqual';
import { formatYearsMonthDate } from './date';
export const filterAvailabilitiesChoseByUser = (
  rawAvailabilities: [Availabilities],
  selected: Date,
) => {
  const resp = rawAvailabilities?.filter(({ startDate }) => {
    const start: string = formatYearsMonthDate(startDate);
    const end: string = formatYearsMonthDate(selected);
    return isEqual(new Date(start), new Date(end));
  });
  return resp;
};

export const generateDictionary = (list: Array<Practitioner | Patient>) => {
  const dictionary = {};
  list?.forEach(({ id }, i) => {
    dictionary[id] = list[i];
  });
  return dictionary;
};

export const isUniqueStartDate = (
  availabilityA: Appointment,
  existingAvailabilities: [Appointment],
) => {
  return existingAvailabilities.every(({ startDate, practitionerId }) => {
    if (
      availabilityA.startDate !== startDate &&
      availabilityA.practitionerId !== practitionerId
    ) {
      return true;
    }
    return false;
  });
};

export const fetcher = (url) => fetch(url).then((res) => res.json());
