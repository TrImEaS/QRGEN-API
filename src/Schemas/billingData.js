import z from 'zod'

const billingDataSchema = z.object({
  company: z.enum(['technologyline', 'linetechnology', 'tline', 'realcolor', 'power']),
  
  client: z.number().int().positive(),
  
  numberBill: z.number().int().positive(),

  createDate: z.string().refine((dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(dateString)
  }, { message: 'La fecha y el tiempo deben tener el formato "YYYY-MM-DDTHH:MM:SS"' }),

  verificationNumber: z.number().int().positive(),

  link: z.string({
    required_error: 'Se requiere el link/url',
    invalid_type_error: 'El link debe de ser de tipo string/texto'
  }),

  user: z.string({
    required_error: 'Se requiere user',
    invalid_type_error: 'El user debe de ser de tipo string/texto'
  })
})

export default function validateBillingData(object) {
  return billingDataSchema.safeParse(object)
}

export function validatePartialBillingData(input) {
  return billingDataSchema.partial().safeParse(input)
}

// id                  Int       @id @default(autoincrement())
// company             String
// client              Int
// numberBill          Int
// createDate          DateTime
// checkDate           DateTime
// verificationNumber  Int
// link                String