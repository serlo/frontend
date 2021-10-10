import { setDefaultPreference, PreferenceContext, Editor as Editor$2 } from '@edtr-io/core/beta';
import { createDefaultDocumentEditor } from '@edtr-io/default-document-editor/beta';
import { styled, Icon, faTrashAlt, faCheck, ThemeProvider, EdtrIcon, edtrDragHandle, faExternalLinkAlt, faTimes, faRandom, faNewspaper as faNewspaper$1, createIcon, faParagraph, faQuoteRight, faCubes, faCode, faAnchor, faImages, faPhotoVideo, faCaretSquareDown, faFilm } from '@edtr-io/ui';
import { useI18n } from '@serlo/i18n';
import React__default, { useContext, useState, useEffect, createElement, Fragment, useRef, useCallback, createRef, useLayoutEffect, forwardRef, createContext } from 'react';
import { isEdtr, convert } from '@serlo/legacy-editor-to-editor';
import { flatten, concat, has, mapObjIndexed, values, includes, map } from 'ramda';
import { createTextPlugin } from '@edtr-io/plugin-text';
import { createAnchorPlugin } from '@edtr-io/plugin-anchor';
import { createBlockquotePlugin } from '@edtr-io/plugin-blockquote';
import { createGeogebraPlugin } from '@edtr-io/plugin-geogebra';
import { createHighlightPlugin } from '@edtr-io/plugin-highlight';
import { createInputExercisePlugin, InputExerciseType } from '@edtr-io/plugin-input-exercise';
import { createMultimediaExplanationPlugin } from '@edtr-io/plugin-multimedia-explanation';
import { createRowsPlugin } from '@edtr-io/plugin-rows';
import { createScMcExercisePlugin } from '@edtr-io/plugin-sc-mc-exercise';
import { createSpoilerPlugin } from '@edtr-io/plugin-spoiler';
import { createVideoPlugin } from '@edtr-io/plugin-video';
import { object, number, string, child, list, boolean, scalar, optional } from '@edtr-io/plugin';
import { useScopedStore, useScopedDispatch, useScopedSelector, PluginToolbarButton, HotKeys, OverlayInput } from '@edtr-io/core';
import { hasUndoActions, hasRedoActions, getPendingChanges, undo, redo, serializeRootDocument, getDocument, isEmpty, getFocused, focus, focusNext, focusPrevious, serializeDocument, replace } from '@edtr-io/store';
import BSAlert from 'react-bootstrap/lib/Alert';
import BSModal from 'react-bootstrap/lib/Modal';
import BSButton from 'react-bootstrap/lib/Button';
import BSCheckbox from 'react-bootstrap/lib/Checkbox';
import BSFormGroup from 'react-bootstrap/lib/FormGroup';
import BSControlLabel from 'react-bootstrap/lib/ControlLabel';
import BSFormControl from 'react-bootstrap/lib/FormControl';
import { createPortal } from 'react-dom';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';
import moment from 'moment';
import BSTable from 'react-bootstrap/lib/Table';
import fetch from 'unfetch';
import { AddButton, PreviewOverlay } from '@edtr-io/editor-ui/internal';
import { useVirtual } from 'react-virtual';
import { ExpandableBox, styled as styled$2 } from '@edtr-io/renderer-ui';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Plain from 'slate-plain-serializer';
import { Editor as Editor$1 } from 'slate-react';
import styled$3, { ThemeProvider as ThemeProvider$1 } from 'styled-components';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons/faPlayCircle';
import { MathRenderer, MathEditor } from '@edtr-io/math';
import { styled as styled$1, EditorInlineSettings, EditorInput } from '@edtr-io/editor-ui';
import { createImagePlugin as createImagePlugin$1 } from '@edtr-io/plugin-image';
import { createTablePlugin } from '@edtr-io/plugin-table';
import { converter } from '@serlo/markdown';
import { initMathJax, typeset } from '@serlo/mathjax';
import { Renderer as Renderer$1 } from '@edtr-io/renderer';
import { serializer, slateValueToHtml } from '@edtr-io/plugin-text/internal';
import { Value } from 'slate';

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var CsrfContext = /*#__PURE__*/React__default.createContext(function () {
  return '';
});

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["content", "text-solution", "single-choice-right-answer", "single-choice-wrong-answer", "multiple-choice-right-answer", "multiple-choice-wrong-answer", "input-expression-equal-match-challenge", "input-number-exact-match-challenge", "input-string-normalized-match-challenge"];
var empty = {
  plugin: 'rows',
  state: []
};
function deserialize(_ref) {
  var initialState = _ref.initialState,
      type = _ref.type,
      onError = _ref.onError;
  var stack = [];
  var config = {
    applet: {
      deserialize: deserializeApplet
    },
    article: {
      deserialize: deserializeArticle
    },
    course: {
      deserialize: deserializeCourse
    },
    'course-page': {
      deserialize: deserializeCoursePage
    },
    event: {
      deserialize: deserializeEvent
    },
    'math-puzzle': {
      deserialize: deserializeMathPuzzle
    },
    page: {
      deserialize: deserializePage
    },
    'grouped-text-exercise': {
      deserialize: deserializeTextExercise
    },
    'text-exercise': {
      deserialize: deserializeTextExercise
    },
    'text-exercise-group': {
      deserialize: deserializeTextExerciseGroup
    },
    'text-solution': {
      deserialize: deserializeTextSolution
    },
    user: {
      deserialize: deserializeUser
    },
    video: {
      deserialize: deserializeVideo
    },
    taxonomy: {
      deserialize: deserializeTaxonomy
    }
  };

  try {
    if (config[type] === undefined) {
      return {
        error: 'type-unsupported'
      };
    }

    var _deserialize = config[type].deserialize;
    return succeed(_deserialize(initialState));
  } catch (e) {
    var error = e;

    if (typeof onError === 'function') {
      onError(error, {
        stack: JSON.stringify(stack)
      });
    }

    return {
      error: 'failure'
    };
  }

  function succeed(deserialized) {
    return _extends({
      success: true
    }, deserialized);
  }

  function deserializeApplet(state) {
    stack.push({
      id: state.id,
      type: 'applet'
    });
    return {
      initialState: {
        plugin: 'type-applet',
        state: _extends({}, state, {
          changes: '',
          title: state.title || '',
          url: state.url || '',
          content: serializeEditorState(toEdtr(deserializeEditorState(state.content))),
          reasoning: serializeEditorState(toEdtr(deserializeEditorState(state.reasoning))),
          meta_title: state.meta_title || '',
          meta_description: state.meta_description || ''
        })
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty)
    };
  }

  function deserializeArticle(state) {
    stack.push({
      id: state.id,
      type: 'article'
    });
    return {
      initialState: {
        plugin: 'type-article',
        state: _extends({}, state, {
          changes: '',
          title: state.title || '',
          content: getContent(),
          reasoning: serializeEditorState(toEdtr(deserializeEditorState(state.reasoning))),
          meta_title: state.meta_title || '',
          meta_description: state.meta_description || ''
        })
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty)
    };

    function getContent() {
      var deserializedContent = deserializeEditorState(state.content);
      var convertedContent = toEdtr(deserializedContent);

      if (deserializedContent !== undefined && isEdtr(deserializedContent) && convertedContent.plugin === 'article') {
        return serializeEditorState(convertedContent);
      }

      return serializeEditorState({
        plugin: 'article',
        state: {
          introduction: {
            plugin: 'articleIntroduction'
          },
          content: convertedContent,
          exercises: [],
          exerciseFolder: {
            id: '',
            title: ''
          },
          relatedContent: {
            articles: [],
            courses: [],
            videos: []
          },
          sources: []
        }
      });
    }
  }

  function deserializeCourse(state) {
    stack.push({
      id: state.id,
      type: 'course'
    });
    return {
      initialState: {
        plugin: 'type-course',
        state: _extends({}, state, {
          changes: '',
          title: state.title || '',
          description: serializeEditorState(toEdtr(deserializeEditorState(state.description))),
          reasoning: serializeEditorState(toEdtr(deserializeEditorState(state.reasoning))),
          meta_description: state.meta_description || '',
          'course-page': (state['course-page'] || []).map(function (s) {
            return deserializeCoursePage(s).initialState.state;
          })
        })
      },
      converted: !isEdtr(deserializeEditorState(state.description) || empty)
    };
  }

  function deserializeCoursePage(state) {
    stack.push({
      id: state.id,
      type: 'course-page'
    });
    return {
      initialState: {
        plugin: 'type-course-page',
        state: _extends({}, state, {
          changes: '',
          title: state.title || '',
          icon: state.icon || 'explanation',
          content: serializeEditorState(toEdtr(deserializeEditorState(state.content)))
        })
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty)
    };
  }

  function deserializeEvent(state) {
    stack.push({
      id: state.id,
      type: 'event'
    });
    return {
      initialState: {
        plugin: 'type-event',
        state: _extends({}, state, {
          changes: '',
          title: state.title || '',
          content: serializeEditorState(toEdtr(deserializeEditorState(state.content))),
          meta_title: state.meta_title || '',
          meta_description: state.meta_description || ''
        })
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty)
    };
  }

  function deserializeMathPuzzle(state) {
    stack.push({
      id: state.id,
      type: 'math-puzzle'
    });
    return {
      initialState: {
        plugin: 'type-math-puzzle',
        state: _extends({}, state, {
          changes: '',
          content: serializeEditorState(toEdtr(deserializeEditorState(state.content))),
          source: state.source || ''
        })
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty)
    };
  }

  function deserializePage(state) {
    stack.push({
      id: state.id,
      type: 'page'
    });
    return {
      initialState: {
        plugin: 'type-page',
        state: _extends({}, state, {
          title: state.title || '',
          content: serializeEditorState(toEdtr(deserializeEditorState(state.content)))
        })
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty)
    };
  }

  function deserializeTaxonomy(state) {
    stack.push({
      id: state.id,
      type: 'taxonomy'
    });
    return {
      initialState: {
        plugin: 'type-taxonomy',
        state: _extends({}, state, {
          term: state.term,
          description: serializeEditorState(toEdtr(deserializeEditorState(state.description)))
        })
      },
      converted: false
    };
  }

  function deserializeTextExercise(_ref2) {
    var content = _ref2.content,
        textSolution = _ref2['text-solution'],
        singleChoiceRightAnswer = _ref2['single-choice-right-answer'],
        singleChoiceWrongAnswer = _ref2['single-choice-wrong-answer'],
        multipleChoiceRightAnswer = _ref2['multiple-choice-right-answer'],
        multipleChoiceWrongAnswer = _ref2['multiple-choice-wrong-answer'],
        inputExpressionEqualMatchChallenge = _ref2['input-expression-equal-match-challenge'],
        inputNumberExactMatchChallenge = _ref2['input-number-exact-match-challenge'],
        inputStringNormalizedMatchChallenge = _ref2['input-string-normalized-match-challenge'],
        state = _objectWithoutPropertiesLoose(_ref2, _excluded);

    stack.push({
      id: state.id,
      type: 'text-exercise'
    });
    var deserialized = deserializeEditorState(content);
    var scMcExercise = deserialized && !isEdtr(deserialized) ? deserializeScMcExercise() : undefined;
    var inputExercise = deserialized && !isEdtr(deserialized) ? deserializeInputExercise() : undefined;
    return {
      initialState: {
        plugin: 'type-text-exercise',
        state: _extends({}, state, {
          changes: '',
          'text-solution': textSolution ? deserializeTextSolution(textSolution).initialState.state : '',
          content: getContent()
        })
      },
      converted: !isEdtr(deserialized || empty)
    };

    function getContent() {
      var deserializedContent = deserializeEditorState(content);

      if (deserializedContent !== undefined && isEdtr(deserializedContent)) {
        return serializeEditorState(toEdtr(deserializedContent));
      }

      var convertedContent = toEdtr(deserializedContent);
      var interactive = scMcExercise || inputExercise;
      return serializeEditorState({
        plugin: 'exercise',
        state: {
          content: {
            plugin: 'rows',
            state: convertedContent.state
          },
          interactive: interactive
        }
      });
    }

    function deserializeScMcExercise() {
      stack.push({
        id: state.id,
        type: 'sc-mc-exercise'
      });

      if (singleChoiceWrongAnswer || singleChoiceRightAnswer || multipleChoiceWrongAnswer || multipleChoiceRightAnswer) {
        var convertedSCRightAnswers = singleChoiceRightAnswer && singleChoiceRightAnswer.content ? [{
          content: extractChildFromRows(convert(deserializeEditorState(singleChoiceRightAnswer.content))),
          isCorrect: true,
          feedback: extractChildFromRows(convert(deserializeEditorState(singleChoiceRightAnswer.feedback)))
        }] : [];
        var convertedSCWrongAnswers = singleChoiceWrongAnswer ? singleChoiceWrongAnswer.filter(function (answer) {
          return answer.content;
        }).map(function (answer) {
          return {
            content: extractChildFromRows(convert(deserializeEditorState(answer.content))),
            isCorrect: false,
            feedback: extractChildFromRows(convert(deserializeEditorState(answer.feedback)))
          };
        }) : [];
        var convertedMCRightAnswers = multipleChoiceRightAnswer ? multipleChoiceRightAnswer.filter(function (answer) {
          return answer.content;
        }).map(function (answer) {
          return {
            content: extractChildFromRows(convert(deserializeEditorState(answer.content))),
            isCorrect: true,
            feedback: {
              plugin: 'text'
            }
          };
        }) : [];
        var convertedMCWrongAnswers = multipleChoiceWrongAnswer ? multipleChoiceWrongAnswer.filter(function (answer) {
          return answer.content;
        }).map(function (answer) {
          return {
            content: extractChildFromRows(convert(deserializeEditorState(answer.content))),
            isCorrect: false,
            feedback: extractChildFromRows(convert(deserializeEditorState(answer.feedback)))
          };
        }) : [];
        var isSingleChoice = !(convertedMCRightAnswers.length || convertedMCWrongAnswers.length);
        return {
          plugin: 'scMcExercise',
          state: {
            isSingleChoice: isSingleChoice,
            answers: [].concat(isSingleChoice ? convertedSCRightAnswers : [], isSingleChoice ? convertedSCWrongAnswers : [], !isSingleChoice ? convertedMCRightAnswers : [], !isSingleChoice ? convertedMCWrongAnswers : [])
          }
        };
      }
    }

    function deserializeInputExercise() {
      if (inputStringNormalizedMatchChallenge || inputNumberExactMatchChallenge || inputExpressionEqualMatchChallenge) {
        var _type = inputStringNormalizedMatchChallenge ? 'input-string-normalized-match-challenge' : inputNumberExactMatchChallenge ? 'input-number-exact-match-challenge' : 'input-expression-equal-match-challenge';

        var inputExercises = filterDefined([inputStringNormalizedMatchChallenge, inputNumberExactMatchChallenge, inputExpressionEqualMatchChallenge]);
        return {
          plugin: 'inputExercise',
          state: {
            type: _type,
            answers: extractInputAnswers(inputExercises, true),
            unit: ''
          }
        };
      }

      function extractInputAnswers(inputExercises, isCorrect) {
        if (inputExercises.length === 0) return [];
        var answers = inputExercises.map(function (exercise) {
          return {
            value: exercise.solution,
            feedback: extractChildFromRows(convert(deserializeEditorState(exercise.feedback))),
            isCorrect: isCorrect
          };
        });
        var children = flatten(inputExercises.map(function (exercise) {
          return filterDefined([exercise['input-string-normalized-match-challenge'], exercise['input-number-exact-match-challenge'], exercise['input-expression-equal-match-challenge']]);
        }));
        return concat(answers, extractInputAnswers(children, false));
      }

      function filterDefined(array) {
        return array.filter(function (el) {
          return typeof el !== 'undefined';
        });
      }
    }
  }

  function extractChildFromRows(plugin) {
    return plugin.state.length ? plugin.state[0] : {
      plugin: 'text'
    };
  }

  function deserializeTextExerciseGroup(state) {
    stack.push({
      id: state.id,
      type: 'text-exercise-group'
    });
    return {
      initialState: {
        plugin: 'type-text-exercise-group',
        state: _extends({}, state, {
          changes: '',
          content: serializeEditorState(toEdtr(deserializeEditorState(state.content))),
          cohesive: state.cohesive === 'true',
          'grouped-text-exercise': (state['grouped-text-exercise'] || []).map(function (s) {
            return deserializeTextExercise(s).initialState.state;
          })
        })
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty)
    };
  }

  function deserializeTextSolution(state) {
    stack.push({
      id: state.id,
      type: 'text-solution'
    });
    return {
      initialState: {
        plugin: 'type-text-solution',
        state: _extends({}, state, {
          changes: '',
          content: getContent()
        })
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty)
    };

    function getContent() {
      var deserializedContent = deserializeEditorState(state.content);

      if (deserializedContent !== undefined && isEdtr(deserializedContent)) {
        return serializeEditorState(toEdtr(deserializedContent));
      }

      var convertedContent = toEdtr(deserializedContent);
      return serializeEditorState({
        plugin: 'solution',
        state: {
          prerequisite: undefined,
          strategy: {
            plugin: 'text'
          },
          steps: convertedContent
        }
      });
    }
  }

  function deserializeUser(state) {
    stack.push({
      id: state.id,
      type: 'user'
    });
    return {
      initialState: {
        plugin: 'type-user',
        state: _extends({}, state, {
          description: serializeEditorState(toEdtr(deserializeEditorState(state.description)))
        })
      },
      converted: false
    };
  }

  function deserializeVideo(state) {
    stack.push({
      id: state.id,
      type: 'video'
    });
    return {
      initialState: {
        plugin: 'type-video',
        state: _extends({}, state, {
          changes: '',
          title: state.title || '',
          description: serializeEditorState(toEdtr(deserializeEditorState(state.description))),
          content: state.content || '',
          reasoning: serializeEditorState(toEdtr(deserializeEditorState(state.reasoning)))
        })
      },
      converted: !isEdtr(deserializeEditorState(state.description) || empty)
    };
  }
}
function isError(result) {
  return !!result.error;
}

