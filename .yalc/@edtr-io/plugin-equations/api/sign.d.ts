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
export declare function renderSignToString(sign: Sign): string;
