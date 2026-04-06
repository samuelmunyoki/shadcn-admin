import { z } from 'zod'

const GroupStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
])
export type GroupStatus = z.infer<typeof GroupStatusSchema>


const _groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: GroupStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Group = z.infer<typeof _groupSchema>
