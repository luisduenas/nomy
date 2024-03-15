import type { ResolverProps } from '@composabase/sdk'

export default async function Resolver({ root, info }: ResolverProps) {
    // const { image } = root
    return {
        __typename: "MetaTagValue",
        tag: "test",
    }
}