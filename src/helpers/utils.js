// check field is empty
const hasWhiteSpacesOnly = val => {
  return val.replace(/\s/g, '').length || 'Field is empty';
}

export default {
  hasWhiteSpacesOnly
}
