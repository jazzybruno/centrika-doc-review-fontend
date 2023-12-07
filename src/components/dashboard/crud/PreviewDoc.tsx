import { IDocument } from "@/types/base.type";
import { baseUrl } from "@/utils/fetcher";
import DocViewer, {
  DocViewerRenderers,
  MSDocRenderer,
} from "@cyntler/react-doc-viewer";

interface Props {
  doc: IDocument | null;
}

const PreviewDoc = ({ doc }: Props) => {
  const fileExt = doc?.fileUrl?.split(".").pop();
  return (
    <div className="flex w-full h-full">
      <DocViewer
        documents={[
          {
            uri: `${baseUrl}/documents/download/${doc?.fileUrl}`,
            fileType: fileExt,
          },
        ]}
        pluginRenderers={[...DocViewerRenderers, MSDocRenderer]}
      />
    </div>
  );
};

export default PreviewDoc;
