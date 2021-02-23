/*const User      = require('../models/user')

exports.list = function (req, res, next) {
    // authorization required
    var user = req.docUser;
    if (! user) {
        return res.status(401).json({ message: 'No authentication data provided' });
    }
    if (user.role !== 'Manager') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    User.findOneBy({
        criteria: { removed: false },
        select: 'email name password role',
        limit: 32
    }, function(err, doc) {
        if (err)
            res.status(500).json(err)
        else if (! doc)
            res.status(500).json({ message: 'Cannot get users list' })
        else
            res.status(200).json(doc)
    })
}*/