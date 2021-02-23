let TopicData = {id:"",topic:"",translate:""};
TopicData.new=function (id,topic,translate) {
    var topic_data = {};
    topic_data.id = id;
    topic_data.topic=topic;
    topic_data.translate=translate;
    return topic_data;
};

module.exports = TopicData;