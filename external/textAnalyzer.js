
const config = {
  synonyms: [
    {
      match: [
        'ganze zahl',
        'ganze zahlen',
        'ganzen zahlen',
        'ganzen zahl',
        'negative zahl',
        'negative zahlen',
        'negativen zahl',
        'negativen zahlen',
      ],
      replace: '_ganze_zahl_,_negative_zahl_',
    },
  ],
  protect: [
    'betrag',
  ],
  stopwords: [
    'der',
    'die',
    'das',
    'und',
    'in',
    'ist',
    'den',
    'ein',
    'eine',
    'einer',
    'eines',
    'einem',
    'mit',
    'von',
    'vom',
    'du',
    'für',
    'zu',
    'zur',
    'zum',
    'kann',
    'kannst',
    'aus',
    'sich',
    'dies',
    'dass',
    'muss',
    'nach',
    'auf',
    'um',
    'des',
    'wie',
    'an',
    'es',
    'also',
    'sind',
    'dem',
    'als',
    'nun',
    'man',
  ],
}

function query2tokens(query) {
  return text2tokens(query, false)
}
 

function text2tokens(str, indexTime = true) {
  // Step 1: lowercase
  let lower = str.toLowerCase()
  
  // Step 2: handle synonyms
  for (const synonym of config.synonyms) {
    for (const match of synonym.match) {
      const regex = new RegExp(`(^|[^a-z0-9äöüß_])${match}($|[^a-z0-9äöüß_])`, 'g')
      lower = lower.replace(regex, ` ${synonym.replace} `)
    }
  }
  
  // Tokenize
  let tokens = lower.split(/[^a-z0-9äöüß_]/).filter(x => x)
  
  // Step 3: protect words
  tokens = tokens.map(token => {
    if (config.protect.includes(token)) {
      return `_${token}_`
    }
    return token
  })
  
  // Step 4: remove stopwords
  tokens = tokens.filter(token => !config.stopwords.includes(token))
  
  // Step 5: stem
  tokens = tokens.map(stem)
  
  return tokens
}
 
module.exports = {query2tokens, text2tokens}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
/**
 * CISTEM Stemmer for German
 *
 * This is the official Javascript implementation of the CISTEM stemmer.
 * It is based on the paper
 * Leonie Weißweiler, Alexander Fraser (2017). Developing a Stemmer for German Based on a Comparative Analysis of Publicly Available Stemmers. In Proceedings of the German Society for Computational Linguistics and Language Technology (GSCL)
 * which can be read here:
 * http://www.cis.lmu.de/~weissweiler/cistem/
 *
 * In the paper, we conducted an analysis of publicly available stemmers, developed
 * two gold standards for German stemming and evaluated the stemmers based on the
 * two gold standards. We then proposed the stemmer implemented here and show
 * that it achieves slightly better f-measure than the other stemmers and is
 * thrice as fast as the Snowball stemmer for German while being about as fast as
 * most other stemmers.
 */


const stripge = /^ge(.{4,})/;
const replxx = /(.)\1/g;
const replxxback = /(.)\*/g;
const replü = /ü/g;
const replö = /ö/g;
const replä = /ä/g;
const replß = /ß/g;
const replsch = /sch/g;
const replei = /ei/g;
const replie = /ie/g;
const replschback = /\$/g;
const repleiback = /%/g;
const replieback = /&/g;
const stripemr = /e[mr]$/;
const stripnd = /nd$/;
const stript = /t$/;
const stripesn = /[esn]$/;

/**
 * This method takes the word to be stemmed and a boolean specifiying if case-insensitive stemming should be used and returns the stemmed word. If only the word
 * is passed to the method or the second parameter is 0, normal case-sensitive stemming is used, if the second parameter is 1, case-insensitive stemming is used.
 * Case sensitivity improves performance only if words in the text may be incorrectly upper case.
 * For all-lowercase and correctly cased text, best performance is achieved by
 * using the case-sensitive version.
 * @param {String} word
 * @param {boolean} case_insensitive
 * @returns {String}
 */
function stem(word, case_insensitive = false) {
    if (word.length == 0) return word;

    const upper = (word[0] === word[0].toUpperCase());
    word = word.toLowerCase();

    word = word.replace(replü, "u");
    word = word.replace(replö,"o");
    word = word.replace(replä,"a");
    word = word.replace(replß,"ss");

    word = word.replace(stripge, "$1");
    word = word.replace(replsch,"$");
    word = word.replace(replei,"%");
    word = word.replace(replie,"&");
    word = word.replace(replxx, "$1*");

    while (word.length > 3) {
        let result;

        if (word.length > 5) {
            result = word.replace(stripemr, "");
            if (result !== word) {
                word = result;
                continue;
            }

            result = word.replace(stripnd, "");
            if (result !== word) {
                word = result;
                continue;
            }
        }

        if (!upper || case_insensitive) {
            result = word.replace(stript, "");
            if (result !== word) {
                word = result;
                continue;
            }
        }

        result = word.replace(stripesn, "");
        if (result !== word) {
            word = result;
            continue;
        } else {
            break;
        }
    }

    word = word.replace(replxxback, "$1$1");
    word = word.replace(repleiback,"ei");
    word = word.replace(replieback,"ie");
    word = word.replace(replschback,"sch");

    return word;
}
