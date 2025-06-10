import React from "react";
export declare const ImageUploader: ({ onUploaded, onUpload, }: {
    onUpload: (file: File) => string | Promise<string>;
    onUploaded: (url: string) => void;
}) => React.JSX.Element;
export default ImageUploader;
