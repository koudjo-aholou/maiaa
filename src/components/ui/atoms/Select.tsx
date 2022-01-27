import { Option } from './Option';

interface Props {
  register: any; //didn t find the type
  children?: React.ReactNode;
  defaultSelect: string;
}
export const Select = ({ register, children, defaultSelect }: Props) => {
  return (
    <select {...register}>
      <Option value="" title={defaultSelect} />
      {children}
    </select>
  );
};
