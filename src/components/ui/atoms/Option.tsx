interface Props {
  value: string;
  title: string;
}
export const Option = ({ value, title }: Props) => {
  return <option value={value}>{title}</option>;
};
