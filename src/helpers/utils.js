// check field is empty
const hasWhiteSpacesOnly = val => {
  return val.replace(/\s/g, '').length || 'Field is empty';
}


const urlIsValid = val => {
  // const regex  = ("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)");
  const res = val.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  // return regex.match(val) || 'Invalid URL'
  if (res === null)
    return false
  else
    return true
}

export default {
  hasWhiteSpacesOnly
}
