const Banner = require('../models/banner')

const getBanner = async (req, res) => {
  try {
    const data = await Banner.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
};

const addBanner = async (req, res) => {
  const { title, subtitle,url , desc } = req?.body
  const image = req?.file?.filename
  try {
    let arr = []
    const BannerData = await Banner.find()
    BannerData.map(x => {
      arr.push(x?.name?.toUpperCase())
    })
    const Banner = name.toUpperCase()
    const isExisting = arr.findIndex(x => x == Banner)
    if (isExisting === -1) {
      const cat = new Banner({ name, desc, image })
      await cat.save()
      res.status(201).json({ data: cat, message: 'Banner created successfully' });
    } else {
      return res.status(400).json({ message: 'Banner already exists' })
    }
  } catch (error) {
    console.log(error);
  }
}

const deleteBanner = async (req, res) => {
  try {
    const id = req.query.id
    const data = await Banner.deleteOne({ _id: id });
    fs.unlink(`public/uploads/${data?.image}`, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
        return;
      }
      console.log('Image deleted successfully.');
    });
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    getBanner,
    addBanner,
    deleteBanner,
  }