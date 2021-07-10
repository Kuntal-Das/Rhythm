export const getQueryString = (q) => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    return params.get(q)
}
