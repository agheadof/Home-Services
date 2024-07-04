/* eslint-disable */
import api from "./Api";
export class NotificationsService {
    static pushNotification(payload) {
        console.log(payload)
        return api.post("/api/notifications", payload, {
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

export default NotificationsService;