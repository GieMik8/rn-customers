import _ from 'lodash'

import { ValidationType, ValidationMapType, ValidationTypes } from '@/types'

// tslint:disable: max-line-length
class Validator {
  public isEmail = (value: any): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(value).toLowerCase())
  }

  public isString = (value: any): boolean => _.isString(value)

  public isNumber = (value: any): boolean => _.isNumber(value)

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
        if (this.isEmail(value)) return true
        return 'Email is not valid'
      case 'required':
        if (!this.isEmpty(value)) return true
        return 'Field is required'
      case 'number':
        if (this.isNumber(value)) return true
        return 'Value must be a number'
      case 'text':
        if (this.isString(value)) return true
        return 'Value must be text'
      case 'max':
        if (this.maxLength(value, options.maxLength)) return true
        return `Value must be less than ${options.maxLength} less`
      case 'min':
        if (this.minLength(value, options.minLength)) return true
        return `Value must be more than ${options.minLength}`
      default:
        return true
    }
  }

  public validateField(
    value: string,
    validations: ValidationTypes
  ): true | string {
    if (!validations) return true
    let validated: string | true = true
    for (const validation of validations) {
      let type: ValidationType = 'default'
      let option: ValidationMapType = { minLength: 0 }
      if (typeof validation !== 'object') {
        type = validation
      } else {
        if (validation.hasOwnProperty('minLength')) {
          type = 'min'
          option = validation
        }
        if (validation.hasOwnProperty('maxLength')) {
          type = 'max'
          option = validation
        }
      }
      validated = this.getValidated(value, type, option)
      if (typeof validated === 'string') break // Note: means not valid
    }
    return validated
  }
}

export default Validator
