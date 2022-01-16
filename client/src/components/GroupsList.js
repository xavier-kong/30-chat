import React, {useEffect } from "react";

const GroupsList = ({ groupList }) => {
    console.log(groupList);
    return (
        <>
        {groupList.map(group => <p>{group.group_name}</p>)
        }
        </>
    )
}

export default GroupsList