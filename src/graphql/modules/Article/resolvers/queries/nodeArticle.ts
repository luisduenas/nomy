import type { ResolverProps } from '@composabase/sdk'
import { gql, client } from '@composabase/client'

export default async function Resolver({ args, operation, ...props }: ResolverProps) {
  
  const fragmentResolver = (fragment: any) => {

    if (fragment.typeCondition.name.value === "CustomMediaImage") {
      const val = `
          image: fieldImage {
            entity {
              ... on MediaImage {
                ${fragment.selectionSet.selections.map((e: any) => fieldResolver(e)).join('\n')}
              }
            }
          }          
          `
      return val
    }
    return ""
  }
  
  const fieldResolver = (field: any) => {

    if (field.selectionSet && field.selectionSet.selections[0].kind === "InlineFragment") {
        return fragmentResolver(field.selectionSet.selections[0])
    }

    if (field.name.value === 'summary') {
      return 'summary:fieldSummary'
    }

    if (field.name.value === 'id') {
      return 'id:uuid'
    }

    if (field.name.value === 'path') {
      return `
      path {
        alias
      }`
    }    

    if (field.name.value === 'langcode') {
      return `
      langcode {
          __typename
          value
          language{
            direction
            name
            id
          }
        }
      `
    }

    if(field.name.value === 'mediaImage'){
      return `
      fieldMediaImage {
          ${field.selectionSet.selections.map((e: any) => fieldResolver(e)).join('\n')}
        }
      `
    }

    return field.name.value
  }

  const fields = props.info.operation.selectionSet.selections[0].selectionSet.selections.map((e: any) => fieldResolver(e)).join('\n')
  const { id, langcode } = args
  // query nodeArticle ($id:String!){
  //   graphql_v3 {
  //     nodeById(id: $id) {
  //       ... on NodeArticle {
  //         nid
  //         id: uuid
  //         title
  //         summary: fieldSummary
  //         status
  //         path {
  //           __typename
  //           alias
  //         }
  //         promote
  //         sticky
  //         image: fieldImage {
  //           entity {
  //             ... on MediaImage {
  //               mid
  //               uuid
  //               changed
  //               created
  //               name
  //               status
  //               langcode {
  //                 __typename
  //                 value
  //                 language{
  //                   direction
  //                   name
  //                   id
  //                 }
  //               }
  //               fieldMediaImage {
  //                 title
  //                 alt
  //                 url
  //                 width
  //                 height
  //               }
  //               path {
  //                 __typename
  //                 alias
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  const query = gql(`
  query nodeArticle ($id:String!){
    graphql_v3 {
      nodeById(id: $id) {
        ... on NodeArticle {
          ${fields}
        }
      }
    }
  }
`)

  const { data, error } = await client.query(query, { id, language: langcode });

  if (error) {
    throw error
  }

  if (!data) {
    return "nodata"
  }

  const { graphql_v3: { nodeById } } = data


  return nodeById
}