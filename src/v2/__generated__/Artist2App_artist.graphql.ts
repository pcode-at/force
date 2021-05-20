/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2App_artist = {
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
    readonly " $fragmentRefs": FragmentRefs<"Artist2Meta_artist">;
    readonly " $refType": "Artist2App_artist";
};
export type Artist2App_artist$data = Artist2App_artist;
export type Artist2App_artist$key = {
    readonly " $data"?: Artist2App_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Artist2App_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Artist2App_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2Meta_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = '558e706b8e4767a7a003afd9f7995d1f';
export default node;
