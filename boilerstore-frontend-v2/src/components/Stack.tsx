const Stack: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = (props: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={`Stack ${props.className ?? ""}`}>{props.children}</div>
  );
};

export default Stack;
