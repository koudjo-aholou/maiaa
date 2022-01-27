import { Availabilities, Practitioner } from 'interfaces/interfaces';
import { Label } from '../atoms/Label';

import DatePicker from 'react-datepicker';
import { ChoseAvailableHour } from './ChoseAvailableHour';
import { formatYearsMonthDate } from 'utils/date';

interface Props {
  monthsShown: number;
  titleLabel: string;
  register: any; // didn t find the type
  dateFormat: string;
  placeholderText: string;
  handleChangeDate: any; // didn t find the type...
  availabilities: [Availabilities];
  startCalendar: Date;
  practitionersList: [Practitioner];
  handleClickQuickAppointment: () => void;
  error: string;
}
export const ChosePractAvailabilities = ({
  availabilities,
  handleChangeDate,
  titleLabel,
  placeholderText,
  dateFormat,
  monthsShown,
  startCalendar,
  register,
  handleClickQuickAppointment,
  error,
}: Props) => {
  const isAvailable = (date: Date) => {
    const dateList = availabilities.map(
      ({ startDate }) => `${formatYearsMonthDate(new Date(startDate))}`,
    );
    return dateList.includes(`${formatYearsMonthDate(new Date(date))}`);
  };

  return (
    <div className="wrapperCol" data-testid="availabilitiesSelect">
      <Label title={titleLabel} />

      {availabilities && (
        <>
          <button
            className="spaceBott quickyBtn"
            onClick={handleClickQuickAppointment}
            data-testid="availabilitiesAsap"
          >
            ASAP
          </button>
          <span className="centerWrapper">OR</span>
          <DatePicker
            className="datePickerCustom"
            selected={startCalendar}
            onChange={(date) => handleChangeDate(date)}
            filterDate={isAvailable}
            placeholderText={placeholderText}
            dateFormat={dateFormat}
            monthsShown={monthsShown}
            customInput={
              <input
                data-testid="availabilitiesDatePicker"
                type="text"
                required
              />
            }
          />
          <ChoseAvailableHour
            register={register}
            titleLabel="Available Hour* :"
            defaultSelect="Select an Hour"
            availabilities={availabilities}
            startCalendar={startCalendar}
            error={error}
          />
        </>
      )}
    </div>
  );
};
