export const mockInvalidAddMachineShiftData = {

    noMachineId: {
        start_time: "12:00:00",
        end_time: "16:00:00"
    },
    noStartTime: {
        machine_id: 1,
        end_time: "16:00:00"
    },
    noEndTime: {
        machine_id: 1,
        start_time: "12:00:00",
    },
    invalidMachineIdDataType: {
        machine_id: "Teste",
        start_time: "12:00:00",
        end_time: "16:00:00"
    },
    invalidStartTimeDataType: {
        machine_id: 1,
        start_time: 1,
        end_time: "16:00:00"
    },
    invalidEndTimeDataType: {
        machine_id: 1,
        start_time: "12:00:00",
        end_time: 1
    },
};

export const mockValidAddMachineShiftData = {

    numberMachineIndex: {
        machine_id: 1,
        start_time: "12:00:00",
        end_time: "16:00:00"
    },
    stringMachineId: {
        machine_id: "1",
        start_time: "12:00:00",
        end_time: "16:00:00"
    },


};

export const mockInvalidDeleteMachineShiftData = {

    noMachineId: {
        shift_id: 1
    },
    noShiftId: {
        machine_id: 1,
    },
    invalidMachineIdDataType: {
        machine_id: "string",
        shift_id: 1
    },
    invalidShiftIdDataType: {
        machine_id: 1,
        shift_id: "string"
    },
};

export const mockValidDeleteMachineShiftData = {

    numberMachineId: {
        machine_id: 1,
        shift_id: 1
    },
    stringMachineId: {
        machine_id: "1",
        shift_id: 1
    },
    stringShiftId: {
        machine_id: 1,
        shift_id: "1"
    },


};