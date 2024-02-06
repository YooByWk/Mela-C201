import React, { useContext, useState } from "react"
import moment from "moment"

function Schedule ({
    date,
    openModal,
    schedule,
    isList,
    selectedTodo,
    handleTodo,
    closeDetail
}) {
    const [isEdit, setIsEdit] = useState(false)
    const handleEditTrue = () => {
        setIsEdit(true)
    }
    const handleEditFalse = () => {
        setIsEdit(false)
    }

    const scheduleList = []

    for (let index = 0; index < schedule.length; index++) {
        const element = schedule[index];
        
        const scheduleMonth = element.endTime[5] + element.endTime[6]
        const scheduleDay = element.endTime[8] + element.endTime[9]
        if (Number(scheduleMonth) === date.getMonth() + 1 ) {
            scheduleList.push(
                <div key={element.scheduleIdx}>

                    {element}
                </div>
            )
        }
        }


    return (
        <>
        <div>
            {scheduleList}
        </div>
        </>
    )
}

export default Schedule