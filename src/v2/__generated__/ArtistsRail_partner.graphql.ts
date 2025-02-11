/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistsRail_partner = {
    readonly slug: string;
    readonly profileArtistsLayout: string | null;
    readonly fullProfileEligible: boolean | null;
    readonly " $refType": "ArtistsRail_partner";
};
export type ArtistsRail_partner$data = ArtistsRail_partner;
export type ArtistsRail_partner$key = {
    readonly " $data"?: ArtistsRail_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistsRail_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistsRail_partner",
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
      "name": "profileArtistsLayout",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "fullProfileEligible",
      "storageKey": null
    }
  ],
  "type": "Partner"
};
(node as any).hash = '27bf9f0336c5be07365fced15b249703';
export default node;
