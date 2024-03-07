import type { ResolverProps } from '@composabase/sdk'

export default async function Resolver({ root }: ResolverProps) {
    const { image } = root
    console.log("image.entity ",image.entity)
    return {
        __typename: "CustomMediaImage",
        id: image.entity.uuid,
        changed: image.entity.changed,
        created: image.entity.created,
        langcode: image.entity.langcode,
        name: image.entity.name,
        path: image.entity.path,
        status: image.entity.status,
        mediaImage: {
            ...image.entity.fieldMediaImage
        },
    }
}