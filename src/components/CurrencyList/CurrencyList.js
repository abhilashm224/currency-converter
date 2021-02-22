import React from 'react'
import PropTypes from 'prop-types'

const CurrencyList = ({ data }) => {
  return (
    <table>
      <tr>
        <th>Currency</th>
        <th>Exchange Rates</th>
      </tr>
      {Object.keys(data).map(key =>
        <tr key={key}>
          <td>{key}</td>
          <td>{data[key]}</td>
        </tr>
      )}
    </table>
  )
}

CurrencyList.propTypes = {
  data: PropTypes.object.isRequired
}

export default CurrencyList