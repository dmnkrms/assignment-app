15.times do
  Company.create({
    name: Faker::Company.name,
    address: Faker::Address.street_address,
    city: Faker::Address.city,
    country: Faker::Address.country
  })
end