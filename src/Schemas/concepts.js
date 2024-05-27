const z = require ('zod')

const conceptsSchema = z.object({
  name: z.string({
    required_error: 'Se requiere nombre de concepto',
    invalid_type_error: 'El nombre debe de ser de tipo string/texto'
  }),
  type: z.enum(['REMUNERATIVO', 'NO REMUNERATIVO', 'DESCUENTO']),
  active: z.number().default(1)
})

function validateConcept(object) {
  return conceptsSchema.safeParse(object)
}

function validatePartialConcept(input) {
  return conceptsSchema.partial().safeParse(input)
}

module.exports = { validateConcept, validatePartialConcept }
