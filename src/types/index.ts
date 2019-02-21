import Utils from '@/utils'

export class Address {
  city: string
  street: string
  houseNumber: string
  zipCode?: string
  constructor(
    city: string = '',
    street: string = '',
    houseNumber: string = '',
    zipCode: string = ''
  ) {
    this.city = city
    this.street = street
    this.houseNumber = houseNumber
    this.zipCode = zipCode
  }
}

export class Customer {
  id: string
  name: string
  surname: string
  email: string
  address: Address
  constructor(
    id?: string,
    name?: string,
    surname?: string,
    email?: string,
    address?: Address
  ) {
    this.id = id || Utils.genId()
    this.name = name || ''
    this.surname = surname || ''
    this.email = email || ''
    this.address = address || new Address()
  }
}

export type FieldType = 'text' | 'select' | 'location' | 'textarea'

export class Field<T> {
  name: string
  value: T
  type: FieldType
  validation: ValidationTypes
  placeholder: string
  constructor(
    name: string,
    value: T,
    type: FieldType,
    validation?: ValidationTypes,
    placeholder?: string
  ) {
    this.name = name
    this.value = value
    this.type = type
    this.validation = validation || []
    this.placeholder = placeholder || Utils.capitalize(name)
  }
}

export class FormField<T> {
  name: string
  value: T
  type: FieldType
  validation: ValidationTypes
  placeholder: string
  touched: boolean
  blurred: boolean
  hasError: false | string
  constructor(
    value: T,
    type: FieldType,
    name: string,
    validation: ValidationTypes,
    placeholder?: string
  ) {
    this.value = value
    this.validation = validation
    this.type = type
    this.name = name
    this.placeholder = placeholder || Utils.capitalize(name)
    this.touched = false
    this.blurred = false
    this.hasError = false
  }
}

export type FormValue = Array<Field<string | Address>>

export type ValidationMapType = { minLength: number } | { maxLength: number }

export type FormPurpose = 'create' | 'edit'

export type ValidationType =
  | 'email'
  | 'text'
  | 'number'
  | 'required'
  | 'max'
  | 'min'
  | 'default'

export type ValidationTypes = Array<ValidationType | ValidationMapType>
