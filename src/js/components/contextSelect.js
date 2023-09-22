import { setContextOptions } from '../_functions'

export const initContextSelects = (currentTempl) => {
  const contextSelectWrappers =
    currentTempl?.querySelectorAll('.context-select__wrapper') ??
    document?.querySelectorAll('.context-select__wrapper')

  if (contextSelectWrappers) {
    contextSelectWrappers.forEach((wrapper) => {
      const contextSelect = wrapper.querySelector('.context-select')
      const contextContentSelect = wrapper.querySelector('.context-content')
      const contextContentState = Array.from(
        contextContentSelect.querySelectorAll('option'),
      )

      setContextOptions('1', contextContentSelect, contextContentState)

      contextSelect.addEventListener('input', (e) => {
        const currentValue = e.currentTarget.value
        setContextOptions(
          currentValue,
          contextContentSelect,
          contextContentState,
        )
      })
    })
  }
}

initContextSelects()
