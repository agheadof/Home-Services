/* eslint-disable */
import api from "./Api";
export class ProductsService {
    static getAllServices() {
        return api
            .get("/api/services")
            .then((response) => {
                if (response && response.data) {
                    return response.data;
                }
            });
    }


    static addService(payload) {
        console.log(payload)
        return api.post("/api/services/create", payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }
    static updateService(id, payload) {
        console.log(payload)
        return api.put("/api/services/update/" + id, payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }

    static deleteService(id) {
        return api.delete("/api/services/delete/" + id, null, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response && response.data) {
                return response.data;
            }
        });
    }

}

export default ProductsService;