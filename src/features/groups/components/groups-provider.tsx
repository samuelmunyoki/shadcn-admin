import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Group } from '../data/schema'

type GroupsDialogType =  'add' | 'edit' | 'delete'

type GroupsContextType = {
  open: GroupsDialogType | null
  setOpen: (str: GroupsDialogType | null) => void
  currentRow: Group | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Group | null>>
}

const GroupsContext = React.createContext<GroupsContextType | null>(null)

export function GroupsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<GroupsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Group | null>(null)

  return (
    <GroupsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </GroupsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGroups = () => {
  const groupsContext = React.useContext(GroupsContext)

  if (!groupsContext) {
    throw new Error('useGroups has to be used within <GroupsContext>')
  }

  return groupsContext
}
