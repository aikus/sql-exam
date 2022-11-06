export const searchParam = {
  get: (param) => {
    return new URL(window.location.href).searchParams.get(param)
  }
}