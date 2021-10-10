import { v4 } from 'uuid';
import { converter } from '@serlo/markdown';
import { chain, splitWhen, reduce, concat } from 'ramda';
import { serializer } from '@edtr-io/plugin-text';
import { createElement } from 'react';
import Html from 'slate-html-serializer';
import { parseFragment } from 'parse5';
import { Value } from 'slate';

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
var Plugin;

(function (Plugin) {
  Plugin["AlphabetSort"] = "@serlo-org/alphabet-sort";
  Plugin["Anchor"] = "@serlo-org/anchor";
  Plugin["Blockquote"] = "@serlo-org/blockquote";
  Plugin["Equations"] = "@serlo-org/equations";
  Plugin["Geogebra"] = "@serlo-org/geogebra";
  Plugin["H5p"] = "@serlo-org/h5p";
  Plugin["Highlight"] = "@serlo-org/highlight";
  Plugin["Hint"] = "@serlo-org/hint";
  Plugin["Image"] = "@splish-me/image";
  Plugin["Injection"] = "@serlo-org/injection";
  Plugin["InputExercise"] = "@serlo-org/input-exercise";
  Plugin["License"] = "@serlo-org/license";
  Plugin["MatchingExercise"] = "@serlo-org/matching-exercise";
  Plugin["ScMcExercise"] = "@serlo-org/sc-mc-exercise";
  Plugin["Solution"] = "@serlo-org/solution";
  Plugin["Spoiler"] = "@serlo-org/spoiler";
  Plugin["StepByStep"] = "@serlo-org/step-by-step";
  Plugin["Table"] = "@serlo-org/table";
  Plugin["Text"] = "@splish-me/slate";
})(Plugin || (Plugin = {}));

