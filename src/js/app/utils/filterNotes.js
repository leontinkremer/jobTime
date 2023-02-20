import { filterVariables } from "../config.json";

const filterNotes = (filterBy, arr) => {
  const { ALL_NOTES, ARCHIVED_NOTES, CURRENT_NOTES, FAVORED_NOTES, OLD_NOTES } =
    filterVariables;

  // today
  const today = new Date();

  // yesterday
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdaysDay = yesterday.getDate().toString().padStart(2, "0"); // 06
  const yesterdaysMonth = (yesterday.getMonth() + 1)
    .toString()
    .padStart(2, "0"); // 2
  const yesterdaysYear = yesterday.getFullYear().toString(); // 2023

  const minTimestampYesterday = Date.parse(
    `${yesterdaysYear}-${yesterdaysMonth}-${yesterdaysDay}T00:00:00`
  );

  // show all notes
  if (filterBy === ALL_NOTES) {
    const filteredArr = arr;
    return filteredArr;
  }

  // only notes that was shown within last two days
  if (filterBy === CURRENT_NOTES) {
    const filteredArr = arr.filter(
      (note) => note.last_view_at * 1000 > minTimestampYesterday
    );
    return filteredArr;
  }

  // only notes that were not shown within last two days or never shown
  if (filterBy === OLD_NOTES) {
    const filteredArr = arr.filter(
      (note) =>
        note.last_view_at === 0 ||
        note.last_view_at * 1000 < minTimestampYesterday
    );
    return filteredArr;
  }

  // only notes that are archived
  if (filterBy === ARCHIVED_NOTES) {
    const filteredArr = arr.filter((note) => !!note.archived_at);
    return filteredArr;
  }

  // only notes that are favorites
  if (filterBy === FAVORED_NOTES) {
    const filteredArr = arr.filter((note) => note.favorite);
    return filteredArr;
  }
};

export default filterNotes;
