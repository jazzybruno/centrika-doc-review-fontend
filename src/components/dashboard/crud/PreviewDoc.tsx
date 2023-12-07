import ViewDocumentPdf from "@/pages/view-document";
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
    <div className="flex w-full h-full overflow-auto">
      {fileExt !== "pdf" ? (
        <DocViewer
          documents={[
            {
              uri: `${baseUrl}/documents/download/${doc?.fileUrl}`,
              fileType: fileExt,
            },
          ]}
          pluginRenderers={[...DocViewerRenderers, MSDocRenderer]}
        />
      ) : (
        <ViewDocumentPdf
          fileUrl={`${baseUrl}/documents/download/${doc?.fileUrl}`}
        />
      )}
    </div>
  );
};

export default PreviewDoc;
