/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type artist2Routes_ArtistTopLevelQueryVariables = {
    artistID: string;
};
export type artist2Routes_ArtistTopLevelQueryResponse = {
    readonly artist: {
        readonly slug: string;
        readonly statuses: {
            readonly shows: boolean | null;
            readonly cv: boolean | null;
            readonly articles: boolean | null;
        } | null;
        readonly counts: {
            readonly forSaleArtworks: number | null;
        } | null;
        readonly related: {
            readonly genes: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly slug: string;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
        readonly highlights: {
            readonly partnersConnection: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly categories: ReadonlyArray<{
                            readonly slug: string;
                        } | null> | null;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
        readonly insights: ReadonlyArray<{
            readonly type: string | null;
        } | null> | null;
        readonly biographyBlurb: {
            readonly text: string | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"Artist2App_artist">;
    } | null;
};
export type artist2Routes_ArtistTopLevelQuery = {
    readonly response: artist2Routes_ArtistTopLevelQueryResponse;
    readonly variables: artist2Routes_ArtistTopLevelQueryVariables;
};



/*
query artist2Routes_ArtistTopLevelQuery(
  $artistID: String!
) {
  artist(id: $artistID) @principalField {
    ...Artist2App_artist
    slug
    statuses {
      shows
      cv(minShowCount: 0)
      articles
    }
    counts {
      forSaleArtworks
    }
    related {
      genes {
        edges {
          node {
            slug
            id
          }
        }
      }
    }
    highlights {
      partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
        edges {
          node {
            categories {
              slug
              id
            }
            id
          }
          id
        }
      }
    }
    insights {
      type
    }
    biographyBlurb(format: HTML, partnerBio: true) {
      text
    }
    id
  }
}

fragment Artist2App_artist on Artist {
  id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "ArtistStatuses",
  "kind": "LinkedField",
  "name": "statuses",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shows",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "minShowCount",
          "value": 0
        }
      ],
      "kind": "ScalarField",
      "name": "cv",
      "storageKey": "cv(minShowCount:0)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "articles",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "ArtistCounts",
  "kind": "LinkedField",
  "name": "counts",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "forSaleArtworks",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = [
  (v2/*: any*/)
],
v6 = [
  {
    "kind": "Literal",
    "name": "displayOnPartnerProfile",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "partnerCategory",
    "value": [
      "blue-chip",
      "top-established",
      "top-emerging"
    ]
  },
  {
    "kind": "Literal",
    "name": "representedBy",
    "value": true
  }
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "ArtistInsight",
  "kind": "LinkedField",
  "name": "insights",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "format",
      "value": "HTML"
    },
    {
      "kind": "Literal",
      "name": "partnerBio",
      "value": true
    }
  ],
  "concreteType": "ArtistBlurb",
  "kind": "LinkedField",
  "name": "biographyBlurb",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    }
  ],
  "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:true)"
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = [
  (v2/*: any*/),
  (v9/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "artist2Routes_ArtistTopLevelQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "kind": "LinkedField",
            "name": "related",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GeneConnection",
                "kind": "LinkedField",
                "name": "genes",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GeneEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Gene",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistHighlights",
            "kind": "LinkedField",
            "name": "highlights",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "PartnerArtistConnection",
                "kind": "LinkedField",
                "name": "partnersConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerArtistEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PartnerCategory",
                            "kind": "LinkedField",
                            "name": "categories",
                            "plural": true,
                            "selections": (v5/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "partnersConnection(displayOnPartnerProfile:true,first:10,partnerCategory:[\"blue-chip\",\"top-established\",\"top-emerging\"],representedBy:true)"
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Artist2App_artist"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "artist2Routes_ArtistTopLevelQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v9/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "kind": "LinkedField",
            "name": "related",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GeneConnection",
                "kind": "LinkedField",
                "name": "genes",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GeneEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Gene",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": (v10/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistHighlights",
            "kind": "LinkedField",
            "name": "highlights",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "PartnerArtistConnection",
                "kind": "LinkedField",
                "name": "partnersConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerArtistEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PartnerCategory",
                            "kind": "LinkedField",
                            "name": "categories",
                            "plural": true,
                            "selections": (v10/*: any*/),
                            "storageKey": null
                          },
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "partnersConnection(displayOnPartnerProfile:true,first:10,partnerCategory:[\"blue-chip\",\"top-established\",\"top-emerging\"],representedBy:true)"
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "artist2Routes_ArtistTopLevelQuery",
    "operationKind": "query",
    "text": "query artist2Routes_ArtistTopLevelQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) @principalField {\n    ...Artist2App_artist\n    slug\n    statuses {\n      shows\n      cv(minShowCount: 0)\n      articles\n    }\n    counts {\n      forSaleArtworks\n    }\n    related {\n      genes {\n        edges {\n          node {\n            slug\n            id\n          }\n        }\n      }\n    }\n    highlights {\n      partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n        edges {\n          node {\n            categories {\n              slug\n              id\n            }\n            id\n          }\n          id\n        }\n      }\n    }\n    insights {\n      type\n    }\n    biographyBlurb(format: HTML, partnerBio: true) {\n      text\n    }\n    id\n  }\n}\n\nfragment Artist2App_artist on Artist {\n  id\n}\n"
  }
};
})();
(node as any).hash = 'ae1a5255cb51fb9fda380c9341316725';
export default node;
