import React, { Component } from 'react'
import { View, Icon, Button, Text } from 'native-base'

import Utils from '@/utils'
import { FormField, FormValue, Address, FormPurpose, Field } from '@/types'
import { TextField } from '@/ui'
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native'

type Props = {
  onSubmit: (value: FormValue) => void
  fields: FormValue
  purpose: FormPurpose
}

type FormMap = {
  [field: string]: FormField<any>
}

export default class Form extends Component<Props, FormMap> {
  constructor(props: Props) {
    super(props)
    this.state = this.makeForm(props.fields)
  }

  makeForm = (fields: FormValue): FormMap => {
    const form: FormMap = {}
    for (const field of fields) {
      form[field.name] = new FormField<Address | string>(
        field.value,
        field.type,
        field.name,
        field.validation,
        field.placeholder
      )
    }
    return form
  }

  submit = () => {
    this.props.onSubmit(this.getFormValue(this.state))
  }

  getFormValue = (form: FormMap): FormValue => {
    const formValue: FormValue = []
    Object.keys(form).map((fieldName: string) => {
      const field: FormField<string | Address> = form[fieldName]
      formValue.push(
        new Field<string | Address>(field.name, field.value, field.type)
      )
    })
    return formValue
  }

  inputHandler = (fieldName: string) => (text: string) =>
    this.onInput(fieldName, text)

  blurHandler = (fieldName: string) => (
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) => this.onBlur(fieldName, event)

  getHasError = (validated: string | true) => {
    let hasError: string | false = false
    if (typeof validated === 'string') {
      hasError = validated
    }
    return hasError
  }

  onInput = (field: string, text: string) => {
    const hasError = this.getHasError(
      Utils.validateField(text, this.state[field].validation)
    )
    this.setState({
      [field]: {
        ...this.state[field],
        hasError,
        value: text,
        touched: true,
      },
    })
  }

  onBlur = (
    field: string,
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    event.persist()
    const hasError = this.getHasError(
      Utils.validateField(event.nativeEvent.text, this.state[field].validation)
    )
    this.setState({
      [field]: {
        ...this.state[field],
        hasError,
        blurred: true,
        touched: true,
        value: event.nativeEvent.text,
      },
    })
  }

  openLocation = (event: GestureResponderEvent) => {
    event.persist()
    event.stopPropagation()
  }

  renderLocationField = (fieldName: string) => {
    const field: FormField<Address> = this.state[fieldName]
    const location = []
    if (field.value.city) location.push(field.value.city)
    if (field.value.street) location.push(field.value.city)
    if (field.value.houseNumber) location.push(field.value.houseNumber)
    if (field.value.zipCode) location.push(field.value.zipCode)
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.openLocation}>
        <View pointerEvents="none">
          <TextField
            touched={field.touched}
            blurred={field.blurred}
            value={location.join(', ')}
            hasError={field.hasError}
            placeholder={field.placeholder}
          />
        </View>
      </TouchableOpacity>
    )
  }

  renderTextField = (fieldName: string) => {
    const field: FormField<string> = this.state[fieldName]
    return (
      <TextField
        onBlur={this.blurHandler(field.name)}
        touched={field.touched}
        blurred={field.blurred}
        value={field.value}
        hasError={field.hasError}
        placeholder={field.placeholder}
        onInput={this.inputHandler(field.name)}
      />
    )
  }

  renderFields = () =>
    Object.keys(this.state).map(fieldName => (
      <View key={fieldName}>
        {this.state[fieldName].type === 'location'
          ? this.renderLocationField(fieldName)
          : this.renderTextField(fieldName)}
      </View>
    ))

  render() {
    console.log('[Form] render')
    return (
      <View>
        {this.renderFields()}
        <Button
          onPress={this.submit}
          iconRight
          block
          large
          style={{ marginTop: 30, backgroundColor: '#495057' }}
        >
          <Text>{this.props.purpose === 'create' ? 'Create' : 'Edit'}</Text>
          <Icon
            style={{ fontSize: 15 }}
            type="FontAwesome5"
            name={this.props.purpose === 'create' ? 'plus' : 'check-circle'}
          />
        </Button>
      </View>
    )
  }
}
