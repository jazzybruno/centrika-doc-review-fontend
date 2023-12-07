import useGet from "@/hooks/useGet";
import { IDocument } from "@/types/base.type";
import { Input, Select } from "@mantine/core";
import React, { FC, useEffect } from "react";
import { AiFillFilePdf } from "react-icons/ai";

interface Props {
  doc?: IDocument | null;
}

const Predecessors: FC<Props> = ({ doc }) => {
  const [relationType, setRelationType] = React.useState<
    "VERSION" | "RESPONSE" | null
  >(null);
  const {
    data: predecessors,
    loading: loadingPredecessors,
    get,
  } = useGet<IDocument[]>(
    `/document-relations/predecessors/${doc?.id}/${relationType}`,
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
      {loadingPredecessors && <div className=" text-center">Loading...</div>}
      {predecessors &&
        predecessors.map((predecessor) => (
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-x-2">
              <button className=" p-2 rounded-full bg-gray-100">
                <AiFillFilePdf size={25} className="text-red-500 " />
              </button>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">{predecessor?.title}</p>
                <p className="text-xs text-primary">{predecessor?.status}</p>
                <p className="text-sm opacity-80">
                  By {predecessor.createdBy?.username}
                </p>
              </div>
            </div>
          </div>
        ))}
      {!loadingPredecessors &&
        (predecessors?.length === 0 || !predecessors) && (
          <div className="text-center">No predecessors</div>
        )}
    </div>
  );
};

export default Predecessors;
