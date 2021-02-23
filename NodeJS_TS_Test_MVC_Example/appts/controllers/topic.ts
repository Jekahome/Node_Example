
import {Lessons} from "../models/lessons";
import {Topic as TopicInc} from "../models/topic";

export function list(request, response, next) {
    const lessons = new Lessons();
    lessons.load().then( (result) => {
       return response.render("lessons", {
            lessons: result
        });
    });
}

export  function topic(request, response, next) {
    const Topic = new TopicInc();
    Topic.load(request.params.topicId).then( (result) => {
        return response.render("topic", {
            topic: result
        });
    });
}
