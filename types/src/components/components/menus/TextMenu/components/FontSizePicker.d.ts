import React from 'react';
export type FontSizePickerProps = {
    onChange: (value: string) => void;
    value: string;
};
export declare const FontSizePicker: ({ onChange, value }: FontSizePickerProps) => React.JSX.Element;
