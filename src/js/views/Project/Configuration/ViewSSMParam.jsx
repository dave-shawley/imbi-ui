import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { DescriptionList } from '../../../components/DescriptionList/DescriptionList'
import { Definition } from '../../../components/DescriptionList/Definition'
import { Toggle } from '../../../components/Form/Toggle'
import { DefinitionRow } from '../../../components/DescriptionList/DefinitionRow'

function ViewSSMParam({ param, showSecureStrings, onShowSecureStringsChange }) {
  const { t } = useTranslation()

  const allTypes = new Set(param.values.map((value) => value.type))
  const includesSecureString = allTypes.has('SecureString')
  const includesMultipleTypes = allTypes.size > 1
  const typeDisplay = includesMultipleTypes
    ? Array.from(allTypes).join(', ')
    : param.values[0].type

  return (
    <>
      <DescriptionList>
        <Definition term={t('common.name')}>{param.name}</Definition>
        <Definition term={t('common.type')}>{typeDisplay}</Definition>
      </DescriptionList>
      <div className="flex items-center justify-between mt-6 mb-3">
        <h1 className="text-xl font-medium text-gray-900">Values</h1>
        {includesSecureString && (
          <div className="flex items-center gap-1">
            <p>Show decrypted value</p>
            <Toggle
              onChange={(name, value) => onShowSecureStringsChange(value)}
              name="is-hidden"
              value={showSecureStrings}
            />
          </div>
        )}
      </div>

      <DescriptionList>
        {param.values
          .sort((a, b) => (a.environment > b.environment ? 1 : -1))
          .map(({ environment, value, type }, i) => {
            return (
              <DefinitionRow
                key={i}
                className="min-w-0 break-words font-mono"
                term={
                  includesMultipleTypes ? (
                    <>
                      {environment}
                      <br />
                      <i>{type}</i>
                    </>
                  ) : (
                    environment
                  )
                }>
                {type === 'String' || showSecureStrings ? value : '********'}
              </DefinitionRow>
            )
          })}
      </DescriptionList>
    </>
  )
}

ViewSSMParam.propTypes = {
  param: PropTypes.object,
  showSecureStrings: PropTypes.bool.isRequired,
  onShowSecureStringsChange: PropTypes.func.isRequired
}

export { ViewSSMParam }
