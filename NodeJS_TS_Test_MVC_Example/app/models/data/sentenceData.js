
let SentenceData = {id:"",sentence:"",translate:""};
SentenceData.new=function (id,sentence,translate) {
    var sentence_data = {};
    sentence_data.id = id;
    sentence_data.sentence=sentence;
    sentence_data.translate=translate;
    return sentence_data;
};

module.exports = SentenceData;