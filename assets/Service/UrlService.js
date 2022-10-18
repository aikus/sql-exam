export const UrlService = {
    param: key => {
        return document.location.hash.match('\#'+key+'=(.+)&?')[1];
    }
}