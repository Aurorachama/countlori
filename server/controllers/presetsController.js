const Preset = require('../Models/presetModel');

exports.getAllPresets = async (req, res) => {
    const presets = await Preset.find().exec();
    if (presets) {
        res.status(200).send(presets);
    } else {
        res.status(404).json({ errorMessage: 'No presets found!' });
    }
}

exports.addPreset = async (req, res) => {
    const preset = new Preset({
        title: req.body.title,
        value: req.body.value,
        category: req.body.category
    });

    const savePreset = await preset.save();
    if (savePreset) {
        res.status(200).json({ successMessage: 'Preset added successfuly!' });
    } else {
        res.status(400).json({ errorMessage: 'Preset not added. Please try again' });
    }

}

exports.updatePreset = async (req, res) => {
    const findPreset = await Preset.findById({ _id: req.params.id });
    if (findPreset) {
        findPreset.title = req.body.title;
        findPreset.value = req.body.value;
        await findPreset.save(((error, result) => {
            if (error) {
                res.status(400).json({ errorMessage: 'Failed to update Preset. Please try again', error })
            }
            if (result) {
                res.status(200).send({ successMessage: 'Preset updated successfully', result });
            }

        }))
    }
    else {
        res.status(404).json({ errorMessage: 'Preset not found' });
    }

}


exports.deletePreset = async (req, res) => {
    let preset = await Preset.findById({ _id: req.params.id });
    if (preset) {
        preset.remove();
        res.status(200).json({ successMessage: 'Preset deleted successfully' });
    }
}