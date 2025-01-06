

import * as React from "react";
import data from './eng.json';
import English from "@/components/English";

export default function Page() {
  return (
    <English data={data} />
  );
}
