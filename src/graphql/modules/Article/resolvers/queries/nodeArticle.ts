import type { ResolverProps } from '@composabase/sdk'
import { gql, client, extractFragment } from '@composabase/client'

export default async function Resolver({ args, operation }: ResolverProps) {

  const { id, langcode } = args
  const query = gql(`
    query nodeArticle ($id:String!){
      graphql_v3 {
        nodeById(id: $id) {
          ... on NodeArticle {
            nid
            id: uuid
            title
            summary: fieldSummary
            status
            path {
              __typename
              alias
            }
            promote
            sticky
            image: fieldImage {
              entity {
                ... on MediaImage {
                  mid
                  uuid
                  changed
                  created
                  name
                  status
                  langcode {
                    __typename
                    value
                    language{
                      direction
                      name
                      id
                    }
                  }
                  fieldMediaImage {
                    title
                    alt
                    url
                    width
                    height
                  }
                  path {
                    __typename
                    alias
                  }
                }
              }
            }
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
  // console.log(nodeById)

  // expected
  // "nodeArticle": {
  //   "__typename": "graphql_v4NodeArticle",
  //   "image": {
  //     "__typename": "graphql_v4MediaImage",
  //     "id": "12a69687-73e2-416c-bac0-70262311b77a",
  //     "name": "140-1024x768.jpg",
  //     "mediaImage": {
  //       "__typename": "graphql_v4Image",
  //       "url": "https://imagedelivery.net/_PXMcFrsjuW-x1zBRaXrSg/drupal-remix/sites/default/files/2022-09/140-1024x768.jpg/public",
  //       "alt": "lorem",
  //       "title": null
  //     }
  //   },
  //   "id": "dc71c092-163d-48a2-97cf-2486872d9d23"
  // }


  // current:
  // {
  //   nid: 5,
  //   uuid: 'dc71c092-163d-48a2-97cf-2486872d9d23',
  //   title: 'Remix Module',
  //   summary: 'lorem...',
  //   status: true,
  //   fieldImage: {
  //     entity: {
  //       mid: 1,
  //       uuid: '12a69687-73e2-416c-bac0-70262311b77a',
  //       fieldMediaImage: [Object],
  //       __typename: 'MediaImage'
  //     },
  //     __typename: 'FieldNodeArticleFieldImage'
  //   },
  //   __typename: 'NodeArticle'
  // }

  const example_output = {
    fieldImage: {
      entity: {

        "id": "12a69687-73e2-416c-bac0-70262311b77a",
        "name": "140-1024x768.jpg",
        "fieldMediaImage": {
          "url": "https://imagedelivery.net/_PXMcFrsjuW-x1zBRaXrSg/drupal-remix/sites/default/files/2022-09/140-1024x768.jpg/public",
          "alt": "lorem",
          "title": null
        }
      }
    },
    title: "test",
    id: "dc71c092-163d-48a2-97cf-2486872d9d23"
  }

  return nodeById
}