export const APP_HAS_ERRORED = "APP_HAS_ERRORED";
export function appHasErrored(hasErrored) {
  return {
    type: APP_HAS_ERRORED,
    hasErrored: hasErrored
  };
}

export const APP_IS_LOADING = "APP_IS_LOADING";
export function appIsLoading(isLoading) {
  return {
    type: APP_IS_LOADING,
    isLoading: isLoading
  };
}

export const FETCH_SUCCESS = "FETCH_SUCCESS";
export function fetchSuccess(json) {
  return {
    type: FETCH_SUCCESS,
    entries: json
  };
}

export function fetchData() {
  return dispatch => {
    dispatch(appIsLoading(true));
    let init = { method: "GET" };
    fetch("/api", init)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(appIsLoading(false));
        return response.json();
      })
      .then(response => dispatch(fetchSuccess(response)))
      .catch(() => dispatch(appHasErrored(true)));
  };
}
