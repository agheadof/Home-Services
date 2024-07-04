/* eslint-disable */
import api from "./Api";
export class AdService {
    static getAllAds() {
        return api
            .get("/api/ads")
            .then((response) => {
                if (response && response.data) {
                    return response.data;
                }
            });
    }


    static createAd(payload) {
        console.log(payload)
        return api.post("/api/ads", payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }
    static updateAd(id, payload) {
        console.log(payload)
        return api.put("/api/ads/" + id, payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }

    static deleteAd(id) {
        return api.delete("/api/ads/" + id, null, {
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

export default AdService;