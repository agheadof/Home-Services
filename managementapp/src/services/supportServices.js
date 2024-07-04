// /* eslint-disable */
/* eslint-disable */
import api from "./Api";
export class ComplaintsService {
    static getAllComplaints() {
        return api
            .get("/api/support/")
            .then((response) => {
                if (response && response.data) {

                    return response.data;
                }
            });
    }
    static resolveComplaints(id, payload) {
        return api.put("/api/support/reply/" + id, payload, {
            headers: {
                "Content-Type": "Application/json"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }
}

export default ComplaintsService;