import React from "react";

export default function Header(props) {
  return (
    <h1 className="pb-3">
      Filter: <small className="text-muted">{props.filter}</small>
    </h1>
  );
}
