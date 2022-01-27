interface Props {
  children?: React.ReactNode;
}
export const Section = ({ children }: Props) => {
  return <section>{children}</section>;
};
