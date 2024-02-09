var editor = ace.edit("editor");

let langTools = ace.require("ace/ext/language_tools");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
});

editor.setTheme("ace/theme/tomorrow_night_eighties");
editor.session.setMode("ace/mode/javascript");

let wordList = [
    {
        "word": "gearWorks",
        "freq": 24,
        "score": 300,
        "flags": "bc",
        "syllables": "2"
    },
    {
        "word": "draw",
        "freq": 24,
        "score": 300,
        "flags": "bc",
        "syllables": "1"
    }
];

var rhymeCompleter = {
  getCompletions: (editor, session, pos, prefix, callback) => {
    if (prefix.length === 0) {
      callback(null, []);
      return
    }

    console.log(pos, session.getTokenAt(pos.row, pos.column));

    callback(null, wordList.map(function(ea) {
      return {
        name: ea.word,
        value: ea.word,
        score: ea.score,
        meta: "keyword"
      };
    }))
  }
}

langTools.addCompleter(rhymeCompleter);
