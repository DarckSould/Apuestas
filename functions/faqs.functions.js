let _faqs = null;

module.exports = class FaqsFunctions {
  constructor({ Faqs }) {
    _faqs = Faqs;
  }

  buildFaqsSearchQuery = async (faqsData) => {
    const { title, status, limit = 10, page = 1 } = faqsData;

    const query = {
      ...(title && { title: { $regex: title, $options: "i" } }),
      ...(status && { status }),
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    return { query, skip, limit: parseInt(limit) };
  };
};
