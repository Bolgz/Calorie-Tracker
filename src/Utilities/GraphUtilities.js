export function populate(entry, weightObject) {
  const month = entry.date[3] + entry.date[4];
  let copyObject = weightObject;
  switch (month) {
    case "01":
      copyObject.January.push([entry.weight, entry.date]);
      break;
    case "02":
      copyObject.February.push([entry.weight, entry.date]);
      break;
    case "03":
      copyObject.March.push([entry.weight, entry.date]);
      break;
    case "04":
      copyObject.April.push([entry.weight, entry.date]);
      break;
    case "05":
      copyObject.May.push([entry.weight, entry.date]);
      break;
    case "06":
      copyObject.June.push([entry.weight, entry.date]);
      break;
    case "07":
      copyObject.July.push([entry.weight, entry.date]);
      break;
    case "08":
      copyObject.August.push([entry.weight, entry.date]);
      break;
    case "09":
      copyObject.September.push([entry.weight, entry.date]);
      break;
    case "10":
      copyObject.October.push([entry.weight, entry.date]);
      break;
    case "11":
      copyObject.November.push([entry.weight, entry.date]);
      break;
    case "12":
      copyObject.December.push([entry.weight, entry.date]);
      break;
    default:
      break;
  }
  return copyObject;
}

function findIndexOfWeightDate(weightListMonth, weightDateInput) {
  for (var index = 0; index < weightListMonth.length; index++) {
    if (
      weightListMonth[index][0] === weightDateInput[0] &&
      weightListMonth[index][1] === weightDateInput[1]
    ) {
      return index; // Found it
    }
  }
  return false; // Not found
}

export function removeWeightEntry(weight, date, weightObject) {
  const month = date[3] + date[4];
  let copyObject = weightObject;
  let index = 0;
  switch (month) {
    case "01":
      index = findIndexOfWeightDate(copyObject.January, [weight, date]);
      if (index !== -1) {
        copyObject.January.splice(index, 1);
      }
      break;
    case "02":
      index = findIndexOfWeightDate(copyObject.February, [weight, date]);
      if (index !== -1) {
        copyObject.February.splice(index, 1);
      }
      break;
    case "03":
      index = findIndexOfWeightDate(copyObject.March, [weight, date]);
      if (index !== -1) {
        copyObject.March.splice(index, 1);
      }
      break;
    case "04":
      index = findIndexOfWeightDate(copyObject.April, [weight, date]);
      if (index !== -1) {
        copyObject.April.splice(index, 1);
      }
      break;
    case "05":
      index = findIndexOfWeightDate(copyObject.May, [weight, date]);
      if (index !== -1) {
        copyObject.May.splice(index, 1);
      }
      break;
    case "06":
      index = findIndexOfWeightDate(copyObject.June, [weight, date]);
      if (index !== -1) {
        copyObject.JaJunenuary.splice(index, 1);
      }
      break;
    case "07":
      index = findIndexOfWeightDate(copyObject.July, [weight, date]);
      if (index !== -1) {
        copyObject.July.splice(index, 1);
      }
      break;
    case "08":
      index = findIndexOfWeightDate(copyObject.August, [weight, date]);
      if (index !== -1) {
        copyObject.August.splice(index, 1);
      }
      break;
    case "09":
      index = findIndexOfWeightDate(copyObject.September, [weight, date]);
      if (index !== -1) {
        copyObject.September.splice(index, 1);
      }
      break;
    case "10":
      index = findIndexOfWeightDate(copyObject.October, [weight, date]);
      if (index !== -1) {
        copyObject.October.splice(index, 1);
      }
      break;
    case "11":
      index = findIndexOfWeightDate(copyObject.November, [weight, date]);
      if (index !== -1) {
        copyObject.November.splice(index, 1);
      }
      break;
    case "12":
      index = findIndexOfWeightDate(copyObject.December, [weight, date]);
      if (index !== -1) {
        copyObject.December.splice(index, 1);
      }
      break;
    default:
      break;
  }
  return copyObject;
}
