module.exports = (error, req, res, next) => {
    const {
        tasktitle
    } = error;
    let {
        taskdescription
    } = error;

    const status = error.status || 500;
    if (status == 500) {
        description = 'Unreachable server. Come back later.';
    }

    res.status(status).json({
        tasktitle,
        taskdescription,
    });
};