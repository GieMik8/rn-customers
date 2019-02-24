import _ from 'lodash'

import {
  ValidationType,
  ValidationMapType,
  ValidationTypes,
  Address,
} from '@/types'

// tslint:disable: max-line-length
class Validator {
  public isEmail = (value: any): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(value).toLowerCase())
  }

  public isString = (value: any): boolean => _.isString(value)

  public isNumber = (value: any): boolean => _.isFinite(+value)

  public isEmpty = (value: any): boolean => _.isEmpty(value)

  public minLength = (value: any, minLength: number): boolean =>
    value.length > minLength

  public maxLength = (value: any, maxLength: number): boolean =>
    value.length > maxLength

  private getValidated = (
    value: any,
    type: ValidationType,
    options: any
  ): true | string => {
    switch (type) {
      case 'email':
        if (this.isEmpty(value) || this.isEmail(value)) return true
        return 'Email is not valid'
      case 'required':
        if (!this.isEmpty(value)) return true
        return 'Field is required'
      case 'number':
        console.log(this.isEmpty(value), this.isNumber(value), value, +value)
        if (this.isEmpty(value) || this.isNumber(value)) return true
        return "This field's value must be a number"
      case 'text':
        if (this.isEmpty(value) || this.isString(value)) return true
        return "This field's value must be text"
      case 'max':
        if (this.isEmpty(value)) return true
        if (this.maxLength(value, options.maxLength)) {
          return true
        }
        return `Field\'s values is too long (${options.maxLength})`
      case 'min':
        if (this.isEmpty(value)) return true
        if (this.minLength(value, options.minLength)) {
          return true
        }
        return `Field\'s value is too short (${options.minLength})`
      default:
        return true
    }
  }

  public validateAddress(value: Address, required: boolean): true | string {
    let validated: string | true = true
    if (
      required &&
      this.isEmpty(value.street) &&
      this.isEmpty(value.city) &&
      this.isEmpty(value.houseNumber)
    ) {
      validated = 'Address is required'
    }
    return validated
  }

  public validateField(
    value: string,
    validations: ValidationTypes
  ): true | string {
    if (!validations) return true
    let validated: string | true = true
    for (const validation of validations) {
      let type: ValidationType = 'default'
      let options: ValidationMapType = { minLength: 0 }
      if (typeof validation !== 'object') {
        type = validation
      } else {
        if (validation.hasOwnProperty('minLength')) {
          type = 'min'
          options = validation
        }
        if (validation.hasOwnProperty('maxLength')) {
          type = 'max'
          options = validation
        }
      }
      validated = this.getValidated(value, type, options)
      if (typeof validated === 'string') break // Note: means not valid
    }
    return validated
  }
}

export default Validator
