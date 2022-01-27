interface Props {
  title: string;
  children?: React.ReactNode;
}
export const Label = ({ title, children }: Props) => {
  return (
    <label>
      {title}
      {children}
    </label>
  );
};
