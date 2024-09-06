import { ArrayMaxSize, ArrayMinSize, IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class UpdateGeneralSettingsDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    sequence_days: number;

}

export class AddInvalidDaysDTO {

    @IsNotEmpty()
    @IsInt({ each: true })
    invalid_days: number[];

}

class SequencePriorityDTO {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    priority_id: number;

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    @Max(2)
    priority_index: number;

}

export class UpdateSequencePrioritiesDTO {

    @IsNotEmpty()
    @ArrayMaxSize(3)
    @ArrayMinSize(3)
    sequence_priorities: SequencePriorityDTO[];

}

export class DeleteInvalidDayDTO {

    @IsNotEmpty()
    @IsInt()
    invalid_day: number;

}