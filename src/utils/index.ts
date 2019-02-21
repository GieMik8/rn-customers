import Validator from './validator'
class Utils extends Validator {
  public genId: () => string = () =>
    `id_${Math.random()
      .toString(36)
      .substr(2, 16)}`

  public capitalize = (text: string): string =>
    `${text[0].toUpperCase()}${text.slice(1)}`
}

export default new Utils()
