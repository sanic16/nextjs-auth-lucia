import React from "react";

const Description = ({ description }: { description: string }) => {
  const reducedDescription =
    description.length > 100 ? description.slice(0, 100) + "..." : description;
  return <p dangerouslySetInnerHTML={{ __html: reducedDescription }} />;
};

export default Description;
