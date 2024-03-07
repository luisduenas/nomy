import { createModule, graphQLSchema } from "@composabase/sdk"

const Article = () => {
  const module = createModule('Article')

  module.query("nodeArticle", {
    definition: {
      type: module.scalar("CustomNodeArticle"),
      args: {
        id: module.scalar("ID"),
        // langcode: module.string().optional()
      },
    },
    resolver: 'nodeArticle'
  })
  module.union('MediaUnion', ['CustomMediaImage'])
  // module.union('MetaTagUnion', ['MetaTagLink', 'MetaTagValue', 'MetaTagProperty'])
  module.union('MetaTagUnion', ['MetaTagValue'])

  module.type('MetaTagValue', {
    tag: {
      definition:{
        type: module.string(),
      },
      resolver: "customNodeArticle_field_resolver"
    }
  })

  module.type('CustomFieldMediaLangcode', {
    value: {
      definition:{
        type: module.string(),
      },
      resolver: "customNodeArticle_field_resolver"
    }
  })

  module.type("CustomMediaImage", {
    id: {
      definition: {
        type: module.string()
      },
      resolver: "customNodeArticle_field_resolver"
    },
    changed: {
      definition: {
        type: module.string()
      },
      resolver: "customNodeArticle_field_resolver"
    },
    created: {
      definition: {
        type: module.string()
      },
      resolver: "customNodeArticle_field_resolver"
    },
    langcode: {
      definition: {
        type: module.scalar("CustomFieldMediaLangcode")
      },
      resolver: "customNodeArticle_field_resolver"
    },
    mediaImage: {
      definition: {
        type: module.scalar("FieldMediaImageFieldMediaImage")
      },
      resolver: "customNodeArticle_field_resolver"
    },
    metatag: {
      definition: {
        type: module.union("MetaTagUnion").optional(),
      },
      resolver: "customNodeArticle_CustomMetaTagValue_resolver"
    },
    name: {
      definition: {
        type: module.string()
      },
      resolver: "customNodeArticle_field_resolver"
    },
    path: {
      definition: {
        type: module.string().optional()
      },
      resolver: "customNodeArticle_FieldNodePath_resolver"
    },
    status: {
      definition: {
        type: module.string()
      },
      resolver: "customNodeArticle_field_resolver"
    }
  })

  module.type("CustomNodeArticle", {
    // author:{
    //   definition:{
    //     type: module.scalar("User")
    //   },
    //   resolver: "customNodeArticle_user"
    // },
    // changed:{
    //   definition:{
    //     type: module.scalar("DateTime")
    //   },
    //   resolver: "customNodeArticle_dateTime"
    // },
    // components:{
    //   definition:{
    //     type: module.scalar("ParagraphUnion")
    //   },
    //   resolver: "customNodeArticle_components"
    // },
    // created:{
    //   definition:{
    //     type: module.scalar("DateTime")
    //   },
    //   resolver: "customNodeArticle_created"
    // },
    id: {
      definition: {
        type: module.string().optional()
      },
      resolver: "customNodeArticle_field_resolver"
    },
    image: {
      definition: {
        type: module.union("MediaUnion").optional(),
        // type: module.scalar("MediaImage").optional(),
      },
      resolver: "customNodeArticle_CustomMediaImage_resolver"
    },
    // langcode:{
    //   definition:{
    //     type: module.scalar("Language")
    //   },
    //   resolver: "customNodeArticle_langcode"
    // },
    // metatag:{
    //   definition:{
    //     type: module.scalar("MetaTagUnion")
    //   },
    //   resolver: "customNodeArticle_metatag"
    // },
    path: {
      definition: {
        type: module.string()
      },
      resolver: "customNodeArticle_FieldNodePath_resolver"
    },
    promote: {
      definition: {
        type: module.boolean()
      },
      resolver: "customNodeArticle_field_resolver"
    },
    status: {
      definition: {
        type: module.boolean().optional()
      },
      resolver: "customNodeArticle_field_resolver"
    },
    sticky: {
      definition: {
        type: module.boolean()
      },
      resolver: "customNodeArticle_field_resolver"
    },
    summary: {
      definition: {
        type: module.string().optional()
      },
      resolver: "customNodeArticle_field_resolver"
    },
    // tags:{
    //   definition:{
    //     type: module.scalar("TermUnion")
    //   },
    //   resolver: "customNodeArticle_tags"
    // },
    title: {
      definition: {
        type: module.string()
      },
      resolver: "customNodeArticle_field_resolver"
    },
  })



  return module
}

export default Article()
