const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { appResponse } = require("../utils/app-response");
let _faqsService = null;
module.exports = class FaqsController extends BaseController {
  constructor({ FaqsService }) {
    super(FaqsService);
    _faqsService = FaqsService;
  }
  hello = catchControllerAsync(async (req, res) => {
    const result = await _faqsService.hello();
    res.status(200).send(result);
  });

  getTitle = catchControllerAsync(async (req, res) => {
    const { title } = req.params;
    const result = await _faqsService.getTitle(title);
    res.status(200).send(result);
  });

  getStatus = catchControllerAsync(async (req, res) => {
    const { status } = req.params;
    const result = await _faqsService.getStatus(status);
    res.status(200).send(result);
  });

  findAllFaqsFilters = catchControllerAsync(async (req, res) => {
    const result = await _faqsService.findAllFaqsFilters({
      ...req.query,
    });
    return appResponse(res, result);
  });
};