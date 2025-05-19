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
    <>
      <h5>{fieldData.name}</h5>
      <div className="grid grid-cols-2 gap-7">
        <p className="col-start-1 col-end-2 font-raleway">{fieldData.description}</p>
        <div className="col-start-2 col-end-3">{children}</div>
      </div>
    </>
  );
}

export function InformationField({ fieldData }: { fieldData: fieldDataInterface }) {
  return (
    <div className="py-4">
      <h5>{fieldData.name}</h5>
      <p className="w-full font-raleway">{fieldData.description}</p>
    </div>
  );
}
