import React, { Component } from 'react'
import { View, Icon, Button, Text, Toast } from 'native-base'
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableOpacity,
  Keyboard,
} from 'react-native'
import { withNavigation, NavigationScreenProps } from 'react-navigation'

import Utils from '@/utils'
import { FormField, FormValue, Address, Field } from '@/types'
import { TextField } from '@/ui'

type ComponentProps = {
  onSubmit: (value: FormValue) => void
  fields: FormValue
  submitButtonProps?: any
  submitButtonIcon?: string
  submitButtonText?: string
}

type FormMap = {
  [field: string]: FormField<any>
}

type Props = ComponentProps & NavigationScreenProps

class Form extends Component<Props, FormMap> {
  constructor(props: Props) {
    super(props)
    this.state = this.makeForm(props.fields)
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState(this.makeForm(nextProps.fields))
    return false
  }

  makeForm = (fields: FormValue): FormMap => {
    const form: FormMap = {}
    Object.keys(fields).map(fieldName => {
      const field = fields[fieldName]
      form[fieldName] = new FormField<Address | string>(
        field.value,
        field.type,
        field.name,
        field.validation,
        field.placeholder
      )
    })
    return form
  }

  validateForm = (form: FormMap): boolean => {
    let formHasErrors = false
    Object.keys(this.state).map((fieldName: string) => {
      const field: FormField<string | Address> = this.state[fieldName]
      let hasError: string | false = false
      if (field.value && typeof field.value !== 'string') {
        hasError = this.getHasError(
          Utils.validateAddress(
            field.value,
            field.validation.includes('required')
          )
        )
      } else {
        hasError = this.getHasError(
          Utils.validateField(field.value, field.validation)
        )
      }
      formHasErrors = formHasErrors || !!hasError
      form[fieldName] = {
        ...field,
        hasError,
        touched: true,
        blurred: true,
      }
    })
    if (formHasErrors) this.setState({ ...form })
    return !formHasErrors
  }

  validateAddress = (value: Address): string | true => {
    return 'Address is falsy'
  }

  submit = () => {
    Keyboard.dismiss()
    const formIsValid = this.validateForm(this.state)
    if (formIsValid) {
      return this.props.onSubmit(this.getFormValue(this.state))
    }
    Toast.show({
      text: 'Please make sure form is filled correctly',
      type: 'danger',
      duration: 3000,
    })
  }

  getFormValue = (form: FormMap): FormValue => {
    const formValue: FormValue = {}
    Object.keys(form).map((fieldName: string) => {
      const field: FormField<string | Address> = form[fieldName]
      formValue[fieldName] = new Field<string | Address>(
        field.name,
        field.value,
        field.type
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

  onInput = (field: string, text: string, quietly?: boolean) => {
    if (quietly) {
      return this.setState({ [field]: { ...this.state[field], value: text } })
    }
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
      Utils.validateField(this.state[field].value, this.state[field].validation)
    )
    this.setState({
      [field]: {
        ...this.state[field],
        hasError,
        blurred: true,
        touched: true,
      },
    })
  }

  onAddressConfirm = (address: Address) => {
    this.setState({ address: { ...this.state.address, value: address } })
  }

  openLocation = (address: Address) => {
    this.props.navigation.navigate('LocationModal', {
      address,
      onSubmitAddress: this.onAddressConfirm,
    })
  }

  renderAddressField = (fieldName: string) => {
    const field: FormField<Address> = this.state[fieldName]
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.openLocation.bind(this, field.value)}
      >
        <View pointerEvents="none">
          <TextField
            touched={field.touched}
            blurred={field.blurred}
            value={field.value.readable}
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
          ? this.renderAddressField(fieldName)
          : this.renderTextField(fieldName)}
      </View>
    ))

  render() {
    console.log('[Form] render')
    const {
      submitButtonProps,
      submitButtonIcon = 'check-circle',
      submitButtonText = 'Submit',
    } = this.props
    return (
      <View style={{ marginBottom: 50 }}>
        {this.renderFields()}
        <Button
          onPress={this.submit}
          iconLeft
          block
          large
          style={{ marginTop: 30 }}
          {...submitButtonProps}
        >
          <Icon
            style={{ fontSize: 15 }}
            type="FontAwesome5"
            name={submitButtonIcon}
          />
          <Text>{submitButtonText}</Text>
        </Button>
      </View>
    )
  }
}

export default withNavigation(Form)
