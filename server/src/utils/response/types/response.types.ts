export type NextResponse<dataType> = {
    isResponse: boolean;
    status: number;
    message: string;
    data?: dataType
}