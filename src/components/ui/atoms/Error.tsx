interface Props {
  title: string;
}
export const Error = ({ title }: Props) => {
  return <span className="errorText">{title}</span>;
};
