/* eslint-disable */
import api from "./Api";

export class DashboardService {
    static getDashboardData() {
        return api
            .get("/dashboard")
            .then((response) => {
                if (response && response.data) {
                    return response.data;
                }   
            });
    }
}