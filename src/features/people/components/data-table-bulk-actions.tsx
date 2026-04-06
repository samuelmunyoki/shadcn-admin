import { useState } from 'react';
import { type Table } from '@tanstack/react-table';
import { Trash2, UserX, UserCheck, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { sleep } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table';
import { type User } from '../data/schema';
import { UsersMultiDeleteDialog } from './people-multi-delete-dialog';













type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    const selectedpeople = selectedRows.map((row) => row.original as User)
    toast.promise(sleep(2000), {
      loading: `${status === 'active' ? 'Activating' : 'Deactivating'} people...`,
      success: () => {
        table.resetRowSelection()
        return `${status === 'active' ? 'Activated' : 'Deactivated'} ${selectedpeople.length} person${selectedpeople.length > 1 ? 's' : ''}`
      },
      error: `Error ${status === 'active' ? 'activating' : 'deactivating'} people`,
    })
    table.resetRowSelection()
  }

  const handleBulkInvite = () => {
    const selectedpeople = selectedRows.map((row) => row.original as User)
    toast.promise(sleep(2000), {
      loading: 'Inviting people...',
      success: () => {
        table.resetRowSelection()
        return `Invited ${selectedpeople.length} person${selectedpeople.length > 1 ? 's' : ''}`
      },
      error: 'Error inviting people',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='person'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleBulkInvite}
              className='size-8'
              aria-label='Invite selected people'
              title='Invite selected people'
            >
              <Mail />
              <span className='sr-only'>Invite selected people</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Invite selected people</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('active')}
              className='size-8'
              aria-label='Activate selected people'
              title='Activate selected people'
            >
              <UserCheck />
              <span className='sr-only'>Activate selected people</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Activate selected people</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('inactive')}
              className='size-8'
              aria-label='Deactivate selected people'
              title='Deactivate selected people'
            >
              <UserX />
              <span className='sr-only'>Deactivate selected people</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deactivate selected people</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Delete selected people'
              title='Delete selected people'
            >
              <Trash2 />
              <span className='sr-only'>Delete selected people</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected people</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <UsersMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
