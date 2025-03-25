interface fieldDataInterface {
  name: string;
  description: string;
}

export function Field({
  fieldData,
  children,
}: {
  fieldData: fieldDataInterface;
  children: React.ReactNode;
}) {
  return (
    <div className="grid w-full grid-cols-4 gap-x-7 gap-y-4">
      <h5 className="row-start-1">{fieldData.name}</h5>
      <p className="col-start-1 col-end-3 row-start-2 font-raleway">
        {fieldData.description}
      </p>
      <div className="col-start-3 col-end-5 row-start-2">{children}</div>
    </div>
  );
}
