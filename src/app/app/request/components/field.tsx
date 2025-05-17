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
      <div className="flex flex-row gap-7">
        <p className="w-[50%] font-raleway">{fieldData.description}</p>
        <div className="w-[50%]">{children}</div>
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
