import { object, string, child, list } from '@edtr-io/plugin';
import { useScopedStore, useScopedSelector, HotKeys } from '@edtr-io/core';
import { setDefaultPreference, PreferenceContext } from '@edtr-io/core/beta';
import { AddButton } from '@edtr-io/editor-ui/internal';
import { MathRenderer, MathEditor } from '@edtr-io/math';
import { isEmpty, getFocused, focus, focusNext, focusPrevious } from '@edtr-io/store';
import { styled, EdtrIcon, edtrDragHandle, Icon } from '@edtr-io/ui';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { includes } from 'ramda';
import React, { Fragment, useEffect, useContext, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

var Sign;
(function (Sign) {
  Sign["AlmostEqualTo"] = "almost-equal-to";
  Sign["Equals"] = "equals";
  Sign["Estimates"] = "estimates";
  Sign["GreaterThan"] = "greater-than";
  Sign["GreaterThanOrEqual"] = "greater-than-or-equal";
  Sign["LessThan"] = "less-than";
  Sign["LessThanOrEqual"] = "less-than-or-equal";
  Sign["NotEqualTo"] = "not-equal-to";
})(Sign || (Sign = {}));
function renderSignToString(sign) {
  switch (sign) {
    case Sign.AlmostEqualTo:
      return '≈';
    case Sign.Equals:
      return '=';
    case Sign.Estimates:
      return '≙';
    case Sign.GreaterThan:
      return '>';
    case Sign.GreaterThanOrEqual:
      return '≥';
    case Sign.LessThan:
      return '<';
    case Sign.LessThanOrEqual:
      return '≤';
    case Sign.NotEqualTo:
      return '≠';
  }
}

var TableWrapper = /*#__PURE__*/styled.div({
  padding: '10px 0'
});
var Table = /*#__PURE__*/styled.table({
  whiteSpace: 'nowrap'
});
var MathTd = /*#__PURE__*/styled.td({
  verticalAlign: 'baseline'
});
var LeftTd = /*#__PURE__*/styled(MathTd)({
  textAlign: 'right'
});
var SignTd = /*#__PURE__*/styled.td({
  padding: '0 3px',
  textAlign: 'center',
  verticalAlign: 'baseline'
});
var TransformTd = /*#__PURE__*/styled(MathTd)({
  paddingLeft: '5px'
});
var ExplanationTr = /*#__PURE__*/styled.tr({
  div: {
    margin: 0
  }
});
var FirstExplanationTr = /*#__PURE__*/styled(ExplanationTr)({
  textAlign: 'center',
  div: {
    margin: 0
  }
});
var TransformationTarget;
(function (TransformationTarget) {
  TransformationTarget["Equation"] = "equation";
  TransformationTarget["Term"] = "term";
})(TransformationTarget || (TransformationTarget = {}));
function EquationsRenderer(_ref) {
  var state = _ref.state;
  var store = useScopedStore();
  var transformationTarget = toTransformationTarget(state.transformationTarget.value);
  var tdPadding = 'px-1 pt-1 pb-3';
  return React.createElement(TableWrapper, null, React.createElement(Table, null, React.createElement("tbody", null, renderFirstExplanation(), state.steps.map(function (step, row) {
    return React.createElement(Fragment, {
      key: row
    }, React.createElement("tr", null, React.createElement(LeftTd, {
      className: tdPadding
    }, step.left.value ? React.createElement(MathRenderer, {
      inline: true,
      state: step.left.value
    }) : null), React.createElement(SignTd, {
      className: tdPadding
    }, (row !== 0 || transformationTarget !== TransformationTarget.Term) && React.createElement(MathRenderer, {
      inline: true,
      state: renderSignToString(step.sign.value)
    })), React.createElement(MathTd, {
      className: tdPadding
    }, step.right.value ? React.createElement(MathRenderer, {
      inline: true,
      state: step.right.value
    }) : null), React.createElement(TransformTd, null, step.transform.value ? React.createElement(React.Fragment, null, "|", React.createElement(MathRenderer, {
      inline: true,
      state: step.transform.value
    })) : null)), isEmpty(step.explanation.id)(store.getState()) ? null : React.createElement(ExplanationTr, null, React.createElement("td", null), renderDownArrow(), React.createElement("td", {
      colSpan: 2,
      className: tdPadding
    }, step.explanation.render())));
  }))));
  function renderFirstExplanation() {
    if (isEmpty(state.firstExplanation.id)(store.getState())) return;
    return React.createElement(React.Fragment, null, React.createElement(FirstExplanationTr, null, React.createElement("td", {
      colSpan: 3,
      className: tdPadding
    }, state.firstExplanation.render())), React.createElement("tr", {
      style: {
        height: '30px'
      }
    }, React.createElement("td", null), renderDownArrow()));
  }
}
function renderDownArrow() {
  var downArrow = "\n    <svg xmlns=\"http://www.w3.org/2000/svg\">\n      <defs>\n        <marker\n          id=\"arrow\"\n          markerWidth=\"10\"\n          markerHeight=\"10\"\n          orient=\"auto\"\n          markerUnits=\"strokeWidth\"\n          refX=\"10\"\n          refY=\"5\"\n          viewBox=\"0 0 20 10\"\n        >\n          <path\n            d=\"M 0,0 l 10,5 l -10,5\"\n            stroke=\"#000\"\n            stroke-width=\"2\"\n            fill=\"none\"\n            vector-effect=\"non-scaling-size\"\n          />\n        </marker>\n      </defs>\n\n      <line\n        x1=\"10\"\n        y1=\"0%\"\n        x2=\"10\"\n        y2=\"99%\"\n        stroke=\"#000\"\n        stroke-width=\"2\"\n        marker-end=\"url(#arrow)\"\n        vector-effect=\"non-scaling-stroke\"\n      />\n    </svg>";
  var downArrowBase64 = Buffer.from(downArrow).toString('base64');
  return React.createElement("td", {
    style: {
      backgroundImage: "url('data:image/svg+xml;base64," + downArrowBase64 + "')",
      backgroundSize: '20px calc(100% - 10px)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center 5px'
    }
  });
}
function toTransformationTarget(text) {
  return isTransformationTarget(text) ? text : TransformationTarget.Equation;
}
function isTransformationTarget(text) {
  return Object.values(TransformationTarget).includes(text);
}

var StepSegment;
(function (StepSegment) {
  StepSegment[StepSegment["Left"] = 0] = "Left";
  StepSegment[StepSegment["Right"] = 1] = "Right";
  StepSegment[StepSegment["Transform"] = 2] = "Transform";
  StepSegment[StepSegment["Explanation"] = 3] = "Explanation";
})(StepSegment || (StepSegment = {}));
var preferenceKey = 'katex:usevisualmath';
setDefaultPreference(preferenceKey, true);
var RemoveButton = /*#__PURE__*/styled.button({
  outline: 'none',
  width: '35px',
  border: 'none',
  background: 'transparent'
});
var DragButton = /*#__PURE__*/styled.span({
  cursor: 'grab',
  paddingRight: '5px'
});
function EquationsEditor(props) {
  var focused = props.focused,
    state = props.state,
    config = props.config;
  var store = useScopedStore();
  var focusedElement = useScopedSelector(getFocused());
  var nestedFocus = focused || includes(focusedElement, props.state.steps.map(function (step) {
    return step.explanation.id;
  })) || focusedElement === state.firstExplanation.id;
  var transformationTarget = toTransformationTarget(state.transformationTarget.value);
  var gridFocus = useGridFocus({
    rows: state.steps.length,
    columns: 4,
    focusNext: function focusNext$1() {
      return store.dispatch(focusNext());
    },
    focusPrevious: function focusPrevious$1() {
      return store.dispatch(focusPrevious());
    },
    transformationTarget: transformationTarget,
    onFocusChanged: function onFocusChanged(state) {
      if (state === 'firstExplanation') {
        store.dispatch(focus(props.state.firstExplanation.id));
      } else if (state.column === StepSegment.Explanation) {
        store.dispatch(focus(props.state.steps[state.row].explanation.id));
      } else {
        store.dispatch(focus(props.id));
      }
    }
  });
  useEffect(function () {
    if (nestedFocus) {
      gridFocus.setFocus({
        row: 0,
        column: firstColumn(transformationTarget)
      });
      store.dispatch(focus(props.id));
    }
    //prevents loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nestedFocus]);
  if (!nestedFocus) return React.createElement(EquationsRenderer, Object.assign({}, props));
  return React.createElement(HotKeys, {
    allowChanges: true,
    keyMap: {
      FOCUS_NEXT_OR_INSERT: 'tab',
      FOCUS_PREVIOUS: 'shift+tab',
      INSERT: 'return'
    },
    handlers: {
      FOCUS_NEXT_OR_INSERT: function FOCUS_NEXT_OR_INSERT(e) {
        handleKeyDown(e, function () {
          if (gridFocus.isFocused({
            row: state.steps.length - 1,
            column: lastColumn(transformationTarget)
          })) {
            var index = state.steps.length;
            insertNewEquationAt(index);
            gridFocus.setFocus({
              row: index - 1,
              column: StepSegment.Explanation
            });
          } else {
            gridFocus.moveRight();
          }
        });
      },
      FOCUS_PREVIOUS: function FOCUS_PREVIOUS(e) {
        handleKeyDown(e, function () {
          return gridFocus.moveLeft();
        });
      },
      INSERT: function INSERT(e) {
        handleKeyDown(e, function () {
          if (!gridFocus.focus || gridFocus.focus === 'firstExplanation') return;
          insertNewEquationWithFocus(gridFocus.focus.row + 1);
        });
      }
    }
  }, React.createElement(React.Fragment, null, props.renderIntoSettings(React.createElement("div", null, React.createElement("label", {
    htmlFor: "transformationTarget"
  }, config.i18n.mode, ":"), ' ', React.createElement("select", {
    id: "transformationTarget",
    value: transformationTarget,
    onChange: function onChange(e) {
      return state.transformationTarget.set(e.target.value);
    }
  }, React.createElement("option", {
    value: TransformationTarget.Equation
  }, config.i18n.transformationOfEquations), React.createElement("option", {
    value: TransformationTarget.Term
  }, config.i18n.transformationOfTerms)))), React.createElement(TableWrapper, null, React.createElement(DragDropContext, {
    onDragEnd: function onDragEnd(result) {
      var source = result.source,
        destination = result.destination;
      if (!destination) return;
      state.steps.move(source.index, destination.index);
    }
  }, React.createElement(Droppable, {
    droppableId: "default"
  }, function (provided) {
    return React.createElement(Table, Object.assign({
      ref: provided.innerRef
    }, provided.droppableProps), renderFirstExplanation(), state.steps.map(function (step, row) {
      return React.createElement(Draggable, {
        key: step.explanation.id,
        draggableId: step.explanation.id,
        index: row
      }, function (provided) {
        return React.createElement("tbody", Object.assign({
          ref: provided.innerRef
        }, provided.draggableProps), React.createElement("tr", null, React.createElement("td", null, React.createElement(DragButton, Object.assign({}, provided.dragHandleProps, {
          tabIndex: -1
        }), React.createElement(EdtrIcon, {
          icon: edtrDragHandle
        }))), React.createElement(StepEditor, {
          gridFocus: gridFocus,
          row: row,
          state: step,
          transformationTarget: transformationTarget,
          config: config
        }), React.createElement("td", null, React.createElement(RemoveButton, {
          tabIndex: -1,
          onClick: function onClick() {
            return state.steps.remove(row);
          }
        }, React.createElement(Icon, {
          icon: faXmark
        })))), renderExplantionTr());
      });
      function renderExplantionTr() {
        if (row === state.steps.length - 1) return null;
        return React.createElement(ExplanationTr, {
          onFocus: function onFocus() {
            return gridFocus.setFocus({
              row: row,
              column: StepSegment.Explanation
            });
          }
        }, transformationTarget === TransformationTarget.Equation && React.createElement("td", null), React.createElement("td", null), !isEmpty(step.explanation.id)(store.getState()) ? renderDownArrow() : React.createElement("td", null), React.createElement("td", {
          colSpan: 2
        }, step.explanation.render({
          config: {
            placeholder: row === 0 && transformationTarget === TransformationTarget.Term ? config.i18n.combineLikeTerms : config.i18n.explanation
          }
        })));
      }
    }), provided.placeholder);
  })), renderAddButton())));
  function renderFirstExplanation() {
    var _config$i18n;
    if (transformationTarget === TransformationTarget.Term) return;
    return React.createElement("tbody", {
      onFocus: function onFocus() {
        return gridFocus.setFocus('firstExplanation');
      }
    }, React.createElement(FirstExplanationTr, null, React.createElement("td", null), React.createElement("td", {
      colSpan: 3
    }, state.firstExplanation.render({
      config: {
        placeholder: (_config$i18n = config.i18n) == null ? void 0 : _config$i18n.firstExplanation
      }
    }))), React.createElement("tr", {
      style: {
        height: '30px'
      }
    }, React.createElement("td", null), React.createElement("td", null), !isEmpty(state.firstExplanation.id)(store.getState()) ? renderDownArrow() : null));
  }
  function handleKeyDown(e, next) {
    e && e.preventDefault();
    next();
  }
  function insertNewEquationAt(index) {
    state.steps.insert(index, {
      left: '',
      sign: state.steps[index - 1].sign.value,
      right: '',
      transform: '',
      explanation: {
        plugin: 'text'
      }
    });
  }
  function insertNewEquationWithFocus(index) {
    insertNewEquationAt(index);
    gridFocus.setFocus({
      row: index,
      column: firstColumn(transformationTarget)
    });
  }
  function renderAddButton() {
    if (!nestedFocus) return;
    return React.createElement(AddButton, {
      onClick: function onClick() {
        return insertNewEquationWithFocus(state.steps.length);
      }
    }, config.i18n.addNew);
  }
}
var DropDown = /*#__PURE__*/styled.select({
  height: '30px',
  width: '35px',
  marginLeft: '15px',
  marginRight: '10px',
  backgroundColor: 'lightgrey',
  border: '1px solid lightgrey',
  borderRadius: '5px'
});
function StepEditor(props) {
  var gridFocus = props.gridFocus,
    row = props.row,
    state = props.state,
    transformationTarget = props.transformationTarget,
    config = props.config;
  return React.createElement(React.Fragment, null, transformationTarget === TransformationTarget.Equation && React.createElement(LeftTd, {
    onClick: function onClick() {
      return gridFocus.setFocus({
        row: row,
        column: StepSegment.Left
      });
    }
  }, React.createElement(InlineMath, {
    focused: gridFocus.isFocused({
      row: row,
      column: StepSegment.Left
    }),
    placeholder: row === 0 ? '3x+1' : "[" + config.i18n.leftHandSide + "]",
    state: state.left,
    onChange: function onChange(src) {
      return state.left.set(src);
    },
    onFocusNext: function onFocusNext() {
      return gridFocus.moveRight();
    },
    onFocusPrevious: function onFocusPrevious() {
      return gridFocus.moveLeft();
    }
  })), React.createElement(SignTd, null, (transformationTarget === 'equation' || row !== 0) && React.createElement(DropDown, {
    tabIndex: -1,
    onChange: function onChange(e) {
      state.sign.set(e.target.value);
    },
    value: state.sign.value
  }, [Sign.Equals, Sign.GreaterThan, Sign.LessThan, Sign.GreaterThanOrEqual, Sign.LessThanOrEqual, Sign.NotEqualTo, Sign.AlmostEqualTo, Sign.Estimates].map(function (sign) {
    return React.createElement("option", {
      key: sign,
      value: sign
    }, renderSignToString(sign));
  }))), React.createElement(MathTd, {
    onClick: function onClick() {
      return gridFocus.setFocus({
        row: row,
        column: StepSegment.Right
      });
    }
  }, React.createElement(InlineMath, {
    focused: gridFocus.isFocused({
      row: row,
      column: StepSegment.Right
    }),
    placeholder: row === 0 ? '4x+3x' : transformationTarget === TransformationTarget.Term ? "[" + config.i18n.term + "]" : "[" + config.i18n.rightHandSide + "]",
    state: state.right,
    onChange: function onChange(src) {
      return state.right.set(src);
    },
    onFocusNext: function onFocusNext() {
      return gridFocus.moveRight();
    },
    onFocusPrevious: function onFocusPrevious() {
      return gridFocus.moveLeft();
    }
  })), transformationTarget === TransformationTarget.Equation && React.createElement(TransformTd, {
    onClick: function onClick() {
      return gridFocus.setFocus({
        row: row,
        column: StepSegment.Transform
      });
    }
  }, "|", ' ', React.createElement(InlineMath, {
    focused: gridFocus.isFocused({
      row: row,
      column: StepSegment.Transform
    }),
    placeholder: row === 0 ? config.i18n.transformationExample : "[" + config.i18n.transformation + "]",
    state: state.transform,
    onChange: function onChange(src) {
      return state.transform.set(src);
    },
    onFocusNext: function onFocusNext() {
      return gridFocus.moveRight();
    },
    onFocusPrevious: function onFocusPrevious() {
      return gridFocus.moveLeft();
    }
  })));
}
function InlineMath(props) {
  var focused = props.focused,
    onFocusNext = props.onFocusNext,
    onFocusPrevious = props.onFocusPrevious,
    onChange = props.onChange,
    state = props.state,
    _props$prefix = props.prefix,
    prefix = _props$prefix === void 0 ? '' : _props$prefix,
    _props$suffix = props.suffix,
    suffix = _props$suffix === void 0 ? '' : _props$suffix;
  var preferences = useContext(PreferenceContext);
  return React.createElement(MathEditor, {
    readOnly: !focused,
    state: "" + prefix + state.value + suffix,
    config: {
      i18n: {
        placeholder: props.placeholder
      }
    },
    inline: true,
    disableBlock: true,
    visual: preferences.getKey(preferenceKey) === true,
    onEditorChange: function onEditorChange(visual) {
      preferences.setKey(preferenceKey, visual);
    },
    onInlineChange: function onInlineChange() {},
    onChange: onChange,
    onMoveOutRight: onFocusNext,
    onMoveOutLeft: onFocusPrevious
  });
}
function useGridFocus(_ref) {
  var rows = _ref.rows,
    columns = _ref.columns,
    focusNext = _ref.focusNext,
    focusPrevious = _ref.focusPrevious,
    onFocusChanged = _ref.onFocusChanged,
    transformationTarget = _ref.transformationTarget;
  var _useState = useState(null),
    focus = _useState[0],
    setFocusState = _useState[1];
  var _setFocus = function setFocus(state) {
    onFocusChanged(state);
    setFocusState(state);
  };
  var isFocused = function isFocused(state) {
    if (focus === null) return false;
    if (focus === 'firstExplanation') return state === focus;
    return state !== 'firstExplanation' && focus.row === state.row && focus.column === state.column;
  };
  return {
    focus: focus,
    isFocused: isFocused,
    setFocus: function setFocus(state) {
      if (!isFocused(state)) _setFocus(state);
    },
    moveRight: function moveRight() {
      if (focus === null) return;
      if (focus === 'firstExplanation') {
        _setFocus({
          row: 0,
          column: firstColumn(transformationTarget)
        });
        return;
      }
      if (focus.row === rows - 1 && focus.column === lastColumn(transformationTarget)) {
        focusNext();
      } else if (transformationTarget === TransformationTarget.Term) {
        if (focus.column === StepSegment.Right) {
          _setFocus({
            row: focus.row,
            column: StepSegment.Explanation
          });
        } else {
          _setFocus({
            row: focus.row + 1,
            column: firstColumn(transformationTarget)
          });
        }
      } else if (focus.column === columns - 1) {
        _setFocus({
          row: focus.row + 1,
          column: StepSegment.Left
        });
      } else {
        _setFocus({
          row: focus.row,
          column: focus.column + 1
        });
      }
    },
    moveLeft: function moveLeft() {
      if (focus === null) return;
      if (focus === 'firstExplanation') {
        focusPrevious();
        return;
      }
      if (transformationTarget === TransformationTarget.Term) {
        if (focus.row === 0 && focus.column === StepSegment.Right) {
          focusPrevious();
        } else if (focus.column === StepSegment.Right) {
          _setFocus({
            row: focus.row - 1,
            column: StepSegment.Explanation
          });
        } else {
          _setFocus({
            row: focus.row,
            column: StepSegment.Right
          });
        }
      } else {
        if (focus.column === 0) {
          if (focus.row === 0) {
            _setFocus('firstExplanation');
          } else {
            _setFocus({
              row: focus.row - 1,
              column: columns - 1
            });
          }
        } else {
          _setFocus({
            row: focus.row,
            column: focus.column - 1
          });
        }
      }
    }
  };
}
function firstColumn(transformationTarget) {
  return transformationTarget === TransformationTarget.Term ? StepSegment.Right : StepSegment.Left;
}
function lastColumn(transformationTarget) {
  return transformationTarget === TransformationTarget.Term ? StepSegment.Right : StepSegment.Transform;
}

var stepProps = /*#__PURE__*/object({
  left: /*#__PURE__*/string(''),
  sign: /*#__PURE__*/string(Sign.Equals),
  right: /*#__PURE__*/string(''),
  transform: /*#__PURE__*/string(''),
  explanation: /*#__PURE__*/child({
    plugin: 'text',
    config: {
      registry: []
    }
  })
});
var equationsState = /*#__PURE__*/object({
  steps: /*#__PURE__*/list(stepProps, 2),
  firstExplanation: /*#__PURE__*/child({
    plugin: 'text',
    config: {
      registry: []
    }
  }),
  transformationTarget: /*#__PURE__*/string('equation')
});
/**
 * @param config - {@link EquationsConfig | Plugin configuration}
 * @public
 */
function createEquationsPlugin(config) {
  return {
    Component: EquationsEditor,
    config: config,
    state: equationsState
  };
}

export { Sign, createEquationsPlugin, renderSignToString, stepProps };
//# sourceMappingURL=plugin-equations.esm.js.map
