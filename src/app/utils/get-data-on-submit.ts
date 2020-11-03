import { Validation } from 'app/utils/Validation'
import { sanitize } from 'app/utils/sanitize'

export const getDataOnSubmit = (
  validation: Validation,
  elem: string
): { status: boolean; data?: Record<string, string> } => {
  const form = document.querySelector(`#${elem}`)

  if (validation.checkAllInputs()) {
    const data = Array.from(form.querySelectorAll('input') as NodeListOf<HTMLInputElement>).reduce(
      (acc: Record<string, string>, curr: HTMLInputElement) => {
        acc[curr.name] = sanitize(curr.value)

        return acc
      },
      {}
    )

    return { status: true, data }
  }

  return { status: false }
}
