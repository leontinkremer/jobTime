function getLastViewIndicator(timestampPast) {
  // timestamp or past

  const timestampPastMs = timestampPast * 1000;

  // today
  const today = new Date();
  const todaysTimestamp = Date.parse(today); //
  const todaysDay = today.getDate().toString().padStart(2, "0"); // 06
  const todaysMonth = (today.getMonth() + 1).toString().padStart(2, "0"); // 2
  const todaysYear = today.getFullYear().toString(); // 2023

  const minTimestampToday = Date.parse(
    `${todaysYear}-${todaysMonth}-${todaysDay}T00:00:00`
  );
  const maxTimestampToday = Date.parse(
    `${todaysYear}-${todaysMonth}-${todaysDay}T23:59:59`
  );

  // yesterday
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdaysTimestamp = Date.parse(yesterday); //
  const yesterdaysDay = yesterday.getDate().toString().padStart(2, "0"); // 06
  const yesterdaysMonth = (yesterday.getMonth() + 1)
    .toString()
    .padStart(2, "0"); // 2
  const yesterdaysYear = yesterday.getFullYear().toString(); // 2023

  const minTimestampYesterday = Date.parse(
    `${yesterdaysYear}-${yesterdaysMonth}-${yesterdaysDay}T00:00:00`
  );
  const maxTimestampYesterday = Date.parse(
    `${yesterdaysYear}-${yesterdaysMonth}-${yesterdaysDay}T23:59:59`
  );

  if (
    timestampPastMs > minTimestampToday &&
    timestampPastMs < maxTimestampToday
  ) {
    return "Heute";
  }

  if (
    timestampPastMs > minTimestampYesterday &&
    timestampPastMs < maxTimestampYesterday
  ) {
    return "Gestern";
  }

  if (timestampPast === 0) {
    return "Nie";
  }

  if (timestampPast < minTimestampYesterday) {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const newDate = new Date(timestampPastMs).toLocaleString("de-DE", options);
    return `Am ${newDate}`;
  }
}

export default getLastViewIndicator;
