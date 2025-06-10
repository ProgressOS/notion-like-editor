import { DragEvent } from "react";
export declare const useUploader: ({ onUploaded, onUpload, }: {
    onUpload: (file: File) => string | Promise<string>;
    onUploaded: (url: string) => void;
}) => {
    loading: boolean;
    uploadFile: (file: File) => Promise<void>;
};
export declare const useFileUpload: () => {
    ref: import("react").RefObject<HTMLInputElement>;
    handleUploadClick: () => void;
};
export declare const useDropZone: ({ uploader, }: {
    uploader: (file: File) => void;
}) => {
    isDragging: boolean;
    draggedInside: boolean;
    onDragEnter: () => void;
    onDragLeave: () => void;
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
};
