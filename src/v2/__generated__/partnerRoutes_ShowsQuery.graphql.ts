/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type partnerRoutes_ShowsQueryVariables = {
    partnerId: string;
};
export type partnerRoutes_ShowsQueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"Shows_partner">;
    } | null;
};
export type partnerRoutes_ShowsQuery = {
    readonly response: partnerRoutes_ShowsQueryResponse;
    readonly variables: partnerRoutes_ShowsQueryVariables;
};



/*
query partnerRoutes_ShowsQuery(
  $partnerId: String!
) {
  partner(id: $partnerId) @principalField {
    ...Shows_partner
    id
  }
}

fragment ShowBanner_show on Show {
  slug
  name
  href
  isFairBooth
  exhibitionPeriod
  status
  description
  location {
    city
    id
  }
  coverImage {
    medium: cropped(width: 600, height: 480) {
      src
      srcSet
    }
  }
}

fragment ShowCard_show on Show {
  href
  name
  isFairBooth
  exhibitionPeriod
  coverImage {
    medium: cropped(width: 263, height: 222) {
      width
      height
      src
      srcSet
    }
  }
}

fragment ShowEvents_edges on ShowEdge {
  node {
    internalID
    ...ShowCard_show
    id
  }
}

fragment Shows_partner on Partner {
  slug
  featuredEvents: showsConnection(first: 1, status: ALL, sort: FEATURED_DESC_END_AT_DESC, isDisplayable: true) {
    edges {
      node {
        isFeatured
        internalID
        ...ShowBanner_show
        id
      }
    }
  }
  currentEvents: showsConnection(first: 12, status: RUNNING, isDisplayable: true) {
    edges {
      node {
        internalID
        id
      }
      ...ShowEvents_edges
    }
  }
  upcomingEvents: showsConnection(first: 12, status: UPCOMING, isDisplayable: true) {
    edges {
      node {
        internalID
        id
      }
      ...ShowEvents_edges
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "partnerId",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "partnerId"
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
  "kind": "Literal",
  "name": "isDisplayable",
  "value": true
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFairBooth",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "exhibitionPeriod",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v12 = {
  "kind": "Literal",
  "name": "first",
  "value": 12
},
v13 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ShowEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v9/*: any*/),
          (v6/*: any*/),
          (v5/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "coverImage",
            "plural": false,
            "selections": [
              {
                "alias": "medium",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 222
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 263
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "width",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "height",
                    "storageKey": null
                  },
                  (v10/*: any*/),
                  (v11/*: any*/)
                ],
                "storageKey": "cropped(height:222,width:263)"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "partnerRoutes_ShowsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Shows_partner"
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
    "name": "partnerRoutes_ShowsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": "featuredEvents",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              (v3/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "FEATURED_DESC_END_AT_DESC"
              },
              {
                "kind": "Literal",
                "name": "status",
                "value": "ALL"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ShowEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Show",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isFeatured",
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      (v2/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "status",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "description",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Location",
                        "kind": "LinkedField",
                        "name": "location",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "city",
                            "storageKey": null
                          },
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "coverImage",
                        "plural": false,
                        "selections": [
                          {
                            "alias": "medium",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 480
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 600
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": [
                              (v10/*: any*/),
                              (v11/*: any*/)
                            ],
                            "storageKey": "cropped(height:480,width:600)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "showsConnection(first:1,isDisplayable:true,sort:\"FEATURED_DESC_END_AT_DESC\",status:\"ALL\")"
          },
          {
            "alias": "currentEvents",
            "args": [
              (v12/*: any*/),
              (v3/*: any*/),
              {
                "kind": "Literal",
                "name": "status",
                "value": "RUNNING"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": (v13/*: any*/),
            "storageKey": "showsConnection(first:12,isDisplayable:true,status:\"RUNNING\")"
          },
          {
            "alias": "upcomingEvents",
            "args": [
              (v12/*: any*/),
              (v3/*: any*/),
              {
                "kind": "Literal",
                "name": "status",
                "value": "UPCOMING"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": (v13/*: any*/),
            "storageKey": "showsConnection(first:12,isDisplayable:true,status:\"UPCOMING\")"
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "partnerRoutes_ShowsQuery",
    "operationKind": "query",
    "text": "query partnerRoutes_ShowsQuery(\n  $partnerId: String!\n) {\n  partner(id: $partnerId) @principalField {\n    ...Shows_partner\n    id\n  }\n}\n\nfragment ShowBanner_show on Show {\n  slug\n  name\n  href\n  isFairBooth\n  exhibitionPeriod\n  status\n  description\n  location {\n    city\n    id\n  }\n  coverImage {\n    medium: cropped(width: 600, height: 480) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ShowCard_show on Show {\n  href\n  name\n  isFairBooth\n  exhibitionPeriod\n  coverImage {\n    medium: cropped(width: 263, height: 222) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ShowEvents_edges on ShowEdge {\n  node {\n    internalID\n    ...ShowCard_show\n    id\n  }\n}\n\nfragment Shows_partner on Partner {\n  slug\n  featuredEvents: showsConnection(first: 1, status: ALL, sort: FEATURED_DESC_END_AT_DESC, isDisplayable: true) {\n    edges {\n      node {\n        isFeatured\n        internalID\n        ...ShowBanner_show\n        id\n      }\n    }\n  }\n  currentEvents: showsConnection(first: 12, status: RUNNING, isDisplayable: true) {\n    edges {\n      node {\n        internalID\n        id\n      }\n      ...ShowEvents_edges\n    }\n  }\n  upcomingEvents: showsConnection(first: 12, status: UPCOMING, isDisplayable: true) {\n    edges {\n      node {\n        internalID\n        id\n      }\n      ...ShowEvents_edges\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e1e42444e8c83b5a84a65fe0d9745764';
export default node;
