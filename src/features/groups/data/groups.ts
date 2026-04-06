import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(67890)

export const groups = Array.from({ length: 500 }, () => {
  const name = faker.company.name().toString()
  return {
    id: faker.string.uuid(),
    name,
    email: faker.internet.email({ allowSpecialCharacters: false }).toLocaleLowerCase(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    status: faker.helpers.arrayElement([
      'active',
      'inactive',
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
