import type { StoryObj } from "@storybook/react-vite";
declare const meta: {
    title: string;
    component: import("react").FC<import("./index").EditorProps>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {};
    args: {};
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Defaul: Story;
