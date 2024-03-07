import type { ResolverProps } from '@composabase/sdk'

export default async function Resolver({ root, info }: ResolverProps) {
    const { path } = root
    return path.alias
}