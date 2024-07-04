/* eslint-disable */
import api from "./Api";
export class BookingQeustService {
    static getBookingQuestions(service_id) {
        return api
            .get("/api/booking/" + service_id)
            .then((response) => {
                if (response && response.data) {
                    return response.data;
                }
            });
    }


    static createBookingQuestions(payload) {
        console.log(payload)
        return api.post("/api/booking", payload, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }

    static updateBookingQuestion(id, payload) {
        console.log(payload)
        return api.put("/api/booking/updateBook/" + id, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }

    static deleteBookingQuestion(id) {
        return api.delete("/api/booking/deleteBook/" + id, null, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }



}

export default BookingQeustService;