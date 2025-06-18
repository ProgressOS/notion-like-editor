import { Editor } from '@tiptap/react'

import { Figcaption, HorizontalRule, Link, CodeBlock } from '@/extensions'
import TagAutocomplete from '@/extensions/CustomNodes/TagAutocomplete'
import { KpiChain } from '@/extensions/CustomNodes/KpiChain'
import { Metric } from '@/extensions/CustomNodes/Metric'
import { Playbook } from '@/extensions/CustomNodes/Playbook'

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node

  while (container && !['TD', 'TH'].includes(container.tagName)) {
    container = container.parentElement!
  }

  const gripColumn = container && container.querySelector && container.querySelector('a.grip-column.selected')
  const gripRow = container && container.querySelector && container.querySelector('a.grip-row.selected')

  if (gripColumn || gripRow) {
    return true
  }

  return false
}

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
  const customNodes = [
    HorizontalRule.name,
    CodeBlock.name,
    Link.name,
    Figcaption.name,
    TagAutocomplete.name,
    KpiChain.name,
    Metric.name,
    Playbook.name,
  ]

  return customNodes.some(type => editor.isActive(type)) || isTableGripSelected(node)
}

export default isCustomNodeSelected
