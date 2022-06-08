const CaloriesData = require('../Models/caloriesModel');

exports.getAllCaloriesData = async (req, res) => {
    const data = await CaloriesData.find().exec();
    if (data) {
        res.status(200).send(data);
    } else {
        res.status(404).json({ errorMessage: 'No data found!' });
    }
}

exports.addCaloriesData = async (req, res) => {
    var today = new Date();
    let uploadTime = today.toLocaleString("en-US");

    const data = new CaloriesData({
        intake: req.body.intake,
        burnt: req.body.burnt,
        total: req.body.intake - req.body.burnt,
        time: uploadTime
    });

    const saveIt = await data.save();
    if (saveIt) {
        res.status(200).json({ successMessage: 'Data added successfuly!' });
    } else {
        res.status(400).json({ errorMessage: 'Data not added. Please try again' });
    }

}

exports.updateCaloriesData = async (req, res) => {
    const findData = await CaloriesData.findById({ _id: req.params.id });
    if (findData) {
        findData.intake = req.body.intake;
        findData.burnt = req.body.burnt;
        findData.total = req.body.intake - req.body.burnt;
        await findData.save(((error, result) => {
            if (error) {
                res.status(400).json({ errorMessage: 'Failed to update Data. Please try again', error })
            }
            if (result) {
                res.status(200).send({ successMessage: 'Data updated successfully', result });
            }

        }))
    }
    else {
        res.status(404).json({ errorMessage: 'Data not found' });
    }

}


exports.deleteCaloriesData = async (req, res) => {
    let data = await CaloriesData.findById({ _id: req.params.id });
    if (data) {
        data.remove();
        res.status(200).json({ successMessage: 'Data deleted successfully' });
    }
}