const errorResponse = require("../utils/ApiError");
const EventModel = require("../models/event.model");
const CertificateModel = require("../models/certificate.model");
const ShortUniqueId = require("short-unique-id");

const { randomUUID } = new ShortUniqueId({ length: 12 });

const uidGenerator = async () => {
  const uid = await randomUUID();
  const certificate = await CertificateSchema.findOne({ uid });
  return certificate ? uidGenerator() : uid;
};

const Register = async (req, res, next) => {
  try {
    const { event_id, name, position, date } = req.body;
    const event = await EventModel.findById(event_id);
    if (!event) throw new errorResponse("event is not registered", 404);
    const certificate = await CertificateModel.findOne({ name, event_id });
    if (certificate) throw new errorResponse("name already registered", 400);
    const uid = await uidGenerator();
    const response = await CertificateModel.create({
      event_id,
      uid,
      name,
      position,
      date,
    });
    res.send(response);
  } catch (err) {
    next(err);
  }
};

const Delete = async (req, res, next) => {
  try {
    const { certificate_id } = req.params;
    await CertificateModel.findByIdAndDelete(certificate_id);
    res.send("certificate deleted");
  } catch (err) {
    next(err);
  }
};

const Fetch = async (req, res, next) => {
  try {
    const { certificate_id } = req.params;
    const certificate = await CertificateModel.findById(certificate_id).lean();
    res.json(certificate);
  } catch (err) {
    next(err);
  }
};

const FetchEvent = async (req, res, next) => {
  try {
    const { event_id } = req.params;
    const event = await EventModel.findById(event_id).lean();
    const certificates = await CertificateModel.find({ event_id })
      .sort({
        createdAt: -1,
      })
      .lean();
    res.json({
      event: event.name,
      certificates,
    });
  } catch (err) {
    next(err);
  }
};

const Update = async (req, res, next) => {
  try {
    const { certificate_id } = req.params;
    await CertificateModel.findByIdAndUpdate(certificate_id, req.query);
    res.send("certificate updated");
  } catch (err) {
    next(err);
  }
};

const Verify = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const certificate = await CertificateModel.findOne({ uid }).lean();
    res.json(certificate);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  Register,
  Delete,
  Fetch,
  FetchEvent,
  Update,
  Verify,
};
