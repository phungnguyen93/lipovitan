import request, { clearObject, getDefaultHeaders, getStringQuery } from "modules/mock/api";
import { trackingFormData } from "@/helpers/helpers";
import CONFIG from "../../../../web.config";

const apiHost = CONFIG.NEXT_PUBLIC_API_BASE_PATH + '/api/v1/admin';

export function getListJobContracts(token, query) {
    const cleanQuery = clearObject(query);
    const params = getStringQuery(cleanQuery);
    const headers = getDefaultHeaders(token);

    return request({
        method: 'GET',
        url: `${apiHost}/job-contracts?${params}`,
        headers
    })
}

export function postJobContract(data, token) {

    const headers = getDefaultHeaders(token);
    const dataClean = clearObject(data, true);
    const formData = new FormData();
    trackingFormData(formData, dataClean);

    return request({
        method: 'POST',
        url: `${apiHost}/job-contracts`,
        headers: {
            ...headers,
            'Content-Type': `multipart/form-data`,
        },
        data: formData
    })
}

export function putJobContract(id, data, token) {

    const headers = getDefaultHeaders(token);
    const dataClean = clearObject(data, true);
    const formData = new FormData();
    trackingFormData(formData, dataClean);

    return request({
        method: 'PUT',
        url: `${apiHost}/job-contracts/${id}`,
        headers: {
            ...headers,
            'Content-Type': `multipart/form-data`,
        },
        data: formData
    });
}

export function getJobContract(id, token) {

    const headers = getDefaultHeaders(token);
    return request({
        method: 'GET',
        url: `${apiHost}/job-contracts/${id}`,
        headers,
    })
}

export function deleteJobContract(id, token) {

    const headers = getDefaultHeaders(token);
    return request({
        method: 'DELETE',
        url: `${apiHost}/job-contracts/${id}`,
        headers,
    })
}

