import type { AxiosResponse } from "axios";
import { mainRouteApi, mainRouteApiString } from "$lib/api/api.global";
import type { BaseResponse } from "$lib/types/global.types";
import type { EditGeneralSettingsInfo, EditPriorities, GeneralSettings, SequencePriorityInfo, TimerInfo } from "../types/sequence.types";
import svelteCloak from "$lib/auth/SvelteCloak";
import ToasterHandler from "$lib/toaster/toaster";

// Returns SequenceHistoryRegister
export async function findSequenceHistoryRegisters(): Promise<EventSource> {

    const stream = new EventSource(
        mainRouteApiString +
        "/sequence-history" +
        `?authorization=${svelteCloak.keycloak.token}`
    )

    return stream;

}

export function findInvalidDays(): Promise<BaseResponse<number[]>> {
    const res = mainRouteApi.get(
        "/settings/days/invalid",
        {
        }
    )

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar dias inválidos \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })
}

export function findGeneralSettings(): Promise<BaseResponse<GeneralSettings>> {
    const res = mainRouteApi.get(
        "/settings",
        {
        }
    )

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao adquirir configurações \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })
}

export function findSequenceTimers(): Promise<BaseResponse<TimerInfo[]>> {
    const res = mainRouteApi.get(
        "/core/timers",
    )

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao adquirir horários de sequenciamento \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })
}


export function addInvalidDay(dayId: number): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.post(
        "/settings/days/invalid",
        {
            invalid_days: [dayId]
        },
        {
        }
    )

}

export function addSequenceTimer(timer: string): Promise<AxiosResponse<BaseResponse<number>>> {

    return mainRouteApi.post(
        "/core/timers",
        {
            sequence_timer: timer
        },
    )

}

export function editGeneralSettings(generalSettings: EditGeneralSettingsInfo): Promise<AxiosResponse<BaseResponse<undefined>>> {
    return mainRouteApi.patch(
        "/settings",
        {
            sequence_days: generalSettings.sequence_days
        },
        {
        }
    );
}

export function deleteInvalidDay(dayId: number): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.delete(
        "/settings/days/invalid",
        {
            data: {
                invalid_day: dayId
            },
        }
    )

}

export function findSequencePriorities(): Promise<BaseResponse<SequencePriorityInfo[]>> {

    const res = mainRouteApi.get(
        "/settings/sequence-priorities",
        {
        }
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao adquirir prioridades \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })

}

export function editSequencePriorities(priorities: EditPriorities): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.patch(
        "/settings/sequence-priorities",
        {
            sequence_priorities: priorities
        },
        {
        }
    );

}

export function deleteSequenceTimer(sequenceTimerId: number): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.delete(
        "/core/timers",
        {
            data: {
                sequence_timer_id: sequenceTimerId
            },
        }
    )

}