interface fieldDataInterface {
  name: string;
  description: string;
}

export function Section({
  sectionData,
  children,
}: {
  sectionData: fieldDataInterface;
  children: React.ReactNode;
}) {
  return (
    <>
      <h4>{sectionData.name}</h4>
      <div className="py-4">
        <p className="col-start-1 col-end-2 font-raleway">{sectionData.description}</p>
        <div className="col-start-2 col-end-3 pt-4">{children}</div>
      </div>
    </>
  );
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
      <p>{fieldData.name}</p>
      <h5 className="w-full font-raleway">{fieldData.description}</h5>
    </div>
  );
}
