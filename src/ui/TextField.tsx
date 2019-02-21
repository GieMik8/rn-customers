import React, { FunctionComponent, Fragment } from 'react'
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'
import { Icon, Item, Input, Text } from 'native-base'

type Props = {
  onInput?: (text: string) => void
  value: string
  hasError: false | string
  touched: boolean
  blurred: boolean
  placeholder: string
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void
}

const textField: FunctionComponent<Props> = ({
  onInput,
  value,
  placeholder,
  hasError,
  touched,
  blurred,
  onBlur,
}) => {
  console.log('[Field] render')
  return (
    <Fragment>
      <Item
        error={touched && blurred && !!hasError}
        success={blurred && !hasError}
      >
        <Input
          value={value}
          onBlur={onBlur}
          onChangeText={onInput}
          placeholder={placeholder}
        />
        {blurred && touched && (
          <Icon
            type="FontAwesome5"
            name={hasError ? 'exclamation-circle' : 'check-circle'}
          />
        )}
      </Item>
      <Text style={{ marginTop: 5, textAlign: 'right', color: 'red' }}>
        {(touched && blurred && hasError) || ' '}
      </Text>
    </Fragment>
  )
}

export default textField
