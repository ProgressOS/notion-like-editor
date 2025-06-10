import type { Meta, StoryObj } from "@storybook/react";
import { EditorProps } from "./index";
declare const meta: Meta<EditorProps>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Light: Story;
export declare const Dark: Story;
export declare const ReadOnly: Story;
