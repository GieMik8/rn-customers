import React, { Component } from 'react'

import { Form } from '@/containers'
import { Customer, FormValue, Field, Address, FormPurpose } from '@/types'
import utils from '@/utils'

type Props = {
  customer?: Customer
  onSubmit: (value: Customer) => void
}

type State = {
  customer: Customer
  initialForm: FormValue
  purpose: FormPurpose
}

export default class CustomerForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const initialCustomer = props.customer || new Customer()
    this.state = {
      purpose: props.customer ? 'edit' : 'create',
      customer: initialCustomer,
      initialForm: {
        name: new Field<string>(
          'name',
          initialCustomer.name,
          'text',
          ['required', 'text', { minLength: 3 }],
          'Name'
        ),
        surname: new Field<string>(
          'surname',
          initialCustomer.surname,
          'text',
          ['required', 'text', { minLength: 3 }],
          'Surname'
        ),
        email: new Field<string>(
          'email',
          initialCustomer.email,
          'text',
          ['required', 'email', { minLength: 3 }],
          'Email'
        ),
        address: new Field<Address>(
          'address',
          initialCustomer.address,
          'location',
          [],
          'Address'
        ),
      },
    }
  }

  submit = (form: FormValue) => {
    const map: any = {}
    Object.keys(form).forEach((fieldName: string) => {
      map[fieldName] = form[fieldName].value
    })
    this.props.onSubmit(
      new Customer(
        this.state.customer.id || utils.genId(),
        map.name,
        map.surname,
        map.email,
        map.address
      )
    )
  }

  render() {
    return (
      <Form
        purpose={this.state.purpose}
        fields={this.state.initialForm}
        onSubmit={this.submit}
      />
    )
  }
}
