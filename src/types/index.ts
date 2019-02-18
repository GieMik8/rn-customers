export type Adress = {
  city: string
  street: string
  houseNumber: string
  zipCode?: string
}

export type Customer = {
  id: string
  name: string
  surname: string
  email: string
  adress?: Adress
}
