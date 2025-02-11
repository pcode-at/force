/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerArtists_partner = {
    readonly slug: string;
    readonly distinguishRepresentedArtists: boolean | null;
    readonly fullProfileEligible: boolean | null;
    readonly allArtistsConnection: {
        readonly edges: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"PartnerArtistList_artists">;
        } | null> | null;
    } | null;
    readonly " $refType": "PartnerArtists_partner";
};
export type PartnerArtists_partner$data = PartnerArtists_partner;
export type PartnerArtists_partner$key = {
    readonly " $data"?: PartnerArtists_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerArtists_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerArtists_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "distinguishRepresentedArtists",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "fullProfileEligible",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "displayOnPartnerProfile",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "hasNotRepresentedArtistWithPublishedArtworks",
          "value": true
        }
      ],
      "concreteType": "ArtistPartnerConnection",
      "kind": "LinkedField",
      "name": "allArtistsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistPartnerEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PartnerArtistList_artists"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "allArtistsConnection(displayOnPartnerProfile:true,hasNotRepresentedArtistWithPublishedArtworks:true)"
    }
  ],
  "type": "Partner"
};
(node as any).hash = '7f1d85721ed9b99c88c19b4e71d7b144';
export default node;
