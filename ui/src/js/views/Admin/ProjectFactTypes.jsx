import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CRUD, Error } from '../../components'
import { FetchContext } from '../../contexts'
import { fetchProjectTypes } from '../../settings'
import { jsonSchema } from '../../schema/ProjectFactType'
import { ulidAsUUID } from '../../ulid'

export function ProjectFactTypes() {
  const fetch = useContext(FetchContext)
  const [errorMessage, setErrorMessage] = useState(null)
  const [projectTypes, setProjectTypes] = useState(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (projectTypes === null) {
      fetchProjectTypes(
        fetch,
        true,
        (result) => {
          setProjectTypes(result)
        },
        (error) => {
          setErrorMessage(error)
        }
      )
    }
  }, [projectTypes])

  return (
    <Fragment>
      {errorMessage && <Error>{{ errorMessage }}</Error>}
      {!projectTypes && <div>Loading</div>}
      {projectTypes && (
        <CRUD
          addPath="/admin/project_fact_type"
          collectionIcon="fas ruler"
          collectionName={t('admin.projectFactTypes.collectionName')}
          collectionPath="/settings/project_fact_types"
          columns={[
            {
              title: t('admin.projectTypes.itemName'),
              name: 'project_type',
              type: 'select',
              options: projectTypes,
              tableOptions: {
                headerClassName: 'w-4/12'
              }
            },
            {
              title: t('common.name'),
              name: 'name',
              type: 'text',
              tableOptions: {
                headerClassName: 'w-4/12'
              }
            },
            {
              title: t('admin.projectFactTypes.weight'),
              name: 'weight',
              type: 'number',
              minimum: 0,
              maximum: 100,
              description: t('admin.projectFactTypes.description'),
              tableOptions: {
                className: 'text-center',
                headerClassName: 'w-2/12 text-center'
              }
            },
            {
              title: t('common.id'),
              name: 'id',
              default: ulidAsUUID(),
              type: 'text',
              format: 'uuid',
              tableOptions: {
                hide: true
              }
            }
          ]}
          errorStrings={{
            'Unique Violation': t(
              'admin.projectFactTypes.errors.uniqueViolation'
            )
          }}
          itemKey="id"
          itemName={t('admin.projectFactTypes.itemName')}
          itemPath="/admin/project_fact_type/{{value}}"
          jsonSchema={jsonSchema}
        />
      )}
    </Fragment>
  )
}
