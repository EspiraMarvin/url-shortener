// check field is empty
const hasWhiteSpacesOnly = val => {
  return val.replace(/\s/g, '').length || 'Field is empty';
}

const thumbStyle = {
    right: '4px',
    borderRadius: '5px',
    backgroundColor: '#027be3',
    width: '5px',
    opacity: 0.75
}

const barStyle = {
  right: '2px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '9px',
  opacity: 0.2
}

export default {
  hasWhiteSpacesOnly,
  thumbStyle,
  barStyle
}
