import {ReactNode} from "react";

export interface WorkData {
    id: number,

    title?: string,
    shortInfo?: string,
    stack?: string,
    description?: string,
    content?: string,

    dateStart?: string,
    dateFinish?: string,

    iconElement?: ReactNode,
    cardElement?: ReactNode,
}