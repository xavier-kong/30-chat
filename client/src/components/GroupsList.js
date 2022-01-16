import React from "react";

/* 
group: {
    name: string,
    exp; Time stamp
}
*/

const GroupsList = ({ groupList }) => {
    return (
        <>
        {groupList.map(group => <p>{group.name}</p>)
        }
        </>
    )
}

export default GroupsList