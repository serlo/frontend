import { ChildStateType } from '@edtr-io/plugin';
import { EditorPlugin } from '@edtr-io/plugin';
import { EditorPluginProps } from '@edtr-io/plugin';
import { ListStateType } from '@edtr-io/plugin';
import { ObjectStateType } from '@edtr-io/plugin';
import { StringStateType } from '@edtr-io/plugin';

/**
 * @param config - {@link EquationsConfig | Plugin configuration}
 * @public
 */
export declare function createEquationsPlugin(config: EquationsConfig): EditorPlugin<EquationsPluginState, EquationsConfig>;

/** @public */
export declare interface EquationsConfig {
    i18n: {
        leftHandSide: string;
        transformation: string;
        mode: string;
        transformationExample: string;
        transformationOfEquations: string;
        transformationOfTerms: string;
        addNewRow: string;
        explanation: string;
        term: string;
        rightHandSide: string;
        combineLikeTerms: string;
        setEqual: string;
        firstExplanation: string;
        addNew: string;
    };
}

export declare type EquationsPluginState = typeof equationsState;

/** @public */
export declare type EquationsProps = EditorPluginProps<EquationsPluginState, EquationsConfig>;

declare const equationsState: ObjectStateType<{
    steps: ListStateType<StepPropsType>;
    firstExplanation: ChildStateType<string, unknown>;
    transformationTarget: StringStateType;
}>;

export declare function renderSignToString(sign: Sign): string;

export declare enum Sign {
    AlmostEqualTo = "almost-equal-to",
    Equals = "equals",
    Estimates = "estimates",
    GreaterThan = "greater-than",
    GreaterThanOrEqual = "greater-than-or-equal",
    LessThan = "less-than",
    LessThanOrEqual = "less-than-or-equal",
    NotEqualTo = "not-equal-to"
}

export declare const stepProps: StepPropsType;

declare type StepPropsType = ObjectStateType<{
    left: StringStateType;
    sign: StringStateType;
    right: StringStateType;
    transform: StringStateType;
    explanation: ChildStateType<string, unknown>;
}>;

export { }
