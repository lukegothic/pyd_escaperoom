import React from "react";

function FilterGroupButton({ groupingMethod, setGroupMethod, active }) {
    return <div className={`cool-button panel-filter-button ${active ? "active" : ""}`} onClick={() => setGroupMethod(groupingMethod)}>{groupingMethod.icon} por {groupingMethod.name}</div>;
}

export default FilterGroupButton;