import type { ResolverProps } from '@composabase/sdk'

export default async function Resolver({ root, info }: ResolverProps) {
    const { langcode } = root
    return {
        id: langcode.language.id,
        name: langcode.language.name,
        direction: langcode.language.direction,
    }
}