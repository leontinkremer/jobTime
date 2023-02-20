function getDate(datePart, timestmp) {
  const date = new Date(timestmp * 1000);

  if (datePart === "dayAsNumber") {
    const day = date.getDate();
    return day;
  }

  if (datePart === "monthAsTextShort") {
    const month = date.toLocaleString("de-de", { month: "short" });
    return month;
  }
}

export default getDate;
