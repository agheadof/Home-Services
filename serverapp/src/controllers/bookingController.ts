
import { RequestHandler } from "express";
import ServiceRequest from "../models/serviceRequestModel.js";
import BookingQuestion from "../models/bookingQuestionModel.js";
import { config } from "dotenv";
import CreateSession from "../stripe.js";
config();

const createBookingQuestions: RequestHandler = async (req, res) => {
    const bookingQuestions = new BookingQuestion({
        _service: req.body._service,
        type: req.body.type,
        question: req.body.question,
        options: req.body.options,
    });

    try {
        const newBooking = await bookingQuestions.save();
        res.send({ data: newBooking });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: "An error occurred" });
        }
    }
};

const getBookingQuestions: RequestHandler = async (req, res) => {
    try {
        let service_id = req.params.id;
        const Questions = await BookingQuestion.find({ _service: service_id });
        const isBooked = await ServiceRequest.find({
            service_id: service_id,
        }).select("date -_id");
        if (!Questions) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.json({ Questions: Questions, isBooked: isBooked });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An error occurred" });
        }
    }
};

const updateBookingQuestion: RequestHandler = async (req, res) => {
    try {
        let body = {
            type: req.body.type,
            question: req.body.question,
            options: req.body.options,
        };
        const bookingQuestion = await BookingQuestion.findByIdAndUpdate(
            req.params.id,
            body,
            {
                new: true,
            },
        );
        res.json(bookingQuestion);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: "An error occurred" });
        }
    }
};

const deleteBookingQuestion: RequestHandler = async (req, res) => {
    try {
        await BookingQuestion.findByIdAndDelete(req.params.id)
            .then(() => {
                res.json({ message: "Question deleted" });
            })
            .catch((err) => {
                res.json(err);
            });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An error occurred" });
        }
    }
};

const requestService: RequestHandler = async (req, res) => {
    try {
        const serviceRequest = new ServiceRequest({
            user_id: req.body.user_id,
            service_id: req.body.service_id,
            answers: req.body.answers,
            date: req.body.date,
        });

        CreateSession()
            .then((data) => {

                serviceRequest.save().then((request) => {
                    res.status(201).json({ request: request, url: data.url });
                });
            })
            .catch(err => {
                if (err instanceof Error) {
                    res.status(400).json({ message: err.message });
                } else {
                    res.status(400).json({ message: "An error occurred" });
                }
            })


        res.status(201);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: "An error occurred" });
        }
    }
};

const updateRequestStatus: RequestHandler = async (req, res) => {
    try {

        const requestUpdate = await ServiceRequest.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            {
                new: true,
            },
        );
        res.json(requestUpdate);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: "An error occurred" });
        }
    }
};

const getRequestsByUserId: RequestHandler = async (req, res) => {
    try {
        const requests = await ServiceRequest.find({ user_id: req.params.id });
        res.json(requests);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: "An error occurred" });
        }
    }
};

const getAllRequests: RequestHandler = async (req, res) => {

    await ServiceRequest.find()
        .then(data => {
            res.json(data);
        }).catch((err) => {
            if (err instanceof Error) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(400).json({ message: "An error occurred" });
            }
        })

};

export default {
    requestService,
    createBookingQuestions,
    getBookingQuestions,
    updateBookingQuestion,
    deleteBookingQuestion,
    getRequestsByUserId,
    getAllRequests,
    updateRequestStatus
};
