<p align="center">
  <img src="./assets/demo.gif" alt="Wysiwyg demo" />
</p>

### Install

    yarn add @progressos/notion-like-editor
or

    npm install --save @progressos/notion-like-editor


### Use and Setup

```jsx
import { Editor } from '@progressos/notion-like-editor';
```

#### Params:

| Prop                  | Type                                           | Description                                                                                                                                                                              | Default                                                                                                                |
|-----------------------|------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| `editable`(optional)  | `boolean`                                      | This property is used to change the editor mode from "preview" to "edit" mode.                                                                                                                   | true                                                                                                                   |
| `mode`(optional)      | `light` or `dark`                              | This prop is used to change the editor theme palette.                                                                                                                                              | light                                                                                                                  |
| `defaultValue`(optional)        | `JSONContent` or `string`                      | The default value to use for the editor.                                                                                                                                                 | [`defaultEditorContent`](https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/default-content.tsx) |
| `onUpdate`            | `(editor: EditorType) => void` | A callback function that is called whenever the editor is updated | `() => {}`                                                                                                                   |
| `onUploadImage`       | `(file: File) => string or Promise<string>`    | A callback function that is called whenever the image upload      | `() => {}`                                                                                                                    |

## Tech Stack

- [Tiptap](https://tiptap.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Cal Sans](https://github.com/calcom/font)

## License

Licensed under the [MIT license](https://github.com/BuhayovA/@progressos/notion-like-editor/blob/main/LICENSE)
