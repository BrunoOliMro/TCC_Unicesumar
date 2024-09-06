export type BaseResponse<dataType> = {
    isResponse: boolean;
    status: number;
    message: string;
    data: dataType
}