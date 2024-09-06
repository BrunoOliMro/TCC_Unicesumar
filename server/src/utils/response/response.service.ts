import { HttpException, Injectable } from '@nestjs/common';
import { NextResponse } from './types/response.types';

@Injectable()
export class ResponseService {

    selectErrorResponse(status: number) {
        switch (status) {
            case 400:
                throw new HttpException(this.badRequest(), 400);
            case 403:
                throw new HttpException(this.unpermitted(), 403);
            case 401:
                throw new HttpException(this.unauthorized(), 401);
            case 404:
                throw new HttpException(this.notFound(), 404);
            default:
                throw new HttpException(this.internalError(), 500);
        }
    }

    selectErrorResponseObj(status: number) {
        switch (status) {
            case 400:
                return this.badRequest();
            case 403:
                return this.unpermitted();
            case 401:
                return this.unauthorized();
            case 404:
                return this.notFound();
            default:
                return this.internalError();
        }
    }

    // BASE RESPONSES

    dataFetched<dataType>(data: dataType): NextResponse<dataType> {
        return {
            isResponse: true,
            status: 200,
            message: 'Dados adquiridos',
            data: data
        };
    }

    processExecuted(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 201,
            message: 'Processo executado',
        };
    }

    dataAdded<dataType>(data?: dataType): NextResponse<dataType> {
        return {
            isResponse: true,
            status: 201,
            message: 'Dados adicionados',
            data: data
        };
    }

    dataUpdated(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 200,
            message: 'Dados atualizados',
        };
    }

    dataDeleted(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 200,
            message: 'Dados deletados',
        };
    }

    sequenceFinished(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 200,
            message: "Sequenciamento finalizado"
        }
    }

    // BASE ERRORS

    unpermitted(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 403,
            message: 'Sem permissões suficientes',
        };
    }

    unauthorized(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 401,
            message: 'Não autorizado',
        };
    }

    internalError(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 500,
            message: 'Erro interno'
        };
    }

    notFound(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 404,
            message: 'Rota não existente',
        };
    }

    badRequest(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'Dados inválidos',
        };
    }

    invalidCompany(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'Empresa inválida',
        };
    }

    invalidImage(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'Imagem inválida',
        };
    }

    invalidGroup(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'Grupo inválido',
        };
    }

    invalidUser(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'Usuário inválido',
        };
    }

    invalidTool(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'Ferramental inválido',
        };
    }

    invalidMachine(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'Máquina inválida',
        };
    }

    invalidMaterial(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'Material inválido',
        };
    }

    invalidMachineGroup(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'Grupo de máquina inválido',
        };
    }

    invalidGrouping(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O grupo é inválido',
        };
    }

    groupMustBeTheSame(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O grupo deve ser o mesmo das máquinas já existentes',
        };
    }

    invalidShift(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'Turno inválido',
        };
    }

    sequenceIsAlreadyRunning(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'Já existe um sequenciamento em andamento',
        };
    }

    itemProcessAlreadyExists(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O processo já existe',
        };
    }

    timerAlreadyExists(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O timer já existe',
        };
    }

    groupingAlreadyExists(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O grupo já existe',
        };
    }

    processHasGrouping(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O processo já está em um grupo',
        };
    }

    itemTypeAlreadyExists(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O tipo de part number já existe',
        };
    }

    machineGroupAlreadyExists(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O grupo de máquinas já existe',
        };
    }

    machineAlreadyExists(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'A máquina já existe',
        };
    }

    childAlreadyExists(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O item já é filho do processo',
        };
    }

    shiftAlreadyExists(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O turno já existe',
        };
    }

    itemAlreadyExists(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O part number já existe',
        };
    }

    odfAlreadyExists(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'A odf já existe',
        };
    }

    processMaterialAlreadyExists(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O material já existe no processo',
        };
    }

    holidayAlreadyExists(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O feriado já existe',
        };
    }

    odfIsActive(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'A odf já está ativa',
        };
    }

    odfIsNotActive(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'A odf não está ativa',
        };
    }

    invalidItem(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O part number é inválido',
        };
    }

    invalidItemType(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O tipo de part number é inválido',
        };
    }

    invalidODF(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'A ODF é inválida',
        };
    }

    invalidProcess(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O processo é inválido',
        };
    }

    invalidQtd(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'Quantidade inválida',
        };
    }

    cantPointBackwards(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'A quantidade apontada deve ser maior',
        };
    }

    invalidTimes(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'Tempos inválidos',
        };
    }

    invalidDates(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'Datas inválidas',
        };
    }

    childItemCantBeTheSameItem(): NextResponse<undefined> {
        return {
            isResponse: true,
            status: 400,
            message: 'O item não pode ser filho de si mesmo',
        };
    }

}
