export const UrlService = {
    param: key => {
        return new URL(window.location.href).searchParams.get(key)
    }
}