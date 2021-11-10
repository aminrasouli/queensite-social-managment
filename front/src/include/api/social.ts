import API from './api';
import { AxiosResponse } from 'axios';

const baseServiceUrl = `/socials`;

export interface SocialApiAddOrUpdateType {
    id: number;
    social: string;
    social_id: string;
    social_link: string;
}

export interface SocialApiDeleteType {
    id: number;
}

const Social = {
    getSocials: (): Promise<AxiosResponse> => {
        return API.get(`${baseServiceUrl}/`);
    },

    addSocial: ({
        id,
        social,
        social_id,
        social_link
    }: SocialApiAddOrUpdateType): Promise<AxiosResponse> => {
        return API.post(`${baseServiceUrl}/`, {
            id,
            social,
            social_id,
            social_link
        });
    },

    updateSocial: ({
        id,
        social,
        social_id,
        social_link
    }: SocialApiAddOrUpdateType): Promise<AxiosResponse> => {
        return API.put(`${baseServiceUrl}/${id}`, {
            social,
            social_id,
            social_link
        });
    },

    deleteSocial: ({ id }: SocialApiDeleteType): Promise<AxiosResponse> => {
        return API.delete(`${baseServiceUrl}/${id}/`);
    }
};

export { Social };
export {};