function isContentCell(cell) {
  var c = cell;
  return typeof c.content !== 'undefined';
}
function isSplish(content) {
  return content.cells !== undefined;
}
function isEdtr(content) {
  return content.plugin !== undefined;
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

var renderMarkdown = function renderMarkdown(input) {
  var html = converter.makeHtml(input);
  html = html.replace(/"/gm, '"');
  return html.replace(/<span class="mathInline">%%(.*?)%%<\/span>/gm, '<katexinline>$1</katexinline>').replace(/<span class="math">\$\$(.*?)\$\$<\/span>/gm, '<katexblock>$1</katexblock>').replace(/\r?\n/gm, '');
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

var markdownToSlate = function markdownToSlate(markdown) {
  return {
    content: {
      plugin: {
        name: Plugin.Text,
        version: '0.0.0'
      },
      state: {
        importFromHtml: renderMarkdown(markdown)
      }
    }
  };
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

var createPlugins = function createPlugins(_ref) {
  var normalized = _ref.normalized,
      elements = _ref.elements;
  var split = normalized.split(/(§\d+§)/).map(function (s) {
    return s.trim();
  }).filter(function (s) {
    return s !== '';
  });

  if (!split.length) {
    return [{
      cells: [markdownToSlate('')]
    }];
  }

  return split.map(function (markdown) {
    var elementIDMatch = /§(\d+)§/.exec(markdown);

    if (elementIDMatch !== null) {
      // explicitly cast the matched number for typescript
      var i = parseInt(elementIDMatch[1]);
      return {
        cells: [createPluginCell(elements[i])]
      };
    } else {
      return {
        cells: [markdownToSlate(markdown)]
      };
    }
  });
};

var createPluginCell = function createPluginCell(elem) {
  switch (elem.name) {
    case 'table':
      return {
        content: {
          plugin: {
            name: Plugin.Table,
            version: '0.0.0'
          },
          state: {
            src: elem.src
          }
        }
      };

    case 'spoiler':
      return {
        content: {
          plugin: {
            name: Plugin.Spoiler,
            version: '0.0.0'
          },
          state: {
            title: elem.title,
            content: {
              type: '@splish-me/editor-core/editable',
              state: {
                id: v4(),
                cells: [{
                  id: v4(),
                  rows: createPlugins(elem.content)
                }]
              }
            }
          }
        }
      };

    case 'blockquote':
      return {
        content: {
          plugin: {
            name: Plugin.Blockquote,
            version: '0.0.0'
          },
          state: {
            child: {
              type: '@splish-me/editor-core/editable',
              state: {
                id: v4(),
                cells: [{
                  id: v4(),
                  rows: createPlugins(elem.content)
                }]
              }
            }
          }
        }
      };

    case 'injection':
      return {
        content: {
          plugin: {
            name: Plugin.Injection,
            version: '0.0.0'
          },
          state: {
            description: elem.description,
            src: elem.src
          }
        }
      };

    case 'geogebra':
      return {
        content: {
          plugin: {
            name: Plugin.Geogebra,
            version: '0.0.0'
          },
          state: {
            description: elem.description,
            src: elem.src
          }
        }
      };

    case 'image':
      return {
        content: {
          plugin: {
            name: Plugin.Image,
            version: '0.0.0'
          },
          state: {
            description: elem.description,
            title: elem.title,
            src: elem.src,
            href: elem.href ? elem.href : undefined
          }
        }
      };

    case 'code':
      return {
        content: {
          plugin: {
            name: 'code'
          },
          state: {
            language: elem.language,
            src: elem.src
          }
        }
      };
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
var codeRegEx = /*#__PURE__*/new RegExp(/(\A|\n)```(\S*)\n([\s\S]*?)\r?\n?```/m);
var spoilerRegEx = /*#__PURE__*/new RegExp(/^\/\/\/ (.*)\n([\s\S]*?)(\n|\r)+\/\/\//m);
var injectionRegEx = /*#__PURE__*/new RegExp(/>\[(.*)\]\(((?!ggt\/).*)\)/);
var geogebraInjectionRegEx = /*#__PURE__*/new RegExp(/>\[(.*)\]\(ggt\/(.*)\)/);
var imagesRegEx = /*#__PURE__*/new RegExp(/!\[(.*?)\]\((.*?)( "(.*)?")?\)/);
var linkedImagesRegEx = /*#__PURE__*/new RegExp(/\[!\[(.*?)\]\((.*?)( "(.*)?")?\)\]\((.*?)\)/);
var tableRegEx = /*#__PURE__*/new RegExp(/(^|\n)(((\|[^|\r\n]*)+\|( |\t)*(\r?\n|\r)?)+)/);
/**
 * Blockquote RegEx:
 *  1. Negative Lookahead: Ignore when start is injection not blockquote;
 *  2. match /> ?[\s\S]+?
 *  3. Lookahead: Match is finished, when two linebreaks, end of line or injection
 */

var blockquoteRegEx = /*#__PURE__*/new RegExp(/((((\A|\n+)(?!>\[.*?\]\(.*?\))>[\s\S]+?)(?=(\r?\n\r?\n\w)|$|(>\[.*?\]\(.*?\))))+)/m);

var extractCode = function extractCode(normalizedObj) {
  return extract(codeRegEx, function (match) {
    return {
      name: 'code',
      language: match[2].trim(),
      src: match[3]
    };
  }, normalizedObj);
};

var extractSpoilers = function extractSpoilers(normalizedObj) {
  return extract(spoilerRegEx, function (match) {
    return {
      name: 'spoiler',
      title: match[1],
      content: normalizeMarkdown(match[2])
    };
  }, normalizedObj);
};

var extractTable = function extractTable(normalizedObj) {
  return extract(tableRegEx, function (match) {
    return {
      name: 'table',
      src: match[0]
    };
  }, normalizedObj);
};

var extractInjections = function extractInjections(normalizedObj) {
  return extract(injectionRegEx, function (match) {
    return {
      name: 'injection',
      description: match[1],
      src: match[2]
    };
  }, normalizedObj);
};

var extractGeogebra = function extractGeogebra(normalizedObj) {
  return extract(geogebraInjectionRegEx, function (match) {
    return {
      name: 'geogebra',
      description: match[1],
      src: match[2]
    };
  }, normalizedObj);
};

var extractLinkedImages = function extractLinkedImages(normalizedObj) {
  return extract(linkedImagesRegEx, function (match) {
    return {
      name: 'image',
      description: match[1],
      src: match[2],
      title: match[4],
      href: match[5]
    };
  }, normalizedObj);
};

var extractImages = function extractImages(normalizedObj) {
  return extract(imagesRegEx, function (match) {
    return {
      name: 'image',
      description: match[1],
      src: match[2],
      title: match[4]
    };
  }, normalizedObj);
};

var extractBlockquote = function extractBlockquote(normalizedObj) {
  return extract(blockquoteRegEx, function (match) {
    return {
      name: 'blockquote',
      content: normalizeMarkdown(match[1].replace(/(^|\n)>/g, '$1'))
    };
  }, normalizedObj);
};

var normalizeMarkdown = function normalizeMarkdown(markdown) {
  var normalizedObj = {
    normalized: markdown,
    elements: []
  };
  normalizedObj = extractCode(normalizedObj);
  normalizedObj = extractSpoilers(normalizedObj);
  normalizedObj = extractTable(normalizedObj);
  normalizedObj = extractBlockquote(normalizedObj);
  normalizedObj = extractInjections(normalizedObj);
  normalizedObj = extractGeogebra(normalizedObj);
  normalizedObj = extractLinkedImages(normalizedObj);
  normalizedObj = extractImages(normalizedObj);
  return normalizedObj;
};

var extract = function extract(regex, createElement, _ref) {
  var normalized = _ref.normalized,
      elements = _ref.elements;
  var match = regex.exec(normalized);

  while (match !== null) {
    normalized = normalized.replace(regex, '§' + elements.length + '§');
    elements = [].concat(elements, [createElement(match)]);
    match = regex.exec(normalized);
  }

  return {
    normalized: normalized,
    elements: elements
  };
};

var splitMarkdown = function splitMarkdown(markdown) {
  return createPlugins(normalizeMarkdown(markdown));
};

function isLeaf(cell) {
  var c = cell;
  return typeof c.raw !== 'undefined';
}

function splitCell(cell) {
  if (isLeaf(cell)) {
    return {
      size: cell.size,
      rows: splitMarkdown(cell.raw)
    };
  } else {
    var _cell$rows = cell.rows,
        rows = _cell$rows === void 0 ? [] : _cell$rows;
    return _extends({}, cell, {
      rows: rows.map(splitRow)
    });
  }
}

function splitRow(row) {
  return _extends({}, row, {
    cells: row.cells.map(splitCell)
  });
}

function split(input) {
  return _extends({}, input, {
    cells: input.cells.map(splitCell)
  });
}

var getCellsFromRow = function getCellsFromRow(row) {
  return row.map(function (cell) {
    return {
      size: Math.floor(cell.col / 2),
      raw: cell.content
    };
  });
};

var transform = function transform(input) {
  if (typeof input === 'string') {
    return {
      cells: [{
        rows: [{
          cells: [{
            size: 12,
            raw: input
          }]
        }]
      }]
    };
  }

  return {
    cells: [{
      rows: input.map(function (row) {
        return {
          cells: getCellsFromRow(row)
        };
      })
    }]
  };
};

function normalize(value) {
  return _extends({}, value, {
    document: value.document ? normalizeNode(value.document)[0] : undefined
  });
}

function normalizeNode(node) {
  if (isBlock(node)) {
    var _node$nodes, _node$nodes2;

    if (node != null && (_node$nodes = node.nodes) != null && _node$nodes.some(isInline) && node != null && (_node$nodes2 = node.nodes) != null && _node$nodes2.some(isBlock)) {
      // @ts-ignore
      return chain(normalizeNode, unwrapChildBlocks(node));
    } else {
      var _node$nodes3;

      return [_extends({}, node, {
        nodes: chain(normalizeNode, (_node$nodes3 = node.nodes) != null ? _node$nodes3 : [])
      })];
    }
  } else if (isDocument(node)) {
    var _node$nodes4;

    return [_extends({}, node, {
      nodes: chain(normalizeNode, (_node$nodes4 = node.nodes) != null ? _node$nodes4 : [])
    })];
  } else {
    return [node];
  }
}

function unwrapChildBlocks(node) {
  if (node.nodes === undefined) return [node];
  var result = [];
  var nodesToInspect = node.nodes;

  while (nodesToInspect.length > 0) {
    var _R$splitWhen = splitWhen(isBlock, nodesToInspect),
        inlineNodes = _R$splitWhen[0],
        tailNodes = _R$splitWhen[1];

    if (inlineNodes.length > 0) result.push(_extends({}, node, {
      nodes: inlineNodes
    }));
    if (tailNodes.length > 0) result.push(tailNodes[0]);
    nodesToInspect = tailNodes.slice(1);
  }

  return result;
}

function isBlock(node) {
  return (node == null ? void 0 : node.object) === 'block';
}

function isDocument(node) {
  return (node == null ? void 0 : node.object) === 'document';
}

function isInline(node) {
  return (node == null ? void 0 : node.object) === 'inline' || (node == null ? void 0 : node.object) === 'text';
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
/**
 * This file provides a serializer for the splish slate state to html
 * and a deserializer for html to edtr-io slate state.
 * All serializers use the node names of the splish editor.
 * All deserializers use the new node names defined in the following variables.
 */

var createHeadingNode = function createHeadingNode(level) {
  return "@splish-me/h" + level;
};
var linkNode = '@splish-me/a';
var orderedListNode = 'ordered-list';
var unorderedListNode = 'unordered-list';
var listItemNode = 'list-item';
var listItemChildNode = 'list-item-child';
var paragraphNode = 'paragraph';
var strongMark = '@splish-me/strong';
var emphasizeMark = '@splish-me/em';
var katexBlockNode = '@splish-me/katex-block';
var katexInlineNode = '@splish-me/katex-inline';
function convertOldSlate(value) {
  var serializer = new Html({
    rules: [headingSerializer, linkSerializer, listSerializer, paragraphSerializer, richTextSerializer, katexSerializer],
    defaultBlock: {
      type: paragraphNode
    },
    parseHtml: function parseHtml(html) {
      return parseFragment(html);
    }
  });
  return htmlToSlate(serializer.serialize(Value.fromJSON(value), {
    render: true
  }));
}
function htmlToSlate(html) {
  var deserializer = new Html({
    rules: [headingDeserializer, linkDeserializer, listDeserializer, paragraphDeserializer, richTextDeserializer, katexDeserializer, {
      deserialize: function deserialize(el) {
        if (el.tagName && el.tagName.toLowerCase() === 'br') {
          return {
            object: 'text',
            text: '\n'
          };
        }

        if (el.nodeName === '#text') {
          // @ts-ignore
          if (el.value && el.value.match(/<!--.*?-->/)) return;
          return {
            object: 'text',
            // @ts-ignore
            text: el.value
          };
        }
      }
    }],
    defaultBlock: {
      type: paragraphNode
    },
    parseHtml: function parseHtml(html) {
      return parseFragment(html);
    }
  });
  return normalize(deserializer.deserialize(html, {
    toJSON: true
  }));
}
var headingDeserializer = {
  deserialize: function deserialize(el, next) {
    var match = el.tagName.toLowerCase().match(/h([1-6])/);

    if (match) {
      var level = parseInt(match[1], 10);
      return {
        object: 'block',
        type: createHeadingNode(level),
        nodes: next(el.childNodes)
      };
    }
  }
};
var linkDeserializer = {
  deserialize: function deserialize(el, next) {
    if (el.tagName.toLowerCase() === 'a') {
      // @ts-ignore FIXME
      var attr = el.attrs.find(function (_ref) {
        var name = _ref.name;
        return name === 'href';
      });
      return {
        object: 'inline',
        type: linkNode,
        nodes: next(el.childNodes),
        data: {
          href: attr ? attr.value : ''
        }
      };
    }
  }
};
var listDeserializer = {
  deserialize: function deserialize(el, next) {
    switch (el.tagName.toLowerCase()) {
      case 'ol':
        return {
          object: 'block',
          type: orderedListNode,
          nodes: next(el.childNodes)
        };

      case 'ul':
        return {
          object: 'block',
          type: unorderedListNode,
          nodes: next(el.childNodes)
        };

      case 'li':
        return {
          object: 'block',
          type: listItemNode,
          nodes: [{
            object: 'block',
            type: listItemChildNode,
            nodes: next(el.childNodes)
          }]
        };
    }
  }
};
var paragraphDeserializer = {
  deserialize: function deserialize(el, next) {
    if (el.tagName.toLowerCase() === 'p') {
      return {
        object: 'block',
        type: paragraphNode,
        nodes: next(el.childNodes)
      };
    }
  }
};
var richTextDeserializer = {
  deserialize: function deserialize(el, next) {
    switch (el.tagName.toLowerCase()) {
      case 'strong':
      case 'b':
        return {
          object: 'mark',
          type: strongMark,
          nodes: next(el.childNodes)
        };

      case 'em':
      case 'i':
        return {
          object: 'mark',
          type: emphasizeMark,
          nodes: next(el.childNodes)
        };
    }
  }
};
var katexDeserializer = {
  deserialize: function deserialize(el, next) {
    switch (el.tagName.toLowerCase()) {
      case 'katexblock':
        return {
          object: 'block',
          type: katexBlockNode,
          data: {
            //@ts-ignore
            formula: el.childNodes[0].value,
            inline: false
          },
          nodes: next(el.childNodes)
        };

      case 'katexinline':
        return {
          object: 'inline',
          type: katexInlineNode,
          data: {
            //@ts-ignore
            formula: el.childNodes[0].value,
            inline: true
          },
          nodes: next(el.childNodes)
        };

      default:
        return;
    }
  }
};
var headingSerializer = {
  serialize: function serialize(obj, children) {
    var block = obj;

    if (block.object === 'block') {
      var match = block.type.match(/@splish-me\/h([1-6])/);

      if (match) {
        var level = parseInt(match[1], 10);
        return createElement("h" + level, {
          node: obj
        }, children);
      }
    }
  }
};
var linkSerializer = {
  serialize: function serialize(obj, children) {
    var block = obj;

    if (block.object === 'inline' && block.type === linkNode) {
      var href = obj.data.get('href');
      return createElement("a", {
        href: href
      }, children);
    }
  }
};
var listSerializer = {
  serialize: function serialize(obj, children) {
    var block = obj;

    switch (block.type) {
      case '@splish-me/ul':
        return createElement("ul", null, children);

      case '@splish-me/ol':
        return createElement("ol", null, children);

      case '@splish-me/li':
        return createElement("li", null, children);
    }
  }
};
var paragraphSerializer = {
  serialize: function serialize(obj, children) {
    var block = obj;

    if (block.type === 'paragraph' || block.type === '@splish-me/p') {
      return createElement("p", null, children);
    }
  }
};
var richTextSerializer = {
  serialize: function serialize(obj, children) {
    var mark = obj;

    if (mark.object === 'mark') {
      switch (mark.type) {
        case '@splish-me/strong':
          return createElement("strong", null, children);

        case '@splish-me/em':
          return createElement("em", null, children);
      }
    }
  }
};
var katexSerializer = {
  serialize: function serialize(obj, children) {
    var block = obj;
    var inline = obj;

    if (block.object === 'block' && block.type === katexBlockNode) {
      var formula = obj.data.get('formula'); // @ts-ignore

      return createElement("katexblock", null, formula);
    } else if (inline.object === 'inline' && inline.type === katexInlineNode) {
      var _formula = obj.data.get('formula'); // @ts-ignore


      return createElement("katexinline", null, _formula);
    }
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
function convertPlugin(cell) {
  var _cell$content = cell.content,
      plugin = _cell$content.plugin,
      state = _cell$content.state;

  switch (plugin.name) {
    case Plugin.Blockquote:
      var blockquoteState = state;
      return {
        plugin: 'important',
        state: convertSplishToEdtrIO(blockquoteState.child.state)
      };

    case Plugin.Image:
      var imageState = state;
      return {
        plugin: 'image',
        state: {
          alt: imageState.description,
          link: imageState.href ? {
            href: imageState.href,
            openInNewTab: false
          } : undefined,
          src: imageState.src,
          maxWidth: undefined
        }
      };

    case Plugin.Injection:
      var injectionState = state;
      return {
        plugin: 'injection',
        state: injectionState.src
      };

    case Plugin.Spoiler:
      var spoilerState = state;
      return {
        plugin: 'spoiler',
        state: {
          title: spoilerState.title,
          content: convertSplishToEdtrIO(spoilerState.content.state)
        }
      };

    case Plugin.Text:
      var textState = state;

      if (textState.editorState) {
        return {
          plugin: 'text',
          state: serializer.serialize(convertOldSlate(textState.editorState))
        };
      } else {
        return {
          plugin: 'text',
          state: serializer.serialize(htmlToSlate(textState.importFromHtml || ''))
        };
      }

    case Plugin.Table:
      var tableState = state;
      return {
        plugin: 'table',
        state: tableState.src
      };

    case Plugin.Geogebra:
      var geogebraState = state;
      return {
        plugin: 'geogebra',
        state: geogebraState.src
      };

    case 'code':
      var code = state;
      return {
        plugin: 'highlight',
        state: {
          language: code.language,
          code: code.src,
          showLineNumbers: false
        }
      };

    default:
      return {
        plugin: 'error',
        state: {
          plugin: plugin.name,
          state: state
        }
      };
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
function convertRow(row) {
  // no cells, then end the recursion
  if (!row.cells.length) return []; // if more than one cell, than convert to special plugin 'layout'

  if (row.cells.length > 1) {
    return [{
      plugin: 'layout',
      state: row.cells.map(function (cell) {
        return {
          width: cell.size || 12,
          child: {
            plugin: 'rows',
            state: convertCell(cell)
          }
        };
      })
    }];
  } // otherwise continue with converting the only cell


  return convertCell(row.cells[0]);
}

function convertCell(cell) {
  if (isContentCell(cell)) {
    return [convertPlugin(cell)];
  } else {
    return reduce(function (plugins, row) {
      return concat(plugins, convertRow(row));
    }, [], cell.rows);
  }
}

function convert(content) {
  if (!content) return {
    plugin: 'rows',
    state: []
  };
  var splish = isSplish(content) ? content : convertLegacyToSplish(content, '');
  return convertSplishToEdtrIO(splish);
}
function convertLegacyToSplish(content, id) {
  var cells = split(transform(content));
  return _extends({}, cells, {
    id: id
  });
}
function convertSplishToEdtrIO(content) {
  return {
    plugin: 'rows',
    state: convertRow(content)
  };
}

export { convert, convertLegacyToSplish, convertSplishToEdtrIO, isEdtr, isSplish };
//# sourceMappingURL=legacy-editor-to-editor.esm.js.map
