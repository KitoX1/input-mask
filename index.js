let phoneInput = null

function getFocus(elem) {
  phoneInput = elem.childNodes[1]
  phoneInput.focus()

  addMask()
}

function addMask () {
  const getInputNumbersValue = function (input) {
    return input.innerText.replace(/\D/g, '')
  }

  const onPhonePaste = function (e) {
    const input = e.target,
    inputNumbersValue = getInputNumbersValue(input)
    const pasted = e.clipboardData || window.clipboardData

    if (pasted) {
      const pastedText = pasted.getData('Text')

      if (/\D/g.test(pastedText)) {
        input.innerText = inputNumbersValue
        return
      }
    }
  }

  const onPhoneInput = function (e) {
    const input = e.target
    const range = document.createRange()
    const selection = window.getSelection()

    let inputNumbersValue = getInputNumbersValue(input)
    let formattedInputValue = ""

    if (!inputNumbersValue) {
      return input.innerText = ""
    }

    if (inputNumbersValue[0] === '7') {
      formattedInputValue = "+7 "

      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4)
      }

      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7)
      }

      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9)
      }

      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11)
      }
    } else {
      formattedInputValue = '+7 (' + inputNumbersValue.substring(0, 16)
    }

    input.innerText = formattedInputValue

    range.setStart(input, 1)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  phoneInput.addEventListener('input', onPhoneInput, false)
  phoneInput.addEventListener('paste', onPhonePaste, false)
}