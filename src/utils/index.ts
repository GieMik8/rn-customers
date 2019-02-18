export const genId: Function = (): string =>
  `id-${Math.random()
    .toString(36)
    .substr(2, 16)}`