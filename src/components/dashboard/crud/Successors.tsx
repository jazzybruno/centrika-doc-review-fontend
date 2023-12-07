import useGet from "@/hooks/useGet";
import { IDocument } from "@/types/base.type";
import { Input, Select } from "@mantine/core";
import React, { FC, useEffect } from "react";
import { AiFillFilePdf } from "react-icons/ai";

interface Props {
  doc?: IDocument | null;
}

const Successors: FC<Props> = ({ doc }) => {
  const [relationType, setRelationType] = React.useState<
    "VERSION" | "RESPONSE" | null
  >(null);
  const {
    data: successors,
    loading: loadingSuccessors,
    get,
  } = useGet<IDocument[]>(
    `/document-relations/successors/${doc?.id}/${relationType}`,
    {
      defaultData: [],
      onMount: false,
    }
  );

  useEffect(() => {
    if (!doc?.id || !relationType) return;
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc?.id, relationType]);

  return (
    <div className="flex flex-col gap-y-2">
      <Input.Wrapper label="Relation Type">
        <Select
          data={[
            { value: "VERSION", label: "Version" },
            { value: "RESPONSE", label: "Response" },
          ]}
          value={relationType}
          onChange={(e) => {
            if (!e) return;
            setRelationType(e as any);
          }}
        />
      </Input.Wrapper>
      {loadingSuccessors && <div className=" text-center">Loading...</div>}
      {successors &&
        successors.map((successor) => (
          <div key={successor.id} className="flex w-full justify-between">
            <div className="flex items-center gap-x-2">
              <button className=" p-2 rounded-full bg-gray-100">
                <AiFillFilePdf size={25} className="text-red-500 " />
              </button>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">{successor?.title}</p>
                <p className="text-xs text-primary">{successor?.status}</p>
                <p className="text-sm opacity-80">
                  By {successor.createdBy?.username}
                </p>
              </div>
            </div>
          </div>
        ))}
      {!loadingSuccessors && (successors?.length === 0 || !successors) && (
        <div className="text-center">No Successors</div>
      )}
    </div>
  );
};

export default Successors;
