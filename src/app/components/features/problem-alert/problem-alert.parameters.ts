import { Colors } from "../../../core/enums/colors";

export interface ProblemAlertParameters {
    color: Colors;
    problem?: string;
    errors?: ReadonlyMap<string, string[]>;
}