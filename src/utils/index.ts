export const genId: Function = (): string =>
  `id_${Math.random()
    .toString(36)
    .substr(2, 16)}`
