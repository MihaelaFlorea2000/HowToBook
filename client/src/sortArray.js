export function sortBooksByTitle(array) {
  array.sort(function (a, b) {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
}

export function sortShelvesByName(array) {
  array.sort(function (a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
}

export function sortReadsByDateFinished(array) {
  array.sort(function (a, b) {
    if (a.dateStarted < b.dateStarted) return -1;
    if (a.dateStarted > b.dateStarted) return 1;
    return 0;
  });
}