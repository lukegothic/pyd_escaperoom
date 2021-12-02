import React from "react";
import FilterGroupButton from "./FilterGroupButton";
function FilterPanel({ groupingMethods, groupMethod, setGroupMethod }) {
    return <div className="panel-filter">
        {groupingMethods.map(gm => <FilterGroupButton key={`filter_group_${gm.id}`} groupingMethod={gm} active={groupMethod.id === gm.id} setGroupMethod={setGroupMethod} />)}
    </div>;
}

export default FilterPanel;