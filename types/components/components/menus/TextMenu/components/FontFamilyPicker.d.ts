import React from 'react';
export type FontFamilyPickerProps = {
    onChange: (value: string) => void;
    value: string;
};
export declare const FontFamilyPicker: ({ onChange, value, }: FontFamilyPickerProps) => React.JSX.Element;
