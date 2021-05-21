/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2Header_artist = {
    readonly " $fragmentRefs": FragmentRefs<"SelectedCareerAchievements_artist">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectedCareerAchievements_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = '0ec642a5b5fe067103f685246690a588';
export default node;
