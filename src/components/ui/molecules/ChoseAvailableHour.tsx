import { Availabilities } from 'interfaces/interfaces';
import { formatYearsMonthDate } from 'utils/date';
import { filterAvailabilitiesChoseByUser } from 'utils/module';
import { Error } from '../atoms/Error';
import { Label } from '../atoms/Label';
import { Option } from '../atoms/Option';
import { Select } from '../atoms/Select';

interface Props {
  register: any; // didn t find the type
  defaultSelect: string;
  titleLabel: string;
  availabilities: [Availabilities];
  startCalendar: Date;
  error: string;
}
export const ChoseAvailableHour = ({
  register,
  titleLabel,
  defaultSelect,
  availabilities,
  startCalendar,
  error,
}: Props) => {
  const displayAvailabilities = (
    rawAvailabilities: [Availabilities],
    selected: Date,
  ) => {
    const availabilitiesChoseByUser: Array<Availabilities> = filterAvailabilitiesChoseByUser(
      rawAvailabilities,
      selected,
    );
    return availabilitiesChoseByUser.length < 1 ? (
      <Option value="" title="No value" />
    ) : (
      availabilitiesChoseByUser?.map(({ id, startDate, endDate }) => {
        const object = { startDate, endDate };
        return (
          <Option
            value={JSON.stringify(object)}
            key={id}
            title={`${formatYearsMonthDate(
              startDate,
              'HHMM',
            )} - ${formatYearsMonthDate(endDate, 'HHMM')} `}
          />
        );
      })
    );
  };

  return (
    <div className="wrapperCol" data-testid="availabilitiesHourSelect">
      <Label title={titleLabel}>
        <Select register={register} defaultSelect={defaultSelect}>
          {displayAvailabilities(availabilities, startCalendar)}
        </Select>
        {error && <Error title="Mandatory Field*" />}
      </Label>
    </div>
  );
};
