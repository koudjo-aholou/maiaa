interface Props {
  titleInfo: string;
  valueInfo?: string;
  children?: React.ReactNode;
  className?: string;
  dataTestid?: string;
}
export const Paragraph = ({
  titleInfo,
  valueInfo,
  children,
  className,
  dataTestid,
}: Props) => {
  return (
    <p>
      <span className={className} data-testid={dataTestid}>
        {titleInfo}
      </span>
      {valueInfo && <span data-testid={dataTestid}>{valueInfo}</span>}
      {children}
    </p>
  );
};
