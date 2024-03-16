import { NumericFormat } from 'react-number-format'

interface AmountFormatProps {
  value: number
  decimalScale?: number
  renderText?: (value: string) => React.ReactNode
}

function AmountFormat({ value, renderText, decimalScale }: AmountFormatProps) {
  return (
    <NumericFormat
      displayType={'text'}
      value={value}
      decimalScale={decimalScale}
      allowNegative={false}
      thousandSeparator="."
      decimalSeparator=","
      renderText={renderText}
    />
  )
}

AmountFormat.defaultProps = {
  decimalScale: 0,
}

export default AmountFormat
