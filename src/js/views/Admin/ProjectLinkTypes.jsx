import React from 'react'
import { useTranslation } from 'react-i18next'

import { CRUD } from '../../components'
import { Icon } from '../../components'
import { jsonSchema } from '../../schema/ProjectLinkType'

export function ProjectLinkTypes() {
  const { t } = useTranslation()
  return (
    <CRUD
      collectionIcon="fas external-link-alt"
      collectionName={t('admin.projectLinkTypes.collectionName')}
      collectionPath="/project-link-types"
      columns={[
        {
          title: t('id'),
          name: 'id',
          type: 'hidden',
          omitOnAdd: true,
          tableOptions: {
            hide: true
          }
        },
        {
          title: t('common.icon'),
          name: 'icon_class',
          type: 'icon',
          placeholder: 'fas external-link-alt',
          default: 'fas external-link-alt',
          tableOptions: {
            className: 'text-center',
            headerClassName: 'text-center w-1/12'
          }
        },
        {
          title: t('admin.projectLinkTypes.linkType'),
          name: 'link_type',
          type: 'text',
          tableOptions: {
            className: 'truncate',
            headerClassName: 'w-8/12'
          }
        },
        {
          title: t('admin.projectLinkTypes.isPrimaryRepository'),
          name: 'is_primary_repository',
          type: 'toggle',
          default: false,
          tableOptions: {
            className: 'text-center',
            headerClassName: 'text-center w-2/12',
            lookupFunction: (value) => {
              if (value === true)
                return <Icon className="text-green-700" icon="fas check" />
            }
          }
        }
      ]}
      errorStrings={{
        'Unique Violation': t('admin.projectLinkTypes.errors.uniqueViolation')
      }}
      itemIgnore={['created_by', 'last_modified_by']}
      itemKey="id"
      itemName={t('admin.projectLinkTypes.itemName')}
      itemPath="/project-link-types/{{value}}"
      itemTitle="link_type"
      jsonSchema={jsonSchema}
    />
  )
}