function toEdtr(content) {
  if (!content) return {
    plugin: 'rows',
    state: [{
      plugin: 'text',
      state: undefined
    }]
  };
  if (isEdtr(content)) return content;
  return convert(content);
}

function serializeEditorState(content) {
  if (typeof content === 'string') return content;
  return content ? JSON.stringify(content) : undefined;
}

function deserializeEditorState(content) {
  try {
    return content ? JSON.parse(content) : undefined;
  } catch (_unused) {
    // No valid JSON, so this is interpreted as Markdown
    return content;
  }
}

var licenseState = /*#__PURE__*/object({
  id: /*#__PURE__*/number(),
  title: /*#__PURE__*/string(),
  url: /*#__PURE__*/string(),
  agreement: /*#__PURE__*/string(),
  iconHref: /*#__PURE__*/string()
});
var uuid = {
  id: /*#__PURE__*/number()
};
var license = {
  license: licenseState
};
var entity = /*#__PURE__*/_extends({}, uuid, license, {
  revision: /*#__PURE__*/number(),
  changes: /*#__PURE__*/string()
});
var HeaderInput = /*#__PURE__*/styled.input({
  border: 'none',
  width: '100%',
  borderBottom: '2px solid transparent',
  '&:focus': {
    outline: 'none',
    borderColor: '#007ec1'
  }
});
function Controls(props) {
  var i18n = useI18n();
  var store = useScopedStore();
  var dispatch = useScopedDispatch();
  var undoable = useScopedSelector(hasUndoActions());
  var redoable = useScopedSelector(hasRedoActions());
  var pendingChanges = useScopedSelector(getPendingChanges());
  var hasPendingChanges = pendingChanges !== 0;
  var getCsrfToken = useContext(CsrfContext);

  var _React$useState = useState(false),
      visible = _React$useState[0],
      setVisibility = _React$useState[1];

  var _React$useState2 = useState(false),
      pending = _React$useState2[0],
      setPending = _React$useState2[1];

  var _React$useState3 = useState(false),
      hasError = _React$useState3[0],
      setHasError = _React$useState3[1];

  var _React$useState4 = useState(false),
      savedToLocalstorage = _React$useState4[0],
      setSavedToLocalstorage = _React$useState4[1];

  var _React$useContext = useContext(SaveContext),
      onSave = _React$useContext.onSave,
      mayCheckout = _React$useContext.mayCheckout;

  var _React$useState5 = useState(false),
      agreement = _React$useState5[0],
      setAgreement = _React$useState5[1];

  var _React$useState6 = useState(true),
      emailSubscription = _React$useState6[0],
      setEmailSubscription = _React$useState6[1];

  var _React$useState7 = useState(true),
      notificationSubscription = _React$useState7[0],
      setNotificationSubscription = _React$useState7[1];

  var _React$useState8 = useState(false),
      autoCheckout = _React$useState8[0],
      setAutoCheckout = _React$useState8[1];

  useEffect(function () {
    if (visible) {
      // Reset license agreement
      setPending(false);
      setHasError(false);
      setSavedToLocalstorage(false);
      setAgreement(false);
    }
  }, [visible]);
  useEffect(function () {
    window.onbeforeunload = hasPendingChanges && !pending ? function () {
      return '';
    } : null;
  }, [hasPendingChanges, pending]);
  return createElement(Fragment, null, createPortal(createElement("div", {
    className: "btn-group btn-group-community"
  }, createElement("button", {
    className: "btn btn-default",
    onClick: function onClick() {
      dispatch(undo());
    },
    disabled: !undoable
  }, createElement("span", {
    className: "fa fa-undo"
  })), createElement("button", {
    className: "btn btn-default",
    onClick: function onClick() {
      dispatch(redo());
    },
    disabled: !redoable
  }, createElement("span", {
    className: "fa fa-repeat"
  })), renderSaveButton()), document.getElementsByClassName('controls')[0]), createElement(BSModal, {
    show: visible,
    onHide: function onHide() {
      setVisibility(false);
    }
  }, createElement(BSModal.Header, {
    closeButton: true
  }, createElement(BSModal.Title, null, i18n.t('edtr-io::Save'))), createElement(BSModal.Body, null, renderAlert(), renderChanges(), renderLicense(), renderSubscription(), renderCheckout()), createElement(BSModal.Footer, null, createElement(BSButton, {
    onClick: function onClick() {
      setVisibility(false);
    }
  }, i18n.t('edtr-io::Cancel')), createElement(BSButton, {
    onClick: function onClick() {
      handleSave();
    },
    bsStyle: "success",
    disabled: !maySave() || pending,
    title: getSaveHint()
  }, pending ? i18n.t('edtr-io::Saving…') : i18n.t('edtr-io::Save')))));

  function renderSaveButton() {
    var useOverlay = props.changes || props.license || props.subscriptions;
    var buttonProps = useOverlay ? {
      onClick: function onClick() {
        setVisibility(true);
      },
      disabled: !hasPendingChanges,
      children: createElement("span", {
        className: "fa fa-save"
      })
    } : {
      onClick: function onClick() {
        handleSave();
      },
      disabled: !hasPendingChanges || !maySave() || pending,
      children: pending ? createElement("span", {
        className: "fa fa-spinner fa-spin"
      }) : createElement("span", {
        className: "fa fa-save"
      })
    };
    return createElement("button", Object.assign({
      className: "btn btn-success"
    }, buttonProps));
  }

  function licenseAccepted() {
    return !props.license || agreement;
  }

  function changesFilledIn() {
    return !props.changes || props.changes.value;
  }

  function maySave() {
    return licenseAccepted() && changesFilledIn();
  }

  function getSaveHint() {
    if (maySave()) return undefined;

    if (licenseAccepted() && !changesFilledIn()) {
      return i18n.t('edtr-io::You need to fill out the changes you made');
    } else if (!licenseAccepted() && changesFilledIn()) {
      return i18n.t('edtr-io::You need to accept the license terms');
    } else {
      return i18n.t('edtr-io::You need to fill out the changes you made and accept the license terms');
    }
  }

  function handleSave() {
    if (!maySave()) return;
    var serializedRoot = serializeRootDocument()(store.getState());
    var serialized = has('state', serializedRoot) ? serializedRoot.state : null;

    if (serialized !== null && (serializedRoot == null ? void 0 : serializedRoot.plugin) === 'type-text-exercise-group' && has('cohesive', serialized)) {
      // legacy server can only handle string attributes
      serialized.cohesive = String(serialized.cohesive);
    }

    setPending(true);
    onSave(_extends({}, serialized, {
      csrf: getCsrfToken(),
      controls: _extends({}, props.subscriptions ? {
        subscription: {
          subscribe: notificationSubscription ? 1 : 0,
          mailman: emailSubscription ? 1 : 0
        }
      } : {}, mayCheckout ? {
        checkout: autoCheckout
      } : {})
    })).then(function () {
      storeState(undefined);
      setPending(false);
      setHasError(false);
    })["catch"](function () {
      setPending(false);
      setHasError(true);
    });
  }

  function renderAlert() {
    if (!hasError) return null;
    return createElement(Fragment, null, createElement(BSAlert, {
      bsStyle: "danger",
      onDismiss: function onDismiss() {
        setHasError(false);
      }
    }, i18n.t('edtr-io::An error occurred during saving.'), createElement("br", null), i18n.t('edtr-io::You can store the revision locally, refresh the page and try to save again.')), createElement(BSModal.Footer, null, createElement(BSButton, {
      bsStyle: "success",
      onClick: function onClick() {
        var serializedRoot = serializeRootDocument()(store.getState());
        storeState(serializedRoot);
        setSavedToLocalstorage(true);
      }
    }, savedToLocalstorage ? i18n.t('edtr-io::Revision saved') : i18n.t('edtr-io::Save revision'))));
  }

  function renderChanges() {
    var changes = props.changes;
    if (!changes) return null;
    return createElement(BSFormGroup, {
      controlId: "changes"
    }, createElement(BSControlLabel, null, i18n.t('edtr-io::Changes')), createElement(BSFormControl, {
      componentClass: "textarea",
      value: changes.value,
      onChange: function onChange(e) {
        var value = e.target.value;
        changes.set(value);
      }
    }));
  }

  function renderCheckout() {
    if (!mayCheckout) return null;
    return createElement(BSCheckbox, {
      checked: autoCheckout,
      onChange: function onChange(e) {
        var checked = e.target.checked;
        setAutoCheckout(checked);
      }
    }, i18n.t('edtr-io::Skip peer review (not recommended)'));
  }

  function renderLicense() {
    var license = props.license;
    if (!license) return null;
    return createElement(BSCheckbox, {
      checked: agreement,
      onChange: function onChange(e) {
        var checked = e.target.checked;
        setAgreement(checked);
      }
    }, createElement("span", {
      dangerouslySetInnerHTML: {
        __html: license.agreement.value
      }
    }));
  }

  function renderSubscription() {
    var subscriptions = props.subscriptions;
    if (!subscriptions) return null;
    return createElement(Fragment, null, createElement(BSCheckbox, {
      checked: notificationSubscription,
      onChange: function onChange(e) {
        var checked = e.target.checked;
        setNotificationSubscription(checked);
      }
    }, i18n.t('edtr-io::Enable serlo.org notifications')), createElement(BSCheckbox, {
      checked: emailSubscription,
      onChange: function onChange(e) {
        var checked = e.target.checked;
        setEmailSubscription(checked);
      }
    }, i18n.t('edtr-io::Enable notifications via e-mail')));
  }
}
function entityType(ownTypes, children, getFocusableChildren) {
  var objectType = object(_extends({}, ownTypes, children), getFocusableChildren);
  return _extends({}, objectType, {
    init: function init(state, onChange) {
      var initialisedObject = objectType.init(state, onChange);
      return _extends({}, initialisedObject, {
        replaceOwnState: function replaceOwnState(newValue) {
          onChange(function (previousState, helpers) {
            return mapObjIndexed(function (_value, key) {
              if (key in ownTypes) {
                return ownTypes[key].deserialize(newValue[key], helpers);
              } else {
                return previousState[key];
              }
            }, previousState);
          });
        }
      });
    }
  });
}
function editorContent(plugin) {
  if (plugin === void 0) {
    plugin = 'rows';
  }

  var originalChild = child({
    plugin: plugin
  });
  return _extends({}, originalChild, {
    serialize: function serialize() {
      return JSON.stringify(originalChild.serialize.apply(originalChild, arguments));
    },
    deserialize: function deserialize(serialized, helpers) {
      return originalChild.deserialize(JSON.parse(serialized), helpers);
    }
  });
}
function serializedChild(plugin) {
  var originalChild = child({
    plugin: plugin,
    config: {
      skipControls: true
    }
  });
  return _extends({}, originalChild, {
    serialize: function serialize() {
      return originalChild.serialize.apply(originalChild, arguments).state;
    },
    deserialize: function deserialize(serialized, helpers) {
      return originalChild.deserialize({
        plugin: plugin,
        state: serialized
      }, helpers);
    }
  });
}
function optionalSerializedChild(plugin) {
  var child = serializedChild(plugin);
  return _extends({}, child, {
    init: function init(state, onChange) {
      return _extends({}, child.init(state, function (updater) {
        onChange(function (oldId, helpers) {
          return updater(oldId || '', helpers);
        });
      }), {
        create: function create(state) {
          onChange(function (_oldId, helpers) {
            if (typeof state !== 'undefined') {
              return child.deserialize(state, helpers);
            }

            return child.createInitialState(helpers);
          });
        },
        remove: function remove() {
          onChange(function () {
            return null;
          });
        }
      });
    },
    serialize: function serialize(deserialized, helpers) {
      if (!deserialized) return null;
      return child.serialize(deserialized, helpers);
    },
    deserialize: function deserialize(serialized, helpers) {
      if (!serialized) return null;
      return child.deserialize(serialized, helpers);
    },
    createInitialState: function createInitialState() {
      return null;
    },
    getFocusableChildren: function getFocusableChildren(child) {
      return child ? [{
        id: child
      }] : [];
    }
  });
}
function OptionalChild(props) {
  var expectedStateType = object(entity);
  var document = useScopedSelector(getDocument(props.state.id));
  var children = props.state.render({
    renderToolbar: function renderToolbar(children) {
      if (document.state.id !== 0) return children;
      return createElement(Fragment, null, createElement(PluginToolbarButton, {
        icon: createElement(Icon, {
          icon: faTrashAlt
        }),
        label: props.removeLabel,
        onClick: function onClick() {
          props.onRemove();
        }
      }), children);
    }
  });
  return createElement(Fragment, null, createElement("hr", null), children);
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var StyledTR = /*#__PURE__*/styled.tr(function (props) {
  return props.selected ? {
    border: '3px solid rgb(0,100,0)'
  } : {
    cursor: 'pointer'
  };
});
function RevisionHistory(props) {
  var _React$useState = useState([]),
      availableRevisions = _React$useState[0],
      setAvailableRevisions = _React$useState[1];

  var i18n = useI18n();

  var _React$useState2 = useState(false),
      showRevisions = _React$useState2[0],
      setShowRevisions = _React$useState2[1];

  useEffect(function () {
    if (props.id !== 0) {
      fetch("/entity/repository/get-revisions/" + props.id).then(function (response) {
        return response.json();
      }).then(function (data) {
        setAvailableRevisions(data);
      });
    }
  }, [props.id]);
  return createElement("div", null, createElement("span", {
    onClick: function onClick() {
      if (availableRevisions.length) {
        setShowRevisions(true);
      }
    }
  }, createElement(PluginToolbarButton, {
    icon: createElement(Icon, {
      icon: faHistory,
      size: "lg"
    }),
    label: i18n.t('edtr-io::Switch to another revision')
  })), createElement(BSModal, {
    show: showRevisions,
    onHide: function onHide() {
      setShowRevisions(false);
    },
    bsSize: "lg"
  }, createElement(BSModal.Header, {
    closeButton: true
  }, createElement(BSModal.Title, null, i18n.t('edtr-io::Switch to another revision'))), createElement(BSModal.Body, null, createElement(BSTable, {
    striped: true,
    hover: true
  }, createElement("thead", null, createElement("tr", null, createElement("th", null, "#"), createElement("th", null, i18n.t('edtr-io::Current')), createElement("th", null, i18n.t('edtr-io::Changes')), createElement("th", null, i18n.t('edtr-io::Author')), createElement("th", null, i18n.t('edtr-io::Created at')))), createElement("tbody", null, availableRevisions.map(function (revisionData) {
    var selected = props.currentRevision ? props.currentRevision === revisionData.id : revisionData.active;
    var dateTime = moment.utc(revisionData.timestamp).local();
    return createElement(StyledTR, {
      selected: selected,
      onClick: function onClick() {
        // don't select the current selected
        if (selected) return;
        fetch("/entity/repository/get-revision-data/" + props.id + "/" + revisionData.id).then(function (response) {
          return response.json();
        }).then(function (data) {
          var deserialized = deserialize({
            initialState: data.state,
            type: data.type
          });

          if (isError(deserialized)) {
            alert(deserialized.error);
          } else {
            props.onSwitchRevision(deserialized.initialState.state);
            setShowRevisions(false);
          }
        });
      },
      key: revisionData.id
    }, createElement("td", null, revisionData.id), createElement("td", null, revisionData.active ? createElement(Icon, {
      icon: faCheck
    }) : null), createElement("th", null, revisionData.changes), createElement("td", null, revisionData.author), createElement("td", {
      title: dateTime.format('LL, LTS')
    }, dateTime.fromNow()));
  })))), createElement(BSModal.Footer, null, createElement(BSButton, {
    onClick: function onClick() {
      setShowRevisions(false);
    }
  }, "Schlie\xDFen"))));
}
function Settings(props) {
  return createElement(Fragment, null, props.children);
}

Settings.Textarea = function SettingsTextarea(_ref) {
  var label = _ref.label,
      state = _ref.state;
  return createElement(BSFormGroup, null, createElement(BSControlLabel, null, label), createElement(BSFormControl, {
    componentClass: "textarea",
    value: state.value,
    onChange: function onChange(e) {
      var value = e.target.value;
      state.set(value);
    }
  }));
};

Settings.Select = function SettingsSelect(_ref2) {
  var label = _ref2.label,
      state = _ref2.state,
      options = _ref2.options;
  return createElement(BSFormGroup, {
    controlId: "formControlsSelect"
  }, createElement(BSControlLabel, null, label), createElement(BSFormControl, {
    componentClass: "select",
    placeholder: "select",
    value: state.value,
    onChange: function onChange(e) {
      var value = e.target.value;
      state.set(value);
    }
  }, options.map(function (option) {
    return createElement("option", {
      key: option.value,
      value: option.value
    }, option.label);
  })));
};

var appletTypeState = /*#__PURE__*/entityType( /*#__PURE__*/_extends({}, entity, {
  title: /*#__PURE__*/string(),
  content: /*#__PURE__*/editorContent(),
  reasoning: /*#__PURE__*/editorContent(),
  meta_title: /*#__PURE__*/string(),
  meta_description: /*#__PURE__*/string(),
  url: /*#__PURE__*/serializedChild('geogebra')
}), {});
var appletTypePlugin = {
  Component: AppletTypeEditor,
  state: appletTypeState,
  config: {}
};

function AppletTypeEditor(props) {
  var _props$state = props.state,
      title = _props$state.title,
      url = _props$state.url,
      content = _props$state.content,
      meta_title = _props$state.meta_title,
      meta_description = _props$state.meta_description;
  var i18n = useI18n();
  return createElement("div", null, createElement("div", {
    className: "page-header"
  }, props.renderIntoToolbar(createElement(RevisionHistory, {
    id: props.state.id.value,
    currentRevision: props.state.revision.value,
    onSwitchRevision: props.state.replaceOwnState
  })), props.renderIntoSettings(createElement(Settings, null, createElement(Settings.Textarea, {
    label: i18n.t('applet::Title for search engines'),
    state: meta_title
  }), createElement(Settings.Textarea, {
    label: i18n.t('applet::Description for search engines'),
    state: meta_description
  }))), createElement("h1", null, props.editable ? createElement(HeaderInput, {
    placeholder: i18n.t('applet::Title'),
    value: title.value,
    onChange: function onChange(e) {
      title.set(e.target.value);
    }
  }) : createElement("span", {
    itemProp: "name"
  }, title.value))), createElement("article", null, url.render(), content.render()), createElement(Controls, Object.assign({
    subscriptions: true
  }, props.state)));
}

var articleTypeState = /*#__PURE__*/entityType( /*#__PURE__*/_extends({}, entity, {
  title: /*#__PURE__*/string(),
  content: /*#__PURE__*/editorContent('article'),
  reasoning: /*#__PURE__*/editorContent(),
  meta_title: /*#__PURE__*/string(),
  meta_description: /*#__PURE__*/string()
}), {});
var articleTypePlugin = {
  Component: ArticleTypeEditor,
  state: articleTypeState,
  config: {}
};

function ArticleTypeEditor(props) {
  var _props$state = props.state,
      title = _props$state.title,
      content = _props$state.content,
      meta_title = _props$state.meta_title,
      meta_description = _props$state.meta_description;
  var i18n = useI18n();
  return createElement(Fragment, null, createElement("div", {
    className: "page-header"
  }, props.renderIntoToolbar(createElement(RevisionHistory, {
    id: props.state.id.value,
    currentRevision: props.state.revision.value,
    onSwitchRevision: props.state.replaceOwnState
  })), props.renderIntoSettings(createElement(Settings, null, createElement(Settings.Textarea, {
    label: i18n.t('article::Title for search engines'),
    state: meta_title
  }), createElement(Settings.Textarea, {
    label: i18n.t('article::Description for search engines'),
    state: meta_description
  }))), createElement("h1", null, props.editable ? createElement(HeaderInput, {
    placeholder: i18n.t('article::Title'),
    value: title.value,
    onChange: function onChange(e) {
      title.set(e.target.value);
    }
  }) : createElement("span", {
    itemProp: "name"
  }, title.value))), createElement("div", {
    itemProp: "articleBody"
  }, content.render()), createElement(Controls, Object.assign({
    subscriptions: true
  }, props.state)));
}

var courseTypeState = /*#__PURE__*/entityType( /*#__PURE__*/_extends({}, entity, {
  title: /*#__PURE__*/string(),
  description: /*#__PURE__*/editorContent(),
  reasoning: /*#__PURE__*/editorContent(),
  meta_description: /*#__PURE__*/string()
}), {
  'course-page': /*#__PURE__*/list( /*#__PURE__*/serializedChild('type-course-page'))
});
var courseTypePlugin = {
  Component: CourseTypeEditor,
  state: courseTypeState,
  config: {}
};

function CourseTypeEditor(props) {
  var _props$state = props.state,
      title = _props$state.title,
      meta_description = _props$state.meta_description,
      children = _props$state['course-page'];
  var i18n = useI18n();
  return createElement("article", null, props.renderIntoToolbar(createElement(RevisionHistory, {
    id: props.state.id.value,
    currentRevision: props.state.revision.value,
    onSwitchRevision: props.state.replaceOwnState
  })), props.renderIntoSettings(createElement(Settings, null, createElement(Settings.Textarea, {
    label: i18n.t('course::Description for search engines'),
    state: meta_description
  }))), createElement("h1", null, props.editable ? createElement(HeaderInput, {
    placeholder: i18n.t('course::Title'),
    value: title.value,
    onChange: function onChange(e) {
      title.set(e.target.value);
    }
  }) : createElement("span", {
    itemProp: "name"
  }, title.value)), children.map(function (child, index) {
    return createElement(OptionalChild, {
      state: child,
      key: child.id,
      removeLabel: i18n.t('course::Remove course page'),
      onRemove: function onRemove() {
        children.remove(index);
      }
    });
  }), createElement("hr", null), createElement(AddButton, {
    onClick: function onClick() {
      return children.insert();
    }
  }, i18n.t('course::Add course page')), createElement(Controls, Object.assign({
    subscriptions: true
  }, props.state)));
}

var coursePageTypeState = /*#__PURE__*/entityType( /*#__PURE__*/_extends({}, entity, {
  icon: /*#__PURE__*/string('explanation'),
  title: /*#__PURE__*/string(''),
  content: /*#__PURE__*/editorContent()
}), {});
var coursePageTypePlugin = {
  Component: CoursePageTypeEditor,
  state: coursePageTypeState,
  config: {
    skipControls: false
  }
};

function CoursePageTypeEditor(props) {
  var _props$state = props.state,
      title = _props$state.title,
      icon = _props$state.icon,
      content = _props$state.content;
  var i18n = useI18n();
  useEffect(function () {
    if (!['explanation', 'play', 'question'].includes(icon.value)) {
      icon.set('explanation');
    }
  }, [icon.value]);
  return createElement("article", null, props.renderIntoToolbar(createElement(RevisionHistory, {
    id: props.state.id.value,
    currentRevision: props.state.revision.value,
    onSwitchRevision: props.state.replaceOwnState
  })), props.renderIntoSettings(createElement(Settings, null, createElement(Settings.Select, {
    label: "Icon",
    state: icon,
    options: [{
      label: i18n.t('coursePage::Explanation'),
      value: 'explanation'
    }, {
      label: i18n.t('coursePage::Video'),
      value: 'play'
    }, {
      label: i18n.t('coursePage::Question'),
      value: 'question'
    }]
  }))), createElement("h1", null, props.editable ? createElement(HeaderInput, {
    placeholder: i18n.t('coursePage::Title'),
    value: title.value,
    onChange: function onChange(e) {
      title.set(e.target.value);
    }
  }) : createElement("span", {
    itemProp: "name"
  }, title.value)), content.render(), props.config.skipControls ? null : createElement(Controls, Object.assign({
    subscriptions: true
  }, props.state)));
}

var eventTypeState = /*#__PURE__*/entityType( /*#__PURE__*/_extends({}, entity, {
  title: /*#__PURE__*/string(),
  content: /*#__PURE__*/editorContent(),
  meta_title: /*#__PURE__*/string(),
  meta_description: /*#__PURE__*/string()
}), {});
var eventTypePlugin = {
  Component: EventTypeEditor,
  state: eventTypeState,
  config: {}
};

function EventTypeEditor(props) {
  var _props$state = props.state,
      content = _props$state.content,
      title = _props$state.title,
      meta_title = _props$state.meta_title,
      meta_description = _props$state.meta_description;
  var i18n = useI18n();
  return createElement(Fragment, null, createElement("div", {
    className: "page-header"
  }, props.renderIntoToolbar(createElement(RevisionHistory, {
    id: props.state.id.value,
    currentRevision: props.state.revision.value,
    onSwitchRevision: props.state.replaceOwnState
  })), props.renderIntoSettings(createElement(Settings, null, createElement(Settings.Textarea, {
    label: i18n.t('event::Title for search engines'),
    state: meta_title
  }), createElement(Settings.Textarea, {
    label: i18n.t('event::Description for search engines'),
    state: meta_description
  }))), createElement("h1", null, props.editable ? createElement(HeaderInput, {
    placeholder: i18n.t('event::Title'),
    value: title.value,
    onChange: function onChange(e) {
      title.set(e.target.value);
    }
  }) : createElement("span", {
    itemProp: "name"
  }, title.value))), createElement("article", null, content.render()), createElement(Controls, Object.assign({
    subscriptions: true
  }, props.state)));
}

var mathPuzzleTypeState = /*#__PURE__*/entityType( /*#__PURE__*/_extends({}, entity, {
  source: /*#__PURE__*/string(),
  content: /*#__PURE__*/editorContent()
}), {});
var mathPuzzleTypePlugin = {
  Component: MathPuzzleTypeEditor,
  state: mathPuzzleTypeState,
  config: {}
};

function MathPuzzleTypeEditor(props) {
  var _props$state = props.state,
      source = _props$state.source,
      content = _props$state.content;
  var i18n = useI18n();
  return createElement(Fragment, null, props.renderIntoToolbar(createElement(RevisionHistory, {
    id: props.state.id.value,
    currentRevision: props.state.revision.value,
    onSwitchRevision: props.state.replaceOwnState
  })), props.renderIntoSettings(createElement(Settings, null, createElement(Settings.Textarea, {
    label: i18n.t('mathPuzzle::Source code'),
    state: source
  }))), createElement("div", {
    className: "math-puzzle",
    "data-source": source.value
  }, content.render()), createElement(Controls, Object.assign({
    subscriptions: true
  }, props.state)));
}

var pageTypeState = /*#__PURE__*/object( /*#__PURE__*/_extends({}, uuid, license, {
  title: /*#__PURE__*/string(),
  content: /*#__PURE__*/editorContent()
}));
var pageTypePlugin = {
  Component: PageTypeEditor,
  state: pageTypeState,
  config: {}
};

function PageTypeEditor(props) {
  var _props$state = props.state,
      title = _props$state.title,
      content = _props$state.content;
  var i18n = useI18n();
  return createElement("article", null, createElement("header", null, createElement("div", {
    className: "page-header"
  }, createElement("h1", null, props.editable ? createElement(HeaderInput, {
    placeholder: i18n.t('page::Title'),
    value: title.value,
    onChange: function onChange(e) {
      title.set(e.target.value);
    }
  }) : createElement("span", {
    itemProp: "name"
  }, title.value)))), createElement("section", {
    itemProp: "articleBody"
  }, content.render()), createElement(Controls, Object.assign({}, props.state)));
}

var taxonomyTypeState = /*#__PURE__*/object( /*#__PURE__*/_extends({}, uuid, {
  term: /*#__PURE__*/object({
    name: /*#__PURE__*/string()
  }),
  taxonomy: /*#__PURE__*/number(),
  parent: /*#__PURE__*/number(),
  position: /*#__PURE__*/number(),
  description: /*#__PURE__*/editorContent()
}));
var taxonomyTypePlugin = {
  Component: TaxonomyTypeEditor,
  state: taxonomyTypeState,
  config: {}
};

function TaxonomyTypeEditor(props) {
  var _props$state = props.state,
      term = _props$state.term,
      description = _props$state.description;
  var i18n = useI18n();
  return createElement("article", null, createElement("header", null, createElement("div", {
    className: "page-header"
  }, createElement("h1", null, props.editable ? createElement(HeaderInput, {
    placeholder: i18n.t('taxonomy::Title'),
    value: term.name.value,
    onChange: function onChange(e) {
      term.name.set(e.target.value);
    }
  }) : createElement("span", {
    itemProp: "name"
  }, term.name.value)))), createElement("section", {
    itemProp: "articleBody"
  }, description.render()), createElement(Controls, null));
}

var textExerciseTypeState = /*#__PURE__*/entityType( /*#__PURE__*/_extends({}, entity, {
  content: /*#__PURE__*/editorContent('exercise')
}), {
  'text-solution': /*#__PURE__*/optionalSerializedChild('type-text-solution')
});
var textExerciseTypePlugin = {
  Component: TextExerciseTypeEditor,
  state: textExerciseTypeState,
  config: {
    skipControls: false
  }
};
function TextExerciseTypeEditor(props) {
  var _props$state = props.state,
      content = _props$state.content,
      textSolution = _props$state['text-solution'];
  var i18n = useI18n();
  return createElement("article", {
    className: "text-exercise"
  }, props.renderIntoToolbar(createElement(RevisionHistory, {
    id: props.state.id.value,
    currentRevision: props.state.revision.value,
    onSwitchRevision: props.state.replaceOwnState
  })), content.render(), textSolution.id ? createElement(OptionalChild, {
    state: textSolution,
    removeLabel: i18n.t('textExercise::Remove solution'),
    onRemove: function onRemove() {
      textSolution.remove();
    }
  }) : createElement(AddButton, {
    onClick: function onClick() {
      textSolution.create();
    }
  }, i18n.t('textExercise::Create solution')), props.config.skipControls ? null : createElement(Controls, Object.assign({
    subscriptions: true
  }, props.state)));
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var Container = /*#__PURE__*/styled.div({
  boxShadow: '0 1px 3px 0 rgba(0,0,0,0.2)',
  marginTop: '10px',
  padding: '10px',
  minHeight: '70px',
  position: 'relative'
});
function SemanticSection(props) {
  var children = props.children,
      editable = props.editable;
  if (!editable) return createElement(Fragment, null, children);
  return createElement(Container, null, props.children);
}

var textExerciseGroupTypeState = /*#__PURE__*/entityType( /*#__PURE__*/_extends({}, entity, {
  content: /*#__PURE__*/editorContent(),
  cohesive: /*#__PURE__*/boolean(false)
}), {
  'grouped-text-exercise': /*#__PURE__*/list( /*#__PURE__*/serializedChild('type-text-exercise'))
});
var textExerciseGroupTypePlugin = {
  Component: TextExerciseGroupTypeEditor,
  state: textExerciseGroupTypeState,
  config: {}
};

function TextExerciseGroupTypeEditor(props) {
  var _cohesive$value;

  var _props$state = props.state,
      cohesive = _props$state.cohesive,
      content = _props$state.content,
      children = _props$state['grouped-text-exercise'];
  var i18n = useI18n();
  var isCohesive = (_cohesive$value = cohesive.value) != null ? _cohesive$value : false;
  var virtualParent = useRef(null);
  var virtualizer = useVirtual({
    size: children.length,
    parentRef: virtualParent,
    estimateSize: useCallback(function () {
      return 35;
    }, [])
  });
  var contentRendered = content.render({
    renderSettings: function renderSettings(children) {
      return createElement(Fragment, null, children, getSettings());
    }
  });
  return createElement("article", {
    className: "exercisegroup"
  }, props.renderIntoToolbar(createElement(RevisionHistory, {
    id: props.state.id.value,
    currentRevision: props.state.revision.value,
    onSwitchRevision: props.state.replaceOwnState
  })), createElement("section", {
    className: "row"
  }, createElement(SemanticSection, {
    editable: props.editable
  }, contentRendered)), createElement("div", {
    ref: virtualParent,
    style: {
      height: '100%',
      overflow: 'auto'
    }
  }, createElement("div", {
    style: {
      height: virtualizer.totalSize + "px",
      width: '100%',
      position: 'relative'
    }
  }, virtualizer.virtualItems.map(function (virtualRow) {
    var child = children[virtualRow.index];
    return createElement("div", {
      key: virtualRow.index,
      ref: virtualRow.measureRef,
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        transform: "translateY(" + virtualRow.start + "px)"
      }
    }, createElement("section", {
      className: "row",
      key: child.id
    }, createElement("div", {
      className: "col-sm-1 hidden-xs"
    }, createElement("em", null, getExerciseIndex(virtualRow.index), ")")), createElement("div", {
      className: "col-sm-11 col-xs-12"
    }, createElement(OptionalChild, {
      state: child,
      removeLabel: i18n.t('textExerciseGroup::Remove exercise'),
      onRemove: function onRemove() {
        return children.remove(virtualRow.index);
      }
    }))));
  }))), createElement(AddButton, {
    onClick: function onClick() {
      return children.insert();
    }
  }, i18n.t('textExerciseGroup::Add exercise')), createElement(Controls, Object.assign({
    subscriptions: true
  }, props.state)));

  function getSettings() {
    return createElement("div", null, createElement("label", {
      htmlFor: "cohesiveSelect"
    }, i18n.t('textExerciseGroup::Kind of exercise group'), ":"), ' ', createElement("select", {
      id: "cohesiveSelect",
      value: isCohesive ? 'cohesive' : 'non-cohesive',
      onChange: function onChange(e) {
        return cohesive.set(e.target.value === 'cohesive');
      }
    }, createElement("option", {
      value: "non-cohesive"
    }, i18n.t('textExerciseGroup::not cohesive')), createElement("option", {
      value: "cohesive"
    }, i18n.t('textExerciseGroup::cohesive'))));
  }

  function getExerciseIndex(index) {
    return isCohesive ? index + 1 : String.fromCharCode(97 + index);
  }
}

var textSolutionTypeState = /*#__PURE__*/entityType( /*#__PURE__*/_extends({}, entity, {
  content: /*#__PURE__*/editorContent('solution')
}), {});
var textSolutionTypePlugin = {
  Component: TextSolutionTypeEditor,
  state: textSolutionTypeState,
  config: {
    skipControls: false
  }
};
var solutionTheme = {
  rendererUi: {
    expandableBox: {
      toggleBackgroundColor: '#d9edf7',
      containerBorderColor: '#d9edf7'
    }
  }
};

function TextSolutionTypeEditor(props) {
  var i18n = useI18n();
  var renderTitle = useCallback(function (collapsed) {
    return createElement(Fragment, null, collapsed ? i18n.t('solution::Show solution') : i18n.t('solution::Hide solution'));
  }, []);
  return createElement(Fragment, null, props.renderIntoToolbar(createElement(RevisionHistory, {
    id: props.state.id.value,
    currentRevision: props.state.revision.value,
    onSwitchRevision: props.state.replaceOwnState
  })), createElement(ThemeProvider, {
    theme: solutionTheme
  }, createElement(ExpandableBox, {
    renderTitle: renderTitle,
    editable: props.editable
  }, props.state.content.render())), props.config.skipControls ? null : createElement(Controls, Object.assign({
    subscriptions: true
  }, props.state)));
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var userTypeState = /*#__PURE__*/object({
  description: /*#__PURE__*/editorContent()
});
var userTypePlugin = {
  Component: UserTypeEditor,
  state: userTypeState,
  config: {}
};

function UserTypeEditor(props) {
  var description = props.state.description;
  return createElement(Fragment, null, description.render(), createElement(Controls, null));
}

var videoTypeState = /*#__PURE__*/entityType( /*#__PURE__*/_extends({}, entity, {
  content: /*#__PURE__*/string(),
  title: /*#__PURE__*/string(),
  description: /*#__PURE__*/editorContent(),
  reasoning: /*#__PURE__*/editorContent()
}), {});
var videoPlugin = /*#__PURE__*/createVideoPlugin();
var videoTypePlugin = {
  Component: VideoTypeEditor,
  state: videoTypeState,
  config: {}
};

function VideoTypeEditor(props) {
  var _props$state = props.state,
      title = _props$state.title,
      description = _props$state.description;
  var i18n = useI18n();
  return createElement("section", null, props.renderIntoToolbar(createElement(RevisionHistory, {
    id: props.state.id.value,
    currentRevision: props.state.revision.value,
    onSwitchRevision: props.state.replaceOwnState
  })), createElement("div", {
    className: "page-header"
  }, createElement("h1", null, props.editable ? createElement(HeaderInput, {
    placeholder: i18n.t('video::Title'),
    value: title.value,
    onChange: function onChange(e) {
      title.set(e.target.value);
    }
  }) : createElement("span", {
    itemProp: "name"
  }, title.value))), createElement("article", null, createElement("section", null, createElement(videoPlugin.Component, Object.assign({}, props, {
    state: {
      src: props.state.content,
      alt: props.state.title
    },
    config: {
      i18n: {
        src: {
          label: i18n.t('video::URL')
        },
        alt: {
          label: i18n.t('video::Title for search engines')
        }
      }
    }
  }))), createElement("section", null, description.render())), createElement(Controls, Object.assign({
    subscriptions: true
  }, props.state)));
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var OverlayTriangle = /*#__PURE__*/styled.div(function (props) {
  var _ref;

  var borderPosition = props.positionAbove ? 'borderTop' : 'borderBottom';
  return _ref = {
    position: 'relative',
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent'
  }, _ref[borderPosition] = '10px solid rgba(51,51,51,0.95)', _ref;
});
var InlineOverlayWrapper = /*#__PURE__*/styled.div({
  position: 'absolute',
  top: '-10000px',
  left: '-10000px',
  opacity: 0,
  transition: 'opacity 0.5s',
  zIndex: 95,
  whiteSpace: 'nowrap'
});
var InlineOverlayContentWrapper = /*#__PURE__*/styled.div({
  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.50)',
  backgroundColor: 'rgba(51,51,51,0.95)',
  color: '#ffffff',
  borderRadius: '4px',
  '& a': {
    color: '#ffffff',
    '&:hover': {
      color: 'rgb(70, 155, 255)'
    }
  }
});
function HoveringOverlay(props) {
  var overlay = createRef();
  var triangle = createRef();

  var _React$useState = useState(props.position === 'above'),
      positionAbove = _React$useState[0],
      setPositionAbove = _React$useState[1];

  useLayoutEffect(function () {
    if (!overlay.current || !triangle.current) return;
    var menu = overlay.current;
    var rect = undefined;

    if (props.anchor && props.anchor.current !== null) {
      rect = props.anchor.current.getBoundingClientRect();
    } else {
      var _native = window.getSelection();

      if (_native && _native.rangeCount > 0) {
        var range = _native.getRangeAt(0);

        rect = range.getBoundingClientRect();
      }
    }

    if (!rect) return;
    if (rect.height === 0) return; // menu is set to display:none, shouldn't ever happen

    if (!menu.offsetParent) return;
    var parentRect = menu.offsetParent.getBoundingClientRect();
    menu.style.opacity = '1';
    var aboveValue = rect.top - menu.offsetHeight - 6; // if top becomes negative, place menu below

    setPositionAbove(props.position == 'above' && aboveValue >= 0);
    menu.style.top = (positionAbove ? aboveValue : rect.bottom + 6) - parentRect.top + 'px';
    menu.style.left = Math.min(Math.max(rect.left - parentRect.left - menu.offsetWidth / 2 + rect.width / 2, 0), parentRect.width - menu.offsetWidth - 5) + "px";
    triangle.current.style.left = rect.left - menu.offsetLeft - parentRect.left - triangle.current.offsetWidth / 2 + rect.width / 2 + "px";
  }, [overlay, triangle, props.position, props.anchor, positionAbove, props.allowSelectionOverflow]);
  return createElement(InlineOverlayWrapper, {
    ref: overlay
  }, !positionAbove && createElement(OverlayTriangle, {
    positionAbove: false,
    ref: triangle
  }), createElement(InlineOverlayContentWrapper, null, props.children), positionAbove && createElement(OverlayTriangle, {
    positionAbove: true,
    ref: triangle
  }));
}

var _excluded$1 = ["position"];
var InlinePreview = /*#__PURE__*/styled.span({
  padding: '0px 8px'
});
var ChangeButton = /*#__PURE__*/styled.div({
  padding: '5px 5px 5px 10px',
  display: 'inline-block',
  borderLeft: '2px solid rgba(51,51,51,0.95)',
  cursor: 'pointer',
  margin: '2px',
  '&:hover': {
    color: 'rgb(70, 155, 255)'
  }
});
function InlineSettings(_ref) {
  var _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'below' : _ref$position,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  return createElement(HoveringOverlay, {
    position: position,
    anchor: props.anchor
  }, createElement(InlinePreview, null, props.children), createElement(ChangeButton, {
    onClick: props.onDelete
  }, createElement(Icon, {
    icon: faTrashAlt
  })));
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var InlineInputInner = /*#__PURE__*/styled.input({
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '2px solid #ffffff',
  color: '#ffffff',
  '&:focus': {
    outline: 'none',
    borderBottom: '2px solid rgb(70, 155, 255)'
  }
});

var InlineInputRefForward = function InlineInputRefForward(props, ref) {
  return createElement(InlineInputInner, Object.assign({}, props, {
    ref: ref
  }));
};

var InlineSettingsInput = /*#__PURE__*/forwardRef(InlineInputRefForward);

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
function InlineInput(props) {
  var _onChange = props.onChange,
      value = props.value,
      placeholder = props.placeholder;

  var _React$useState = useState(Plain.deserialize(value)),
      state = _React$useState[0],
      setState = _React$useState[1];

  useEffect(function () {
    if (Plain.serialize(state) !== value) {
      setState(Plain.deserialize(value));
    }
  }, [value]);
  return createElement(Editor$1, {
    placeholder: placeholder,
    value: state,
    onFocus: function onFocus(event, editor, next) {
      setTimeout(function () {
        if (typeof props.onFocus === 'function') {
          props.onFocus();
        }
      });
      next();
    },
    onChange: function onChange(_ref) {
      var value = _ref.value;
      setState(value);

      _onChange(Plain.serialize(value));
    }
  });
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var relatedContentItemState = /*#__PURE__*/object({
  id: /*#__PURE__*/string(),
  title: /*#__PURE__*/string()
});
var articleState = /*#__PURE__*/object({
  introduction: /*#__PURE__*/child({
    plugin: 'articleIntroduction'
  }),
  content: /*#__PURE__*/child({
    plugin: 'rows'
  }),
  exercises: /*#__PURE__*/list( /*#__PURE__*/child({
    plugin: 'injection'
  })),
  exerciseFolder: relatedContentItemState,
  relatedContent: /*#__PURE__*/object({
    articles: /*#__PURE__*/list(relatedContentItemState),
    courses: /*#__PURE__*/list(relatedContentItemState),
    videos: /*#__PURE__*/list(relatedContentItemState)
  }),
  sources: /*#__PURE__*/list( /*#__PURE__*/object({
    href: /*#__PURE__*/string(),
    title: /*#__PURE__*/string()
  }))
});
var articlePlugin = {
  Component: ArticleEditor,
  state: articleState,
  config: {}
};
var OpenInNewTab = /*#__PURE__*/styled.span({
  margin: '0 0 0 10px'
});
var BasePluginToolbarButton = /*#__PURE__*/styled.button({
  background: 'none',
  border: 'none'
});
var MinWidthIcon = /*#__PURE__*/styled.div({
  width: '24px'
});
var PluginToolbarButtonIcon = /*#__PURE__*/styled.div({
  height: '24px',
  width: '24px',
  opacity: 0.8,
  cursor: 'pointer',
  color: 'rgba(51, 51, 51, 0.95)',
  '&:hover': {
    color: '#469bff'
  }
});
var spoilerTheme = {
  rendererUi: {
    expandableBox: {
      toggleBackgroundColor: '#f5f5f5',
      toggleColor: '#333',
      containerBorderColor: '#f5f5f5'
    }
  }
};

function ArticleEditor(props) {
  var editable = props.editable,
      state = props.state;
  var introduction = state.introduction,
      content = state.content,
      exercises = state.exercises,
      exerciseFolder = state.exerciseFolder,
      relatedContent = state.relatedContent,
      sources = state.sources;
  var i18n = useI18n();

  var _React$useState = useState(null),
      focusedInlineSetting = _React$useState[0],
      setFocusedInlineSetting = _React$useState[1];

  function isFocused(id, index) {
    return focusedInlineSetting && focusedInlineSetting.id === id && (focusedInlineSetting.index === undefined || focusedInlineSetting.index === index);
  }

  return createElement(Fragment, null, createElement(SemanticSection, {
    editable: editable
  }, introduction.render()), createElement(SemanticSection, {
    editable: editable
  }, content.render()), createElement(SemanticSection, {
    editable: editable
  }, renderExercises()), createElement(SemanticSection, {
    editable: editable
  }, renderRelatedContent()), createElement(SemanticSection, {
    editable: editable
  }, renderSources()));

  function renderExercises() {
    var header = createElement("h2", null, i18n.t('article::Exercises'));
    var folderHeader = createElement("p", null, i18n.t('article::You can find more exercises in the following folder'), ":");

    if (!editable) {
      if (exercises.length === 0 || !exerciseFolder.id.value) return null;
      return createElement(Fragment, null, header, exercises.map(function (exercise) {
        return createElement(Fragment, {
          key: exercise.id
        }, exercise.render());
      }), exerciseFolder.id.value ? createElement(Fragment, null, folderHeader, createElement("div", null, createElement("a", {
        href: "/" + exerciseFolder.id.value
      }, exerciseFolder.title.value))) : null);
    }

    return createElement(Fragment, null, header, createElement(DragDropContext, {
      onDragEnd: function onDragEnd(result) {
        var source = result.source,
            destination = result.destination;
        if (!destination) return;
        exercises.move(source.index, destination.index);
      }
    }, createElement(Droppable, {
      droppableId: "default"
    }, function (provided) {
      return createElement("div", Object.assign({
        ref: provided.innerRef
      }, provided.droppableProps), exercises.map(function (exercise, index) {
        return createElement(Draggable, {
          key: exercise.id,
          draggableId: exercise.id,
          index: index
        }, function (provided) {
          return createElement("div", Object.assign({
            ref: provided.innerRef
          }, provided.draggableProps), exercise.render({
            renderToolbar: function renderToolbar() {
              return createElement(Fragment, null, createElement("div", null, createElement(BasePluginToolbarButton, Object.assign({
                icon: createElement(Icon, {
                  icon: faTrashAlt
                }),
                title: i18n.t('article::Drag the exercise')
              }, provided.dragHandleProps), createElement(PluginToolbarButtonIcon, null, createElement(EdtrIcon, {
                icon: edtrDragHandle
              })))), createElement(PluginToolbarButton, {
                icon: createElement(MinWidthIcon, null, createElement(Icon, {
                  icon: faTrashAlt
                })),
                label: i18n.t('article::Remove exercise'),
                onClick: function onClick() {
                  exercises.remove(index);
                }
              }));
            }
          }));
        });
      }), provided.placeholder);
    })), createElement(AddButton, {
      onClick: function onClick() {
        exercises.insert(exercises.length);
      }
    }, i18n.t('article::Add optional exercise')), folderHeader, isFocused('exerciseFolder') ? createElement(InlineSettings, {
      onDelete: function onDelete() {
        exerciseFolder.title.set('');
        exerciseFolder.id.set('');
      },
      position: "below"
    }, createElement(InlineSettingsInput, {
      value: exerciseFolder.id.value !== '' ? "/" + exerciseFolder.id.value : '',
      placeholder: i18n.t('article::ID of an exercise folder, e.g. 30560'),
      onChange: function onChange(event) {
        var newValue = event.target.value.replace(/[^0-9]/g, '');
        exerciseFolder.id.set(newValue);
      }
    }), createElement("a", {
      target: "_blank",
      href: exerciseFolder.id.value !== '' ? "/" + exerciseFolder.id.value : '',
      rel: "noopener noreferrer"
    }, createElement(OpenInNewTab, {
      title: i18n.t('article::Open the exercise folder in a new tab:')
    }, createElement(Icon, {
      icon: faExternalLinkAlt
    })))) : null, createElement("a", null, createElement(InlineInput, {
      value: exerciseFolder.title.value,
      onFocus: function onFocus() {
        setFocusedInlineSetting({
          id: 'exerciseFolder'
        });
      },
      onChange: function onChange(value) {
        exerciseFolder.title.set(value);
      },
      placeholder: i18n.t('article::Title of the link')
    })));
  }

  function renderRelatedContent() {
    var header = createElement(Fragment, null, createElement("h2", null, i18n.t('article::Still want more?')), createElement("p", null, i18n.t('article::You can find more content on this topic here'), ":"));
    var types = [{
      icon: createElement(Icon, {
        icon: faNewspaper,
        fixedWidth: true
      }),
      section: 'articles',
      label: i18n.t('article::Articles'),
      addLabel: i18n.t('article::Add article'),
      idPlaceholder: i18n.t('article::ID of an article, e.g. 1855'),
      openLinkInNewTabPlaceholder: i18n.t('article::Open the article in a new tab:'),
      dragLabel: i18n.t('article::Drag the article')
    }, {
      icon: createElement(Icon, {
        icon: faGraduationCap,
        fixedWidth: true
      }),
      section: 'courses',
      label: i18n.t('article::Courses'),
      addLabel: i18n.t('article::Add course'),
      idPlaceholder: i18n.t('article::ID of a course, e.g. 51979'),
      openLinkInNewTabPlaceholder: i18n.t('article::Open the course in a new tab:'),
      dragLabel: i18n.t('article::Drag the course')
    }, {
      icon: createElement(Icon, {
        icon: faPlayCircle,
        fixedWidth: true
      }),
      section: 'videos',
      label: i18n.t('article::Videos'),
      addLabel: i18n.t('article::Add video'),
      idPlaceholder: i18n.t('article::ID of a video, e.g. 40744'),
      openLinkInNewTabPlaceholder: i18n.t('article::Open the video in a new tab:'),
      dragLabel: i18n.t('article::Drag the video')
    }];
    var allItems = flatten(values(relatedContent));
    if (!editable && allItems.length === 0) return null;
    return createElement(Fragment, null, header, types.map(function (type) {
      return createElement(Fragment, {
        key: type.section
      }, renderRelatedContentSection(type));
    }));
  }

  function renderRelatedContentSection(type) {
    var header = createElement(Fragment, null, type.icon, " ", type.label);

    if (!editable) {
      if (relatedContent[type.section].length === 0) return null;
      return createElement(Fragment, null, header, relatedContent[type.section].map(function (item, index) {
        return createElement("div", {
          key: index
        }, createElement("a", {
          href: "/" + item.id.value
        }, item.title.value));
      }));
    }

    return createElement(Fragment, null, header, createElement(DragDropContext, {
      onDragEnd: function onDragEnd(result) {
        var source = result.source,
            destination = result.destination;
        if (!destination) return;
        relatedContent[type.section].move(source.index, destination.index);
      }
    }, createElement(Droppable, {
      droppableId: "default"
    }, function (provided) {
      return createElement("div", Object.assign({
        ref: provided.innerRef
      }, provided.droppableProps), relatedContent[type.section].map(function (item, index) {
        return createElement(Draggable, {
          key: index,
          draggableId: type.section + "-" + index,
          index: index
        }, function (provided) {
          return createElement("div", Object.assign({
            ref: provided.innerRef
          }, provided.draggableProps), createElement("div", {
            style: {
              display: 'flex'
            }
          }, createElement("div", {
            style: {
              flexGrow: 1
            }
          }, isFocused(type.section, index) ? createElement(InlineSettings, {
            onDelete: function onDelete() {
              relatedContent[type.section].remove(index);
            },
            position: "below"
          }, createElement(InlineSettingsInput, {
            value: item.id.value !== '' ? "/" + item.id.value : '',
            placeholder: type.idPlaceholder,
            onChange: function onChange(event) {
              var newValue = event.target.value.replace(/[^0-9]/g, '');
              item.id.set(newValue);
            }
          }), createElement("a", {
            target: "_blank",
            href: item.id.value !== '' ? "/" + item.id.value : '',
            rel: "noopener noreferrer"
          }, createElement(OpenInNewTab, {
            title: type.openLinkInNewTabPlaceholder
          }, createElement(Icon, {
            icon: faExternalLinkAlt
          })))) : null, createElement("a", null, createElement(InlineInput, {
            value: item.title.value,
            onFocus: function onFocus() {
              setFocusedInlineSetting({
                id: type.section,
                index: index
              });
            },
            onChange: function onChange(value) {
              item.title.set(value);
            },
            placeholder: i18n.t('article::Title of the link')
          }))), createElement("div", null, createElement(BasePluginToolbarButton, Object.assign({
            icon: createElement(Icon, {
              icon: faTrashAlt
            }),
            title: i18n.t('article::Drag the exercise')
          }, provided.dragHandleProps), createElement(PluginToolbarButtonIcon, null, createElement(EdtrIcon, {
            icon: edtrDragHandle
          }))))));
        });
      }), provided.placeholder, editable ? createElement(AddButton, {
        onClick: function onClick() {
          relatedContent[type.section].insert(relatedContent[type.section].length);
        }
      }, type.addLabel) : null);
    })));
  }

  function renderSources() {
    if (!editable) {
      if (sources.length === 0) return null;
      return createElement(ThemeProvider$1, {
        theme: spoilerTheme
      }, createElement(ExpandableBox, {
        renderTitle: function renderTitle() {
          return i18n.t('article::Sources');
        },
        editable: editable,
        alwaysVisible: true
      }, createElement("ul", null, sources.map(function (source, index) {
        return createElement("li", {
          key: index
        }, createElement("a", {
          href: source.href.value
        }, source.title.value));
      }))));
    }

    return createElement(ThemeProvider$1, {
      theme: spoilerTheme
    }, createElement(ExpandableBox, {
      renderTitle: function renderTitle() {
        return i18n.t('article::Sources');
      },
      editable: editable,
      alwaysVisible: true
    }, createElement(DragDropContext, {
      onDragEnd: function onDragEnd(result) {
        var source = result.source,
            destination = result.destination;
        if (!destination) return;
        sources.move(source.index, destination.index);
      }
    }, createElement(Droppable, {
      droppableId: "default"
    }, function (provided) {
      return createElement("ul", Object.assign({
        ref: provided.innerRef
      }, provided.droppableProps), sources.map(function (source, index) {
        return createElement(Draggable, {
          key: index,
          draggableId: "" + index,
          index: index
        }, function (provided) {
          return createElement("li", Object.assign({
            ref: provided.innerRef
          }, provided.draggableProps), createElement("div", {
            style: {
              display: 'flex'
            }
          }, createElement("div", {
            style: {
              flexGrow: 1
            }
          }, createElement("span", null, isFocused('source', index) ? createElement(InlineSettings, {
            onDelete: function onDelete() {
              sources.remove(index);
            },
            position: "below"
          }, createElement(InlineSettingsInput, {
            value: source.href.value,
            placeholder: i18n.t('article::URL of the link'),
            onChange: function onChange(event) {
              source.href.set(event.target.value);
            }
          }), createElement("a", {
            target: "_blank",
            href: source.href.value,
            rel: "noopener noreferrer"
          }, createElement(OpenInNewTab, {
            title: i18n.t('article::Open the link in a new tab:')
          }, createElement(Icon, {
            icon: faExternalLinkAlt
          })))) : null, createElement("a", null, createElement(InlineInput, {
            value: source.title.value,
            onFocus: function onFocus() {
              setFocusedInlineSetting({
                id: 'source',
                index: index
              });
            },
            onChange: function onChange(value) {
              source.title.set(value);
            },
            placeholder: i18n.t('article::Title of the link')
          })))), createElement("div", null, createElement(BasePluginToolbarButton, Object.assign({
            icon: createElement(Icon, {
              icon: faTrashAlt
            }),
            title: i18n.t('article::Drag the source')
          }, provided.dragHandleProps), createElement(PluginToolbarButtonIcon, null, createElement(EdtrIcon, {
            icon: edtrDragHandle
          }))))));
        });
      }), provided.placeholder);
    })), editable ? createElement(AddButton, {
      onClick: function onClick() {
        sources.insert(sources.length);
      }
    }, i18n.t('article::Add source')) : null));
  }
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var errorState = /*#__PURE__*/object({
  plugin: /*#__PURE__*/string(),
  state: /*#__PURE__*/scalar({})
});
var ErrorRenderer = function ErrorRenderer(props) {
  var i18n = useI18n();
  return createElement("div", {
    className: "panel panel-danger"
  }, createElement("div", {
    className: "panel-heading"
  }, i18n.t('error::This part of the document could not be converted.')), createElement("div", {
    className: "panel-body"
  }, createElement("pre", null, JSON.stringify({
    plugin: props.state.plugin.value,
    state: props.state.state.value
  }, undefined, 2))));
};
var errorPlugin = {
  Component: ErrorRenderer,
  state: errorState,
  config: {}
};

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var Sign;

(function (Sign) {
  Sign["Equals"] = "equals";
  Sign["GreaterThan"] = "greater-than";
  Sign["GreaterThanOrEqual"] = "greater-than-or-equal";
  Sign["LessThan"] = "less-than";
  Sign["LessThanOrEqual"] = "less-than-or-equal";
  Sign["AlmostEqualTo"] = "almost-equal-to";
  Sign["Estimates"] = "estimates";
})(Sign || (Sign = {}));

function renderSignToString(sign) {
  switch (sign) {
    case Sign.Equals:
      return '=';

    case Sign.GreaterThan:
      return '>';

    case Sign.GreaterThanOrEqual:
      return '≥';

    case Sign.LessThan:
      return '<';

    case Sign.LessThanOrEqual:
      return '≤';

    case Sign.AlmostEqualTo:
      return '≈';

    case Sign.Estimates:
      return '≙';
  }
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var TableWrapper = /*#__PURE__*/styled.div({
  overflowX: 'scroll',
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
  color: '#007ec1',
  div: {
    margin: 0
  }
});
function EquationsRenderer(_ref) {
  var state = _ref.state;
  var store = useScopedStore();
  return createElement(TableWrapper, null, createElement(Table, null, createElement("tbody", null, renderFirstExplanation(), state.steps.map(function (step, index) {
    return createElement(Fragment, {
      key: index
    }, createElement("tr", null, createElement(LeftTd, null, step.left.value ? createElement(MathRenderer, {
      inline: true,
      state: step.left.value
    }) : null), createElement(SignTd, null, createElement(MathRenderer, {
      inline: true,
      state: renderSignToString(step.sign.value)
    })), createElement(MathTd, null, step.right.value ? createElement(MathRenderer, {
      inline: true,
      state: step.right.value
    }) : null), createElement(TransformTd, null, step.transform.value ? createElement(Fragment, null, "|", createElement(MathRenderer, {
      inline: true,
      state: step.transform.value
    })) : null)), isEmpty(step.explanation.id)(store.getState()) ? null : createElement(ExplanationTr, null, createElement("td", null), renderDownArrow(), createElement("td", {
      colSpan: 2
    }, step.explanation.render())));
  }))));

  function renderFirstExplanation() {
    if (isEmpty(state.firstExplanation.id)(store.getState())) return;
    return createElement(Fragment, null, createElement(ExplanationTr, null, createElement("td", {
      colSpan: 3,
      style: {
        textAlign: 'center'
      }
    }, state.firstExplanation.render())), createElement("tr", {
      style: {
        height: '30px'
      }
    }, createElement("td", null), renderDownArrow()));
  }
}
function renderDownArrow() {
  var downArrow = "\n    <svg xmlns=\"http://www.w3.org/2000/svg\">\n      <defs>\n        <marker\n          id=\"arrow\"\n          markerWidth=\"10\"\n          markerHeight=\"10\"\n          orient=\"auto\"\n          markerUnits=\"strokeWidth\"\n          refX=\"10\"\n          refY=\"5\"\n          viewBox=\"0 0 20 10\"\n        >\n          <path\n            d=\"M 0,0 l 10,5 l -10,5\"\n            stroke=\"#007ec1\"\n            stroke-width=\"2\"\n            fill=\"none\"\n            vector-effect=\"non-scaling-size\"\n          />\n        </marker>\n      </defs>\n\n      <line\n        x1=\"10\"\n        y1=\"0%\"\n        x2=\"10\"\n        y2=\"99%\"\n        stroke=\"#007ec1\"\n        stroke-width=\"2\"\n        marker-end=\"url(#arrow)\"\n        vector-effect=\"non-scaling-stroke\"\n      />\n    </svg>";
  var downArrowBase64 = Buffer.from(downArrow).toString('base64');
  return createElement("td", {
    style: {
      backgroundImage: "url('data:image/svg+xml;base64," + downArrowBase64 + "')",
      backgroundSize: '20px calc(100% - 10px)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center 5px'
    }
  });
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
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
  var i18n = useI18n();
  var focused = props.focused,
      state = props.state;
  var store = useScopedStore();
  var focusedElement = useScopedSelector(getFocused());
  var nestedFocus = focused || includes(focusedElement, props.state.steps.map(function (step) {
    return step.explanation.id;
  })) || focusedElement === state.firstExplanation.id;
  var gridFocus = useGridFocus({
    rows: state.steps.length,
    columns: 4,
    focusNext: function focusNext$1() {
      return store.dispatch(focusNext());
    },
    focusPrevious: function focusPrevious$1() {
      return store.dispatch(focusPrevious());
    },
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
        column: 0
      });
      store.dispatch(focus(props.id));
    }
  }, [nestedFocus]);
  if (!nestedFocus) return createElement(EquationsRenderer, Object.assign({}, props));
  return createElement(HotKeys, {
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
            column: StepSegment.Transform
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
  }, createElement(TableWrapper, null, createElement(DragDropContext, {
    onDragEnd: function onDragEnd(result) {
      var source = result.source,
          destination = result.destination;
      if (!destination) return;
      state.steps.move(source.index, destination.index);
    }
  }, createElement(Droppable, {
    droppableId: "default"
  }, function (provided) {
    return createElement(Table, Object.assign({
      ref: provided.innerRef
    }, provided.droppableProps), renderFirstExplanation(), state.steps.map(function (step, row) {
      return createElement(Draggable, {
        key: step.explanation.id,
        draggableId: step.explanation.id,
        index: row
      }, function (provided) {
        return createElement("tbody", Object.assign({
          ref: provided.innerRef
        }, provided.draggableProps), createElement("tr", null, createElement("td", null, createElement(DragButton, Object.assign({}, provided.dragHandleProps, {
          tabIndex: -1
        }), createElement(EdtrIcon, {
          icon: edtrDragHandle
        }))), createElement(StepEditor, {
          gridFocus: gridFocus,
          row: row,
          state: step
        }), createElement("td", null, createElement(RemoveButton, {
          tabIndex: -1,
          onClick: function onClick() {
            return state.steps.remove(row);
          }
        }, createElement(Icon, {
          icon: faTimes
        })))), renderExplantionTr());
      });

      function renderExplantionTr() {
        if (row === state.steps.length - 1) return null;
        return createElement(ExplanationTr, {
          onFocus: function onFocus() {
            return gridFocus.setFocus({
              row: row,
              column: StepSegment.Explanation
            });
          }
        }, createElement("td", null), createElement("td", null), !isEmpty(step.explanation.id)(store.getState()) ? renderDownArrow() : createElement("td", null), createElement("td", {
          colSpan: 2
        }, step.explanation.render({
          config: {
            placeholder: i18n.t('equations::explanation')
          }
        })));
      }
    }), provided.placeholder);
  })), renderAddButton()));

  function renderFirstExplanation() {
    return createElement("tbody", {
      onFocus: function onFocus() {
        return gridFocus.setFocus('firstExplanation');
      }
    }, createElement(ExplanationTr, null, createElement("td", null), createElement("td", {
      colSpan: 3,
      style: {
        textAlign: 'center'
      }
    }, state.firstExplanation.render({
      config: {
        placeholder: i18n.t('equations::frist-explanation')
      }
    }))), createElement("tr", {
      style: {
        height: '30px'
      }
    }, createElement("td", null), createElement("td", null), !isEmpty(state.firstExplanation.id)(store.getState()) ? renderDownArrow() : null));
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
      column: StepSegment.Left
    });
  }

  function renderAddButton() {
    if (!nestedFocus) return;
    return createElement(AddButton, {
      onClick: function onClick() {
        return insertNewEquationWithFocus(state.steps.length);
      }
    }, i18n.t('equations::add new equation'));
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
  var i18n = useI18n();
  var gridFocus = props.gridFocus,
      row = props.row,
      state = props.state;
  return createElement(Fragment, null, createElement(LeftTd, {
    onClick: function onClick() {
      return gridFocus.setFocus({
        row: row,
        column: StepSegment.Left
      });
    }
  }, createElement(InlineMath, {
    focused: gridFocus.isFocused({
      row: row,
      column: StepSegment.Left
    }),
    placeholder: row === 0 ? '3x+1' : "[" + i18n.t('equations::left-hand side') + "]",
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
  })), createElement(SignTd, null, createElement(DropDown, {
    tabIndex: -1,
    onChange: function onChange(e) {
      state.sign.set(e.target.value);
    },
    value: state.sign.value
  }, [Sign.Equals, Sign.GreaterThan, Sign.LessThan, Sign.GreaterThanOrEqual, Sign.LessThanOrEqual, Sign.AlmostEqualTo, Sign.Estimates].map(function (sign) {
    return createElement("option", {
      key: sign,
      value: sign
    }, renderSignToString(sign));
  }))), createElement(MathTd, {
    onClick: function onClick() {
      return gridFocus.setFocus({
        row: row,
        column: StepSegment.Right
      });
    }
  }, createElement(InlineMath, {
    focused: gridFocus.isFocused({
      row: row,
      column: StepSegment.Right
    }),
    placeholder: row === 0 ? '7x' : "[" + i18n.t('equations::right-hand side') + "]",
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
  })), createElement(TransformTd, {
    onClick: function onClick() {
      return gridFocus.setFocus({
        row: row,
        column: StepSegment.Transform
      });
    }
  }, "|", ' ', createElement(InlineMath, {
    focused: gridFocus.isFocused({
      row: row,
      column: StepSegment.Transform
    }),
    placeholder: row === 0 ? '-3x' : "[" + i18n.t('equations::transformation') + "]",
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
  return createElement(MathEditor, {
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
      onFocusChanged = _ref.onFocusChanged;

  var _React$useState = useState(null),
      focus = _React$useState[0],
      setFocusState = _React$useState[1];

  var setFocus = function setFocus(state) {
    onFocusChanged(state);
    setFocusState(state);
  };

  return {
    focus: focus,
    isFocused: function isFocused(state) {
      if (focus === null) return false;
      if (focus === 'firstExplanation') return state === focus;
      return state !== 'firstExplanation' && focus.row === state.row && focus.column === state.column;
    },
    setFocus: setFocus,
    moveRight: function moveRight() {
      if (focus === null) return;

      if (focus === 'firstExplanation') {
        setFocus({
          row: 0,
          column: 0
        });
        return;
      } // Last column


      if (focus.column === columns - 1) {
        // Last row
        if (focus.row === rows - 1) {
          focusNext();
        } else {
          setFocus({
            row: focus.row + 1,
            column: 0
          });
        }
      } else {
        setFocus({
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
      } // First column


      if (focus.column === 0) {
        // First row
        if (focus.row === 0) {
          setFocus('firstExplanation');
        } else {
          setFocus({
            row: focus.row - 1,
            column: columns - 1
          });
        }
      } else {
        setFocus({
          row: focus.row,
          column: focus.column - 1
        });
      }
    }
  };
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var stepProps = /*#__PURE__*/object({
  left: /*#__PURE__*/string(''),
  sign: /*#__PURE__*/string(Sign.Equals),
  right: /*#__PURE__*/string(''),
  transform: /*#__PURE__*/string(''),
  explanation: /*#__PURE__*/child({
    plugin: 'text'
  })
});
var equationsState = /*#__PURE__*/object({
  steps: /*#__PURE__*/list(stepProps, 2),
  firstExplanation: /*#__PURE__*/child({
    plugin: 'text'
  })
});
var equationsPlugin = {
  Component: EquationsEditor,
  config: {},
  state: equationsState
};

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var exerciseState = /*#__PURE__*/object({
  content: /*#__PURE__*/child({
    plugin: 'rows'
  }),
  interactive: /*#__PURE__*/optional( /*#__PURE__*/child({
    plugin: 'scMcExercise'
  }))
});
var exercisePlugin = {
  Component: ExerciseEditor,
  state: exerciseState,
  config: {}
};
var ButtonContainer = /*#__PURE__*/styled$1.div({
  display: 'flex'
});
var interactivePlugins = [{
  name: 'scMcExercise',
  addLabel: function addLabel(i18n) {
    return i18n.t('exercise::Add choice exercise');
  },
  title: function title(i18n) {
    return i18n.t('exercise::Choice exercise');
  }
}, {
  name: 'inputExercise',
  addLabel: function addLabel(i18n) {
    return i18n.t('exercise::Add input exercise');
  },
  title: function title(i18n) {
    return i18n.t('exercise::Input exercise');
  }
}];
var InlineOptionsWrapper = /*#__PURE__*/styled$1.div({
  position: 'absolute',
  top: '-30px',
  right: '0',
  padding: '30px',
  zIndex: 95,
  whiteSpace: 'nowrap'
});
var InlineOptionsContentWrapper = /*#__PURE__*/styled$1.div({
  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.50)',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '4px'
});

function InlineOptions(props) {
  return createElement(InlineOptionsWrapper, null, createElement(InlineOptionsContentWrapper, null, props.children));
}

var Option = /*#__PURE__*/styled$1.div({
  padding: '5px 10px',
  cursor: 'pointer',
  width: '100%',
  minWidth: '150px',
  '&:hover': {
    color: 'rgb(70, 155, 255)'
  }
});

function ExerciseEditor(_ref) {
  var editable = _ref.editable,
      state = _ref.state;
  var i18n = useI18n();
  var store = useScopedStore();
  var content = state.content,
      interactive = state.interactive;

  var _React$useState = useState(false),
      showOptions = _React$useState[0],
      setShowOptions = _React$useState[1];

  return createElement(Fragment, null, createElement(SemanticSection, {
    editable: editable
  }, content.render()), createElement(SemanticSection, {
    editable: editable
  }, renderInteractive()));

  function renderInteractive() {
    if (interactive.defined) {
      return interactive.render({
        renderToolbar: function renderToolbar(children) {
          return createElement(Fragment, null, createElement("div", {
            style: {
              position: 'relative'
            },
            onMouseLeave: function onMouseLeave() {
              setShowOptions(false);
            }
          }, createElement(PluginToolbarButton, {
            icon: createElement(Icon, {
              icon: faRandom
            }),
            // TODO: i18n
            label: "Interaktives Element \xE4ndern",
            onClick: function onClick() {
              setShowOptions(true);
            }
          }), createElement(PluginToolbarButton, {
            icon: createElement(Icon, {
              icon: faTrashAlt
            }),
            // TODO: i18n
            label: "Interaktives Element entfernen",
            onClick: function onClick() {
              interactive.remove();
            }
          }), showOptions ? createElement(InlineOptions, null, interactivePlugins.filter(function (plugin) {
            return !interactive || plugin.name !== getCurrentInteractivePlugin();
          }).map(function (plugin) {
            return createElement(Option, {
              key: plugin.name,
              onClick: function onClick() {
                interactive.replace(plugin.name);
                setShowOptions(false);
              }
            }, plugin.title(i18n));
          })) : null), children);
        }
      });
    }

    if (editable) {
      return createElement(Fragment, null, createElement("p", null, createElement("em", null, i18n.t('exercise::Add an optional interactive exercise:'))), createElement(ButtonContainer, null, interactivePlugins.map(function (plugin) {
        return createElement(AddButton, {
          key: plugin.name,
          onClick: function onClick() {
            interactive.create({
              plugin: plugin.name
            });
          }
        }, plugin.addLabel(i18n));
      })));
    }

    return null;
  }

  function getCurrentInteractivePlugin() {
    if (!interactive.defined) return null;
    var doc = getDocument(interactive.id)(store.getState());
    return doc && doc.plugin;
  }
}

var MAX_FILE_SIZE = 2 * 1024 * 1024;
var ALLOWED_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png', 'svg'];
var FileErrorCode;

(function (FileErrorCode) {
  FileErrorCode[FileErrorCode["TOO_MANY_FILES"] = 0] = "TOO_MANY_FILES";
  FileErrorCode[FileErrorCode["NO_FILE_SELECTED"] = 1] = "NO_FILE_SELECTED";
  FileErrorCode[FileErrorCode["BAD_EXTENSION"] = 2] = "BAD_EXTENSION";
  FileErrorCode[FileErrorCode["FILE_TOO_BIG"] = 3] = "FILE_TOO_BIG";
  FileErrorCode[FileErrorCode["UPLOAD_FAILED"] = 4] = "UPLOAD_FAILED";
})(FileErrorCode || (FileErrorCode = {}));

function matchesAllowedExtensions(fileName) {
  var extension = fileName.toLowerCase().slice(fileName.lastIndexOf('.') + 1);
  return ALLOWED_EXTENSIONS.indexOf(extension) >= 0;
}

function handleErrors(errors) {
  return errors.map(function (error) {
    return {
      errorCode: error,
      message: errorCodeToMessage(error)
    };
  });
}

function onError(errors) {
  alert(errors.map(function (error) {
    return error.message;
  }).join('\n'));
}

function errorCodeToMessage(error) {
  switch (error) {
    case FileErrorCode.TOO_MANY_FILES:
      return 'You can only upload one file';

    case FileErrorCode.NO_FILE_SELECTED:
      return 'No file selected';

    case FileErrorCode.BAD_EXTENSION:
      return 'Not an accepted file type';

    case FileErrorCode.FILE_TOO_BIG:
      return 'Filesize is too big';

    case FileErrorCode.UPLOAD_FAILED:
      return 'Error while uploading';
  }
}

var validateFile = function validateFile(file) {
  var uploadErrors = [];

  if (!file) {
    uploadErrors = [].concat(uploadErrors, [FileErrorCode.NO_FILE_SELECTED]);
  } else if (!matchesAllowedExtensions(file.name)) {
    uploadErrors = [].concat(uploadErrors, [FileErrorCode.BAD_EXTENSION]);
  } else if (file.size > MAX_FILE_SIZE) {
    uploadErrors = [].concat(uploadErrors, [FileErrorCode.FILE_TOO_BIG]);
  } else {
    return {
      valid: true
    };
  }

  return {
    valid: false,
    errors: handleErrors(uploadErrors)
  };
};
function createUploadImageHandler(getCsrfToken) {
  var readFile = createReadFile(getCsrfToken);
  return function uploadImageHandler(file) {
    var validation = validateFile(file);

    if (!validation.valid) {
      onError(validation.errors);
      return Promise.reject(validation.errors);
    }

    return readFile(file).then(function (loaded) {
      return loaded.dataUrl;
    });
  };
}
function createReadFile(getCsrfToken) {
  return function readFile(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();

      reader.onload = function (e) {
        if (!e.target) return;
        var formData = new FormData();
        formData.append('attachment[file]', file);
        formData.append('type', 'file');
        formData.append('csrf', getCsrfToken());
        fetch('/attachment/upload', {
          method: 'POST',
          body: formData
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (!data['success']) reject();
          resolve({
            file: file,
            dataUrl: data.files[0].location
          });
        })["catch"](function () {
          reject();
        });
      };

      reader.readAsDataURL(file);
    });
  };
}
function createImagePlugin(getCsrfToken) {
  return createImagePlugin$1({
    upload: createUploadImageHandler(getCsrfToken),
    validate: validateFile,
    secondInput: 'description'
  });
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var importantState = /*#__PURE__*/child({
  plugin: 'text'
});
function createImportantPlugin() {
  return {
    Component: ImportantRenderer,
    config: {},
    state: importantState
  };
}
var Box = /*#__PURE__*/styled$2.div({
  borderLeft: '#bedfed solid 5px',
  paddingLeft: '15px'
});

function ImportantRenderer(props) {
  return createElement(Box, null, props.state.render());
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var injectionState = /*#__PURE__*/string();
var injectionPlugin = {
  Component: InjectionEditor,
  state: injectionState,
  config: {}
};
function InjectionRenderer(props) {
  var _React$useState = useState(''),
      loaded = _React$useState[0],
      setLoaded = _React$useState[1];

  var ref = useRef(null);
  var i18n = useI18n();
  useEffect(function () {
    var src = createURL(props.src);
    fetch(src, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-From': 'legacy-serlo.org'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      setLoaded(data.response);
      setTimeout(function () {
        if (ref.current) {
          Common.trigger('new context', ref.current);
        }
      });
    })["catch"](function () {
      setLoaded("<div class=\"alert alert-info\">" + i18n.t('injection::Illegal injection found') + "</div>");
    });
  }, [props.src]);

  if (loaded) {
    return createElement("div", {
      className: "panel panel-default"
    }, createElement("div", {
      className: "panel-body",
      ref: ref,
      dangerouslySetInnerHTML: {
        __html: loaded
      }
    }));
  }

  var src = createURL(props.src);
  return createElement("div", null, createElement("a", {
    href: src
  }, i18n.t('injection::Serlo entity {{src}}', {
    src: src
  })));
}

function createURL(id) {
  if (id.startsWith('/') || id.startsWith('\\')) {
    return '/' + id.substring(1, id.length);
  }

  var match = id.match(/^https?:\/\/[^./]+\.serlo\.[^./]+\/(.+)$/g);

  if (match) {
    return '/' + match[1];
  }

  return '/' + id;
}

var PlaceholderWrapper = /*#__PURE__*/styled$1.div({
  position: 'relative',
  width: '100%',
  textAlign: 'center'
});

function InjectionEditor(props) {
  var _React$useState2 = useState(props.state.value),
      cache = _React$useState2[0],
      setCache = _React$useState2[1];

  var _React$useState3 = useState(false),
      preview = _React$useState3[0],
      setPreview = _React$useState3[1];

  var i18n = useI18n();
  useEffect(function () {
    var timeout = setTimeout(function () {
      setCache(props.state.value);
    }, 2000);
    return function () {
      clearTimeout(timeout);
    };
  }, [props.focused, props.state.value]);

  if (!props.editable) {
    return createElement(InjectionRenderer, {
      src: props.state.value
    });
  }

  return createElement(Fragment, null, cache ? createElement(PreviewOverlay, {
    focused: props.focused || false,
    onChange: function onChange(nextActive) {
      setPreview(nextActive);

      if (nextActive) {
        setCache(props.state.value);
      }
    }
  }, createElement(InjectionRenderer, {
    src: cache
  })) : createElement(PlaceholderWrapper, null, createElement(Icon, {
    icon: faNewspaper$1,
    size: "5x"
  })), props.focused && !preview ? createElement(EditorInlineSettings, null, createElement(EditorInput, {
    label: i18n.t('injection::Serlo ID:'),
    placeholder: "123456",
    value: props.state.value,
    onChange: function onChange(e) {
      props.state.set(e.target.value);
    },
    width: "30%",
    inputWidth: "100%",
    ref: props.autofocusRef
  })) : null, props.renderIntoSettings(createElement(Fragment, null, createElement(OverlayInput, {
    label: i18n.t('injection::Serlo ID:'),
    placeholder: "123456",
    value: props.state.value,
    onChange: function onChange(e) {
      props.state.set(e.target.value);
    }
  }))));
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var LayoutContainer = /*#__PURE__*/styled$2.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
});
var ChildContainer = /*#__PURE__*/styled$2.div(function (_ref) {
  var width = _ref.width;
  return {
    width: width / 12 * 100 + "%",
    '@media (max-width: 480px)': {
      width: '100%'
    }
  };
});
var ConvertInfo = /*#__PURE__*/styled$2.div({
  padding: '5px',
  backgroundColor: '#f2dede',
  color: '#a94442',
  border: '1px solid #ebccd1',
  textAlign: 'center'
});
var ButtonContainer$1 = /*#__PURE__*/styled$2.div({
  display: 'flex',
  flexDirection: 'row'
});
var ConvertButton = /*#__PURE__*/styled$2.button({
  borderRadius: '5px',
  margin: '5px',
  border: 'none',
  outline: 'none',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#ebccd1'
  }
});
var LayoutRenderer = function LayoutRenderer(props) {
  var store = useScopedStore();
  var i18n = useI18n();
  return createElement(Fragment, null, props.editable ? createElement(ConvertInfo, null, i18n.t('layout::To make the content draggable, convert them for the new editor:'), createElement(ButtonContainer$1, null, createElement(ConvertButton, {
    onClick: convertToRow
  }, i18n.t('layout::One-column layout')), canConvertToMultimediaExplanation() ? createElement(ConvertButton, {
    onClick: convertToMultimediaExplanation
  }, i18n.t('layout::Multimedia content associated with text')) : null)) : null, createElement(LayoutContainer, null, props.state.map(function (item, index) {
    return createElement(ChildContainer, {
      key: index,
      width: item.width.value
    }, item.child.render());
  })));

  function convertToRow() {
    var documents = [];
    props.state.forEach(function (item) {
      var element = serializeDocument(item.child.id)(store.getState());
      if (!element) return;

      if (element.plugin === 'rows') {
        element.state.forEach(function (rowsItem) {
          documents.push(rowsItem);
        });
      } else {
        documents.push(element);
      }
    });
    store.dispatch(replace({
      id: props.id,
      plugin: 'rows',
      state: documents
    }));
  }

  function canConvertToMultimediaExplanation() {
    var columns = props.state;
    return columns.length === 2 && (isMultimediaColumn(columns[0]) || isMultimediaColumn(columns[1]));
  }

  function convertToMultimediaExplanation() {
    if (!canConvertToMultimediaExplanation()) return;
    var columns = props.state;

    if (isMultimediaColumn(columns[0])) {
      replaceWithMultimediaExplanation({
        explanationColumn: columns[1],
        multimediaColumn: columns[0]
      });
    } else {
      replaceWithMultimediaExplanation({
        explanationColumn: columns[0],
        multimediaColumn: columns[1]
      });
    }

    function replaceWithMultimediaExplanation(_ref2) {
      var explanationColumn = _ref2.explanationColumn,
          multimediaColumn = _ref2.multimediaColumn;
      var explanation = serializeDocument(explanationColumn.child.id)(store.getState());
      var multimedia = serializeDocument(multimediaColumn.child.id)(store.getState());
      if (!explanation || !multimedia) return;
      store.dispatch(replace({
        id: props.id,
        plugin: 'multimedia',
        state: {
          explanation: explanation,
          multimedia: multimedia.state[0],
          illustrating: true,
          width: 50
        }
      }));
    }
  }

  function isMultimediaColumn(column) {
    var columnDocument = serializeDocument(column.child.id)(store.getState());
    if (!columnDocument) return false;
    var children = columnDocument.state.map(function (child) {
      return child.plugin;
    });
    return children.length === 1 && isMultimediaPlugin(children[0]);
  }

  function isMultimediaPlugin(plugin) {
    return plugin === 'image' || plugin === 'geogebra' || plugin === 'video';
  }
};

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var layoutState = /*#__PURE__*/list( /*#__PURE__*/object({
  child: /*#__PURE__*/child({
    plugin: 'text'
  }),
  width: /*#__PURE__*/number()
}));
var layoutPlugin = {
  Component: LayoutRenderer,
  state: layoutState,
  config: {}
};

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var separatorState = /*#__PURE__*/scalar(undefined);
var separatorPlugin = {
  Component: SeparatorEditor,
  state: separatorState,
  config: {}
};
var Container$1 = /*#__PURE__*/styled$3.div({
  paddingTop: '10px',
  paddingBottom: '10px'
});
var Separator = /*#__PURE__*/styled$3.hr({
  marginTop: 0,
  marginBottom: 0
});

function SeparatorEditor(props) {
  if (!props.editable) return null;
  return createElement(Container$1, null, createElement(Separator, null));
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var solutionState = /*#__PURE__*/object({
  prerequisite: /*#__PURE__*/optional( /*#__PURE__*/object({
    id: /*#__PURE__*/string(),
    title: /*#__PURE__*/string()
  })),
  strategy: /*#__PURE__*/child({
    plugin: 'text'
  }),
  steps: /*#__PURE__*/child({
    plugin: 'rows'
  })
});
var solutionPlugin = {
  Component: SolutionEditor,
  state: solutionState,
  config: {}
};
var OpenInNewTab$1 = /*#__PURE__*/styled.span({
  margin: '0 0 0 10px'
});

function SolutionEditor(_ref) {
  var editable = _ref.editable,
      state = _ref.state,
      focused = _ref.focused;
  var prerequisite = state.prerequisite,
      strategy = state.strategy;
  var i18n = useI18n();
  var hasStrategy = !useScopedSelector(isEmpty(strategy.id));
  return createElement(Fragment, null, renderPrerequisite(), hasStrategy || editable ? createElement(SemanticSection, {
    editable: editable
  }, strategy.render({
    config: {
      placeholder: i18n.t('solution::Optionally explain the solution strategy here')
    }
  })) : null, createElement(SemanticSection, {
    editable: editable
  }, state.steps.render()));

  function renderPrerequisite() {
    return createElement(SemanticSection, {
      editable: editable
    }, renderContent());

    function renderContent() {
      if (editable) {
        return createElement("div", null, i18n.t('solution::For this exercise, you need the following fundamentals:'), ' ', focused ? createElement(InlineSettings, {
          onDelete: function onDelete() {
            if (prerequisite.defined) {
              prerequisite.remove();
            }
          },
          position: 'below'
        }, createElement(InlineSettingsInput, {
          value: prerequisite.defined && prerequisite.id.value !== '' ? "/" + prerequisite.id.value : '',
          placeholder: i18n.t('solution::ID of an article, e.g. 1855'),
          onChange: function onChange(event) {
            var newValue = event.target.value.replace(/[^0-9]/g, '');

            if (prerequisite.defined) {
              prerequisite.id.set(newValue);
            } else {
              prerequisite.create({
                id: newValue,
                title: ''
              });
            }
          }
        }), createElement("a", {
          target: "_blank",
          href: prerequisite.defined && prerequisite.id.value !== '' ? "/" + prerequisite.id.value : '',
          rel: "noopener noreferrer"
        }, createElement(OpenInNewTab$1, {
          title: i18n.t('solution::Open the article in a new tab:')
        }, createElement(Icon, {
          icon: faExternalLinkAlt
        })))) : null, createElement("a", null, createElement(InlineInput, {
          value: prerequisite.defined ? prerequisite.title.value : '',
          onChange: function onChange(value) {
            if (prerequisite.defined) {
              prerequisite.title.set(value);
            } else {
              prerequisite.create({
                id: '',
                title: value
              });
            }
          },
          placeholder: i18n.t('solution::Title of the link')
        })));
      }

      if (prerequisite.defined && prerequisite.id.value && prerequisite.title.value) {
        return createElement("p", null, i18n.t('solution::For this exercise, you need the following fundamentals:'), ' ', createElement("a", {
          href: "/" + prerequisite.id.value
        }, prerequisite.title.value));
      }

      return null;
    }
  }
}

var edtrTablePlugin = /*#__PURE__*/createTablePlugin({
  MarkdownRenderer: MarkdownRenderer
});

function MarkdownRenderer(props) {
  var html = converter.makeHtml(props.markdown);
  return createElement("div", {
    className: "requires-mathjax",
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
}

var tablePlugin = /*#__PURE__*/_extends({}, edtrTablePlugin, {
  Component: TableEditor
});

function TableEditor(props) {
  var ref = useRef(null);
  useEffect(function () {
    initMathJax();
    var timeout = setTimeout(typesetMathjax, 1000);
    return function () {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  });
  return createElement("div", {
    ref: ref
  }, createElement(edtrTablePlugin.Component, Object.assign({}, props)));

  function typesetMathjax() {
    if (!ref.current) return;
    typeset(ref.current);
  }
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var deprecatedState = /*#__PURE__*/object({
  plugin: /*#__PURE__*/string(),
  state: /*#__PURE__*/scalar({})
});
var DeprecatedRenderer = function DeprecatedRenderer(props) {
  var i18n = useI18n();
  return createElement("div", {
    className: "panel panel-danger"
  }, createElement("div", {
    className: "panel-heading"
  }, i18n.t('deprecated::This part of the document contains features that are no longer supported.')), createElement("div", {
    className: "panel-body"
  }, createElement("pre", null, JSON.stringify({
    plugin: props.state.plugin.value,
    state: props.state.state.value
  }, undefined, 2))));
};
var deprecatedPlugin = {
  Component: DeprecatedRenderer,
  state: deprecatedState,
  config: {}
};

function createPlugins(_ref) {
  var _types;

  var getCsrfToken = _ref.getCsrfToken,
      i18n = _ref.i18n,
      registry = _ref.registry;
  return {
    anchor: createAnchorPlugin({
      i18n: {
        label: i18n.t('anchor::Identifier'),
        placeholder: i18n.t('anchor::ID of the anchor')
      }
    }),
    article: articlePlugin,
    articleIntroduction: createMultimediaExplanationPlugin({
      explanation: {
        plugin: 'text',
        config: {
          placeholder: i18n.t('article::Write a short introduction')
        }
      },
      plugins: [{
        name: 'image',
        title: i18n.t('multimedia::Image')
      }],
      i18n: {
        changeMultimediaType: i18n.t('multimedia::Change the multimedia type'),
        illustrating: {
          label: i18n.t('multimedia::How important is the multimedia content?'),
          values: {
            illustrating: i18n.t('multimedia::It is illustrating'),
            explaining: i18n.t('multimedia::It is essential')
          }
        }
      }
    }),
    blockquote: createBlockquotePlugin({
      content: {
        plugin: 'text'
      }
    }),
    error: errorPlugin,
    deprecated: deprecatedPlugin,
    equations: equationsPlugin,
    exercise: exercisePlugin,
    geogebra: createGeogebraPlugin({
      i18n: {
        label: i18n.t('geogebra::GeoGebra URL or ID')
      }
    }),
    highlight: createHighlightPlugin({
      i18n: {
        code: {
          label: i18n.t('highlight::Click here and enter your source code…'),
          placeholder: i18n.t('highlight::Enter your source code here')
        },
        language: {
          label: i18n.t('highlight::Language'),
          placeholder: i18n.t('highlight::Enter language')
        },
        showLineNumbers: {
          label: i18n.t('highlight::Show line numbers')
        }
      }
    }),
    image: createImagePlugin(getCsrfToken),
    important: createImportantPlugin(),
    injection: injectionPlugin,
    inputExercise: createInputExercisePlugin({
      feedback: {
        plugin: 'text'
      },
      i18n: {
        types: (_types = {}, _types[InputExerciseType.InputStringNormalizedMatchChallenge] = i18n.t('inputExercise::Text'), _types[InputExerciseType.InputNumberExactMatchChallenge] = i18n.t('inputExercise::Number'), _types[InputExerciseType.InputExpressionEqualMatchChallenge] = i18n.t('inputExercise::Mathematical expression'), _types),
        type: {
          label: i18n.t('inputExercise::Choose the exercise type')
        },
        unit: {
          label: i18n.t('inputExercise::Unit')
        },
        answer: {
          addLabel: i18n.t('inputExercise::Add answer'),
          value: {
            placeholder: i18n.t('inputExercise::Enter the value')
          }
        },
        inputPlaceholder: i18n.t('inputExercise::Your solution'),
        fallbackFeedback: {
          correct: i18n.t('inputExercise::Correct'),
          wrong: i18n.t('inputExercise::Wrong')
        }
      }
    }),
    layout: layoutPlugin,
    multimedia: createMultimediaExplanationPlugin({
      explanation: {
        plugin: 'rows'
      },
      plugins: [{
        name: 'image',
        title: i18n.t('multimedia::Image')
      }, {
        name: 'video',
        title: i18n.t('multimedia::Video')
      }, {
        name: 'geogebra',
        title: i18n.t('multimedia::GeoGebra Applet')
      }],
      i18n: {
        changeMultimediaType: i18n.t('multimedia::Change the multimedia type'),
        illustrating: {
          label: i18n.t('multimedia::How important is the multimedia content?'),
          values: {
            illustrating: i18n.t('multimedia::It is illustrating'),
            explaining: i18n.t('multimedia::It is essential')
          }
        }
      }
    }),
    rows: createRowsPlugin({
      content: {
        plugin: 'text'
      },
      plugins: registry,
      i18n: {
        menu: {
          searchPlaceholder: i18n.t('rows::Search for tools…')
        },
        settings: {
          duplicateLabel: i18n.t('rows::Duplicate'),
          removeLabel: i18n.t('rows::Remove'),
          closeLabel: i18n.t('rows::Close')
        },
        toolbar: {
          dragLabel: i18n.t('rows::Drag the element within the document')
        },
        addLabel: i18n.t('rows::Add an element')
      }
    }),
    scMcExercise: createScMcExercisePlugin({
      content: {
        plugin: 'text'
      },
      feedback: {
        plugin: 'text'
      },
      i18n: {
        types: {
          singleChoice: i18n.t('scMcExercise::Single-choice'),
          multipleChoice: i18n.t('scMcExercise::Multiple-choice')
        },
        isSingleChoice: {
          label: i18n.t('scMcExercise::Choose the exercise type')
        },
        answer: {
          addLabel: i18n.t('scMcExercise::Add answer'),
          fallbackFeedback: {
            wrong: i18n.t('scMcExercise::Wrong')
          }
        },
        globalFeedback: {
          missingCorrectAnswers: i18n.t('scMcExercise::Almost! You missed at least one correct answer'),
          correct: i18n.t('scMcExercise::Correct'),
          wrong: i18n.t('scMcExercise::Wrong')
        }
      }
    }),
    separator: separatorPlugin,
    solution: solutionPlugin,
    spoiler: createSpoilerPlugin({
      content: {
        plugin: 'rows'
      },
      i18n: {
        title: {
          placeholder: i18n.t('spoiler::Enter a title')
        }
      }
    }),
    table: tablePlugin,
    text: createTextPlugin({
      registry: registry,
      blockquote: 'blockquote',
      i18n: {
        blockquote: {
          toggleTitle: i18n.t('text::Quote')
        },
        colors: {
          setColorTitle: i18n.t('text::Set color'),
          resetColorTitle: i18n.t('text::Reset color'),
          openMenuTitle: i18n.t('text::Colors'),
          closeMenuTitle: i18n.t('text::Close sub menu')
        },
        headings: {
          setHeadingTitle: function setHeadingTitle(level) {
            return i18n.t('text::Heading') + " " + level;
          },
          openMenuTitle: i18n.t('text::Headings'),
          closeMenuTitle: i18n.t('text::Close sub menu')
        },
        link: {
          toggleTitle: i18n.t('text::Link (Strg + K)'),
          placeholder: i18n.t('text::Enter URL'),
          openInNewTabTitle: i18n.t('text::Open in new tab')
        },
        list: {
          toggleOrderedList: i18n.t('text::Ordered list'),
          toggleUnorderedList: i18n.t('text::Unordered list'),
          openMenuTitle: i18n.t('text::Lists'),
          closeMenuTitle: i18n.t('text::Close sub menu')
        },
        math: {
          toggleTitle: i18n.t('text::Math formula (Strg + M)'),
          displayBlockLabel: i18n.t('text::Display as block'),
          placeholder: i18n.t('text::[formula]'),
          editors: {
            visual: i18n.t('text::visual'),
            latex: i18n.t('text::LaTeX'),
            noVisualEditorAvailableMessage: i18n.t('text::Only LaTeX editor available')
          },
          helpText: function helpText(KeySpan) {
            return createElement(Fragment, null, i18n.t('text::Shortcuts'), ":", createElement("br", null), createElement("br", null), createElement("p", null, i18n.t('text::Fraction'), ": ", createElement(KeySpan, null, "/")), createElement("p", null, i18n.t('text::Superscript'), ": ", createElement(KeySpan, null, "\u2191"), ' ', i18n.t('text::or'), " ", createElement(KeySpan, null, "^")), createElement("p", null, i18n.t('text::Subscript'), ": ", createElement(KeySpan, null, "\u2193"), ' ', i18n.t('text::or'), " ", createElement(KeySpan, null, "_")), createElement("p", null, "\u03C0, \u03B1, \u03B2, \u03B3: ", createElement(KeySpan, null, "pi"), ", ", createElement(KeySpan, null, "alpha"), ",", ' ', createElement(KeySpan, null, "beta"), ",", createElement(KeySpan, null, "gamma")), createElement("p", null, "\u2264, \u2265: ", createElement(KeySpan, null, '<='), ", ", createElement(KeySpan, null, '>=')), createElement("p", null, i18n.t('text::Root'), ": ", createElement(KeySpan, null, "\\sqrt"), ",", ' ', createElement(KeySpan, null, "\\nthroot")), createElement("p", null, i18n.t('text::Math symbols'), ":", ' ', createElement(KeySpan, null, '\\<NAME>'), ", ", i18n.t('text::e.g.'), ' ', createElement(KeySpan, null, "\\neq"), " (\u2260), ", createElement(KeySpan, null, "\\pm"), " (\xB1), ..."), createElement("p", null, i18n.t('text::Functions'), ": ", createElement(KeySpan, null, "sin"), ",", ' ', createElement(KeySpan, null, "cos"), ", ", createElement(KeySpan, null, "ln"), ", ..."));
          }
        },
        richText: {
          toggleStrongTitle: i18n.t('text::Bold (Strg + B)'),
          toggleEmphasizeTitle: i18n.t('text::Italic (Strg + I)')
        },
        suggestions: {
          noResultsMessage: i18n.t('text::No items found')
        }
      }
    }),
    video: createVideoPlugin({
      i18n: {
        src: {
          label: i18n.t('video::Video URL')
        },
        alt: {
          label: i18n.t('video::Description')
        }
      }
    }),
    // Internal plugins for our content types
    'type-applet': appletTypePlugin,
    'type-article': articleTypePlugin,
    'type-course': courseTypePlugin,
    'type-course-page': coursePageTypePlugin,
    'type-event': eventTypePlugin,
    'type-math-puzzle': mathPuzzleTypePlugin,
    'type-page': pageTypePlugin,
    'type-taxonomy': taxonomyTypePlugin,
    'type-text-exercise': textExerciseTypePlugin,
    'type-text-exercise-group': textExerciseGroupTypePlugin,
    'type-text-solution': textSolutionTypePlugin,
    'type-user': userTypePlugin,
    'type-video': videoTypePlugin
  };
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
var SaveContext = /*#__PURE__*/createContext({
  onSave: function onSave() {
    return Promise.reject();
  },
  mayCheckout: false
});
function Editor(props) {
  var i18n = useI18n();
  var result = deserialize(props);
  var plugins = createPlugins({
    getCsrfToken: props.getCsrfToken,
    registry: getRegistry(),
    i18n: i18n
  });
  var DocumentEditor = createDefaultDocumentEditor({
    i18n: {
      settings: {
        buttonLabel: i18n.t('edtr-io::Settings'),
        modalTitle: i18n.t('edtr-io::Extended Settings'),
        modalCloseLabel: i18n.t('edtr-io::Close')
      }
    }
  });
  var legacyUrl = window.location.pathname.replace('add-revision', 'add-revision-old').replace('create', 'create-old');

  if (isError(result)) {
    switch (result.error) {
      case 'type-unsupported':
        return createElement("div", {
          className: "alert alert-danger",
          role: "alert"
        }, i18n.t("edtr-io::This content type isn't supported by the new editor, yet."), ' ', createElement("a", {
          href: legacyUrl
        }, i18n.t('edtr-io::Edit the content in the old editor.')));

      case 'failure':
        return createElement("div", {
          className: "alert alert-danger",
          role: "alert"
        }, i18n.t('edtr-io::An error occurred during the conversion.'), ' ', createElement("a", {
          href: legacyUrl
        }, i18n.t('edtr-io::Edit the content in the old editor.')));
    }
  }

  var stored = getStored();

  if (stored && confirm(i18n.t('edtr-io::We found an old revision created by you. Do you want to restore it?'))) {
    result = {
      success: true,
      initialState: stored,
      converted: false
    };
  }

  return createElement(CsrfContext.Provider, {
    value: props.getCsrfToken
  }, createElement(SaveContext.Provider, {
    value: {
      onSave: props.onSave,
      mayCheckout: props.mayCheckout
    }
  }, result.converted ? createElement("div", {
    className: "alert alert-warning",
    role: "alert"
  }, i18n.t("edtr-io::This entity hasn't been converted to the new editor, yet."), ' ', createElement("a", {
    href: legacyUrl
  }, i18n.t('edtr-io::Edit the content in the old editor.'))) : null, createElement(Editor$2, {
    DocumentEditor: DocumentEditor,
    onError: props.onError,
    plugins: plugins,
    initialState: result.initialState,
    editable: true
  }, props.children)));

  function getRegistry() {
    var isExercise = ['grouped-text-exercise', 'text-exercise', 'text-exercise-group'].includes(props.type);
    return [{
      name: 'text',
      title: i18n.t('edtr-io::Text'),
      description: i18n.t('edtr-io::Compose content using rich text and math formulas.'),
      icon: createIcon(faParagraph)
    }, {
      name: 'blockquote',
      title: i18n.t('edtr-io::Quotation'),
      description: i18n.t('edtr-io::Create indented text for quotations.'),
      icon: createIcon(faQuoteRight)
    }, {
      name: 'geogebra',
      title: i18n.t('edtr-io::GeoGebra Applet'),
      description: i18n.t('edtr-io::Embed GeoGebra Materials applets via URL or ID.'),
      icon: createIcon(faCubes)
    }, {
      name: 'highlight',
      title: i18n.t('edtr-io::Source Code'),
      description: i18n.t('edtr-io::Highlight the syntax of source code.'),
      icon: createIcon(faCode)
    }, {
      name: 'anchor',
      title: i18n.t('edtr-io::Anchor'),
      description: i18n.t('edtr-io::Insert an anchor.'),
      icon: createIcon(faAnchor)
    }, {
      name: 'equations',
      title: i18n.t('edtr-io::Equations'),
      description: i18n.t('edtr-io::Create mathematical equations and terms.')
    }, {
      name: 'image',
      title: i18n.t('edtr-io::Image'),
      description: i18n.t('edtr-io::Upload images.'),
      icon: createIcon(faImages)
    }, {
      name: 'important',
      title: i18n.t('edtr-io::Important Statement'),
      description: i18n.t('edtr-io::A box to highlight important statements.')
    }, {
      name: 'injection',
      title: i18n.t('edtr-io::serlo.org Content'),
      description: i18n.t('edtr-io::Embed serlo.org content via their ID.'),
      icon: createIcon(faNewspaper$1)
    }, {
      name: 'multimedia',
      title: i18n.t('edtr-io::Multimedia content associated with text'),
      description: i18n.t('edtr-io::Create an illustrating or explaining multimedia content associated with text.'),
      icon: createIcon(faPhotoVideo)
    }, {
      name: 'spoiler',
      title: i18n.t('edtr-io::Spoiler'),
      description: i18n.t('edtr-io::A collapsible box.'),
      icon: createIcon(faCaretSquareDown)
    }, {
      name: 'table',
      title: i18n.t('edtr-io::Table'),
      description: i18n.t('edtr-io::Create tables using Markdown.')
    }, {
      name: 'video',
      title: i18n.t('edtr-io::Video'),
      description: i18n.t('edtr-io::Embed YouTube, Vimeo, Wikimedia Commons or BR videos.'),
      icon: createIcon(faFilm)
    }].concat(isExercise ? [{
      name: 'separator',
      title: i18n.t('edtr-io::Solution Separator'),
      description: i18n.t('edtr-io::Divide the solution into individual steps.')
    }] : []);
  }
}

function getStored() {
  var edtr = localStorage.getItem('edtr');
  if (!edtr) return;
  var state = JSON.parse(edtr);
  return state[window.location.pathname];
}

function storeState(state) {
  var currentValue = localStorage.getItem('edtr');
  var edtr = currentValue ? JSON.parse(currentValue) : {};
  edtr[window.location.pathname] = state;
  localStorage.setItem('edtr', JSON.stringify(edtr));
}

/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
function Renderer(_ref) {
  var state = _ref.state;
  var i18n = useI18n();
  var plugins = createPlugins({
    getCsrfToken: function getCsrfToken() {
      return '';
    },
    registry: [],
    i18n: i18n
  });
  return createElement(Renderer$1, {
    plugins: plugins,
    state: state || {
      plugin: 'text'
    }
  });
}

function cleanEdtrState(state) {
  return cleanJson(state);
  /* eslint-disable @typescript-eslint/no-explicit-any */

  function cleanJson(jsonObj) {
    if (jsonObj !== null && typeof jsonObj === 'object') {
      return map(function (value) {
        if (value.plugin === 'text' && value.state) {
          var slateValue = Value.fromJSON(serializer.deserialize(value.state));
          return _extends({}, value, {
            state: slateValueToHtml(slateValue)
          });
        }

        return cleanJson(value);
      }, jsonObj);
    } else {
      // jsonObj is a number or string
      return jsonObj;
    }
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

}

export { Editor, Renderer, cleanEdtrState, createPlugins };
//# sourceMappingURL=edtr-io.esm.js.map
