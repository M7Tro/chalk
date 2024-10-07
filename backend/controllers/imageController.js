const saveImage = async (req, res) => {
    res.status(200).json({message: "savImage reached"});
}

const loadImage = async (req, res) => {
    res.status(200).json({message: "loadImage reached"});
}

module.exports = {
    saveImage,
    loadImage
}