import type { ResolverProps } from '@composabase/sdk'

export default async function Resolver({ root, info }: ResolverProps) {
    return root[info.fieldName]
}