import { EditorPlugin, EditorPluginProps, ObjectStateType, StringStateType, ChildStateType, ListStateType } from '@edtr-io/plugin';
import { Sign, renderSignToString } from './sign';
/** @public */
export { Sign, renderSignToString };
declare type StepPropsType = ObjectStateType<{
    left: StringStateType;
    sign: StringStateType;
    right: StringStateType;
    transform: StringStateType;
    explanation: ChildStateType<string, unknown>;
}>;
export declare const stepProps: StepPropsType;
declare const equationsState: ObjectStateType<{
    steps: ListStateType<StepPropsType>;
    firstExplanation: ChildStateType<string, unknown>;
    transformationTarget: StringStateType;
}>;
export declare type EquationsPluginState = typeof equationsState;
/** @public */
export declare type EquationsProps = EditorPluginProps<EquationsPluginState, EquationsConfig>;
/**
 * @param config - {@link EquationsConfig | Plugin configuration}
 * @public
 */
export declare function createEquationsPlugin(config: EquationsConfig): EditorPlugin<EquationsPluginState, EquationsConfig>;
/** @public */
export interface EquationsConfig {
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
