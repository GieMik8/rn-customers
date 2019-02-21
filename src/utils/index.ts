class Utils {
  public genId: () => string = () =>
    `id_${Math.random()
      .toString(36)
      .substr(2, 16)}`
}

export default new Utils()
