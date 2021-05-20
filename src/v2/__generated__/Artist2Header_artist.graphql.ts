/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2Header_artist = {
    readonly id: string;
    readonly " $refType": "Artist2Header_artist";
};
export type Artist2Header_artist$data = Artist2Header_artist;
export type Artist2Header_artist$key = {
    readonly " $data"?: Artist2Header_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Artist2Header_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Artist2Header_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = '12f6a4cda82df10078c83047fff198f2';
export default node;
